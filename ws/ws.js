import { observable, runInAction } from "mobx";
import ReconnectingWebSocket from 'reconnecting-websocket'
import { formatWS,  SymbolsArr } from './wsUtils';
// import { toast } from "../screen/utils";
import mitt from '../utils/mitt'
import { message, Button, Space } from 'antd';
import { getPwds, getToken, getUserInfo } from "../utils/storage";
import lan from './lang';
import { push } from "../utils/router";


class User {
   loginCmd = {"cmd":10000,"login":'',"password":"",device: 1};
   socket = null;
   modal = 'dark';
   socketState = 0; //ws状态，0未连接，1已连接
   quotes = {}; // 当前行情
   symbols = {}; // 品种信息 
    marketInfo = {}; // 高开收低数据
    user = {}; // 用户信息
    tradeList = [];//持仓信息
    pendingList = [];//挂单信息

    deepQuotes = {}; // 深度报价
    k = {p: []};//k线
    isRefresh = true;
    openTips = false;
    openData = {};
    pengdingTips = false;
    heyueTips = false;
    pengdingData = {};
    lpTips = false;
    timer = null;
    userType = 0;
    editOrderTips = false;
    websocketUrl = 'wsurl/api/bbtc/noauth/websocks/mt5sock';
  
  urls = [
    'wsurl/api/bbtc/noauth/websocks/mt5sock',
    "wsurl/api/bbtc/auth/websocks/mt5sock",
    'wsurl/api/bbtc/demoauth/websocks/mt5sock'
  ];//ws链接
  //登录
  getdomain () {
    const domain = document.domain;
    // console.log('xxxx',domain)
    return `wss://${domain}/`;
    // this.baseURL = `wss://${domain}/`
  }
  async connect() {
    const userInfo = getUserInfo()
    if(userInfo != null) {
      // this.websocketUrl = this.urls[1]
      if(this.userType == 0) {
        this.loginCmd.login = userInfo.realAccount;
        this.loginCmd.password = getPwds()
        this.websocketUrl = this.urls[1]
      }else{
        this.websocketUrl = this.urls[2]
        this.loginCmd.login = userInfo.demoAccount;
        this.loginCmd.password = getPwds()
      }
      // this.urls = ["wss://live-wsapp.cd-ex.com/api/bbtc/auth/websocks/mt5sock"]
    }else{
      this.websocketUrl = this.urls[0]
      // this.urls = ['wss://live-wsapp.cd-ex.com/api/bbtc/noauth/websocks/mt5sock']
    }
    this.socket = new ReconnectingWebSocket(this.getdomain() + this.websocketUrl, [], {
      minReconnectionDelay: 1,
      connectionTimeout: 5000, // 重连时间
      maxEnqueuedMessages: 0,  // 不缓存发送失败的指令
    });
    this.socket.addEventListener('open', () => {
      // console.log('xxxxx')
      const list = SymbolsArr[5] //获取品种信息
      if(userInfo != null) {
          this.send(this.loginCmd); // 默认先登录  
      }else{
        let getSymbol = {}
        let getSymbolVerb = {}
        list.map((item,i) => {
          getSymbol = {"cmd":10001,"sbl":item.name}
          getSymbolVerb = {"cmd":10003,"sbl":item.name}
          this.send(getSymbol) //获取品种信息
          this.send(getSymbolVerb) //获取高开低收
        })
      }
      this.socketState = 1;
      // return true
    });
    this.socket.addEventListener('message',(d) => {
      // console.log(d)
      let res = formatWS(d.data);
      // console.log(res)
      // this.option.message && this.option.message(res); // 保存相关信息
      this.message(res)
      mitt.emit('WS_MESSAGE', res);    // 派发订阅事件
    //   DeviceEventEmitter.emit('WS_MESSAGE',res)
      // return true;
    });
  }
  send(cmd = {}) {
    // 发送socket指令
    // console.log('发送',cmd)
    const readyState = (this.socket && this.socket.readyState) || 0;
    if (this.socket && readyState == 1) {
      // console.log(cmd)
      this.socket.send(JSON.stringify(cmd));
    }
  }
  close() {
    // 关闭socket指令
    if (this.socket) this.socket.close();
  }
  reconnect() {
    // 中断连接再重连
    // console.log(store.account+store.pwd)
    this.close();
    this.quotes = {}, // 当前行情
    this.symbols = {}, // 品种信息 
    this.tradeList = [], // 持仓信息
    this.user = {}, // 用户信息
    this.socketState = 0,
    this.pendingList=[]
    this.connect()
  }
  message(data) {
    // console.log(data)
    const lang = lan.getlang().trade
    const getuser = {"cmd": 10005} //发送获取用户信息
    const getPosition = {"cmd": 10011} //发送获取持仓
    const getPending = {"cmd": 10021} //获取挂单列表
    if(data.status != 0 && (data.cmd == 10032 || data.cmd == 10036 || data.cmd == 10038 || data.cmd == 10034)) {
      message.destroy()
      if(data.status == -12 || data.status == -13 || data.status == -14){
        // message.error('服务器繁忙，请稍后')
        message.error(lang['服务器繁忙，请稍后'])
      }else if(data.status == 12) {
        // message.error('请求频率太快')
        message.error(lang['请求频率太快'])
      }else if(data.status == 10013) {
        // message.error('无效请求')
        message.error(lang['无效请求'])
      }else if(data.status == 10015) {
        // message.error('无效的挂单价格')
        message.error(lang['无效的挂单价格'])
      }else if(data.status == 10020) {
        // message.error('服务器繁忙(1)，请重试，如有疑问，请联系客服')
        message.error(lang['服务器繁忙，请重试，如有疑问，请联系客服'])
      }else if(data.status == 10021) {
        // message.error('服务器繁忙(2)，请重试，如有疑问，请联系客服'
        message.error(lang['服务器繁忙(2)，请重试，如有疑问，请联系客服'])
      }else if(data.status == 10033) {
        // message.error('止损止盈设置错误')
        message.error(lang['止损止盈设置错误'])
      }else if(data.status == 10019) {
        message.error(lang['余额不足'])
      }else{
        message.error(data.msg || data.message)
      }
    }
    switch (data.cmd) {
      case 9999:
        //登录成功
        // console.log('登录成功',data.cmd)
        // const res = {"cmd": 10011}
        if(this.timer != null) {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.send({"cmd": 8888})
          }, 30000);
        }else{
          this.timer = setInterval(() => {
            this.send({"cmd": 8888})
          }, 30000);
        }
        const list = SymbolsArr[5] //获取品种信息
        this.send(getuser)
        this.send(getPosition)
          let getSymbol = {}
          let getSymbolVerb = {}
          list.map((item,i) => {
              getSymbol = {"cmd":10001,"sbl":item.name}
              getSymbolVerb = {"cmd":10003,"sbl":item.name}
              this.send(getSymbol) //获取品种信息
              this.send(getSymbolVerb) //获取高开低收
          })
        // const res = {"cmd": 10033,'ticket': }
        // this.send(res)
        break;
      case 10002:
          //获取品种信息
          // console.log(SymbolsArr[5])
          this.symbols[data.sbl] = data
          // console.log('品种信息',data)
          break;
      case 10004:
            //获取商品统计信息
            // console.log('获取商品统计信息',data)
            this.marketInfo[data.sbl] = data
            break;
      case 10006:
        //获取用户信息
        // console.log('获取用户信息',data)
        this.user = data
        break;
      case 51001:
        // 报价数据
        this.quotes[data.sbl] = data
        break;
      case 10012:
        // 更新持仓信息
        // console.log('更新持仓信息',data)
        this.tradeList = data.data
        break;
      case 10022:
          // 更新挂单信息
          // console.log('更新挂单信息',data)
          this.pendingList = data.data
          // this.tradeList = data.data
          break;
      case 10030:
          // this.send(getuser)
          this.send(getPosition)
          this.send(getPending)
        // console.log('通知',data)
        break;
      
      case 10032:
          // 交易是否成功
        // console.log('交易是否成功',data)
        if(data.status == 0) {
          this.openTips = true;
          this.openData = data;
          // const getuser = {"cmd": 10005} //发送获取用户信息
          // this.send(getuser)
          if(data.closed) {
            //平仓
            this.openData = data;
            // const getPosition = {"cmd": 10011} //发送获取持仓
            setTimeout(() => {
              this.send(getPosition)
            }, 1000);
          }else{
            if(data.type == 0 || data.type == 1) {
              // const getPosition = {"cmd": 10011} //发送获取持仓
              setTimeout(() => {
                this.send(getPosition)
              }, 1000);
            }else{
              // const getPending = {"cmd": 10021}//发送获取挂单指令
              setTimeout(() => {
                this.send(getPending)
              }, 1000);
            }
          }
        }
        // console.log('交易是否成功',data)
        break;
      case 10034:
        // console.log('挂单删除成功',data)
        if(data.status == 0) {
          message.success(lang['撤销成功'])
          setTimeout(() => {
            // const res = {"cmd": 10021}
            this.send(getPending)
          }, 1000);
        }
        break;
      case 10036:
          //
        // console.log('修改挂单',data)
        if(data.status == 0) {
          message.success(lang['修改成功'])
          setTimeout(() => {
            this.editOrderTips = false
            this.send(getPending)
          }, 1000);
        }
        break;
      case 10038:
          //
        // console.log('修改止盈止损',data)
        if(data.status == 0) {
          message.success(lang['修改成功'])
          setTimeout(() => {
            this.lpTips = false
            // const getPosition = {"cmd": 10011}
            this.send(getPosition)
          }, 1000);
          
        }
        break;
      // case 51002:

      //     // console.log('深度报价',data)
      //     // const list = SymbolsArr[5] //获取品种信息
      //     list.map((item,i) => {
      //       if(item.name == data.sbl) {
      //         this.deepQuotes[item.name] = data.items
      //       }
      //     })
      //     break;
      case 403:
        // 服务器断开，调重连
        // this.close()
        // window.sessionStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 500);
        // message.error(lang['连接已断开，如需重连，请刷新页面（请勿同时打开多个交易窗口）'])
        // clearInterval(ii)
        // this.reconnect()
        // window.location.reload()
        break;
      case 404:
        // message.error('连接已断开，如需重连，请刷新页面（请勿同时打开多个交易窗口）')
        message.error(lang['连接已断开，如需重连，请刷新页面（请勿同时打开多个交易窗口）'])
        // clearInterval(ii)
        this.close()
        break;
      case 406:
        //密码错误
        this.close()
        message.error(lang['密码已修改，请重新登录'])
        // clearInterval(this.timer)
        window.sessionStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 1000);
        break;
    }
  }
}

const user = new User();

export default user;
