<template>
  <div class="privacy-policy">
    <!-- 导航栏 -->
    <Header />

    <!-- Hero Section -->
    <section class="hero-section" v-motion-fade-visible :delay="100">
      <div class="hero-content" v-motion-slide-visible-bottom :delay="200">
        <h1 class="hero-title">Privacy Policy</h1>
        <p class="hero-subtitle">Your privacy is important to us</p>
      </div>
    </section>

    <!-- Content -->
    <section class="content-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <!-- Table of Contents -->
        <div class="toc">
          <h3 class="toc-title">Contents</h3>
          <ul class="toc-list">
            <li><a href="#introduction" @click="scrollTo('introduction')">1. Introduction</a></li>
            <li><a href="#information-collected" @click="scrollTo('information-collected')">2. Information We Collect</a></li>
            <li><a href="#how-collected" @click="scrollTo('how-collected')">3. How We Collect Information</a></li>
            <li><a href="#use-information" @click="scrollTo('use-information')">4. How We Use Your Information</a></li>
            <li><a href="#information-sharing" @click="scrollTo('information-sharing')">5. Information Sharing</a></li>
            <li><a href="#data-security" @click="scrollTo('data-security')">6. Data Security</a></li>
            <li><a href="#user-rights" @click="scrollTo('user-rights')">7. Your Rights</a></li>
            <li><a href="#cookies" @click="scrollTo('cookies')">8. Cookie Policy</a></li>
            <li><a href="#children-privacy" @click="scrollTo('children-privacy')">9. Children's Privacy</a></li>
            <li><a href="#policy-updates" @click="scrollTo('policy-updates')">10. Policy Updates</a></li>
            <li><a href="#contact-us" @click="scrollTo('contact-us')">11. Contact Us</a></li>
          </ul>
        </div>

        <!-- Main Content -->
        <div class="content-main">
          <!-- 1. Introduction -->
          <div id="introduction" class="content-block">
            <h2>1. Introduction</h2>
            <p>
              Vesper AgriTech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website, use our products, or contact our services.
            </p>
            <p>
              <strong>Last Updated:</strong> {{ lastUpdatedDate }}
            </p>
            <p>
              By accessing or using our services, you agree to this Privacy Policy. If you do not agree with the terms of this policy, 
              please do not access our website or use our services.
            </p>
          </div>

          <!-- 2. Information We Collect -->
          <div id="information-collected" class="content-block">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name and title</li>
              <li>Physical address</li>
              <li>Payment information (for purchases)</li>
              <li>Communication preferences</li>
            </ul>
            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website URLs</li>
              <li>Device information</li>
            </ul>
          </div>

          <!-- 3. How We Collect Information -->
          <div id="how-collected" class="content-block">
            <h2>3. How We Collect Information</h2>
            <h3>Directly Provided Information</h3>
            <p>You provide information to us when you:</p>
            <ul>
              <li>Fill out contact forms</li>
              <li>Request product demos</li>
              <li>Subscribe to newsletters</li>
              <li>Purchase products</li>
              <li>Contact customer support</li>
            </ul>
            <h3>Automatically Collected Information</h3>
            <p>We automatically collect information through:</p>
            <ul>
              <li>Cookies and similar technologies</li>
              <li>Web server logs</li>
              <li>Analytics tools</li>
              <li>Social media plugins</li>
            </ul>
          </div>

          <!-- 4. How We Use Your Information -->
          <div id="use-information" class="content-block">
            <h2>4. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li><strong>Provide Services:</strong> To deliver products and services you request</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries and provide technical assistance</li>
              <li><strong>Marketing:</strong> To send you information about our products, promotions, and events (you can opt-out at any time)</li>
              <li><strong>Product Improvement:</strong> To analyze usage patterns and improve our offerings</li>
              <li><strong>Communication:</strong> To send you important notices and updates</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </div>

          <!-- 5. Information Sharing -->
          <div id="information-sharing" class="content-block">
            <h2>5. Information Sharing</h2>
            <p>We may share your information with:</p>
            <h3>Service Providers</h3>
            <p>
              Third-party vendors who help us operate our website, process payments, or provide services on our behalf. 
              These providers are contractually obligated to protect your information.
            </p>
            <h3>Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of company assets, your information may be transferred to the acquiring entity.
            </p>
            <h3>Legal Requirements</h3>
            <p>
              We may disclose your information when required by law, court order, or government regulation, 
              or to enforce our terms and conditions.
            </p>
            <p class="alert">
              <strong>We do not sell your personal information to third parties for marketing purposes.</strong>
            </p>
          </div>

          <!-- 6. Data Security -->
          <div id="data-security" class="content-block">
            <h2>6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your information, including:</p>
            <ul>
              <li><strong>Encryption:</strong> SSL/TLS encryption for data in transit</li>
              <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
              <li><strong>Secure Storage:</strong> Encrypted databases with regular backups</li>
              <li><strong>Monitoring:</strong> Regular security audits and vulnerability assessments</li>
              <li><strong>Employee Training:</strong> Staff trained on data protection and privacy</li>
            </ul>
            <p>
              While we strive to protect your information, no method of electronic transmission or storage is 100% secure. 
              We cannot guarantee absolute security.
            </p>
          </div>

          <!-- 7. Your Rights -->
          <div id="user-rights" class="content-block">
            <h2>7. Your Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information ("Right to be Forgotten")</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
              <li><strong>Complaint:</strong> File a complaint with data protection authorities</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the information provided in the Contact Us section.
            </p>
          </div>

          <!-- 8. Cookie Policy -->
          <div id="cookies" class="content-block">
            <h2>8. Cookie Policy</h2>
            <h3>What Are Cookies?</h3>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help remember your preferences 
              and improve your browsing experience.
            </p>
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <h3>Managing Cookies</h3>
            <p>
              You can manage or disable cookies through your browser settings. Please note that disabling 
              essential cookies may affect website functionality.
            </p>
          </div>

          <!-- 9. Children's Privacy -->
          <div id="children-privacy" class="content-block">
            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under the age of 16. We do not knowingly collect 
              personal information from children under 16. If you believe we have collected information from 
              a child under 16, please contact us immediately.
            </p>
          </div>

          <!-- 10. Policy Updates -->
          <div id="policy-updates" class="content-block">
            <h2>10. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new policy on our website and updating the "Last Updated" date at the top of this page.
            </p>
            <p>
              We encourage you to review this Privacy Policy periodically for any changes. 
              Your continued use of our services after changes are posted constitutes acceptance of the updated policy.
            </p>
          </div>

          <!-- 11. Contact Us -->
          <div id="contact-us" class="content-block">
            <h2>11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <div class="contact-info-box">
              <p><strong>Vesper AgriTech</strong></p>
              <p>📧 Email: market@vesperinno.com</p>
              <p>📞 Phone: +61 448 290 926</p>
              <p>📍 Location: Australia</p>
              <p class="contact-action">
                <a-button type="primary" @click="$router.push('/contact_us')">Contact Us</a-button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LinkedinOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const current = ref<string[]>(['privacy'])

// 最后更新日期
const lastUpdatedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

// 版权年份
const copyrightYear = computed(() => {
  const startYear = 2024
  const currentYear = new Date().getFullYear()
  return currentYear > startYear ? `${startYear}-${currentYear}` : currentYear.toString()
})

// 滚动到指定部分
const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Logo错误处理
const handleLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('Header logo WebP failed to load, falling back to PNG')
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

const handleFooterLogoError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('Footer logo WebP failed to load, falling back to PNG')
  if (img.src.includes('.webp')) {
    img.src = '/logo.png'
  }
}

// WhatsApp联系
const openWhatsApp = () => {
  const phoneNumber = '61448290926'
  const message = 'Hello! I would like to request a demo of Vesper AgriTech products.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<style scoped>
.privacy-policy {
  font-family: 'Noto Sans', 'Noto Sans SC', 'Inter', sans-serif;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #2e7d32, #1a5e20);
  padding: 80px 20px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff, #e6f7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: clamp(18px, 2vw, 24px);
  color: rgba(255, 255, 255, 0.9);
}

/* Content Section */
.content-section {
  padding: 60px 0;
  background: #f8f9fa;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 50px;
}

@media (max-width: 900px) {
  .section-container {
    grid-template-columns: 1fr;
  }
}

/* Table of Contents */
.toc {
  position: sticky;
  top: 100px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
}

.toc-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #52c41a;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-list li {
  margin-bottom: 12px;
}

.toc-list a {
  color: #666;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  display: block;
  padding: 8px 12px;
  border-radius: 6px;
}

.toc-list a:hover {
  color: #52c41a;
  background: #f6ffed;
}

@media (max-width: 900px) {
  .toc {
    display: none;
  }
}

/* Main Content */
.content-main {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.content-block {
  margin-bottom: 50px;
  padding-bottom: 40px;
  border-bottom: 1px solid #eee;
}

.content-block:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.content-block h2 {
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
}

.content-block h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
  margin-top: 24px;
}

.content-block h3:first-of-type {
  margin-top: 0;
}

.content-block p {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 16px;
}

.content-block ul {
  padding-left: 24px;
  margin-bottom: 20px;
}

.content-block li {
  font-size: 16px;
  line-height: 1.7;
  color: #444;
  margin-bottom: 10px;
}

.content-block strong {
  color: #2c3e50;
}

.alert {
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  padding: 16px 20px;
  border-radius: 8px;
  color: #2e7d32;
  font-weight: 500;
}

/* Contact Info Box */
.contact-info-box {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin-top: 20px;
}

.contact-info-box p {
  margin-bottom: 12px;
}

.contact-action {
  margin-top: 20px !important;
}

.contact-action .ant-btn {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  border: none;
}

/* Footer Styles */
.header {
  background: white;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 16px;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 0;
  flex-wrap: wrap;
  gap: 16px;
}

.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-image {
  width: 120px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.nav-menu {
  border: none;
  background: transparent;
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.nav-menu :deep(.ant-menu-item) {
  padding: 0 12px !important;
  font-size: clamp(14px, 1.1vw, 16px);
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-shrink: 0;
}

.demo-btn {
  background: linear-gradient(135deg, #52c41a, #73d13d);
  border: none;
  font-weight: 500;
  white-space: nowrap;
  font-size: clamp(14px, 1.1vw, 16px);
  padding: 8px 16px;
  height: auto;
}

.footer {
  background: #1a252f;
  color: white;
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px) 24px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  gap: clamp(24px, 3vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-logo-image {
  width: 80px;
  height: auto;
  object-fit: contain;
  opacity: 0.9;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 14px;
}

.footer-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
}

.footer-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #52c41a;
}

.footer-contact {
  color: rgba(255, 255, 255, 0.7);
  margin: 4px 0;
  font-size: 14px;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .content-main {
    padding: 24px;
  }
  
  .content-block h2 {
    font-size: 20px;
  }
  
  .content-block h3 {
    font-size: 16px;
  }
}
</style>