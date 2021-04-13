<!--
 * @Author: your name
 * @Date: 2021-04-09 16:17:50
 * @LastEditTime: 2021-04-11 22:56:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/components/sideBar.vue
-->
<template>
  <div class="side-bar" ref="sideBar">
    <div
      class="nav"
      v-for="(nav, i) in $store.state.sideBarList"
      :key="nav"
      :class="{ 'active-nav': index === i }"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i === 0 ? "全部" : nav }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  methods: {
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动距离
      const { sideBar } = this.$refs;
      const sideBarHeight = sideBar.offsetHeight;
      const sideBarTop = sideBar.getBoundingClientRect().top;
      const targetDomHeight = e.target.offsetHeight;
      const targetDomTop = e.target.getBoundingClientRect().top;
      this.moveTargetDom(
        sideBar.scrollTop,
        targetDomTop + targetDomHeight / 2 - sideBarTop - sideBarHeight / 2,
      );
      this.$store.dispatch('resetGoodsList');
      // 获取数据
      this.$store.dispatch('getGoodsList', {
        type: this.$store.state.sideBarList[i],
        page: 1,
        sort: 'all',
      });
    },
    moveTargetDom(start, end) {
      let dis = 0;
      let speed = 5;
      if (end < 0) {
        speed *= -1;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.sideBar.scrollTop = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.sideBar.scrollTop = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
.side-bar {
  width: 79px;
  overflow-y: auto;
  position: fixed;
  left: 0;
  top: 147px;
  bottom: 50px;
  text-align: center;
  font-size: 12px;
  background: #f8f8f8;
  .nav {
    width: 79px;
    height: 40px;
    line-height: 40px;
    &.active-nav {
      color: #ff1a90;
      font-weight: bold;
      position: relative;
      &::before {
        content: "";
        width: 6px;
        height: 18px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #ff1a90;
      }
    }
  }
}
.side-bar::-webkit-scrollbar {
  display: none;
}
</style>
