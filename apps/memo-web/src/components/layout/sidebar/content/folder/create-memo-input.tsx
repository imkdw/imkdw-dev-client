import { useEffect, useRef } from 'react';

interface Props {
  level: number;
  setIsCreatingMemo: (value: boolean) => void;
}

export function CreateMemoInput({ level, setIsCreatingMemo }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='pl-2' style={{ paddingLeft: `${level * 16 + 28}px` }}>
      <input
        ref={inputRef}
        type='text'
        className='w-full py-1 px-2 bg-[#252526] text-[#CCCCCC] text-sm border border-[#007ACC] focus:outline-none rounded-none'
        // TODO: 다국어 처리
        placeholder='새 메모 이름을 입력하세요'
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Escape') {
            setIsCreatingMemo(false);
          }
        }}
        onBlur={() => setIsCreatingMemo(false)}
      />
    </div>
  );
}
