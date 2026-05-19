import { api, setTokens, clearTokens } from './api';

export interface AuthUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  organizationId?: string;
  organizationName?: string;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  const data = await api.post<{ accessToken: string; refreshToken: string; user: AuthUser }>(
    '/auth/login',
    { email, password }
  );
  setTokens(data.accessToken, data.refreshToken);
  return data.user;
}

export async function logout() {
  try { await api.post('/auth/logout', {}); } catch { /* ignore */ }
  clearTokens();
}

export async function getMe(): Promise<AuthUser> {
  return api.get<AuthUser>('/auth/me');
}

export function hasToken() {
  return !!localStorage.getItem('bfr_access_token');
}
