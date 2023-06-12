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
export function depositBefore(data) {
  return request({
    url: '/api/users/wallet/depositBeforeInfo',
    method: 'POST',
    data,
  });
}

// 确认入金
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
// 获取记账钱包信息
export function getBackEndWalletInfo() {
  return request({
    url: '/api/users/backEndWallet/getBackEndWalletInfo',
    method: 'GET',
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
// 获取入金列表
export function getDepositList(page = 0) {
  return request({
    url: '/api/users/wallet/getMtDepositList',
    method: 'POST',
    data: {
      page,
      size: 10,
    },
  });
}
// 获取转入列表
export function getTransferInList(page = 0) {
  return request({
    url: '/api/users/backEndWalletDeposit/getWithdrawList',
    method: 'POST',
    data: {
      page,
      size: 10,
    },
  });
}
// 获取出金列表
export function getWithdrawList(page = 0) {
  return request({
    url: '/api/users/wallet/getMtWithdrawList',
    method: 'POST',
    data: {
      page,
      size: 10,
    },
  });
}
// 获取钱包转出列表
export function getWalletOutList(page = 0) {
  return request({
    url: '/api/users/backEndWalletWithdraw/getWithdrawList',
    method: 'POST',
    data: {
      page,
      size: 10,
    },
  });
}

// MT出金前查询报价
export function withdrawBefore(data) {
  return request({
    url: '/api/users/wallet/withdrawBeforeInfo',
    method: 'POST',
    data: data,
  });
}
// mt 确认出金
export function withdrawConfirm(data) {
  return request({
    url: '/api/users/wallet/ackWithdraw',
    method: 'POST',
    data,
  });
}

// 获取矿工费
export function getTransferFee(data) {
  return request({
    url: '/api/users/wallet/estimateFee',
    method: 'POST',
    data,
  });
}
// 钱包出金
export function walletWithdraw(data) {
  return request({
    url: '/api/users/backEndWalletWithdraw/createWithdraw',
    method: 'POST',
    data,
  });
}
// 取消MT出金
export function cancelMtWithdraw(params) {
  return request({
    url: '/api/users/wallet/cancelWithdraw',
    method: 'GET',
    params,
  });
}

// 取消钱包出金
export function cancelWalletWithdraw(params) {
  return request({
    url: '/api/users/backEndWalletWithdraw/cancelWithdraw',
    method: 'GET',
    params,
  });
}

// 获取证件信息
export function getCertificate() {
  return request({
    url: '/api/users/user/getDocument',
    method: 'get',
  });
}

// 修改证件
export function updateCertificate(data) {
  return request({
    url: '/api/users/user/updateDocument',
    method: 'post',
    data,
  });
}

// 修改密码
export function changePass(data) {
  return request({
    url: '/api/users/user/chpwd',
    method: 'post',
    data,
  });
}
// 设置支付密码
export function setPayPass(data) {
  return request({
    url: '/api/users/user/updatePayPassword',
    method: 'post',
    data,
  });
}
// 验证支付密码
export function verifyPayPass(data) {
  return request({
    url: '/api/users/user/checkPayPassword',
    method: 'post',
    data,
  });
}
