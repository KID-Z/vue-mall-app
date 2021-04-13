<!--
 * @Author: your name
 * @Date: 2021-04-08 16:15:36
 * @LastEditTime: 2021-04-13 14:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/views/Shopping.vue
-->
<template>
  <div class="shopping">
    <div class="nav-head">
      <van-nav-bar title="购物车" :right-text="rightText" @click-right="del" />
    </div>
    <template v-if="list.length">
      <div class="card-list">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div class="card-box" v-for="item in list" :key="item.id">
            <van-checkbox :name="item.id" class="checkbox" />
            <GoodsCard :goodsList="item" class="card-content" :nofly="true" />
          </div>
        </van-checkbox-group>
      </div>
      <van-submit-bar :price="allMoney" :button-text="`去结算(${totalNum})`" @submit="onSubmit">
        <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      </van-submit-bar>
    </template>
    <div class="img" v-else>
      <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg" />
    </div>
  </div>
</template>

<script>
import GoodsCard from '@/components/GoodsCard.vue';
import { Toast, Dialog } from 'vant';
import api from '@/api';

export default {
  created() {
    this.getAllData();
  },
  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },
  computed: {
    allMoney() {
      const checked = this.list.filter((item) => this.result.includes(item.id));
      let sum = 0;
      for (let i = 0; i < checked.length; i += 1) {
        const num = this.$store.state.storageMap[checked[i].id] || 0;
        sum += Math.round(num * checked[i].price * 100);
      }
      return sum;
    },
    totalNum() {
      const checked = this.list.filter((item) => this.result.includes(item.id));
      let total = 0;
      for (let i = 0; i < checked.length; i += 1) {
        const num = this.$store.state.storageMap[checked[i].id] || 0;
        total += num;
      }
      return total;
    },
    rightText() {
      if (this.list.length) {
        return '删除';
      }
      return '';
    },
  },
  methods: {
    async getAllData() {
      const id = Object.keys(this.$store.state.storageMap);
      const res = await api.getGoodsByIds(id.join());
      this.list = res.list;
    },
    async del() {
      if (this.result.length === 0) {
        Toast('没有选择任何商品哦!');
        return;
      }
      try {
        await Dialog.confirm({
          message: '确定要删除吗?',
        });
        this.result.forEach((id) => {
          this.$store.commit('storageChenge', { id, num: -Infinity });
          this.list = this.list.filter((item) => !this.result.includes(item.id));
          this.result = [];
        });
      } catch (error) {
        console.log(error);
      }
    },
    onSubmit() {},
    checkAll() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(true);
      } else {
        this.$refs.checkboxGroup.toggleAll(false);
      }
    },
  },
  components: {
    GoodsCard,
  },
  watch: {
    result() {
      if (this.result.length === this.list.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.shopping {
  background: #fff;
  .nav-head {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .card-list {
    position: relative;
    top: 46px;
    left: 0;
    width: 100%;
    padding: 10px 10px 100px 10px;
    background: #fff;
    box-sizing: border-box;
    .card-box {
      display: flex;
      align-items: center;
      .card-content {
        flex: 1;
      }
      .checkbox {
        margin-left: 10px;
        margin-right: 15px;
      }
    }
  }
  .img {
    margin-top: 46px;
  }
}
.van-submit-bar {
  bottom: 50px;
}
</style>
