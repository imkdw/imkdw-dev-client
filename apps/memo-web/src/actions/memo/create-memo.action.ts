'use server';

import { createMemo } from '@imkdw-dev-client/api-client';
import { z } from 'zod';
import { CreateMemoState } from './memo-action.type';

// TODO: 다국어처리
const schema = z.object({
  folderId: z.string().min(1, { message: '폴더 아이디가 없습니다' }),
  name: z.string().min(1, { message: '이름을 필수로 입력되어야합니다' }),
});

export async function createMemoAction(_prevState: CreateMemoState, formData: FormData): Promise<CreateMemoState> {
  const validatedFields = schema.safeParse({
    folderId: formData.get('folderId'),
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {
        folderId: validatedFields.error.flatten().fieldErrors.folderId,
        name: validatedFields.error.flatten().fieldErrors.name,
      },
    };
  }

  const { folderId, name } = validatedFields.data;

  const { slug } = await createMemo({ folderId, name, content: '' });

  return {
    success: true,
    createdMemo: { slug },
  };
}
