const defaultHeaders = {
  'Content-Type': 'application/json',
};

interface Params<Body> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Body;
  headers?: Record<string, string>;
}
export async function request<Body, Response>({ url, method, body, headers }: Params<Body>): Promise<Response> {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const options: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (method !== 'GET' && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/${url}`, options);

  const json = await response.json();

  return json.data;
}
