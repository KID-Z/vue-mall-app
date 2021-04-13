<!--
 * @Author: your name
 * @Date: 2021-04-08 16:10:53
 * @LastEditTime: 2021-04-10 21:35:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/views/Home.vue
-->
<template>
  <div>
    <router-view></router-view>
    <Tapbar />
  </div>
</template>

<script>
import Tapbar from '@/components/Tapbar.vue';

export default {
  data() {
    return {
      active: 0,
    };
  },
  components: {
    Tapbar,
  },
};
</script>
