import { ref, onMounted, onUnmounted } from 'vue'
import { loadStripe, type Stripe, type StripeElements, type StripeCardElement } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export function useStripe() {
  const stripe = ref<Stripe | null>(null)
  const elements = ref<StripeElements | null>(null)
  const cardElement = ref<StripeCardElement | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    try {
      stripe.value = await stripePromise
      loading.value = false
    } catch (err) {
      error.value = 'Failed to load Stripe'
      loading.value = false
      console.error('Stripe loading error:', err)
    }
  })

  const createElements = (clientSecret: string) => {
    if (!stripe.value) {
      throw new Error('Stripe not loaded')
    }

    elements.value = stripe.value.elements({
      clientSecret,
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#1888c8',
          colorBackground: '#ffffff',
          colorText: '#2c3e50',
          colorDanger: '#f44336',
          fontFamily: 'Barlow, system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '8px',
        },
        rules: {
          '.Input': {
            border: '1px solid #e8e8e8',
            boxShadow: 'none',
            padding: '12px',
          },
          '.Input:focus': {
            border: '1px solid #1888c8',
            boxShadow: '0 0 0 2px rgba(24, 136, 200, 0.1)',
          },
          '.Label': {
            fontWeight: '600',
            color: '#2c3e50',
          },
        },
      },
    })

    return elements.value
  }

  const createCardElement = (container: string | HTMLElement) => {
    if (!elements.value) {
      throw new Error('Elements not created')
    }

    cardElement.value = elements.value.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#2c3e50',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#f44336',
          iconColor: '#f44336',
        },
      },
    })

    cardElement.value.mount(container)
    return cardElement.value
  }

  const confirmPayment = async (clientSecret: string) => {
    if (!stripe.value || !elements.value) {
      throw new Error('Stripe or elements not loaded')
    }

    const result = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement.value!,
      },
    })

    if (result.error) {
      throw new Error(result.error.message)
    }

    return result.paymentIntent
  }

  const destroyCardElement = () => {
    if (cardElement.value) {
      cardElement.value.destroy()
      cardElement.value = null
    }
  }

  onUnmounted(() => {
    destroyCardElement()
  })

  return {
    stripe,
    elements,
    cardElement,
    loading,
    error,
    createElements,
    createCardElement,
    confirmPayment,
    destroyCardElement,
  }
}
