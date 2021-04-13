<!--
 * @Author: your name
 * @Date: 2021-04-08 16:15:13
 * @LastEditTime: 2021-04-12 00:27:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/views/Classify.vue
-->
<template>
  <div class="classify-wrapper">
    <router-link tag="div" to="/search" class="search-btn">
      <van-icon name="search" />
      <span>苹果1元一斤</span>
    </router-link>
    <OneTap />
    <template v-if="!isLoading">
      <SideBar />
      <GoodsList />
    </template>
    <van-loading size="2rem" vertical v-else />
  </div>
</template>

<script>
import OneTap from '@/components/OneTap.vue';
import SideBar from '@/components/SideBar.vue';
import GoodsList from '@/components/GoodsList.vue';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLoading', 'sideBarList']),
  },
  components: {
    OneTap,
    SideBar,
    GoodsList,
  },
  watch: {
    isLoading() {
      if (!this.isLoading) {
        this.$store.dispatch('resetGoodsList');
        this.$store.dispatch('getGoodsList', {
          type: this.sideBarList[0],
          page: 1,
          sort: 'all',
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.classify-wrapper {
  background: #fff;
  .search-btn {
    width: 355px;
    height: 33px;
    line-height: 33px;
    margin: 11px auto 0;
    font-size: 14px;
    color: #a1a1a1;
    border-radius: 10px;
    background: #eee;
    text-align: center;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
