<!--
 * @Author: your name
 * @Date: 2021-04-10 23:15:35
 * @LastEditTime: 2021-04-10 23:37:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/tools/Animate/index.vue
-->
<template>
  <div
    class="item"
    v-if="exist"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      opacity,
      transform: `translate(${moveX}px, ${moveY}px) scale(${sx}, ${sy})`,
    }"
  >
    <img :src="src" />
  </div>
</template>

<style lang="less" scoped>
    .item{
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        transition: all 1s;
        transform-origin: 0% 0%;
        img {
            width: 100%;
            border-radius: 50%;
        }
    }
</style>
