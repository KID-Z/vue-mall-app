<!--
 * @Author: your name
 * @Date: 2021-04-08 16:19:38
 * @LastEditTime: 2021-04-11 21:35:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/components/Tapbar.vue
-->
<template>
  <van-tabbar route fixed>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item :to="{ name: 'Classify' }" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item :to="{ name: 'Shopping' }" id="shop-car" icon="cart-o" :badge="badge"
      >购物车</van-tabbar-item
    >
    <van-tabbar-item to="/my" icon="user-circle-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  computed: {
    badge() {
      const result = Object.values(this.$store.state.storageMap);
      let sum = 0;
      for (let i = 0; i < result.length; i += 1) {
        sum += result[i];
      }
      if (sum > 99) {
        return '99+';
      } if (sum === 0) {
        return '';
      }
      return sum;
    },
  },
};
</script>
