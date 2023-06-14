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
/**
 * 修改下级返佣/客户升级--查看
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getAgentUpdateInfo(data) {
  return request2({
    url: '/agent/agentUpdateInfo',
    method: 'POST',
    data,
  });
}
/**
 * 修改下级返佣/客户升级--修改/升级
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function postAgentUpdate(data) {
  return request2({
    url: '/agent/agentUpdate',
    method: 'POST',
    data,
  });
}
/**
 * 名下用户数据统计--统计数据
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getDailiSubordinateUserData(data) {
  return request2({
    url: '/agent/getDailiSubordinateUserData',
    method: 'POST',
    data,
  });
}
/**
 * 名名下用户数据统计--统计数据--列表
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getSubordinateUserData(data) {
  return request2({
    url: '/agent/getSubordinateUserData',
    method: 'POST',
    data,
  });
}
/**
 * 名下用户数据统计--导出
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function exportSubordinateUserData(data) {
  return request2({
    url: '/agent/exportSubordinateUserData',
    method: 'POST',
    data,
  });
}
/**
 * 佣金转移提交
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function extractCommission(data) {
  return request2({
    url: '/commissionManage/extractCommission',
    method: 'POST',
    data,
  });
}
/**
 * 佣金转移提交
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function saveExtractCommission(data) {
  return request2({
    url: '/commissionManage/saveExtractCommission',
    method: 'POST',
    data,
  });
}
/**
 * 佣金管理--电子钱包
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getElectronicWallet(data) {
  return request2({
    url: '/commissionManage/electronicWallet',
    method: 'POST',
    data,
  });
}
/**
 * 佣金管理--返佣明细--导出
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function exportTradeInfoDetails(data) {
  return request2({
    url: '/settment/exportTradeInfoDetails',
    method: 'POST',
    data,
  });
}
/**
 * 佣金管理--返佣明细
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function tradeInfoDetails(data) {
  return request2({
    url: '/commissionManage/tradeInfoDetails',
    method: 'POST',
    data,
  });
}
/**
 * 佣金管理--返点标准
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getGroupsAndBackPoint(data) {
  return request2({
    url: '/agent/getGroupsAndBackPoint',
    method: 'POST',
    data,
  });
}
/**
 * 交易信息--返佣明细
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getTradeInfoDetails(data) {
  return request2({
    url: '/agent/tradeInfoDetails',
    method: 'POST',
    data,
  });
}
/**
 * 交易信息--返佣明细导出
 * @date 2023-06-09
 * @param {any} data
 * @returns {any}
 */
export function getExportTradeInfoDetails(data) {
  return request2({
    url: '/agent/exportTradeInfoDetails',
    method: 'POST',
    data,
  });
}
