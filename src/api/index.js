/*
 * @Author: your name
 * @Date: 2021-04-09 16:05:58
 * @LastEditTime: 2021-04-12 13:59:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/api/sideBar.js
 */
import axios from '@/axios';
import URLS from './URLS';

export default {
  getsidebar(type) {
    return axios.get(URLS.getsidebar, {
      params: {
        type,
      },
    });
  },
  getGoodsList(type, page, size, sort) {
    return axios.get(URLS.getGoodsList, {
      params: {
        type,
        page,
        size,
        sort,
      },
    });
  },
  likeSearch(value) {
    return axios.get(URLS.likeSearch, { params: { likeValue: value } });
  },
  search(type, page, size) {
    return axios.get(URLS.search, { params: { type, page, size } });
  },
  getGoodsByIds(value) {
    return axios.get(URLS.getGoodsByIds, { params: { value } });
  },
};
