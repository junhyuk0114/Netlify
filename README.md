# netlify-portfolio-starter
[![Netlify Status](https://api.netlify.com/api/v1/badges/4c9a25a6-07da-452f-8777-dc1b64c73b04/deploy-status)](https://app.netlify.com/projects/singular-sfogliatella-314b6a/deploys)

GitHub → Netlify 연동 실습용 정적 포트폴리오 사이트입니다.

- 배포 주소: https://singular-sfogliatella-314b6a.netlify.app/
- `main` 브랜치에 push하면 Netlify가 자동으로 다시 배포합니다.

## 구조

```
├─ index.html      메인 페이지 (소개/경력/기술/프로젝트/문의 폼)
├─ styles.css      라이트/다크 테마 스타일
├─ script.js       테마 토글, 프로젝트 렌더링, 폼 전송 등
├─ data.js         프로젝트 카드 데이터 (여기만 수정하면 카드가 바뀜)
├─ theme-init.js   다크모드 깜빡임 방지
├─ assets/         profile.svg, favicon.svg, og.png, resume.pdf
├─ 404.html        없는 주소 접근 시 페이지
├─ success.html    (JS 미동작 시) 폼 전송 완료 페이지
├─ robots.txt
└─ netlify.toml    배포 설정 + 보안 헤더
```

## 수정할 곳

| 항목 | 위치 |
| --- | --- |
| 이름 / 소개글 | `index.html` 의 `홍길동`, 히어로 소개 문단 |
| 소셜 링크 (GitHub/Email/LinkedIn) | `index.html` 의 `social-links` 블록 |
| 경력 / 학력 | `index.html` 의 `#experience` 타임라인 |
| 프로젝트 카드 (Demo/Source 링크) | `data.js` |
| 이력서 | `assets/resume.pdf` 교체 (파일명 유지) |
| 공유 미리보기 이미지 | `assets/og.png` (1200×630) |

## 로컬 실행

```bash
python -m http.server 8000
```

브라우저에서 http://localhost:8000 접속.

## Netlify 설정

- Build command: 비움 / Publish directory: 루트 (`netlify.toml`의 `publish = "."`)
- **Forms**: Netlify 대시보드 → Forms → *Enable form detection* 을 켜야 문의 폼 제출이 수집됩니다.
