import { request } from '@/utils/index.js';

export function getHistoryOrder(data) {
  return request({
    url: '/api/users/user/MTDataBase/GetTradeHistoryByLoginTimePage',
    method: 'POST',
    data,
  });
}
