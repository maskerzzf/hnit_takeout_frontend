<template>
<van-search
  @click-input="goSearch"
  shape="round"
  placeholder="关键词"
/>
<van-swipe class="my-swipe" :autoplay="3000000" indicator-color="skyblue" :loop="false" :height="200">
  <van-swipe-item >
    <van-grid :gutter="10" :border="false" :column-num="3"  lazy-render>
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/meishi.png" text="美食" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/chaoshi.png" text="超市便利" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/shuiguo.png" text="水果" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/maiyao.png" text="买药" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/paotui.png" text="跑腿" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/baozi.png" text="早餐" />
    </van-grid>
  </van-swipe-item>
  <van-swipe-item >
    <van-grid :gutter="10" :border="false" :column-num="3"  lazy-render>
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/dangao.png" text="蛋糕" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/xiaochi.png" text="小吃" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/miantiao.png" text="面条" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/kuaican.png" text="快餐" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/liaoli.png" text="料理" />
      <van-grid-item icon="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/yinliao.png" text="饮料" />
    </van-grid>
  </van-swipe-item>
</van-swipe>
<div style="margin-top: 10px; background-color: white;" @click="$router.push({name:'Shop'})">
  <van-card
  desc="描述信息"
  title="商品标题"
  thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
  style="background-color: white;"
>
  <template #tags>
    <van-tag plain type="primary" size="medium" style="margin-right:5px ;">标签</van-tag>
    <van-tag plain type="primary" size="medium">标签</van-tag>
  </template>
  <template #bottom>
  </template>
  </van-card>
   <van-grid :column-num="3">
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
</div>
<div style="margin-top: 10px; background-color: white;"  @click="goRank()">
  <h3 style="margin-left: 20px; padding-top: 10px;">商家</h3>
  <van-dropdown-menu ref="rank">
  <van-dropdown-item v-model="valueRank" :options="optionRank" @click="chooseRankValue" />
</van-dropdown-menu>
<van-list
  v-model:loading="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<van-card
  v-for="(item,index) in shops"
  :key="index"
  :ref="item.id"
  :thumb="item.images"
  :title="item.name"
  :data-shop="item.id"
  @click="chooseShop($event)"
  style="background-color: white;margin-top:2px;"
> 
<template #desc>
  <div><van-rate count="1" v-model="item.score"/>{{ item.score/10 }}</div> 
</template>
<template #tags>
    <van-tag plain type="primary" style="margin-right: 4px;">平均价格{{  item.avgPrice/10 }}</van-tag>
    <van-tag plain type="primary" style="margin-right: 4px;">起送{{ item.sendPrice }}</van-tag>
    <van-tag plain type="primary" style="margin-right: 4px;">配送费{{ item.distribution }}</van-tag>
  </template>
</van-card>

</van-list>

<div style="height: 65px; background-color: white;"></div>
</div>
<van-back-top />
</template>
<script setup lang="ts">
import { useStore } from '@/store';
import { ShopState } from '@/store/shop/shop';
import { computed, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
import {useRouter} from 'vue-router'
const router =useRouter()
const rank = ref(null)
const store = useStore()
const loading = ref(false)
const finished = ref(false)
const shops = ref<ShopState['shopList']>()
const goSearch=()=>{
    router.push('/search')
}
const goRank = ()=>{
  window.scrollTo(0, 460)
}
const valueRank = ref('default');
const optionRank = [
      { text: '默认排序', value: 'default' },
      { text: '好评排序', value: 'score' },
      { text: '销量排序', value: 'sold' },
      { text: '均价排序', value: 'avg_price'}
];
//首页展示
const showShop = async(valueRank:string)=>{
  await store.dispatch('getShop',valueRank)
}
//选择店铺
const chooseShop = async(e:Event)=>{
  let id = (e.currentTarget as Element).getAttribute('data-shop')
  //console.log((e.currentTarget as Element).getAttribute('data-shop'))
  router.push(`/shop/${id}`)
}
//滑动展示
const onLoad = async()=>{
  await store.dispatch('loadShop',valueRank.value)
  loading.value = false;
  finished.value = store.state.shop.finshed
}
//选择标签
const chooseRankValue=async ()=>{
  finished.value = false
  await store.dispatch('getShop',valueRank.value)
}
let shopListStore = computed(()=>{return store.state.shop.shopList})
watch(()=>{return shopListStore},(newValue,oldValue)=>{
  shops.value = newValue.value  as ShopState['shopList']  
},{deep:true,immediate:true})
onMounted(async()=>{
  await showShop(valueRank.value)
})
</script>
<style>
  .my-swipe .van-swipe-item {
    color: rgb(8, 48, 64);
    background-color: white;
  }
</style>