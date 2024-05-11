import { createApp } from 'vue'
import App from './App.vue'
import pinia from './stores/index'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

app.use(pinia)
app.mount('#app')
