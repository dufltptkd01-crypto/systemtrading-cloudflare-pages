window.APP_CONFIG = {
  // Cloudflare Pages에서는 정적 파일만 배포됩니다.
  // 실제 운영 시 아래 값을 백엔드 URL로 교체하거나, UI 입력칸에 직접 넣으세요.
  defaultApiBase: '',
  endpoints: {
    health: '/health',
    start: '/api/trading/start',
    stop: '/api/trading/stop',
    analyze: '/api/trading/analyze',
    reportLatest: '/api/trading/report/latest'
  }
};
