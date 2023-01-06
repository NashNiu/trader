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
export function getWalletInfo(vaultId) {
  return request({
    url: '/api/users/wallet/myAssets',
    method: 'GET',
    params: {
      vaultId,
    },
  });
}
// 入金
export function createDeposit(data) {
  return request({
    url: '/api/users/wallet/createDeposit',
    method: 'POST',
    data,
  });
}
