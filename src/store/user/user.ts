import { showNotify } from 'vant'
import {ActionTree, Commit, createStore, GetterTree, MutationTree} from 'vuex'
import { State } from '..'
import { reqGetCode, reqGetUserInfo } from '../../api'
export interface UserState {
    token:string,
    user:{
        id:string,
        nick_name:string,
        avatar:string
    }

}
let state:UserState ={
    token:'',
    user:{
        id:'1633377369572098050',
        nick_name:'zzf',
        avatar:'https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/avatar/base_avatar.jpg'
    }
}
let mutations:MutationTree<UserState>={
    GET_CODE(state){
                
    },
    GET_USERINFO(state,data){
        state.token=data.token
        state.user = data.userDTO
        window.localStorage.setItem('token',data.token)
    }
}
let actions:ActionTree<UserState,State> = {
    async getCode(context:{commit:Commit},phone:string){
        let result = await reqGetCode(phone)
       if(result.code == 0){
        showNotify({ message: '发送成功' })
       }
    },
    async getUserInfo(context:{commit:Commit},login:{phone:string,code:string}){
        let result = await reqGetUserInfo(login)
        console.log(result.data)
        context.commit('GET_USERINFO',result.data)
    }
}
// let getters:GetterTree<UserState,State> ={
//     getUser(){
//         return 
//     }
// }
// const user = {   
//         state(){
//             return {
//                 user:{
//                     name:'',
//                     phone:'',
//                     avatar:''
//                 }

//             }
//         },
//         mutations:{
//             GETCODE(state:userState){
                
//             },
//             GETUSERINFO(state:userState,result:userState){
//                 state.user = result.user
//             }
//         },
//         actions:{
//             async getCode(context:{commit:Commit},phone:string){
//                 let result = await reqGetCode(phone)
                
//             },
//             async getUserInfo(context:{commit:Commit},login:{phone:string,code:string}){
//                 let result = await reqGetUserInfo(login)
//                 context.commit('GETUSERINFO',result)
//             }
//         },
//         getters:{

//         }
//     }
export default {
    namespace: true,
    state,
    actions,
    mutations
}