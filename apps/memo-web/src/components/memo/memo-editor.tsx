'use client';

import { ResponseGetMemo } from '@imkdw-dev-client/api-client';
import { useState } from 'react';
import { MarkdownEditor } from '../editor/editor';

interface Props {
  memo: ResponseGetMemo;
}

export function MemoEditor({ memo }: Props) {
  const [content, setContent] = useState(memo.content);

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  return (
    <div>
      <MarkdownEditor content={content} onChangeContent={handleChangeContent} />
    </div>
  );
}
