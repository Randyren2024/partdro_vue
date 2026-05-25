import { useI18n } from 'vue-i18n'
import { WHATSAPP_NUMBER } from '../utils/constants'

export function useWhatsApp() {
  const { t } = useI18n()

  function openWhatsApp(customMessage?: string) {
    const msg = customMessage || t('whatsapp.message')
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
  }

  function openProductInquiry(model: string, name: string, brandName: string) {
    const msg = `Hello! I'm interested in the ${model} ${name}. Could you please provide pricing and more information?`
    openWhatsApp(msg)
  }

  return { openWhatsApp, openProductInquiry }
}
