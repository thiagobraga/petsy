/**
 * HTTP client for API requests with auth headers and error handling.
 */

export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
  ok: boolean;
}

export class ApiClient {
  baseUrl: string;
  timeout: number;

  constructor(
    baseUrl: string = process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
    timeout = 30000
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  /**
   * Get auth token from localStorage or auth store
   */
  private getAuthToken(): string | null {
    try {
      const authData = localStorage.getItem('auth_state');
      if (authData) {
        const auth = JSON.parse(authData);
        return auth.token || null;
      }
    } catch (error) {
      console.error('Failed to get auth token:', error);
    }
    return null;
  }

  /**
   * Build headers with auth
   */
  private buildHeaders(config?: ApiRequestConfig): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...config?.headers,
    };

    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Make HTTP request with timeout
   */
  async request<T = any>(endpoint: string, config: ApiRequestConfig = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const method = config.method || 'GET';

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout || this.timeout);

      const response = await fetch(url, {
        method,
        headers: this.buildHeaders(config),
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json().catch(() => null);

      return {
        status: response.status,
        data: data as T,
        ok: response.ok,
        error: !response.ok ? data?.message || response.statusText : undefined,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      console.error(`API request failed: ${method} ${endpoint}`, error);

      return {
        status: 0,
        ok: false,
        error: message,
      };
    }
  }

  /**
   * GET request
   */
  async get<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    body?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    body?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(endpoint: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    body?: any,
    config?: ApiRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'PATCH', body });
  }
}

// Default client instance
export const apiClient = new ApiClient();
