import { isServerSide } from './utils/api-client.util';
import { getServerSideCookies } from './utils/server-side.util';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

interface Params<Body> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Body;
}
export async function request<Body, Response>({ url, method, body }: Params<Body>): Promise<Response> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
    ...defaultHeaders,
    ...(isServerSide() && { Cookie: await getServerSideCookies() }),
  };

  let options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  if (method !== 'GET' && body !== undefined) {
    options = {
      ...options,
      body: JSON.stringify(body),
    };
  }

  const response = await fetch(`${BASE_URL}/${url}`, options);

  const json = await response.json();

  return json.data;
}
