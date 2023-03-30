<template>
    <van-search
      v-model="keyWords"
      show-action
      placeholder="请输入搜索关键词"
    >
    <template #action>
    <div @click="onSearch" style="color: skyblue">搜索</div>
  </template>
</van-search>
<div style="background-color: white; padding-top: 10px;">
<div style="padding-left: 10px;">热门搜索</div>
<van-divider content-position="left" :style="{ borderColor: '#1989fa', }"></van-divider>
<van-space wrap style="padding: 10px;">
    <van-tag color="black" size="large" plain >标签</van-tag>
    <van-tag color="black" size="large" plain >标签</van-tag>
    <van-tag color="black" size="large" plain >标签</van-tag>
</van-space>
</div>
<br/>
<div style="background-color: white;padding-top: 20px;">
    <div style="padding-left: 10px; padding-right: 250px; display: inline-block;">历史搜索</div>
    <van-icon name="delete-o" size="25" @click="isDelete"/>
<van-divider content-position="left" :style="{ borderColor: '#1989fa', }"></van-divider>
<van-space wrap style="padding: 10px;">
    <van-tag color="black" size="large" plain >标签</van-tag>
    <van-tag color="black" size="large" plain >标签</van-tag>
    <van-tag color="black" size="large" plain >标签</van-tag>
</van-space>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { showConfirmDialog } from 'vant'

const keyWords=ref('')

const onSearch=()=>{

}
const isDelete=()=>{
    showConfirmDialog({
        message:
            '清除历史记录？',
        })
    .then(() => {
        // on confirm
    })
    .catch(() => {
        // on cancel
    });
}
</script>