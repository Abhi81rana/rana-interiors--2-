// Small fetch helper for the backend. Base URL is empty by default (same origin / Vite proxy).
// If the API is hosted elsewhere, set VITE_API_URL=https://your-api.example.com in a .env file.
const BASE = import.meta.env.VITE_API_URL || '';

export function assetUrl(path = '') {
  return /^https?:/.test(path) ? path : `${BASE}${path}`;
}

export async function api(path, { method = 'GET', body, token, form } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  let payload;
  if (form) {
    payload = form; // FormData: browser sets the multipart boundary
  } else if (body) {
    headers['Content-Type'] = 'application/json';
    payload = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(`${BASE}${path}`, { method, headers, body: payload });
  } catch {
    const err = new Error('Cannot reach the server.');
    err.status = 0;
    throw err;
  }

  let data = null;
  try { data = await res.json(); } catch { /* empty or non-JSON body */ }
  if (!res.ok) {
    const err = new Error(data?.error || 'Request failed.');
    err.status = res.status;
    throw err;
  }
  return data;
}
