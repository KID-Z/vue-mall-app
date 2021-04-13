/*
 * @Author: your name
 * @Date: 2021-04-10 23:15:39
 * @LastEditTime: 2021-04-10 23:36:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/tools/Animate/index.js
 */
import Vue from 'vue';
import com from './index.vue';

const Animate = Vue.extend(com);

export default function ({
  startX,
  startY,
  endX,
  endY,
  src,
  width,
  height,
}) {
  const app = new Animate({
    el: document.createElement('div'),
    data() {
      return {
        moveX: startX,
        moveY: startY,
        sx: 1,
        sy: 1,
        opacity: 1,
        exist: true,
        src,
        width,
        height,
      };
    },
  });
  document.body.appendChild(app.$el);
  setTimeout(() => {
    app.moveX = endX;
    app.moveY = endY;
    app.sx = 0.1;
    app.sy = 0.1;
    app.opacity = 0;
  }, 0);
  setTimeout(() => {
    app.exist = false;
  }, 1000);
}
