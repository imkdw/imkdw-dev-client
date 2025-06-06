import { HttpStatus } from '@imkdw-dev-client/consts';
import { isServerSide } from './utils/api-client.util';
import { getServerSideCookies } from './utils/server-side.util';
import { ApiResponse, ApiErrorResponse, RequestConfig, RequestOptions, ApiError } from './types';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const DEFAULT_OPTIONS: RequestOptions = {
  enableRetry: true,
  maxRetries: 3,
  retryDelay: 1000,
  enableLogging: process.env.NODE_ENV === 'development',
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

  private log(_message: string, _data?: unknown): void {}

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
    this.log(`Response Status: ${response.status} ${response.statusText}`);

    if (response.status === HttpStatus.NO_CONTENT) {
      return undefined as unknown as T;
    }

    let responseData: ApiResponse<T> | ApiErrorResponse;
    try {
      responseData = await response.json();
    } catch (error) {
      this.log('JSON 파싱 실패', error);
      throw this.createApiError(response);
    }

    if (response.ok) {
      const successData = responseData as ApiResponse<T>;
      this.log('Success Response', successData);
      return successData.data;
    }

    const errorData = responseData as ApiErrorResponse;
    this.log('Error Response', errorData);
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
    const { url, method, body, headers: customHeaders, timeout } = config;

    this.log(`${method} ${this.baseUrl}/${url}`, body);

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
        this.log(`Attempt ${attempt + 1} failed`, error);

        if (!this.shouldRetry(error, attempt)) {
          break;
        }

        attempt++;
        if (attempt <= (this.options.maxRetries || 3)) {
          const delay = (this.options.retryDelay || 1000) * attempt;
          this.log(`재시도 대기 중... (${delay}ms)`);
          await this.delay(delay);
        }
      }
    }

    throw lastError;
  }
}

const apiClient = new ApiClient();

export { apiClient, ApiClient };
