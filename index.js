(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }

  var refs = {
    navPills: Array.from(document.querySelectorAll('.nav-pill[data-tab]')),
    tabIntro: document.getElementById('tab-intro'),
    tabStock: document.getElementById('tab-stock'),
    tabCoin: document.getElementById('tab-coin'),

    btnTrial: document.getElementById('btnTrial'),
    btnMoveStock: document.getElementById('btnMoveStock'),
    btnMoveCoin: document.getElementById('btnMoveCoin'),

    authStateBadge: document.getElementById('authStateBadge'),
    verifyStateBadge: document.getElementById('verifyStateBadge'),
    apiStateBadge: document.getElementById('apiStateBadge'),
    activeModeBadge: document.getElementById('activeModeBadge'),

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
    btnSaveStock: document.getElementById('btnSaveStock'),
    btnStartStock: document.getElementById('btnStartStock'),
    btnSaveCoin: document.getElementById('btnSaveCoin'),
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
    resultBox: document.getElementById('resultBox')
  };

  var state = {
    activeTab: 'intro',
    apiChecked: false,
    logs: []
  };

  function addLog(title, payload) {
    var line = '[' + new Date().toLocaleString('ko-KR') + '] ' + title + '\n' + (typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2));
    state.logs.unshift(line);
    state.logs = state.logs.slice(0, 18);
    refs.resultBox.textContent = state.logs.join('\n\n');
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    refs.navPills.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    refs.tabIntro.classList.toggle('active', tab === 'intro');
    refs.tabStock.classList.toggle('active', tab === 'stock');
    refs.tabCoin.classList.toggle('active', tab === 'coin');
    updateGuard();
  }

  function currentSession() {
    return core.loadSession();
  }

  function currentSettings() {
    return core.loadSettings();
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

  function updateStatus() {
    var session = currentSession();
    var settings = currentSettings();

    refs.authStateBadge.textContent = session.user ? (session.user.email || session.user.name || '로그인됨') : '미로그인';
    refs.verifyStateBadge.textContent = session.verified ? '인증완료' : '미인증';

    if (!settings.apiBase) {
      refs.apiStateBadge.textContent = 'Demo';
    } else {
      refs.apiStateBadge.textContent = state.apiChecked ? 'Live 연결확인' : 'Live 미확인';
    }

    if (state.activeTab === 'coin') {
      refs.activeModeBadge.textContent = settings.coinDryRun ? 'DRY RUN' : 'LIVE';
    } else {
      refs.activeModeBadge.textContent = settings.stockDryRun ? 'DRY RUN' : 'LIVE';
    }
  }

  function updateGuard() {
    var session = currentSession();
    var settings = currentSettings();
    var checks = [];

    if (!session.user) {
      checks.push('로그인 필요');
    }
    if (!session.verified) {
      checks.push('본인인증 필요');
    }
    if (settings.apiBase && !state.apiChecked) {
      checks.push('API 연결 확인 필요');
    }

    if (state.activeTab === 'stock') {
      if (!settings.accountNo) {
        checks.push('계좌번호 필요');
      }
      if (!settings.stockSymbol) {
        checks.push('주식 종목코드 필요');
      }
    }

    if (state.activeTab === 'coin') {
      if (!settings.coinSymbol) {
        checks.push('코인 심볼 필요');
      }
    }

    refs.guardText.textContent = checks.length
      ? ('실행 전 확인: ' + checks.join(' / '))
      : '실행 준비 완료. 자동매매를 시작할 수 있습니다.';

    refs.btnStartStock.disabled = !(checks.length === 0 && state.activeTab === 'stock');
    refs.btnStartCoin.disabled = !(checks.length === 0 && state.activeTab === 'coin');

    updateStatus();
  }

  async function refreshMe() {
    var session = currentSession();
    if (!session.token) {
      updateStatus();
      updateGuard();
      return;
    }
    try {
      var data = await core.callApi('me', 'GET');
      var user = data.user || null;
      if (user) {
        core.saveSession({ token: session.token, user: user, verified: Boolean(user.verified) });
      }
    } catch (_err) {
      core.clearSession();
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
      core.saveSession({ token: session.token, user: user, verified: Boolean(data.verified || (user && user.verified)) });
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

  async function startStockTrading() {
    var settings = collectFormSettings();
    var session = currentSession();

    if (!session.user || !session.verified) {
      addLog('주식 자동매매 시작 실패', '로그인 및 본인인증이 필요합니다.');
      return;
    }

    if (settings.apiBase && !state.apiChecked) {
      addLog('주식 자동매매 시작 실패', 'API 연결 확인이 필요합니다.');
      return;
    }

    if (!settings.accountNo || !settings.stockSymbol) {
      addLog('주식 자동매매 시작 실패', '계좌번호와 종목코드를 입력하세요.');
      return;
    }

    var payload = {
      market_type: 'stock',
      exchange: 'kiwoom',
      account_no: settings.accountNo,
      symbol: settings.stockSymbol,
      max_order_amount_krw: settings.stockBudget,
      auto_select_top_candidate: settings.stockAutoSelect,
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
      addLog('주식 자동매매 시작 요청 완료', data);
    } catch (err) {
      addLog('주식 자동매매 시작 실패', String(err.message || err));
    }
  }

  async function startCoinTrading() {
    var settings = collectFormSettings();
    var session = currentSession();

    if (!session.user || !session.verified) {
      addLog('코인 자동매매 시작 실패', '로그인 및 본인인증이 필요합니다.');
      return;
    }

    if (settings.apiBase && !state.apiChecked) {
      addLog('코인 자동매매 시작 실패', 'API 연결 확인이 필요합니다.');
      return;
    }

    if (!settings.coinSymbol) {
      addLog('코인 자동매매 시작 실패', '코인 심볼을 입력하세요.');
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
      dry_run: settings.coinDryRun,
      telegram_bot_token: settings.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: credential
    };

    try {
      var data = await core.callApi('start', 'POST', payload);
      addLog('코인 자동매매 시작 요청 완료', data);
    } catch (err) {
      addLog('코인 자동매매 시작 실패', String(err.message || err));
    }
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

  function bindEvents() {
    refs.navPills.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.dataset.tab);
      });
    });

    refs.btnTrial.addEventListener('click', function () {
      setActiveTab('stock');
      window.scrollTo({ top: document.body.scrollHeight * 0.25, behavior: 'smooth' });
    });

    refs.btnMoveStock.addEventListener('click', function () {
      setActiveTab('stock');
    });

    refs.btnMoveCoin.addEventListener('click', function () {
      setActiveTab('coin');
    });

    refs.stockForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var saved = collectFormSettings();
      addLog('주식 설정 저장 완료', {
        accountNo: saved.accountNo,
        symbol: saved.stockSymbol,
        budget: saved.stockBudget,
        dryRun: saved.stockDryRun
      });
      updateStatus();
      updateGuard();
    });

    refs.coinForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var saved = collectFormSettings();
      addLog('코인 설정 저장 완료', {
        exchange: saved.coinExchange,
        symbol: saved.coinSymbol,
        budget: saved.coinBudget,
        dryRun: saved.coinDryRun
      });
      updateStatus();
      updateGuard();
    });

    refs.btnCheckApi.addEventListener('click', runApiHealthCheck);
    refs.btnVerifyStart.addEventListener('click', runVerifyStart);
    refs.btnVerifyRefresh.addEventListener('click', refreshMe);

    refs.verifyCodeForm.addEventListener('submit', function (event) {
      event.preventDefault();
      runVerifyComplete(refs.verifyCode.value.trim());
    });

    refs.btnStartStock.addEventListener('click', startStockTrading);
    refs.btnStartCoin.addEventListener('click', startCoinTrading);

    refs.btnStop.addEventListener('click', stopTrading);
    refs.btnAnalyze.addEventListener('click', runAnalyze);
    refs.btnLoadReport.addEventListener('click', loadLatestReport);

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
      node.addEventListener('change', function () {
        collectFormSettings();
        updateStatus();
        updateGuard();
      });
    });

    refs.apiBase.addEventListener('input', function () {
      state.apiChecked = false;
      updateStatus();
      updateGuard();
    });
  }

  function init() {
    applySettingsToForm(currentSettings());
    bindEvents();
    setActiveTab('intro');
    addLog('대시보드 준비 완료', '시스템 소개 탭에서 운영 구조를 먼저 확인해 주세요.');
    refreshMe();
  }

  init();
})();
