import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/routes'
import store from './store/store'

import ElementPlus from 'element-plus';

const app = createApp(App)



app.use(router).use(ElementPlus).use(store).mount('#app')
