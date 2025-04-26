interface Props {
  content: string;
}

export function MemoLineNumbers({ content }: Props) {
  const lineCount = content.split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <div className="w-12 bg-[#2d2d2d] text-right select-none py-2 pr-2 text-sm text-gray-500 text-opacity-60 font-mono">
      {lineNumbers.map((number) => (
        <div key={number} className="leading-6">
          {number}
        </div>
      ))}
    </div>
  );
}
