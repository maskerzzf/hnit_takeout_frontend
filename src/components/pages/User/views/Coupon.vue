<template>
      <van-coupon-list
    :coupons="coupons"
    :chosen-coupon="chosenCoupon"
    @change="onChange"
  />
</template>
<script setup lang="ts">
import Coupon, { CouponInfo } from 'vant/lib/coupon/Coupon';
import { reactive, ref } from 'vue';
// const coupon = ref({
//       available: 1,
//       condition: '无门槛\n最多优惠12元',
//       reason: '',
//       value: 150,
//       name: '优惠券名称',
//       startAt: 1489104000,
//       endAt: 1514592000,
//       valueDesc: '1.5',
//       unitDesc: '元',
//     });

    const coupons = ref<CouponInfo[]>([
        {
        id: 12,
        name: 'zzzf',
        endAt: 123,
        value: 234,
        startAt: 345,
        reason: '1www',
        discount: 123,
        unitDesc: 'zzzz',
        condition:'zzzz',
        valueDesc: 'zzzz',
        description: 'zzzz',
        denominations: 12,
        originCondition: 123
    }
    ]);
    const showList = ref(false);
    const chosenCoupon = ref(-1);

    const onChange = (index:number) => {
      showList.value = false;
      chosenCoupon.value = index;
    };
</script>