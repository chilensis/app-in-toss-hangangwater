# Deus(앱빌더) 디자인을 코드에서 쓰는 방법

앱인토스에서는 **앱빌더**(Deus 기반)로 UI를 디자인하고, 웹 프로젝트에서는 **@toss/tds-mobile** 컴포넌트와 동일한 스펙으로 구현합니다.

---

## 1. 앱빌더에서 할 일

- **개발자 모드**: 앱빌더 오른쪽 패널 **상단 토글**을 켜면 개발자 모드로 전환됩니다.  
  (공식 문서: [앱빌더 - 앱인토스 개발자센터](https://developers-apps-in-toss.toss.im/design/prepare/deus.html))
- **화면 기준**: 앱빌더 기본 화면은 **375 × 812** (iPhone 13 mini 기준).  
  화면 너비를 임의로 바꾸지 않는 것이 좋고, 에셋도 이 너비에 맞춰 제작되어 있습니다.
- **퀵스타트 vs 커스텀**
  - **퀵스타트**: 토스 UI를 그대로 불러와 텍스트/옵션만 수정. 제공된 옵션 외 요소 변경·삭제는 지원하지 않습니다.
  - **커스텀**: 기본 화면 위에 에셋을 조합해 직접 구성. 레이아웃은 **붙이기(Stack Layout)** 로 정리하고, Padding / Gap / Fill·Fit 등을 사용합니다.

Deus에서 내보낸 **프레임/스타일 JSON**은 “어떤 레이어에 어떤 스타일이 붙어 있는지” 스펙에 가깝습니다.  
이 스펙을 보고 **같은 구조·같은 수치**로 React + TDS 컴포넌트로 옮기면 “의도대로” 나오게 할 수 있습니다.

---

## 2. 코드에서 맞추기

### 2.1 뷰포트·기준 너비

- 앱빌더(Deus)는 **375 × 812** 기준이므로, **Chrome DevTools → 기기 툴바 → 너비 375px** 로 맞춰 보면 디자인과 비교하기 좋습니다.
- `IndexPage.css`의 `.page`는 **max-width: 375px**, **min-height: 812px / 100dvh** 로 맞춰 두었고, 큰 화면에서는 가운데 정렬됩니다.

### 2.2 TDS 토큰 (색·배경)

- Deus/앱빌더는 **TDS 토큰**을 쓰고, 코드에서는 `var(--token-tds-color-*, var(--adaptive*, #fallback))` 형태로 사용합니다.
- **TDSMobileProvider / TDSMobileAITProvider** 를 쓰면 `--adaptive*` 등이 주입됩니다.  
  로컬에서는 토큰이 없을 수 있으므로 CSS에 **fallback**(예: `#ffffff`, `#f9fafb`)을 넣어 두었습니다.
- 앱빌더에서 쓰는 색 이름(예: 기본 배경, grey-50)을 그대로 **토큰 이름**으로 매칭해 두면, 나중에 테마가 바뀌어도 같이 맞춰집니다.

### 2.3 구조를 Deus와 1:1로 맞추기

- Deus JSON의 **계층 구조**(기본 화면 → Rows → 패딩·마진 → Columns → 카드 등)를 그대로 **div + className** 구조로 옮기면 “의도대로” 보이기 쉽습니다.
- 예:
  - `기본 화면` → `.page`
  - `기본 화면 - Rows` → `.page-rows`
  - `패딩 · 마진 44 - Frame` (height 12) → `.page-spacing-12`
  - `Columns 75 - Rows 83` (카드, grey-50, radius 16, padding 20) → `.page-content-card`

지금 `IndexPage.tsx`도 이 구조로 맞춰 두었으므로, Deus에서 **패딩·간격·카드 스타일**을 바꾸면 같은 클래스의 CSS 수치만 같은 값으로 맞추면 됩니다.

---

## 3. 정리

| 단계 | 할 일 |
|------|--------|
| Deus(앱빌더) | 375×812 기준으로 디자인, 개발자 모드로 스펙 확인, 퀵스타트/커스텀 중 선택 |
| 코드 | TDS 컴포넌트(Asset, Text, Spacing 등) + Deus 계층과 동일한 div/클래스 구조 |
| CSS | `--token-tds-*` / `--adaptive*` + fallback, max-width 375, min-height 812/100dvh |

Deus에서 **내보내기/복사**로 받은 JSON이 “프레임 이름 + 스타일”이면,  
그 **이름과 계층**을 그대로 클래스/구조에 반영하고, **수치(width, height, padding, borderRadius, backgroundColor)** 만 CSS에 넣으면 의도대로 나옵니다.
