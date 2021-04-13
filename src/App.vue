<!--
 * @Author: your name
 * @Date: 2021-04-08 12:59:10
 * @LastEditTime: 2021-04-12 16:47:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/App.vue
-->
<template>
  <div id="app">
    <transition :name="transitionName" :mode="this.$router.back ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    const storageMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setStorageMap', storageMap);
  },
  data() {
    return {
      transitionName: 'left',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === 'Classify' && from.name === 'Search') {
        this.$router.back = true;
      }

      if (this.$router.back) {
        this.transitionName = 'right';
      } else {
        this.transitionName = 'left';
      }
      this.$router.back = false;
    },
  },
};
</script>

<style lang="less">
.view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transition: transform 0.3s linear;
}
.left-enter {
  transform: translate(100%, 0);
}
.right-leave-to {
  transform: translate(100%, 0);
}
</style>
