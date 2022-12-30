import WebSocket from './ws.js';
const mixins = {
  // 定义data数据
  data() {
    return {
      refreshDataWS: null,
    };
  },
  methods: {
    // 注册ws
    registerWS(wsUrl) {
      const vm = this;

      vm.refreshDataWS = WebSocket.initQDWS('ws://192.168.1.141:48080' + wsUrl);
      WebSocket.registerListner(vm.refreshDataWS, {
        open: vm.websocketonopen,
        error: vm.websocketonerror,
        message: vm.websocketonmessage,
        close: vm.websocketclose,
      });
      return vm.refreshDataWS;
    },
    websocketonopen() {
      //   console.info('连接成功');
    },
    // 连接建立失败重连
    websocketonerror() {
      //  console.info('连接失败');
    },
    // 数据接收后执行的操作
    websocketonmessage(e) {
      if (e) {
        if (
          this.selfWebsocketonmessage &&
          typeof this.selfWebsocketonmessage === 'function'
        )
          return this.selfWebsocketonmessage(e);
        try {
          const info = JSON.parse(e);
          /* console.info(`消息推送===`);
			   console.info(`${e}`); */
          //   eventBus.$emit('wsRefreshAssemblyData', info);//更改数据
        } catch (event) {
          /*  console.info(`消息推送========`);
			   console.info(`${event}`); */
        }
      }
    },
    // 发送消息
    websocketsend(Data) {
      // 数据发送
      // console.info(`数据发送========${Data}`);
      this.refreshDataWS.send(JSON.stringify(Data));
    },
    // 关闭连接
    websocketclose(e) {
      // 关闭
      //  console.log('断开连接', e);
    },
  },
};
export default mixins;
