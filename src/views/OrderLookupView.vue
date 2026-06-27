<template>
  <div class="lookup-page">
    <Header />

    <div class="lookup-container">
      <h1 class="lookup-title">Track Your Order</h1>
      <p class="lookup-subtitle">Enter your email and order number to view order details.</p>

      <form class="lookup-form" @submit.prevent="handleLookup">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            placeholder="your@email.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="orderNumber">Order Number</label>
          <input
            id="orderNumber"
            v-model="orderNumber"
            type="text"
            class="form-input"
            placeholder="PD-20260623-XXXX"
            required
          />
        </div>

        <button class="lookup-btn" :disabled="isLoading" type="submit">
          <span v-if="isLoading">Looking up...</span>
          <span v-else>Track Order</span>
        </button>

        <div v-if="error" class="lookup-error">{{ error }}</div>
      </form>

      <div v-if="order" class="order-result">
        <div class="order-header">
          <CheckCircleFilled class="success-icon" />
          <h2>Order Found</h2>
        </div>

        <div class="order-summary-card">
          <div class="order-meta">
            <div class="meta-row">
              <span class="label">Order Number</span>
              <span class="value">{{ order.orderNumber }}</span>
            </div>
            <div class="meta-row">
              <span class="label">Email</span>
              <span class="value">{{ order.email }}</span>
            </div>
            <div class="meta-row">
              <span class="label">Status</span>
              <span class="value status-paid">{{ order.status }}</span>
            </div>
            <div class="meta-row">
              <span class="label">Placed</span>
              <span class="value">{{ formatDate(order.createdAt) }}</span>
            </div>
          </div>

          <h3>Order Items</h3>
          <div v-for="item in order.items" :key="item.id" class="order-item">
            <div class="item-info">
              <div class="item-name">{{ item.productName }}</div>
              <div v-if="item.variantName" class="item-variant">{{ item.variantName }}</div>
              <div class="item-quantity">Qty: {{ item.quantity }}</div>
            </div>
            <div class="item-price">{{ formatCents(item.totalCents) }}</div>
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
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircleFilled } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCurrency } from '../composables/useCurrency'

const route = useRoute()
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
  createdAt: string
}

const email = ref('')
const orderNumber = ref('')
const order = ref<Order | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)

onMounted(() => {
  if (route.query.email) {
    email.value = route.query.email as string
  }
})

const formatDate = (iso: string) => {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleLookup = async () => {
  if (!email.value || !orderNumber.value) return

  isLoading.value = true
  error.value = null
  order.value = null

  try {
    const response = await fetch(
      `/.netlify/functions/get-order?email=${encodeURIComponent(email.value)}&orderNumber=${encodeURIComponent(orderNumber.value)}`
    )

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Order not found')
    }

    const data = await response.json()
    order.value = data.order
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to look up order'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.lookup-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.lookup-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 24px;
}

.lookup-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
}

.lookup-subtitle {
  font-size: 16px;
  color: #666;
  margin-bottom: 32px;
  text-align: center;
}

.lookup-form {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 16px;
  color: #2c3e50;
  transition: all 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #1888c8;
  box-shadow: 0 0 0 2px rgba(24, 136, 200, 0.1);
}

.lookup-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.lookup-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 136, 200, 0.3);
}

.lookup-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.lookup-error {
  margin-top: 16px;
  padding: 12px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  color: #f44336;
  font-size: 14px;
}

.order-result {
  margin-top: 24px;
}

.order-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  justify-content: center;
}

.order-header h2 {
  font-size: 20px;
  color: #2c3e50;
  margin: 0;
}

.success-icon {
  font-size: 24px;
  color: #52c41a;
}

.order-summary-card {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.order-meta {
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 14px;
}

.meta-row .label {
  color: #666;
}

.meta-row .value {
  font-weight: 600;
  color: #2c3e50;
}

.status-paid {
  text-transform: capitalize;
  color: #52c41a !important;
}

.order-summary-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-of-type {
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
  margin-top: 24px;
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

@media (max-width: 640px) {
  .lookup-container {
    padding: 24px 16px;
  }

  .lookup-title {
    font-size: 24px;
  }

  .lookup-form,
  .order-summary-card {
    padding: 24px;
  }
}
</style>