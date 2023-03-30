<template>
    <van-cell-group inset>
  <van-field
    v-model="data.phone"
    center
    clearable
    label="手机号码"
    placeholder="请输入手机号码"
  >
    <template #button>
      <van-button size="small" type="primary" @click="sendCode">发送验证码</van-button>
    </template>
  </van-field>
</van-cell-group>
<van-cell-group inset>
  <van-field
    v-model="data.code"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
  >

  </van-field>
  <van-button round type="primary" size="large" @click="login">登录</van-button>
</van-cell-group>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import {useStore} from '../../../../store' 
const store = useStore()
const data  = reactive({
    phone:'',
    code:''
})
//发送验证码
const sendCode = ()=>{
    store.dispatch('getCode',data.phone)
    
}
//登录
const login = ()=>{
    store.dispatch('getUserInfo',data)
}



</script>