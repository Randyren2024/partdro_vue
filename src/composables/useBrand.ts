import { computed } from 'vue'

export function useBrand() {
  const brand = computed(() => 'partdro' as const)
  const isPartdro = computed(() => true)
  const productListPath = computed(() => '/products')
  const productDetailPath = computed(() => (id: string) => `/products/${id}`)
  const imagePrefix = computed(() => '/images')
  const brandDisplayName = computed(() => 'Partdro')
  const brandTagColor = computed(() => 'blue')

  return {
    brand,
    isPhilips: computed(() => false),
    isPartdro,
    productListPath,
    productDetailPath,
    imagePrefix,
    brandDisplayName,
    brandTagColor,
  }
}
