<template>
  <div class="cart-page">
    <Header />

    <section class="cart-section">
      <div class="cart-container">
        <h1 class="cart-title">Shopping Cart</h1>

        <div v-if="cartStore.items.length === 0" class="empty-cart">
          <ShoppingCartOutlined class="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a-button type="primary" size="large" class="btn-pill-primary" @click="$router.push('/products-solutions')">
            Browse Products
          </a-button>
        </div>

        <div v-else class="cart-content">
          <div class="cart-items">
            <div v-for="item in cartStore.items" :key="`${item.productId}-${item.variantId}`" class="cart-item">
              <img :src="item.imageUrl" :alt="item.productName" class="item-image" />
              <div class="item-details">
                <h3 class="item-name">{{ item.productName }}</h3>
                <p v-if="item.variantName" class="item-variant">{{ item.variantName }}</p>
                <p class="item-price">{{ formatCents(item.unitPriceCents) }}</p>
              </div>
              <div class="item-quantity">
                <a-button size="small" @click="updateQuantity(item, item.quantity - 1)">-</a-button>
                <span class="quantity-value">{{ item.quantity }}</span>
                <a-button size="small" @click="updateQuantity(item, item.quantity + 1)">+</a-button>
              </div>
              <div class="item-total">
                {{ formatCents(item.unitPriceCents * item.quantity) }}
              </div>
              <a-button type="text" danger size="small" @click="removeItem(item)">
                <DeleteOutlined />
              </a-button>
            </div>
          </div>

          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>{{ formatCents(cartStore.subtotalCents) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span v-if="hasFreeShipping" class="free-shipping">FREE</span>
              <span v-else-if="shippingEstimate > 0">{{ formatCents(shippingEstimate) }}</span>
              <span v-else>Calculated at checkout</span>
            </div>
            <div v-if="freeShippingRemaining > 0" class="free-shipping-notice">
              Add {{ formatCents(freeShippingRemaining) }} more for FREE shipping!
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ formatCents(totalCents) }}</span>
            </div>
            <a-button block size="large" class="continue-btn" @click="continueShopping">
              <ArrowLeftOutlined /> Continue Shopping
            </a-button>
            <a-button type="primary" size="large" block class="btn-pill-primary checkout-btn" @click="$router.push('/checkout')">
              Proceed to Checkout
            </a-button>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingCartOutlined, DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'
import { useCurrency } from '../composables/useCurrency'
import { useStock } from '../composables/useStock'
import { getProductById } from '../data/products'
import type { CartLineItem } from '../types/cart'

const cartStore = useCartStore()
const { formatCents } = useCurrency()
const { calculateCartShipping, qualifiesForFreeShipping, getFreeShippingRemaining } = useStock()

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

const continueShopping = () => {
  window.history.back()
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.cart-section {
  padding: 40px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-title {
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #2c3e50;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-icon {
  font-size: 64px;
  color: #d9d9d9;
  margin-bottom: 24px;
}

.empty-cart h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #2c3e50;
}

.empty-cart p {
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
}

.cart-items {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.item-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #2c3e50;
}

.item-variant {
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
}

.item-price {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-value {
  font-size: 16px;
  font-weight: 600;
  min-width: 32px;
  text-align: center;
}

.item-total {
  font-size: 18px;
  font-weight: 700;
  color: var(--partdro-primary, #1888c8);
  min-width: 100px;
  text-align: right;
}

.cart-summary {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 16px;
  color: #666;
}

.summary-row.total {
  border-top: 2px solid #f0f0f0;
  margin-top: 12px;
  padding-top: 16px;
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

.checkout-btn {
  margin-top: 12px;
  height: 48px;
  font-size: 16px;
}

.continue-btn {
  margin-top: 20px;
  height: 48px;
  font-size: 16px;
}

.free-shipping {
  color: #52c41a;
  font-weight: 600;
}

.free-shipping-notice {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 12px 0;
  font-size: 13px;
  color: #52c41a;
  text-align: center;
}

@media (max-width: 768px) {
  .cart-section {
    padding: 24px 16px;
  }

  .cart-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .cart-content {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .cart-items {
    padding: 16px;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 12px;
    padding: 12px 0;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-name {
    font-size: 14px;
  }

  .item-variant,
  .item-price {
    font-size: 12px;
  }

  .item-quantity,
  .item-total {
    grid-column: 2;
  }

  .item-quantity {
    margin-top: 8px;
  }

  .item-total {
    font-size: 16px;
    min-width: auto;
  }

  .quantity-value {
    font-size: 14px;
    min-width: 28px;
  }

  .cart-summary {
    padding: 20px;
    position: static;
  }

  .summary-row {
    font-size: 14px;
    padding: 10px 0;
  }

  .summary-row.total {
    font-size: 18px;
    padding-top: 14px;
  }

  .checkout-btn,
  .continue-btn {
    height: 44px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .cart-item {
    grid-template-columns: 60px 1fr;
    gap: 10px;
  }

  .item-image {
    width: 60px;
    height: 60px;
  }

  .item-name {
    font-size: 13px;
  }

  .item-quantity {
    flex-wrap: wrap;
  }
}
</style>
