# 3D 메모 트리 시각화

Three.js와 React Three Fiber를 사용하여 구현된 메모 트리 3D 시각화 컴포넌트입니다.

## 주요 기능

- 📁 **계층 구조 시각화**: 메모 경로를 기반으로 폴더와 메모를 3D 트리 구조로 표현
- 🎮 **인터랙티브 컨트롤**: 360도 회전, 확대/축소, 이동 가능
- ✨ **게임 같은 UI**: 호버 효과, 애니메이션, 파티클 라이트
- 🌟 **별이 빛나는 배경**: 우주 공간 같은 몰입감 있는 환경
- 🔗 **메모 링크**: 메모 클릭 시 해당 페이지로 이동

## 컴포넌트 구조

### `MemoTreeVisualizer`
메인 컨테이너 컴포넌트로 다음 기능을 제공합니다:
- API를 통한 메모 데이터 조회
- 3D 캔버스 및 조명 설정
- UI 오버레이 (컨트롤 가이드, 메모 개수)

### `MemoTreeNode`
개별 트리 노드를 렌더링하는 컴포넌트:
- 폴더: 📁 큐브 모양
- 메모: 📝 구 모양
- 호버 효과 및 클릭 이벤트 처리

### `TreeDataProcessor`
메모 데이터를 3D 트리 구조로 변환하는 유틸리티 클래스:
- 경로 기반 계층 구조 생성
- 3D 좌표 계산 (원형 배치)
- 트리 통계 제공

## 사용법

```tsx
import { MemoTreeVisualizer } from "@/components/three-d/memo-tree-visualizer";

export default function MemoTreePage() {
  return <MemoTreeVisualizer />;
}
```

## 컨트롤

- **마우스 드래그**: 카메라 회전
- **휠**: 확대/축소
- **우클릭 드래그**: 카메라 이동
- **메모 클릭**: 해당 메모 페이지로 이동

## 기술 스택

- **Three.js**: 3D 그래픽 렌더링
- **React Three Fiber**: Three.js의 React 바인딩
- **@react-three/drei**: 유용한 3D 컴포넌트 모음
- **Next.js**: 프레임워크
- **TypeScript**: 타입 안정성

## 파일 구조

```
three-d/
├── memo-tree-visualizer.tsx    # 메인 컨테이너
├── memo-tree-node.tsx          # 노드 컴포넌트
├── tree-data-processor.ts      # 데이터 처리 유틸리티
└── README.md                   # 문서
```

## 데이터 형식

```typescript
interface Memo {
  id: string;
  title: string;
  path: string;        // "/폴더/하위폴더/메모.md" 형식
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}
```

## 향후 개선 사항

- [ ] 실제 API 연동
- [ ] 검색 기능
- [ ] 필터링 옵션
- [ ] 트리 레이아웃 옵션 추가
- [ ] 성능 최적화 (큰 트리 구조)
- [ ] 접근성 개선 