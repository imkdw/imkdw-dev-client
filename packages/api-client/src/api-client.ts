import { HttpStatus } from '@imkdw-dev-client/consts';
import { ApiError, ApiErrorResponse, ApiResponse, RequestConfig, RequestOptions } from './types';
import { isServerSide } from './utils/api-client.util';
import { getServerSideCookies } from './utils/server-side.util';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_OPTIONS: RequestOptions = {
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000,
  enableErrorToast: true,
};

class ApiClient {
  private baseUrl: string;
  private options: RequestOptions;

  constructor(baseUrl?: string, options?: RequestOptions) {
    this.baseUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || '';
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private showErrorToast(error: Error & { status?: number; apiError?: ApiError }) {
    if (isServerSide()) {
      return;
    }

    if (error.status === HttpStatus.FORBIDDEN) {
      const forbiddenError = { ...error, message: '권한이 없습니다' };

      import('@imkdw-dev-client/utils').then(({ showApiErrorToast }) => showApiErrorToast(forbiddenError));
      return;
    }

    import('@imkdw-dev-client/utils').then(({ showApiErrorToast }) => showApiErrorToast(error));
  }

  private createApiError(
    response: Response,
    errorData?: ApiErrorResponse,
  ): Error & {
    status: number;
    statusText: string;
    apiError?: ApiError;
  } {
    const message = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
    const error = new Error(message) as Error & {
      status: number;
      statusText: string;
      apiError?: ApiError;
    };
    error.status = response.status;
    error.statusText = response.statusText;
    error.apiError = errorData?.error;
    return error;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (response.status === HttpStatus.NO_CONTENT) {
      return undefined as unknown as T;
    }

    let responseData: ApiResponse<T> | ApiErrorResponse;
    try {
      responseData = await response.json();
    } catch {
      throw this.createApiError(response);
    }

    if (response.ok) {
      const successData = responseData as ApiResponse<T>;
      return successData.data;
    }

    const errorData = responseData as ApiErrorResponse;
    throw this.createApiError(response, errorData);
  }

  private shouldRetry(error: unknown, attempt: number): boolean {
    if (!this.options.enableRetry || attempt >= (this.options.maxRetries || 3)) {
      return false;
    }

    if (error instanceof Error) {
      const errorWithStatus = error as Error & { status?: number };
      return !errorWithStatus.status || errorWithStatus.status >= 500;
    }

    return true;
  }

  async request<Body, Response>(config: RequestConfig<Body>): Promise<Response> {
    const { url, method, body, headers: customHeaders, timeout, enableErrorToast } = config;

    const headers = {
      ...DEFAULT_HEADERS,
      ...customHeaders,
      ...(isServerSide() && { Cookie: await getServerSideCookies() }),
    };

    const options: RequestInit = {
      method,
      headers,
      credentials: 'include',
      ...(timeout && { signal: AbortSignal.timeout(timeout) }),
      ...(method !== 'GET' && body !== undefined && { body: JSON.stringify(body) }),
    };

    let lastError: unknown;
    let attempt = 0;

    while (attempt <= (this.options.maxRetries || 3)) {
      try {
        const response = await fetch(`${this.baseUrl}/${url}`, options);
        return await this.handleResponse<Response>(response);
      } catch (error) {
        lastError = error;

        if (!this.shouldRetry(error, attempt)) {
          break;
        }

        attempt++;
        if (attempt <= (this.options.maxRetries || 3)) {
          const delay = (this.options.retryDelay || 1000) * attempt;
          await this.delay(delay);
        }
      }
    }

    const shouldShowToast = enableErrorToast ?? this.options.enableErrorToast ?? true;
    if (shouldShowToast && lastError instanceof Error) {
      this.showErrorToast(lastError as Error & { status?: number; apiError?: ApiError });
    }

    throw lastError;
  }
}

const apiClient = new ApiClient();

export { apiClient, ApiClient };
