# systemtrading-cloudflare-pages

Cloudflare Pages에 바로 배포 가능한 자동매매 웹 콘솔입니다.

## 주요 구성

- 홈 탭: 홍보 문구 + 빠른 이동 + 상태 요약
- 시스템 소개 탭: 데이터 수집/후보 압축/실행/회고 루프 소개
- 주식 투자 탭: Kiwoom 연동 설정, Telegram 알림 설정, 자동매매 시작
- 코인 투자 탭: Binance/Upbit 설정, 자동매매 시작/중지/분석
- 이용권/결제 탭: 7일 무료체험 상태, 구독 결제, 회원 데이터 관리 가이드
- 회원가입/로그인 페이지 분리
  - `signup.html`
  - `login.html`

## 7일 무료체험 + 구독 정책

- 회원가입 시 무료체험 7일 자동 시작
- 무료체험 또는 구독이 활성 상태일 때만 자동매매 시작 가능
- 무료체험 만료 후 자동매매는 구독 결제 완료 시 다시 활성화
- 데모 모드에서는 `결제 시작 -> 결제 완료 처리` 버튼으로 흐름 테스트 가능

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

접속 주소:

- `http://localhost:8080`
- `http://localhost:8080/signup.html`
- `http://localhost:8080/login.html`

## 데모 모드

- `API Base URL`을 비워두면 LocalStorage 기반 Mock API로 동작합니다.
- 회원가입/로그인/본인인증/이용권/자동매매 플로우를 서버 없이 점검할 수 있습니다.

## 실서비스 연동 API

### Health

- `GET /health`

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### KYC

- `POST /api/auth/verify/start`
- `POST /api/auth/verify/complete`

### Billing

- `GET /api/billing/status`
- `POST /api/billing/checkout`
- `POST /api/billing/confirm`
- `GET /api/admin/users` (운영자용)

### Trading

- `POST /api/trading/start`
- `POST /api/trading/stop`
- `POST /api/trading/analyze`
- `GET /api/trading/report/latest`

## 회원정보 보관/관리 권장 구조

- DB 분리: `users`, `kyc_status`, `subscription`, `payments`, `trade_logs`
- 비밀번호: Argon2/PBKDF2 해시 저장
- API 키/시크릿: 평문 저장 금지, KMS 기반 암호화(AES-GCM) 저장
- 결제 동기화: PG Webhook 검증 후 서버에서 구독 상태 갱신
- 운영자 콘솔: 회원 검색, 인증 상태, 무료체험/구독 만료, 결제 이력 조회

## 보안 주의

- 실제 키움/거래소 주문 호출은 반드시 백엔드에서 서명 후 실행
- 프론트엔드는 제어 요청만 전송하고 민감키는 서버에서만 관리
- 본인인증 완료 여부와 결제 상태는 서버 단일 원천(DB)으로 판정
