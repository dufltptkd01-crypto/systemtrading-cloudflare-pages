(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }

  var refs = {
    navPills: Array.from(document.querySelectorAll('.nav-pill[data-tab]')),
    tabs: {
      home: document.getElementById('tab-home'),
      intro: document.getElementById('tab-intro'),
      stock: document.getElementById('tab-stock'),
      coin: document.getElementById('tab-coin'),
      billing: document.getElementById('tab-billing')
    },

    btnTrial: document.getElementById('btnTrial'),
    btnGotoBilling: document.getElementById('btnGotoBilling'),
    btnGotoStock: document.getElementById('btnGotoStock'),
    btnGotoCoin: document.getElementById('btnGotoCoin'),
    btnGotoIntro: document.getElementById('btnGotoIntro'),
    btnMoveStock: document.getElementById('btnMoveStock'),
    btnMoveCoin: document.getElementById('btnMoveCoin'),
    btnMoveBilling: document.getElementById('btnMoveBilling'),

    authStateBadge: document.getElementById('authStateBadge'),
    verifyStateBadge: document.getElementById('verifyStateBadge'),
    apiStateBadge: document.getElementById('apiStateBadge'),
    activeModeBadge: document.getElementById('activeModeBadge'),
    subscriptionStateBadge: document.getElementById('subscriptionStateBadge'),

    apiBase: document.getElementById('apiBase'),
    apiToken: document.getElementById('apiToken'),
    accountNo: document.getElementById('accountNo'),
    stockSymbol: document.getElementById('stockSymbol'),
    stockBudget: document.getElementById('stockBudget'),
    stockAutoSelect: document.getElementById('stockAutoSelect'),
    stockDryRun: document.getElementById('stockDryRun'),
    kiwoomApiKey: document.getElementById('kiwoomApiKey'),
    kiwoomApiSecret: document.getElementById('kiwoomApiSecret'),
    telegramToken: document.getElementById('telegramToken'),
    telegramChatId: document.getElementById('telegramChatId'),

    coinExchange: document.getElementById('coinExchange'),
    coinSymbol: document.getElementById('coinSymbol'),
    coinBudget: document.getElementById('coinBudget'),
    coinAutoSelect: document.getElementById('coinAutoSelect'),
    coinDryRun: document.getElementById('coinDryRun'),
    binanceApiKey: document.getElementById('binanceApiKey'),
    binanceApiSecret: document.getElementById('binanceApiSecret'),
    upbitApiKey: document.getElementById('upbitApiKey'),
    upbitApiSecret: document.getElementById('upbitApiSecret'),

    stockForm: document.getElementById('stockForm'),
    coinForm: document.getElementById('coinForm'),
    btnStartStock: document.getElementById('btnStartStock'),
    btnStartCoin: document.getElementById('btnStartCoin'),

    btnCheckApi: document.getElementById('btnCheckApi'),
    btnVerifyStart: document.getElementById('btnVerifyStart'),
    btnVerifyRefresh: document.getElementById('btnVerifyRefresh'),
    verifyCodeForm: document.getElementById('verifyCodeForm'),
    verifyCode: document.getElementById('verifyCode'),
    verifyHint: document.getElementById('verifyHint'),

    btnStop: document.getElementById('btnStop'),
    btnAnalyze: document.getElementById('btnAnalyze'),
    btnLoadReport: document.getElementById('btnLoadReport'),
    guardText: document.getElementById('guardText'),

    billingStateText: document.getElementById('billingStateText'),
    trialEndText: document.getElementById('trialEndText'),
    subscriptionEndText: document.getElementById('subscriptionEndText'),
    billingRemainText: document.getElementById('billingRemainText'),
    btnCheckout: document.getElementById('btnCheckout'),
    btnConfirmPayment: document.getElementById('btnConfirmPayment'),
    btnRefreshBilling: document.getElementById('btnRefreshBilling'),
    btnExportUsers: document.getElementById('btnExportUsers'),
    userExportBox: document.getElementById('userExportBox'),

    resultBox: document.getElementById('resultBox')
  };

  var state = {
    activeTab: 'home',
    apiChecked: false,
    checkoutId: '',
    logs: []
  };

  function addLog(title, payload) {
    var body = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    var line = '[' + new Date().toLocaleString('ko-KR') + '] ' + title + '\n' + body;
    state.logs.unshift(line);
    state.logs = state.logs.slice(0, 20);
    if (refs.resultBox) {
      refs.resultBox.textContent = state.logs.join('\n\n');
    }
  }

  function setText(node, text) {
    if (node) {
      node.textContent = text;
    }
  }

  function formatDateText(isoText) {
    if (!isoText) {
      return '-';
    }
    var parsed = new Date(isoText);
    if (!Number.isFinite(parsed.getTime())) {
      return '-';
    }
    return parsed.toLocaleString('ko-KR');
  }

  function modeLabel(isDryRun) {
    return isDryRun ? '모의투자' : '실거래';
  }

  function currentSession() {
    return core.loadSession();
  }

  function currentSettings() {
    return core.loadSettings();
  }

  function saveSession(next) {
    var prev = currentSession();
    return core.saveSession({
      token: next && next.token !== undefined ? next.token : prev.token,
      user: next && next.user !== undefined ? next.user : prev.user,
      verified: next && next.verified !== undefined ? next.verified : prev.verified,
      billing: next && next.billing !== undefined ? next.billing : prev.billing
    });
  }

  function applySettingsToForm(settings) {
    refs.apiBase.value = settings.apiBase;
    refs.apiToken.value = settings.apiToken;
    refs.accountNo.value = settings.accountNo;
    refs.stockSymbol.value = settings.stockSymbol;
    refs.stockBudget.value = String(settings.stockBudget);
    refs.stockAutoSelect.value = String(Boolean(settings.stockAutoSelect));
    refs.stockDryRun.value = String(Boolean(settings.stockDryRun));
    refs.kiwoomApiKey.value = settings.kiwoomApiKey;
    refs.kiwoomApiSecret.value = settings.kiwoomApiSecret;
    refs.telegramToken.value = settings.telegramToken;
    refs.telegramChatId.value = settings.telegramChatId;

    refs.coinExchange.value = settings.coinExchange;
    refs.coinSymbol.value = settings.coinSymbol;
    refs.coinBudget.value = String(settings.coinBudget);
    refs.coinAutoSelect.value = String(Boolean(settings.coinAutoSelect));
    refs.coinDryRun.value = String(Boolean(settings.coinDryRun));
    refs.binanceApiKey.value = settings.binanceApiKey;
    refs.binanceApiSecret.value = settings.binanceApiSecret;
    refs.upbitApiKey.value = settings.upbitApiKey;
    refs.upbitApiSecret.value = settings.upbitApiSecret;
  }

  function collectFormSettings() {
    return core.saveSettings({
      apiBase: refs.apiBase.value.trim(),
      apiToken: refs.apiToken.value.trim(),
      accountNo: refs.accountNo.value,

      stockSymbol: refs.stockSymbol.value.trim(),
      stockBudget: refs.stockBudget.value,
      stockAutoSelect: refs.stockAutoSelect.value === 'true',
      stockDryRun: refs.stockDryRun.value === 'true',
      kiwoomApiKey: refs.kiwoomApiKey.value.trim(),
      kiwoomApiSecret: refs.kiwoomApiSecret.value.trim(),

      coinExchange: refs.coinExchange.value,
      coinSymbol: refs.coinSymbol.value.trim(),
      coinBudget: refs.coinBudget.value,
      coinAutoSelect: refs.coinAutoSelect.value === 'true',
      coinDryRun: refs.coinDryRun.value === 'true',
      binanceApiKey: refs.binanceApiKey.value.trim(),
      binanceApiSecret: refs.binanceApiSecret.value.trim(),
      upbitApiKey: refs.upbitApiKey.value.trim(),
      upbitApiSecret: refs.upbitApiSecret.value.trim(),

      telegramToken: refs.telegramToken.value.trim(),
      telegramChatId: refs.telegramChatId.value.trim()
    });
  }

  function renderBilling(session, billing) {
    if (!session.user) {
      setText(refs.billingStateText, '로그인 필요');
      setText(refs.trialEndText, '-');
      setText(refs.subscriptionEndText, '-');
      setText(refs.billingRemainText, '-');
      setText(refs.subscriptionStateBadge, '로그인 필요');
      return;
    }

    if (!billing) {
      setText(refs.billingStateText, '확인 필요');
      setText(refs.trialEndText, '-');
      setText(refs.subscriptionEndText, '-');
      setText(refs.billingRemainText, '-');
      setText(refs.subscriptionStateBadge, '확인 필요');
      return;
    }

    setText(refs.billingStateText, billing.state || '확인 필요');
    setText(refs.trialEndText, formatDateText(billing.trial_end_at));
    setText(refs.subscriptionEndText, formatDateText(billing.subscription_end_at));
    setText(
      refs.billingRemainText,
      Number.isFinite(Number(billing.remaining_days)) ? String(billing.remaining_days) + '일' : '-'
    );

    if (billing.can_trade) {
      setText(refs.subscriptionStateBadge, billing.state || '자동매매 가능');
    } else {
      setText(refs.subscriptionStateBadge, '자동매매 불가');
    }
  }

  function updateStatus() {
    var session = currentSession();
    var settings = currentSettings();
    var billing = session.billing || null;

    setText(refs.authStateBadge, session.user ? (session.user.email || session.user.name || '로그인됨') : '미로그인');
    setText(refs.verifyStateBadge, session.verified ? '인증완료' : '미인증');

    if (!settings.apiBase) {
      setText(refs.apiStateBadge, 'Demo');
    } else {
      setText(refs.apiStateBadge, state.apiChecked ? 'Live 연결확인' : 'Live 미확인');
    }

    if (state.activeTab === 'coin') {
      setText(refs.activeModeBadge, modeLabel(settings.coinDryRun));
    } else {
      setText(refs.activeModeBadge, modeLabel(settings.stockDryRun));
    }

    renderBilling(session, billing);
  }

  function tabKeys() {
    return ['home', 'intro', 'stock', 'coin', 'billing'];
  }

  function setActiveTab(tab) {
    var key = tabKeys().indexOf(tab) >= 0 ? tab : 'home';
    state.activeTab = key;

    refs.navPills.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === key);
    });

    tabKeys().forEach(function (name) {
      var panel = refs.tabs[name];
      if (panel) {
        panel.classList.toggle('active', name === key);
      }
    });

    updateStatus();
    updateGuard();
  }

  function buildChecks(targetMarket) {
    var checks = [];
    var session = currentSession();
    var settings = currentSettings();
    var billing = session.billing || null;

    if (!session.user) {
      checks.push('로그인 필요');
    }
    if (!session.verified) {
      checks.push('본인인증 필요');
    }
    if (session.user && (!billing || !billing.can_trade)) {
      checks.push('이용권 필요');
    }
    if (settings.apiBase && !state.apiChecked) {
      checks.push('API 연결 확인 필요');
    }

    if (targetMarket === 'stock') {
      if (!settings.accountNo) {
        checks.push('계좌번호 필요');
      }
      if (!settings.stockAutoSelect && !settings.stockSymbol) {
        checks.push('주식 종목코드 필요');
      }
    }

    if (targetMarket === 'coin') {
      if (!settings.coinAutoSelect && !settings.coinSymbol) {
        checks.push('코인 심볼 필요');
      }
    }

    return checks;
  }

  function updateGuard() {
    var stockChecks = buildChecks('stock');
    var coinChecks = buildChecks('coin');
    var visibleChecks = state.activeTab === 'coin' ? coinChecks : stockChecks;

    if (refs.guardText) {
      refs.guardText.textContent = visibleChecks.length
        ? ('실행 전 확인: ' + visibleChecks.join(' / '))
        : '실행 준비 완료. 자동매매를 시작할 수 있습니다.';
    }

    if (refs.btnStartStock) {
      refs.btnStartStock.disabled = stockChecks.length > 0;
    }
    if (refs.btnStartCoin) {
      refs.btnStartCoin.disabled = coinChecks.length > 0;
    }

    updateStatus();
  }

  async function refreshMe(silent) {
    var session = currentSession();
    if (!session.token) {
      updateStatus();
      updateGuard();
      return;
    }
    try {
      var data = await core.callApi('me', 'GET');
      var user = data.user || null;
      saveSession({
        token: session.token,
        user: user,
        verified: Boolean(user && user.verified),
        billing: data.billing || session.billing || null
      });
    } catch (err) {
      core.clearSession();
      state.apiChecked = false;
      if (!silent) {
        addLog('세션 갱신 실패', String(err.message || err));
      }
    }
    updateStatus();
    updateGuard();
  }

  async function refreshBillingStatus(silent) {
    var session = currentSession();
    if (!session.token) {
      updateStatus();
      updateGuard();
      return;
    }
    try {
      var data = await core.callApi('billingStatus', 'GET');
      var billing = data.billing || null;
      saveSession({ billing: billing });
      if (!silent) {
        addLog('이용권 상태 조회 완료', billing || data);
      }
    } catch (err) {
      if (!silent) {
        addLog('이용권 상태 조회 실패', String(err.message || err));
      }
    }
    updateStatus();
    updateGuard();
  }

  async function runVerifyStart() {
    var session = currentSession();
    if (!session.token) {
      addLog('본인인증 시작 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('verifyStart', 'POST', {});
      refs.verifyHint.textContent = (data.message || '인증 코드가 발송되었습니다.') + (data.debug_code ? (' 데모코드: ' + data.debug_code) : '');
      addLog('본인인증 시작', data);
    } catch (err) {
      addLog('본인인증 시작 실패', String(err.message || err));
    }
  }

  async function runVerifyComplete(code) {
    var session = currentSession();
    if (!session.token) {
      addLog('인증 코드 제출 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('verifyComplete', 'POST', { code: code });
      var user = data.user || session.user;
      saveSession({
        token: session.token,
        user: user,
        verified: Boolean(data.verified || (user && user.verified)),
        billing: data.billing || session.billing || null
      });
      addLog('본인인증 완료', data);
      updateStatus();
      updateGuard();
    } catch (err) {
      addLog('인증 코드 제출 실패', String(err.message || err));
    }
  }

  async function runApiHealthCheck() {
    var settings = collectFormSettings();
    try {
      var data = await core.callApi('health', 'GET', null, { withAuth: false, apiBase: settings.apiBase });
      state.apiChecked = true;
      addLog('API 연결 성공', data);
    } catch (err) {
      state.apiChecked = false;
      addLog('API 연결 실패', String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  function checksToText(checks) {
    return checks.join(' / ');
  }

  async function startStockTrading() {
    var settings = collectFormSettings();
    var checks = buildChecks('stock');
    if (checks.length > 0) {
      addLog('주식 자동매매 시작 실패', checksToText(checks));
      return;
    }

    var payload = {
      market_type: 'stock',
      exchange: 'kiwoom',
      account_no: settings.accountNo,
      symbol: settings.stockSymbol,
      max_order_amount_krw: settings.stockBudget,
      auto_select_top_candidate: settings.stockAutoSelect,
      candidate_pool_size: 10,
      selection_policy: settings.stockAutoSelect ? 'top10_pick1' : 'manual_single',
      dry_run: settings.stockDryRun,
      telegram_bot_token: settings.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: {
        kiwoom: {
          api_key: settings.kiwoomApiKey,
          api_secret: settings.kiwoomApiSecret
        }
      }
    };

    try {
      var data = await core.callApi('start', 'POST', payload);
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      addLog('주식 자동매매 시작 요청 완료', data);
    } catch (err) {
      addLog('주식 자동매매 시작 실패', String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function startCoinTrading() {
    var settings = collectFormSettings();
    var checks = buildChecks('coin');
    if (checks.length > 0) {
      addLog('코인 자동매매 시작 실패', checksToText(checks));
      return;
    }

    var credential;
    if (settings.coinExchange === 'upbit') {
      credential = {
        upbit: {
          access_key: settings.upbitApiKey,
          secret_key: settings.upbitApiSecret
        }
      };
    } else {
      credential = {
        binance: {
          api_key: settings.binanceApiKey,
          api_secret: settings.binanceApiSecret
        }
      };
    }

    var payload = {
      market_type: 'crypto',
      exchange: settings.coinExchange,
      account_no: settings.accountNo,
      symbol: settings.coinSymbol,
      max_order_amount_krw: settings.coinBudget,
      auto_select_top_candidate: settings.coinAutoSelect,
      candidate_pool_size: 10,
      selection_policy: settings.coinAutoSelect ? 'top10_pick1' : 'manual_single',
      dry_run: settings.coinDryRun,
      telegram_bot_token: settings.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: credential
    };

    try {
      var data = await core.callApi('start', 'POST', payload);
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      addLog('코인 자동매매 시작 요청 완료', data);
    } catch (err) {
      addLog('코인 자동매매 시작 실패', String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function stopTrading() {
    var session = currentSession();
    if (!session.token) {
      addLog('자동매매 중지 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('stop', 'POST', {});
      addLog('자동매매 중지 요청 완료', data);
    } catch (err) {
      addLog('자동매매 중지 실패', String(err.message || err));
    }
  }

  async function runAnalyze() {
    var session = currentSession();
    if (!session.token) {
      addLog('매매일지 분석 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('analyze', 'POST', { trigger: 'manual' });
      addLog('매매일지 분석 완료', data);
    } catch (err) {
      addLog('매매일지 분석 실패', String(err.message || err));
    }
  }

  async function loadLatestReport() {
    var session = currentSession();
    if (!session.token) {
      addLog('리포트 조회 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('reportLatest', 'GET');
      addLog('최근 분석 리포트', data);
    } catch (err) {
      addLog('리포트 조회 실패', String(err.message || err));
    }
  }

  async function startCheckout() {
    var session = currentSession();
    if (!session.token) {
      addLog('결제 시작 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('billingCheckout', 'POST', { plan: 'monthly' });
      state.checkoutId = (data.checkout && data.checkout.checkout_id) || '';
      addLog('구독 결제 시작', data);
    } catch (err) {
      addLog('결제 시작 실패', String(err.message || err));
    }
  }

  async function confirmPayment() {
    var session = currentSession();
    if (!session.token) {
      addLog('결제 완료 처리 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('billingConfirm', 'POST', { checkout_id: state.checkoutId || undefined });
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      addLog('결제 완료 처리', data);
    } catch (err) {
      addLog('결제 완료 처리 실패', String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function exportUsers() {
    var session = currentSession();
    if (!session.token) {
      addLog('회원정보 조회 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      var data = await core.callApi('adminUsers', 'GET');
      if (refs.userExportBox) {
        refs.userExportBox.textContent = JSON.stringify(data.users || [], null, 2);
      }
      addLog('데모 회원정보 조회', { count: (data.users || []).length });
    } catch (err) {
      addLog('회원정보 조회 실패', String(err.message || err));
    }
  }

  function goToTab(tab) {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function bindButton(node, handler) {
    if (node) {
      node.addEventListener('click', handler);
    }
  }

  function bindEvents() {
    refs.navPills.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.dataset.tab);
      });
    });

    bindButton(refs.btnTrial, function () {
      var session = currentSession();
      if (!session.user) {
        window.location.href = './signup.html';
        return;
      }
      goToTab('stock');
      addLog('무료체험 안내', '7일 무료체험 기간에는 자동매매를 바로 실행할 수 있습니다.');
    });
    bindButton(refs.btnGotoBilling, function () { goToTab('billing'); });
    bindButton(refs.btnGotoStock, function () { goToTab('stock'); });
    bindButton(refs.btnGotoCoin, function () { goToTab('coin'); });
    bindButton(refs.btnGotoIntro, function () { goToTab('intro'); });
    bindButton(refs.btnMoveStock, function () { goToTab('stock'); });
    bindButton(refs.btnMoveCoin, function () { goToTab('coin'); });
    bindButton(refs.btnMoveBilling, function () { goToTab('billing'); });

    if (refs.stockForm) {
      refs.stockForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var saved = collectFormSettings();
        addLog('주식 설정 저장 완료', {
          accountNo: saved.accountNo,
          symbol: saved.stockSymbol,
          budget: saved.stockBudget,
          mode: modeLabel(saved.stockDryRun),
          autoSelect: saved.stockAutoSelect
        });
        updateStatus();
        updateGuard();
      });
    }

    if (refs.coinForm) {
      refs.coinForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var saved = collectFormSettings();
        addLog('코인 설정 저장 완료', {
          exchange: saved.coinExchange,
          symbol: saved.coinSymbol,
          budget: saved.coinBudget,
          mode: modeLabel(saved.coinDryRun),
          autoSelect: saved.coinAutoSelect
        });
        updateStatus();
        updateGuard();
      });
    }

    bindButton(refs.btnCheckApi, runApiHealthCheck);
    bindButton(refs.btnVerifyStart, runVerifyStart);
    bindButton(refs.btnVerifyRefresh, function () { refreshMe(false); });

    if (refs.verifyCodeForm) {
      refs.verifyCodeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        runVerifyComplete((refs.verifyCode.value || '').trim());
      });
    }

    bindButton(refs.btnStartStock, startStockTrading);
    bindButton(refs.btnStartCoin, startCoinTrading);
    bindButton(refs.btnStop, stopTrading);
    bindButton(refs.btnAnalyze, runAnalyze);
    bindButton(refs.btnLoadReport, loadLatestReport);
    bindButton(refs.btnCheckout, startCheckout);
    bindButton(refs.btnConfirmPayment, confirmPayment);
    bindButton(refs.btnRefreshBilling, function () { refreshBillingStatus(false); });
    bindButton(refs.btnExportUsers, exportUsers);

    [
      refs.apiBase,
      refs.apiToken,
      refs.accountNo,
      refs.stockSymbol,
      refs.stockBudget,
      refs.stockAutoSelect,
      refs.stockDryRun,
      refs.kiwoomApiKey,
      refs.kiwoomApiSecret,
      refs.telegramToken,
      refs.telegramChatId,
      refs.coinExchange,
      refs.coinSymbol,
      refs.coinBudget,
      refs.coinAutoSelect,
      refs.coinDryRun,
      refs.binanceApiKey,
      refs.binanceApiSecret,
      refs.upbitApiKey,
      refs.upbitApiSecret
    ].forEach(function (node) {
      if (!node) {
        return;
      }
      node.addEventListener('change', function () {
        collectFormSettings();
        updateStatus();
        updateGuard();
      });
    });

    if (refs.apiBase) {
      refs.apiBase.addEventListener('input', function () {
        state.apiChecked = false;
        collectFormSettings();
        updateStatus();
        updateGuard();
      });
    }
  }

  function initApiBase() {
    var settings = currentSettings();
    var cfg = window.APP_CONFIG || {};
    if (!settings.apiBase && cfg.defaultApiBase) {
      settings.apiBase = String(cfg.defaultApiBase);
      core.saveSettings(settings);
    }
  }

  function init() {
    initApiBase();
    applySettingsToForm(currentSettings());
    bindEvents();
    setActiveTab('home');
    addLog('대시보드 준비 완료', '홈에서 7일 무료체험을 시작하고, 투자 설정 후 자동매매를 실행하세요.');
    refreshMe(true).then(function () {
      return refreshBillingStatus(true);
    });
  }

  init();
})();
