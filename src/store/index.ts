import { inject, InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import user from './user/user'
import   { useStore as baseUseStore, } from "vuex"; 
import { UserState } from './user/user'
import address, { AddressState } from './address/address';
import shop, { ShopState } from './shop/shop';
export interface State {
    
}
interface StateAll extends State{
    user:UserState, //UsersState是上面引入的类型 user是自己定义的名
    //若是多个模块  依次类推
    address:AddressState,
    shop:ShopState
 }
export  const key:InjectionKey<Store<StateAll>> = Symbol();
export default createStore<State>({
    modules: {
        user,
        address,
        shop
        },
  
})
// 定义自己的 `useStore` 组合式函数 这里也有了变化
export function useStore () {
    return  baseUseStore(key)//把key导出去了
  }


