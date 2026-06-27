import type { Context } from '@netlify/functions'
import { supabaseAdmin } from '../lib/supabase'
import { products, getProductById } from '../../src/data/products'

interface OrderItemInput {
  productId: string
  variantId?: string
  quantity: number
  unitPriceCents: number
  productName: string
  variantName?: string
}

interface CreateOrderRequest {
  email: string
  items: OrderItemInput[]
  shippingAddress: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone?: string
  }
  subtotalCents: number
  shippingCents: number
  taxCents: number
  totalCents: number
  currency?: string
  stripePaymentIntentId?: string
}

export default async (req: Request, context: Context) => {
  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const body: CreateOrderRequest = await req.json()

    // Validate required fields
    if (!body.email || !body.items || body.items.length === 0 || !body.shippingAddress) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: email, items, shippingAddress' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Validate items and recalculate prices server-side
    let calculatedSubtotal = 0
    const validatedItems = body.items.map(item => {
      const product = getProductById(item.productId)
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`)
      }

      // Validate stock
      const availableStock = item.variantId
        ? product.variants?.find(v => v.id === item.variantId)?.stockCount ?? 0
        : product.stockCount ?? 0

      if (item.quantity > availableStock) {
        throw new Error(`Insufficient stock for product: ${item.productId}`)
      }

      // Calculate item total (server-side price validation)
      const unitPrice = item.variantId
        ? (product.price ?? 0) + (product.variants?.find(v => v.id === item.variantId)?.priceModifier ?? 0)
        : product.price ?? 0

      const itemTotal = unitPrice * item.quantity
      calculatedSubtotal += itemTotal

      return {
        product_id: item.productId,
        variant_id: item.variantId,
        quantity: item.quantity,
        unit_price_cents: unitPrice,
        total_cents: itemTotal,
        product_name: item.productName || product.name,
        variant_name: item.variantName
      }
    })

    // Validate subtotal matches (with small tolerance for rounding)
    if (Math.abs(calculatedSubtotal - body.subtotalCents) > 1) {
      return new Response(
        JSON.stringify({
          error: 'Subtotal mismatch',
          expected: calculatedSubtotal,
          received: body.subtotalCents
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Create order in database
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        email: body.email,
        status: 'paid', // Mock payment - always set to paid
        subtotal_cents: body.subtotalCents,
        shipping_cents: body.shippingCents,
        tax_cents: body.taxCents,
        total_cents: body.totalCents,
        currency: body.currency || 'USD',
        shipping_address: body.shippingAddress,
        stripe_payment_intent_id: null // No real payment in mock mode
      })
      .select()
      .single()

    if (orderError) {
      console.error('Error creating order:', orderError)
      return new Response(JSON.stringify({ error: 'Failed to create order' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Create order items
    const orderItems = validatedItems.map(item => ({
      ...item,
      order_id: order.id
    }))

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error creating order items:', itemsError)
      // Rollback: delete the order
      await supabaseAdmin.from('orders').delete().eq('id', order.id)
      return new Response(JSON.stringify({ error: 'Failed to create order items' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Update product stock (decrement)
    for (const item of body.items) {
      const product = getProductById(item.productId)
      if (!product) continue

      if (item.variantId) {
        // Update variant stock
        const variant = product.variants?.find(v => v.id === item.variantId)
        if (variant) {
          variant.stockCount -= item.quantity
        }
      } else {
        // Update product stock
        if (product.stockCount !== undefined) {
          product.stockCount -= item.quantity
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.order_number,
          email: order.email,
          status: order.status,
          totalCents: order.total_cents,
          createdAt: order.created_at
        }
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in create-order function:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
