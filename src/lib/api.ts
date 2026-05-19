const BASE = 'https://api.buildafr.com/api/v1';

function getToken() {
  return localStorage.getItem('bfr_access_token');
}

export function setTokens(access: string, refresh: string) {
  localStorage.setItem('bfr_access_token', access);
  localStorage.setItem('bfr_refresh_token', refresh);
}

export function clearTokens() {
  localStorage.removeItem('bfr_access_token');
  localStorage.removeItem('bfr_refresh_token');
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearTokens();
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data ?? json;
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};
