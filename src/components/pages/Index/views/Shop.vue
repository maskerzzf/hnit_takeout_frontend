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
          <div class="content" >
          <div :ref="`dish${index}`" v-for="dish,index in dishList" :key="dish.id">
            <van-card
            :price="dish.price"
            :desc="dish.description"
            :title="dish.name"
            :thumb="dish.image"
            style="background-color: white;"
            >
              <template #footer>
                  <van-button size="mini" v-if="dish.dish_flavorVOList.length != 0" type="primary" round @click="chooseFlavor(dish.dish_flavorVOList,dish.id,dish.price,dish.image)">规格</van-button>
                  <van-button size="mini"  v-if="dish.dish_flavorVOList.length == 0" style="border-radius: 100%; width: 25px;height: 25px;">-</van-button>
                  <van-button size="mini" type="primary" v-if="dish.dish_flavorVOList.length == 0" style="border-radius: 100%; width: 25px;height: 25px;" @click="">+</van-button>                  
              </template>
            </van-card>
          </div>
          </div>
        </div>
      </template>
  </van-tree-select>
  <van-dialog v-model:show="showFlavors" title="选择口味" showCancelButton @confirm="confirmFlavor" @cancel="cancelFlavor">
    <template #default >
      <div style="padding:10px;">
        <div v-for="item,flavorIndex in newDishFlavor">
      <div style="font-size: 15px;">{{ item.flavorName }}</div>
    <van-tag 
    v-for="value in JSON.parse(item.flavorValue)" 
    type="primary" size="large" message-align="right" 
    plain style="margin-top: 10px; margin-right:10px;margin-bottom: 10px;" 
    @click="chooseFlavorDetail(value,$event,flavorIndex,item.id)" :ref="`flavor${item.id}`">{{ value }}</van-tag>
    </div>
      </div> 
    </template>                  
  </van-dialog>
    <div style="position: fixed; display: flex;justify-content: space-between; width: 300px; height: 50px; margin-left: 10%; bottom: 30px; border: 1px skyblue solid; border-radius: 25px; background-color: skyblue; line-height:50px ;">
      <div style="border-radius:25px 0 0 25px ; width: 170px; background-color: black; color: white; padding-left: 30px;"></div>
      <div style="margin-right: 30px;">去结算</div>
      </div>
  </van-tab>
  <van-tab title="套餐"></van-tab>
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
import lodash from 'lodash'
const store = useStore()
const router = useRouter()
const route = useRoute()
//获取dom
let instance= getCurrentInstance()
//激活tab
const active = ref(0)
let beforeTarget = ref<HTMLElement|null>(null)
//右侧菜单滚动距离
const scrollDistance = ref(0)
//具体口味
let flavorMap:Map<string,string> = new Map()
//右侧dom高度
const heightList = ref<number[]>([0])
//左侧激活
const activeIndex = ref(0)
//菜品id
let dishId:string = ''
//收藏
const isCollected = ref<boolean>(false)
//满减
let fullReductionInfo = ref<Map<number,string>>()
//左侧菜单列表
const items = ref([{ text: '' }])
//口味弹窗
const showFlavors=ref(false)
//购物车
const shopCart=ref<shopCartList['shopCart']>([])
const dishList = ref<ShopState['dishList']>([{
        id:'',
        name:'',
        category:'',
        price:0,
        description:'',
        score:0,
        sold:0,
        image:'',
        dish_flavorVOList:[{
          id:'',
          flavorName:'',
          flavorValue:'',
        }]}])
interface shopCartList{
  shopCart:{
    id:string,
    name:string,
    image:string,
    countNum:number,
    price:number,
    flavorMap: Map<string,string>
  }[]
}
interface dishFlavor{
      dishFlavorList:{
        id:string,
        flavorName:string,
        flavorValue:string,
      }[]        
}
let newDishFlavor = ref<dishFlavor['dishFlavorList']>()
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
  scroll.refresh()
}
//获取商品列表高度
const getCategoryListHeight = ()=>{
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
//选择口味
const chooseFlavor=(flavors:dishFlavor['dishFlavorList'],id:string,price:number,image:string)=>{
    dishId=id
    showFlavors.value=true
    newDishFlavor.value =flavors 
}
//选择具体的口味
const chooseFlavorDetail=(flavorItem:string,e:Event,index:number,id:string)=>{
  (instance?.refs[`flavor${id}`] as []).forEach(item=>{
    (item as any).$el.classList.add("van-tag--plain")
  }); 
 (e.target as Element).classList.remove("van-tag--plain") 
  if(flavorMap.has(id)){
    flavorMap.delete(id)
    flavorMap.set(id,(e.target as HTMLSpanElement).innerText)
  }else{
    flavorMap.set(id,(e.target as HTMLSpanElement).innerText)
  }
}
//确认口味
const confirmFlavor= ()=>{
  const newDish  =  dishList.value.filter(item=>{
    return item.id == dishId
  })
  let {price,image,name} = newDish[0];
  shopCart.value.push({
    id:dishId,
    countNum:1,
    price:price,
    image:image,
    name:name,
    flavorMap:flavorMap
  })
  dishId =''
  flavorMap.clear()
}
//取消口味
const cancelFlavor = ()=>{
  dishId=''
  flavorMap.clear()
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
 watch(categoryItemsStore,async(newValue,oldValue)=>{
  items.value = newValue as {text:string}[]
  await nextTick(() => {
        scroll && scroll.refresh()
  })
  
 },{deep:true})
 const dishArryStore = computed(()=>{return store.state.shop.dishList})
 watch(()=>{return dishArryStore.value},async(newValue,oldValue)=>{
  dishList.value = lodash.cloneDeep(newValue)
  await nextTick(() => {
        scroll && scroll.refresh()
  })
  getCategoryListHeight() 
 },{deep:true})
 onMounted(async()=>{
  initShop()
  await nextTick()
  initBS() 
  }
  )
 </script>