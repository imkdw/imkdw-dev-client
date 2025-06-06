export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  error: ApiError;
  message: string;
  statusCode: number;
}

export interface RequestConfig<Body = unknown> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: Body;
  headers?: Record<string, string>;
  retries?: number;
  timeout?: number;
  enableErrorToast?: boolean;
}

export interface RequestOptions {
  enableRetry?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  enableErrorToast?: boolean;
}
