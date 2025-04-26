'use client';

import { useState, useEffect } from 'react';
import { MemoBreadcrumb } from './memo-breadcrumb';
import { MemoLineNumbers } from './memo-line-numbers';
import { MemoTabManager } from './memo-tab-manager';
import { Memo } from './memo.type';
import { MOCK_MEMOS } from './mock-data';

interface Props {
  memo: Memo;
}

export function MemoDetail({ memo }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#242424] text-white">
      <MemoTabManager memoId={memo.id} title={memo.title} />
      <MemoBreadcrumb path={memo.path} />

      <div className="px-4 py-2 border-b border-[#3d3d3d]">
        <h1 className="text-xl font-semibold">{memo.title}</h1>
      </div>

      <div className="flex flex-1 overflow-auto">
        <MemoLineNumbers content={memo.content} />
        <div className="flex-1 p-2 font-mono text-sm overflow-auto whitespace-pre-wrap">{memo.content}</div>
      </div>
    </div>
  );
}
