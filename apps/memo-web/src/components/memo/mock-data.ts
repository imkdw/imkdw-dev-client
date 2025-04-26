import { Memo } from './memo.type';

export const MOCK_MEMOS: Record<string, Memo> = {
  '1': {
    id: '1',
    title: '리액트 훅 사용법',
    content: `# 리액트 훅 사용법

## useState
\`\`\`typescript
const [state, setState] = useState<string>('');
\`\`\`

## useEffect
\`\`\`typescript
useEffect(() => {
  // 컴포넌트가 마운트될 때 실행될 코드
  return () => {
    // 컴포넌트가 언마운트될 때 실행될 코드
  };
}, []);
\`\`\`

## useContext
\`\`\`typescript
const value = useContext(MyContext);
\`\`\`

## useReducer
\`\`\`typescript
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

## useCallback
\`\`\`typescript
const handleClick = useCallback(() => {
  console.log('버튼이 클릭되었습니다.');
}, []);
\`\`\`

## useMemo
\`\`\`typescript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

## useRef
\`\`\`typescript
const inputRef = useRef<HTMLInputElement>(null);
\`\`\``,
    path: ['React', 'Hooks'],
    createdAt: '2023-06-15T09:00:00Z',
    updatedAt: '2023-06-15T09:30:00Z',
  },
  '2': {
    id: '2',
    title: 'TypeScript 기초',
    content: `# TypeScript 기초

## 기본 타입
\`\`\`typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hello", 10]; // 튜플
\`\`\`

## 인터페이스
\`\`\`typescript
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: "Hayes",
  id: 0,
};
\`\`\`

## 클래스
\`\`\`typescript
class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
\`\`\`

## 제네릭
\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}
\`\`\``,
    path: ['TypeScript', 'Basics'],
    createdAt: '2023-06-16T10:00:00Z',
    updatedAt: '2023-06-16T10:45:00Z',
  },
  '3': {
    id: '3',
    title: 'Next.js 라우팅',
    content: `# Next.js 라우팅

## 기본 라우팅
Next.js에서는 \`pages\` 디렉토리 또는 App Router에서 \`app\` 디렉토리의 파일 시스템을 기반으로 라우팅을 처리합니다.

## 동적 라우팅
\`\`\`typescript
// pages/posts/[id].tsx 또는 app/posts/[id]/page.tsx
import { useRouter } from 'next/router'; // Pages Router에서만 사용

export default function Post() {
  const router = useRouter();
  const { id } = router.query;
  
  return <p>Post ID: {id}</p>;
}
\`\`\`

## API 라우팅
\`\`\`typescript
// pages/api/user/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  res.status(200).json({ id, name: \`User \${id}\` });
}
\`\`\`

## 중첩 라우팅
App Router에서는 중첩된 폴더 구조를 사용하여 중첩된 라우팅을 쉽게 구현할 수 있습니다.

## 라우팅 그룹
App Router에서는 괄호를 사용하여 라우팅에 영향을 주지 않는 그룹을 만들 수 있습니다.
예: \`app/(auth)/login/page.tsx\``,
    path: ['Next.js', 'Routing'],
    createdAt: '2023-06-17T11:00:00Z',
    updatedAt: '2023-06-17T11:30:00Z',
  },
};
