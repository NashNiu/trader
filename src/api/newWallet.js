import { request } from '@/utils/index.js';

// 创建钱包
export function createWallet() {
  return request({
    url: '/api/users/newWallet/createNewWallet',
    method: 'GET',
  });
}
// 获取钱包token
export function getToken() {
  return request({
    url: '/api/users/newWallet/getToken',
    method: 'GET',
  });
}
// 获取钱包余额
export function getBalance() {
  return request({
    url: '//api/users/newWallet/getBalance',
    method: 'GET',
  });
}
