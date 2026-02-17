# 배포 환경에서 "오늘 접속"이 안 나올 때 (CORS)

참고: [앱인토스 개발자센터 - 미니앱 출시](https://developers-apps-in-toss.toss.im/development/deploy.html)

## 원인

테스트/실제 출시 환경에서는 미니앱이 **토스 도메인**에서 실행됩니다.

- **QR 테스트:** `https://*.private-apps.tossmini.com`
- **실제 서비스:** `https://*.apps.tossmini.com`

이때 "오늘 접속" 숫자는 **한강물 통계 서버** `https://hangangwater-server.vercel.app` 의 `GET /api/stats/total` 를 호출해 가져옵니다.  
브라우저/웹뷰는 **다른 출처(Origin)** 로 요청할 때 서버가 `Access-Control-Allow-Origin` 을 보내줘야만 응답을 넘겨줍니다.  
통계 서버에 **토스 도메인**이 CORS 허용 목록에 없으면 요청이 막혀서, 화면에 오늘 접속자가 나오지 않습니다.

## 해결 방법 (통계 서버 쪽)

**한강물 통계 API 서버**(hangangwater-server)에서 아래 Origin 을 CORS 허용 목록에 넣어야 합니다.

| 환경     | 허용할 Origin 패턴                    |
|----------|---------------------------------------|
| QR 테스트 | `https://*.private-apps.tossmini.com` |
| 실제 서비스 | `https://*.apps.tossmini.com`       |

와일드카드(`*`)를 지원하지 않는 서버라면, 실제로 쓰이는 서브도메인을 하나씩 허용해도 됩니다.

### 예: Express (Node)

```js
const cors = require('cors');

const tossOrigins = [
  'https://private-apps.tossmini.com',
  /^https:\/\/[a-z0-9-]+\.private-apps\.tossmini\.com$/,
  'https://apps.tossmini.com',
  /^https:\/\/[a-z0-9-]+\.apps\.tossmini\.com$/,
];

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    const ok = tossOrigins.some(allowed =>
      typeof allowed === 'string' ? origin === allowed : allowed.test(origin)
    );
    cb(null, ok ? origin : false);
  },
}));
```

### 예: Vercel (vercel.json)

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "https://apps.tossmini.com" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, OPTIONS" },
        { "key": "Access-Control-Allow-Headers", "value": "Content-Type" }
      ]
    }
  ]
}
```

와일드카드 서브도메인(`*.apps.tossmini.com`)을 한 번에 쓰기 어렵다면, Vercel의 경우 서버리스 함수에서 요청의 `Origin` 헤더를 보고 동적으로 `Access-Control-Allow-Origin` 을 설정하는 방식으로 구현할 수 있습니다.

## 정리

- **프론트(이 레포):** 이미 `https://hangangwater-server.vercel.app` 로 통계 API를 호출하고 있음.
- **통계 서버:** 위 토스 도메인을 CORS 허용 목록에 추가해야 테스트/출시 환경에서 "오늘 접속"이 정상 표시됨.
