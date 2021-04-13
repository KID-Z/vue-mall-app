<!--
 * @Author: your name
 * @Date: 2021-04-09 23:27:10
 * @LastEditTime: 2021-04-12 15:34:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/components/GoodsCard.vue
-->
<template>
  <div class="goods-card van-hairline--bottom">
    <div class="img">
      <img :src="goodsList.images[0]" ref="img" />
    </div>
    <div class="content">
      <div class="title overflow-hide">{{ goodsList.title }}</div>
      <div class="desc overflow-hide">{{ goodsList.desc }}</div>
      <div class="tags">
        <div v-for="t in goodsList.tags" :key="t">{{ t }}</div>
      </div>
      <div class="price">{{ goodsList.price }}</div>
      <div class="control">
        <div @touchend="add(goodsList.id, -1)" v-if="$store.state.storageMap[goodsList.id]">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png" />
        </div>
        <div class="num" v-if="$store.state.storageMap[goodsList.id]">
          {{ $store.state.storageMap[goodsList.id] }}
        </div>
        <div @touchend="add(goodsList.id, 1)">
          <img src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Animate from '../tools/Animate';

export default {
  props: ['goodsList', 'nofly'],
  methods: {
    add(id, num) {
      this.$store.commit('storageChenge', { id, num });
      if (this.nofly) {
        return;
      }
      if (num !== -1) {
        const { top, left } = this.$refs.img.getBoundingClientRect();
        const { offsetWidth: imgWidth, offsetHeight: imgHeight } = this.$refs.img;
        const shopCar = document.getElementById('shop-car');
        const { left: carX, top: carY } = shopCar.getBoundingClientRect();
        const { offsetWidth: carWidth, offsetHeight: carHeight } = shopCar;
        const endX = carX + carWidth / 2;
        const endY = carY + carHeight / 2;
        Animate({
          startX: left,
          startY: top,
          endX,
          endY,
          src: this.$refs.img.src,
          width: imgWidth,
          height: imgHeight,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.goods-card {
  height: 100px;
  display: flex;
  .img {
    width: 90px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .content {
    flex: 1;
    > div {
      width: 170px;
    }
    .title {
      margin-top: 5px;
      font-size: 13px;
      color: #1a1a1a;
    }
    .desc {
      margin-top: 3px;
      font-size: 13px;
      color: #aaa;
    }
    .tags {
      margin-top: 4px;
      display: flex;
      > div {
        font-size: 10px;
        margin-right: 2px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        margin-top: 5px;
        border-radius: 3px;
      }
    }
    .price {
      font-size: 14px;
      font-weight: 600;
      margin-top: 4px;
      color: #ff1a90;
    }
    .control {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      position: absolute;
      text-align: center;
      right: 15px;
      bottom: 10px;
      > div:not(num) {
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      .num {
        font-size: 14px;
        padding: 0 5px;
      }
    }
  }
}
.overflow-hide {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
