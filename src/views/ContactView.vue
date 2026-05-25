<template>
  <PageLayout>
    <PageHero :title="$t('contact.title')" :subtitle="$t('contact.subtitle')" />

    <section class="contact-section" v-motion-fade-visible>
      <div class="section-container">
        <a-row :gutter="[48, 32]">
          <a-col :sm="24" :md="14">
            <h2 class="section-title">{{ $t('contact.sendMessage') }}</h2>
            <form name="contact" method="POST" netlify netlify-honeypot="bot-field" class="contact-form" @submit.prevent="handleSubmit">
              <input type="hidden" name="form-name" value="contact" />
              <p style="display:none">
                <label>Don't fill this out: <input name="bot-field" /></label>
              </p>
              <a-row :gutter="16">
                <a-col :span="12">
                  <div class="form-field">
                    <label class="form-label">{{ $t('contact.firstName') }} *</label>
                    <a-input v-model:value="formState.firstName" name="firstName" size="large" />
                  </div>
                </a-col>
                <a-col :span="12">
                  <div class="form-field">
                    <label class="form-label">{{ $t('contact.lastName') }} *</label>
                    <a-input v-model:value="formState.lastName" name="lastName" size="large" />
                  </div>
                </a-col>
              </a-row>
              <div class="form-field">
                <label class="form-label">{{ $t('contact.company') }}</label>
                <a-input v-model:value="formState.company" name="company" size="large" />
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('contact.email') }} *</label>
                <a-input v-model:value="formState.email" name="email" type="email" size="large" />
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('contact.phone') }}</label>
                <a-input v-model:value="formState.phone" name="phone" size="large" />
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('contact.inquiryType') }}</label>
                <a-select v-model:value="formState.inquiryType" size="large">
                  <a-select-option value="pricing">{{ $t('contact.inquiryTypes.pricing') }}</a-select-option>
                  <a-select-option value="oem">{{ $t('contact.inquiryTypes.oem') }}</a-select-option>
                  <a-select-option value="sample">{{ $t('contact.inquiryTypes.sample') }}</a-select-option>
                  <a-select-option value="technical">{{ $t('contact.inquiryTypes.technical') }}</a-select-option>
                  <a-select-option value="other">{{ $t('contact.inquiryTypes.other') }}</a-select-option>
                </a-select>
                <input type="hidden" :value="formState.inquiryType" name="inquiryType" />
              </div>
              <div class="form-field">
                <label class="form-label">{{ $t('contact.message') }} *</label>
                <a-textarea v-model:value="formState.message" name="message" :rows="5" size="large" />
              </div>
              <div class="form-field">
                <a-button type="primary" html-type="submit" size="large" class="btn-pill-primary" :loading="submitting">
                  {{ $t('contact.submit') }}
                </a-button>
              </div>
            </form>
          </a-col>

          <a-col :sm="24" :md="10">
            <h2 class="section-title">{{ $t('contact.contactInfo') }}</h2>
            <div class="info-cards">
              <a-card class="info-card" v-for="item in infoItems" :key="item.title">
                <div class="info-icon">{{ item.icon }}</div>
                <h4>{{ item.title }}</h4>
                <p v-html="item.value" />
              </a-card>
            </div>
          </a-col>
        </a-row>
      </div>
    </section>
  </PageLayout>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { message } from 'ant-design-vue'
import PageLayout from '../components/layout/PageLayout.vue'
import PageHero from '../components/common/PageHero.vue'

const { t } = useI18n()
const submitting = ref(false)

const formState = reactive({
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  inquiryType: undefined as string | undefined,
  message: '',
})

const infoItems = computed(() => [
  { icon: '\u{1F310}', title: t('contact.website'), value: 'www.partdro.com' },
  { icon: '\u{1F4E7}', title: t('contact.email'), value: 'sales@partdro.com' },
  { icon: '\u{1F4DE}', title: t('contact.phone'), value: '+86 138 1989 6337' },
  { icon: '\u{1F4CD}', title: 'Address', value: 'Guanhaiwei Town, Cixi, Ningbo<br />Zhejiang, China' },
  { icon: '\u{1F555}', title: t('contact.businessHours'), value: `${t('contact.hours')}<br />${t('contact.timezone')}` },
])

const encodeForm = (data: Record<string, any>) =>
  Object.entries(data)
    .filter(([_, v]) => v != null && v !== '')
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&')

const handleSubmit = async () => {
  if (!formState.firstName || !formState.email || !formState.message) {
    message.warning(t('contact.requiredWarning'))
    return
  }
  submitting.value = true
  try {
    const body = encodeForm({
      'form-name': 'contact',
      firstName: formState.firstName,
      lastName: formState.lastName,
      company: formState.company,
      email: formState.email,
      phone: formState.phone,
      inquiryType: formState.inquiryType,
      message: formState.message,
    })
    await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
    message.success(t('contact.successMsg'))
    Object.assign(formState, { firstName: '', lastName: '', company: '', email: '', phone: '', inquiryType: undefined, message: '' })
  } catch {
    message.error('Submission failed. Please try again or contact us via WhatsApp.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.section-container { max-width: 1200px; margin: 0 auto; padding: 48px 24px; }
.section-title { font-size: 24px; font-weight: 700; font-family: 'Sora', sans-serif; margin-bottom: 24px; color: var(--color-navy); letter-spacing: -0.02em; }
.form-field { margin-bottom: 20px; }
.form-label { display: block; font-weight: 500; margin-bottom: 6px; color: var(--color-text); font-size: 14px; }
.info-cards { display: flex; flex-direction: column; gap: 14px; }
.info-card { border-radius: var(--radius-md); border: 1px solid var(--color-warm-border); }
.info-card .info-icon { font-size: 24px; margin-bottom: 8px; }
.info-card h4 { font-size: 16px; font-weight: 600; margin-bottom: 4px; color: var(--color-navy); }
.info-card p { font-size: 14px; color: var(--color-text-secondary); margin: 0; line-height: 1.6; }
</style>
