import { apiClient } from '../api/api-client';

export type UserRole = 'CUSTOMER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  accessToken?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  },

  async login(data: LoginData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  },

  async logout(): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/logout');
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const res = await apiClient.get<{ success: boolean; user: User }>('/auth/me');
      return res.user;
    } catch {
      return null;
    }
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', { email });
  },

  async resetPassword(data: ResetPasswordData): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', data);
  },

  async verifyEmail(token: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/verify-email', { token });
  },

  async resendVerification(email: string): Promise<{ success: boolean; message: string }> {
    return apiClient.post<{ success: boolean; message: string }>('/auth/resend-verification', { email });
  },
};
