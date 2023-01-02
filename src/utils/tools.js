// 计算持仓浮动盈亏 和 价格变化
export function calcOrderChange({ order, liveData, cs }) {
  let profit = 0;
  let currentPrice = 0;
  if (!order || !liveData || !cs) {
    return {
      profit,
      currentPrice,
      change: '0%',
      color: '',
    };
  } else {
    let color, variety;
    if (order?.action === 0) {
      profit = (order?.vol / 10000) * (liveData.bid - order?.price) * cs;
      currentPrice = liveData?.bid;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'up' : variety < 0 ? 'down' : '';
    } else {
      profit = (order?.vol / 10000) * (order?.price - liveData.ask) * cs;
      currentPrice = liveData?.ask;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'down' : variety < 0 ? 'up' : '';
    }
    const change = `${(variety * 100).toFixed(4)}%`;
    return {
      profit: Number(profit.toFixed(2)),
      color,
      currentPrice,
      change,
    };
  }
}
