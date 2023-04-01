<template>
<!-- <div id="container"></div> -->
<iframe id="mapPage" width="100%" height="600px" frameborder=0
    src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEWBZ-63WES-UUYOU-63EBE-4JWPV-VEFLI&referer=myapp">
</iframe>
<!-- <div id="container" class="map-container"></div> -->
</template>
<script setup lang="ts">
//腾讯地图
import path from 'path';
import {useRoute, useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()
const props = defineProps({id:{type:String}})
window.addEventListener('message', function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        let loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          //console.log(loc.poiaddress)
          if(props.id){
            router.replace({name:'UpdateAddress',params:{lat:loc.latlng.lat,lng:loc.latlng.lng,pioaddress:loc.poiaddress,id:props.id}})
          }else{
            router.replace({name:'UpdateAddress',params:{lat:loc.latlng.lat,lng:loc.latlng.lng,pioaddress:loc.poiaddress}})
          }
          
        }
    }, false);
</script>
<style>
  #container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 800px;
    }
</style>