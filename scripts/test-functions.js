#!/usr/bin/env node

/**
 * Test script for Netlify Functions
 * Tests the create-payment-intent function
 */

const API_URL = 'http://localhost:8888/.netlify/functions'

async function testCreatePaymentIntent() {
  console.log('🧪 Testing create-payment-intent function...\n')

  const payload = {
    email: 'test@example.com',
    items: [
      {
        productId: 'lumenfly-mini',
        variantId: 'standard-kit',
        quantity: 1,
        unitPriceCents: 59900,
        productName: 'Camera Drone',
        variantName: 'Standard Kit'
      }
    ],
    shippingAddress: {
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US'
    }
  }

  try {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Request failed')
    }

    const data = await response.json()
    console.log('✅ Success!')
    console.log('Payment Intent ID:', data.paymentIntentId)
    console.log('Amount:', data.amount)
    console.log('Breakdown:', data.breakdown)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

async function testGetOrder() {
  console.log('\n🧪 Testing get-order function...\n')

  try {
    const response = await fetch(`${API_URL}/get-order?email=test@example.com&orderNumber=TEST-123`)

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Request failed')
    }

    const data = await response.json()
    console.log('✅ Success!')
    console.log('Order:', data.order)
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Run tests
console.log('Starting Netlify Functions tests...\n')
console.log('Make sure to run `netlify dev` first!\n')

testCreatePaymentIntent()
  .then(() => testGetOrder())
  .then(() => console.log('\n✅ All tests completed!'))
  .catch(console.error)
