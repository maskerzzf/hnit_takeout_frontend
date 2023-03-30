<template>
    <van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  fixed
  @click-left="onClickLeft"
/>
<div id="content" style="padding-top: 50px;">
    <router-view></router-view>
  </div>
<van-tabbar v-model="active" route v-show="$route.name == 'Index' || $route.name=='Order' || $route.name=='User'">
  <van-tabbar-item to="/" icon="home-o" >首页</van-tabbar-item>
  <van-tabbar-item to="/order" icon="cart-o" >订单</van-tabbar-item>
  <van-tabbar-item to="/user" icon="contact" dot>我的</van-tabbar-item>
</van-tabbar>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const active = ref(0)
const router = useRouter()
const onClickLeft = ()=>{
    router.back()
}
</script>