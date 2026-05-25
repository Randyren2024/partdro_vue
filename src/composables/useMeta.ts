import { watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../utils/constants'

export function useMeta(title?: string, description?: string) {
  const { t } = useI18n()

  function updateMeta(pageTitle?: string, pageDescription?: string) {
    const siteName = APP_NAME
    document.title = pageTitle ? `${pageTitle} | ${siteName}` : `${siteName} - Professional Mosquito Killer Manufacturer`

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc && pageDescription) {
      metaDesc.setAttribute('content', pageDescription)
    }
  }

  if (title || description) {
    onMounted(() => updateMeta(title, description))
  }

  return { updateMeta }
}
