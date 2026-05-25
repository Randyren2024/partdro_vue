import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/styles/global.css'
import { i18n } from './i18n'

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(MotionPlugin)
app.use(i18n)
app.mount('#app')
