import { defineStore } from 'pinia';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { symbolArr } from '@/assets/data/symbol.js';

export default defineStore('socket', {
  state: () => ({
    socket: null,
    // 定时心跳
    timer: null,
    // 实时数据
    liveData: {},
    // 品种高开低收数据
    statisticData: {},
    // 用户资金
    userFunds: {},
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
      if (data.cmd === 51001) {
        this.handleLiveData(data);
      } else if (data.cmd === 9999) {
        this.sendHeartBeat();
        this.getStatisticData();
        this.getUserFunds();
      } else if (data.cmd === 10004) {
        this.handleStatisticData(data);
      } else if (data.cmd === 10006) {
        this.handleUserFunds(data);
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
    // 获取产品高开低收数据
    getStatisticData() {
      symbolArr.forEach((item) => {
        this.sendSocketMsg({ cmd: 10003, sbl: item.name });
      });
    },
    // 产品高开低收数据
    handleStatisticData(data) {
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
    handleUserFunds(data) {
      this.userFunds = data;
    },
    // 断开socket
    closeSocket() {
      this.socket = null;
    },
  },
});
