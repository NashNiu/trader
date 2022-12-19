import ReconnectingWebSocket from 'reconnecting-websocket';
export default class SocketState {
  constructor({ dataCB }) {
    this.socket = null;
    this.dataCB = dataCB;
  }

  // init socket 或者 切换socket
  initSocket(dataCB) {
    if (this.socket) {
      this.socket.close();
    }
    this.dataCB = dataCB;
    let socketUrls = ['ws://192.168.137.113:9000/api/lp/auth/websocks/mt5sock'];
    let urlIndex = 0;
    const urlProvider = () => socketUrls[urlIndex++ % socketUrls.length];
    const options = {
      maxRetries: 1, //断开重连次数
    };
    this.socket = new ReconnectingWebSocket(urlProvider, [], options);
    this.socket.addEventListener('message', (res) => {
      this.socketOnMessage(res);
    });
    this.socket.addEventListener('open', () => {
      this.socket.send(
        JSON.stringify({
          cmd: 10000,
          login: 80000020,
          device: 1,
          password: 'QWER1234',
        })
      );
    });
  }

  // socket 接收数据
  socketOnMessage(res) {
    let data = JSON.parse(res.data);
    if (data.cmd === 51001) {
      this.handleLiveData(data);
    }
  }
  // 处理实时数据
  handleLiveData(data) {
    const obj = {
      n: data.sbl,
      b: data.bid,
      a: data.ask,
      t: data.utime,
    };
    console.log(this.dataCB);
    if (this.dataCB.liveDataCB) {
      this.dataCB.liveDataCB(obj);
    }
  }
}
