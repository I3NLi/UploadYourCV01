import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './Router'
// @ts-ignore
import DayNightToggleButton from "./assets/day_night_toggle_button.js";
import "boxicons"

customElements.define("toggle-button", DayNightToggleButton)

createApp(App)
    .use(router)
    .mount('#app')
