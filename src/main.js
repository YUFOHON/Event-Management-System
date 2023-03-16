import  {createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/font/index.css' 
import Alert from '@/components/Bruce/AlertWindow.vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
/* add icons to the library */
library.add(fas,faTwitter)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).component('Alert',Alert).use(router).mount('#app')
