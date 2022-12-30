import request from '@/utils/request';

export function getHistoryOrder(data) {
  return request({
    url: '/api/users/user/MTDataBase/GetTradeHistoryByLoginTimePage',
    method: 'POST',
    data,
  });
}
