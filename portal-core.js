(function () {
  'use strict';

  var SETTINGS_KEY = 'systemtrading.settings.v6';
  var SESSION_KEY = 'systemtrading.session.v6';
  var MOCK_KEY = 'systemtrading.mockdb.v3';
  var ADMIN_EMAILS = ['dufltptkd01@naver.com'];

  function defaults() {
    return {
      apiBase: '',
      apiToken: '',
      accountNo: '8120-0764',

      stockSymbol: '005930',
      stockBudget: 2000000,
      stockAutoSelect: true,
      holdingPeriod: 'day',
      stockDryRun: true,
      dailyMaxLoss: 300000,
      dailyMaxTrades: 8,
      maxConsecutiveLosses: 3,
      marketCrashStopPct: 3,
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

  function normalizeInt(raw, min, max, fallback) {
    var parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    parsed = Math.round(parsed);
    if (parsed < min) {
      return min;
    }
    if (parsed > max) {
      return max;
    }
    return parsed;
  }

  function normalizePercent(raw, min, max, fallback) {
    var parsed = Number(raw);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    if (parsed < min) {
      return min;
    }
    if (parsed > max) {
      return max;
    }
    return Math.round(parsed * 10) / 10;
  }

  function normalizeHoldingPeriod(raw) {
    var next = String(raw || '').toLowerCase();
    if (next === 'scalp' || next === 'day' || next === 'swing') {
      return next;
    }
    return 'day';
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

  function parseIsoMs(isoText) {
    if (!isoText) {
      return 0;
    }
    var ms = Date.parse(String(isoText));
    return Number.isFinite(ms) ? ms : 0;
  }

  function msToIso(ms) {
    return new Date(ms).toISOString();
  }

  function ceilDayDiff(targetMs, nowMs) {
    var diff = targetMs - nowMs;
    if (diff <= 0) {
      return 0;
    }
    return Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  function computeBilling(user) {
    var now = Date.now();

    var createdMs = parseIsoMs(user.created_at) || now;
    var trialStartMs = parseIsoMs(user.trial_start_at) || createdMs;
    var trialEndMs = parseIsoMs(user.trial_end_at);
    if (!trialEndMs) {
      trialEndMs = trialStartMs + (7 * 24 * 60 * 60 * 1000);
    }

    var subscriptionEndMs = parseIsoMs(user.subscription_end_at);
    var trialActive = now <= trialEndMs;
    var subscriptionActive = subscriptionEndMs > now;
    var canTrade = trialActive || subscriptionActive;

    var state = '결제 필요';
    if (subscriptionActive) {
      state = '구독 활성';
    } else if (trialActive) {
      state = '무료체험 진행중';
    } else {
      state = '무료체험 만료';
    }

    var remainingDays = 0;
    if (subscriptionActive) {
      remainingDays = ceilDayDiff(subscriptionEndMs, now);
    } else if (trialActive) {
      remainingDays = ceilDayDiff(trialEndMs, now);
    }

    return {
      state: state,
      can_trade: canTrade,
      trial_active: trialActive,
      trial_start_at: msToIso(trialStartMs),
      trial_end_at: msToIso(trialEndMs),
      subscription_active: subscriptionActive,
      subscription_end_at: subscriptionEndMs ? msToIso(subscriptionEndMs) : '',
      remaining_days: remainingDays
    };
  }

  function loadSettings() {
    try {
      var parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
      var merged = Object.assign(defaults(), parsed || {});
      merged.accountNo = normalizeAccount(merged.accountNo);
      merged.stockBudget = normalizeBudget(merged.stockBudget);
      merged.coinBudget = normalizeBudget(merged.coinBudget);
      merged.holdingPeriod = normalizeHoldingPeriod(merged.holdingPeriod);
      merged.dailyMaxLoss = normalizeInt(merged.dailyMaxLoss, 10000, 50000000, 300000);
      merged.dailyMaxTrades = normalizeInt(merged.dailyMaxTrades, 1, 100, 8);
      merged.maxConsecutiveLosses = normalizeInt(merged.maxConsecutiveLosses, 1, 20, 3);
      merged.marketCrashStopPct = normalizePercent(merged.marketCrashStopPct, 1, 20, 3);
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
    merged.holdingPeriod = normalizeHoldingPeriod(merged.holdingPeriod);
    merged.dailyMaxLoss = normalizeInt(merged.dailyMaxLoss, 10000, 50000000, 300000);
    merged.dailyMaxTrades = normalizeInt(merged.dailyMaxTrades, 1, 100, 8);
    merged.maxConsecutiveLosses = normalizeInt(merged.maxConsecutiveLosses, 1, 20, 3);
    merged.marketCrashStopPct = normalizePercent(merged.marketCrashStopPct, 1, 20, 3);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
    return merged;
  }

  function loadSession() {
    try {
      var parsed = JSON.parse(localStorage.getItem(SESSION_KEY) || '{}');
      return {
        token: String(parsed.token || ''),
        user: parsed.user || null,
        verified: Boolean(parsed.verified),
        billing: parsed.billing || null
      };
    } catch (_err) {
      return { token: '', user: null, verified: false, billing: null };
    }
  }

  function saveSession(session) {
    var payload = {
      token: String((session && session.token) || ''),
      user: (session && session.user) || null,
      verified: Boolean(session && session.verified),
      billing: (session && session.billing) || null
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(payload));
    return payload;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    return { token: '', user: null, verified: false, billing: null };
  }

  function normalizeEmail(raw) {
    return String(raw || '').trim().toLowerCase();
  }

  function isAdminEmail(email) {
    var normalized = normalizeEmail(email);
    return ADMIN_EMAILS.indexOf(normalized) >= 0;
  }

  function syncAdminRoles(db) {
    var dirty = false;
    db.users.forEach(function (u) {
      var next = isAdminEmail(u.email);
      if (Boolean(u.is_admin) !== next) {
        u.is_admin = next;
        dirty = true;
      }
    });
    return dirty;
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
      if (!parsed.checkout || typeof parsed.checkout !== 'object') {
        parsed.checkout = {};
      }
      if (syncAdminRoles(parsed)) {
        localStorage.setItem(MOCK_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch (_err) {
      return { users: [], tokens: {}, pending: {}, reports: {}, runtime: {}, checkout: {} };
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

  function userPublic(user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      is_admin: Boolean(user.is_admin),
      verified: user.verified,
      created_at: user.created_at
    };
  }

  function toBase64Utf8(text) {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (_err) {
      return btoa(text);
    }
  }

  function encryptSecret(raw, userId) {
    return 'enc_' + toBase64Utf8(String(userId) + '::' + String(raw || ''));
  }

  function mockRequest(endpointName, method, body, sessionToken) {
    var db = readMockDb();

    if (endpointName === 'health') {
      var settings = loadSettings();
      var hasCredential = Boolean(
        (body && body.has_credentials) ||
        settings.kiwoomApiKey ||
        settings.binanceApiKey ||
        settings.upbitApiKey
      );
      return {
        ok: true,
        mode: 'mock',
        checked_at: new Date().toISOString(),
        api_key_valid: hasCredential,
        balance_available: hasCredential,
        order_permission: hasCredential,
        ip_restricted: false
      };
    }

    if (endpointName === 'storeCredentials' && method === 'POST') {
      var scUser = sessionUserByToken(db, sessionToken);
      if (!scUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var creds = (body && body.credentials) || {};
      var encrypted = {};
      Object.keys(creds).forEach(function (key) {
        var value = String(creds[key] || '').trim();
        if (value) {
          encrypted[key] = encryptSecret(value, scUser.id);
        }
      });
      db.runtime[scUser.id] = db.runtime[scUser.id] || {};
      db.runtime[scUser.id].credential_vault = {
        updated_at: new Date().toISOString(),
        encrypted: encrypted
      };
      writeMockDb(db);
      return {
        ok: true,
        mode: 'mock',
        stored: true,
        count: Object.keys(encrypted).length
      };
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

      var nowIso = new Date().toISOString();
      var user = {
        id: Date.now(),
        email: email,
        password: password,
        name: name,
        phone: phone,
        is_admin: isAdminEmail(email),
        verified: false,
        created_at: nowIso,
        trial_start_at: nowIso,
        trial_end_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        subscription_end_at: ''
      };
      db.users.push(user);

      var token = issueToken(user.id);
      db.tokens[token] = user.id;
      writeMockDb(db);

      return {
        access_token: token,
        user: userPublic(user),
        billing: computeBilling(user)
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
      found.is_admin = isAdminEmail(found.email);
      var loginToken = issueToken(found.id);
      db.tokens[loginToken] = found.id;
      writeMockDb(db);
      return {
        access_token: loginToken,
        user: userPublic(found),
        billing: computeBilling(found)
      };
    }

    if (endpointName === 'me' && method === 'GET') {
      var meUser = sessionUserByToken(db, sessionToken);
      if (!meUser) {
        throw new Error('인증이 필요합니다.');
      }
      return {
        user: userPublic(meUser),
        billing: computeBilling(meUser)
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
        user: userPublic(cUser),
        billing: computeBilling(cUser)
      };
    }

    if (endpointName === 'billingStatus' && method === 'GET') {
      var bUser = sessionUserByToken(db, sessionToken);
      if (!bUser) {
        throw new Error('로그인이 필요합니다.');
      }
      return {
        ok: true,
        mode: 'mock',
        billing: computeBilling(bUser)
      };
    }

    if (endpointName === 'billingCheckout' && method === 'POST') {
      var bcUser = sessionUserByToken(db, sessionToken);
      if (!bcUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var checkoutId = 'chk_' + bcUser.id + '_' + Date.now();
      db.checkout[bcUser.id] = {
        checkout_id: checkoutId,
        plan: String((body && body.plan) || 'monthly'),
        amount_krw: 39000,
        created_at: new Date().toISOString(),
        status: 'pending'
      };
      writeMockDb(db);
      return {
        ok: true,
        mode: 'mock',
        checkout: db.checkout[bcUser.id],
        message: '데모 결제창이 생성되었습니다. 결제 완료 처리 버튼을 눌러 다음 단계로 진행하세요.'
      };
    }

    if (endpointName === 'billingConfirm' && method === 'POST') {
      var cfUser = sessionUserByToken(db, sessionToken);
      if (!cfUser) {
        throw new Error('로그인이 필요합니다.');
      }
      var now = Date.now();
      var currentEnd = parseIsoMs(cfUser.subscription_end_at);
      var baseMs = currentEnd > now ? currentEnd : now;
      var newEnd = baseMs + 30 * 24 * 60 * 60 * 1000;
      cfUser.subscription_end_at = msToIso(newEnd);

      if (db.checkout[cfUser.id]) {
        db.checkout[cfUser.id].status = 'paid';
        db.checkout[cfUser.id].paid_at = new Date().toISOString();
      }

      writeMockDb(db);
      return {
        ok: true,
        mode: 'mock',
        billing: computeBilling(cfUser),
        message: '결제가 완료되어 구독권이 활성화되었습니다.'
      };
    }

    if (endpointName === 'adminUsers' && method === 'GET') {
      var adminUser = sessionUserByToken(db, sessionToken);
      if (!adminUser) {
        throw new Error('로그인이 필요합니다.');
      }
      if (!isAdminEmail(adminUser.email)) {
        throw new Error('관리자 권한이 필요합니다.');
      }
      return {
        ok: true,
        mode: 'mock',
        users: db.users.map(function (u) {
          return {
            id: u.id,
            email: u.email,
            name: u.name,
            verified: u.verified,
            created_at: u.created_at,
            trial_end_at: u.trial_end_at,
            subscription_end_at: u.subscription_end_at,
            billing: computeBilling(u)
          };
        })
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

      var billing = computeBilling(sUser);
      if (!billing.can_trade) {
        throw new Error('무료체험 7일이 종료되었습니다. 자동매매를 계속하려면 구독권 결제가 필요합니다.');
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
          dry_run: body.dry_run,
          holding_period: body.holding_period,
          risk_limits: body.risk_limits || {},
          recommendation: body.recommendation || null,
          strategy_profile: body.strategy_profile || null,
          engine_pipeline: body.engine_pipeline || null
        }
      });
      writeMockDb(db);

      return {
        ok: true,
        mode: 'mock',
        started: true,
        market: body.market_type,
        exchange: body.exchange,
        symbol: body.symbol,
        billing: billing
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
          total_pnl_krw: 126000,
          max_drawdown_pct: 0.043,
          recommendation_score_avg: 78,
          recommendation_basis: ['뉴스 긍정 신호', '거래량 증가', 'RSI 조건 충족'],
          latest_news_summary: '반도체 업황 회복 기대감과 수급 유입이 동반되었습니다.',
          indicator_snapshot: {
            rsi: 34,
            ma_short: 102.3,
            ma_long: 97.9,
            volume_growth_pct: 66
          },
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
        billingStatus: '/api/billing/status',
        billingCheckout: '/api/billing/checkout',
        billingConfirm: '/api/billing/confirm',
        storeCredentials: '/api/credentials/store',
        adminUsers: '/api/admin/users',
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
    if (opts.apiToken) {
      headers['X-Portal-Token'] = String(opts.apiToken);
    } else if (currentSettings.apiToken) {
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
