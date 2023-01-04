import { request } from '@/utils/index.js';

export function getUserInfoByToken() {
  return request({
    url: '/api/users/user/getGuestInfo',
    method: 'GET',
  });
}

// 用户开通钱包
export function createUserWallet() {
  return request({
    url: '/api/users/user/createWallet',
    method: 'GET',
  });
}
// 获取钱包信息

// 获取钱包余额
export function createDeposit() {
  return request({
    url: '/api/users/wallet/myAssets?vaultId=23',
    method: 'GET',
  });
}
