(function () {
  'use strict';

  var SETTINGS_KEY = 'systemtrading.settings.v5';
  var SESSION_KEY = 'systemtrading.session.v5';
  var MOCK_KEY = 'systemtrading.mockdb.v2';

  function defaults() {
    return {
      apiBase: '',
      apiToken: '',
      accountNo: '8120-0764',

      stockSymbol: '005930',
      stockBudget: 2000000,
      stockAutoSelect: true,
      stockDryRun: true,
      kiwoomApiKey: '',
      kiwoomApiSecret: '',

      coinExchange: 'binance',
      coinSymbol: 'BTC/USDT',
      coinBudget: 2000000,
      coinAutoSelect: true,
      coinDryRun: true,
      binanceApiKey: '',
      binanceApiSecret: '',
      upbitApiKey: '',
      upbitApiSecret: '',

      telegramToken: '',
      telegramChatId: ''
    };
  }

  function normalizeBudget(raw) {
    var parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return 2000000;
    }
    parsed = Math.round(parsed);
    if (parsed < 10000) {
      return 10000;
    }
    if (parsed > 2000000) {
      return 2000000;
    }
    return parsed;
  }

  function normalizeAccount(raw) {
    return String(raw || '').replace(/[^\d-]/g, '').replace(/-{2,}/g, '-').slice(0, 20);
  }

  function loadSettings() {
    try {
      var parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      var merged = Object.assign(defaults(), parsed || {});
      merged.accountNo = normalizeAccount(merged.accountNo);
      merged.stockBudget = normalizeBudget(merged.stockBudget);
      merged.coinBudget = normalizeBudget(merged.coinBudget);
      merged.stockAutoSelect = Boolean(merged.stockAutoSelect);
      merged.stockDryRun = Boolean(merged.stockDryRun);
      merged.coinAutoSelect = Boolean(merged.coinAutoSelect);
      merged.coinDryRun = Boolean(merged.coinDryRun);
      return merged;
    } catch (_err) {
      return defaults();
    }
  }

  function saveSettings(next) {
    var merged = Object.assign(defaults(), next || {});
    merged.accountNo = normalizeAccount(merged.accountNo);
    merged.stockBudget = normalizeBudget(merged.stockBudget);
    merged.coinBudget = normalizeBudget(merged.coinBudget);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  }

  function loadSession() {
    try {
      var parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
      return {
        token: String(parsed.token || ''),
        user: parsed.user || null,
        verified: Boolean(parsed.verified)
      };
    } catch (_err) {
      return { token: '', user: null, verified: false };
    }
  }

  function saveSession(session) {
    var payload = {
      token: String((session && session.token) || ''),
      user: (session && session.user) || null,
      verified: Boolean(session && session.verified)
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    return payload;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    return { token: '', user: null, verified: false };
  }

  function readMockDb() {
    try {
      var parsed = JSON.parse(localStorage.getItem(MOCK_KEY) || '{}');
      if (!Array.isArray(parsed.users)) {
        parsed.users = [];
      }
      if (!parsed.tokens || typeof parsed.tokens !== 'object') {
        parsed.tokens = {};
      }
      if (!parsed.pending || typeof parsed.pending !== 'object') {
        parsed.pending = {};
      }
      if (!parsed.reports || typeof parsed.reports !== 'object') {
        parsed.reports = {};
      }
      if (!parsed.runtime || typeof parsed.runtime !== 'object') {
        parsed.runtime = {};
      }
      return parsed;
    } catch (_err) {
      return { users: [], tokens: {}, pending: {}, reports: {}, runtime: {} };
    }
  }

  function writeMockDb(db) {
    localStorage.setItem(MOCK_KEY, JSON.stringify(db));
  }

  function issueToken(userId) {
    return 'mock_' + userId + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
  }

  function sessionUserByToken(db, token) {
    var userId = db.tokens[token];
    if (!userId) {
      return null;
    }
    return db.users.find(function (u) { return u.id === userId; }) || null;
  }

  function maskPhone(phone) {
    var digits = String(phone || '').replace(/\D/g, '');
    if (digits.length < 8) {
      return digits;
    }
    return digits.slice(0, 3) + '****' + digits.slice(-4);
  }

  function mockRequest(endpointName, method, body, sessionToken) {
    var db = readMockDb();

    if (endpointName === 'health') {
      return { ok: true, mode: 'mock' };
    }

    if (endpointName === 'register' && method === 'POST') {
      var email = String((body && body.email) || '').trim().toLowerCase();
      var password = String((body && body.password) || '');
      var name = String((body && body.name) || '').trim();
      var phone = String((body && body.phone) || '').replace(/\D/g, '');

      if (!email || email.indexOf('@') < 1) {
        throw new Error('유효한 이메일을 입력하세요.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 8자 이상이어야 합니다.');
      }
      if (db.users.some(function (u) { return u.email === email; })) {
        throw new Error('이미 가입된 이메일입니다.');
      }

      var user = {
        id: Date.now(),
        email: email,
        password: password,
        name: name,
        phone: phone,
        verified: false,
        created_at: new Date().toISOString()
      };
      db.users.push(user);
      var token = issueToken(user.id);
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
      var loginEmail = String((body && body.email) || '').trim().toLowerCase();
      var loginPassword = String((body && body.password) || '');
      var found = db.users.find(function (u) {
        return u.email === loginEmail && u.password === loginPassword;
      });
      if (!found) {
        throw new Error('이메일 또는 비밀번호가 일치하지 않습니다.');
      }
      var loginToken = issueToken(found.id);
      db.tokens[loginToken] = found.id;
      writeMockDb(db);
      return {
        access_token: loginToken,
        user: {
          id: found.id,
          email: found.email,
          name: found.name,
          phone: found.phone,
          verified: found.verified
        }
      };
    }

    if (endpointName === 'me' && method === 'GET') {
      var meUser = sessionUserByToken(db, sessionToken);
      if (!meUser) {
        throw new Error('인증이 필요합니다.');
      }
      return {
        user: {
          id: meUser.id,
          email: meUser.email,
          name: meUser.name,
          phone: meUser.phone,
          verified: meUser.verified
        }
      };
    }

    if (endpointName === 'verifyStart' && method === 'POST') {
      var vUser = sessionUserByToken(db, sessionToken);
      if (!vUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var code = String(Math.floor(100000 + Math.random() * 900000));
      db.pending[vUser.id] = {
        code: code,
        expires_at: Date.now() + 5 * 60 * 1000
      };
      writeMockDb(db);
      return {
        started: true,
        message: '인증 코드를 발송했습니다. (데모 모드)',
        masked_phone: maskPhone(vUser.phone),
        debug_code: code
      };
    }

    if (endpointName === 'verifyComplete' && method === 'POST') {
      var cUser = sessionUserByToken(db, sessionToken);
      if (!cUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var pending = db.pending[cUser.id];
      var submitCode = String((body && body.code) || '').trim();
      if (!pending) {
        throw new Error('진행 중인 인증 요청이 없습니다.');
      }
      if (Date.now() > Number(pending.expires_at)) {
        delete db.pending[cUser.id];
        writeMockDb(db);
        throw new Error('인증 코드가 만료되었습니다.');
      }
      if (submitCode !== String(pending.code)) {
        throw new Error('인증 코드가 일치하지 않습니다.');
      }
      cUser.verified = true;
      delete db.pending[cUser.id];
      writeMockDb(db);
      return {
        verified: true,
        user: {
          id: cUser.id,
          email: cUser.email,
          name: cUser.name,
          phone: cUser.phone,
          verified: true
        }
      };
    }

    if (endpointName === 'start' && method === 'POST') {
      var sUser = sessionUserByToken(db, sessionToken);
      if (!sUser) {
        throw new Error('로그인이 필요합니다.');
      }
      if (!sUser.verified) {
        throw new Error('본인인증 완료 후 시작할 수 있습니다.');
      }

      db.runtime[sUser.id] = {
        running: true,
        market: String((body && body.market_type) || ''),
        exchange: String((body && body.exchange) || ''),
        symbol: String((body && body.symbol) || ''),
        updated_at: new Date().toISOString()
      };

      db.reports[sUser.id] = db.reports[sUser.id] || [];
      db.reports[sUser.id].push({
        ts: new Date().toISOString(),
        summary: '자동매매 시작',
        details: {
          market_type: body.market_type,
          exchange: body.exchange,
          symbol: body.symbol,
          max_order_amount_krw: body.max_order_amount_krw,
          dry_run: body.dry_run
        }
      });
      writeMockDb(db);

      return {
        ok: true,
        mode: 'mock',
        started: true,
        market: body.market_type,
        exchange: body.exchange,
        symbol: body.symbol
      };
    }

    if (endpointName === 'stop' && method === 'POST') {
      var stUser = sessionUserByToken(db, sessionToken);
      if (!stUser) {
        throw new Error('로그인이 필요합니다.');
      }
      db.runtime[stUser.id] = {
        running: false,
        updated_at: new Date().toISOString()
      };
      writeMockDb(db);
      return { ok: true, mode: 'mock', stopped: true };
    }

    if (endpointName === 'analyze' && method === 'POST') {
      var aUser = sessionUserByToken(db, sessionToken);
      if (!aUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var report = {
        ts: new Date().toISOString(),
        summary: '최근 거래 기준 진입 필터 강화 권장',
        details: {
          win_rate: 0.61,
          avg_return_pct: 0.019,
          drawdown_pct: 0.028,
          feedback: [
            '급등 직후 추격 진입 제한',
            '뉴스 가중치 상향 조정',
            '연속 손실 2회 이후 휴식 모드'
          ]
        }
      };
      db.reports[aUser.id] = db.reports[aUser.id] || [];
      db.reports[aUser.id].push(report);
      writeMockDb(db);
      return { ok: true, mode: 'mock', report: report };
    }

    if (endpointName === 'reportLatest' && method === 'GET') {
      var rUser = sessionUserByToken(db, sessionToken);
      if (!rUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var reports = db.reports[rUser.id] || [];
      return {
        ok: true,
        mode: 'mock',
        report: reports.length ? reports[reports.length - 1] : null
      };
    }

    throw new Error('지원하지 않는 요청입니다: ' + endpointName);
  }

  function endpointMap() {
    var cfg = window.APP_CONFIG || {};
    return Object.assign(
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
  }

  async function callApi(endpointName, method, body, options) {
    var opts = options || {};
    var currentSettings = loadSettings();
    var currentSession = loadSession();
    var apiBase = String(opts.apiBase || currentSettings.apiBase || '').trim();

    if (!apiBase) {
      return mockRequest(endpointName, method, body || {}, currentSession.token);
    }

    var map = endpointMap();
    var endpoint = map[endpointName];
    if (!endpoint) {
      throw new Error('등록되지 않은 endpoint: ' + endpointName);
    }

    var url = apiBase.replace(/\/+$/, '') + endpoint;
    var headers = { 'Content-Type': 'application/json' };

    if (opts.withAuth !== false && currentSession.token) {
      headers.Authorization = 'Bearer ' + currentSession.token;
    }
    if (currentSettings.apiToken) {
      headers['X-Portal-Token'] = currentSettings.apiToken;
    }

    var response = await fetch(url, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    });

    var raw = await response.text();
    var data = raw;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (_err) {
      // keep text response
    }

    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ' ' + response.statusText + ' | ' + (typeof data === 'string' ? data : JSON.stringify(data)));
    }
    return data;
  }

  window.PortalCore = {
    defaults: defaults,
    normalizeAccount: normalizeAccount,
    normalizeBudget: normalizeBudget,
    loadSettings: loadSettings,
    saveSettings: saveSettings,
    loadSession: loadSession,
    saveSession: saveSession,
    clearSession: clearSession,
    callApi: callApi
  };
})();
