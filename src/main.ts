import { createApp } from 'vue'

import 'bootstrap/js/index.esm.js'
import 'floating-vue/dist/style.css'
import 'vue-toast-notification/dist/theme-sugar.css';
import './style.scss'

import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import routes from "./routes"
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import ToastPlugin from 'vue-toast-notification';
import { Buffer } from "buffer"

//@ts-expect-error Provide Buffer global for smart-arraybuffer
globalThis.Buffer = Buffer

const router = createRouter({
  history: createWebHistory(),
  routes,
})
const pinia = createPinia()

const app = createApp(App)
app.provide("difficultyData", {
  types: ["Novice", "Skilled", "Expert", "Unbeatable"],
  colors: {
    "Novice": "#00A63E",
    "Skilled": "#2B7FFF",
    "Expert": "#E7000B",
    "Unbeatable": "#9810FA"
  },
})

app.use(router)
app.use(pinia)
app.use(FloatingVue)
app.use(ToastPlugin);
app.mount('#app')