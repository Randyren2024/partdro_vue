import { defineStore } from 'pinia'
import type { CartState, CartLineItem, AddToCartPayload, CartTotals } from '@/types/cart'

/**
 * Pinia store for shopping cart management.
 * Persisted to localStorage via pinia-plugin-persistedstate.
 *
 * Usage:
 *   const cart = useCartStore()
 *   cart.addItem({ productId: 'lumenfly-mini', quantity: 1, ... })
 *   console.log(cart.subtotalCents)
 */
export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    lastUpdated: Date.now(),
    showDrawer: false
  }),

  getters: {
    /**
     * Total number of unique line items (not total quantity).
     */
    itemCount: (state): number => state.items.length,

    /**
     * Total quantity across all line items.
     */
    totalQuantity: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    /**
     * Subtotal in cents (sum of line item totals before shipping/tax).
     */
    subtotalCents: (state): number =>
      state.items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0),

    /**
     * Cart totals including shipping and tax estimates.
     * Shipping/tax are placeholder zeros here; actual calculation happens in composables.
     */
    totals: (state): CartTotals => {
      const subtotalCents = state.items.reduce(
        (sum, item) => sum + item.unitPriceCents * item.quantity,
        0
      )
      const totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)

      return {
        itemCount: state.items.length,
        totalQuantity,
        subtotalCents,
        shippingCents: 0, // Placeholder; use useShipping() composable for real calculation
        taxCents: 0, // Placeholder; use Stripe Tax or useTax() composable
        totalCents: subtotalCents // Will be updated by composable
      }
    },

    /**
     * Find a specific line item by productId and optional variantId.
     */
    findItem: (state) => (productId: string, variantId?: string): CartLineItem | undefined => {
      return state.items.find(
        (item) => item.productId === productId && item.variantId === variantId
      )
    }
  },

  actions: {
    /**
     * Add an item to the cart. If the same product+variant already exists, increment quantity.
     */
    addItem(payload: AddToCartPayload) {
      const existing = this.findItem(payload.productId, payload.variantId)

      if (existing) {
        existing.quantity += payload.quantity
      } else {
        this.items.push({
          productId: payload.productId,
          variantId: payload.variantId,
          quantity: payload.quantity,
          unitPriceCents: payload.unitPriceCents,
          productName: payload.productName,
          variantName: payload.variantName,
          imageUrl: payload.imageUrl
        })
      }

      this.lastUpdated = Date.now()
    },

    /**
     * Remove a specific line item from the cart.
     */
    removeItem(productId: string, variantId?: string) {
      const index = this.items.findIndex(
        (item) => item.productId === productId && item.variantId === variantId
      )

      if (index !== -1) {
        this.items.splice(index, 1)
        this.lastUpdated = Date.now()
      }
    },

    /**
     * Update the quantity of a specific line item.
     * If quantity <= 0, removes the item.
     */
    updateQuantity(productId: string, variantId: string | undefined, quantity: number) {
      const item = this.findItem(productId, variantId)

      if (item) {
        if (quantity <= 0) {
          this.removeItem(productId, variantId)
        } else {
          item.quantity = quantity
          this.lastUpdated = Date.now()
        }
      }
    },

    /**
     * Clear all items from the cart.
     */
    clear() {
      this.items = []
      this.lastUpdated = Date.now()
    },

    /**
     * Open the cart drawer.
     */
    openDrawer() {
      this.showDrawer = true
    },

    /**
     * Close the cart drawer.
     */
    closeDrawer() {
      this.showDrawer = false
    }
  },

  persist: {
    key: 'partdro-cart',
    storage: localStorage,
    paths: ['items'] // Only persist items, not lastUpdated or showDrawer
  }
})
