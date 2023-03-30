import Index from '../components/pages/Index/Index.vue'
import Order from '../components/pages/Order/Order.vue'
import User from '../components/pages/User/User.vue'
import Search from '../components/pages/Index/views/Search.vue'
import Hongbao from '../components/pages/User/views/Coupon.vue'
import Address from '../components/pages/User/views/Address.vue'
import Phone from '../components/pages/User/views/Phone.vue'
import Shop from '../components/pages/Index/views/Shop.vue'
import UpdateAddress from '../components/pages/User/views/UpdateAddress.vue'
import Map from '../components/pages/User/views/Map.vue'
const routes = [
    { path: '/', name: 'Index', component: Index},
    { path: '/order', name: 'Order', component: Order },
    { path: '/user', name: 'User', component: User },
    { path: '/search', name:'Search', component:Search},
    { path:'/hongbao', name:'Hongbao',component:Hongbao},
    { path:'/address', name:'Address',component:Address},
    { path:'/phone',name:'Phone',component:Phone},
    { path:'/shop',name:'Shop',component:Shop},
    { path:'/updateAddress/:lat?/:lng?/:pioaddress?/:id?',name:'UpdateAddress',component:UpdateAddress,props:true},
    { path:'/map',name:'Map',component:Map}
]
export default routes