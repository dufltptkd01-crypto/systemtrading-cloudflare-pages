window.APP_CONFIG = {
  // 비워두면 데모(Mock) 모드로 동작합니다.
  defaultApiBase: '',

  // 필요 시 본인인증 공급자 정보(예: PortOne/NICE) 전달용 확장 필드
  identity: {
    provider: 'mock',
    channelKey: '',
    merchantId: ''
  },

  endpoints: {
    health: '/health',
    register: '/api/auth/register',
    login: '/api/auth/login',
    me: '/api/auth/me',
    verifyStart: '/api/auth/verify/start',
    verifyComplete: '/api/auth/verify/complete',
    billingStatus: '/api/billing/status',
    billingCheckout: '/api/billing/checkout',
    billingConfirm: '/api/billing/confirm',
    adminUsers: '/api/admin/users',
    start: '/api/trading/start',
    stop: '/api/trading/stop',
    analyze: '/api/trading/analyze',
    reportLatest: '/api/trading/report/latest'
  }
};
