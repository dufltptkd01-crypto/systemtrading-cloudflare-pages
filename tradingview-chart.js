(function () {
  'use strict';

  var SCRIPT_SRC = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
  var counter = 0;

  function nextId() {
    counter += 1;
    return 'tv_advanced_chart_' + Date.now() + '_' + counter;
  }

  function clone(obj) {
    var out = {};
    Object.keys(obj || {}).forEach(function (key) {
      out[key] = obj[key];
    });
    return out;
  }

  function TradingViewChart(mountNode, props) {
    this.mountNode = mountNode || null;
    this.props = {};
    this._signature = '';
    this._container = null;
    this._script = null;
    this._widgetHost = null;
    if (this.mountNode) {
      this.setProps(props || {});
    }
  }

  TradingViewChart.prototype._normalizedProps = function () {
    var p = clone(this.props);
    var symbol = String(p.symbol || '').trim();
    if (!symbol) {
      symbol = 'BINANCE:BTCUSDT';
    }
    return {
      symbol: symbol,
      interval: String(p.interval || '30'),
      timezone: String(p.timezone || 'Asia/Seoul'),
      theme: String(p.theme || 'dark'),
      locale: String(p.locale || 'kr'),
      autosize: true,
      style: '1',
      withdateranges: true,
      allow_symbol_change: true,
      hide_side_toolbar: false,
      save_image: false,
      details: true,
      hotlist: false,
      calendar: false,
      hide_volume: false,
      hide_legend: false,
      backgroundColor: '#0f1625',
      gridColor: 'rgba(42, 58, 83, 0.35)',
      studies: []
    };
  };

  TradingViewChart.prototype._cleanupDom = function () {
    if (!this.mountNode) {
      return;
    }
    if (this._script && this._script.parentNode) {
      this._script.parentNode.removeChild(this._script);
    }
    this._script = null;
    this._widgetHost = null;
    this._container = null;
    while (this.mountNode.firstChild) {
      this.mountNode.removeChild(this.mountNode.firstChild);
    }
  };

  TradingViewChart.prototype._render = function () {
    if (!this.mountNode) {
      return;
    }

    var p = this._normalizedProps();
    var signature = JSON.stringify(p);
    if (signature === this._signature) {
      return;
    }
    this._signature = signature;

    this._cleanupDom();

    var wrapper = document.createElement('div');
    wrapper.className = 'tradingview-widget-container';

    var host = document.createElement('div');
    host.id = nextId();
    host.className = 'tv-widget-host';
    wrapper.appendChild(host);

    var policy = document.createElement('div');
    policy.className = 'tradingview-widget-copyright';
    var link = document.createElement('a');
    link.href = 'https://www.tradingview.com/';
    link.target = '_blank';
    link.rel = 'noopener nofollow';
    link.textContent = 'Charts by TradingView';
    policy.appendChild(link);
    wrapper.appendChild(policy);

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = SCRIPT_SRC;
    script.text = JSON.stringify({
      autosize: p.autosize,
      symbol: p.symbol,
      interval: p.interval,
      timezone: p.timezone,
      theme: p.theme,
      style: p.style,
      locale: p.locale,
      withdateranges: p.withdateranges,
      allow_symbol_change: p.allow_symbol_change,
      hide_side_toolbar: p.hide_side_toolbar,
      save_image: p.save_image,
      details: p.details,
      hotlist: p.hotlist,
      calendar: p.calendar,
      hide_volume: p.hide_volume,
      hide_legend: p.hide_legend,
      backgroundColor: p.backgroundColor,
      gridColor: p.gridColor,
      studies: p.studies,
      container_id: host.id
    });
    wrapper.appendChild(script);

    this.mountNode.appendChild(wrapper);

    this._container = wrapper;
    this._script = script;
    this._widgetHost = host;
  };

  TradingViewChart.prototype.setProps = function (nextProps) {
    this.props = Object.assign({}, this.props, nextProps || {});
    this._render();
  };

  TradingViewChart.prototype.destroy = function () {
    this._cleanupDom();
    this._signature = '';
    this.props = {};
    this.mountNode = null;
  };

  window.TradingViewChart = TradingViewChart;
})();

