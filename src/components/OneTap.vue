<!--
 * @Author: your name
 * @Date: 2021-04-08 22:47:34
 * @LastEditTime: 2021-04-10 22:19:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/components/oneTap.vue
-->
<template>
  <div class="one-tap" ref="oneTap">
    <div
      class="tap"
      v-for="(m, i) in menuList"
      :key="m.title"
      @touchend="scrollTo(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="tap-img" :class="{ 'active-tap': index === i }">
        <img :src="m.imgURL" />
      </div>
      <div class="title" :class="{ 'active-title': index === i }">
        {{ m.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('setSideBarList', this.menuList[0].title);
  },
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL: 'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  methods: {
    scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      // 计算移动距离
      const { oneTap } = this.$refs;
      const oneTapWidth = oneTap.offsetWidth;
      const targetDomWidth = e.target.offsetWidth;
      const targetDomLeft = e.target.getBoundingClientRect().left;
      this.moveTargetDom(oneTap.scrollLeft, targetDomWidth / 2 + targetDomLeft - oneTapWidth / 2);

      // 获取二级导航数据
      this.$store.dispatch('setSideBarList', this.menuList[i].title);
    },
    moveTargetDom(start, end) {
      let dis = 0;
      let speed = 5;
      if (end < 0) {
        speed *= -1;
      }
      const timer = setInterval(() => {
        dis += speed;
        this.$refs.oneTap.scrollLeft = start + dis;
        if (Math.abs(dis) > Math.abs(end)) {
          this.$refs.oneTap.scrollLeft = start + end;
          clearInterval(timer);
        }
      }, 2);
    },
  },
};
</script>

<style lang="less" scoped>
.one-tap {
  width: 375px;
  height: 104px;
  overflow-x: auto;
  overflow-y: visible;
  display: flex;
  .tap {
    width: 50px;
    height: 70px;
    margin-top: 10px;
    margin-left: 5px;
    padding: 10px 5px;
    .tap-img {
      width: 50px;
      height: 50px;
      border-radius: 23px;
      border: 2px solid #fff;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active-tap {
        border-color: #d13193;
      }
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .title {
      background: #fff;
      font-weight: bold;
      font-size: 12px;
      text-align: center;
      border-radius: 30px;
      margin: 5px auto 0 auto;
      &.active-title {
        background: #d13193;
        color: #fff;
      }
    }
  }
}
.one-tap::-webkit-scrollbar {
  display: none;
}
</style>
