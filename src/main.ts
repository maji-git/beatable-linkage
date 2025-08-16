import { createApp } from 'vue'
import 'bootstrap/js/index.esm.js'
import './style.scss'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import routes from "./routes"

const router = createRouter({
  history: createWebHistory(),
  routes,
})

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
app.provide("deviceData", {
  CUSTOM_SONG_LOCATION: "storage/emulated/0/Android/data/com.xrgames.beatable/files/CustomSongs"
})
app.use(router)
app.mount('#app')