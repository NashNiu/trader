import axios from 'axios';
import { useWalletStore } from '@/store';
const service = axios.create({
  baseURL: '/walletapi/api/wallet',
  timeout: 15000, // 设置超时时间 ms
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = useWalletStore().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    //请求失败时的逻辑
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  }
);

export default service;
