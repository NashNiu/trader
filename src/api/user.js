import { request } from '@/utils/index.js';

export function getUserInfoByToken(data) {
  return request({
    url: '/api/users/user/MTDataBase/GetTradeHistoryByLoginTimePage',
    method: 'POST',
    data,
  });
}

export function getUserAssets() {
  return request({
    url: '/api/users/user/MTDataBase/GetTradeHistoryByLoginTimePage',
    method: 'POST',
  });
}

export function createDeposit() {
  return request({
    url: '/api/users/user/MTDataBase/GetTradeHistoryByLoginTimePage',
    method: 'POST',
  });
}
