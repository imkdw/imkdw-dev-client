'use server';

import { updateMemo } from '@imkdw-dev-client/api-client';
import { z } from 'zod';
import { UpdateMemoState } from './memo-action.type';

const schema = z.object({
  slug: z.string().min(1, { message: '메모 아이디가 없습니다' }),
  folderId: z.string().min(1, { message: '폴더 아이디가 없습니다' }),
  name: z.string().min(1, { message: '이름을 필수로 입력되어야합니다' }),
  content: z.string().min(1, { message: '내용을 필수로 입력되어야합니다' }),
});

export async function updateMemoAction(_prevState: UpdateMemoState, formData: FormData): Promise<UpdateMemoState> {
  const validatedFields = schema.safeParse({
    slug: formData.get('slug'),
    folderId: formData.get('folderId'),
    name: formData.get('name'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {
        folderId: validatedFields.error.flatten().fieldErrors.folderId,
        name: validatedFields.error.flatten().fieldErrors.name,
        content: validatedFields.error.flatten().fieldErrors.content,
      },
    };
  }

  const { slug, folderId, name, content } = validatedFields.data;

  await updateMemo(slug, { folderId, name, content });

  return { success: true };
}
