import {   reqDeleteAddress, reqGetAddressList, reqSaveAddress, reqSetAddressDefault, reqShowAddress, reqUpdateAddress } from "@/api"
import requests from "@/config/requests"
import { ListDirection } from "vant"
import { Numeric } from "vant/lib/utils/basic"
import { ActionTree, MutationTree } from "vuex"
import { State } from ".."



export interface AddressState {
    saveFlag:string,
    defaultFlag:string,
    deleteFlag:string, 
    updateFlag:string,
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
updateFlag:'',
list :[
    {
        id: 0,
        name: '',
        tel: 0,
        address: '',
        detail:'',
        isDefault: true,
    }
],
disableList:[
    {
        id: 0,
        name: '',
        tel:0,
        address: '',
        detail:''
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
    SAVE_ADDRESS(State,saveFlag:string){
        State.saveFlag = saveFlag
    },
    GET_ADDRESSLIST(State,result:any){
        State.list = result.addressListDTOS
        State.disableList = result.addressDisabledListDTOS 
    },
    SET_ADDRESSDEFAULT(State,defaultFlag:string){
        State.defaultFlag = defaultFlag
    },
    SHOW_ADDRESS(State,address:AddressState['address']){
        State.address = address
        
    },
    DELETE_ADDRESS(State,deleteFlag:string){
        State.deleteFlag = deleteFlag
    },
    UPDATE_ADDRESS(State,updateFlag){
        State.updateFlag= updateFlag
    }
}
const actions:ActionTree<AddressState,State>={
    async getAddressList({commit},id:number){
        let result  =await reqGetAddressList(id)
        if(result.code == 0){
            commit('GET_ADDRESSLIST',result.data)
        }
    },
    async saveAddress({commit},newAddress:AddressState["address"]){    
        let result = await reqSaveAddress(newAddress)
           commit('SAVE_ADDRESS',result.description)
        
    },
    async setAddressDefault({commit},defaultValues:AddressState['defaultValue']){
        let id:Numeric = defaultValues.id
        let userId:string = defaultValues.userId
        let result = await reqSetAddressDefault(id,userId)
        commit('SET_ADDRESSDEFAULT',result.description)
    },
    async showAddress({commit},id:string){
        let result = await reqShowAddress(id)
        if(result.code==0){
            commit('SHOW_ADDRESS',result.data)
        }
    },
    async deleteAddress({commit},id:string){
        let result = await reqDeleteAddress(id)
        commit('DELETE_ADDRESS',result.description)
        
    },
    async updateAddress({commit},{id,newAddress}){
        let result = await reqUpdateAddress(id,newAddress)
        commit('UPDATE_ADDRESS',result.description)        
    }
}
export default{
    state,
    actions,
    mutations
}