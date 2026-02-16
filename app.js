(function () {
  'use strict';

  const STORAGE_SETTINGS = 'systemtrading.premier.settings.v3';
  const STORAGE_SESSION = 'systemtrading.premier.session.v3';
  const STORAGE_MOCK_DB = 'systemtrading.premier.mockdb.v1';
  const MAX_LOG_ENTRIES = 24;

  const refs = {
    btnHeaderLogin: document.getElementById('btnHeaderLogin'),
    btnTrial: document.getElementById('btnTrial'),
    btnExplore: document.getElementById('btnExplore'),
    btnMenu: document.getElementById('btnMenu'),
    mobileNav: document.getElementById('mobileNav'),
    mobileLinks: document.querySelectorAll('.mobile-link'),

    tabRegister: document.getElementById('tabRegister'),
    tabLogin: document.getElementById('tabLogin'),
    registerForm: document.getElementById('registerForm'),
    loginForm: document.getElementById('loginForm'),
    btnLogout: document.getElementById('btnLogout'),
    authBadge: document.getElementById('authBadge'),
    authMessage: document.getElementById('authMessage'),

    regName: document.getElementById('regName'),
    regPhone: document.getElementById('regPhone'),
    regEmail: document.getElementById('regEmail'),
    regPassword: document.getElementById('regPassword'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),

    kycBadge: document.getElementById('kycBadge'),
    btnVerifyStart: document.getElementById('btnVerifyStart'),
    btnVerifyRefresh: document.getElementById('btnVerifyRefresh'),
    verifyCodeForm: document.getElementById('verifyCodeForm'),
    verifyCode: document.getElementById('verifyCode'),
    verifyHint: document.getElementById('verifyHint'),

    apiBase: document.getElementById('apiBase'),
    apiToken: document.getElementById('apiToken'),
    btnCheckApi: document.getElementById('btnCheckApi'),
    apiStatus: document.getElementById('apiStatus'),

    settingsForm: document.getElementById('settingsForm'),
    marketType: document.getElementById('marketType'),
    exchange: document.getElementById('exchange'),
    accountNo: document.getElementById('accountNo'),
    symbol: document.getElementById('symbol'),
    orderBudget: document.getElementById('orderBudget'),
    autoSelect: document.getElementById('autoSelect'),
    dryRun: document.getElementById('dryRun'),
    telegramToken: document.getElementById('telegramToken'),
    telegramChatId: document.getElementById('telegramChatId'),
    kiwoomApiKey: document.getElementById('kiwoomApiKey'),
    kiwoomApiSecret: document.getElementById('kiwoomApiSecret'),
    binanceApiKey: document.getElementById('binanceApiKey'),
    binanceApiSecret: document.getElementById('binanceApiSecret'),
    upbitApiKey: document.getElementById('upbitApiKey'),
    upbitApiSecret: document.getElementById('upbitApiSecret'),
    kiwoomFields: document.getElementById('kiwoomFields'),
    binanceFields: document.getElementById('binanceFields'),
    upbitFields: document.getElementById('upbitFields'),
    marketBadge: document.getElementById('marketBadge'),

    btnStart: document.getElementById('btnStart'),
    btnStop: document.getElementById('btnStop'),
    btnAnalyze: document.getElementById('btnAnalyze'),
    btnLoadReport: document.getElementById('btnLoadReport'),
    resultBox: document.getElementById('resultBox'),
    startGuardText: document.getElementById('startGuardText'),

    btnMobileStart: document.getElementById('btnMobileStart'),
    btnMobileStop: document.getElementById('btnMobileStop'),
    btnMobileTop: document.getElementById('btnMobileTop'),

    stepAuth: document.getElementById('stepAuth'),
    stepKyc: document.getElementById('stepKyc'),
    stepApi: document.getElementById('stepApi'),
    stepTrade: document.getElementById('stepTrade'),
    progressText: document.getElementById('progressText'),

    sumUser: document.getElementById('sumUser'),
    sumVerify: document.getElementById('sumVerify'),
    sumApi: document.getElementById('sumApi'),
    sumMarket: document.getElementById('sumMarket'),
    sumSymbol: document.getElementById('sumSymbol'),
    sumBudget: document.getElementById('sumBudget'),
    sumMode: document.getElementById('sumMode')
  };

  const cfg = window.APP_CONFIG || {};
  const endpoints = Object.assign(
    {
      health: '/health',
      register: '/api/auth/register',
      login: '/api/auth/login',
      me: '/api/auth/me',
      verifyStart: '/api/auth/verify/start',
      verifyComplete: '/api/auth/verify/complete',
      start: '/api/trading/start',
      stop: '/api/trading/stop',
      analyze: '/api/trading/analyze',
      reportLatest: '/api/trading/report/latest'
    },
    cfg.endpoints || {}
  );

  const state = {
    authMode: 'register',
    session: {
      token: '',
      user: null,
      verified: false
    },
    apiChecked: false,
    logs: []
  };

  let persistTimer = null;

  function nowText() {
    return new Date().toLocaleString('ko-KR');
  }

  function toJsonText(payload) {
    if (typeof payload === 'string') {
      return payload;
    }
    try {
      return JSON.stringify(payload, null, 2);
    } catch (_err) {
      return String(payload);
    }
  }

  function pushLog(title, payload) {
    const entry = `[${nowText()}] ${title}\n${toJsonText(payload)}`;
    state.logs.unshift(entry);
    state.logs = state.logs.slice(0, MAX_LOG_ENTRIES);
    refs.resultBox.textContent = state.logs.join('\n\n');
  }

  function clampBudget(raw) {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return 2000000;
    }
    return Math.min(Math.max(Math.round(parsed), 10000), 2000000);
  }

  function normalizeAccount(value) {
    return String(value || '').replace(/[^\d-]/g, '').replace(/-{2,}/g, '-').slice(0, 20);
  }

  function formatPhone(value) {
    const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
    if (digits.length < 4) {
      return digits;
    }
    if (digits.length < 8) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    if (digits.length < 11) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  function defaultSettings() {
    return {
      apiBase: cfg.defaultApiBase || '',
      apiToken: '',
      marketType: 'stock',
      exchange: 'kiwoom',
      accountNo: '8120-0764',
      symbol: '005930',
      orderBudget: 2000000,
      autoSelect: true,
      dryRun: true,
      telegramToken: '',
      telegramChatId: '',
      kiwoomApiKey: '',
      kiwoomApiSecret: '',
      binanceApiKey: '',
      binanceApiSecret: '',
      upbitApiKey: '',
      upbitApiSecret: ''
    };
  }

  function loadSettings() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_SETTINGS) || '{}');
      return Object.assign(defaultSettings(), parsed);
    } catch (_err) {
      return defaultSettings();
    }
  }

  function collectSettings() {
    const marketType = refs.marketType.value === 'crypto' ? 'crypto' : 'stock';
    let exchange = refs.exchange.value;

    if (marketType === 'stock') {
      exchange = 'kiwoom';
    }
    if (marketType === 'crypto' && exchange === 'kiwoom') {
      exchange = 'binance';
    }

    const settings = {
      apiBase: refs.apiBase.value.trim(),
      apiToken: refs.apiToken.value.trim(),
      marketType: marketType,
      exchange: exchange,
      accountNo: normalizeAccount(refs.accountNo.value),
      symbol: refs.symbol.value.trim(),
      orderBudget: clampBudget(refs.orderBudget.value),
      autoSelect: refs.autoSelect.value === 'true',
      dryRun: refs.dryRun.value === 'true',
      telegramToken: refs.telegramToken.value.trim(),
      telegramChatId: refs.telegramChatId.value.trim(),
      kiwoomApiKey: refs.kiwoomApiKey.value.trim(),
      kiwoomApiSecret: refs.kiwoomApiSecret.value.trim(),
      binanceApiKey: refs.binanceApiKey.value.trim(),
      binanceApiSecret: refs.binanceApiSecret.value.trim(),
      upbitApiKey: refs.upbitApiKey.value.trim(),
      upbitApiSecret: refs.upbitApiSecret.value.trim()
    };

    refs.orderBudget.value = String(settings.orderBudget);
    refs.accountNo.value = settings.accountNo;
    refs.exchange.value = settings.exchange;
    return settings;
  }
  function applySettings(settings) {
    const s = Object.assign(defaultSettings(), settings || {});
    refs.apiBase.value = s.apiBase;
    refs.apiToken.value = s.apiToken;
    refs.marketType.value = s.marketType;
    refs.exchange.value = s.exchange;
    refs.accountNo.value = normalizeAccount(s.accountNo);
    refs.symbol.value = s.symbol;
    refs.orderBudget.value = String(clampBudget(s.orderBudget));
    refs.autoSelect.value = String(Boolean(s.autoSelect));
    refs.dryRun.value = String(Boolean(s.dryRun));
    refs.telegramToken.value = s.telegramToken;
    refs.telegramChatId.value = s.telegramChatId;
    refs.kiwoomApiKey.value = s.kiwoomApiKey;
    refs.kiwoomApiSecret.value = s.kiwoomApiSecret;
    refs.binanceApiKey.value = s.binanceApiKey;
    refs.binanceApiSecret.value = s.binanceApiSecret;
    refs.upbitApiKey.value = s.upbitApiKey;
    refs.upbitApiSecret.value = s.upbitApiSecret;
  }

  function persistSettings() {
    const settings = collectSettings();
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    return settings;
  }

  function schedulePersistAndRender() {
    clearTimeout(persistTimer);
    persistTimer = setTimeout(function () {
      persistSettings();
      renderMarketFields();
      refreshSummaryAndGuard();
    }, 180);
  }

  function loadSession() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_SESSION) || '{}');
      return {
        token: String(parsed.token || ''),
        user: parsed.user || null,
        verified: Boolean(parsed.verified)
      };
    } catch (_err) {
      return { token: '', user: null, verified: false };
    }
  }

  function saveSession() {
    localStorage.setItem(STORAGE_SESSION, JSON.stringify(state.session));
  }

  function clearSession() {
    state.session = { token: '', user: null, verified: false };
    saveSession();
    renderAuthState();
    refreshSummaryAndGuard();
  }

  function maskPhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (digits.length < 8) {
      return digits;
    }
    return `${digits.slice(0, 3)}****${digits.slice(-4)}`;
  }

  function renderKycBadge() {
    if (state.session.verified) {
      refs.kycBadge.textContent = '인증완료';
      refs.kycBadge.classList.remove('warning');
      refs.verifyHint.textContent = '본인인증이 완료되었습니다.';
      return;
    }

    refs.kycBadge.textContent = '미인증';
    refs.kycBadge.classList.add('warning');
  }

  function renderAuthState() {
    if (state.session.user) {
      const display = state.session.user.email || state.session.user.name || '사용자';
      refs.authBadge.textContent = display;
      refs.authMessage.textContent = `로그인됨 | 본인인증: ${state.session.verified ? '완료' : '미완료'}`;
    } else {
      refs.authBadge.textContent = '미로그인';
      refs.authMessage.textContent = '아직 로그인되지 않았습니다.';
    }
    renderKycBadge();
  }

  function setAuthMode(mode) {
    state.authMode = mode === 'login' ? 'login' : 'register';
    const registerActive = state.authMode === 'register';
    refs.tabRegister.classList.toggle('active', registerActive);
    refs.tabLogin.classList.toggle('active', !registerActive);
    refs.registerForm.classList.toggle('hidden', !registerActive);
    refs.loginForm.classList.toggle('hidden', registerActive);
  }

  function renderMarketFields() {
    const settings = collectSettings();

    refs.kiwoomFields.classList.toggle('hidden', settings.exchange !== 'kiwoom');
    refs.binanceFields.classList.toggle('hidden', settings.exchange !== 'binance');
    refs.upbitFields.classList.toggle('hidden', settings.exchange !== 'upbit');

    const marketName = settings.marketType === 'stock' ? 'Stock' : 'Crypto';
    const exchangeName = settings.exchange.charAt(0).toUpperCase() + settings.exchange.slice(1);
    refs.marketBadge.textContent = `${marketName} / ${exchangeName}`;

    if (!settings.symbol) {
      refs.symbol.value = settings.marketType === 'stock'
        ? '005930'
        : (settings.exchange === 'upbit' ? 'BTC/KRW' : 'BTC/USDT');
    }
  }

  function sanitizeSettingsForLog(settings) {
    const cloned = Object.assign({}, settings);
    ['apiToken', 'kiwoomApiSecret', 'binanceApiSecret', 'upbitApiSecret'].forEach(function (key) {
      if (cloned[key]) {
        cloned[key] = '***';
      }
    });
    if (cloned.telegramToken) {
      cloned.telegramToken = '***';
    }
    return cloned;
  }

  function extractToken(data) {
    if (!data || typeof data !== 'object') {
      return '';
    }
    return String(data.access_token || data.token || (data.data && data.data.access_token) || '');
  }

  function extractUser(data) {
    if (!data || typeof data !== 'object') {
      return null;
    }
    return data.user || data.profile || (data.data && data.data.user) || null;
  }

  function readMockDb() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_MOCK_DB) || '{}');
      if (!parsed.users || !Array.isArray(parsed.users)) {
        parsed.users = [];
      }
      if (!parsed.tokens || typeof parsed.tokens !== 'object') {
        parsed.tokens = {};
      }
      if (!parsed.pendingCodes || typeof parsed.pendingCodes !== 'object') {
        parsed.pendingCodes = {};
      }
      if (!parsed.reports || typeof parsed.reports !== 'object') {
        parsed.reports = {};
      }
      return parsed;
    } catch (_err) {
      return { users: [], tokens: {}, pendingCodes: {}, reports: {} };
    }
  }

  function writeMockDb(db) {
    localStorage.setItem(STORAGE_MOCK_DB, JSON.stringify(db));
  }

  function mockIssueToken(userId) {
    return `mock_${userId}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function mockGetUserByToken(db, token) {
    const userId = db.tokens[token];
    if (!userId) {
      return null;
    }
    return db.users.find(function (u) { return u.id === userId; }) || null;
  }
  function mockRequest(endpointName, method, body, sessionToken) {
    const db = readMockDb();

    if (endpointName === 'health') {
      return { ok: true, mode: 'mock' };
    }

    if (endpointName === 'register' && method === 'POST') {
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const name = String(body.name || '').trim();
      const phone = String(body.phone || '').replace(/\D/g, '');

      if (!email || email.indexOf('@') < 1) {
        throw new Error('유효한 이메일을 입력하세요.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 8자 이상이어야 합니다.');
      }
      if (db.users.some(function (u) { return u.email === email; })) {
        throw new Error('이미 가입된 이메일입니다.');
      }

      const user = {
        id: Date.now(),
        email: email,
        password: password,
        name: name,
        phone: phone,
        verified: false,
        created_at: new Date().toISOString()
      };
      db.users.push(user);
      const token = mockIssueToken(user.id);
      db.tokens[token] = user.id;
      writeMockDb(db);
      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          verified: user.verified
        }
      };
    }

    if (endpointName === 'login' && method === 'POST') {
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const user = db.users.find(function (u) {
        return u.email === email && u.password === password;
      });
      if (!user) {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      const token = mockIssueToken(user.id);
      db.tokens[token] = user.id;
      writeMockDb(db);
      return {
        access_token: token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          verified: user.verified
        }
      };
    }

    if (endpointName === 'me' && method === 'GET') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('인증이 필요합니다.');
      }
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          verified: user.verified
        }
      };
    }

    if (endpointName === 'verifyStart' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('인증이 필요합니다.');
      }
      const code = String(Math.floor(100000 + Math.random() * 900000));
      db.pendingCodes[user.id] = {
        code: code,
        expires_at: Date.now() + 5 * 60 * 1000
      };
      writeMockDb(db);
      return {
        started: true,
        message: '인증 코드를 발송했습니다. (데모 모드)',
        masked_phone: maskPhone(user.phone),
        debug_code: code
      };
    }

    if (endpointName === 'verifyComplete' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('인증이 필요합니다.');
      }
      const pending = db.pendingCodes[user.id];
      const code = String(body.code || '').trim();
      if (!pending) {
        throw new Error('진행 중인 인증 요청이 없습니다.');
      }
      if (Date.now() > Number(pending.expires_at)) {
        delete db.pendingCodes[user.id];
        writeMockDb(db);
        throw new Error('인증 코드가 만료되었습니다.');
      }
      if (code !== String(pending.code)) {
        throw new Error('인증 코드가 일치하지 않습니다.');
      }
      user.verified = true;
      delete db.pendingCodes[user.id];
      writeMockDb(db);
      return {
        verified: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          verified: true
        }
      };
    }

    if (endpointName === 'start' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }
      if (!user.verified) {
        throw new Error('본인인증 완료 후 시작할 수 있습니다.');
      }
      db.reports[user.id] = db.reports[user.id] || [];
      db.reports[user.id].push({
        ts: new Date().toISOString(),
        summary: `${body.exchange || 'kiwoom'} 자동매매 시작`,
        details: {
          market_type: body.market_type,
          exchange: body.exchange,
          symbol: body.symbol,
          dry_run: body.dry_run,
          note: 'demo-started'
        }
      });
      writeMockDb(db);
      return {
        ok: true,
        mode: 'mock',
        started: true,
        exchange: body.exchange,
        symbol: body.symbol
      };
    }

    if (endpointName === 'stop' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }
      return { ok: true, mode: 'mock', stopped: true };
    }

    if (endpointName === 'analyze' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }
      const report = {
        ts: new Date().toISOString(),
        summary: '최근 20회 기준 진입 시점 필터 강화 필요',
        details: {
          win_rate: 0.58,
          avg_return_pct: 0.016,
          drawdown_pct: 0.031,
          improvement: ['과열 구간 진입 제한', '뉴스 스코어 하한선 상향', '연속 손실 2회 시 휴식 모드']
        }
      };
      db.reports[user.id] = db.reports[user.id] || [];
      db.reports[user.id].push(report);
      writeMockDb(db);
      return { ok: true, mode: 'mock', report: report };
    }

    if (endpointName === 'reportLatest' && method === 'GET') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('로그인이 필요합니다.');
      }
      const reports = db.reports[user.id] || [];
      if (!reports.length) {
        return {
          ok: true,
          mode: 'mock',
          report: null,
          message: '아직 분석 리포트가 없습니다.'
        };
      }
      return {
        ok: true,
        mode: 'mock',
        report: reports[reports.length - 1]
      };
    }

    throw new Error(`지원하지 않는 요청입니다: ${endpointName}`);
  }

  async function callApi(endpointName, method, body, options) {
    const opts = options || {};
    const settings = collectSettings();
    const apiBase = settings.apiBase;
    const authToken = state.session.token;

    if (!apiBase) {
      return mockRequest(endpointName, method, body || {}, authToken);
    }

    const endpoint = endpoints[endpointName];
    if (!endpoint) {
      throw new Error(`등록되지 않은 endpoint: ${endpointName}`);
    }

    const url = apiBase.replace(/\/+$/, '') + endpoint;
    const headers = { 'Content-Type': 'application/json' };
    if (opts.withAuth !== false && authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }
    if (settings.apiToken) {
      headers['X-Portal-Token'] = settings.apiToken;
    }

    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const raw = await response.text();
    let data = raw;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_err) {
      // keep text response
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} | ${toJsonText(data)}`);
    }
    return data;
  }

  function buildTradingPayload() {
    const settings = collectSettings();
    return {
      market_type: settings.marketType,
      exchange: settings.exchange,
      account_no: settings.accountNo,
      symbol: settings.symbol,
      max_order_amount_krw: settings.orderBudget,
      auto_select_top_candidate: settings.autoSelect,
      dry_run: settings.dryRun,
      telegram_bot_token: settings.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: {
        kiwoom: { api_key: settings.kiwoomApiKey, api_secret: settings.kiwoomApiSecret },
        binance: { api_key: settings.binanceApiKey, api_secret: settings.binanceApiSecret },
        upbit: { access_key: settings.upbitApiKey, secret_key: settings.upbitApiSecret }
      }
    };
  }
  function setStepStatus(node, status) {
    if (!node) {
      return;
    }
    node.classList.remove('done', 'active');
    if (status === 'done') {
      node.classList.add('done');
    }
    if (status === 'active') {
      node.classList.add('active');
    }
  }

  function evaluateReadiness() {
    const settings = collectSettings();
    const loggedIn = Boolean(state.session.token && state.session.user);
    const verified = loggedIn && Boolean(state.session.verified);
    const hasLiveApi = Boolean(settings.apiBase);
    const apiReady = !hasLiveApi || state.apiChecked;
    const symbolReady = Boolean(settings.symbol);
    const accountReady = settings.marketType === 'crypto' ? true : Boolean(settings.accountNo);
    const tradingConfigReady = symbolReady && accountReady;
    const canStart = loggedIn && verified && apiReady && tradingConfigReady;

    const missing = [];
    if (!loggedIn) {
      missing.push('로그인 필요');
    }
    if (!verified) {
      missing.push('본인인증 필요');
    }
    if (!apiReady) {
      missing.push('API 연결 확인 필요');
    }
    if (!symbolReady) {
      missing.push('종목/심볼 입력 필요');
    }
    if (!accountReady) {
      missing.push('계좌번호 입력 필요');
    }

    return {
      settings: settings,
      loggedIn: loggedIn,
      verified: verified,
      apiReady: apiReady,
      tradingConfigReady: tradingConfigReady,
      canStart: canStart,
      missing: missing
    };
  }

  function refreshSteps(readiness) {
    const r = readiness || evaluateReadiness();

    if (!r.loggedIn) {
      setStepStatus(refs.stepAuth, 'active');
      setStepStatus(refs.stepKyc, 'pending');
      setStepStatus(refs.stepApi, 'pending');
      setStepStatus(refs.stepTrade, 'pending');
      refs.progressText.textContent = '1단계: 회원가입 또는 로그인';
      return;
    }

    setStepStatus(refs.stepAuth, 'done');
    if (!r.verified) {
      setStepStatus(refs.stepKyc, 'active');
      setStepStatus(refs.stepApi, 'pending');
      setStepStatus(refs.stepTrade, 'pending');
      refs.progressText.textContent = '2단계: 본인인증 완료';
      return;
    }

    setStepStatus(refs.stepKyc, 'done');
    if (!r.apiReady) {
      setStepStatus(refs.stepApi, 'active');
      setStepStatus(refs.stepTrade, 'pending');
      refs.progressText.textContent = '3단계: API 연결을 확인하세요';
      return;
    }

    setStepStatus(refs.stepApi, 'done');
    if (!r.tradingConfigReady) {
      setStepStatus(refs.stepTrade, 'active');
      refs.progressText.textContent = '4단계: 거래 설정을 완료하세요';
      return;
    }

    setStepStatus(refs.stepTrade, 'done');
    refs.progressText.textContent = '모든 단계 완료. 자동매매 시작 가능합니다.';
  }

  function refreshSummaryAndGuard() {
    const r = evaluateReadiness();
    const s = r.settings;

    refs.sumUser.textContent = r.loggedIn ? (state.session.user.email || state.session.user.name || '사용자') : '미로그인';
    refs.sumVerify.textContent = r.verified ? '인증완료' : '미인증';
    refs.sumApi.textContent = s.apiBase ? (r.apiReady ? 'Live API 연결확인' : 'Live API 미확인') : 'Demo 모드';
    refs.sumMarket.textContent = `${s.marketType === 'stock' ? 'Stock' : 'Crypto'} / ${s.exchange}`;
    refs.sumSymbol.textContent = s.symbol || '-';
    refs.sumBudget.textContent = `${s.orderBudget.toLocaleString('ko-KR')} KRW`;
    refs.sumMode.textContent = s.dryRun ? 'DRY RUN' : 'LIVE';

    if (r.canStart) {
      refs.startGuardText.textContent = '준비 완료. 자동매매 시작 버튼을 눌러 실행하세요.';
    } else {
      refs.startGuardText.textContent = `시작 전 확인: ${r.missing.join(' / ')}`;
    }

    refs.btnStart.disabled = !r.canStart;
    refs.btnMobileStart.disabled = !r.canStart;
    refs.btnStop.disabled = !r.loggedIn;
    refs.btnAnalyze.disabled = !r.loggedIn;
    refs.btnLoadReport.disabled = !r.loggedIn;
    refs.btnMobileStop.disabled = !r.loggedIn;

    refreshSteps(r);
  }

  async function refreshMe() {
    if (!state.session.token) {
      renderAuthState();
      refreshSummaryAndGuard();
      return;
    }

    try {
      const data = await callApi('me', 'GET');
      const user = extractUser(data);
      if (user) {
        state.session.user = user;
        state.session.verified = Boolean(user.verified || data.verified);
        saveSession();
      }
    } catch (_err) {
      clearSession();
    }

    renderAuthState();
    refreshSummaryAndGuard();
  }

  function scrollToSection(id) {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeMobileNav() {
    refs.mobileNav.classList.add('hidden');
    refs.btnMenu.textContent = '☰';
  }

  function openMobileNav() {
    refs.mobileNav.classList.remove('hidden');
    refs.btnMenu.textContent = '✕';
  }

  function toggleMobileNav() {
    if (refs.mobileNav.classList.contains('hidden')) {
      openMobileNav();
    } else {
      closeMobileNav();
    }
  }

  function bindInputs() {
    refs.regPhone.addEventListener('input', function () {
      refs.regPhone.value = formatPhone(refs.regPhone.value);
    });

    refs.accountNo.addEventListener('input', function () {
      refs.accountNo.value = normalizeAccount(refs.accountNo.value);
      schedulePersistAndRender();
    });

    refs.orderBudget.addEventListener('input', function () {
      refs.orderBudget.value = String(clampBudget(refs.orderBudget.value));
      schedulePersistAndRender();
    });

    const tracked = refs.settingsForm.querySelectorAll('input, select');
    tracked.forEach(function (node) {
      node.addEventListener('change', schedulePersistAndRender);
      node.addEventListener('keyup', schedulePersistAndRender);
    });

    refs.apiBase.addEventListener('input', function () {
      state.apiChecked = false;
      refs.apiStatus.textContent = refs.apiBase.value.trim() ? '미확인' : 'Demo';
      schedulePersistAndRender();
    });
  }
  refs.btnTrial.addEventListener('click', function () {
    setAuthMode('register');
    scrollToSection('auth');
  });

  refs.btnExplore.addEventListener('click', function () {
    scrollToSection('trading');
  });

  refs.btnHeaderLogin.addEventListener('click', function () {
    setAuthMode('login');
    scrollToSection('auth');
  });

  refs.btnMenu.addEventListener('click', toggleMobileNav);
  refs.mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  refs.tabRegister.addEventListener('click', function () {
    setAuthMode('register');
  });

  refs.tabLogin.addEventListener('click', function () {
    setAuthMode('login');
  });

  refs.stepAuth.addEventListener('click', function () {
    scrollToSection('auth');
  });
  refs.stepKyc.addEventListener('click', function () {
    scrollToSection('auth');
  });
  refs.stepApi.addEventListener('click', function () {
    scrollToSection('auth');
  });
  refs.stepTrade.addEventListener('click', function () {
    scrollToSection('trading');
  });

  refs.registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      const payload = {
        name: refs.regName.value.trim(),
        phone: refs.regPhone.value.trim(),
        email: refs.regEmail.value.trim(),
        password: refs.regPassword.value
      };
      const data = await callApi('register', 'POST', payload, { withAuth: false });
      state.session.token = extractToken(data);
      state.session.user = extractUser(data);
      state.session.verified = Boolean((state.session.user && state.session.user.verified) || data.verified);
      saveSession();
      renderAuthState();
      refreshSummaryAndGuard();
      pushLog('회원가입 완료', {
        email: state.session.user ? state.session.user.email : payload.email,
        verified: state.session.verified
      });
      setAuthMode('login');
    } catch (err) {
      pushLog('회원가입 실패', String(err.message || err));
    }
  });

  refs.loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
      const payload = {
        email: refs.loginEmail.value.trim(),
        password: refs.loginPassword.value
      };
      const data = await callApi('login', 'POST', payload, { withAuth: false });
      state.session.token = extractToken(data);
      state.session.user = extractUser(data);
      state.session.verified = Boolean((state.session.user && state.session.user.verified) || data.verified);
      saveSession();
      renderAuthState();
      refreshSummaryAndGuard();
      pushLog('로그인 성공', {
        email: state.session.user ? state.session.user.email : payload.email,
        verified: state.session.verified
      });
    } catch (err) {
      pushLog('로그인 실패', String(err.message || err));
    }
  });

  refs.btnLogout.addEventListener('click', function () {
    clearSession();
    pushLog('로그아웃', '세션이 초기화되었습니다.');
  });

  refs.btnVerifyStart.addEventListener('click', async function () {
    if (!state.session.token) {
      pushLog('본인인증 시작 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      const data = await callApi('verifyStart', 'POST', {});
      const code = data.debug_code ? ` (데모코드: ${data.debug_code})` : '';
      refs.verifyHint.textContent = `${data.message || '인증 코드가 전송되었습니다.'}${code}`;
      pushLog('본인인증 시작', {
        masked_phone: data.masked_phone || '-',
        note: data.debug_code ? '데모 코드가 발급되었습니다.' : '실서비스 인증이 시작되었습니다.'
      });
    } catch (err) {
      pushLog('본인인증 시작 실패', String(err.message || err));
    }
  });

  refs.verifyCodeForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (!state.session.token) {
      pushLog('인증 코드 제출 실패', '먼저 로그인하세요.');
      return;
    }
    try {
      const data = await callApi('verifyComplete', 'POST', { code: refs.verifyCode.value.trim() });
      const user = extractUser(data) || state.session.user;
      state.session.user = user;
      state.session.verified = Boolean((user && user.verified) || data.verified);
      saveSession();
      renderAuthState();
      refreshSummaryAndGuard();
      pushLog('본인인증 완료', { email: user ? user.email : '-', verified: state.session.verified });
    } catch (err) {
      pushLog('인증 코드 제출 실패', String(err.message || err));
    }
  });

  refs.btnVerifyRefresh.addEventListener('click', async function () {
    await refreshMe();
    pushLog('인증 상태 새로고침', {
      user: state.session.user ? state.session.user.email : null,
      verified: state.session.verified
    });
  });

  refs.btnCheckApi.addEventListener('click', async function () {
    refs.apiStatus.textContent = '확인 중...';
    try {
      const data = await callApi('health', 'GET', null, { withAuth: false });
      state.apiChecked = true;
      refs.apiStatus.textContent = refs.apiBase.value.trim() ? '정상' : 'Demo';
      refreshSummaryAndGuard();
      pushLog('API 연결 성공', data);
    } catch (err) {
      state.apiChecked = false;
      refs.apiStatus.textContent = '실패';
      refreshSummaryAndGuard();
      pushLog('API 연결 실패', String(err.message || err));
    }
  });

  refs.settingsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const settings = persistSettings();
    renderMarketFields();
    refreshSummaryAndGuard();
    pushLog('설정 저장 완료', sanitizeSettingsForLog(settings));
  });

  refs.marketType.addEventListener('change', function () {
    if (refs.marketType.value === 'stock') {
      refs.exchange.value = 'kiwoom';
    } else if (refs.exchange.value === 'kiwoom') {
      refs.exchange.value = 'binance';
    }
    renderMarketFields();
    refreshSummaryAndGuard();
  });

  refs.exchange.addEventListener('change', function () {
    if (refs.marketType.value === 'stock') {
      refs.exchange.value = 'kiwoom';
    }
    renderMarketFields();
    refreshSummaryAndGuard();
  });
  async function onStartClicked() {
    const readiness = evaluateReadiness();
    if (!readiness.canStart) {
      refreshSummaryAndGuard();
      pushLog('자동매매 시작 실패', `필수 조건 미완료: ${readiness.missing.join(' / ')}`);
      return;
    }
    try {
      const data = await callApi('start', 'POST', buildTradingPayload());
      pushLog('자동매매 시작 요청 완료', data);
    } catch (err) {
      pushLog('자동매매 시작 실패', String(err.message || err));
    }
  }

  async function onStopClicked() {
    if (!state.session.token) {
      pushLog('자동매매 중지 실패', '로그인 후 실행하세요.');
      return;
    }
    try {
      const data = await callApi('stop', 'POST', {});
      pushLog('자동매매 중지 요청 완료', data);
    } catch (err) {
      pushLog('자동매매 중지 실패', String(err.message || err));
    }
  }

  refs.btnStart.addEventListener('click', onStartClicked);
  refs.btnMobileStart.addEventListener('click', onStartClicked);
  refs.btnStop.addEventListener('click', onStopClicked);
  refs.btnMobileStop.addEventListener('click', onStopClicked);

  refs.btnAnalyze.addEventListener('click', async function () {
    if (!state.session.token) {
      pushLog('매매일지 분석 실패', '로그인 후 실행하세요.');
      return;
    }
    try {
      const data = await callApi('analyze', 'POST', { trigger: 'manual' });
      pushLog('매매일지 분석 완료', data);
    } catch (err) {
      pushLog('매매일지 분석 실패', String(err.message || err));
    }
  });

  refs.btnLoadReport.addEventListener('click', async function () {
    if (!state.session.token) {
      pushLog('리포트 조회 실패', '로그인 후 실행하세요.');
      return;
    }
    try {
      const data = await callApi('reportLatest', 'GET');
      pushLog('최근 분석 리포트', data);
    } catch (err) {
      pushLog('리포트 조회 실패', String(err.message || err));
    }
  });

  refs.btnMobileTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function initialize() {
    applySettings(loadSettings());
    state.session = loadSession();
    setAuthMode('register');
    renderMarketFields();
    renderAuthState();
    refs.apiStatus.textContent = refs.apiBase.value.trim() ? '미확인' : 'Demo';
    bindInputs();
    refreshSummaryAndGuard();
    pushLog('대시보드 준비 완료', '모바일 친화형 UI가 활성화되었습니다.');
    refreshMe();
  }

  initialize();
})();
