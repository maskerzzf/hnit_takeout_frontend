<template>
    <van-card
  desc="公告" 
  :centered="true"
  thumb="https://masker-1314424888.cos.ap-nanjing.myqcloud.com/hnit_takeout/base/baozi.png"
    style="--van-card-thumb-size:40px;padding-left: 30px;padding-right: 30px; font-size: medium; background-color: white;"
>
<template #title>
    <div style="display: flex;justify-content: space-between; font-size: medium;">
        <div style="font-size:medium; font-weight: 700;font-style: inherit;">标题</div>
        <van-tag plain size="large">收藏</van-tag>
    </div>
</template>
</van-card>
<div style="margin-right: 10px;padding: 10px;" >  
    <van-tag plain type="primary" size="medium" style="margin-right: 10px;">标签</van-tag>
    <van-tag plain type="primary" size="medium" style="margin-right: 10px;">标签</van-tag>
    <van-tag plain type="primary" size="medium" style="margin-right: 10px;">标签</van-tag>
    <van-tag plain type="primary" size="medium" style="margin-right: 10px;">标签</van-tag>
    <van-tag plain style="height: 20px; margin-top:5px; margin-left: 100px; width: 40px;" round>
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
>
  <template #content>
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
  <van-card
        price="价格"
        desc="描述信息"
        title="商品标题"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
    <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
  </van-card>
  <van-card
        price="价格"
        desc="描述信息"
        title="商品标题"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
    <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
  </van-card>
  <van-card
        price="价格"
        desc="描述信息"
        title="商品标题"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
    <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
  </van-card>
  <van-card
        price="价格"
        desc="描述信息"
        title="商品标题"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
    <template #footer>
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </template>
  </van-card>
  </template>
</van-tree-select>
<div style="position: fixed; display: flex;justify-content: space-between; width: 300px; height: 50px; margin-left: 10%; bottom: 30px; border: 1px skyblue solid; border-radius: 25px; background-color: skyblue; line-height:50px ;">
  <div style="border-radius:25px 0 0 25px ; width: 170px; background-color: black; color: white; padding-left: 30px;">价格</div>
  <div style="margin-right: 30px;">去结算</div>
</div>
  </van-tab>
  <van-tab title="套餐">内容 2</van-tab>
  <van-tab title="评价">
    <div style="display: flex;justify-content: space-between; height:100px;">
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
import { ref } from 'vue'
 const active = ref(0)
 const activeIndex = ref(0)
 const items = ref([{ text: '分组 1' }, { text: '分组 2' }])
 const value = ref(3.3)
 </script>