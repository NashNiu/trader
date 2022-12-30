import axios from 'axios';
const service = axios.create({
  baseURL: '/apis',
  // withCredentials:true,//跨域请求时发送Cookie
  timeout: 10000, // 设置超时时间
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
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
    //response中包含响应的所有数据包括响应头，状态等
    // const res = response.data;
    // // 前后端约定的接口回来的数据格式，接口成功或接口失败，做一些逻辑处理再返回结果
    // if (res.code !== 0) {
    //   //最终都要返回结果
    //   // return Promise.reject(new Error(res.msg || 'Error'));
    //   return Promise.reject(new Error(res.msg || 'Error'));
    // } else {
    //   //最终都要返回结果
    //   return res;
    // }
  },
  (error) => {
    return error.response;
    // console.log('err' + error); // for debug
    // return Promise.reject(error);
  }
);

export default service;
