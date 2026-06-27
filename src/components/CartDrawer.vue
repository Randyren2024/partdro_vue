<template>
  <a-drawer
    v-model:open="visible"
    title="Shopping Cart"
    placement="right"
    :width="380"
    class="cart-drawer"
    :body-style="{ padding: 0 }"
    @close="cartStore.closeDrawer()"
  >
    <div class="drawer-content">
      <!-- Empty cart state -->
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <ShoppingCartOutlined class="empty-icon" />
        <h3>Your cart is empty</h3>
        <p>Add some products to get started</p>
        <a-button type="primary" block @click="goToProducts">
          Browse Products
        </a-button>
      </div>

      <!-- Cart items -->
      <div v-else class="cart-items">
        <div
          v-for="(item, index) in cartStore.items"
          :key="`${item.productId}-${item.variantId}`"
          class="cart-item"
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :enter="{ opacity: 1, x: 0, transition: { delay: index * 50 } }"
        >
          <img :src="item.imageUrl" :alt="item.productName" class="item-image" />
          <div class="item-details">
            <h4 class="item-name">{{ item.productName }}</h4>
            <p v-if="item.variantName" class="item-variant">{{ item.variantName }}</p>
            <div class="item-controls">
              <div class="quantity-controls">
                <a-button size="small" @click="updateQuantity(item, item.quantity - 1)">-</a-button>
                <span class="quantity-value">{{ item.quantity }}</span>
                <a-button size="small" @click="updateQuantity(item, item.quantity + 1)">+</a-button>
              </div>
              <div class="item-pricing">
                <span class="item-price">{{ formatCents(item.unitPriceCents) }}</span>
                <span class="item-total">{{ formatCents(item.unitPriceCents * item.quantity) }}</span>
              </div>
            </div>
          </div>
          <a-button type="text" danger size="small" class="remove-btn" @click="removeItem(item)">
            <DeleteOutlined />
          </a-button>
        </div>
      </div>

      <!-- Cart summary -->
      <div v-if="cartStore.items.length > 0" class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span class="summary-value">{{ formatCents(cartStore.subtotalCents) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span v-if="hasFreeShipping" class="free-shipping">FREE</span>
          <span v-else-if="shippingEstimate > 0">{{ formatCents(shippingEstimate) }}</span>
          <span v-else class="shipping-calculated">Calculated at checkout</span>
        </div>
        <div v-if="freeShippingRemaining > 0" class="free-shipping-notice">
          Add {{ formatCents(freeShippingRemaining) }} more for FREE shipping!
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span class="summary-value">{{ formatCents(totalCents) }}</span>
        </div>

        <div class="drawer-actions">
          <a-button block size="large" @click="continueShopping">
            <ArrowLeftOutlined /> Continue Shopping
          </a-button>
          <a-button block size="large" @click="viewCart">
            View Cart
          </a-button>
          <a-button type="primary" block size="large" class="checkout-btn" @click="goToCheckout">
            Checkout
          </a-button>
        </div>
      </div>
    </div>
  </a-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCartOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useCartStore } from '../stores/cart'
import { useCurrency } from '../composables/useCurrency'
import { useStock } from '../composables/useStock'
import { getProductById } from '../data/products'
import type { CartLineItem } from '../types/cart'

const router = useRouter()
const cartStore = useCartStore()
const { formatCents } = useCurrency()
const { calculateCartShipping, qualifiesForFreeShipping, getFreeShippingRemaining } = useStock()

const visible = computed({
  get: () => cartStore.showDrawer,
  set: (value: boolean) => {
    if (value) {
      cartStore.openDrawer()
    } else {
      cartStore.closeDrawer()
    }
  }
})

// Calculate shipping estimate
const shippingEstimate = computed(() => {
  if (cartStore.items.length === 0) return 0

  const items = cartStore.items.map(item => {
    const product = getProductById(item.productId)
    return { product, quantity: item.quantity }
  }).filter(item => item.product)

  return calculateCartShipping(items, cartStore.subtotalCents)
})

// Check if qualifies for free shipping
const hasFreeShipping = computed(() => {
  if (cartStore.items.length === 0) return false
  const firstProduct = getProductById(cartStore.items[0].productId)
  if (!firstProduct) return false
  return qualifiesForFreeShipping(firstProduct, cartStore.subtotalCents)
})

// Remaining amount for free shipping
const freeShippingRemaining = computed(() => {
  if (cartStore.items.length === 0) return 0
  const firstProduct = getProductById(cartStore.items[0].productId)
  if (!firstProduct) return 0
  return getFreeShippingRemaining(firstProduct, cartStore.subtotalCents)
})

// Total with shipping
const totalCents = computed(() => {
  return cartStore.subtotalCents + shippingEstimate.value
})

const updateQuantity = (item: CartLineItem, newQuantity: number) => {
  if (newQuantity <= 0) {
    cartStore.removeItem(item.productId, item.variantId)
  } else {
    cartStore.updateQuantity(item.productId, item.variantId, newQuantity)
  }
}

const removeItem = (item: CartLineItem) => {
  cartStore.removeItem(item.productId, item.variantId)
}

const goToProducts = () => {
  cartStore.closeDrawer()
  router.push('/products-solutions')
}

const continueShopping = () => {
  cartStore.closeDrawer()
}

const viewCart = () => {
  cartStore.closeDrawer()
  router.push('/cart')
}

const goToCheckout = () => {
  cartStore.closeDrawer()
  router.push('/checkout')
}
</script>

<style scoped>
.cart-drawer :deep(.ant-drawer-header) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 20px;
}

.cart-drawer :deep(.ant-drawer-title) {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
}

.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Empty state */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  text-align: center;
}

.empty-icon {
  font-size: 64px;
  color: #d9d9d9;
  margin-bottom: 16px;
}

.empty-cart h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.empty-cart p {
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
}

/* Cart items */
.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 16px 20px;
}

.cart-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #2c3e50;
  line-height: 1.3;
}

.item-variant {
  font-size: 12px;
  color: #666;
  margin: 0 0 8px 0;
}

.item-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.quantity-controls :deep(.ant-btn) {
  width: 24px;
  height: 24px;
  padding: 0;
  font-size: 12px;
}

.quantity-value {
  font-size: 14px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.item-pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.item-price {
  font-size: 12px;
  color: #999;
}

.item-total {
  font-size: 14px;
  font-weight: 700;
  color: var(--partdro-primary, #1888c8);
}

.remove-btn {
  position: absolute;
  top: 12px;
  right: 0;
  padding: 4px;
}

/* Cart summary */
.cart-summary {
  border-top: 2px solid #f0f0f0;
  padding: 16px 20px;
  background: #fafafa;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.summary-row.total {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e8e8e8;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.summary-value {
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.free-shipping {
  color: #52c41a;
  font-weight: 600;
}

.shipping-calculated {
  color: #999;
  font-size: 12px;
}

.free-shipping-notice {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 8px 0;
  font-size: 13px;
  color: #52c41a;
  text-align: center;
}

.summary-note {
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}

.drawer-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
}

.checkout-btn {
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  border: none;
  font-weight: 600;
}

/* Mobile responsiveness */
@media (max-width: 480px) {
  .cart-drawer :deep(.ant-drawer-content-wrapper) {
    width: 100% !important;
  }

  .cart-item {
    gap: 8px;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .item-name {
    font-size: 13px;
  }

  .item-variant {
    font-size: 11px;
  }

  .quantity-controls :deep(.ant-btn) {
    width: 28px;
    height: 28px;
  }

  .quantity-value {
    font-size: 15px;
    min-width: 28px;
  }

  .summary-row {
    font-size: 13px;
  }

  .summary-value {
    font-size: 16px;
  }

  .drawer-actions {
    gap: 6px;
  }
}
</style>
