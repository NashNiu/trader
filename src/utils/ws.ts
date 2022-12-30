import ReconnectingWebSocket  from 'reconnecting-websocket'
export default class Main{
  private wsURL: { guest: string[]; real: string[]; demo: string[] };
  private socket: null|ReconnectingWebSocket;
  private dataCB: {[k: string]: (params: any)=> void};
  constructor() {
    this.wsURL = {
      guest:['/wsurl/api/bbtc/noauth/websocks/mt5sock'],   // 游客ws地址
      demo:['/wsurl/api/bbtc/demoauth/websocks/mt5sock'],    //  模拟ws地址
      real:["/wsurl/api/bbtc/auth/websocks/mt5sock"],    //  真实ws地址
    }
    this.socket = null
    this.dataCB = {}
  }

  // init socket 或者 切换socket
  initSocket(params: {status: number}, dataCB: { [k: string]: (params: any) => void; }){
    if(this.socket){
      this.socket.close()
    }
    this.dataCB = dataCB
    const protocol = location.protocol==='http:'?'ws:':'wss:'
    const baseUrl = protocol + location.host
    let socketUrls: string[] = []
    if (params.status === 1) {
      // 游客
      socketUrls = this.wsURL.guest.map(item=>baseUrl + item)
    }else if(params.status ===2){
      // 模拟
      socketUrls = this.wsURL.demo.map(item=>baseUrl + item)
    }else if(params.status === 3) {
      // 真实
      socketUrls = this.wsURL.real.map(item=>baseUrl + item)
    }
    let urlIndex = 0;
    const urlProvider = () => socketUrls[urlIndex++ % socketUrls.length];
    const options = {
      maxRetries: 8,
    }
    this.socket = new ReconnectingWebSocket(urlProvider, [], options)
    this.socket.addEventListener('message',(res)=>{
      this.socketOnMessage(res)
    })
  }
  // init chart
  initChart(){
    
  }
  // socket 接收数据
  socketOnMessage(res: MessageEvent){
    let data = JSON.parse(res.data)
    if(data.cmd===51001){
      this.handleLiveData(data)
    }
  }
  // 处理实时数据
  handleLiveData(data: any){
    const obj ={
      n: data.sbl,
      b: data.bid,
      a: data.ask,
      t: data.utime
    }
    if(this.dataCB.liveDataCB) {
      this.dataCB.liveDataCB(obj)
    }
  }
}