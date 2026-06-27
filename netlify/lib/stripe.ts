import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

if (!stripeSecretKey) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-12-18.acacia'
})

/**
 * Calculate shipping cost based on product configuration
 */
export function calculateShipping(subtotalCents: number, products: any[]): number {
  // Free shipping over $500
  if (subtotalCents >= 50000) {
    return 0
  }

  // Flat rate $25 for orders under $500
  return 2500
}

/**
 * Calculate tax (simplified - in production, use Stripe Tax or similar)
 */
export function calculateTax(subtotalCents: number, shippingAddress: any): number {
  // Simplified tax calculation - 0% for now
  // In production, integrate with Stripe Tax, TaxJar, or similar
  return 0
}

/**
 * Generate unique order number
 */
export function generateOrderNumber(): string {
  const date = new Date()
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '')
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `PD-${datePart}-${randomPart}`
}
