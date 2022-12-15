import request from '../utils/request';

/**
 * @param data请求接口传递的参数
 * @return {Promise}
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
