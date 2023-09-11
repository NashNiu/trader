import { request, walletRequest } from '@/utils/index.js';

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
    url: '/api/users/newWallet/getBalance?currency=',
    method: 'GET',
  });
}
// 获取币种列表 1查可充币种，2查可提币种
export function getCoinList(type) {
  return walletRequest({
    url: `/currency/list?mchCode=LP&queryType=${type}`,
    method: 'GET',
  });
}
// 获取网络列表
export function getNetList(coin) {
  return walletRequest({
    url: `/currency/net/list?mchCode=LP&currency=${coin}`,
    method: 'GET',
  });
}
// 获取网络列表
export function getChainAdd(chain) {
  return walletRequest({
    url: `/user/dcaddr?chain=${chain}`,
    method: 'GET',
  });
}

// 提币
export function withdraw(data) {
  return walletRequest({
    url: `/withdraw/add`,
    method: 'POST',
    data,
  });
}

// 发送验证码
export function sendEmailCode() {
  return walletRequest({
    url: `/mailCode/get`,
    method: 'GET',
  });
}
