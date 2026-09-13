export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
}

export class ApiException extends Error {
  statusCode: number;
  error?: string;
  messages: string[];

  constructor(errorData: ApiError) {
    const messageStr = Array.isArray(errorData.message)
      ? errorData.message.join(', ')
      : errorData.message || 'An unexpected error occurred';
    super(messageStr);
    this.name = 'ApiException';
    this.statusCode = errorData.statusCode || 500;
    this.error = errorData.error;
    this.messages = Array.isArray(errorData.message) ? errorData.message : [messageStr];
  }
}

class ApiClient {
  private get baseUrl(): string {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include', // Includes HttpOnly cookies across origins
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new ApiException({
          statusCode: response.status,
          message: data.message || `Request failed with status ${response.status}`,
          error: data.error,
        });
      }

      return data as T;
    } catch (err) {
      if (err instanceof ApiException) {
        throw err;
      }
      throw new ApiException({
        statusCode: 0,
        message:
          err instanceof Error
            ? err.message
            : 'Unable to connect to the backend server. Please check your connection.',
      });
    }
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(endpoint: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
