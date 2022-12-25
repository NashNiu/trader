import { defineStore } from 'pinia';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { symbolArr } from '@/assets/data/symbol.js';
import { ElMessage } from 'element-plus';
export default defineStore('socket', {
  state: () => ({
    socket: null,
    // 定时心跳
    timer: null,
    // 实时数据
    liveData: {},
    // 深度报价
    deepQuotation: {},
    // 品种高开低收数据
    statisticData: {},
    sblBasicData: {},
    // 用户资金
    userFunds: {},
    // 持仓列表信息
    holdingOrders: [],
    // 挂单列表信息
    hangingOrders: [],
    // 当前下单成功后，订单信息
    currentOrderDetail: {},
  }),
  actions: {
    // 连接socket
    initSocket({ account, password }) {
      if (this.socket) {
        this.socket.close();
      }
      const socketUrls = [
        'ws://192.168.137.113:9000/api/lp/auth/websocks/mt5sock',
      ];
      let urlIndex = 0;
      const urlProvider = () => socketUrls[urlIndex++ % socketUrls.length];
      const options = {
        maxRetries: 1, //断开重连次数
      };
      this.socket = new ReconnectingWebSocket(urlProvider, [], options);
      this.socket.addEventListener('open', () => {
        this.sendSocketMsg({
          cmd: 10000,
          login: account,
          device: 1,
          password: password,
        });
      });
      this.socket.addEventListener('message', (res) => {
        this.handleMessage(res);
      });
      this.socket.addEventListener('close', (e) => {
        if (e.wasClean) {
          this.socket.close();
          this.closeSocket();
        }
      });
    },
    // 发送socket消息
    sendSocketMsg(data) {
      if (this.socket) {
        this.socket.send(JSON.stringify(data));
      }
    },
    // 处理socket消息
    handleMessage(res) {
      const data = JSON.parse(res.data);
      if (data.cmd === 51001 || data.cmd === 10008) {
        this.handleLiveData(data);
      } else if (data.cmd === 51002) {
        this.handleDeepQuotation(data);
      } else if (data.cmd === 9999) {
        this.sendHeartBeat();
        this.getStatisticData();
        this.getUserFunds();
        this.getSblBasicData();
        this.getSblLatestPrice();
        // 这两条看情况获取
        this.getHangingOrders();
        this.getHoldingOrders();
      } else if (data.cmd === 10002) {
        // 产品基本信息
        this.setSblBasicData(data);
      } else if (data.cmd === 10004) {
        // 高开低收数据
        this.setStatisticData(data);
      } else if (data.cmd === 10006) {
        // 用户资金
        this.setUserFunds(data);
      } else if (data.cmd === 10012) {
        // 持仓列表
        this.setHoldingOrders(data?.data ?? []);
      } else if (data.cmd === 10022) {
        // 挂单列表
        this.setHangingOrders(data?.data ?? []);
      } else if (data.cmd === 10032) {
        // 当前下单成功，订单信息
        this.setCurrentOrderDetail(data);
      } else if (data.cmd === 10034) {
        // 删除挂单结果
        this.handleDelHangingOrder(data);
      }
    },
    // 心跳
    sendHeartBeat() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          this.sendSocketMsg({ cmd: 8888 });
        }, 50000);
      } else {
        this.timer = setInterval(() => {
          this.sendSocketMsg({ cmd: 8888 });
        }, 50000);
      }
    },
    // 获取产品最近报价
    getSblLatestPrice() {
      symbolArr.forEach((item) => {
        this.sendSocketMsg({ cmd: 10007, sbl: item.name });
      });
    },
    // 处理实时数据
    handleLiveData(data) {
      this.liveData = {
        ...this.liveData,
        [data.sbl]: {
          ask: data.ask,
          bid: data.bid,
          digit: data.digit,
          utime: data.utime,
        },
      };
    },
    // 处理深度报价
    handleDeepQuotation(data) {
      this.deepQuotation = {
        ...this.deepQuotation,
        [data.sbl]: data.items,
      };
    },
    //获取产品配置信息
    getSblBasicData() {
      symbolArr.forEach((item) => {
        this.sendSocketMsg({ cmd: 10001, sbl: item.name });
      });
    },
    setSblBasicData(data) {
      this.sblBasicData = {
        ...this.sblBasicData,
        [data.sbl]: data,
      };
    },
    // 获取产品高开低收数据
    getStatisticData() {
      symbolArr.forEach((item) => {
        this.sendSocketMsg({ cmd: 10003, sbl: item.name });
      });
    },
    // 产品高开低收数据
    setStatisticData(data) {
      this.statisticData = {
        ...this.statisticData,
        [data.symbol || data.sbl]: data,
      };
    },
    // 获取用户资金
    getUserFunds() {
      this.sendSocketMsg({ cmd: 10005 });
    },
    // 设置用户资金
    setUserFunds(data) {
      this.userFunds = data;
    },
    // 查询持仓
    getHoldingOrders() {
      this.sendSocketMsg({ cmd: 10011 });
    },
    // 设置持仓数据
    setHoldingOrders(data) {
      this.holdingOrders = data;
    },
    // 查询挂单
    getHangingOrders() {
      this.sendSocketMsg({ cmd: 10021 });
    },
    // 设置挂单数据
    setHangingOrders(data) {
      this.hangingOrders = data;
    },
    // 市价买入卖出 type: 0 买入， 1 卖出  sl: 止损价， tp: 止盈价
    marketCreate({ sbl, vol, price, type, sl, tp }) {
      this.sendSocketMsg({
        cmd: 10031,
        sbl: sbl,
        act: 200,
        type,
        vol,
        price,
        sl,
        tp,
      });
    },
    // 平仓
    marketClose({ id, vol }) {
      const order = this.holdingOrders.find((item) => item.position === id);
      console.log(this.holdingOrders);
      console.log(order);
      if (order) {
        this.sendSocketMsg({
          cmd: 10031,
          act: 200,
          sbl: order.symbol,
          vol: vol,
          position: id,
          type: order.action === 1 ? 0 : 1,
        });
      }
    },
    // 挂单 type: 2 买入， 3卖出  sl: 止损价， tp: 止盈价
    positionCreate({ sbl, vol, price, type, sl, tp }) {
      this.sendSocketMsg({
        cmd: 10031,
        sbl: sbl,
        act: 201,
        type,
        vol,
        price,
        sl,
        tp,
      });
    },
    // 设置下单成功后订单信息
    setCurrentOrderDetail(data) {
      this.currentOrderDetail = data;
      console.log(data);
      if (data.closed) {
        // 平仓成功
        ElMessage.success({
          message: '平仓成功',
        });
      } else {
        // 建仓成功
      }
    },
    // 删除挂单
    deleteHangingOrder(id) {
      this.sendSocketMsg({ cmd: 10033, ticket: id });
    },
    // 挂单删除成功
    handleDelHangingOrder(data) {
      if (data.status === 0) {
        ElMessage.success({
          message: '挂单删除成功',
        });
      } else {
        ElMessage.error({
          message: '挂单删除失败',
        });
      }
    },
    // 断开socket
    closeSocket() {
      this.socket = null;
    },
  },
});
