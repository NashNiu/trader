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

// 入金前查询报价
// {
//      "vaultId": "43",
//     "platName": "LP",
//     "assetId": "USDCNH"
// }
export function depositBefore(data) {
  return request({
    url: '/api/users/wallet/depositBeforeInfo',
    method: 'POST',
    data,
  });
}

// 确认入金
// {
//   "id": 33,
//     "amount": 0.03
// }
export function confirmDeposit(data) {
  return request({
    url: '/api/users/wallet/ackDeposit',
    method: 'POST',
    data,
  });
}

// 获取钱包名称
export function getSymbolName(assetId) {
  return request({
    url: '/api/users/wallet/getSymbolName',
    method: 'GET',
    params: {
      assetId,
    },
  });
}

// 获取钱包余额
export function getAssetBalance(vaultId, assetId) {
  return request({
    url: '/api/users/wallet/getBalance',
    method: 'POST',
    data: {
      assetId,
      vaultId,
    },
  });
}
// 刷新钱包余额
export function refreshAssetBalance(vaultId, assetId) {
  return request({
    url: '/api/users/wallet/refreshBalance',
    method: 'POST',
    data: {
      assetId,
      vaultId,
    },
  });
}
