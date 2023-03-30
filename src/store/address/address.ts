import {   reqDeleteAddress, reqGetAddressList, reqSaveAddress, reqSetAddressDefault, reqShowAddress } from "@/api"
import requests from "@/config/requests"
import { ListDirection } from "vant"
import { Numeric } from "vant/lib/utils/basic"
import { ActionTree, MutationTree } from "vuex"
import { State } from ".."



export interface AddressState {
    saveFlag:string,
    defaultFlag:string,
    deleteFlag:string, 
    list :{
        id:number,
        name:string,
        tel:number,
        address:string,
        detail:string,
        isDefault?:boolean
    }[]
    disableList:{
        id:number,
        name:string,
        tel:number,
        address:string,
        detail:string
    }[]
    address: {
        userId:string,
        address:string,
        consignee:string,
        gender:string,
        label:string,
        lat:string,
        lng: string,
        detail:string,
        phone:string
    }
    defaultValue:{
        id:Numeric,
        userId:string
    }
}
const state:AddressState = {
saveFlag:'',
defaultFlag:'',
deleteFlag:'',
list :[
    {
        id: 1,
        name: '张三',
        tel: 13000000000,
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦',
        detail:' 7 楼 501 室',
        isDefault: true,
    }
],
disableList:[
    {
        id: 3,
        name: '王五',
        tel:1320000000,
        address: '浙江省杭州市滨江区江南大道 ',
        detail:'15 号'
    }
],
address:
    {
        userId:'',
        consignee:'',
        address:'',
        gender:'',
        label:'',
        detail:'',
        lat: '',
        lng: '',
        phone:''
    },
defaultValue:{
        id:'',
        userId:''
    }

}
const mutations:MutationTree<AddressState>={
    SAVEADDRESS(State,saveFlag:string){
        State.saveFlag = saveFlag
    },
    GETADDRESSLIST(State,result:any){
        State.list = result.addressListDTOS
        State.disableList = result.addressDisabledListDTOS 
    },
    SETADDRESSDEFAULT(State,defaultFlag:string){
        State.defaultFlag = defaultFlag
    },
    SHOWADDRESS(State,address:AddressState['address']){
        State.address = address
        
    },
    DELETEADDRESS(State,deleteFlag:string){
        State.deleteFlag = deleteFlag
    }
}
const actions:ActionTree<AddressState,State>={
    async getAddressList({commit},id:number){
        let result  =await reqGetAddressList(id)
        if(result.code == 0){
            commit('GETADDRESSLIST',result.data)
        }
    },
    async saveAddress({commit},newAddress:AddressState["address"]){    
        let result = await reqSaveAddress(newAddress)
           commit('SAVEADDRESS',result.description)
        
    },
    async setAddressDefault({commit},defaultValues:AddressState['defaultValue']){
        let id:Numeric = defaultValues.id
        let userId:string = defaultValues.userId
        let result = await reqSetAddressDefault(id,userId)
        commit('SETADDRESSDEFAULT',result.description)
    },
    async showAddress({commit},id:string){
        let result = await reqShowAddress(id)
        if(result.code==0){
            commit('SHOWADDRESS',result.data)
        }
    },
    async deleteAddress({commit},id:string){
        let result = await reqDeleteAddress(id)
        console.log(result)
        commit('DELETEADDRESS',result.description)
        
    }
}
export default{
    state,
    actions,
    mutations
}