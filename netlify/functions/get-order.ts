import type { Context } from '@netlify/functions'
import { supabaseAdmin } from '../lib/supabase'

export default async (req: Request, context: Context) => {
  // Only allow GET
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const url = new URL(req.url)
    const orderNumber = url.searchParams.get('orderNumber')
    const email = url.searchParams.get('email')

    // Validate required parameters
    if (!orderNumber || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: orderNumber, email' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Query order by order_number and email
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('order_number', orderNumber)
      .eq('email', email)
      .single()

    if (orderError) {
      if (orderError.code === 'PGRST116') {
        // No rows returned
        return new Response(
          JSON.stringify({ error: 'Order not found. Please check your order number and email.' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }

      console.error('Error fetching order:', orderError)
      return new Response(JSON.stringify({ error: 'Failed to fetch order' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Format response
    const formattedOrder = {
      id: order.id,
      orderNumber: order.order_number,
      email: order.email,
      status: order.status,
      subtotalCents: order.subtotal_cents,
      shippingCents: order.shipping_cents,
      taxCents: order.tax_cents,
      totalCents: order.total_cents,
      currency: order.currency,
      shippingAddress: order.shipping_address,
      stripePaymentIntentId: order.stripe_payment_intent_id,
      createdAt: order.created_at,
      items: order.order_items.map((item: any) => ({
        id: item.id,
        productId: item.product_id,
        variantId: item.variant_id,
        quantity: item.quantity,
        unitPriceCents: item.unit_price_cents,
        totalCents: item.total_cents,
        productName: item.product_name,
        variantName: item.variant_name
      }))
    }

    return new Response(JSON.stringify({ order: formattedOrder }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in get-order function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
