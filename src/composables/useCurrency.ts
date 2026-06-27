/**
 * Currency formatting utilities.
 * All monetary values in the app are stored in cents (分) to avoid floating-point precision issues.
 * Use formatCents() to render as human-readable "$199.90".
 */

/**
 * Format a cent amount as a USD currency string.
 *
 * @param cents - Amount in cents (e.g., 19990 = $199.90)
 * @returns Formatted string like "$199.90"
 *
 * @example
 * formatCents(19990) // "$199.90"
 * formatCents(0) // "$0.00"
 * formatCents(100) // "$1.00"
 */
export function formatCents(cents: number): string {
  const dollars = cents / 100
  return `$${dollars.toFixed(2)}`
}

/**
 * Format a cent amount with thousands separator.
 *
 * @param cents - Amount in cents (e.g., 1234567 = $12,345.67)
 * @returns Formatted string like "$12,345.67"
 *
 * @example
 * formatCentsWithSeparator(1234567) // "$12,345.67"
 */
export function formatCentsWithSeparator(cents: number): string {
  const dollars = cents / 100
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`
}

/**
 * Composable for currency operations in Vue components.
 * Provides reactive access to formatting functions.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useCurrency } from '@/composables/useCurrency'
 * const { formatCents } = useCurrency()
 * </script>
 * <template>
 *   <span>{{ formatCents(product.price) }}</span>
 * </template>
 * ```
 */
export function useCurrency() {
  return {
    formatCents,
    formatCentsWithSeparator
  }
}
