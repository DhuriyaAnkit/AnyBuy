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
    let url = process.env.NEXT_PUBLIC_API_URL;

    // If NEXT_PUBLIC_API_URL is omitted or unset in a production browser environment,
    // automatically fallback to the live Render backend instead of localhost:4000
    if (!url && typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        url = 'https://anybuy-api.onrender.com/api';
      }
    }

    if (!url) {
      url = 'http://localhost:4000/api';
    }

    // Normalize URL: trim whitespace and remove trailing slashes
    url = url.trim().replace(/\/+$/, '');

    // Ensure /api prefix is present
    if (!url.endsWith('/api') && !url.includes('/api/')) {
      url = `${url}/api`;
    }

    return url;
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

      const rawErrorMsg = err instanceof Error ? err.message : String(err);
      console.error(`[AnyBuy API Error] Call to ${url} failed:`, err);

      let userMessage = 'Unable to connect to the backend server. Please check your internet connection.';

      // When browser blocks CORS, server is asleep on Render, or connection drops:
      if (
        rawErrorMsg.includes('Failed to fetch') ||
        rawErrorMsg.includes('NetworkError') ||
        rawErrorMsg.includes('Load failed')
      ) {
        userMessage =
          'Unable to reach the AnyBuy server. Note: On the free hosting tier (Render), the backend spins down after inactivity and takes ~40 seconds to wake up. Please wait a few seconds and try again.';
      } else if (rawErrorMsg) {
        userMessage = rawErrorMsg;
      }

      throw new ApiException({
        statusCode: 0,
        message: userMessage,
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
