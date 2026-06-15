import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products-solutions',
      name: 'products-solutions',
      component: () => import('../views/ProductsSolutionsView.vue')
    },
    {
      path: '/solutions',
      name: 'solutions',
      component: () => import('../views/SolutionsView.vue')
    },
    {
      path: '/products',
      redirect: '/products-solutions'
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue')
    },
    {
      path: '/about_us',
      name: 'about_us',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact_us',
      name: 'contact_us',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/contact',
      redirect: '/contact_us'
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue')
    },
    {
      path: '/terms-conditions',
      name: 'terms-conditions',
      component: () => import('../views/TermsView.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router