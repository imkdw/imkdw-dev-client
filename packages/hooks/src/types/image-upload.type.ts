export interface ImageUploadError {
  code: 'UPLOAD_FAILED' | 'INVALID_FILE_TYPE' | 'API_ERROR';
  message: string;
  originalError?: unknown;
}

export interface ImageUploadResult {
  success: boolean;
  data?: string;
  error?: ImageUploadError;
}
