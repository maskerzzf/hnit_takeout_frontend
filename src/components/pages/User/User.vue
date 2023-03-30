<template>
    <div style="background-color: skyblue;height: 90px; display: flex; margin-bottom: 10px;" >
    <van-image
      round
      width="60px"
      height="60px"
      :src="avatar"
      style="margin-top:15px;margin-left: 20px; margin-right: 20px; display: inline-block; vertical-align:middle;"
    />
        <div style="font-size: 20px;line-height: 90px; margin-right: 30px;">{{ nick_name }}</div>
        <div style="font-size: 20px;line-height: 90px;">姓名</div>
    </div>
    <van-cell is-link icon="bill-o" title="优惠" to="Hongbao"></van-cell>
    <van-cell is-link icon="location-o" title="地址" to="Address"></van-cell>
    <van-cell is-link icon="star-o" title="收藏"></van-cell>
    <van-cell is-link icon="comment-o" title="评价"></van-cell>
    <van-cell is-link icon="phone-circle-o" title="修改手机号" to="Phone"></van-cell>
</template>
<script setup lang="ts">
import { useStore } from '@/store/index';
import { ref } from 'vue';
const store  = useStore()
const avatar = ref<string>(store.state.user.user.avatar)
const nick_name = ref<string>(store.state.user.user.nick_name)
</script>