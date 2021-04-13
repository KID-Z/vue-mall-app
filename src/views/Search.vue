<!--
 * @Author: your name
 * @Date: 2021-04-11 14:33:19
 * @LastEditTime: 2021-04-13 14:30:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/views/Search.vue
-->
<template>
  <div class="search">
    <div class="search-head">
      <van-icon name="arrow-left" class="icon" @click="$router.goBack()" />
      <van-search
        class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
        @blur="blur"
      >
        <template #action v-if="showList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <router-link tag="div" :to="{ name: 'Shopping' }">
            <van-icon name="cart-o" :badge="badge" id="shop-car" class="shop-ping" />
          </router-link>
        </template>
      </van-search>
    </div>
    <div class="search-like-list" v-if="likeList.length > 0 && showList">
      <van-list>
        <van-cell v-for="item in likeList" :key="item" @click="onSearch(item)">
          <template>
            <span v-html="formatHtml(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <GoodsCard v-for="item in goodsList" :goodsList="item" :key="item.id" />
      </van-list>
    </div>
    <div class="histroy" v-if="likeList.length <= 0 && showList">
      <MyHistory :searchList="searchList" @search="onSearch" />
    </div>
  </div>
</template>

<script>
import api from '@/api';
import GoodsCard from '@/components/GoodsCard.vue';
import MyHistory from '@/components/MyHistory.vue';

export default {
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
  data() {
    return {
      place: '酒',
      value: this.place,
      likeList: [],
      timer: null,
      showList: true,
      loading: false,
      finished: false,
      page: 1,
      size: 7,
      total: 0,
      goodsList: [],
      searchList: [],
    };
  },
  computed: {
    badge() {
      const result = Object.values(this.$store.state.storageMap);
      let sum = 0;
      for (let i = 0; i < result.length; i += 1) {
        sum += result[i];
      }
      if (sum > 99) {
        return '99+';
      }
      if (sum === 0) {
        return '';
      }
      return sum;
    },
  },
  methods: {
    async onSearch(value) {
      if (!value) {
        this.value = this.place;
      } else {
        this.value = value;
      }
      const res = this.searchList.find((item) => item.value === this.value);
      if (res) {
        res.time = Date.now();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: Date.now() });
        if (this.searchList.length >= 10) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.loading = false;
      await this.onLoad();
      this.showList = false;
      this.finished = false;
    },
    async input() {
      if (this.value === '') {
        this.likeList = [];
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const val = this.value || this.place;
          const likeList = await api.likeSearch(val);
          this.likeList = likeList.result;
          clearTimeout(this.timer);
          this.timer = null;
        }, 300);
      }
    },
    focus() {
      this.showList = true;
    },
    blur() {
      this.likeList = [];
    },
    formatHtml(text) {
      const reg = new RegExp(this.value, 'g');
      return text.replace(reg, this.value.fontcolor('red'));
    },
    async onLoad() {
      this.loading = true;
      console.log('执行了', this.page);
      const goodsList = await api.search(this.value, this.page, this.size);
      this.total = goodsList.total;
      this.goodsList = [...this.goodsList, ...goodsList.list];
      console.log(goodsList);
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.loading = false;
        this.page += 1;
      }
    },
  },
  components: {
    GoodsCard,
    MyHistory,
  },
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-head {
    width: 345px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    background: #fff;
    z-index: 100;
    top: 0;
    left: 15px;
    .icon {
      font-size: 22px;
    }
    .search-content {
      flex: 1;
    }
  }
  .search-like-list {
    width: 100%;
    position: relative;
    top: 50px;
    box-sizing: border-box;
    padding-left: 30px;
    background: #fff;
  }
  .goods-list {
    width: 345px;
    position: relative;
    margin: 60px auto 0;
    background: #fff;
  }
  .histroy {
    width: 350px;
    position: relative;
    top: 35px;
    left: 10px;
    margin: 48px auto 0;
    background: #fff;
  }
}
.shop-ping {
  font-size: 24px;
  margin-top: 12px;
}
</style>
