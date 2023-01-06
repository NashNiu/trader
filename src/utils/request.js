import axios from 'axios';
// import router from '@/router/index.js';
import { ElMessage } from 'element-plus';
import { tools } from '@/utils/index.js';
const service = axios.create({
  baseURL: '/lpapi',
  // withCredentials:true,//跨域请求时发送Cookie
  timeout: 10000, // 设置超时时间
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
    if (error.response.status === 401) {
      ElMessage.error('Unauthorized');
      tools.clearAndLogout();
    } else {
      return error;
    }
  }
);

export default service;
