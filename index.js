(function () {
  'use strict';

  var core = window.PortalCore;
  if (!core) {
    return;
  }
  var TradingViewChartComponent = window.TradingViewChart;

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
    'landing.nav.features': 'Features',
    'landing.nav.security': 'Security',
    'landing.nav.pricing': 'Pricing',
    'landing.nav.faq': 'FAQ',
    'landing.nav.start': 'Start Free',
    'auth.signup': 'Sign Up',
    'auth.login': 'Log In',
    'auth.logout': 'Log Out',
    'landing.hero.kicker': 'PREMIUM AUTO TRADING EXPERIENCE',
    'landing.hero.tag': 'Executive AI Trading Lounge',
    'landing.hero.title.main': 'AI-Recommended Automated Trading',
    'landing.hero.title.sub': 'AI-recommended auto-trading with refined control.',
    'landing.hero.sub': 'Our score-driven engine fuses news, volume, and indicators to shortlist top candidates and execute inside strict risk limits.',
    'landing.hero.cta.primary': 'Start For Free',
    'landing.hero.cta.secondary': 'View Demo',
    'landing.badge.realtime': 'Real-time recommendations and fills',
    'landing.badge.security': 'Encrypted API key storage',
    'landing.badge.risk': 'Built-in risk limits',
    'landing.stat.1.label': 'Recommendation Engine',
    'landing.stat.1.value': 'Two-stage scoring: News + Indicators',
    'landing.stat.2.label': 'Execution Policy',
    'landing.stat.2.value': 'Pick one asset from top-ranked candidates',
    'landing.stat.3.label': 'Risk Guard',
    'landing.stat.3.value': 'Loss limits + streak stop + kill switch',
    'landing.features.eyebrow': 'WHY USE OUR SYSTEM',
    'landing.features.title': 'Why Use Our Trading System?',
    'landing.features.lead': 'Designed to reduce waiting, improve precision, and keep execution stable in live environments.',
    'landing.features.card1.title': 'AI Recommendation Scoring',
    'landing.features.card1.body': 'News, volume, and indicators are scored together and filtered by threshold.',
    'landing.features.card2.title': 'Holding-time Presets',
    'landing.features.card2.body': 'Scalp, day-trade, and swing presets automatically tune indicators and exits.',
    'landing.features.card3.title': 'Two-step Live Confirmation',
    'landing.features.card3.body': 'Before live orders, you confirm order size and daily loss limits again.',
    'landing.features.card4.title': 'Auto Trade Journal',
    'landing.features.card4.body': 'Entry, exit, rationale, and pnl are structured for fast post-trade review.',
    'landing.features.card5.title': 'Security-first Design',
    'landing.features.card5.body': 'Secrets are encrypted on server-side vault and never exposed in frontend logs.',
    'landing.features.card6.title': 'Multi-market Coverage',
    'landing.features.card6.body': 'Run KR stocks and major crypto exchanges from one platform.',
    'landing.how.eyebrow': 'HOW IT WORKS',
    'landing.how.title': 'Start in 3 Steps',
    'landing.how.step1.title': 'Connect Brokers/Exchanges',
    'landing.how.step1.body': 'Link Kiwoom, Upbit, or Binance accounts and configure base budget.',
    'landing.how.step2.title': 'Pick AI + Holding Time',
    'landing.how.step2.body': 'Review recommendation scores and select scalp/day/swing mode.',
    'landing.how.step3.title': 'Auto Execute + Report',
    'landing.how.step3.body': 'Run with guardrails and improve using trade journals and daily summaries.',
    'landing.how.holding.scalp': 'Scalp 1-10m',
    'landing.how.holding.day': 'Day 1h-1d',
    'landing.how.holding.swing': 'Swing 1d-several days',
    'landing.action.stock': 'Start Stock Trading',
    'landing.action.coin': 'Start Crypto Trading',
    'landing.action.pricing': 'View Pricing',
    'landing.action.intro': 'System Overview',
    'landing.exchange.eyebrow': 'MARKET COVERAGE',
    'landing.exchange.title': 'Supported Exchanges and Broker',
    'landing.exchange.tip': 'Security tip: keep withdrawal permission OFF and enforce API IP whitelist.',
    'landing.security.eyebrow': 'SECURITY & RISK CONTROL',
    'landing.security.title': 'Trust Architecture for Real-money Trading',
    'landing.security.lead': 'When real capital is on the line, risk control and security must come first.',
    'landing.security.card1.title': 'Encrypted API Key Storage',
    'landing.security.card1.body': 'Sensitive credentials are encrypted on server-side storage and masked in logs.',
    'landing.security.card2.title': 'Least-Privilege Access',
    'landing.security.card2.body': 'Only required permissions should be enabled. Withdrawal permission stays disabled.',
    'landing.security.card3.title': 'Loss Limits + Kill Switch',
    'landing.security.card3.body': 'Per-order cap, daily loss cap, streak-stop, and crash-stop work together.',
    'landing.pricing.eyebrow': 'PRICING',
    'landing.pricing.title': 'Plans for Each Growth Stage',
    'landing.pricing.free.price': 'KRW 0 / 7 days',
    'landing.pricing.free.f1': 'Recommendation feed',
    'landing.pricing.free.f2': 'Dry-run simulation',
    'landing.pricing.free.f3': 'Basic logs',
    'landing.pricing.free.cta': 'Start Trial',
    'landing.pricing.pro.price': 'KRW 49,000 / month',
    'landing.pricing.pro.f1': 'Automated execution',
    'landing.pricing.pro.f2': 'Telegram fill alerts',
    'landing.pricing.pro.f3': 'Full risk guardrails',
    'landing.pricing.pro.cta': 'Start Pro',
    'landing.pricing.premium.price': 'KRW 99,000 / month',
    'landing.pricing.premium.f1': 'Advanced reports and analytics',
    'landing.pricing.premium.f2': 'Strategy tuning insights',
    'landing.pricing.premium.f3': 'Priority support',
    'landing.pricing.premium.cta': 'Contact Premium',
    'landing.faq.eyebrow': 'FAQ',
    'landing.faq.title': 'Frequently Asked Questions',
    'landing.faq.q1': 'Can API keys leak?',
    'landing.faq.a1': 'Secrets are encrypted in server storage and never exposed in plain text on UI/logs.',
    'landing.faq.q2': 'Can I test before live trading?',
    'landing.faq.a2': 'Yes. Dry-run mode simulates recommendations and planned orders without real execution.',
    'landing.faq.q3': 'How does refund work?',
    'landing.faq.a3': 'Refund policy follows terms and payment policy. Contact support for case review.',
    'landing.faq.q4': 'Can I stop auto-trading anytime?',
    'landing.faq.a4': 'Yes. You can stop manually anytime, and crash-stop kill switch can halt automatically.',
    'landing.footer.copy': 'Premium SaaS for reliable automated trading operations',
    'landing.footer.terms': 'Terms',
    'landing.footer.privacy': 'Privacy',
    'landing.footer.contact': 'Contact: dufltptkd01@gmail.com',
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
    'strategy.holding_period': 'Holding Period',
    'strategy.holding.scalp': 'Scalp (1-10 min)',
    'strategy.holding.day': 'Day Trade (1h-1d)',
    'strategy.holding.swing': 'Swing (1d-several days)',
    'strategy.holding.help': 'Holding period updates MA/volume/news weights and stop rules.',
    'stock.mode': 'Execution Mode',
    'stock.mode.sim_option': 'Dry Run (No real order)',
    'stock.mode.live_option': 'Live Trading (Real order)',
    'stock.mode.help': 'Dry run records only planned orders. Live mode sends real orders.',
    'risk.daily_max_loss': 'Daily Max Loss (KRW)',
    'risk.daily_max_trades': 'Daily Max Trades',
    'risk.max_consecutive_losses': 'Auto-stop on Consecutive Losses',
    'risk.market_crash_stop': 'Crash Stop Threshold (BTC -%)',
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
    'api.health.title': 'API Diagnostics',
    'api.health.key': 'API key validity',
    'api.health.balance': 'Balance query',
    'api.health.order': 'Order permission',
    'api.health.ip': 'IP restriction',
    'security.note': 'For security, API secrets are not stored in browser storage and are used only at runtime.',
    'reco.title': 'AI Recommendation Cards',
    'reco.refresh': 'Refresh Recommendations',
    'reco.lead': 'Stage 1 filters candidates with news/volume/volatility, then Stage 2 scores technical signals. Only score >= 70 is recommended.',
    'reco.empty.title': 'Waiting for recommendations',
    'reco.empty.body': 'Save settings, refresh recommendations, or start auto-trading to generate cards.',
    'reco.score': 'Score',
    'reco.signal': 'Signal',
    'reco.risk': 'Risk',
    'reco.current_price': 'Current',
    'reco.buy_price': 'Buy Target',
    'reco.sell_price': 'Sell Target',
    'reco.reason': 'Reasons',
    'reco.time': 'Generated',
    'reco.signal.high': 'High',
    'reco.signal.mid': 'Medium',
    'reco.signal.low': 'Low',
    'reco.risk.low': 'Low',
    'reco.risk.mid': 'Medium',
    'reco.risk.high': 'High',
    'reco.reason.news': 'Positive news signal',
    'reco.reason.volume': 'Volume surge',
    'reco.reason.rsi': 'RSI condition met',
    'reco.reason.trend': 'Uptrend alignment',
    'arch.title': 'Engine Split Architecture',
    'arch.step.1': '1. News Collection Server',
    'arch.step.1.body': 'Collect mention surge and sentiment shifts.',
    'arch.step.2': '2. Indicator Analysis Server',
    'arch.step.2.body': 'Compute RSI, moving averages, volume, and volatility.',
    'arch.step.3': '3. Recommendation Engine',
    'arch.step.3.body': 'Apply two-stage scoring and candidate compression.',
    'arch.step.4': '4. Order Execution Server',
    'arch.step.4.body': 'Validate risk guardrails, place orders, and write journals.',
    'chart.stock.title': 'Stock TradingView Chart',
    'chart.stock.lead': 'Chart updates automatically based on selected stock symbol.',
    'chart.coin.title': 'Crypto TradingView Chart',
    'chart.coin.lead': 'Chart updates automatically by selected exchange and symbol.',
    'chart.toggle': 'Show Chart',
    'chart.toggle.on': 'ON',
    'chart.toggle.off': 'OFF',
    'chart.toggle.help': 'When ON, clicking a recommended symbol opens its chart.',
    'journal.title': 'Auto-Trading Logs / Analysis',
    'journal.summary.win_rate': 'Win Rate',
    'journal.summary.total_pnl': 'Total PnL',
    'journal.summary.max_drawdown': 'Max Drawdown',
    'journal.col.market': 'Market',
    'journal.col.buy_at': 'Buy Time',
    'journal.col.sell_at': 'Sell Time',
    'journal.col.reason': 'Entry Reason',
    'journal.col.pnl': 'PnL',
    'journal.col.score': 'Score',
    'journal.col.basis': 'Recommendation Basis',
    'journal.col.news': 'News Summary',
    'journal.col.indicators': 'Indicator Values',
    'journal.empty': 'No trade journals yet.',
    'live.title': 'Live Trading Confirmation',
    'live.lead': 'Live mode sends real orders. Please review your risk limits.',
    'live.max_order': 'Max order amount',
    'live.daily_loss': 'Daily loss limit',
    'live.cancel': 'Cancel',
    'live.next': 'Next confirmation',
    'live.final': 'Final execute',
    'live.step1': 'Step 1 / 2 confirmation',
    'live.step2': 'Step 2 / 2 final confirmation',
    'coin.title': 'Crypto Trading Setup',
    'coin.exchange': 'Exchange',
    'coin.symbol': 'Symbol',
    'coin.budget': 'Max Amount per Order (KRW)',
    'coin.auto_select': 'Auto Symbol Select',
    'coin.mode': 'Execution Mode',
    'coin.mode.sim_option': 'Dry Run (No real order)',
    'coin.mode.live_option': 'Live Trading (Real order)',
    'coin.mode.help': 'Dry run records only planned orders without exchange execution.',
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
    'mode.sim': 'Dry Run',
    'mode.live': 'Live Trading',
    'label.yes': 'Yes',
    'label.no': 'No',
    'label.allowed': 'Allowed',
    'label.blocked': 'Blocked',
    'label.unknown': 'Unknown',
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
    'check.daily_loss': 'Daily max loss exceeded',
    'check.daily_trades': 'Daily trade count limit reached',
    'check.consecutive_losses': 'Consecutive loss stop triggered',
    'check.market_crash': 'Market crash stop triggered',
    'check.score_threshold': 'Recommendation score below threshold',
    'check.order_permission': 'Order permission unavailable',
    'check.ip_restricted': 'IP restriction blocks ordering',
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
    'log.dashboard_ready.body': 'Start the 7-day trial from Home, then configure and run auto-trading.',
    'log.reco_ready': 'Recommendation cards refreshed',
    'log.safety_blocked': 'Safety guard blocked execution',
    'log.live_confirm_cancelled': 'Live trading confirmation cancelled',
    'log.credentials_vault_ok': 'Credentials stored in server vault',
    'log.credentials_vault_fail': 'Failed to store credentials in vault',
    'log.dry_run_plan': 'Dry-run order plan only (no real orders)',
    'log.market_crash_stop': 'Market crash stop triggered'
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
    btnNavFeatures: document.getElementById('btnNavFeatures'),
    btnNavSecurity: document.getElementById('btnNavSecurity'),
    btnNavPricing: document.getElementById('btnNavPricing'),
    btnNavFaq: document.getElementById('btnNavFaq'),
    btnNavStart: document.getElementById('btnNavStart'),

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
    holdingPeriod: document.getElementById('holdingPeriod'),
    chartEnabled: document.getElementById('chartEnabled'),
    stockDryRun: document.getElementById('stockDryRun'),
    dailyMaxLoss: document.getElementById('dailyMaxLoss'),
    dailyMaxTrades: document.getElementById('dailyMaxTrades'),
    maxConsecutiveLosses: document.getElementById('maxConsecutiveLosses'),
    marketCrashStopPct: document.getElementById('marketCrashStopPct'),
    strategyPresetBox: document.getElementById('strategyPresetBox'),
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
    apiHealthKey: document.getElementById('apiHealthKey'),
    apiHealthBalance: document.getElementById('apiHealthBalance'),
    apiHealthOrder: document.getElementById('apiHealthOrder'),
    apiHealthIp: document.getElementById('apiHealthIp'),
    apiHealthCheckedAt: document.getElementById('apiHealthCheckedAt'),
    verifyCodeForm: document.getElementById('verifyCodeForm'),
    verifyCode: document.getElementById('verifyCode'),
    verifyHint: document.getElementById('verifyHint'),
    btnRefreshReco: document.getElementById('btnRefreshReco'),
    recommendationCards: document.getElementById('recommendationCards'),
    stockChartPanel: document.getElementById('stockChartPanel'),
    coinChartPanel: document.getElementById('coinChartPanel'),
    stockChartMount: document.getElementById('stockChartMount'),
    coinChartMount: document.getElementById('coinChartMount'),
    stockChartSymbolLabel: document.getElementById('stockChartSymbolLabel'),
    coinChartSymbolLabel: document.getElementById('coinChartSymbolLabel'),
    summaryWinRate: document.getElementById('summaryWinRate'),
    summaryTotalPnl: document.getElementById('summaryTotalPnl'),
    summaryMaxDrawdown: document.getElementById('summaryMaxDrawdown'),
    journalTableBody: document.getElementById('journalTableBody'),

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
    liveConfirmModal: document.getElementById('liveConfirmModal'),
    liveConfirmOrderMax: document.getElementById('liveConfirmOrderMax'),
    liveConfirmLossLimit: document.getElementById('liveConfirmLossLimit'),
    liveConfirmStepText: document.getElementById('liveConfirmStepText'),
    btnLiveConfirmCancel: document.getElementById('btnLiveConfirmCancel'),
    btnLiveConfirmNext: document.getElementById('btnLiveConfirmNext'),
    btnLiveConfirmFinal: document.getElementById('btnLiveConfirmFinal'),

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
    adminUsersLoaded: false,
    recommendations: [],
    recommendationContext: null,
    journalEntries: [],
    chartWidgets: {
      stock: null,
      coin: null
    },
    selectedChartSymbols: {
      stock: '',
      coin: ''
    },
    selectedRecommendationSymbol: '',
    liveConfirmResolver: null,
    liveConfirmStep: 1,
    apiHealth: {
      checked: false,
      api_key_valid: null,
      balance_available: null,
      order_permission: null,
      ip_restricted: null,
      checked_at: ''
    }
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
    renderRecommendationCards();
    renderJournal();
    renderApiHealth();
    renderStrategyPreset();
    renderTradingViewCharts();
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

  function redactSensitive(rawText) {
    return String(rawText || '').replace(/("?(?:api[_-]?key|api[_-]?secret|secret|token|password|access_key|private_key)"?\s*:\s*")([^"]*)"/gi, '$1***REDACTED***"');
  }

  function safePayloadText(payload) {
    if (typeof payload === 'string') {
      return redactSensitive(payload);
    }
    try {
      return redactSensitive(JSON.stringify(payload, null, 2));
    } catch (_err) {
      return redactSensitive(String(payload));
    }
  }

  function addLog(title, payload) {
    var body = safePayloadText(payload);
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
      renderAdminTableMessage(trans('billing.export_default', '관리자 회원정보 불러오기를 눌러 회원 목록을 조회해 주세요.'));
      return;
    }
    if (!Array.isArray(state.adminUsers) || state.adminUsers.length < 1) {
      renderAdminTableMessage(trans('admin.table.no_users', '표시할 회원 정보가 없습니다.'));
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

  function numberOr(value, fallback) {
    var parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function formatKrw(value) {
    var amount = numberOr(value, 0);
    return new Intl.NumberFormat(state.lang === 'en' ? 'en-US' : 'ko-KR').format(Math.round(amount)) + (state.lang === 'en' ? ' KRW' : '원');
  }

  function percentText(value) {
    var num = numberOr(value, 0);
    return (Math.round(num * 100) / 100).toFixed(2) + '%';
  }

  function holdingProfile(holdingPeriod) {
    if (holdingPeriod === 'scalp') {
      return {
        key: 'scalp',
        name: trans('strategy.holding.scalp', '초단타 (1~10분)'),
        ma_short: 5,
        ma_long: 20,
        volume_threshold_pct: 70,
        rsi_threshold: 40,
        stop_loss_pct: 0.8,
        news_weight: 30,
        volume_weight: 20,
        rsi_weight: 20,
        trend_weight: 30
      };
    }
    if (holdingPeriod === 'swing') {
      return {
        key: 'swing',
        name: trans('strategy.holding.swing', '스윙 (1일~수일)'),
        ma_short: 20,
        ma_long: 60,
        volume_threshold_pct: 30,
        rsi_threshold: 38,
        stop_loss_pct: 3.2,
        news_weight: 40,
        volume_weight: 15,
        rsi_weight: 15,
        trend_weight: 30
      };
    }
    return {
      key: 'day',
      name: trans('strategy.holding.day', '단타 (1시간~1일)'),
      ma_short: 10,
      ma_long: 30,
      volume_threshold_pct: 45,
      rsi_threshold: 35,
      stop_loss_pct: 1.8,
      news_weight: 30,
      volume_weight: 20,
      rsi_weight: 20,
      trend_weight: 30
    };
  }

  function renderStrategyPreset() {
    if (!refs.strategyPresetBox) {
      return;
    }
    var profile = holdingProfile((refs.holdingPeriod && refs.holdingPeriod.value) || 'day');
    refs.strategyPresetBox.innerHTML = [
      '<strong>' + profile.name + '</strong>',
      '<br />MA(' + profile.ma_short + '/' + profile.ma_long + '), Volume +' + profile.volume_threshold_pct + '%, RSI ??' + profile.rsi_threshold + ', Stop Loss ' + profile.stop_loss_pct + '%',
      '<br />Score Weight - News ' + profile.news_weight + ' / Volume ' + profile.volume_weight + ' / RSI ' + profile.rsi_weight + ' / Trend ' + profile.trend_weight
    ].join('');
  }

  function healthLabel(value, kind) {
    if (value === null || value === undefined) {
      return { text: trans('label.unknown', '미확인'), className: 'status-warn' };
    }
    if (kind === 'ip') {
      return value
        ? { text: trans('label.blocked', '제한됨'), className: 'status-bad' }
        : { text: trans('label.allowed', '정상'), className: 'status-good' };
    }
    return value
      ? { text: trans('label.allowed', '정상'), className: 'status-good' }
      : { text: trans('label.blocked', '불가'), className: 'status-bad' };
  }

  function setHealthNode(node, value, kind) {
    if (!node) {
      return;
    }
    var badge = healthLabel(value, kind);
    node.textContent = badge.text;
    node.classList.remove('status-good', 'status-warn', 'status-bad');
    node.classList.add(badge.className);
  }

  function renderApiHealth() {
    setHealthNode(refs.apiHealthKey, state.apiHealth.api_key_valid, 'default');
    setHealthNode(refs.apiHealthBalance, state.apiHealth.balance_available, 'default');
    setHealthNode(refs.apiHealthOrder, state.apiHealth.order_permission, 'default');
    setHealthNode(refs.apiHealthIp, state.apiHealth.ip_restricted, 'ip');
    setText(
      refs.apiHealthCheckedAt,
      (state.lang === 'en' ? 'Last check: ' : '최근 확인 시각: ') + (state.apiHealth.checked_at ? formatDateText(state.apiHealth.checked_at) : '-')
    );
  }

  function intervalByHolding(holdingPeriod, marketType) {
    if (holdingPeriod === 'scalp') {
      return '1';
    }
    if (holdingPeriod === 'swing') {
      return marketType === 'crypto' ? '240' : '120';
    }
    return marketType === 'crypto' ? '15' : '30';
  }

  function parsePair(rawSymbol, fallbackBase, fallbackQuote) {
    var text = String(rawSymbol || '').trim().toUpperCase();
    if (!text) {
      return { base: fallbackBase, quote: fallbackQuote };
    }
    if (text.indexOf('/') >= 0) {
      var split = text.split('/');
      return {
        base: (split[0] || fallbackBase).replace(/[^A-Z0-9]/g, ''),
        quote: (split[1] || fallbackQuote).replace(/[^A-Z0-9]/g, '')
      };
    }
    if (text.endsWith('USDT')) {
      return { base: text.slice(0, -4), quote: 'USDT' };
    }
    if (text.endsWith('KRW')) {
      return { base: text.slice(0, -3), quote: 'KRW' };
    }
    return { base: text.replace(/[^A-Z0-9]/g, ''), quote: fallbackQuote };
  }

  function stockTvSymbol(rawSymbol) {
    var code = String(rawSymbol || '').trim();
    if (!/^\d{6}$/.test(code)) {
      code = '005930';
    }
    return 'KRX:' + code;
  }

  function coinTvSymbol(exchange, rawSymbol) {
    var ex = String(exchange || 'binance').toLowerCase();
    var pair = parsePair(rawSymbol, 'BTC', ex === 'upbit' ? 'KRW' : 'USDT');
    var quote = pair.quote;
    if (!quote) {
      quote = ex === 'upbit' ? 'KRW' : 'USDT';
    }
    if (ex === 'binance' && quote === 'KRW') {
      quote = 'USDT';
    }
    var tvExchange = ex === 'upbit' ? 'UPBIT' : 'BINANCE';
    return tvExchange + ':' + pair.base + quote;
  }

  function chartTheme() {
    return 'dark';
  }

  function chartLocale() {
    return state.lang === 'en' ? 'en' : 'kr';
  }

  function chartSymbolLabelText(tvSymbol, interval) {
    return tvSymbol + ' 鸚?' + interval + 'm';
  }

  function setChartPanelVisible(panelNode, visible) {
    if (!panelNode) {
      return;
    }
    panelNode.hidden = !visible;
    panelNode.classList.toggle('is-hidden', !visible);
  }

  function destroyChartWidget(kind) {
    var widget = state.chartWidgets[kind];
    if (widget && typeof widget.destroy === 'function') {
      widget.destroy();
    }
    state.chartWidgets[kind] = null;
  }

  function upsertChartWidget(kind, mountNode, tvSymbol, interval) {
    if (!mountNode || !TradingViewChartComponent) {
      destroyChartWidget(kind);
      return;
    }
    var widget = state.chartWidgets[kind];
    var props = {
      symbol: tvSymbol,
      interval: interval,
      timezone: 'Asia/Seoul',
      theme: chartTheme(),
      locale: chartLocale()
    };
    if (!widget) {
      state.chartWidgets[kind] = new TradingViewChartComponent(mountNode, props);
      return;
    }
    widget.setProps(props);
  }

  function renderTradingViewCharts() {
    var settings = currentSettings();
    var enabled = settings.chartEnabled !== false;
    var stockRaw = state.selectedChartSymbols.stock || settings.stockSymbol;
    var coinRaw = state.selectedChartSymbols.coin || settings.coinSymbol;
    var stockSymbol = stockTvSymbol(stockRaw);
    var coinSymbol = coinTvSymbol(settings.coinExchange, coinRaw);
    var stockInterval = intervalByHolding(settings.holdingPeriod, 'stock');
    var coinInterval = intervalByHolding(settings.holdingPeriod, 'crypto');

    setText(refs.stockChartSymbolLabel, chartSymbolLabelText(stockSymbol, stockInterval));
    setText(refs.coinChartSymbolLabel, chartSymbolLabelText(coinSymbol, coinInterval));

    if (!enabled) {
      setChartPanelVisible(refs.stockChartPanel, false);
      setChartPanelVisible(refs.coinChartPanel, false);
      destroyChartWidget('stock');
      destroyChartWidget('coin');
      return;
    }

    setChartPanelVisible(refs.stockChartPanel, true);
    setChartPanelVisible(refs.coinChartPanel, true);
    upsertChartWidget('stock', refs.stockChartMount, stockSymbol, stockInterval);
    upsertChartWidget('coin', refs.coinChartMount, coinSymbol, coinInterval);
  }

  function marketUniverse(marketType) {
    if (marketType === 'crypto') {
      return [
        { symbol: 'BTC/KRW', name: 'Bitcoin' },
        { symbol: 'ETH/KRW', name: 'Ethereum' },
        { symbol: 'SOL/KRW', name: 'Solana' },
        { symbol: 'XRP/KRW', name: 'Ripple' },
        { symbol: 'DOGE/KRW', name: 'Dogecoin' },
        { symbol: 'BNB/USDT', name: 'BNB' },
        { symbol: 'ADA/KRW', name: 'Cardano' },
        { symbol: 'TRX/KRW', name: 'TRON' },
        { symbol: 'AVAX/KRW', name: 'Avalanche' },
        { symbol: 'LINK/KRW', name: 'Chainlink' },
        { symbol: 'DOT/KRW', name: 'Polkadot' },
        { symbol: 'MATIC/KRW', name: 'Polygon' }
      ];
    }
    return [
      { symbol: '005930', name: 'Samsung Electronics' },
      { symbol: '000660', name: 'SK Hynix' },
      { symbol: '035420', name: 'NAVER' },
      { symbol: '035720', name: 'Kakao' },
      { symbol: '068270', name: 'Celltrion' },
      { symbol: '005380', name: 'Hyundai Motor' },
      { symbol: '207940', name: 'Samsung Biologics' },
      { symbol: '051910', name: 'LG Chem' },
      { symbol: '105560', name: 'KB Financial Group' },
      { symbol: '066570', name: 'LG Electronics' },
      { symbol: '003670', name: 'POSCO Future M' },
      { symbol: '042660', name: 'Hanwha Ocean' }
    ];
  }

  function randomBetween(min, max) {
    return min + (Math.random() * (max - min));
  }

  function roundPriceBySymbol(symbol, value) {
    var raw = Number(value);
    if (!Number.isFinite(raw) || raw <= 0) {
      return 0;
    }
    if (String(symbol || '').indexOf('/USDT') >= 0) {
      return Math.round(raw * 100) / 100;
    }
    return Math.round(raw);
  }

  function simulatedCurrentPrice(symbol, marketType) {
    var key = String(symbol || '').toUpperCase();
    if (marketType === 'stock') {
      if (key === '005930') return randomBetween(68000, 82000);
      if (key === '000660') return randomBetween(130000, 180000);
      if (key === '207940') return randomBetween(650000, 850000);
      return randomBetween(12000, 250000);
    }
    if (key.indexOf('BTC') === 0 && key.indexOf('/USDT') >= 0) return randomBetween(48000, 125000);
    if (key.indexOf('BTC') === 0 && key.indexOf('/KRW') >= 0) return randomBetween(70000000, 170000000);
    if (key.indexOf('ETH') === 0 && key.indexOf('/USDT') >= 0) return randomBetween(2400, 7200);
    if (key.indexOf('ETH') === 0 && key.indexOf('/KRW') >= 0) return randomBetween(3200000, 9900000);
    if (key.indexOf('/USDT') >= 0) return randomBetween(0.12, 1200);
    return randomBetween(100, 9000000);
  }

  function buildPriceTargets(currentPrice, profile, symbol) {
    var buyDipRange = profile.key === 'scalp'
      ? { min: 0.001, max: 0.004 }
      : (profile.key === 'swing' ? { min: 0.006, max: 0.02 } : { min: 0.003, max: 0.012 });
    var sellGainRange = profile.key === 'scalp'
      ? { min: 0.003, max: 0.01 }
      : (profile.key === 'swing' ? { min: 0.018, max: 0.06 } : { min: 0.01, max: 0.03 });

    var buyDiscount = randomBetween(buyDipRange.min, buyDipRange.max);
    var sellPremium = randomBetween(sellGainRange.min, sellGainRange.max);

    return {
      current_price: roundPriceBySymbol(symbol, currentPrice),
      buy_price: roundPriceBySymbol(symbol, currentPrice * (1 - buyDiscount)),
      sell_price: roundPriceBySymbol(symbol, currentPrice * (1 + sellPremium))
    };
  }

  function formatPriceBySymbol(symbol, price) {
    var value = numberOr(price, 0);
    var text;
    if (String(symbol || '').indexOf('/USDT') >= 0) {
      text = new Intl.NumberFormat(state.lang === 'en' ? 'en-US' : 'ko-KR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
      return '$' + text;
    }
    text = new Intl.NumberFormat(state.lang === 'en' ? 'en-US' : 'ko-KR').format(Math.round(value));
    return state.lang === 'en' ? (text + ' KRW') : (text + '원');
  }

  function baseCandidate(universeItem, profile, marketType) {
    var rsi = randomBetween(20, 70);
    var maLong = randomBetween(95, 130);
    var maShort = maLong + randomBetween(-15, 18);
    var currentPrice = simulatedCurrentPrice(universeItem.symbol, marketType);
    var prices = buildPriceTargets(currentPrice, profile, universeItem.symbol);
    return {
      symbol: universeItem.symbol,
      name: universeItem.name,
      news_positive: randomBetween(0.3, 0.9),
      news_mentions_delta_pct: randomBetween(5, 160),
      volume_growth_pct: randomBetween(10, 220),
      volatility_increase_pct: randomBetween(6, 90),
      rsi: rsi,
      ma_short: maShort,
      ma_long: maLong,
      current_price: prices.current_price,
      buy_price: prices.buy_price,
      sell_price: prices.sell_price,
      generated_at: new Date().toISOString(),
      profile: profile
    };
  }

  function stage1Score(candidate) {
    var news = candidate.news_mentions_delta_pct * 0.38;
    var volume = candidate.volume_growth_pct * 0.37;
    var volatility = candidate.volatility_increase_pct * 0.25;
    return news + volume + volatility;
  }

  function scoreCandidate(candidate, profile) {
    var score = 0;
    var reasons = [];
    if (candidate.news_positive >= 0.55) {
      score += profile.news_weight;
      reasons.push(trans('reco.reason.news', '뉴스 긍정 신호'));
    }
    if (candidate.volume_growth_pct >= profile.volume_threshold_pct) {
      score += profile.volume_weight;
      reasons.push(trans('reco.reason.volume', '거래량 증가'));
    }
    if (candidate.rsi <= profile.rsi_threshold) {
      score += profile.rsi_weight;
      reasons.push(trans('reco.reason.rsi', 'RSI 議곌굔 異⑹”'));
    }
    if (candidate.ma_short > candidate.ma_long) {
      score += profile.trend_weight;
      reasons.push(trans('reco.reason.trend', '추세 상승'));
    }
    var riskScore = (candidate.volatility_increase_pct * 0.6) + (Math.max(0, 50 - candidate.rsi) * 0.4);
    var risk = 'mid';
    if (riskScore >= 62) {
      risk = 'high';
    } else if (riskScore <= 34) {
      risk = 'low';
    }
    return {
      score: Math.round(score),
      reasons: reasons,
      signal: score >= 85 ? 'high' : (score >= 70 ? 'mid' : 'low'),
      risk: risk
    };
  }

  function buildRecommendationContext(marketType, settings) {
    var profile = holdingProfile(settings.holdingPeriod);
    var universe = marketUniverse(marketType);
    var generated = universe.map(function (item) {
      var candidate = baseCandidate(item, profile, marketType);
      candidate.stage1 = stage1Score(candidate);
      return candidate;
    });
    var staged = generated.filter(function (candidate) {
      return candidate.news_mentions_delta_pct >= 20 || candidate.volume_growth_pct >= 40 || candidate.volatility_increase_pct >= 18;
    }).sort(function (a, b) {
      return b.stage1 - a.stage1;
    }).slice(0, 10);
    if (staged.length < 1) {
      staged = generated.sort(function (a, b) {
        return b.stage1 - a.stage1;
      }).slice(0, 10);
    }

    var scored = staged.map(function (candidate) {
      var detail = scoreCandidate(candidate, profile);
      return Object.assign(candidate, detail);
    }).sort(function (a, b) {
      return b.score - a.score;
    });

    var recommended = scored.filter(function (candidate) {
      return candidate.score >= 70;
    });
    var picked = recommended.length ? recommended[0] : (scored[0] || null);
    var btcDropPct = randomBetween(-5.2, 2.1);

    return {
      market_type: marketType,
      created_at: new Date().toISOString(),
      profile: profile,
      candidates: scored,
      recommended: recommended,
      picked: picked,
      market_snapshot: {
        btc_change_pct_24h: Math.round(btcDropPct * 100) / 100
      },
      pipeline: {
        news_collection_server: 'active',
        indicator_analysis_server: 'active',
        recommendation_engine: 'active',
        order_execution_server: 'ready'
      }
    };
  }

  function riskLabelText(risk) {
    if (risk === 'high') {
      return trans('reco.risk.high', '높음');
    }
    if (risk === 'low') {
      return trans('reco.risk.low', '낮음');
    }
    return trans('reco.risk.mid', '蹂댄넻');
  }

  function signalLabelText(signal) {
    if (signal === 'high') {
      return trans('reco.signal.high', '媛뺥븿');
    }
    if (signal === 'mid') {
      return trans('reco.signal.mid', '以묎컙');
    }
    return trans('reco.signal.low', '약함');
  }

  function recommendationMarketKey() {
    return state.recommendationContext && state.recommendationContext.market_type === 'crypto'
      ? 'coin'
      : 'stock';
  }

  function syncSelectedRecommendationSymbol() {
    var marketKey = recommendationMarketKey();
    var cards = Array.isArray(state.recommendations) ? state.recommendations : [];
    if (!cards.length) {
      state.selectedRecommendationSymbol = '';
      state.selectedChartSymbols[marketKey] = '';
      return;
    }
    var preferred = state.selectedChartSymbols[marketKey];
    var hasPreferred = cards.some(function (item) {
      return item && item.symbol === preferred;
    });
    var selected = hasPreferred ? preferred : String(cards[0].symbol || '');
    state.selectedRecommendationSymbol = selected;
    state.selectedChartSymbols[marketKey] = selected;
  }

  function applyRecommendationSelection(item) {
    if (!item || !item.symbol) {
      return;
    }
    var marketKey = recommendationMarketKey();
    state.selectedRecommendationSymbol = item.symbol;
    state.selectedChartSymbols[marketKey] = item.symbol;
    renderRecommendationCards();
    renderTradingViewCharts();
  }

  function renderRecommendationCards() {
    if (!refs.recommendationCards) {
      return;
    }
    clearNode(refs.recommendationCards);
    var cards = Array.isArray(state.recommendations) ? state.recommendations.slice(0, 10) : [];
    if (cards.length < 1) {
      state.selectedRecommendationSymbol = '';
      var empty = document.createElement('article');
      empty.className = 'recommendation-card placeholder-card';
      empty.innerHTML = '<h3>' + trans('reco.empty.title', '추천 대기 중') + '</h3><p>' + trans('reco.empty.body', '설정을 저장하고 추천을 새로고침하거나 자동매매를 시작하면 추천 카드가 생성됩니다.') + '</p>';
      refs.recommendationCards.appendChild(empty);
      return;
    }
    cards.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'recommendation-card';
      if (item.symbol === state.selectedRecommendationSymbol) {
        card.classList.add('is-selected');
      }
      var reasonsHtml = (item.reasons || []).map(function (reason) {
        return '<li>' + reason + '</li>';
      }).join('');
      if (!reasonsHtml) {
        reasonsHtml = '<li>' + trans('reco.reason.news', '뉴스 긍정 신호') + '</li>';
      }
      card.innerHTML = [
        '<h3>' + item.name + ' <small>(' + item.symbol + ')</small></h3>',
        '<div class="recommendation-meta">',
        '<span>' + trans('reco.score', '점수') + ': ' + item.score + '</span>',
        '<span>' + trans('reco.signal', '신호강도') + ': ' + signalLabelText(item.signal) + '</span>',
        '<span>' + trans('reco.risk', '위험도') + ': ' + riskLabelText(item.risk) + '</span>',
        '</div>',
        '<div class="recommendation-prices">',
        '<span>' + trans('reco.current_price', '현재가') + ': ' + formatPriceBySymbol(item.symbol, item.current_price) + '</span>',
        '<span>' + trans('reco.buy_price', '매수 추천가') + ': ' + formatPriceBySymbol(item.symbol, item.buy_price) + '</span>',
        '<span>' + trans('reco.sell_price', '매도 추천가') + ': ' + formatPriceBySymbol(item.symbol, item.sell_price) + '</span>',
        '</div>',
        '<ul class="recommendation-reasons">' + reasonsHtml + '</ul>',
        '<div class="recommendation-time">' + trans('reco.time', '추천 시각') + ': ' + formatDateText(item.generated_at) + '</div>'
      ].join('');
      card.addEventListener('click', function () {
        applyRecommendationSelection(item);
      });
      refs.recommendationCards.appendChild(card);
    });
  }

  function refreshRecommendations(marketType, silent) {
    var settings = collectFormSettings();
    state.recommendationContext = buildRecommendationContext(marketType || 'stock', settings);
    state.recommendations = state.recommendationContext.candidates || [];
    syncSelectedRecommendationSymbol();
    renderRecommendationCards();
    renderTradingViewCharts();
    if (!silent) {
      addLog(trans('log.reco_ready', '추천 후보 생성 완료'), {
        market: marketType || 'stock',
        picked: state.recommendationContext.picked ? state.recommendationContext.picked.symbol : null,
        candidate_count: state.recommendations.length
      });
    }
  }

  function todayJournalEntries() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth();
    var d = now.getDate();
    return state.journalEntries.filter(function (entry) {
      var ts = new Date(entry.buy_at);
      return ts.getFullYear() === y && ts.getMonth() === m && ts.getDate() === d;
    });
  }

  function consecutiveLosses(entries) {
    var count = 0;
    entries.forEach(function (entry) {
      if (entry.pnl_krw < 0) {
        count += 1;
      } else {
        count = 0;
      }
    });
    return count;
  }

  function renderJournal() {
    var entries = Array.isArray(state.journalEntries) ? state.journalEntries : [];
    if (refs.journalTableBody) {
      clearNode(refs.journalTableBody);
      if (entries.length < 1) {
        var emptyRow = document.createElement('tr');
        var emptyCell = document.createElement('td');
        emptyCell.colSpan = 9;
        emptyCell.className = 'journal-empty';
        emptyCell.textContent = trans('journal.empty', '아직 기록된 매매 일지가 없습니다.');
        emptyRow.appendChild(emptyCell);
        refs.journalTableBody.appendChild(emptyRow);
      } else {
        entries.slice(0, 30).forEach(function (entry) {
          var row = document.createElement('tr');
          appendTableCell(row, entry.market_label || '-');
          appendTableCell(row, formatDateText(entry.buy_at));
          appendTableCell(row, formatDateText(entry.sell_at));
          appendTableCell(row, entry.entry_reason || '-');
          appendTableCell(row, (entry.pnl_krw >= 0 ? '+' : '') + formatKrw(entry.pnl_krw) + ' (' + percentText(entry.pnl_pct) + ')');
          appendTableCell(row, String(entry.reco_score || '-'));
          appendTableCell(row, (entry.reco_basis || []).join(', ') || '-');
          appendTableCell(row, entry.news_summary || '-');
          appendTableCell(row, entry.indicator_summary || '-');
          refs.journalTableBody.appendChild(row);
        });
      }
    }

    var total = entries.reduce(function (acc, entry) { return acc + numberOr(entry.pnl_krw, 0); }, 0);
    var wins = entries.filter(function (entry) { return numberOr(entry.pnl_krw, 0) > 0; }).length;
    var winRate = entries.length ? ((wins / entries.length) * 100) : 0;
    var equity = 0;
    var peak = 0;
    var maxDrawdown = 0;
    entries.slice().reverse().forEach(function (entry) {
      equity += numberOr(entry.pnl_krw, 0);
      if (equity > peak) {
        peak = equity;
      }
      if (peak > 0) {
        var dd = ((peak - equity) / peak) * 100;
        if (dd > maxDrawdown) {
          maxDrawdown = dd;
        }
      }
    });

    if (refs.summaryWinRate) {
      refs.summaryWinRate.textContent = percentText(winRate);
    }
    if (refs.summaryTotalPnl) {
      refs.summaryTotalPnl.textContent = (total >= 0 ? '+' : '') + formatKrw(total);
      refs.summaryTotalPnl.classList.remove('metric-up', 'metric-down');
      refs.summaryTotalPnl.classList.add(total >= 0 ? 'metric-up' : 'metric-down');
    }
    if (refs.summaryMaxDrawdown) {
      refs.summaryMaxDrawdown.textContent = percentText(maxDrawdown);
    }
  }

  function renderSummaryFromReport(report) {
    if (!report || !report.details || state.journalEntries.length > 0) {
      return;
    }
    var details = report.details;
    var winRate = numberOr(details.win_rate, 0) * (details.win_rate <= 1 ? 100 : 1);
    var total = numberOr(details.total_pnl_krw, 0);
    var maxDd = numberOr(details.max_drawdown_pct, numberOr(details.drawdown_pct, 0) * 100);
    if (refs.summaryWinRate) {
      refs.summaryWinRate.textContent = percentText(winRate);
    }
    if (refs.summaryTotalPnl) {
      refs.summaryTotalPnl.textContent = (total >= 0 ? '+' : '') + formatKrw(total);
      refs.summaryTotalPnl.classList.remove('metric-up', 'metric-down');
      refs.summaryTotalPnl.classList.add(total >= 0 ? 'metric-up' : 'metric-down');
    }
    if (refs.summaryMaxDrawdown) {
      refs.summaryMaxDrawdown.textContent = percentText(maxDd);
    }
  }

  function buildSimulatedJournalEntries(context, marketLabel, dryRun) {
    var picks = (context && context.recommended && context.recommended.length ? context.recommended : context.candidates || []).slice(0, 2);
    var profile = context ? context.profile : holdingProfile('day');
    var now = Date.now();
    return picks.map(function (item, index) {
      var holdMs = profile.key === 'scalp'
        ? randomBetween(1, 10) * 60 * 1000
        : (profile.key === 'swing' ? randomBetween(26, 90) * 60 * 60 * 1000 : randomBetween(1, 20) * 60 * 60 * 1000);
      var buyAt = new Date(now - ((index + 1) * 9 * 60 * 1000)).toISOString();
      var sellAt = new Date(Date.parse(buyAt) + holdMs).toISOString();
      var edge = (numberOr(item.score, 65) - 60) / 100;
      var pnlPct = dryRun ? (edge + randomBetween(-0.35, 0.4)) : (edge + randomBetween(-0.7, 0.85));
      var pnlKrw = Math.round(numberOr(item.score, 70) * 8500 * pnlPct);
      return {
        market_label: marketLabel + (dryRun ? ' (DRY RUN)' : ' (LIVE)'),
        buy_at: buyAt,
        sell_at: sellAt,
        entry_reason: (item.reasons || []).slice(0, 2).join(' + ') || trans('reco.reason.trend', '추세 상승'),
        pnl_krw: pnlKrw,
        pnl_pct: pnlPct,
        reco_score: item.score,
        reco_basis: item.reasons || [],
        news_summary: '뉴스 긍정 ' + Math.round(numberOr(item.news_positive, 0) * 100) + '%, 언급량 +' + Math.round(numberOr(item.news_mentions_delta_pct, 0)) + '%',
        indicator_summary: 'RSI ' + Math.round(numberOr(item.rsi, 0)) + ', MA ' + Math.round(numberOr(item.ma_short, 0)) + '/' + Math.round(numberOr(item.ma_long, 0)),
        recommendation: {
          score: item.score,
          reasons: item.reasons || [],
          rsi: item.rsi,
          ma_short: item.ma_short,
          ma_long: item.ma_long,
          volume_growth_pct: item.volume_growth_pct
        },
        simulated: dryRun
      };
    });
  }

  function toSafetyChecks(settings, context) {
    var checks = [];
    var todayEntries = todayJournalEntries();
    var todayPnl = todayEntries.reduce(function (acc, entry) { return acc + numberOr(entry.pnl_krw, 0); }, 0);
    if (todayPnl <= (-1 * numberOr(settings.dailyMaxLoss, 300000))) {
      checks.push(trans('check.daily_loss', '하루 최대 손실 한도 초과'));
    }
    if (todayEntries.length >= numberOr(settings.dailyMaxTrades, 8)) {
      checks.push(trans('check.daily_trades', '하루 최대 거래 횟수 한도 도달'));
    }
    if (consecutiveLosses(todayEntries) >= numberOr(settings.maxConsecutiveLosses, 3)) {
      checks.push(trans('check.consecutive_losses', '연속 손실 자동중지 조건 충족'));
    }
    if (context && context.market_snapshot && numberOr(context.market_snapshot.btc_change_pct_24h, 0) <= (-1 * numberOr(settings.marketCrashStopPct, 3))) {
      checks.push(trans('check.market_crash', '시장 급락 자동중지 발동') + ': BTC ' + percentText(context.market_snapshot.btc_change_pct_24h));
    }
    if (!context || !context.picked || numberOr(context.picked.score, 0) < 70) {
      checks.push(trans('check.score_threshold', '추천 점수 70점 미만'));
    }
    return checks;
  }

  function maskCredentialValue(value) {
    var text = String(value || '');
    if (!text) {
      return '';
    }
    if (text.length <= 6) {
      return '***';
    }
    return text.slice(0, 3) + '***' + text.slice(-2);
  }

  async function storeCredentialsInVault(payloadCredentials) {
    var keys = Object.keys(payloadCredentials || {}).filter(function (key) {
      return String(payloadCredentials[key] || '').trim().length > 0;
    });
    if (keys.length < 1) {
      return;
    }
    try {
      var response = await callApi('storeCredentials', 'POST', { credentials: payloadCredentials });
      addLog(trans('log.credentials_vault_ok', '민감정보 서버 저장 완료'), {
        stored_keys: keys.map(function (key) { return key; }),
        masked: keys.reduce(function (acc, key) {
          acc[key] = maskCredentialValue(payloadCredentials[key]);
          return acc;
        }, {}),
        result: response
      });
    } catch (err) {
      addLog(trans('log.credentials_vault_fail', '민감정보 서버 저장 실패'), String(err.message || err));
    }
  }

  function setLiveModalStep(step) {
    state.liveConfirmStep = step;
    if (refs.liveConfirmStepText) {
      refs.liveConfirmStepText.textContent = step === 1
        ? trans('live.step1', '1 / 2 확인 단계')
        : trans('live.step2', '2 / 2 최종 확인');
    }
    if (refs.btnLiveConfirmNext) {
      refs.btnLiveConfirmNext.hidden = step !== 1;
    }
    if (refs.btnLiveConfirmFinal) {
      refs.btnLiveConfirmFinal.hidden = step !== 2;
    }
  }

  function closeLiveConfirmModal(accepted) {
    if (refs.liveConfirmModal) {
      refs.liveConfirmModal.hidden = true;
    }
    if (typeof state.liveConfirmResolver === 'function') {
      state.liveConfirmResolver(Boolean(accepted));
    }
    state.liveConfirmResolver = null;
    setLiveModalStep(1);
  }

  function askLiveConfirmation(orderMax, dailyLoss) {
    if (!refs.liveConfirmModal) {
      var first = window.confirm('실거래 전환 확인\n1회 최대 주문금액: ' + formatKrw(orderMax) + '\n하루 최대 손실: ' + formatKrw(dailyLoss) + '\n위 한도 기준으로 주문을 실행합니다.');
      if (!first) {
        return Promise.resolve(false);
      }
      return Promise.resolve(window.confirm('실거래 모드를 계속 진행하시겠습니까?'));
    }
    if (refs.liveConfirmOrderMax) {
      refs.liveConfirmOrderMax.textContent = formatKrw(orderMax);
    }
    if (refs.liveConfirmLossLimit) {
      refs.liveConfirmLossLimit.textContent = formatKrw(dailyLoss);
    }
    refs.liveConfirmModal.hidden = false;
    setLiveModalStep(1);
    return new Promise(function (resolve) {
      state.liveConfirmResolver = resolve;
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

  function callApi(endpointName, method, body, options) {
    var opts = Object.assign({}, options || {});
    var runtimeApiToken = String((refs.apiToken && refs.apiToken.value) || '').trim();
    if (runtimeApiToken) {
      opts.apiToken = runtimeApiToken;
    }
    return core.callApi(endpointName, method, body, opts);
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
    refs.apiToken.value = '';
    refs.accountNo.value = settings.accountNo;
    refs.stockSymbol.value = settings.stockSymbol;
    refs.stockBudget.value = String(settings.stockBudget);
    refs.stockAutoSelect.value = String(Boolean(settings.stockAutoSelect));
    refs.holdingPeriod.value = settings.holdingPeriod || 'day';
    if (refs.chartEnabled) {
      refs.chartEnabled.value = String(settings.chartEnabled !== false);
    }
    refs.stockDryRun.value = String(Boolean(settings.stockDryRun));
    refs.dailyMaxLoss.value = String(settings.dailyMaxLoss || 300000);
    refs.dailyMaxTrades.value = String(settings.dailyMaxTrades || 8);
    refs.maxConsecutiveLosses.value = String(settings.maxConsecutiveLosses || 3);
    refs.marketCrashStopPct.value = String(settings.marketCrashStopPct || 3);
    refs.kiwoomApiKey.value = '';
    refs.kiwoomApiSecret.value = '';
    refs.telegramToken.value = '';
    refs.telegramChatId.value = settings.telegramChatId;

    refs.coinExchange.value = settings.coinExchange;
    refs.coinSymbol.value = settings.coinSymbol;
    refs.coinBudget.value = String(settings.coinBudget);
    refs.coinAutoSelect.value = String(Boolean(settings.coinAutoSelect));
    refs.coinDryRun.value = String(Boolean(settings.coinDryRun));
    refs.binanceApiKey.value = '';
    refs.binanceApiSecret.value = '';
    refs.upbitApiKey.value = '';
    refs.upbitApiSecret.value = '';

    renderStrategyPreset();
    updateCoinCredentialFields();
    renderTradingViewCharts();
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
      holdingPeriod: refs.holdingPeriod.value,
      chartEnabled: refs.chartEnabled ? refs.chartEnabled.value === 'true' : true,
      stockDryRun: refs.stockDryRun.value === 'true',
      dailyMaxLoss: refs.dailyMaxLoss.value,
      dailyMaxTrades: refs.dailyMaxTrades.value,
      maxConsecutiveLosses: refs.maxConsecutiveLosses.value,
      marketCrashStopPct: refs.marketCrashStopPct.value,
      kiwoomApiKey: '',
      kiwoomApiSecret: '',

      coinExchange: refs.coinExchange.value,
      coinSymbol: refs.coinSymbol.value.trim(),
      coinBudget: refs.coinBudget.value,
      coinAutoSelect: refs.coinAutoSelect.value === 'true',
      coinDryRun: refs.coinDryRun.value === 'true',
      binanceApiKey: '',
      binanceApiSecret: '',
      upbitApiKey: '',
      upbitApiSecret: '',

      telegramToken: '',
      telegramChatId: refs.telegramChatId.value.trim()
    });
  }

  function collectRuntimeSecrets() {
    return {
      apiToken: String((refs.apiToken && refs.apiToken.value) || '').trim(),
      kiwoomApiKey: String((refs.kiwoomApiKey && refs.kiwoomApiKey.value) || '').trim(),
      kiwoomApiSecret: String((refs.kiwoomApiSecret && refs.kiwoomApiSecret.value) || '').trim(),
      telegramToken: String((refs.telegramToken && refs.telegramToken.value) || '').trim(),
      binanceApiKey: String((refs.binanceApiKey && refs.binanceApiKey.value) || '').trim(),
      binanceApiSecret: String((refs.binanceApiSecret && refs.binanceApiSecret.value) || '').trim(),
      upbitApiKey: String((refs.upbitApiKey && refs.upbitApiKey.value) || '').trim(),
      upbitApiSecret: String((refs.upbitApiSecret && refs.upbitApiSecret.value) || '').trim()
    };
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
    renderApiHealth();
    renderStrategyPreset();
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

    if (key === 'coin') {
      refreshRecommendations('crypto', true);
    } else if (key === 'stock') {
      refreshRecommendations('stock', true);
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
      checks.push(trans('check.plan', '구독권 필요'));
    }
    if (settings.apiBase && !state.apiChecked) {
      checks.push(trans('check.api', 'API 연결 확인 필요'));
    }
    if (state.apiHealth.checked && state.apiHealth.order_permission === false) {
      checks.push(trans('check.order_permission', '주문 권한 없음'));
    }
    if (state.apiHealth.checked && state.apiHealth.ip_restricted === true) {
      checks.push(trans('check.ip_restricted', 'IP 제한으로 주문 불가'));
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
        ? (trans('guard.prefix', '사전 확인 항목') + ': ' + visibleChecks.join(' / '))
        : trans('guard.ready', '사전 확인이 완료되었습니다. 자동매매를 시작할 수 있습니다.');
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
      var data = await callApi('me', 'GET');
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
        addLog(trans('log.session_fail', '세션 불러오기 실패'), String(err.message || err));
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
      var data = await callApi('billingStatus', 'GET');
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
      var data = await callApi('verifyStart', 'POST', {});
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
      var data = await callApi('verifyComplete', 'POST', { code: code });
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
    var secrets = collectRuntimeSecrets();
    var hasCredential = Boolean(
      secrets.kiwoomApiKey ||
      secrets.binanceApiKey ||
      secrets.upbitApiKey
    );
    var data;
    try {
      data = await callApi('health', 'GET', null, { withAuth: false, apiBase: settings.apiBase });
      state.apiChecked = true;
      addLog(trans('log.api_ok', 'API 연결 성공'), data);
    } catch (err) {
      state.apiChecked = false;
      addLog(trans('log.api_fail', 'API 연결 실패'), String(err.message || err));
      data = {};
    }
    state.apiHealth.checked = true;
    state.apiHealth.api_key_valid = typeof data.api_key_valid === 'boolean' ? (data.api_key_valid || hasCredential) : hasCredential;
    state.apiHealth.balance_available = typeof data.balance_available === 'boolean' ? (data.balance_available || hasCredential) : hasCredential;
    state.apiHealth.order_permission = typeof data.order_permission === 'boolean' ? (data.order_permission || hasCredential) : hasCredential;
    state.apiHealth.ip_restricted = typeof data.ip_restricted === 'boolean' ? data.ip_restricted : false;
    state.apiHealth.checked_at = data.checked_at || new Date().toISOString();
    renderApiHealth();
    updateStatus();
    updateGuard();
  }

  function checksToText(checks) {
    return checks.join(' / ');
  }

  async function startStockTrading() {
    var settings = collectFormSettings();
    var secrets = collectRuntimeSecrets();
    var context = buildRecommendationContext('stock', settings);
    state.recommendationContext = context;
    state.recommendations = context.candidates || [];
    syncSelectedRecommendationSymbol();
    renderRecommendationCards();
    renderTradingViewCharts();
    var checks = buildChecks('stock');
    var safetyChecks = toSafetyChecks(settings, context);
    checks = checks.concat(safetyChecks);
    if (checks.length > 0) {
      addLog(trans('log.safety_blocked', '안전장치로 실행 차단'), checksToText(checks));
      addLog(trans('log.stock_start_fail', '주식 자동매매 시작 실패'), checksToText(checks));
      return;
    }

    if (!settings.stockDryRun) {
      if (!secrets.kiwoomApiKey || !secrets.kiwoomApiSecret) {
        addLog(trans('log.stock_start_fail', '주식 자동매매 시작 실패'), '실거래를 위해 Kiwoom API Key/Secret이 필요합니다.');
        return;
      }
      var accepted = await askLiveConfirmation(settings.stockBudget, settings.dailyMaxLoss);
      if (!accepted) {
        addLog(trans('log.live_confirm_cancelled', '실거래 확인 취소'), { market: 'stock' });
        return;
      }
    }

    var picked = context.picked;
    var finalSymbol = settings.stockAutoSelect && picked ? picked.symbol : settings.stockSymbol;
    var strategyProfile = holdingProfile(settings.holdingPeriod);

    await storeCredentialsInVault({
      kiwoom_api_key: secrets.kiwoomApiKey,
      kiwoom_api_secret: secrets.kiwoomApiSecret,
      telegram_bot_token: secrets.telegramToken
    });

    var payload = {
      market_type: 'stock',
      exchange: 'kiwoom',
      account_no: settings.accountNo,
      symbol: finalSymbol,
      max_order_amount_krw: settings.stockBudget,
      auto_select_top_candidate: settings.stockAutoSelect,
      candidate_pool_size: 10,
      selection_policy: settings.stockAutoSelect ? 'top10_pick1' : 'manual_single',
      dry_run: settings.stockDryRun,
      holding_period: settings.holdingPeriod,
      risk_limits: {
        daily_max_loss_krw: settings.dailyMaxLoss,
        daily_max_trades: settings.dailyMaxTrades,
        max_consecutive_losses: settings.maxConsecutiveLosses,
        market_crash_stop_pct: settings.marketCrashStopPct
      },
      recommendation: picked ? {
        symbol: picked.symbol,
        score: picked.score,
        reasons: picked.reasons,
        news_summary: '뉴스 긍정 비율 ' + Math.round(numberOr(picked.news_positive, 0) * 100) + '%, 언급 증가율 +' + Math.round(numberOr(picked.news_mentions_delta_pct, 0)) + '%',
        indicators: {
          rsi: picked.rsi,
          ma_short: picked.ma_short,
          ma_long: picked.ma_long,
          volume_growth_pct: picked.volume_growth_pct
        }
      } : null,
      strategy_profile: strategyProfile,
      engine_pipeline: context.pipeline,
      telegram_bot_token: secrets.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: {
        kiwoom: {
          api_key: secrets.kiwoomApiKey,
          api_secret: secrets.kiwoomApiSecret
        }
      }
    };

    if (numberOr(context.market_snapshot && context.market_snapshot.btc_change_pct_24h, 0) <= (-1 * numberOr(settings.marketCrashStopPct, 3))) {
      addLog(trans('log.market_crash_stop', '시장 급락 자동중지 발동'), context.market_snapshot);
      return;
    }

    if (settings.stockDryRun) {
      addLog(trans('log.dry_run_plan', '드라이런 주문 예정 기록(실주문 없음)'), {
        market: 'stock',
        symbol: finalSymbol,
        order_amount: settings.stockBudget,
        score: picked ? picked.score : null,
        reasons: picked ? picked.reasons : []
      });
    }

    try {
      var data = await callApi('start', 'POST', payload);
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      state.journalEntries = buildSimulatedJournalEntries(context, '주식', settings.stockDryRun).concat(state.journalEntries);
      renderJournal();
      addLog(trans('log.stock_start_ok', '주식 자동매매 시작 요청 완료'), data);
    } catch (err) {
      addLog(trans('log.stock_start_fail', '주식 자동매매 시작 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function startCoinTrading() {
    var settings = collectFormSettings();
    var secrets = collectRuntimeSecrets();
    var context = buildRecommendationContext('crypto', settings);
    state.recommendationContext = context;
    state.recommendations = context.candidates || [];
    syncSelectedRecommendationSymbol();
    renderRecommendationCards();
    renderTradingViewCharts();
    var checks = buildChecks('coin');
    var safetyChecks = toSafetyChecks(settings, context);
    checks = checks.concat(safetyChecks);
    if (checks.length > 0) {
      addLog(trans('log.safety_blocked', '안전장치로 실행 차단'), checksToText(checks));
      addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), checksToText(checks));
      return;
    }

    if (!settings.coinDryRun) {
      if (settings.coinExchange === 'upbit') {
        if (!secrets.upbitApiKey || !secrets.upbitApiSecret) {
          addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), '실거래를 위해 Upbit Access/Secret Key가 필요합니다.');
          return;
        }
      } else if (!secrets.binanceApiKey || !secrets.binanceApiSecret) {
        addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), '실거래를 위해 Binance API Key/Secret이 필요합니다.');
        return;
      }
      var accepted = await askLiveConfirmation(settings.coinBudget, settings.dailyMaxLoss);
      if (!accepted) {
        addLog(trans('log.live_confirm_cancelled', '실거래 전환이 취소되었습니다.'), { market: 'crypto' });
        return;
      }
    }

    var picked = context.picked;
    var finalSymbol = settings.coinAutoSelect && picked ? picked.symbol : settings.coinSymbol;
    var strategyProfile = holdingProfile(settings.holdingPeriod);

    var credential;
    if (settings.coinExchange === 'upbit') {
      credential = {
        upbit: {
          access_key: secrets.upbitApiKey,
          secret_key: secrets.upbitApiSecret
        }
      };
    } else {
      credential = {
        binance: {
          api_key: secrets.binanceApiKey,
          api_secret: secrets.binanceApiSecret
        }
      };
    }

    await storeCredentialsInVault(settings.coinExchange === 'upbit'
      ? { upbit_access_key: secrets.upbitApiKey, upbit_secret_key: secrets.upbitApiSecret, telegram_bot_token: secrets.telegramToken }
      : { binance_api_key: secrets.binanceApiKey, binance_api_secret: secrets.binanceApiSecret, telegram_bot_token: secrets.telegramToken });

    var payload = {
      market_type: 'crypto',
      exchange: settings.coinExchange,
      account_no: settings.accountNo,
      symbol: finalSymbol,
      max_order_amount_krw: settings.coinBudget,
      auto_select_top_candidate: settings.coinAutoSelect,
      candidate_pool_size: 10,
      selection_policy: settings.coinAutoSelect ? 'top10_pick1' : 'manual_single',
      dry_run: settings.coinDryRun,
      holding_period: settings.holdingPeriod,
      risk_limits: {
        daily_max_loss_krw: settings.dailyMaxLoss,
        daily_max_trades: settings.dailyMaxTrades,
        max_consecutive_losses: settings.maxConsecutiveLosses,
        market_crash_stop_pct: settings.marketCrashStopPct
      },
      recommendation: picked ? {
        symbol: picked.symbol,
        score: picked.score,
        reasons: picked.reasons,
        news_summary: '뉴스 긍정 비율 ' + Math.round(numberOr(picked.news_positive, 0) * 100) + '%, 언급 증가율 +' + Math.round(numberOr(picked.news_mentions_delta_pct, 0)) + '%',
        indicators: {
          rsi: picked.rsi,
          ma_short: picked.ma_short,
          ma_long: picked.ma_long,
          volume_growth_pct: picked.volume_growth_pct
        }
      } : null,
      strategy_profile: strategyProfile,
      engine_pipeline: context.pipeline,
      telegram_bot_token: secrets.telegramToken,
      telegram_chat_id: settings.telegramChatId,
      credentials: credential
    };

    if (numberOr(context.market_snapshot && context.market_snapshot.btc_change_pct_24h, 0) <= (-1 * numberOr(settings.marketCrashStopPct, 3))) {
      addLog(trans('log.market_crash_stop', '시장 급락으로 자동매매가 중지되었습니다.'), context.market_snapshot);
      return;
    }

    if (settings.coinDryRun) {
      addLog(trans('log.dry_run_plan', '모의투자 모드로 주문 예정 정보만 기록합니다.'), {
        market: settings.coinExchange,
        symbol: finalSymbol,
        order_amount: settings.coinBudget,
        score: picked ? picked.score : null,
        reasons: picked ? picked.reasons : []
      });
    }

    try {
      var data = await callApi('start', 'POST', payload);
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      state.journalEntries = buildSimulatedJournalEntries(context, settings.coinExchange.toUpperCase(), settings.coinDryRun).concat(state.journalEntries);
      renderJournal();
      addLog(trans('log.coin_start_ok', '코인 자동매매가 시작되었습니다.'), data);
    } catch (err) {
      addLog(trans('log.coin_start_fail', '코인 자동매매 시작 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function stopTrading() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.stop_fail', '자동매매 중지 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    try {
      var data = await callApi('stop', 'POST', {});
      addLog(trans('log.stop_ok', '자동매매 중지 요청이 완료되었습니다.'), data);
    } catch (err) {
      addLog(trans('log.stop_fail', '자동매매 중지 실패'), String(err.message || err));
    }
  }

  async function runAnalyze() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.analyze_fail', '분석 실행 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    try {
      var data = await callApi('analyze', 'POST', { trigger: 'manual' });
      renderSummaryFromReport(data.report);
      addLog(trans('log.analyze_ok', '분석 요청이 완료되었습니다.'), data);
    } catch (err) {
      addLog(trans('log.analyze_fail', '분석 실행 실패'), String(err.message || err));
    }
  }

  async function loadLatestReport() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.report_fail', '리포트 조회 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    try {
      var data = await callApi('reportLatest', 'GET');
      renderSummaryFromReport(data.report);
      addLog(trans('log.report_ok', '최신 리포트를 불러왔습니다.'), data);
    } catch (err) {
      addLog(trans('log.report_fail', '리포트 조회 실패'), String(err.message || err));
    }
  }

  async function startCheckout() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.checkout_fail', '결제 시작 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    try {
      var data = await callApi('billingCheckout', 'POST', { plan: 'monthly' });
      state.checkoutId = (data.checkout && data.checkout.checkout_id) || '';
      addLog(trans('log.checkout_ok', '결제 세션이 생성되었습니다.'), data);
    } catch (err) {
      addLog(trans('log.checkout_fail', '결제 시작 실패'), String(err.message || err));
    }
  }

  async function confirmPayment() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.confirm_fail', '결제 확인 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    try {
      var data = await callApi('billingConfirm', 'POST', { checkout_id: state.checkoutId || undefined });
      if (data.billing) {
        saveSession({ billing: data.billing });
      }
      addLog(trans('log.confirm_ok', '결제 상태가 갱신되었습니다.'), data);
    } catch (err) {
      addLog(trans('log.confirm_fail', '결제 확인 실패'), String(err.message || err));
    }
    updateStatus();
    updateGuard();
  }

  async function exportUsers() {
    var session = currentSession();
    if (!session.token) {
      addLog(trans('log.users_fail', '회원 목록 조회 실패'), trans('log.need_login_first', '먼저 로그인해 주세요.'));
      return;
    }
    if (!isAdminUser(session.user)) {
      addLog(trans('log.admin_required', '관리자 권한이 필요합니다.'), trans('admin.access_denied', '관리자 계정만 접근할 수 있습니다.'));
      state.adminUsersLoaded = false;
      state.adminUsers = [];
      renderAdminTableMessage(trans('admin.access_denied', '관리자 계정만 접근할 수 있습니다.'));
      goToTab('home');
      return;
    }
    try {
      var data = await callApi('adminUsers', 'GET');
      state.adminUsers = Array.isArray(data.users) ? data.users : [];
      state.adminUsersLoaded = true;
      renderUserTable();
      addLog(trans('log.users_ok', '회원 정보를 불러왔습니다.'), { count: state.adminUsers.length });
    } catch (err) {
      addLog(trans('log.users_fail', '회원 목록 조회 실패'), String(err.message || err));
      state.adminUsersLoaded = false;
      state.adminUsers = [];
      renderAdminTableMessage(String(err.message || err));
    }
  }

  function runLogout() {
    core.clearSession();
    destroyChartWidget('stock');
    destroyChartWidget('coin');
    state.apiChecked = false;
    state.checkoutId = '';
    state.adminUsersLoaded = false;
    state.adminUsers = [];
    state.recommendations = [];
    state.recommendationContext = null;
    state.selectedRecommendationSymbol = '';
    state.selectedChartSymbols.stock = '';
    state.selectedChartSymbols.coin = '';
    state.journalEntries = [];
    state.apiHealth = {
      checked: false,
      api_key_valid: null,
      balance_available: null,
      order_permission: null,
      ip_restricted: null,
      checked_at: ''
    };
    renderUserTable();
    renderRecommendationCards();
    renderJournal();
    renderApiHealth();
    renderTradingViewCharts();
    addLog(trans('log.logout.title', '로그아웃 완료'), trans('log.logout.body', '세션이 정리되었습니다.'));
    updateStatus();
    updateGuard();
    goToTab('home');
  }

  function goToTab(tab) {
    setActiveTab(tab);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  function goToHomeSection(sectionId) {
    setActiveTab('home');
    var node = document.getElementById(sectionId);
    if (!node) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.requestAnimationFrame(function () {
      node.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  function startTrialFlow() {
    var session = currentSession();
    if (!session.user) {
      window.location.href = './signup.html';
      return;
    }
    goToTab('stock');
    addLog(
      trans('log.trial_info.title', '7일 무료체험 안내'),
      trans('log.trial_info.body', '7일 무료체험 동안 자동매매를 이용할 수 있으며, 이후에는 구독 결제가 필요합니다.')
    );
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
    window.addEventListener('beforeunload', function () {
      destroyChartWidget('stock');
      destroyChartWidget('coin');
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && state.menuOpen) {
        setMenuOpen(false);
      }
      if (event.key === 'Escape' && refs.liveConfirmModal && !refs.liveConfirmModal.hidden) {
        closeLiveConfirmModal(false);
      }
    });

    refs.navPills.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setActiveTab(btn.dataset.tab);
      });
    });

    bindButton(refs.btnLangKo, function () { setLanguage('ko'); });
    bindButton(refs.btnLangEn, function () { setLanguage('en'); });

    bindButton(refs.btnNavFeatures, function () { goToHomeSection('landing-features'); });
    bindButton(refs.btnNavSecurity, function () { goToHomeSection('landing-security'); });
    bindButton(refs.btnNavPricing, function () { goToHomeSection('landing-pricing'); });
    bindButton(refs.btnNavFaq, function () { goToHomeSection('landing-faq'); });
    bindButton(refs.btnNavStart, startTrialFlow);
    bindButton(refs.btnTrial, startTrialFlow);
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
    bindButton(refs.btnRefreshReco, function () {
      refreshRecommendations(state.activeTab === 'coin' ? 'crypto' : 'stock', false);
    });

    if (refs.stockForm) {
      refs.stockForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var saved = collectFormSettings();
        addLog(trans('log.stock_saved', '주식 설정이 저장되었습니다.'), {
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
        addLog(trans('log.coin_saved', '코인 설정이 저장되었습니다.'), {
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
        renderTradingViewCharts();
      });
    }
    if (refs.holdingPeriod) {
      refs.holdingPeriod.addEventListener('change', function () {
        renderStrategyPreset();
      });
    }

    bindButton(refs.btnLiveConfirmCancel, function () { closeLiveConfirmModal(false); });
    bindButton(refs.btnLiveConfirmNext, function () { setLiveModalStep(2); });
    bindButton(refs.btnLiveConfirmFinal, function () { closeLiveConfirmModal(true); });
    if (refs.liveConfirmModal) {
      refs.liveConfirmModal.addEventListener('click', function (event) {
        var target = event.target;
        if (target && target.getAttribute && target.getAttribute('data-close-live-modal') === 'true') {
          closeLiveConfirmModal(false);
        }
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
      refs.holdingPeriod,
      refs.chartEnabled,
      refs.stockDryRun,
      refs.dailyMaxLoss,
      refs.dailyMaxTrades,
      refs.maxConsecutiveLosses,
      refs.marketCrashStopPct,
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
        if (node === refs.holdingPeriod) {
          renderStrategyPreset();
        }
        if (node === refs.stockSymbol || node === refs.coinSymbol || node === refs.coinExchange || node === refs.holdingPeriod || node === refs.chartEnabled) {
          renderTradingViewCharts();
        }
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
    collectFormSettings();
    renderApiHealth();
    renderJournal();
    refreshRecommendations('stock', true);
    renderTradingViewCharts();
    bindEvents();
    setMenuOpen(false);
    setActiveTab('home');
    addLog(trans('log.dashboard_ready.title', '대시보드 준비 완료'), trans('log.dashboard_ready.body', '계정 연결 후 설정을 저장하고 자동매매를 시작할 수 있습니다.'));
    refreshMe(true).then(function () {
      return refreshBillingStatus(true);
    });
  }

  init();
})();
