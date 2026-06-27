<template>
  <div class="checkout-page">
    <Header />

    <div class="checkout-container">
      <h1 class="checkout-title">Checkout</h1>

      <div class="checkout-content">
        <!-- Checkout Form -->
        <div class="checkout-form-section">
          <!-- Contact Information -->
          <div class="form-section">
            <h2 class="section-title">Contact Information</h2>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="form-section">
            <h2 class="section-title">Shipping Address</h2>

            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input
                  id="firstName"
                  v-model="form.shippingAddress.firstName"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input
                  id="lastName"
                  v-model="form.shippingAddress.lastName"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <input
                id="address"
                v-model="form.shippingAddress.address"
                type="text"
                class="form-input"
                placeholder="123 Main St"
                required
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input
                  id="city"
                  v-model="form.shippingAddress.city"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label for="state">State</label>
                <input
                  id="state"
                  v-model="form.shippingAddress.state"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  v-model="form.shippingAddress.zipCode"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              <div class="form-group">
                <label for="country">Country</label>
                <select
                  id="country"
                  v-model="form.shippingAddress.country"
                  class="form-input"
                  required
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone (optional)</label>
              <input
                id="phone"
                v-model="form.shippingAddress.phone"
                type="tel"
                class="form-input"
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <!-- Payment Information (Mock Payment) -->
          <div class="form-section">
            <h2 class="section-title">Payment Information</h2>

            <div class="mock-payment-notice">
              <div class="notice-icon">
                <InfoCircleOutlined />
              </div>
              <div class="notice-content">
                <h3>Demo Mode - Mock Payment</h3>
                <p>This is a demonstration system. No real payment will be processed.</p>
                <div class="test-card-info">
                  <p><strong>Test Card (for display only):</strong></p>
                  <p>Card Number: <code>4242 4242 4242 4242</code></p>
                  <p>Expiry: <code>12/25</code> | CVC: <code>123</code></p>
                </div>
              </div>
            </div>

            <div class="mock-payment-form">
              <div class="form-group">
                <label for="cardNumber">Card Number (Mock)</label>
                <input
                  id="cardNumber"
                  type="text"
                  class="form-input"
                  placeholder="4242 4242 4242 4242"
                  value="4242 4242 4242 4242"
                  readonly
                />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="expiry">Expiry Date</label>
                  <input
                    id="expiry"
                    type="text"
                    class="form-input"
                    placeholder="MM/YY"
                    value="12/25"
                    readonly
                  />
                </div>
                <div class="form-group">
                  <label for="cvc">CVC</label>
                  <input
                    id="cvc"
                    type="text"
                    class="form-input"
                    placeholder="123"
                    value="123"
                    readonly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary-section">
          <h2 class="section-title">Order Summary</h2>

          <div class="order-items">
            <div v-for="item in cartStore.items" :key="`${item.productId}-${item.variantId}`" class="order-item">
              <img :src="item.imageUrl" :alt="item.productName" class="item-image" />
              <div class="item-details">
                <div class="item-name">{{ item.productName }}</div>
                <div v-if="item.variantName" class="item-variant">{{ item.variantName }}</div>
                <div class="item-quantity">Qty: {{ item.quantity }}</div>
              </div>
              <div class="item-price">{{ formatCents(item.unitPriceCents * item.quantity) }}</div>
            </div>
          </div>

          <div class="order-totals">
            <div class="total-row">
              <span>Subtotal</span>
              <span>{{ formatCents(cartStore.subtotalCents) }}</span>
            </div>
            <div class="total-row">
              <span>Shipping</span>
              <span>{{ shippingCents === 0 ? 'FREE' : formatCents(shippingCents) }}</span>
            </div>
            <div class="total-row">
              <span>Tax</span>
              <span>{{ formatCents(taxCents) }}</span>
            </div>
            <div class="total-row total">
              <span>Total</span>
              <span>{{ formatCents(totalCents) }}</span>
            </div>
          </div>

          <button
            class="place-order-btn"
            :disabled="!isFormValid || isProcessing"
            @click="handlePlaceOrder"
          >
            <span v-if="isProcessing">Processing...</span>
            <span v-else>Place Order</span>
          </button>

          <div v-if="orderError" class="order-error">{{ orderError }}</div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useCartStore } from '../stores/cart'
import { useCurrency } from '../composables/useCurrency'

const router = useRouter()
const cartStore = useCartStore()
const { formatCents } = useCurrency()

// Redirect to cart if empty
onMounted(() => {
  if (cartStore.items.length === 0) {
    router.push('/cart')
  }
})

const form = ref({
  email: '',
  shippingAddress: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: ''
  }
})

const orderError = ref<string | null>(null)
const isProcessing = ref(false)

const shippingCents = computed(() => {
  if (cartStore.subtotalCents >= 50000) {
    return 0
  }
  return 2500
})

const taxCents = computed(() => {
  // Simplified tax calculation - 0% for now
  return 0
})

const totalCents = computed(() => {
  return cartStore.subtotalCents + shippingCents.value + taxCents.value
})

const isFormValid = computed(() => {
  return (
    form.value.email &&
    form.value.shippingAddress.firstName &&
    form.value.shippingAddress.lastName &&
    form.value.shippingAddress.address &&
    form.value.shippingAddress.city &&
    form.value.shippingAddress.state &&
    form.value.shippingAddress.zipCode &&
    form.value.shippingAddress.country
  )
})

const handlePlaceOrder = async () => {
  if (!isFormValid.value || isProcessing.value) {
    return
  }

  isProcessing.value = true
  orderError.value = null

  try {
    // Create order directly (mock payment - no real payment processing)
    const response = await fetch('/.netlify/functions/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.value.email,
        items: cartStore.items,
        shippingAddress: form.value.shippingAddress,
        subtotalCents: cartStore.subtotalCents,
        shippingCents: shippingCents.value,
        taxCents: taxCents.value,
        totalCents: totalCents.value
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create order')
    }

    const { order } = await response.json()

    // Clear cart after successful order
    cartStore.clear()

    // Redirect to confirmation page
    router.push({
      path: '/order-confirmation',
      query: { email: form.value.email, orderNumber: order.orderNumber }
    })
  } catch (err) {
    orderError.value = err instanceof Error ? err.message : 'Failed to place order'
    isProcessing.value = false
  }
}
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  background: #f8f9fa;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.checkout-title {
  font-size: 32px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 32px;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 32px;
}

.checkout-form-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.form-section {
  margin-bottom: 32px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* Mock Payment Notice */
.mock-payment-notice {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
}

.notice-icon {
  font-size: 24px;
  color: #1888c8;
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
}

.notice-content h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.notice-content p {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px 0;
}

.test-card-info {
  background: white;
  border-radius: 6px;
  padding: 12px;
  margin-top: 12px;
}

.test-card-info p {
  margin: 4px 0;
  font-size: 13px;
}

.test-card-info code {
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  color: #1888c8;
}

/* Mock Payment Form (Read-only) */
.mock-payment-form .form-input {
  background: #f5f5f5;
  cursor: not-allowed;
  color: #999;
}

.mock-payment-form .form-input:focus {
  border-color: #e8e8e8;
  box-shadow: none;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 16px;
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

.order-summary-section {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.order-items {
  margin-bottom: 24px;
}

.order-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
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
  margin-bottom: 24px;
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

.place-order-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #1888c8, #1a9de4);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.place-order-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 136, 200, 0.3);
}

.place-order-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.order-error {
  margin-top: 16px;
  padding: 12px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  color: #f44336;
  font-size: 14px;
}

@media (max-width: 968px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary-section {
    position: static;
  }
}

@media (max-width: 640px) {
  .checkout-container {
    padding: 24px 16px;
  }

  .checkout-title {
    font-size: 24px;
  }

  .checkout-form-section,
  .order-summary-section {
    padding: 24px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
