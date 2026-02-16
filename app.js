(function () {
  'use strict';

  const STORAGE_SETTINGS = 'systemtrading.premier.settings.v2';
  const STORAGE_SESSION = 'systemtrading.premier.session.v2';
  const STORAGE_MOCK_DB = 'systemtrading.premier.mockdb.v1';

  const refs = {
    btnHeaderLogin: document.getElementById('btnHeaderLogin'),
    btnTrial: document.getElementById('btnTrial'),
    btnExplore: document.getElementById('btnExplore'),

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
    resultBox: document.getElementById('resultBox')
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
    }
  };

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

  function writeResult(title, payload) {
    refs.resultBox.textContent = `[${nowText()}] ${title}\n${toJsonText(payload)}`;
  }

  function clampBudget(raw) {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return 2000000;
    }
    return Math.min(Math.max(Math.round(parsed), 10000), 2000000);
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
      marketType,
      exchange,
      accountNo: refs.accountNo.value.trim(),
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
    refs.exchange.value = settings.exchange;
    return settings;
  }

  function applySettings(settings) {
    const s = Object.assign(defaultSettings(), settings || {});
    refs.apiBase.value = s.apiBase;
    refs.apiToken.value = s.apiToken;
    refs.marketType.value = s.marketType;
    refs.exchange.value = s.exchange;
    refs.accountNo.value = s.accountNo;
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

    if (settings.marketType === 'stock' && !settings.symbol) {
      refs.symbol.value = '005930';
    }
    if (settings.marketType === 'crypto' && !settings.symbol) {
      refs.symbol.value = settings.exchange === 'upbit' ? 'BTC/KRW' : 'BTC/USDT';
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
        email,
        password,
        name,
        phone,
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
        code,
        expires_at: Date.now() + 5 * 60 * 1000
      };
      writeMockDb(db);
      return {
        started: true,
        message: '인증 코드를 발송했습니다. (데모 모드) ',
        masked_phone: maskPhone(user.phone),
        debug_code: code
      };
    }

    if (endpointName === 'verifyComplete' && method === 'POST') {
      const user = mockGetUserByToken(db, sessionToken);
      if (!user) {
        throw new Error('인증이 필요합니다.');
      }
      const code = String(body.code || '').trim();
      const pending = db.pendingCodes[user.id];
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
      return {
        ok: true,
        mode: 'mock',
        stopped: true
      };
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
          improvement: [
            '과열 구간 진입 제한',
            '뉴스 스코어 하한선 상향',
            '연속 손실 2회 시 휴식 모드'
          ]
        }
      };

      db.reports[user.id] = db.reports[user.id] || [];
      db.reports[user.id].push(report);
      writeMockDb(db);
      return {
        ok: true,
        mode: 'mock',
        report
      };
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
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const raw = await response.text();
    let data = raw;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_err) {
      // keep text
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
        kiwoom: {
          api_key: settings.kiwoomApiKey,
          api_secret: settings.kiwoomApiSecret
        },
        binance: {
          api_key: settings.binanceApiKey,
          api_secret: settings.binanceApiSecret
        },
        upbit: {
          access_key: settings.upbitApiKey,
          secret_key: settings.upbitApiSecret
        }
      }
    };
  }

  async function refreshMe() {
    if (!state.session.token) {
      renderAuthState();
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
  }

  function scrollToSection(id) {
    const node = document.getElementById(id);
    if (!node) {
      return;
    }
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  refs.tabRegister.addEventListener('click', function () {
    setAuthMode('register');
  });

  refs.tabLogin.addEventListener('click', function () {
    setAuthMode('login');
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
      writeResult('회원가입 완료', {
        email: state.session.user ? state.session.user.email : payload.email,
        verified: state.session.verified
      });
      setAuthMode('login');
    } catch (err) {
      writeResult('회원가입 실패', String(err.message || err));
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
      writeResult('로그인 성공', {
        email: state.session.user ? state.session.user.email : payload.email,
        verified: state.session.verified
      });
    } catch (err) {
      writeResult('로그인 실패', String(err.message || err));
    }
  });

  refs.btnLogout.addEventListener('click', function () {
    clearSession();
    writeResult('로그아웃', '세션이 초기화되었습니다.');
  });

  refs.btnVerifyStart.addEventListener('click', async function () {
    if (!state.session.token) {
      writeResult('본인인증 시작 실패', '먼저 로그인하세요.');
      return;
    }

    try {
      const data = await callApi('verifyStart', 'POST', {});
      const code = data.debug_code ? ` 데모코드: ${data.debug_code}` : '';
      refs.verifyHint.textContent = `${data.message || '인증 코드가 전송되었습니다.'}${code}`;
      writeResult('본인인증 시작', {
        masked_phone: data.masked_phone || '-',
        note: data.debug_code ? '데모 코드가 발급되었습니다.' : '실서비스 인증이 시작되었습니다.'
      });
    } catch (err) {
      writeResult('본인인증 시작 실패', String(err.message || err));
    }
  });

  refs.verifyCodeForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!state.session.token) {
      writeResult('인증 코드 제출 실패', '먼저 로그인하세요.');
      return;
    }

    try {
      const code = refs.verifyCode.value.trim();
      const data = await callApi('verifyComplete', 'POST', { code: code });
      const user = extractUser(data) || state.session.user;
      state.session.user = user;
      state.session.verified = Boolean((user && user.verified) || data.verified);
      saveSession();
      renderAuthState();
      writeResult('본인인증 완료', {
        email: user ? user.email : '-',
        verified: state.session.verified
      });
    } catch (err) {
      writeResult('인증 코드 제출 실패', String(err.message || err));
    }
  });

  refs.btnVerifyRefresh.addEventListener('click', async function () {
    await refreshMe();
    writeResult('인증 상태 새로고침', {
      user: state.session.user ? state.session.user.email : null,
      verified: state.session.verified
    });
  });

  refs.btnCheckApi.addEventListener('click', async function () {
    refs.apiStatus.textContent = '확인 중...';
    try {
      const data = await callApi('health', 'GET', null, { withAuth: false });
      refs.apiStatus.textContent = '정상';
      writeResult('API 연결 성공', data);
    } catch (err) {
      refs.apiStatus.textContent = '실패';
      writeResult('API 연결 실패', String(err.message || err));
    }
  });

  refs.settingsForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const settings = persistSettings();
    renderMarketFields();
    writeResult('설정 저장 완료', sanitizeSettingsForLog(settings));
  });

  refs.marketType.addEventListener('change', function () {
    if (refs.marketType.value === 'stock') {
      refs.exchange.value = 'kiwoom';
    } else if (refs.exchange.value === 'kiwoom') {
      refs.exchange.value = 'binance';
    }
    renderMarketFields();
  });

  refs.exchange.addEventListener('change', function () {
    if (refs.marketType.value === 'stock') {
      refs.exchange.value = 'kiwoom';
    }
    renderMarketFields();
  });

  refs.btnStart.addEventListener('click', async function () {
    if (!state.session.token) {
      writeResult('자동매매 시작 실패', '로그인 후 실행하세요.');
      return;
    }
    if (!state.session.verified) {
      writeResult('자동매매 시작 실패', '본인인증 완료 후 실행 가능합니다.');
      return;
    }

    try {
      const payload = buildTradingPayload();
      if (!payload.symbol) {
        throw new Error('종목/심볼을 입력하세요.');
      }
      if (payload.market_type === 'stock' && !payload.account_no) {
        throw new Error('주식 거래는 계좌번호가 필요합니다.');
      }
      const data = await callApi('start', 'POST', payload);
      writeResult('자동매매 시작 요청 완료', data);
    } catch (err) {
      writeResult('자동매매 시작 실패', String(err.message || err));
    }
  });

  refs.btnStop.addEventListener('click', async function () {
    if (!state.session.token) {
      writeResult('자동매매 중지 실패', '로그인 후 실행하세요.');
      return;
    }

    try {
      const data = await callApi('stop', 'POST', {});
      writeResult('자동매매 중지 요청 완료', data);
    } catch (err) {
      writeResult('자동매매 중지 실패', String(err.message || err));
    }
  });

  refs.btnAnalyze.addEventListener('click', async function () {
    if (!state.session.token) {
      writeResult('매매일지 분석 실패', '로그인 후 실행하세요.');
      return;
    }

    try {
      const data = await callApi('analyze', 'POST', { trigger: 'manual' });
      writeResult('매매일지 분석 완료', data);
    } catch (err) {
      writeResult('매매일지 분석 실패', String(err.message || err));
    }
  });

  refs.btnLoadReport.addEventListener('click', async function () {
    if (!state.session.token) {
      writeResult('리포트 조회 실패', '로그인 후 실행하세요.');
      return;
    }

    try {
      const data = await callApi('reportLatest', 'GET');
      writeResult('최근 분석 리포트', data);
    } catch (err) {
      writeResult('리포트 조회 실패', String(err.message || err));
    }
  });

  function initialize() {
    applySettings(loadSettings());
    state.session = loadSession();
    setAuthMode('register');
    renderMarketFields();
    renderAuthState();
    writeResult('대시보드 준비 완료', '7일 무료체험 또는 둘러보기로 시작하세요.');
    refreshMe();
  }

  initialize();
})();
