import { computed } from 'vue'
import type { Product, ProductVariant } from '@/data/products'

/**
 * Composable for stock and shipping calculations.
 * Provides reactive utilities for checking product availability and shipping costs.
 */
export function useStock() {
  /**
   * Check if a product is in stock (has available inventory).
   */
  const isInStock = (product: Product, variant?: ProductVariant): boolean => {
    const stock = variant?.stockCount ?? product.stockCount ?? 0
    return stock > 0
  }

  /**
   * Get available stock count for a product or variant.
   */
  const getAvailableStock = (product: Product, variant?: ProductVariant): number => {
    return variant?.stockCount ?? product.stockCount ?? 0
  }

  /**
   * Calculate shipping cost for a product based on its shipping configuration.
   * Returns shipping cost in cents.
   */
  const calculateShipping = (product: Product, quantity: number = 1): number => {
    if (!product.shipping) {
      return 0 // No shipping config, assume free or handled elsewhere
    }

    const { freeOver, flatRate } = product.shipping
    const subtotalCents = (product.price ?? 0) * quantity

    // Check if qualifies for free shipping
    if (freeOver && subtotalCents >= freeOver) {
      return 0
    }

    // Return flat rate or 0 if not configured
    return flatRate ?? 0
  }

  /**
   * Calculate total shipping for multiple products (simplified - assumes same shipping rules).
   * In a real implementation, this would need to handle mixed carts with different shipping rules.
   */
  const calculateCartShipping = (
    items: Array<{ product: Product; quantity: number }>,
    subtotalCents: number
  ): number => {
    if (items.length === 0) return 0

    // Use the first product's shipping config as the base rule
    // (simplified - real implementation would handle mixed carts)
    const firstProduct = items[0].product
    if (!firstProduct.shipping) return 0

    const { freeOver, flatRate } = firstProduct.shipping

    // Check if cart qualifies for free shipping
    if (freeOver && subtotalCents >= freeOver) {
      return 0
    }

    // Return flat rate or 0
    return flatRate ?? 0
  }

  /**
   * Check if a cart subtotal qualifies for free shipping.
   */
  const qualifiesForFreeShipping = (product: Product, subtotalCents: number): boolean => {
    if (!product.shipping?.freeOver) return false
    return subtotalCents >= product.shipping.freeOver
  }

  /**
   * Get the remaining amount needed to qualify for free shipping.
   * Returns 0 if already qualified or if no free shipping threshold.
   */
  const getFreeShippingRemaining = (product: Product, subtotalCents: number): number => {
    if (!product.shipping?.freeOver) return 0
    const remaining = product.shipping.freeOver - subtotalCents
    return remaining > 0 ? remaining : 0
  }

  return {
    isInStock,
    getAvailableStock,
    calculateShipping,
    calculateCartShipping,
    qualifiesForFreeShipping,
    getFreeShippingRemaining
  }
}
