const defaultHeaders = {
  'Content-Type': 'application/json',
};

interface Params<Body> {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Body;
}
export async function request<Body, Response>({ url, method, body }: Params<Body>): Promise<Response> {
  const BASE_URL = `${process.env.API_URL}`;

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  if (method !== 'GET' && body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}/${url}`, options);

  return response.json();
}
