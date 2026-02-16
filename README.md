# systemtrading-cloudflare-pages

Cloudflare Pages에 바로 배포 가능한 프리미엄 트레이딩 웹 콘솔입니다.

## 주요 기능

- 첨부 레퍼런스 톤 기반의 퍼플 프리미엄 UI
- 탭 구성
  - `시스템 소개`
  - `주식 투자`
  - `코인 투자`
- 시스템 소개 탭에 매매 프로세스/매매일지 피드백 루프 시각화
- 회원가입/로그인 화면 분리
  - `signup.html`
  - `login.html`
- 모바일 우선 반응형 UX
- 주식 + 코인 멀티 마켓 설정
  - Stock: Kiwoom
  - Crypto: Binance / Upbit
- 자동매매 시작/중지
- 매매일지 분석 요청 및 최신 리포트 조회
- Telegram 알림 정보 입력
- API URL이 비어 있을 때 데모(Mock) 모드 내장

## 배포 (Cloudflare Pages)

1. GitHub 저장소 연결
2. Framework preset: `None`
3. Build command: 비움
4. Build output directory: `/`
5. Deploy

## 로컬 실행

```powershell
cd systemtrading-cloudflare-pages
python -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속.

분리된 인증 페이지:
- `http://localhost:8080/signup.html`
- `http://localhost:8080/login.html`

## 데모 모드

- `API Base URL`을 비워두면 브라우저 LocalStorage 기반 데모 모드로 동작합니다.
- 회원가입/로그인/본인인증/자동매매 제어를 즉시 체험할 수 있습니다.
- 실제 주문은 발생하지 않습니다.

## 실서비스 연동 시 필요한 백엔드 API

### Health
- `GET /health`

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### KYC
- `POST /api/auth/verify/start`
- `POST /api/auth/verify/complete`

### Trading
- `POST /api/trading/start`
- `POST /api/trading/stop`
- `POST /api/trading/analyze`
- `GET /api/trading/report/latest`

## 자동매매 시작 요청 예시

```json
{
  "market_type": "crypto",
  "exchange": "binance",
  "account_no": "8120-0764",
  "symbol": "BTC/USDT",
  "max_order_amount_krw": 2000000,
  "auto_select_top_candidate": true,
  "dry_run": true,
  "telegram_bot_token": "123456:ABC",
  "telegram_chat_id": "123456789",
  "credentials": {
    "kiwoom": {
      "api_key": "",
      "api_secret": ""
    },
    "binance": {
      "api_key": "",
      "api_secret": ""
    },
    "upbit": {
      "access_key": "",
      "secret_key": ""
    }
  }
}
```

## 보안 참고

- 실제 운영에서는 API 키/시크릿을 프론트에 직접 저장하지 말고 백엔드에서 암호화 저장하세요.
- 본인인증은 PortOne/NICE 등 상용 인증사 연동 후 서버에서 검증 완료 상태를 관리하세요.
- 거래 API는 반드시 서버에서 서명/호출하고, 프론트는 제어 요청만 전송하도록 구성하세요.
