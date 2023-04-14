import { reqChangeCollected, reqGetCategory, reqGetDish, reqGetFullReduction, reqGetShop, reqGetShopDetail, reqIsCollected } from "@/api"
import { ActionTree, MutationTree } from "vuex"
import lodash, { fromPairs } from 'lodash'
import store, { State } from ".."

export interface ShopState {
    page:number,
    pageSize:number,
    finshed:boolean,
    shopList:{
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
        distribution:number,
        announcement:string
    }[],
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
        distribution:number,
        announcement:string
    },
    fullReductionMap:Map<number,string>,
    isCollected:boolean,
    categorys:{
        id:string,
        shopId:string,
        name:string,
    }[],
    categoryItems:{text?:string}[],
    dishList:{
        id:string,
        name:string,
        category:string,
        price:number,
        description:string,
        score:number,
        sold:number,
        image:string,
        dish_flavorVOList:{
            id:string,
            flavorName:string,
            flavorValue:string
        }[]
    }[],
    newDishList:{
        id:string,
        name:string,
        category:string,
        price:number,
        description:string,
        score:number,
        sold:number,
        image:string,
        dish_flavorVOList:{
            id:string,
            flavorName:string,
            flavorValue:string[]
        }[]
    }[]
}
const state:ShopState = {
    page:1,
    pageSize:1,
    finshed:false,
    shop:{
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
        distribution:0,
        announcement:''
    },
    shopList:[{
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
        distribution:0,
        announcement:''
    }],
    fullReductionMap:new Map(),
    isCollected:false,
    categorys:[{id:'',shopId:'',name:''}],
    categoryItems:[],
    dishList:[{
        id:'',
        name:'',
        category:'',
        price:0,
        description:'',
        score:0,
        sold:0,
        image:'',
        dish_flavorVOList:[{
            id:'',
            flavorName:'',
            flavorValue:'',
        }]}],
        newDishList:[{
            id:'',
            name:'',
            category:'',
            price:0,
            description:'',
            score:0,
            sold:0,
            image:'',
            dish_flavorVOList:[{
                id:'',
                flavorName:'',
                flavorValue:[''],
            }]}],
}
const mutations:MutationTree<ShopState> = {
    GET_SHOP(state,shop:ShopState['shopList']){  
        if(shop.length != 0){
            state.shopList=shop
            state.finshed = false
        }else{
            state.finshed = true
        }      
        
    },
    LOAD_SHOP(state,shop:ShopState['shopList']){      
        if(shop.length != 0){
            state.shopList=state.shopList.concat(shop)
        }else{
            state.finshed = true
        }
        
    },
    GET_SHOP_DETAIL(state,shop:ShopState['shop']){
        state.shop = shop
    },
    GET_FULL_REDUCTION(state,map:ShopState['fullReductionMap']){
        state.fullReductionMap=map
       
    },
    IS_COLLECTED(state,isCollected:boolean){
        state.isCollected=isCollected
    },
    GET_CATEGORY(state,categorys:ShopState['categorys']){
        state.categorys = lodash.cloneDeep(categorys)
        let objArray:{text?:string}[] =[]
        categorys.forEach(item=>{
            let obj = {text:item.name}
            objArray.push(obj)    
        })
        state.categoryItems=lodash.cloneDeep(objArray)
        
    },
    GET_DISH(state,dishArray:ShopState['dishList']){
        let list:string[]=[]
        dishArray.forEach(dish=>{
            dish.dish_flavorVOList.forEach(item=>{               
               list.push(JSON.parse(item.flavorValue))   
            })
        })
        state.dishList = lodash.cloneDeep(dishArray)
        
    }
}
const actions:ActionTree<ShopState,State>={
    async getShop({commit,state},valueRank:string){        
        state.page = 1
        let result = await reqGetShop(state.page,state.pageSize,valueRank)
        if(result.code == 0){
            commit('GET_SHOP',result.data)
        }
    },
    async getShopDetail({commit},id:string){
        let result = await reqGetShopDetail(id)
        if(result.code == 0){
            commit('GET_SHOP_DETAIL',result.data)
        }
    },
    async loadShop({commit},valueRank:string){
        state.page++
        let result = await reqGetShop(state.page,state.pageSize,valueRank)
        if(result.code == 0){
            commit('LOAD_SHOP',result.data)
        }
    },
    async getFullReduction({commit},id:string){
        let result = await reqGetFullReduction(id)
        if(result.code == 0){
            commit('GET_FULL_REDUCTION',result.data)
        }
    },
    async isCollected({commit},{shopId,userId}){ 
        let result = await reqIsCollected(shopId,userId)
        if(result.code == 0){
            commit('IS_COLLECTED',result.data)
        }
    },
    async changeCollected({commit},{shopId,userId,isCollectedFlag}){
        let result = await reqChangeCollected(shopId,userId,isCollectedFlag)        
    },
    async getCategory({commit},shopId:string){
        let result = await reqGetCategory(shopId)
        if(result.code == 0){  
            commit('GET_CATEGORY',result.data)
        }
    },
    async getDish({commit}){
        let dishArray:any = []
        
        for(let item  of state.categorys){
            let result = await reqGetDish(item.id)
            if(result.code ==0){
                dishArray =dishArray.concat(result.data)
            }else{
                dishArray = dishArray.concat({})
            }
        }
        
        commit('GET_DISH',dishArray)

    }
    
}
export default{
    state,
    mutations,
    actions
}