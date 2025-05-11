import { getMemo } from '@imkdw-dev-client/api-client';
import { MemoBreadcrumb } from '../../../../../components/memo/memo-breadcrumb';
import { MemoEditor } from '../../../../../components/memo/memo-editor';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditMemoPage({ params }: Props) {
  const { slug } = await params;

  const memo = await getMemo(slug);

  return (
    <div>
      <MemoBreadcrumb memo={memo} />
      <MemoEditor memo={memo} />
    </div>
  );
}
