const RSI = (tvobj) => {
  return {
    name: 'Customer Moving Average',
    metainfo: {
      _metainfoVersion: 27,
      isTVScript: !1,
      isTVScriptStub: !1,
      is_hidden_study: !1,
      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 1,
            plottype: 0,
            trackPrice: !1,
            transparency: 35,
            visible: !0,
            color: '#FF0000',
          },
          plot_1: {
            linestyle: 0,
            linewidth: 1,
            plottype: 0,
            trackPrice: !1,
            transparency: 35,
            visible: !0,
            color: '#00FF00',
          },
          plot_2: {
            linestyle: 0,
            linewidth: 1,
            plottype: 0,
            trackPrice: !1,
            transparency: 35,
            visible: !0,
            color: '#00FFFF',
          },
        },
        precision: 4,
        inputs: {
          in_0: 5,
          in_1: 10,
          in_2: 30,
        },
      },
      plots: [
        {
          id: 'plot_0',
          type: 'line',
        },
        {
          id: 'plot_1',
          type: 'line',
        },
        {
          id: 'plot_2',
          type: 'line',
        },
      ],
      styles: {
        // plot_0: {
        //     title: "Plot",
        //     histogramBase: 0,
        //     joinPoints: !1
        // }
      },
      description: 'Customer Moving Average',
      shortDescription: 'MA',
      is_price_study: !0,
      inputs: [
        {
          id: 'in_0',
          name: 'Length',
          defval: 9,
          type: 'integer',
          min: 1,
          max: 1e4,
        },
        {
          id: 'in_1',
          name: 'Length1',
          defval: 10,
          type: 'integer',
          min: 1,
          max: 1e4,
        },
        {
          id: 'in_2',
          name: 'Length2',
          defval: 30,
          type: 'integer',
          min: 1,
          max: 1e4,
        },
      ],
      id: 'Customer Moving Average@tv-basicstudies-1',
      scriptIdPart: '',
      name: 'Customer Moving Average',
    },
    constructor: function () {
      this.main = function (e, t) {
        var i, o, r, s, o1, o2;
        return (
          (this._context = e),
          (this._input = t),
          (i = tvobj.Std['close'](this._context)),
          (o = this._input(0)),
          (o1 = this._input(1)),
          (o2 = this._input(2)),
          (r = 0),
          (s = this._context.new_var(i)),
          [
            {
              value: tvobj.Std.sma(s, o, this._context),
              offset: r,
            },
            {
              value: tvobj.Std.sma(s, o1, this._context),
              offset: r,
            },
            {
              value: tvobj.Std.sma(s, o2, this._context),
              offset: r,
            },
          ]
        );
      };
    },
  };
};
export default RSI;
