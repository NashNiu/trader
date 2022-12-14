import request from '../utils/request';

/**
 * @param data请求接口传递的参数
 * @return {Promise}
 */
//可以传递请求需要的其他参数也可以放在配置项中如url,method,params,headers等
export function getInfo(params) {
  return request({
    url: '/api/users/user/reg/1',
    method: 'POST',
    params, //params 会把传递参数直接问号拼接到接口后面
  });
}
export function setInfo(data) {
  return request({
    url: '/api/user/setInfo',
    method: 'POST',
    data,
  });
}
