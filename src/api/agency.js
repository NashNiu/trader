import { request2 } from '@/utils/index.js';

/**
 * 导出名下客户列表
 * @date 2023-06-07
 * @param {any} data
 * @returns {any}
 */
export function exportUserList(data) {
  return request2({
    url: '/agent/exportSubordinateUserList',
    method: 'POST',
    data,
  });
}
/**
 * 获取名下客户列表
 * @date 2023-06-07
 * @param {any} data
 * @returns {any}
 */
export function getUserList(data) {
  return request2({
    url: '/agent/getSubordinateUserList',
    method: 'POST',
    data,
  });
}
