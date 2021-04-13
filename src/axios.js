/*
 * @Author: your name
 * @Date: 2021-04-09 15:58:33
 * @LastEditTime: 2021-04-09 16:16:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /每日优鲜/vue-mall-app/src/axios.js
 */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'azhu_1617346912205',
  },
});

// 响应拦截器
instance.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data;
  }
  return Promise.reject(response.data.msg);
}, (error) => Promise.reject(error));

export default instance;
