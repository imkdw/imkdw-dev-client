import { MemoDetail } from '@imkdw-dev-client/api-client';
import 'highlight.js/styles/atom-one-dark.css';
import '@imkdw-dev-client/ui/editor.css';
import { highlightCodeBlocks } from '../../utils/code-highlighter';

interface Props {
  memo: MemoDetail;
}

export default async function MemoViewer({ memo }: Props) {
  const highlightedHtml = highlightCodeBlocks(memo.contentHtml);

  return (
    <div
      className='milkdown-editor'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: 메모 내용 렌더링을 위한 코드
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
