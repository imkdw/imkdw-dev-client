import { getUploadUrl } from '@imkdw-dev-client/api-client';
import { generateUUID } from '@imkdw-dev-client/utils';

export const useImageUpload = () => {
  const uploadToS3 = async (url: string, file: File) => {
    try {
      await fetch(url, { method: 'PUT', body: file });
    } catch (error) {
      throw new Error(`S3 이미지 업로드 실패, 사유 : ${error}`);
    }
  };

  const uploadImage = async (file: File) => {
    const fileName = generateUUID();
    const extension = file.type.split('/')[1] || 'jpeg';
    const { pathPrefix, url } = await getUploadUrl(fileName, extension);

    await uploadToS3(url, file);

    return `${pathPrefix}/${fileName}.${extension}`;
  };

  return { uploadImage };
};
