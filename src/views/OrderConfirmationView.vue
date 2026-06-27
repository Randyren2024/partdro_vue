<template>
  <div class="confirmation-page">
    <Header />

    <div class="confirmation-container">
      <div class="confirmation-card">
        <div class="success-icon">
          <CheckCircleOutlined />
        </div>

        <h1 class="confirmation-title">Order Confirmed!</h1>
        <p class="confirmation-subtitle">Thank you for your purchase</p>

        <div v-if="order" class="order-details">
          <div class="order-number">
            <span class="label">Order Number:</span>
            <span class="value">{{ order.orderNumber }}</span>
          </div>

          <div class="order-info">
            <p>We've sent a confirmation email to <strong>{{ order.email }}</strong></p>
            <p>You can use your order number to track your order status.</p>
          </div>

          <div class="order-items">
            <h3>Order Items</h3>
            <div v-for="item in order.items" :key="item.id" class="order-item">
              <div class="item-info">
                <div class="item-name">{{ item.productName }}</div>
                <div v-if="item.variantName" class="item-variant">{{ item.variantName }}</div>
                <div class="item-quantity">Qty: {{ item.quantity }}</div>
              </div>
              <div class="item-price">{{ formatCents(item.totalCents) }}</div>
            </div>
          </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ formatCents(order.subtotalCents) }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>{{ order.shippingCents === 0 ? 'FREE' : formatCents(order.shippingCents) }}</span>
            </div>
            <div class="total-row">
              <span>Tax</span>
              <span>{{ formatCents(order.taxCents) }}</span>
            </div>
            <div class="total-row total">
              <span>Total</span>
              <span>{{ formatCents(order.totalCents) }}</span>
            </div>
          </div>

          <div class="order-actions">
            <router-link to="/products-solutions" class="continue-shopping-btn">
              Continue Shopping
            </router-link>
            <router-link :to="`/orders/lookup?email=${encodeURIComponent(order.email)}`" class="view-orders-btn">
              View Orders
            </router-link>
          </div>
        </div>

        <div v-else class="loading-state">
          <p>Loading order details...</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCurrency } from '../composables/useCurrency'
import { CheckCircleOutlined } from '@ant-design/icons-vue'

const route = useRoute()
const router = useRouter()
const { formatCents } = useCurrency()

interface OrderItem {
  id: string
  productId: string
  variantId?: string
  productName: string
  variantName?: string
  quantity: number
  unitPriceCents: number
  totalCents: number
}

interface Order {
  id: string
  orderNumber: string
  email: string
  status: string
  subtotalCents: number
  shippingCents: number
  taxCents: number
  totalCents: number
  items: OrderItem[]
}

const order = ref<Order | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  const email = route.query.email as string
  const orderNumber = route.query.orderNumber as string

  if (!email || !orderNumber) {
    error.value = 'Missing email or order number'
    loading.value = false
    return
  }

  try {
    const response = await fetch(
      `/.netlify/functions/get-order?email=${encodeURIComponent(email)}&orderNumber=${encodeURIComponent(orderNumber)}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch order')
    }

    const data = await response.json()
    order.value = data.order
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load order'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.confirmation-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.confirmation-card {
  background: white;
  border-radius: 12px;
  padding: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.success-icon {
  font-size: 64px;
  color: #52c41a;
  margin-bottom: 24px;
}

.confirmation-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 12px;
}

.confirmation-subtitle {
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
}

.order-details {
  text-align: left;
}

.order-number {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  text-align: center;
}

.order-number .label {
  font-size: 14px;
  color: #666;
  margin-right: 8px;
}

.order-number .value {
  font-size: 20px;
  font-weight: 700;
  color: #52c41a;
}

.order-info {
  margin-bottom: 32px;
}

.order-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.order-items {
  margin-bottom: 32px;
}

.order-items h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 4px;
}

.item-variant {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.item-quantity {
  font-size: 12px;
  color: #666;
}

.item-price {
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
}

.order-totals {
  margin-bottom: 32px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
}

.total-row.total {
  border-top: 2px solid #f0f0f0;
  margin-top: 12px;
  padding-top: 16px;
  font-size: 18px;
  font-weight: 700;
  color: #2c3e50;
}

.order-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.continue-shopping-btn,
.view-orders-btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.continue-shopping-btn {
  background: #1888c8;
  color: white;
}

.continue-shopping-btn:hover {
  background: #0f6da0;
}

.view-orders-btn {
  background: white;
  color: #1888c8;
  border: 1px solid #1888c8;
}

.view-orders-btn:hover {
  background: #f6ffed;
}

.loading-state {
  padding: 40px;
  text-align: center;
}

.loading-state p {
  font-size: 16px;
  color: #666;
}

@media (max-width: 640px) {
  .confirmation-container {
    padding: 24px 16px;
  }

  .confirmation-card {
    padding: 32px 24px;
  }

  .confirmation-title {
    font-size: 24px;
  }

  .order-actions {
    flex-direction: column;
  }
}
</style>
