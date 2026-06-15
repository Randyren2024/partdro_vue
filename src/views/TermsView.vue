<template>
  <div class="terms-conditions">
    <!-- 导航栏 -->
    <Header />

    <!-- Hero Section -->
    <section class="hero-section" v-motion-fade-visible :delay="100">
      <div class="hero-content" v-motion-slide-visible-bottom :delay="200">
        <h1 class="hero-title">Terms & Conditions</h1>
        <p class="hero-subtitle">Please read these terms carefully before using our services</p>
      </div>
    </section>

    <!-- Content -->
    <section class="content-section" v-motion-fade-visible :delay="300">
      <div class="section-container">
        <!-- Table of Contents -->
        <div class="toc">
          <h3 class="toc-title">Contents</h3>
          <ul class="toc-list">
            <li><a href="#acceptance" @click="scrollTo('acceptance')">1. Acceptance of Terms</a></li>
            <li><a href="#eligibility" @click="scrollTo('eligibility')">2. Eligibility</a></li>
            <li><a href="#products-services" @click="scrollTo('products-services')">3. Products & Services</a></li>
            <li><a href="#user-accounts" @click="scrollTo('user-accounts')">4. User Accounts</a></li>
            <li><a href="#intellectual-property" @click="scrollTo('intellectual-property')">5. Intellectual Property</a></li>
            <li><a href="#user-conduct" @click="scrollTo('user-conduct')">6. User Conduct</a></li>
            <li><a href="#disclaimer" @click="scrollTo('disclaimer')">7. Disclaimer</a></li>
            <li><a href="#limitation-liability" @click="scrollTo('limitation-liability')">8. Limitation of Liability</a></li>
            <li><a href="#indemnification" @click="scrollTo('indemnification')">9. Indemnification</a></li>
            <li><a href="#termination" @click="scrollTo('termination')">10. Termination</a></li>
            <li><a href="#governing-law" @click="scrollTo('governing-law')">11. Governing Law</a></li>
            <li><a href="#contact-us" @click="scrollTo('contact-us')">12. Contact Us</a></li>
          </ul>
        </div>

        <!-- Main Content -->
        <div class="content-main">
          <!-- 1. Acceptance -->
          <div id="acceptance" class="content-block">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Vesper AgriTech's website, products, or services, you agree to be bound by these 
              Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not access or use our services.
            </p>
            <p>
              <strong>Last Updated:</strong> {{ lastUpdatedDate }}
            </p>
          </div>

          <!-- 2. Eligibility -->
          <div id="eligibility" class="content-block">
            <h2>2. Eligibility</h2>
            <p>To use our services, you must:</p>
            <ul>
              <li>Be at least 16 years old, or the age of majority in your jurisdiction</li>
              <li>Have the legal capacity to enter into binding contracts</li>
              <li>Not be prohibited from receiving our services under applicable law</li>
            </ul>
            <p>
              By using our services, you represent that you meet these eligibility requirements.
            </p>
          </div>

          <!-- 3. Products & Services -->
          <div id="products-services" class="content-block">
            <h2>3. Products & Services</h2>
            <h3>Product Descriptions</h3>
            <p>
              We strive to provide accurate product descriptions, specifications, and pricing. 
              However, we do not warrant that product descriptions, images, or pricing are accurate, 
              complete, or current. Errors will be corrected when discovered.
            </p>
            <h3>Orders and Pricing</h3>
            <p>
              All orders are subject to acceptance. Prices are subject to change without notice. 
              We reserve the right to refuse or cancel any order for any reason.
            </p>
            <h3>Payment</h3>
            <p>
              Payment terms are specified at the time of purchase. We accept various payment methods 
              as listed on our website.
            </p>
            <h3>Shipping & Delivery</h3>
            <p>
              Shipping times are estimates and may vary. Risk of loss passes to you upon delivery 
              to the carrier.
            </p>
          </div>

          <!-- 4. User Accounts -->
          <div id="user-accounts" class="content-block">
            <h2>4. User Accounts</h2>
            <h3>Account Registration</h3>
            <p>
              Some services require account registration. You agree to provide accurate and complete 
              information and to keep your information updated.
            </p>
            <h3>Account Security</h3>
            <p>You are responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access</li>
            </ul>
            <p>
              We are not liable for any losses caused by unauthorized account access.
            </p>
            <h3>Account Termination</h3>
            <p>
              We reserve the right to terminate accounts that violate these Terms or for any other 
              reason at our sole discretion.
            </p>
          </div>

          <!-- 5. Intellectual Property -->
          <div id="intellectual-property" class="content-block">
            <h2>5. Intellectual Property</h2>
            <h3>Ownership</h3>
            <p>
              All content on our website, including text, graphics, logos, images, software, and other 
              materials, is owned by Vesper AgriTech or our licensors and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <h3>Restrictions</h3>
            <p>You may not:</p>
            <ul>
              <li>Copy, modify, or distribute our content without permission</li>
              <li>Use our trademarks without authorization</li>
              <li>Reproduce our products or designs</li>
              <li>Remove proprietary notices</li>
            </ul>
            <p class="alert">
              <strong>Allowed Use:</strong> You may view and print content for personal, non-commercial use only.
            </p>
          </div>

          <!-- 6. User Conduct -->
          <div id="user-conduct" class="content-block">
            <h2>6. User Conduct</h2>
            <p>When using our services, you agree NOT to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful, offensive, or unlawful content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper operation of our services</li>
              <li>Share false or misleading information</li>
              <li>Harass, abuse, or harm others</li>
            </ul>
            <p>
              Violation of these rules may result in termination of your access and potential legal action.
            </p>
          </div>

          <!-- 7. Disclaimer -->
          <div id="disclaimer" class="content-block">
            <h2>7. Disclaimer</h2>
            <p>
              <strong>OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE."</strong>
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>Our services will be uninterrupted or error-free</li>
              <li>Our products will meet your expectations</li>
              <li>Our website is free of viruses or other harmful components</li>
            </ul>
            <p>
              We make no warranties, express or implied, regarding our services, products, or this website, 
              including any warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </div>

          <!-- 8. Limitation of Liability -->
          <div id="limitation-liability" class="content-block">
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Vesper AgriTech shall not be liable for:
            </p>
            <ul>
              <li>Indirect, incidental, consequential, or punitive damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Damages arising from your use or inability to use our services</li>
              <li>Damages arising from unauthorized access to your data</li>
            </ul>
            <p>
              Our total liability for any claims arising from these Terms shall not exceed the amount 
              you paid for the specific product or service giving rise to the claim.
            </p>
          </div>

          <!-- 9. Indemnification -->
          <div id="indemnification" class="content-block">
            <h2>9. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Vesper AgriTech and its officers, directors, 
              employees, and agents from any claims, damages, losses, liabilities, costs, or expenses 
              (including reasonable attorneys' fees) arising from:
            </p>
            <ul>
              <li>Your violation of these Terms</li>
              <li>Your misuse of our services or products</li>
              <li>Your infringement of any third-party rights</li>
              <li>Your submission of inaccurate information</li>
            </ul>
          </div>

          <!-- 10. Termination -->
          <div id="termination" class="content-block">
            <h2>10. Termination</h2>
            <h3>Termination by You</h3>
            <p>You may stop using our services at any time.</p>
            <h3>Termination by Us</h3>
            <p>We may terminate or suspend your access if you:</p>
            <ul>
              <li>Violate these Terms</li>
              <li>Fail to pay for products or services</li>
              <li>Engage in unlawful behavior</li>
              <li>Provide inaccurate information</li>
            </ul>
            <p>Upon termination, you must stop using our services and destroy any copies of our content.</p>
          </div>

          <!-- 11. Governing Law -->
          <div id="governing-law" class="content-block">
            <h2>11. Governing Law & Dispute Resolution</h2>
            <h3>Governing Law</h3>
            <p>These Terms are governed by the laws of Australia, without regard to conflict of law principles.</p>
            <h3>Dispute Resolution</h3>
            <p>
              Any disputes arising from these Terms will first be resolved through good-faith negotiation. 
              If resolution cannot be reached, disputes will be submitted to binding arbitration 
              under Australian law.
            </p>
            <p>
              Nothing in this section prevents us from seeking injunctive relief in a court of competent jurisdiction.
            </p>
          </div>

          <!-- 12. Contact Us -->
          <div id="contact-us" class="content-block">
            <h2>12. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us:</p>
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
const current = ref<string[]>(['terms'])

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
.terms-conditions {
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