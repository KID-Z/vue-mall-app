<!--
 * @Author: your name
 * @Date: 2021-04-11 23:01:59
 * @LastEditTime: 2021-04-11 23:24:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/components/MyHistory.vue
-->
<template>
  <div class="histroy">
    <h4>历史记录</h4>
    <div class="item" v-for="s in searchList" :key="s.time" @click="search(s.value)">
      {{ s.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchList'],
  methods: {
    search(value) {
      this.$emit('search', value);
    },
  },
};
</script>

<style lang="less" scoped>
.histroy {
  .item {
    padding: 15px;
    background: #eee;
    border-radius: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
</style>
