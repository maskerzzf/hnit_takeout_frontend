import { AddressState } from "@/store/address/address";
import { Numeric } from "vant/lib/utils/basic";
import requests from "../config/requests";
// 获取验证码
export const reqGetCode = (phone:string)=>{
    return requests({method:'get',url:'/user/code', params:{phone}})
}
//获取用户信息
export const reqGetUserInfo =(loginForm:{phone:string,code:string})=>{
    return requests({method:'post',url:'/user/userInfo',data:loginForm})
}
//获取地址
export const reqGetAddressList = (id:number) =>{
    return requests({method:'get',url:`/address/${id}`})
}
//保存用户地址信息
export const reqSaveAddress = (address:AddressState['address'])=>{
    return requests({method:'post',url:'/address/saveAddress',data:address})
}
//设置默认
export const reqSetAddressDefault = (id:Numeric,userId:string)=>{
    return requests({method:'put',url:`/address/default/${id}/${userId}`})
}
//更新地址
export const reqShowAddress = (id:string)=>{
    return requests({method:'get',url:`/address/show/${id}`})
}
//删除地址
export const reqDeleteAddress = (id:string)=>{
    return requests({method:'delete',url:`/address/delete/${id}`})
}
//首页加载店铺
export const reqGetShop=(page:number,pageSize:number,valueRank:string)=>{
    return requests({method:'get',url:'/shop/showShops',params:{page,pageSize,valueRank}})

}
//更新地址
export const reqUpdateAddress=(id:string,newAddress:AddressState['address'])=>{
    return requests({method:'put',url:`/address/update/${id}`,data:newAddress})
}
//获取店铺详细信息
export const reqGetShopDetail=(id:string)=>{
    return requests({method:'get',url:`/shop/${id}`})
}
//获取满减信息
export const reqGetFullReduction= (id:string)=>{
    return requests({method:'get',url:`/shop/fullReduction/${id}`})
}
//是否收藏
export const reqIsCollected = (shopId:string,userId:string)=>{
    return requests({method:'get',url:`/shop/isCollected/${userId}/${shopId}`})
}
//收藏or取消收藏
export const reqChangeCollected=(shopId:string,userId:string,isCollectedFlag:boolean)=>{
    return requests({method:'put',url:`/shop/changeCollected/${userId}/${shopId}/${isCollectedFlag}`})
}
//获取菜品分类
export const reqGetCategory=(shopId:string)=>{
    return requests({method:'get',url:`/shop/category/${shopId}`})
}
//获取菜品
export const reqGetDish=(id:string)=>{
    return requests({method:'get',url:`/shop/category/items/${id}`})
}