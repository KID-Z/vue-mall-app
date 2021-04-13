/*
 * @Author: your name
 * @Date: 2021-04-08 12:59:10
 * @LastEditTime: 2021-04-12 00:09:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/router/index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classify from '../views/Classify.vue';
import Shopping from '../views/Shopping.vue';
import Search from '../views/Search.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack() {
  this.back = true;
  this.go(-1);
  this.back = false;
};

Vue.use(VueRouter);

const routes = [{
  path: '/home',
  name: 'Home',
  redirect: {
    name: 'Classify',
  },
  component: Home,
  children: [{
    path: 'classify',
    name: 'Classify',
    component: Classify,
  },
  {
    path: 'shopping',
    name: 'Shopping',
    component: Shopping,
  },
  ],
}, {
  path: '/search',
  name: 'Search',
  component: Search,
}, {
  path: '*',
  redirect: {
    name: 'Classify',
  },
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
