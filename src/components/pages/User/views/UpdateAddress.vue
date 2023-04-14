<template>
    <van-cell  is-link size="large" @click="selectAddress">
        <template #title>
            <span class="custom-title" style="float: left;" >收货地址：</span>
            <van-icon name="location-o" style="float: left; width: 24px; height: 24px; line-height: 24px;"/>
            <span v-if="newAddress.address == ''" style="float: left;">选择收获地址</span>
            <span v-else style="float: left; display: inline-block; width: 200px; height: 24px; overflow: hidden;">{{ newAddress.address }}</span>
        </template>
    </van-cell>
    <van-cell size="large" style="height: 48px;">
        <template #title >
            <span class="custom-title" style="float: left; height: 24px; line-height: 24px; padding: 0;" >门牌号：</span>
            <van-field  v-model="newAddress.detail" style="display:inline-block; float: left; width: 100px; height: 24px; line-height: 50%; font-size: 16px; padding: 0; line-height: 24px; " placeholder="详细地址" />
        </template>
    </van-cell>
    <van-cell size="large" @click="chooseLabel($event)">
        <template #title>
            <span class="custom-title">标签：</span>
            <van-tag v-for="(value,key) in label" type="primary" size="large" style="margin-right: 10px;" :plain="true" :data_label="key" :ref="key">{{ value }} </van-tag>
            <!-- <van-tag type="primary" size="large" style="margin-right: 10px;" plain data_label="company">公司</van-tag>-->
            <!-- <van-tag type="primary" size="large" style="margin-right: 10px;" :plain="false" data_label="school">学校</van-tag>  -->
        </template>
    </van-cell>
    <van-cell size="large" style="height: 48px;">
        <template #title>
            <span class="custom-title" style="float: left; height: 24px; line-height: 24px; padding: 0;" >联系人：</span>
            <van-field  v-model="newAddress.consignee" style="display:inline-block; float: left; width: 100px; height: 24px; line-height: 50%; font-size: 16px; padding: 0; line-height: 24px; " placeholder="收货人" />
            <span style="float: right;">
                <van-radio-group v-model="checked" direction="horizontal">
                <van-radio name="1">先生</van-radio>
                <van-radio name="0">女士</van-radio>
                </van-radio-group>
            </span>
        </template>
    </van-cell>
    <van-cell size="large">
        <template #title>
            <span class="custom-title" style="float: left;height: 24px; line-height: 24px; padding: 0;">手机号：</span>
            <van-field v-model="newAddress.phone"  type="tel" style="float: left; display: inline-block; width: 150px;  height: 24px; line-height: 50%; font-size: 16px; padding: 0; line-height: 24px;" placeholder="收货人手机号码"></van-field>
        </template>
    </van-cell>
    <van-button type="primary" block style="margin-top: 20px;" @click="saveAddress">保存地址</van-button>
    <van-button type="primary" plain v-if="showDelete" block style="margin-top: 20px;" @click="deleteAddress">删除地址</van-button>
</template>
<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, onUpdated, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {AddressState} from '@/store/address/address'
import { useStore } from '@/store'
import { showConfirmDialog, showToast } from 'vant'
import { computed } from '@vue/reactivity'
const props = defineProps({id:{type:String},lat:{type:String},lng:{type:String},pioaddress:{type:String}})
const checked = ref('1')
const saveSuccess = "保存成功"
const deleteSuccess = "删除成功"
const updateSuccess = "更新成功"
const router = useRouter()
const route = useRoute()
const store = useStore()
const label = ref({
    home:'家',
    company:'公司',
    school:'学校'
})
let beforeTarget = ref<Event|null>(null)
let newAddress = ref<AddressState["address"]>({
    userId:store.state.user.user.id,
    address:'选择收获地址',
    consignee:'',
    gender:'1',
    label:'',
    lat:'',
    lng:'',
    detail:'',
    phone:'',
})
let showDelete = ref(false)
//选择收货地址
const selectAddress = () =>{
    if(props.id){
        router.replace({
            path:`/map/${props.id}`
        })
    }else{
        router.replace({
        path:'/map'
    })
    }
    
}
//选择标签
const chooseLabel=(event:Event)=>{
    if((event.target as Element ).getAttribute("data_label")){
        if(beforeTarget.value != null){
            (beforeTarget.value.target as Element ).classList.add("van-tag--plain");
            (event.target as Element ).classList.remove("van-tag--plain")
            beforeTarget.value = event
            newAddress.value.label = (event.target as Element ).getAttribute("data_label") as string
        }else{
            (event.target as Element ).classList.remove("van-tag--plain");
            beforeTarget.value = event
            newAddress.value.label = (event.target as Element ).getAttribute("data_label") as string
        }    
    }
    
}
//保存地址
const saveAddress = async()=>{
    const testPhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
    if(newAddress.value.address == '选择收获地址'){
        showToast('请填写收货地址')
    }else if(newAddress.value.consignee == ''){
        showToast('请填写收货人姓名')
    }else if(!testPhone.test(newAddress.value.phone)){
        showToast('请输入正确的手机号')
    }else{
    newAddress.value.gender = checked.value
    newAddress.value.userId = store.state.user.user.id
    if(props.id){
        let address = {id:props.id,newAddress:newAddress.value}
        await store.dispatch('updateAddress',address)
    }else{
        await store.dispatch('saveAddress',newAddress.value)
    }        
}
}
//删除地址
const deleteAddress = ()=>{
    showConfirmDialog({
    title: '确认删除',
    message:
        '删除后数据无法恢复',
    })
    .then(() => {
        store.dispatch('deleteAddress',props.id)
        
    })
    .catch(() => {
    // on cancel
    });
    
}
const saveFlagStore =  computed(()=>{
    return store.state.address.saveFlag
})
watch(saveFlagStore,(newValue,oldValue)=>{
    showToast(newValue) 
    if(newValue === saveSuccess ){
        Object.keys(newAddress.value as AddressState["address"]).forEach((key)=> {          
            newAddress.value[key as keyof typeof newAddress.value]= ''
        })
        
        router.replace('/address')
    }
},{deep:true})
const deleteFlagStore = computed(()=>{
    return store.state.address.deleteFlag
})
watch(deleteFlagStore,(newValue,olValue)=>{
    showToast(newValue)
    if(newValue == deleteSuccess){
        router.replace({path:'/address'})
    }
})
const updateFlagStore= computed(()=>{
    return store.state.address.updateFlag
})
watch( updateFlagStore,(newValue,oldValue)=>{
    showToast(newValue)
    if(newValue === updateSuccess ){
        Object.keys(newAddress.value as AddressState["address"]).forEach((key)=> {          
            newAddress.value[key as keyof typeof newAddress.value]= ''
        })
        router.replace('/address')
    }
})
const addressStore = computed(()=>{
    return store.state.address.address
})
watch(()=>{return addressStore},(newValue,oldValue)=>{ 
    newAddress.value = newValue.value
},{deep:true,immediate:true})
watch(()=>{
    route.params
},async(newValue,oldValue)=>{
    if(route.params.lat){
        newAddress.value.address = route.params.pioaddress as string
        newAddress.value.lat = route.params.lat as string
        newAddress.value.lng = route.params.lng as string
    }      
}, {deep: true,immediate:true})
onMounted(()=>{
    if(props.id && !route.params.lat){
       store.dispatch('showAddress',props.id)
    }else if(props.id){
        showDelete.value = true
    } 
})
</script>
<style>
    .custom-title {
        display: inline-block;
        left: 2px;
        width: 85px;
        
    }
</style>