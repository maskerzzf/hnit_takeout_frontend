<template>
<van-tabs v-model:active="active">
  <van-tab title="全部订单">
    <van-card
    desc="描述信息"
    title="店铺名称"
    tag="已经送达"
    thumb="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/meishi.png" style="background-color: white; font-size:medium" >
>
  <template #tags>
    <div style="display: flex; justify-content:space-between;">
      <div>商品</div><div>X数量</div>     
    </div>
  </template>
  <template #footer>
    <div>一共</div>
    <van-button size="normal">再来一单</van-button>
    <van-button size="normal" color="skyblue">确认收货</van-button>
  </template>
</van-card>
  </van-tab>
  <van-tab title="待评价">  <van-card
    desc="描述信息"
    title="店铺名称"
    tag="已经送达"
    thumb="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/meishi.png" style="background-color: white; font-size:medium" >
>
  <template #tags>
    <div style="display: flex; justify-content:space-between;">
      <div>商品</div><div>X数量</div>     
    </div>
  </template>
  <template #footer>
    <div>一共</div>
    <van-button size="normal">再来一单</van-button>
    <van-button size="normal" color="skyblue">去评价</van-button>
  </template>
</van-card></van-tab>
  <van-tab title="退款">
    <van-empty description="描述文字" style="background-color: white;"/>
  </van-tab>
</van-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue'
    const active = ref(0)

</script>