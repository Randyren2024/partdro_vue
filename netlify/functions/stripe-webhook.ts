import type { Context } from '@netlify/functions'
import { stripe } from '../lib/stripe'
import { supabaseAdmin } from '../lib/supabase'
import type Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!webhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET environment variable')
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
    const payload = await req.text()
    const signature = req.headers.get('stripe-signature')

    if (!signature) {
      return new Response(JSON.stringify({ error: 'Missing stripe-signature header' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Verify webhook signature
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentSuccess(paymentIntent)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailure(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error in stripe-webhook function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment succeeded: ${paymentIntent.id}`)

  const { email, items, shipping_address, subtotal_cents, shipping_cents, tax_cents } = paymentIntent.metadata

  // Parse items from metadata
  const orderItems = JSON.parse(items)

  // Create order in database
  const { data: order, error: orderError } = await supabaseAdmin
    .from('orders')
    .insert({
      email,
      status: 'paid',
      subtotal_cents: parseInt(subtotal_cents),
      shipping_cents: parseInt(shipping_cents),
      tax_cents: parseInt(tax_cents),
      total_cents: paymentIntent.amount,
      currency: paymentIntent.currency,
      shipping_address: JSON.parse(shipping_address),
      stripe_payment_intent_id: paymentIntent.id
    })
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    throw orderError
  }

  // Create order items
  const orderItemsData = orderItems.map((item: any) => ({
    order_id: order.id,
    product_id: item.product_id,
    variant_id: item.variant_id,
    quantity: item.quantity,
    unit_price_cents: item.unit_price_cents,
    total_cents: item.total_cents,
    product_name: item.product_name,
    variant_name: item.variant_name
  }))

  const { error: itemsError } = await supabaseAdmin
    .from('order_items')
    .insert(orderItemsData)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    throw itemsError
  }

  // Update product stock
  for (const item of orderItems) {
    const { error: stockError } = await supabaseAdmin
      .from('products')
      .update({
        stock_count: supabaseAdmin.rpc('decrement_stock', {
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity
        })
      })
      .eq('id', item.product_id)

    if (stockError) {
      console.error('Error updating stock:', stockError)
    }
  }

  // Send order confirmation email (implement with SendGrid in production)
  console.log(`Order confirmation email sent to ${email}`)
  console.log(`Order ID: ${order.order_number}`)
}

async function handlePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
  console.log(`Payment failed: ${paymentIntent.id}`)

  const { email } = paymentIntent.metadata

  // Send payment failure email (implement with SendGrid in production)
  console.log(`Payment failure notification sent to ${email}`)
}
