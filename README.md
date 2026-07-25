# 방치형 RPG 게임 기획 사이트

자동 탐색, 절차 생성 던전, 필드 정복, 성장·경제와 장기 진행을 정리한 다중 페이지 게임 기획서입니다. 별도의 빌드 과정이나 외부 라이브러리 없이 GitHub Pages에서 그대로 동작합니다.

## 문서 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 표지, 핵심 정의, 검증 지표와 전체 목차 |
| `01_overview.html` | 게임 정체성과 설계 원칙 |
| `02_content_loop.html` | 콘텐츠 순환 구조 |
| `03_auto_explore.html` | 자동 탐색 알고리즘 |
| `04_dungeon.html` | 던전 생성과 진행 |
| `05_world.html` | 월드맵과 외부 원정 |
| `06_progression.html` | 성장과 경제 |
| `07_architecture.html` | 게임 구조와 상태 |
| `08_mvp.html` | MVP 범위와 검증 |
| `09_reference.html` | 분석 근거와 설계 구분 |
| `10_development_notes.html` | 기획 결정, PC-first·3단계 주의력 UI, TBH 참고 원칙과 아트 방향 |
| `11_roadmap.html` | 단계별 개발 계획과 버전 운영 |
| `12_pathfinding_ai.html` | 여러 게임에서 재사용할 길찾기·자동 탐험·던전 생성 AI의 독립 계약과 운영 원칙 |
| `13_design_baseline.html` | 현재까지 확정한 통합 기획 기준선 |
| `14_visual_archive.html` | 개척 순환·월드·던전·UI·분석 이미지 시각 자료실 |

현재 문서 버전은 `v0.3.3`입니다. 게임 문서와 `Pathfinding AI`는 독립적으로 버전업하되, 매 릴리스마다 로컬 원본·비공개 Git·공개 GitHub Pages·Google Drive `versions/latest` 네 위치를 모두 동기화합니다.

## 시각 기획 자료 운영

- `assets/media/diagrams/`은 논의 과정에서 확정한 화면 와이어프레임, 맵 구성도와 상태 변화 도식을 보관합니다.
- `assets/media/`의 기존 구성도·알고리즘 이미지는 시스템 설명과 분석용으로 계속 사용합니다.
- 승인된 새 도식은 일부만 고르지 않고 관련 기획 페이지와 `14_visual_archive.html`에 모두 추가합니다.
- 폐기 지시된 AI 화면·화풍 이미지는 공개 자산에서 삭제했으며 다시 올리지 않습니다.
- 전체 목록과 업로드 절차는 `docs/VISUAL_ARCHIVE.md`에서 관리합니다.

## GitHub Pages 공개

1. 이 폴더의 파일을 GitHub 저장소의 기본 브랜치에 올립니다.
2. 저장소의 **Settings → Pages**로 이동합니다.
3. **Deploy from a branch**를 선택합니다.
4. 기본 브랜치와 `/(root)` 폴더를 선택한 뒤 저장합니다.
5. 배포가 끝나면 Pages에 표시되는 주소로 접속합니다.

`.nojekyll` 파일이 포함되어 있어 정적 HTML, CSS, JavaScript가 변환 없이 제공됩니다.

## 로컬 확인

정적 파일만 사용하므로 `index.html`을 직접 열어도 대부분의 기능을 확인할 수 있습니다. 페이지 간 이동까지 실제 배포와 같은 방식으로 확인하려면 이 폴더를 간단한 로컬 웹 서버로 열면 됩니다.

## 편집 규칙

- 공통 색상과 컴포넌트는 `assets/styles.css`에서 관리합니다.
- 상단 목차, 우측 문서 내 목차, 이전·다음 이동은 `assets/site.js`에서 자동으로 구성합니다.
- 본문 제목에 고유한 `id`를 붙이면 우측 문서 내 목차에 자동으로 표시됩니다.
- 페이지 하단에 `<nav data-page-pagination></nav>`를 두면 현재 페이지 기준 이전·다음 링크가 생성됩니다.
- 표는 JavaScript가 가로 스크롤 컨테이너로 감싸므로 모바일에서도 레이아웃이 깨지지 않습니다.

## 콘텐츠 구분

- **확인**: 레퍼런스 실행 구조에서 행동을 확인한 내용
- **신규 제안**: 새 프로젝트를 위해 독립적으로 작성한 클린룸 게임 설계
- 패키지, 기기, SDK, 권한과 같은 게임 외 정보는 다루지 않습니다.
