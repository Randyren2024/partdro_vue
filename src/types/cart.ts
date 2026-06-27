/**
 * Cart type definitions
 * All monetary values are in cents (分) to avoid floating-point precision issues.
 * Use formatCents() from useCurrency.ts to render as "$199.90".
 */

/**
 * A single line item in the shopping cart.
 * Represents a product (with optional variant) and its quantity.
 */
export interface CartLineItem {
  /** Product ID from products.ts (e.g., 'lumenfly-mini') */
  productId: string

  /** Optional variant ID if the product has variants (e.g., 'pro-kit') */
  variantId?: string

  /** Quantity of this item in the cart (must be >= 1) */
  quantity: number

  /** Unit price in cents (snapshot at time of add-to-cart) */
  unitPriceCents: number

  /** Product name for display (cached to avoid re-lookup) */
  productName: string

  /** Variant name for display (if applicable) */
  variantName?: string

  /** Product image URL for thumbnail display */
  imageUrl: string
}

/**
 * Cart state persisted to localStorage via pinia-plugin-persistedstate.
 */
export interface CartState {
  /** Array of line items in the cart */
  items: CartLineItem[]

  /** Timestamp when cart was last modified (for debugging/expiry) */
  lastUpdated: number

  /** Whether the cart drawer is visible */
  showDrawer: boolean
}

/**
 * Payload for adding an item to the cart.
 */
export interface AddToCartPayload {
  productId: string
  variantId?: string
  quantity: number
  unitPriceCents: number
  productName: string
  variantName?: string
  imageUrl: string
}

/**
 * Cart totals computed from line items.
 */
export interface CartTotals {
  /** Number of unique line items (not total quantity) */
  itemCount: number

  /** Total quantity across all line items */
  totalQuantity: number

  /** Subtotal in cents (sum of line item totals before shipping/tax) */
  subtotalCents: number

  /** Estimated shipping in cents (calculated by useShipping composable) */
  shippingCents: number

  /** Estimated tax in cents (calculated by useTax composable or Stripe Tax) */
  taxCents: number

  /** Grand total in cents (subtotal + shipping + tax) */
  totalCents: number
}
