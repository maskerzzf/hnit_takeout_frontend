<template>
    <van-card
  :desc="shopDetail.announcement" 
  :centered="true"
  :thumb="shopDetail.images"
    style="--van-card-thumb-size:40px;padding-left: 30px;padding-right: 30px; font-size: medium; background-color: white;"
>
<template #title>
    <div style="display: flex;justify-content: space-between; font-size: medium;">
        <div style="font-size:medium; font-weight: 700;font-style: inherit;">{{ shopDetail.name }}</div>
        <van-tag plain size="large" @click="changeCollected">{{ isCollected? '已收藏':'收藏' }}</van-tag>
    </div>
</template>
</van-card>
<div style="margin-right: 10px;padding: 10px;" >  
    <van-tag plain type="primary" v-for="(value,key) in  fullReductionInfo" size="medium" :key="key" style="margin-right: 10px;">满{{ key }}减{{ value }}</van-tag>
    <van-tag plain style="float: right; height: 20px; width: 40px;" round>
        <van-icon name="search" />
        搜索
    </van-tag>
</div>
<div style="background-color: white;">
<van-tabs v-model:active="active" >
  <van-tab title="点菜" >
    <van-tree-select
    v-model:main-active-index="activeIndex"
    height="466px"
    :items="items"
    @click="selectDish"
    >
      <template #content>
        <div class="wrapper" ref="wrapper" style="height: 100px;">
          <div class="content" ref="shop">
          <div ref="dish0">
          <div>标题</div>
            <van-card
            price="价格"
            desc="描述信息"
            title="商品标题"
            thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
            style="background-color: white;"
            >
              <template #footer>
                  <van-button size="mini">按钮</van-button>
                  <van-button size="mini">按钮</van-button>
              </template>
            </van-card>
          </div>
          </div>
        </div>
      </template>
  </van-tree-select>
    <div style="position: fixed; display: flex;justify-content: space-between; width: 300px; height: 50px; margin-left: 10%; bottom: 30px; border: 1px skyblue solid; border-radius: 25px; background-color: skyblue; line-height:50px ;">
      <div style="border-radius:25px 0 0 25px ; width: 170px; background-color: black; color: white; padding-left: 30px;">价格</div>
      <div style="margin-right: 30px;">去结算</div>
      </div>
  </van-tab>
  <van-tab title="套餐">内容 2</van-tab>
  <van-tab title="评价">
    <div style="display: flex;justify-content: space-between; height:10px;">
      <div style="width: 70px;">
        <div style="font-size:larger; color: skyblue; text-align: center;margin-bottom: 10px;">4.7</div>
        <span style="text-align:center;">商家评分</span>
      </div>
      <div><van-rate v-model="value" readonly /></div>
      
    </div>
  </van-tab>

</van-tabs>

</div>
</template>
<script setup lang="ts">
import { useStore } from '@/store'
import { ComponentInternalInstance, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BScroll from "better-scroll"
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { computed } from '@vue/reactivity';
import { ShopState } from '@/store/shop/shop';
import { tsNeverKeyword } from '@babel/types';
import { showToast } from 'vant';
const store = useStore()
const router = useRouter()
const route = useRoute()
let instance= getCurrentInstance()
const active = ref(0)
const scrollDistance = ref(0)
const heightList = ref<number[]>([0])
const activeIndex = ref(1)
const isCollected = ref<boolean>(false)
let fullReductionInfo = ref<Map<number,string>>()
const items = ref([{ text: '套餐1' }, { text: '套餐2' },{ text: '套餐3' },{ text: '套餐4' }])
const value = ref(3.3)
let shopDetail = ref<ShopState['shop']>({
        id:'',
        name:'',
        images:'',
        address:'',
        lat:0,
        lng:0,
        avgPrice:0,
        sold:0,
        score:0,
        sendPrice:0,
        distribution:0,
        announcement:''
    })
let scroll:BScrollConstructor<{}>
const initBS= ()=>{
  scroll = new BScroll('.wrapper',{
  click: true,
  scrollY: true,
  mouseWheel: true,
  probeType:2})
  scroll.on('scrollEnd',(coordinate:{x: any,y: any})=>{
    scrollDistance.value = Math.abs(Math.round(coordinate.y))
    for(let i:number=0;i<=items.value.length;i++){
      if(heightList.value[i]<scrollDistance.value && heightList.value[i+1]>=scrollDistance.value){
        activeIndex.value = i
      }
    }
  })
}
//获取商品列表高度
const getCategoryListHeight = ()=>{
  //console.log()
  for(let i:number=0;i<items.value.length;i++){
    let dish:string = 'dish'+i
    let DOMheight:number = ((instance?.refs[dish] as HTMLElement).offsetHeight  as number)+heightList.value[i]
    heightList.value.push(DOMheight)
  }
}
//选择菜品类型
const selectDish = ()=>{
  scroll.scrollToElement(instance?.refs[`dish${activeIndex.value}`] as HTMLElement,100,0,0)
}
//收藏商店
const changeCollected=async ()=>{
  isCollected.value = !isCollected.value
  let userId = store.state.user.user.id
  let shopId = route.params.id
  let isCollectedFlag:boolean = isCollected.value
  await store.dispatch('changeCollected',{userId,shopId,isCollectedFlag})
}
//初始化店铺内容
const initShop = async()=>{
  let userId = store.state.user.user.id
  let shopId = route.params.id
  await store.dispatch('getShopDetail',route.params.id)
  await store.dispatch('getFullReduction',route.params.id)
  await store.dispatch('isCollected',{shopId,userId})
  await store.dispatch('getCategory',shopId)
  await store.dispatch('getDish')
 }
const shopStore =  computed(()=>{return store.state.shop.shop})
watch(shopStore,(newValue,oldValue)=>{
  shopDetail.value = newValue
 })
const fullReductionStore = computed(()=>{ return store.state.shop.fullReductionMap})
watch(fullReductionStore,(newValue,oldValue)=>{
    fullReductionInfo.value = newValue
 })
 const isCollectedStore = computed(()=>{return store.state.shop.isCollected})
 watch(isCollectedStore,(newValue,oldValue)=>{
  isCollected.value = newValue
 })
 const categoryItemsStore=computed(()=>{return store.state.shop.categoryItems})
 watch(categoryItemsStore,(newValue,oldValue)=>{
  items.value = newValue as {text:string}[]
  
 },{deep:true})
 onMounted(async()=>{
  initShop()
  await nextTick()
  initBS()
  getCategoryListHeight()     
  }
  )
 </script>