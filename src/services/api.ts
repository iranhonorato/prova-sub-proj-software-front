import { Avaliacao, CriarAvaliacaoDto, LoginCredentials, LoginResponse } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });

  if (!response.ok) {
    const message = await response.text().catch(() => `HTTP ${response.status}`);
    throw new Error(message || `HTTP ${response.status}`);
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export const login = (credentials: LoginCredentials): Promise<LoginResponse> =>
  request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

export const listarAvaliacoes = (token: string): Promise<Avaliacao[]> =>
  request<Avaliacao[]>("/avaliacoes", {}, token);

export const criarAvaliacao = (
  data: CriarAvaliacaoDto,
  token: string
): Promise<Avaliacao> =>
  request<Avaliacao>("/avaliacoes", {
    method: "POST",
    body: JSON.stringify(data),
  }, token);

export const deletarAvaliacao = (id: number, token: string): Promise<void> =>
  request<void>(`/avaliacoes/${id}`, { method: "DELETE" }, token);
