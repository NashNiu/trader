import { request } from '@/utils/index.js';
import { configConst } from '@/config/index.js';

/**
 * @return {Promise}
 * @param data
 */
//可以传递请求需要的其他参数也可以放在配置项中如url,method,params,headers等
export function getInfo(data) {
  return request({
    url: '/api/auth/login',
    method: 'POST',
    data,
  });
}
export function setInfo(data) {
  return request({
    url: '/api/user/setInfo',
    method: 'POST',
    data,
  });
}
export function setLanguage(lan) {
  return request({
    url: '/api/users/user/updateLanguage?language=' + lan,
    method: 'get',
  });
}
// 获取验证码接口
export function getCodeInterface(data) {
  const localLan = localStorage.getItem(configConst.LANGUAGE) || 'en';
  return request({
    url: `/api/users/user/verifyCode?language=${localLan}&email=` + data,
    method: 'GET',
  });
}
// 注册接口
export function registerInterface(code, data) {
  return request({
    url: '/api/users/user/reg/3/' + code,
    method: 'POST',
    data,
  });
}
// google注册接口
export function registerGoogleInterface(data, hideError) {
  return request({
    url: '/api/users/user/reg/1/0',
    method: 'POST',
    data,
    headers: {
      hideError,
    },
  });
}
// 登录接口
export function loginInterface(data) {
  return request({
    url: '/api/auth/login?randomStr=*&code=*_*',
    method: 'POST',
    data,
  });
}
// 上传文件
export function uploadFile(data) {
  return request({
    url: '/api/users/user/uploadFile',
    method: 'post',
    data,
  });
}
