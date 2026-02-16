(function () {
  'use strict';

  const STORAGE_KEY = 'systemtrading.dashboard.settings.v1';

  const refs = {
    apiBase: document.getElementById('apiBase'),
    apiToken: document.getElementById('apiToken'),
    apiStatus: document.getElementById('apiStatus'),
    accountNo: document.getElementById('accountNo'),
    apiKey: document.getElementById('apiKey'),
    apiSecret: document.getElementById('apiSecret'),
    telegramToken: document.getElementById('telegramToken'),
    telegramChatId: document.getElementById('telegramChatId'),
    orderBudget: document.getElementById('orderBudget'),
    autoSelect: document.getElementById('autoSelect'),
    dryRun: document.getElementById('dryRun'),
    settingsForm: document.getElementById('settingsForm'),
    btnCheckApi: document.getElementById('btnCheckApi'),
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
      start: '/api/trading/start',
      stop: '/api/trading/stop',
      analyze: '/api/trading/analyze',
      reportLatest: '/api/trading/report/latest'
    },
    cfg.endpoints || {}
  );

  function now() {
    return new Date().toLocaleString('ko-KR');
  }

  function appendLog(title, payload) {
    const text = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    refs.resultBox.textContent = `[${now()}] ${title}\n${text}`;
  }

  function readSettings() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    try {
      return JSON.parse(raw);
    } catch (_err) {
      return {};
    }
  }

  function clampBudget(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 10000) {
      return 10000;
    }
    return Math.min(parsed, 2000000);
  }

  function collectSettings() {
    const budget = clampBudget(refs.orderBudget.value);
    refs.orderBudget.value = String(budget);

    return {
      apiBase: refs.apiBase.value.trim(),
      apiToken: refs.apiToken.value.trim(),
      accountNo: refs.accountNo.value.trim(),
      apiKey: refs.apiKey.value.trim(),
      apiSecret: refs.apiSecret.value.trim(),
      telegramToken: refs.telegramToken.value.trim(),
      telegramChatId: refs.telegramChatId.value.trim(),
      orderBudget: budget,
      autoSelect: refs.autoSelect.value === 'true',
      dryRun: refs.dryRun.value === 'true'
    };
  }

  function applySettings(s) {
    refs.apiBase.value = s.apiBase || cfg.defaultApiBase || '';
    refs.apiToken.value = s.apiToken || '';
    refs.accountNo.value = s.accountNo || '';
    refs.apiKey.value = s.apiKey || '';
    refs.apiSecret.value = s.apiSecret || '';
    refs.telegramToken.value = s.telegramToken || '';
    refs.telegramChatId.value = s.telegramChatId || '';
    refs.orderBudget.value = String(clampBudget(s.orderBudget || 2000000));
    refs.autoSelect.value = String(Boolean(s.autoSelect));
    refs.dryRun.value = String(Boolean(s.dryRun));
  }

  async function callApi(endpoint, method, body) {
    const settings = collectSettings();
    if (!settings.apiBase) {
      throw new Error('API Base URL이 비어 있습니다. 백엔드 URL을 먼저 입력하세요.');
    }

    const url = settings.apiBase.replace(/\/+$/, '') + endpoint;
    const headers = { 'Content-Type': 'application/json' };
    if (settings.apiToken) {
      headers.Authorization = `Bearer ${settings.apiToken}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });

    const text = await response.text();
    let data = text;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (_err) {
      // keep text response as-is
    }

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText} | ${typeof data === 'string' ? data : JSON.stringify(data)}`);
    }

    return data;
  }

  function tradingPayload() {
    const settings = collectSettings();
    return {
      account_no: settings.accountNo,
      broker_api_key: settings.apiKey,
      broker_api_secret: settings.apiSecret,
      telegram_bot_token: settings.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      max_order_amount_krw: settings.orderBudget,
      auto_select_top_candidate: settings.autoSelect,
      dry_run: settings.dryRun
    };
  }

  refs.settingsForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const settings = collectSettings();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    appendLog('설정을 저장했습니다.', settings);
  });

  refs.btnCheckApi.addEventListener('click', async function () {
    refs.apiStatus.textContent = '확인 중...';
    try {
      const data = await callApi(endpoints.health, 'GET');
      refs.apiStatus.textContent = '정상';
      appendLog('API 연결 성공', data);
    } catch (err) {
      refs.apiStatus.textContent = '실패';
      appendLog('API 연결 실패', String(err.message || err));
    }
  });

  refs.btnStart.addEventListener('click', async function () {
    try {
      const payload = tradingPayload();
      if (!payload.account_no) {
        throw new Error('계좌번호를 입력하세요.');
      }
      const data = await callApi(endpoints.start, 'POST', payload);
      appendLog('자동매매 시작 요청 완료', data);
    } catch (err) {
      appendLog('자동매매 시작 실패', String(err.message || err));
    }
  });

  refs.btnStop.addEventListener('click', async function () {
    try {
      const data = await callApi(endpoints.stop, 'POST', {});
      appendLog('자동매매 중지 요청 완료', data);
    } catch (err) {
      appendLog('자동매매 중지 실패', String(err.message || err));
    }
  });

  refs.btnAnalyze.addEventListener('click', async function () {
    try {
      const data = await callApi(endpoints.analyze, 'POST', { trigger: 'manual' });
      appendLog('매매일지 분석 요청 완료', data);
    } catch (err) {
      appendLog('매매일지 분석 실패', String(err.message || err));
    }
  });

  refs.btnLoadReport.addEventListener('click', async function () {
    try {
      const data = await callApi(endpoints.reportLatest, 'GET');
      appendLog('최근 분석 리포트', data);
    } catch (err) {
      appendLog('리포트 조회 실패', String(err.message || err));
    }
  });

  applySettings(readSettings());
  appendLog('대시보드 준비 완료', 'API URL 입력 후 연결 확인을 눌러주세요.');
})();
