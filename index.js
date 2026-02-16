(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }

  var LANG_KEY = 'systemtrading.ui.lang.v1';
  var ADMIN_EMAIL = 'dufltptkd01@naver.com';
  var EN = {
    'meta.title': 'SystemTrading Premier',
    'brand.name': 'STP',
    'aria.menu_toggle': 'Open menu',
    'aria.home': 'Home',
    'nav.guide': 'How To Use',
    'nav.intro': 'System',
    'nav.stock': 'Stock',
    'nav.coin': 'Crypto',
    'nav.billing': 'Billing',
    'nav.admin': 'Admin',
    'auth.signup': 'Sign Up',
    'auth.login': 'Log In',
    'auth.logout': 'Log Out',
    'hero.kicker': 'AI ASSET ORCHESTRATION',
    'hero.title.a': 'Spend Less Time Deciding',
    'hero.title.b': 'Execute With More Precision',
    'hero.sub': 'Connect news, indicators, chart patterns, and execution logs into one workflow.',
    'hero.cta_trial': 'Start 7-Day Free Trial',
    'hero.cta_billing': 'View Plan & Billing',
    'hero.point.1': 'Multi-source candidate ranking',
    'hero.point.2': 'Pick 1 from top 10 candidates',
    'hero.point.3': 'Real-time Telegram fills',
    'hero.card.1.label': 'Strategy Loop',
    'hero.card.1.value': 'Collect -> Rank -> Execute -> Improve',
    'hero.card.2.label': 'Risk Limit',
    'hero.card.2.value': 'Max KRW 2,000,000 per order',
    'hero.card.3.label': 'Market Coverage',
    'hero.card.3.value': 'KR Stocks + Global Crypto',
    'status.login_label': 'Account',
    'status.verify_label': 'KYC',
    'status.api_label': 'API',
    'status.mode_label': 'Mode',
    'status.subscription_label': 'Subscription',
    'shortcut.title': 'Quick Access',
    'shortcut.guide': 'Open Guide',
    'shortcut.stock': 'Stock Setup',
    'shortcut.coin': 'Crypto Setup',
    'shortcut.intro': 'System Overview',
    'guide.title': 'How To Use',
    'guide.lead': 'Follow these steps to launch auto-trading quickly.',
    'guide.step.1': 'Create an account and log in.',
    'guide.step.2': 'Complete identity verification.',
    'guide.step.3': 'Save API keys and budget in Stock/Crypto tabs.',
    'guide.step.4': 'Check execution mode and start auto-trading.',
    'guide.step.5': 'Track fills through Telegram and reports.',
    'guide.stock.title': 'Start Stock Trading',
    'guide.stock.step.1': 'Enter account number and Kiwoom credentials.',
    'guide.stock.step.2': 'Enter Telegram Bot Token and Chat ID.',
    'guide.stock.step.3': 'Auto-select picks 1 from top 10 candidates.',
    'guide.stock.step.4': 'Click Start Stock Auto-Trading.',
    'guide.stock.cta': 'Go to Stock Tab',
    'guide.coin.title': 'Start Crypto Trading',
    'guide.coin.step.1': 'Choose Binance or Upbit.',
    'guide.coin.step.2': 'Set exchange keys, budget, and symbol.',
    'guide.coin.step.3': 'Validate in simulation first.',
    'guide.coin.step.4': 'Click Start Crypto Auto-Trading.',
    'guide.coin.cta': 'Go to Crypto Tab',
    'intro.title': 'System Overview',
    'intro.lead': 'A continuous loop improves strategy quality over time.',
    'intro.flow.1.title': '1. Data Collection',
    'intro.flow.1.body': 'Evaluate news, indicators, volume and chart patterns together.',
    'intro.flow.2.title': '2. Candidate Compression',
    'intro.flow.2.body': 'Filter top 10 opportunities, then focus on one.',
    'intro.flow.3.title': '3. Execution & Alert',
    'intro.flow.3.body': 'Fill alerts are delivered to Telegram with risk rules.',
    'intro.flow.4.title': '4. Review & Improve',
    'intro.flow.4.body': 'Analyze outcomes and apply improvements to next sessions.',
    'intro.feedback.title': 'Trade Journal Feedback Loop',
    'intro.feedback.1.title': 'Capture Fills',
    'intro.feedback.1.body': 'Record rationale, execution price, volume, and pnl automatically.',
    'intro.feedback.2.title': 'Analyze Performance',
    'intro.feedback.2.body': 'Extract optimization points from win-rate and volatility response.',
    'intro.feedback.3.title': 'Apply Improvements',
    'intro.feedback.3.body': 'Update ranking weights, entry filters, and risk limits.',
    'intro.cta.stock': 'Stock Setup',
    'intro.cta.coin': 'Crypto Setup',
    'intro.cta.billing': 'Billing Tab',
    'stock.title': 'Stock Trading Setup',
    'stock.api_base': 'Backend API Base URL',
    'stock.api_token': 'Static API Token (Optional)',
    'stock.account': 'Account Number',
    'stock.symbol': 'Stock Symbol',
    'stock.budget': 'Max Amount per Order (KRW)',
    'stock.auto_select': 'Auto Candidate Select',
    'stock.mode': 'Execution Mode',
    'stock.mode.sim_option': 'Simulation (No real order)',
    'stock.mode.live_option': 'Live Trading (Real order)',
    'stock.mode.help': 'Simulation is for validation. Live mode sends real orders.',
    'stock.kiwoom_key': 'Kiwoom API Key',
    'stock.kiwoom_secret': 'Kiwoom API Secret',
    'stock.telegram_token': 'Telegram Bot Token',
    'stock.telegram_chat': 'Telegram Chat ID',
    'stock.save': 'Save Stock Settings',
    'stock.start': 'Start Stock Auto-Trading',
    'stock.side.title': 'Security / Runtime',
    'stock.side.note': 'Complete login and verification before starting.',
    'stock.api_check': 'Check API Connectivity',
    'stock.verify_start': 'Start Verification',
    'stock.verify_refresh': 'Refresh Verification',
    'stock.verify_code': 'Verification Code',
    'stock.verify_submit': 'Submit Code',
    'stock.verify_hint': 'In demo mode, you can test the full flow with temporary code.',
    'coin.title': 'Crypto Trading Setup',
    'coin.exchange': 'Exchange',
    'coin.symbol': 'Symbol',
    'coin.budget': 'Max Amount per Order (KRW)',
    'coin.auto_select': 'Auto Symbol Select',
    'coin.mode': 'Execution Mode',
    'coin.mode.sim_option': 'Simulation (No real order)',
    'coin.mode.live_option': 'Live Trading (Real order)',
    'coin.mode.help': 'Simulation runs without real exchange orders.',
    'coin.binance_key': 'Binance API Key',
    'coin.binance_secret': 'Binance API Secret',
    'coin.upbit_key': 'Upbit Access Key',
    'coin.upbit_secret': 'Upbit Secret Key',
    'coin.save': 'Save Crypto Settings',
    'coin.start': 'Start Crypto Auto-Trading',
    'coin.side.title': 'Auto-Trading Operations',
    'coin.stop': 'Stop Auto-Trading',
    'coin.analyze': 'Run Journal Analysis',
    'coin.report': 'Load Latest Report',
    'coin.guard': 'Before run: Login + KYC + Subscription + API check required.',
    'billing.title': 'Plan & Billing',
    'billing.lead': 'After signup, auto-trading is free for 7 days. Subscription is required after trial.',
    'billing.state': 'Billing State',
    'billing.trial_end': 'Trial End Date',
    'billing.sub_end': 'Subscription End Date',
    'billing.remain': 'Days Remaining',
    'billing.checkout': 'Start Monthly Checkout',
    'billing.confirm': 'Confirm Payment (Demo)',
    'billing.refresh': 'Refresh Billing',
    'billing.note': 'In production, update subscription after verified payment webhook.',
    'billing.admin_hint': 'Operator member management is available in the Admin menu after admin login.',
    'billing.manage_title': 'Member Data Management',
    'billing.manage.1': 'Store profile, verification, and subscription data separately.',
    'billing.manage.2': 'Hash passwords and encrypt API credentials.',
    'billing.manage.3': 'Provide admin tools for search, renewal, and payment history.',
    'billing.export': 'Load Demo Users',
    'billing.export_default': 'Click to load member data.',
    'admin.table.id': 'ID',
    'admin.table.email': 'Email',
    'admin.table.name': 'Name',
    'admin.table.verified': 'Verified',
    'admin.table.billing': 'Billing State',
    'admin.table.can_trade': 'Auto-Trading',
    'admin.table.created': 'Created At',
    'admin.table.trial_end': 'Trial Ends',
    'admin.table.sub_end': 'Subscription Ends',
    'admin.table.no_users': 'No member data found.',
    'admin.title': 'Admin Member Management',
    'admin.lead': 'Only administrator accounts can view member data.',
    'admin.notice': 'Demo admin account: dufltptkd01@naver.com',
    'admin.access_denied': 'Admin access only',
    'result.title': 'Execution Logs',
    'result.default': 'Logs will appear after API calls or actions.',
    'tip.api_base': 'Your backend server URL. Empty means demo mode; set URL for real API requests.',
    'tip.telegram_chat': 'Target chat ID for order alerts (private/group chat).',
    'tip.api_base.aria': 'API Base URL help',
    'tip.telegram_chat.aria': 'Telegram Chat ID help',
    'ph.api_base': 'https://api.example.com',
    'ph.api_token': 'Bearer token',
    'ph.account': '8120-0764',
    'ph.stock_symbol': '005930',
    'ph.verify_code': '6-digit code',
    'ph.coin_symbol': 'BTC/USDT or BTC/KRW',
    'ph.kiwoom_key': 'Kiwoom API Key',
    'ph.kiwoom_secret': 'Kiwoom API Secret',
    'ph.telegram_token': 'Telegram Bot Token',
    'ph.telegram_chat': 'Telegram Chat ID',
    'ph.binance_key': 'Binance API Key',
    'ph.binance_secret': 'Binance API Secret',
    'ph.upbit_key': 'Upbit Access Key',
    'ph.upbit_secret': 'Upbit Secret Key',
    'auth.user': 'Signed-in User',
    'mode.sim': 'Simulation',
    'mode.live': 'Live Trading',
    'label.yes': 'Yes',
    'label.no': 'No',
    'status.badge.logged_out': 'Logged Out',
    'status.badge.verified': 'Verified',
    'status.badge.unverified': 'Not Verified',
    'status.badge.demo': 'Demo',
    'status.badge.live_ok': 'Live Connected',
    'status.badge.live_pending': 'Live Pending',
    'billing.state.trial': 'Trial Active',
    'billing.state.subscribed': 'Subscription Active',
    'billing.state.expired': 'Trial Expired',
    'billing.state.need_payment': 'Payment Required',
    'billing.state.need_login': 'Login Required',
    'billing.state.need_check': 'Check Required',
    'billing.state.trading_enabled': 'Auto-Trading Enabled',
    'billing.state.trading_disabled': 'Auto-Trading Disabled',
    'check.login': 'Login required',
    'check.verify': 'Verification required',
    'check.plan': 'Subscription required',
    'check.api': 'API connectivity check required',
    'check.account': 'Account number required',
    'check.stock_symbol': 'Stock symbol required',
    'check.coin_symbol': 'Crypto symbol required',
    'guard.prefix': 'Pre-run checks',
    'guard.ready': 'Ready. You can start auto-trading now.',
    'stock.verify_sent': 'Verification code was sent.',
    'log.need_login_first': 'Please log in first.',
    'log.session_fail': 'Session refresh failed',
    'log.billing_ok': 'Billing status loaded',
    'log.billing_fail': 'Failed to load billing status',
    'log.verify_start_ok': 'Verification started',
    'log.verify_start_fail': 'Failed to start verification',
    'log.verify_done_ok': 'Verification completed',
    'log.verify_done_fail': 'Failed to submit verification code',
    'log.api_ok': 'API connectivity verified',
    'log.api_fail': 'API connectivity failed',
    'log.stock_start_ok': 'Stock auto-trading start request sent',
    'log.stock_start_fail': 'Failed to start stock auto-trading',
    'log.coin_start_ok': 'Crypto auto-trading start request sent',
    'log.coin_start_fail': 'Failed to start crypto auto-trading',
    'log.stop_ok': 'Auto-trading stop request sent',
    'log.stop_fail': 'Failed to stop auto-trading',
    'log.analyze_ok': 'Journal analysis completed',
    'log.analyze_fail': 'Journal analysis failed',
    'log.report_ok': 'Latest analysis report',
    'log.report_fail': 'Failed to load report',
    'log.checkout_ok': 'Subscription checkout started',
    'log.checkout_fail': 'Failed to start checkout',
    'log.confirm_ok': 'Payment confirmation completed',
    'log.confirm_fail': 'Payment confirmation failed',
    'log.users_ok': 'Demo user data loaded',
    'log.users_fail': 'Failed to load user data',
    'log.admin_required': 'Admin account required',
    'log.logout.title': 'Logged out',
    'log.logout.body': 'Your session has been cleared.',
    'log.trial_info.title': 'Trial info',
    'log.trial_info.body': 'During the 7-day trial, auto-trading can be started immediately.',
    'log.stock_saved': 'Stock settings saved',
    'log.coin_saved': 'Crypto settings saved',
    'log.dashboard_ready.title': 'Dashboard ready',
    'log.dashboard_ready.body': 'Start the 7-day trial from Home, then configure and run auto-trading.'
  };

  var refs = {
    heroNav: document.querySelector('.hero-nav'),
    menuToggle: document.getElementById('menuToggle'),
    menuPanel: document.getElementById('menuPanel'),
    brandHome: document.getElementById('brandHome'),
    btnLangKo: document.getElementById('btnLangKo'),
    btnLangEn: document.getElementById('btnLangEn'),
    navPills: Array.from(document.querySelectorAll('.nav-pill[data-tab]')),
    tabs: {
      home: document.getElementById('tab-home'),
      guide: document.getElementById('tab-guide'),
      intro: document.getElementById('tab-intro'),
      stock: document.getElementById('tab-stock'),
      coin: document.getElementById('tab-coin'),
      billing: document.getElementById('tab-billing'),
      admin: document.getElementById('tab-admin')
    },
    navAdmin: document.getElementById('navAdmin'),

    btnTrial: document.getElementById('btnTrial'),
    btnGotoBilling: document.getElementById('btnGotoBilling'),
    btnGotoGuide: document.getElementById('btnGotoGuide'),
    btnGotoStock: document.getElementById('btnGotoStock'),
    btnGotoCoin: document.getElementById('btnGotoCoin'),
    btnGotoIntro: document.getElementById('btnGotoIntro'),
    btnGuideToStock: document.getElementById('btnGuideToStock'),
    btnGuideToCoin: document.getElementById('btnGuideToCoin'),
    btnMoveStock: document.getElementById('btnMoveStock'),
    btnMoveCoin: document.getElementById('btnMoveCoin'),
    btnMoveBilling: document.getElementById('btnMoveBilling'),

    linkSignup: document.getElementById('linkSignup'),
    linkLogin: document.getElementById('linkLogin'),
    btnLogout: document.getElementById('btnLogout'),
    authUserChip: document.getElementById('authUserChip'),

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
    userTableBody: document.getElementById('userTableBody'),

    resultBox: document.getElementById('resultBox')
  };

  var state = {
    activeTab: 'home',
    apiChecked: false,
    checkoutId: '',
    menuOpen: false,
    lang: loadLanguage(),
    logs: [],
    adminUsers: [],
    adminUsersLoaded: false
  };

  function loadLanguage() {
    var stored = String(localStorage.getItem(LANG_KEY) || '').toLowerCase();
    if (stored === 'ko' || stored === 'en') {
      return stored;
    }
    return String(navigator.language || '').toLowerCase().indexOf('ko') === 0 ? 'ko' : 'en';
  }

  function setLanguage(lang) {
    if (lang !== 'ko' && lang !== 'en') {
      return;
    }
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    applyI18n();
    updateStatus();
    updateGuard();
    renderUserTable();
  }

  function trans(key, koText) {
    if (state.lang !== 'en') {
      return koText;
    }
    return EN[key] || koText;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'ko';
    document.title = trans('meta.title', 'SystemTrading Premier');

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var key = node.getAttribute('data-i18n');
      if (!node.dataset.koText) {
        node.dataset.koText = node.textContent;
      }
      if (state.lang === 'ko') {
        node.textContent = node.dataset.koText;
      } else {
        node.textContent = EN[key] || node.dataset.koText;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-placeholder');
      if (!node.dataset.koPlaceholder) {
        node.dataset.koPlaceholder = node.getAttribute('placeholder') || '';
      }
      if (state.lang === 'ko') {
        node.setAttribute('placeholder', node.dataset.koPlaceholder);
      } else {
        node.setAttribute('placeholder', EN[key] || node.dataset.koPlaceholder);
      }
    });

    document.querySelectorAll('[data-i18n-tip]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-tip');
      if (!node.dataset.koTip) {
        node.dataset.koTip = node.getAttribute('data-tip') || '';
      }
      node.setAttribute('data-tip', state.lang === 'ko' ? node.dataset.koTip : (EN[key] || node.dataset.koTip));
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(function (node) {
      var key = node.getAttribute('data-i18n-aria');
      if (!node.dataset.koAria) {
        node.dataset.koAria = node.getAttribute('aria-label') || '';
      }
      node.setAttribute('aria-label', state.lang === 'ko' ? node.dataset.koAria : (EN[key] || node.dataset.koAria));
    });

    if (refs.btnLangKo) {
      refs.btnLangKo.classList.toggle('active', state.lang === 'ko');
    }
    if (refs.btnLangEn) {
      refs.btnLangEn.classList.toggle('active', state.lang === 'en');
    }
  }

  function addLog(title, payload) {
    var body = typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2);
    var line = '[' + new Date().toLocaleString(state.lang === 'en' ? 'en-US' : 'ko-KR') + '] ' + title + '\n' + body;
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
    return parsed.toLocaleString(state.lang === 'en' ? 'en-US' : 'ko-KR');
  }

  function clearNode(node) {
    if (!node) {
      return;
    }
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function appendTableCell(row, value, className) {
    var cell = document.createElement('td');
    if (className) {
      cell.className = className;
    }
    cell.textContent = value;
    row.appendChild(cell);
    return cell;
  }

  function buildAdminPill(label, toneClass) {
    var pill = document.createElement('span');
    pill.className = 'admin-pill ' + toneClass;
    pill.textContent = label;
    return pill;
  }

  function renderAdminTableMessage(message) {
    if (!refs.userTableBody) {
      return;
    }
    clearNode(refs.userTableBody);
    var row = document.createElement('tr');
    var cell = document.createElement('td');
    cell.colSpan = 9;
    cell.className = 'admin-table-empty';
    cell.textContent = message;
    row.appendChild(cell);
    refs.userTableBody.appendChild(row);
  }

  function yesNoText(value) {
    return value ? trans('label.yes', '예') : trans('label.no', '아니오');
  }

  function renderUserTable() {
    if (!refs.userTableBody) {
      return;
    }
    if (!state.adminUsersLoaded) {
      renderAdminTableMessage(trans('billing.export_default', '관리 데이터를 불러오려면 버튼을 누르세요.'));
      return;
    }
    if (!Array.isArray(state.adminUsers) || state.adminUsers.length < 1) {
      renderAdminTableMessage(trans('admin.table.no_users', '조회된 회원이 없습니다.'));
      return;
    }

    clearNode(refs.userTableBody);
    state.adminUsers.forEach(function (user) {
      var row = document.createElement('tr');
      var billing = (user && user.billing) || {};
      var verified = Boolean(user && user.verified);
      var canTrade = Boolean(billing.can_trade);

      appendTableCell(row, String((user && user.id) || '-'), 'admin-cell-mono');
      appendTableCell(row, String((user && user.email) || '-'));
      appendTableCell(row, String((user && user.name) || '-'));

      var verifiedCell = document.createElement('td');
      verifiedCell.appendChild(buildAdminPill(yesNoText(verified), verified ? 'is-ok' : 'is-off'));
      row.appendChild(verifiedCell);

      appendTableCell(row, String(billing.state || '-'));

      var tradingCell = document.createElement('td');
      tradingCell.appendChild(buildAdminPill(yesNoText(canTrade), canTrade ? 'is-ok' : 'is-warn'));
      row.appendChild(tradingCell);

      appendTableCell(row, formatDateText(user && user.created_at));
      appendTableCell(row, formatDateText(billing.trial_end_at || (user && user.trial_end_at)));
      appendTableCell(row, formatDateText(billing.subscription_end_at || (user && user.subscription_end_at)));

      refs.userTableBody.appendChild(row);
    });
  }

  function modeLabel(isDryRun) {
    return isDryRun ? trans('mode.sim', '모의투자') : trans('mode.live', '실거래');
  }

  function isMobileViewport() {
    return window.matchMedia('(max-width: 1100px)').matches;
  }

  function setMenuOpen(open) {
    state.menuOpen = Boolean(open);
    if (refs.heroNav) {
      refs.heroNav.classList.toggle('menu-open', state.menuOpen);
    }
    if (refs.menuToggle) {
      refs.menuToggle.setAttribute('aria-expanded', state.menuOpen ? 'true' : 'false');
    }
  }

  function currentSession() {
    return core.loadSession();
  }

  function currentSettings() {
    return core.loadSettings();
  }

  function fixedApiBase() {
    var cfg = window.APP_CONFIG || {};
    return String(cfg.defaultApiBase || '').trim();
  }

  function normalizeEmail(raw) {
    return String(raw || '').trim().toLowerCase();
  }

  function isAdminUser(user) {
    if (!user) {
      return false;
    }
    if (Boolean(user.is_admin)) {
      return true;
    }
    return normalizeEmail(user.email) === ADMIN_EMAIL;
  }

  function renderAdminMenu(session) {
    var admin = isAdminUser(session && session.user);
    if (refs.navAdmin) {
      refs.navAdmin.hidden = !admin;
    }
    if (refs.tabs.admin) {
      refs.tabs.admin.hidden = !admin;
    }
    return admin;
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
    if (refs.apiBase) {
      refs.apiBase.value = fixedApiBase();
    }
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

    updateCoinCredentialFields();
  }

  function collectFormSettings() {
    var apiBase = fixedApiBase();
    return core.saveSettings({
      apiBase: apiBase,
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

  function updateCoinCredentialFields() {
    var exchange = refs.coinExchange ? refs.coinExchange.value : 'binance';
    var showBinance = exchange !== 'upbit';
    if (refs.coinForm) {
      refs.coinForm.setAttribute('data-exchange', showBinance ? 'binance' : 'upbit');
    }

    document.querySelectorAll('.coin-only-binance').forEach(function (node) {
      node.hidden = !showBinance;
      node.classList.toggle('is-hidden', !showBinance);
      if (node.tagName === 'INPUT') {
        node.disabled = !showBinance;
      }
    });

    document.querySelectorAll('.coin-only-upbit').forEach(function (node) {
      node.hidden = showBinance;
      node.classList.toggle('is-hidden', showBinance);
      if (node.tagName === 'INPUT') {
        node.disabled = showBinance;
      }
    });
  }

  function renderBilling(session, billing) {
    var billingStateMap = {
      '무료체험 진행중': trans('billing.state.trial', '무료체험 진행중'),
      '구독 활성': trans('billing.state.subscribed', '구독 활성'),
      '무료체험 만료': trans('billing.state.expired', '무료체험 만료'),
      '결제 필요': trans('billing.state.need_payment', '결제 필요')
    };

    if (!session.user) {
      setText(refs.billingStateText, trans('billing.state.need_login', '로그인 필요'));
      setText(refs.trialEndText, '-');
      setText(refs.subscriptionEndText, '-');
      setText(refs.billingRemainText, '-');
      setText(refs.subscriptionStateBadge, trans('billing.state.need_login', '로그인 필요'));
      return;
    }

    if (!billing) {
      setText(refs.billingStateText, trans('billing.state.need_check', '확인 필요'));
      setText(refs.trialEndText, '-');
      setText(refs.subscriptionEndText, '-');
      setText(refs.billingRemainText, '-');
      setText(refs.subscriptionStateBadge, trans('billing.state.need_check', '확인 필요'));
      return;
    }

    setText(refs.billingStateText, billingStateMap[billing.state] || billing.state || trans('billing.state.need_check', '확인 필요'));
    setText(refs.trialEndText, formatDateText(billing.trial_end_at));
    setText(refs.subscriptionEndText, formatDateText(billing.subscription_end_at));
    setText(
      refs.billingRemainText,
      Number.isFinite(Number(billing.remaining_days))
        ? (state.lang === 'en' ? (String(billing.remaining_days) + ' day(s)') : (String(billing.remaining_days) + '일'))
        : '-'
    );

    if (billing.can_trade) {
      setText(refs.subscriptionStateBadge, billingStateMap[billing.state] || billing.state || trans('billing.state.trading_enabled', '자동매매 가능'));
    } else {
      setText(refs.subscriptionStateBadge, trans('billing.state.trading_disabled', '자동매매 불가'));
    }
  }

  function renderAuthMenu(session) {
    var loggedIn = Boolean(session && session.user);

    if (refs.linkSignup) {
      refs.linkSignup.hidden = loggedIn;
    }
    if (refs.linkLogin) {
      refs.linkLogin.hidden = loggedIn;
    }
    if (refs.btnLogout) {
      refs.btnLogout.hidden = !loggedIn;
    }
    if (refs.authUserChip) {
      if (loggedIn) {
        refs.authUserChip.hidden = false;
        refs.authUserChip.textContent = session.user.email || session.user.name || trans('auth.user', '로그인 사용자');
      } else {
        refs.authUserChip.hidden = true;
        refs.authUserChip.textContent = '';
      }
    }
  }

  function updateStatus() {
    var session = currentSession();
    var settings = currentSettings();
    var billing = session.billing || null;

    renderAdminMenu(session);
    renderAuthMenu(session);
    setText(refs.authStateBadge, session.user ? (session.user.email || session.user.name || trans('auth.user', '로그인 사용자')) : trans('status.badge.logged_out', '미로그인'));
    setText(refs.verifyStateBadge, session.verified ? trans('status.badge.verified', '인증완료') : trans('status.badge.unverified', '미인증'));

    if (!settings.apiBase) {
      setText(refs.apiStateBadge, trans('status.badge.demo', 'Demo'));
    } else {
      setText(refs.apiStateBadge, state.apiChecked ? trans('status.badge.live_ok', 'Live 연결확인') : trans('status.badge.live_pending', 'Live 미확인'));
    }

    if (state.activeTab === 'coin') {
      setText(refs.activeModeBadge, modeLabel(settings.coinDryRun));
    } else {
      setText(refs.activeModeBadge, modeLabel(settings.stockDryRun));
    }

    renderBilling(session, billing);
  }

  function tabKeys() {
    return ['home', 'guide', 'intro', 'stock', 'coin', 'billing', 'admin'];
  }

  function setActiveTab(tab) {
    var key = tabKeys().indexOf(tab) >= 0 ? tab : 'home';
    if (key === 'admin' && !isAdminUser(currentSession().user)) {
      key = 'home';
    }
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

    if (state.menuOpen && isMobileViewport()) {
      setMenuOpen(false);
    }

    updateStatus();
    updateGuard();
  }

  function buildChecks(targetMarket) {
    var checks = [];
    var session = currentSession();
    var settings = currentSettings();
    var billing = session.billing || null;

    if (!session.user) {
      checks.push(trans('check.login', '로그인 필요'));
    }
    if (!session.verified) {
      checks.push(trans('check.verify', '본인인증 필요'));
    }
    if (session.user && (!billing || !billing.can_trade)) {
      checks.push(trans('check.plan', '이용권 필요'));
    }
    if (settings.apiBase && !state.apiChecked) {
      checks.push(trans('check.api', 'API 연결 확인 필요'));
    }

    if (targetMarket === 'stock') {
      if (!settings.accountNo) {
        checks.push(trans('check.account', '계좌번호 필요'));
      }
      if (!settings.stockAutoSelect && !settings.stockSymbol) {
        checks.push(trans('check.stock_symbol', '주식 종목코드 필요'));
      }
    }

    if (targetMarket === 'coin') {
      if (!settings.coinAutoSelect && !settings.coinSymbol) {
        checks.push(trans('check.coin_symbol', '코인 심볼 필요'));
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
        ? (trans('guard.prefix', '실행 전 확인') + ': ' + visibleChecks.join(' / '))
        : trans('guard.ready', '실행 준비 완료. 자동매매를 시작할 수 있습니다.');
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
        addLog(trans('log.session_fail', '세션 갱신 실패'), String(err.message || err));
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
        addLog(trans('log.billing_ok', '이용권 상태 조회 완료'), billing || data);
      }
    } catch (err) {
      if (!silent) {
        addLog(trans('log.billing_fail', '이용권 상태 조회 실패'), String(err.message || err));
      }
    }
    updateStatus();
    updateGuard();
  }

  async function runVerifyStart() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.verify_start_fail', '본인인증 시작 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('verifyStart', 'POST', {});
      refs.verifyHint.textContent = (data.message || trans('stock.verify_sent', '인증 코드가 발송되었습니다.')) + (data.debug_code ? (' | code: ' + data.debug_code) : '');
      addLog(trans('log.verify_start_ok', '본인인증 시작'), data);
    } catch (err) {
      addLog(trans('log.verify_start_fail', '본인인증 시작 실패'), String(err.message || err));
    }
  }

  async function runVerifyComplete(code) {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.verify_done_fail', '인증 코드 제출 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
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
      addLog(trans('log.verify_done_ok', '본인인증 완료'), data);
      updateStatus();
      updateGuard();
    } catch (err) {
      addLog(trans('log.verify_done_fail', '인증 코드 제출 실패'), String(err.message || err));
    }
  }

  async function runApiHealthCheck() {
    var settings = collectFormSettings();
    try {
      var data = await core.callApi('health', 'GET', null, { withAuth: false, apiBase: settings.apiBase });
      state.apiChecked = true;
      addLog(trans('log.api_ok', 'API 연결 성공'), data);
    } catch (err) {
      state.apiChecked = false;
      addLog(trans('log.api_fail', 'API 연결 실패'), String(err.message || err));
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
      addLog(trans('log.stock_start_fail', '주식 자동매매 시작 실패'), checksToText(checks));
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
      addLog(trans('log.stock_start_ok', '주식 자동매매 시작 요청 완료'), data);
    } catch (err) {
      addLog(trans('log.stock_start_fail', '주식 자동매매 시작 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function startCoinTrading() {
    var settings = collectFormSettings();
    var checks = buildChecks('coin');
    if (checks.length > 0) {
      addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), checksToText(checks));
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
      addLog(trans('log.coin_start_ok', '코인 자동매매 시작 요청 완료'), data);
    } catch (err) {
      addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function stopTrading() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.stop_fail', '자동매매 중지 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('stop', 'POST', {});
      addLog(trans('log.stop_ok', '자동매매 중지 요청 완료'), data);
    } catch (err) {
      addLog(trans('log.stop_fail', '자동매매 중지 실패'), String(err.message || err));
    }
  }

  async function runAnalyze() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.analyze_fail', '매매일지 분석 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('analyze', 'POST', { trigger: 'manual' });
      addLog(trans('log.analyze_ok', '매매일지 분석 완료'), data);
    } catch (err) {
      addLog(trans('log.analyze_fail', '매매일지 분석 실패'), String(err.message || err));
    }
  }

  async function loadLatestReport() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.report_fail', '리포트 조회 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('reportLatest', 'GET');
      addLog(trans('log.report_ok', '최근 분석 리포트'), data);
    } catch (err) {
      addLog(trans('log.report_fail', '리포트 조회 실패'), String(err.message || err));
    }
  }

  async function startCheckout() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.checkout_fail', '결제 시작 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('billingCheckout', 'POST', { plan: 'monthly' });
      state.checkoutId = (data.checkout && data.checkout.checkout_id) || '';
      addLog(trans('log.checkout_ok', '구독 결제 시작'), data);
    } catch (err) {
      addLog(trans('log.checkout_fail', '결제 시작 실패'), String(err.message || err));
    }
  }

  async function confirmPayment() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.confirm_fail', '결제 완료 처리 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    try {
      var data = await core.callApi('billingConfirm', 'POST', { checkout_id: state.checkoutId || undefined });
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      addLog(trans('log.confirm_ok', '결제 완료 처리'), data);
    } catch (err) {
      addLog(trans('log.confirm_fail', '결제 완료 처리 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function exportUsers() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.users_fail', '회원정보 조회 실패'), trans('log.need_login_first', '먼저 로그인하세요.'));
      return;
    }
    if (!isAdminUser(session.user)) {
      addLog(trans('log.admin_required', '관리자 계정 필요'), trans('admin.access_denied', '관리자 전용 메뉴입니다.'));
      state.adminUsersLoaded = false;
      state.adminUsers = [];
      renderAdminTableMessage(trans('admin.access_denied', '관리자 전용 메뉴입니다.'));
      goToTab('home');
      return;
    }
    try {
      var data = await core.callApi('adminUsers', 'GET');
      state.adminUsers = Array.isArray(data.users) ? data.users : [];
      state.adminUsersLoaded = true;
      renderUserTable();
      addLog(trans('log.users_ok', '데모 회원정보 불러오기 완료'), { count: state.adminUsers.length });
    } catch (err) {
      addLog(trans('log.users_fail', '회원정보 조회 실패'), String(err.message || err));
      state.adminUsersLoaded = false;
      state.adminUsers = [];
      renderAdminTableMessage(String(err.message || err));
    }
  }

  function runLogout() {
    core.clearSession();
    state.apiChecked = false;
    state.checkoutId = '';
    state.adminUsersLoaded = false;
    state.adminUsers = [];
    renderUserTable();
    addLog(trans('log.logout.title', '로그아웃 완료'), trans('log.logout.body', '세션이 종료되었습니다.'));
    updateStatus();
    updateGuard();
    goToTab('home');
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
    if (refs.brandHome) {
      refs.brandHome.addEventListener('click', function (event) {
        event.preventDefault();
        goToTab('home');
      });
    }

    if (refs.menuToggle) {
      refs.menuToggle.addEventListener('click', function () {
        setMenuOpen(!state.menuOpen);
      });
    }

    document.addEventListener('click', function (event) {
      if (!state.menuOpen || !isMobileViewport()) {
        return;
      }
      if (!refs.heroNav) {
        return;
      }
      if (!refs.heroNav.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', function () {
      if (!isMobileViewport() && state.menuOpen) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && state.menuOpen) {
        setMenuOpen(false);
      }
    });

    refs.navPills.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.dataset.tab);
      });
    });

    bindButton(refs.btnLangKo, function () { setLanguage('ko'); });
    bindButton(refs.btnLangEn, function () { setLanguage('en'); });

    bindButton(refs.btnTrial, function () {
      var session = currentSession();
      if (!session.user) {
        window.location.href = './signup.html';
        return;
      }
      goToTab('stock');
      addLog(trans('log.trial_info.title', '무료체험 안내'), trans('log.trial_info.body', '7일 무료체험 기간에는 자동매매를 바로 실행할 수 있습니다.'));
    });
    bindButton(refs.btnGotoBilling, function () { goToTab('billing'); });
    bindButton(refs.btnGotoGuide, function () { goToTab('guide'); });
    bindButton(refs.btnGotoStock, function () { goToTab('stock'); });
    bindButton(refs.btnGotoCoin, function () { goToTab('coin'); });
    bindButton(refs.btnGotoIntro, function () { goToTab('intro'); });
    bindButton(refs.btnGuideToStock, function () { goToTab('stock'); });
    bindButton(refs.btnGuideToCoin, function () { goToTab('coin'); });
    bindButton(refs.btnMoveStock, function () { goToTab('stock'); });
    bindButton(refs.btnMoveCoin, function () { goToTab('coin'); });
    bindButton(refs.btnMoveBilling, function () { goToTab('billing'); });

    if (refs.stockForm) {
      refs.stockForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var saved = collectFormSettings();
        addLog(trans('log.stock_saved', '주식 설정 저장 완료'), {
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
        addLog(trans('log.coin_saved', '코인 설정 저장 완료'), {
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

    if (refs.coinExchange) {
      refs.coinExchange.addEventListener('change', function () {
        updateCoinCredentialFields();
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
    bindButton(refs.btnLogout, runLogout);

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
    settings.apiBase = fixedApiBase();
    core.saveSettings(settings);
    if (refs.apiBase) {
      refs.apiBase.value = settings.apiBase;
    }
  }

  function init() {
    initApiBase();
    applyI18n();
    renderUserTable();
    applySettingsToForm(currentSettings());
    bindEvents();
    setMenuOpen(false);
    setActiveTab('home');
    addLog(trans('log.dashboard_ready.title', '대시보드 준비 완료'), trans('log.dashboard_ready.body', '홈에서 7일 무료체험을 시작하고, 투자 설정 후 자동매매를 실행하세요.'));
    refreshMe(true).then(function () {
      return refreshBillingStatus(true);
    });
  }

  init();
})();
