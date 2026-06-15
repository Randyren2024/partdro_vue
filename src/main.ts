import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import './assets/global.css'

const app = createApp(App)

app.use(router)
app.use(Antd)
app.use(MotionPlugin)

app.mount('#app')