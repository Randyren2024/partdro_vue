import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

/**
 * Supabase client for browser-side operations.
 * Uses anon key for RLS (Row Level Security) enabled operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Helper type for Order data structure.
 */
export interface Order {
  id: string
  order_number: string
  email: string
  status: string
  subtotal_cents: number
  shipping_cents: number
  tax_cents: number
  total_cents: number
  currency: string
  shipping_address: {
    firstName: string
    lastName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    phone?: string
  }
  stripe_payment_intent_id?: string
  created_at: string
}

/**
 * Helper type for Order Item data structure.
 */
export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  unit_price_cents: number
  total_cents: number
  product_name: string
  variant_name?: string
}

/**
 * Order status enum.
 */
export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
