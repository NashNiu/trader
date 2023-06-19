import axios from 'axios';
// import router from '@/router/index.js';
import { ElMessage } from 'element-plus';
import { tools } from '@/utils/index.js';
import { configConst } from '@/config/index.js';
import i18n from '@/lib/i18n';
const service = axios.create({
  baseURL: '/lpapi',
  // withCredentials:true,//跨域请求时发送Cookie
  timeout: 15000, // 设置超时时间 ms
});
// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(configConst.TOKEN);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    //请求失败时的逻辑
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  (response) => {
    // ParamError(-2, "参数错误"),
    //     ServerError(-1, "服务器错误"),
    //     Success(0, "成功"),
    //     Updated(1, "已更新"),
    //     Existed(2, "已存在"),
    //     NotExist(3, "不存在"),
    //     CodeError(4, "验证码错误"),
    //     PasswordError(5, "密码错误"),
    //     NotLogin(6, "未登录"),
    //     InvalidToken(7, "无效Token"),
    //     AccountDisable(8, "账号已停用"),
    //     OrderNotExist(9, "订单不存在"),
    //     PriceLoss(10, "报价丢失"),
    //     TimeLoss(11, "行情丢失"),
    //     BalanceLow(12, "余额不足"),
    const statusErrorMsg = {
      '-2': '参数错误',
      '-1': '服务器错误',
      1: '已更新',
      2: '已存在',
      3: '不存在',
      4: '验证码错误',
      5: '密码错误',
      6: '未登录',
      7: '无效Token',
      8: '账号已停用',
      9: '订单不存在',
      10: '报价丢失',
      11: '行情丢失',
      12: '余额不足',
    };
    if (response.data.status) {
      ElMessage.error(statusErrorMsg[response.data.status] || '未知错误');
      // ElMessage.error(i18n.global.t('common.unauthorized'));
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      ElMessage.error(i18n.global.t('common.unauthorized'));
      tools.clearAndLogout();
    } else if (error?.response?.status === 500) {
      ElMessage.error('Server Error');
      return error;
    } else if (error?.code === 'ECONNABORTED') {
      ElMessage.error(error?.message || 'request timeout');
      return error;
    } else {
      console.log(error);
      console.log(error.response);
      return error;
    }
  }
);

export default service;
