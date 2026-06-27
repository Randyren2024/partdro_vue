import type { Context } from '@netlify/functions'
import { stripe, calculateShipping, calculateTax } from '../lib/stripe'
import { supabaseAdmin } from '../lib/supabase'
import { products, getProductById } from '../../src/data/products'

interface CartItem {
  productId: string
  variantId?: string
  quantity: number
  unitPriceCents: number
  productName: string
  variantName?: string
}

interface CreatePaymentIntentRequest {
  email: string
  items: CartItem[]
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
    const body: CreatePaymentIntentRequest = await req.json()

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

    // Calculate shipping and tax
    const shippingCents = calculateShipping(calculatedSubtotal, body.items)
    const taxCents = calculateTax(calculatedSubtotal, body.shippingAddress)
    const totalCents = calculatedSubtotal + shippingCents + taxCents

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: 'usd',
      automatic_tax: {
        enabled: false // Enable Stripe Tax in production
      },
      metadata: {
        email: body.email,
        items: JSON.stringify(validatedItems),
        shipping_address: JSON.stringify(body.shippingAddress),
        subtotal_cents: calculatedSubtotal,
        shipping_cents: shippingCents,
        tax_cents: taxCents
      },
      receipt_email: body.email
    })

    return new Response(
      JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        amount: totalCents,
        currency: 'usd',
        breakdown: {
          subtotal: calculatedSubtotal,
          shipping: shippingCents,
          tax: taxCents,
          total: totalCents
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error('Error in create-payment-intent function:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
