<template>
  <div class="support">
    <Header />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-image-container">
        <img 
          src="/images/pexels-nc-farm-bureau-mark-26256448.webp" 
          alt="Partdro AgriTech Support"
          class="hero-img"
        />
        <div class="hero-overlay">
          <h1 class="hero-title">Technical Support</h1>
          <p class="hero-subtitle">We're here to help with any questions or issues</p>
        </div>
      </div>
    </section>

    <!-- Support Options -->
    <section class="support-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Get Support</h2>
          <p class="section-subtitle">Choose your preferred way to reach us</p>
        </div>
        
        <div class="support-cards">
           <div class="support-card">
            <div class="support-icon"><img src="/images/icons/phone-icon.png" alt="Phone" /></div>
            <h3>Phone Support</h3>
            <p class="support-phone">+86 16788684420</p>
            <a-button type="primary" size="large" block @click="callPhone">Call Now</a-button>
          </div>
          
          <div class="support-card">
            <div class="support-icon"><img src="/images/icons/chat-icon.png" alt="WhatsApp" /></div>
            <h3>WhatsApp</h3>
            <p class="support-phone">+86 16788684420</p>
            <a-button type="primary" size="large" block @click="openWhatsApp">Message on WhatsApp</a-button>
          </div>
          
            <div class="support-card">
            <div class="support-icon"><img src="/images/icons/email-icon.png" alt="Email" /></div>
            <h3>Email Support</h3>
            <p class="support-phone">info@partdro.com</p>
            <a-button type="primary" size="large" block @click="sendEmail">Send Email</a-button>
          </div>
        </div>
      </div>
    </section>

    <!-- Operating Hours -->
    <section class="hours-section">
      <div class="section-container">
        <div class="hours-grid">
          <div class="hours-card">
            <ClockCircleOutlined class="hours-icon" />
            <h3>Operating Hours</h3>
            <div class="hours-info">
              <p><strong>Australia Time Zone:</strong> AEST/AEDT (UTC+10/+11)</p>
              <p><strong>Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
              <p><strong>Weekend:</strong> By appointment</p>
            </div>
          </div>
          
          <div class="hours-card">
            <GlobalOutlined class="hours-icon" />
            <h3>Services Available</h3>
            <div class="hours-info">
              <p>
On-site Demonstrations</p>
              <p>
Remote Technical Support</p>
              <p>
Remote Diagnostics</p>
              <p>
Emergency Response</p>
              <p>
Software Updates</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Service Points -->
    <section class="service-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Local Service Points</h2>
          <p class="section-subtitle">Authorised service centres and partners across Australia</p>
        </div>
        
        <div class="service-grid">
          <div class="service-card">
            <EnvironmentOutlined class="service-icon" />
            <h3>Sydney, NSW</h3>
            <p>Main Service Center</p>
            <p class="service-desc">Full diagnostics, repairs, and parts</p>
          </div>
          
          <div class="service-card">
            <EnvironmentOutlined class="service-icon" />
            <h3>Melbourne, VIC</h3>
            <p>Authorised Partner</p>
            <p class="service-desc">Sales and basic service</p>
          </div>
          
          <div class="service-card">
            <EnvironmentOutlined class="service-icon" />
            <h3>Perth, WA</h3>
            <p>Authorised Partner</p>
            <p class="service-desc">Sales and basic service</p>
          </div>
          
          <div class="service-card">
            <EnvironmentOutlined class="service-icon" />
            <h3>Brisbane, QLD</h3>
            <p>Authorised Partner</p>
            <p class="service-desc">Sales and basic service</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Warranty Info -->
    <section class="warranty-section">
      <div class="section-container">
        <div class="section-header">
          <h2 class="section-title">Warranty & Support</h2>
          <p class="section-subtitle">Information about our warranty policies</p>
        </div>
        
        <div class="warranty-content">
          <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="Standard Warranty">
              <p>All Partdro AgriTech products come with a standard 12-month warranty covering manufacturing defects. The warranty period starts from the date of purchase.</p>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="Extended Warranty">
              <p>Extended warranty options are available for purchase. Contact us for more information about extended warranty plans.</p>
            </a-collapse-panel>
            <a-collapse-panel key="3" header="Warranty Claim Process">
              <p>1. Contact our support team with your purchase details</p>
              <p>2. Describe the issue you're experiencing</p>
              <p>3. Our team will guide you through the troubleshooting process</p>
              <p>4. If replacement is needed, we'll arrange for a replacement unit or repair</p>
            </a-collapse-panel>
            <a-collapse-panel key="4" header="Spare Parts & Accessories">
              <p>Spare parts are available for all our products. Lead time is typically 3-7 business days within Australia. Contact us for specific part availability and pricing.</p>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ClockCircleOutlined, GlobalOutlined, EnvironmentOutlined } from '@ant-design/icons-vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const activeKey = ref(['1'])

const callPhone = () => {
  window.location.href = 'tel:+8613362853598'
}

const openWhatsApp = () => {
  const phoneNumber = '8613362853598'
  const message = 'Hello! I need support with Partdro products.'
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}

const sendEmail = () => {
  window.location.href = 'mailto:info@partdro.com?subject=Technical Support Request'
}
</script>

<style scoped>
.support {
  min-height: 100vh;
  background: #f8f9fa;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 350px;
}

.hero-image-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.85), rgba(26, 26, 46, 0.7));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.hero-title {
  font-family: 'Poppins', 'Barlow', sans-serif;
  font-size: clamp(36px, 4.5vw, 56px);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;
  line-height: 1.15;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(18px, 2vw, 24px);
  color: white;
  opacity: 0.9;
  max-width: 600px;
}

/* Sections */
.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(40px, 5vw, 60px) clamp(16px, 3vw, 24px);
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 12px;
}

.section-subtitle {
  font-size: clamp(14px, 1.5vw, 16px);
  color: #666;
}

/* Support Cards */
.support-section {
  background: white;
}

.support-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.support-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.support-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.support-icon {
  margin-bottom: 16px;
}

.support-icon img {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.support-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 12px;
}

.support-phone {
  font-size: 24px;
  font-weight: 700;
  color: #1888c8;
  margin-bottom: 20px;
}

/* Hours Section */
.hours-section {
  background: linear-gradient(135deg, #1a1a2e, #2c3e50);
}

.hours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.hours-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
}

.hours-icon {
  font-size: 48px;
  color: #1888c8;
  margin-bottom: 16px;
}

.hours-card h3 {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
}

.hours-info {
  text-align: left;
}

.hours-info p {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 8px;
  font-size: 15px;
}

/* Service Section */
.service-section {
  background: white;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.service-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.service-icon {
  font-size: 36px;
  color: #1888c8;
  margin-bottom: 12px;
}

.service-card h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

.service-card p {
  color: #666;
  font-size: 14px;
  margin: 0;
}

.service-desc {
  margin-top: 8px;
  font-size: 13px;
  color: #999 !important;
}

/* Warranty Section */
.warranty-section {
  background: #f8f9fa;
}

.warranty-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    height: 280px;
  }
  
  .hours-grid {
    grid-template-columns: 1fr;
  }
  
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .service-grid {
    grid-template-columns: 1fr;
  }
}
</style>