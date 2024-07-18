import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import './assets/main.css'
import './assets/etstyle.css'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#et-odas')






const favicons = ["favicon.ico", "favicon2.ico", "favicon3.ico", "favicon2.ico",];
let currentFavicon = 0;

setInterval(() => {
    currentFavicon = (currentFavicon + 1) % favicons.length;
    document.getElementById('favicon').href = favicons[currentFavicon];
}, 4000);
