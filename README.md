# systemtrading-cloudflare-pages

Cloudflare Pages에 바로 배포 가능한 정적 웹 대시보드입니다.

## 포함 기능

- 자동매매 설정 입력 (계좌번호, 1회 최대 주문금액, Telegram 정보 등)
- API 연결 확인
- 자동매매 시작/중지 버튼
- 매매일지 분석 요청 및 최신 리포트 조회
- 설정값 브라우저 로컬 저장

## 중요한 구조

- 이 저장소는 **프론트엔드(정적 페이지)** 전용입니다.
- Kiwoom OpenAPI 연동 자동매매는 별도 백엔드 서버(보통 Windows 환경)에서 실행되어야 합니다.
- 본 페이지는 그 백엔드의 REST API를 호출해 제어합니다.

## Cloudflare Pages 배포

1. GitHub에 이 저장소 푸시
2. Cloudflare Dashboard > Pages > Create project
3. 이 저장소 연결
4. Build settings
   - Framework preset: `None`
   - Build command: 비워두기
   - Build output directory: `/`
5. Deploy

## 로컬 테스트

```powershell
cd systemtrading-cloudflare-pages
python -m http.server 8080
```

브라우저에서 `http://localhost:8080` 접속.

## 백엔드 API 계약(예시)

- `GET /health`
- `POST /api/trading/start`
- `POST /api/trading/stop`
- `POST /api/trading/analyze`
- `GET /api/trading/report/latest`

`POST /api/trading/start` 요청 본문 예시:

```json
{
  "account_no": "8120-0764",
  "broker_api_key": "...",
  "broker_api_secret": "...",
  "telegram_bot_token": "...",
  "telegram_chat_id": "...",
  "max_order_amount_krw": 2000000,
  "auto_select_top_candidate": true,
  "dry_run": true
}
```
