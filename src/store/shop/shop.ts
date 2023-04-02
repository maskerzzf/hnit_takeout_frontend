import { reqGetShop, reqGetShopDetail } from "@/api"
import { ActionTree, MutationTree } from "vuex"
import { State } from ".."

export interface ShopState {
    page:number,
    pageSize:number,
    finshed:boolean,
    shop:{
        id:string,
        name:string,
        images:string,
        address:string,
        lat:number,
        lng:number,
        avgPrice:number,
        sold:number,
        score:number,
        sendPrice:number,
        distribution:number
    }[]
}
const state:ShopState = {
    page:1,
    pageSize:1,
    finshed:false,
    shop:[{
        id:'',
        name:'',
        images:'',
        address:'',
        lat:0,
        lng:0,
        avgPrice:0,
        sold:0,
        score:0,
        sendPrice:0,
        distribution:0
    }]
}
const mutations:MutationTree<ShopState> = {
    GET_SHOP(State,shop:ShopState['shop']){  
        if(shop.length != 0){
            State.shop=shop
        }else{
            State.finshed = true
        }      
        
    },
    LOAD_SHOP(State,shop:ShopState['shop']){
        console.log(shop)
        if(shop.length != 0){
            State.shop=State.shop.concat(shop)
        }else{
            State.finshed = true
        }
        
    }
}
const actions:ActionTree<ShopState,State>={
    async getShop({commit,state},valueRank:string){
        let result = await reqGetShop(state.page,state.pageSize,valueRank)
        if(result.code == 0){
            commit('GET_SHOP',result.data)
        }
    },
    async getShopDetail({commit},id:string){
        let result = await reqGetShopDetail(id)
        console.log(result)
    },
    async loadShop({commit},valueRank:string){
        state.page++
        let result = await reqGetShop(state.page,state.pageSize,valueRank)
        if(result.code == 0){
            commit('LOAD_SHOP',result.data)
        }
    }
}
export default{
    state,
    mutations,
    actions
}