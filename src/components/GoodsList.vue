<!--
 * @Author: your name
 * @Date: 2021-04-09 22:26:37
 * @LastEditTime: 2021-04-13 14:19:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/views/GoodsList.vue
-->
<template>
  <div class="good-list">
    <div class="header van-hairline--top-bottom">
      <div class="all" :class="{ active: active === 'all' }" @click="changeType('all')">综合</div>
      <div class="sale" :class="{ active: active === 'sale' }" @click="changeType('sale')">
        销量
      </div>
      <div
        class="price"
        :class="{ 'price-up': active === 'price-up', 'price-down': active === 'price-down' }"
        @click="changeType('price')"
      >
        价格
      </div>
    </div>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <GoodsCard v-for="item in $store.state.goodsList" :goodsList="item" :key="item.id" />
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/GoodsCard.vue';

export default {
  data() {
    return {
      active: 'all',
      isLoading: false,
      loading: false,
      finished: false,
      page: 1,
    };
  },
  methods: {
    changeType(type) {
      if (type === 'all') {
        this.active = 'all';
      } else if (type === 'sale') {
        this.active = 'sale';
      } else if (type === 'price') {
        if (this.active === 'price-up') {
          this.active = 'price-down';
        } else {
          this.active = 'price-up';
        }
      }
      this.onRefresh();
    },
    async onRefresh() {
      this.isLoading = true;
      this.loading = false;
      this.page = 1;
      this.$store.dispatch('resetGoodsList');
      await this.$store.dispatch('getGoodsList', {
        page: 1,
        sort: this.active,
      });
      this.isLoading = false;
      this.finished = false;
    },
    async onLoad() {
      this.loading = true;
      this.page += 1;
      const result = await this.$store.dispatch('getGoodsList', {
        page: this.page,
        sort: this.active,
      });
      if (result) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
  },
  components: {
    GoodsCard,
  },
};
</script>

<style lang="less" scoped>
.good-list {
  position: fixed;
  top: 147px;
  bottom: 50px;
  overflow: auto;
  left: 79px;
  width: 296px;
  padding: 0 8px;
  box-sizing: border-box;
  background: #fff;
  .header {
    display: flex;
    justify-content: flex-end;
    z-index: 99;
    > div {
      width: 50px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #cecece;
      &.active,
      &.price-up,
      &.price-down {
        font-weight: bold;
        color: #ff1a90;
      }
    }
    .price {
      position: relative;
      &::after {
        position: absolute;
        content: "";
        border: 4px solid transparent;
        border-bottom-color: #aaa;
        top: 4px;
        right: 2px;
      }
      &.price::before {
        position: absolute;
        content: "";
        border: 4px solid transparent;
        border-top-color: #aaa;
        bottom: 4px;
        right: 2px;
      }
      &.price-up::after {
        border-bottom-color: #ff1a90;
      }
      &.price-down::before {
        border-top-color: #ff1a90;
      }
    }
  }
}
.van-pull-refresh {
  overflow: unset!important;
}
</style>
