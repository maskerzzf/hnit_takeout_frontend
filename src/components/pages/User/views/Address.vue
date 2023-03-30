<template>
    <van-address-list
  v-model="chosenAddressId"
  :list="list"
  :disabled-list="disabledList"
  disabled-text="以下地址超出配送范围"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
  @select="setDefault"
  @edit-disabled="onEdit"	
/>
</template>
<script setup lang="ts">import { AddressListAddress, showToast } from 'vant'
import { nextTick, onMounted, ref, watch } from 'vue'
import {useStore} from '@/store'
import { useRouter } from 'vue-router'
import {AddressState} from '@/store/address/address'
import { Numeric } from 'vant/lib/utils'
import { computed } from '@vue/reactivity'
const store = useStore()
const router = useRouter()
const list = ref<AddressState['list']>()
const chosenAddressId = ref('1')
const disabledList = ref<AddressState['disableList']>()
const defaultFlag = computed(()=>{return store.state.address.defaultFlag})
watch(defaultFlag,(newValue,oldValue)=>{
  showToast(newValue)
},{deep:true})
//初始化
const initAddress = async()=>{
  await store.dispatch('getAddressList',store.state.user.user.id)
}
watch(()=>{return store.state.address.list},(newValue,oldValue)=>{
  list.value = newValue
},{deep:true,immediate:true})
watch(()=>{return store.state.address.disableList},(newValue,oldValue)=>{
  disabledList.value = newValue
},{deep:true,immediate:true})
//添加地址
const onAdd = () => {
  router.push({
    path:'/updateAddress'
  })
}
//设为默认
const setDefault = async (item:AddressListAddress, index:number)=>{
  let userId:string = store.state.user.user.id
  let id:string|Numeric = item.id
  await store.dispatch('setAddressDefault',{id,userId})
  await initAddress()
  showToast(store.state.address.defaultFlag)
}

const onEdit = (item:AddressListAddress, index:number) =>{
  router.push({name:'UpdateAddress',params:{id:item.id}})
}
onMounted(initAddress)


</script>