import { reqGetShop } from "@/api"
import { ActionTree, MutationTree } from "vuex"
import { State } from ".."

export interface ShopState {
    page:number,
    pageSize:number,
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
    page:0,
    pageSize:10,
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
    GETSHOP(State,shop:ShopState['shop']){
        if(state.page === 0){
        State.shop=shop
        }else{
            State.shop.concat(shop)
            state.page+=10
        }
    }
}
const actions:ActionTree<ShopState,State>={
    async getShop({commit,state},valueRank:string){
        let result = await reqGetShop(state.page,state.pageSize,valueRank)
        if(result.code == 0){
            commit('GETSHOP',result.data)
        }
    }
}
export default{
    state,
    mutations,
    actions
}