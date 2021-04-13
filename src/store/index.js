/*
 * @Author: your name
 * @Date: 2021-04-08 12:59:10
 * @LastEditTime: 2021-04-13 14:16:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/store/index.js
 */
import Vue from 'vue';
import Vuex from 'vuex';
import sideBarApi from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sideBarList: [],
    isLoading: true,
    goodsList: [],
    size: 7,
    type: null,
    storageMap: {},
  },
  mutations: {
    setSideBarList(state, data) {
      state.sideBarList = data;
    },
    changeLoading(state, bool) {
      state.isLoading = bool;
    },
    setGoodsList(state, data) {
      state.goodsList = [...state.goodsList, ...data];
    },
    resetGoodsList(state) {
      state.goodsList = [];
    },
    setType(state, type) {
      state.type = type;
    },
    setStorageMap(state, storageMap) {
      state.storageMap = storageMap;
    },
    storageChenge(state, {
      id,
      num,
    }) {
      if (state.storageMap[id]) {
        if ((num === -1 && state.storageMap[id] === 1) || num === -Infinity) {
          Vue.delete(state.storageMap, id);
        } else {
          Vue.set(state.storageMap, id, state.storageMap[id] + num);
        }
      } else {
        Vue.set(state.storageMap, id, 1);
      }
      localStorage.setItem('goods', JSON.stringify(state.storageMap));
    },
  },
  actions: {
    async setSideBarList({
      commit,
    }, type) {
      commit('changeLoading', true);
      const sideBarList = await sideBarApi.getsidebar(type);
      commit('setSideBarList', sideBarList);
      commit('changeLoading', false);
    },
    async getGoodsList({
      commit,
      state,
    }, {
      type,
      page,
      sort,
    }) {
      const typeSearch = type || state.type;
      if (type) {
        commit('setType', type);
      }
      const goodsList = await sideBarApi.getGoodsList(typeSearch, page, state.size, sort);
      commit('setGoodsList', goodsList.list);
      if (goodsList.total > state.goodsList.length) {
        return true;
      }
      return false;
    },
    resetGoodsList({
      commit,
    }) {
      commit('resetGoodsList');
    },
  },
  modules: {},
});
