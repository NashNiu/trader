import DataFeedBase from './datafeed';
import kdj from './kdj';
import rsi from './customerRSI';
import ma from './ma';
const widgetOptions = (params) => {
  return {
    theme: 'Light',
    symbol: params.symbol,
    datafeed: new DataFeedBase(),
    interval: '1', // 默认周期  1/5/15/30/60/240-> 1/5/15/30/60/240分钟  D->一天   W->一周   M->一月
    locale: 'en',
    container_id: 'tv_chart_container',
    library_path: './charting_library/',
    custom_css_url: './customCommon.css',
    disabled_features: [
      'header_screenshot', //截图
      // 'header_fullscreen_button', //全屏
      'header_compare', // 品种对比
      'header_saveload', //保存
      // "header_symbol_search", // 查找
      'study_templates', // 指标模板
      'header_undo_redo', //撤销
      'timeframes_toolbar', //下方的时间栏
      'header_settings', // 设置
      // 'volume_force_overlay',
      // 'header_resolutions', // 时间
      // 'header_chart_type',  // 图表类型
      'header_indicators', // 指标
      // 'left_toolbar', //左侧工具栏
      // IsPC()?'':'use_localstorage_for_settings',
      // 'use_localstorage_for_settings',
      'legend_context_menu',
      'context_menus',
      'symbol_info',
      'main_series_scale_menu',
      'show_chart_property_page',
    ],
    enabled_features: ['favorites', 'display_legend_on_all_charts'],
    favorites: {
      intervals: ['1', '5', '15', '30', '60'],
      // chartTypes: ["Area", "Line"]
    },
    fullscreen: true,
    autosize: true,
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    allow_symbol_change: true,
    timezone: 'Asia/Shanghai',
    // timezone: 'Etc/UTC',
    overrides: {
      'paneProperties.background': `#fff`,
    },
    studies_overrides: {
      'bollinger bands.plots background.color': '#ff0000',
      'bollinger bands.plots background.transparency': 93,
      'bollinger bands.plots background.visible': false,
      'bollinger bands.median.color': '#00ff00',
      'bollinger bands.lower.color': '#00ffff',
      'bollinger bands.upper.color': '#ff0000',
      'MACD.Signal.color': '#00ff00',
      'MACD.MACD.color': '#00ffff',
      'MACD.Histogram.color': '#ff0000',
      'rsi.hlines background.visible': false,
    },
    custom_indicators_getter: function (PineJS) {
      return Promise.resolve([kdj(PineJS), rsi(PineJS), ma(PineJS)]);
    },
  };
};

export default widgetOptions;
