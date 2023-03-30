import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'
import  * as VueRouter from 'vue-router'
import routes from './config/routes'
import store from './store/index'
import { key } from './store/index'  
const app = createApp(App)
const router = VueRouter.createRouter({
    //  内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
app.use(store,key)
app.use(router)
app.mount('#app')

