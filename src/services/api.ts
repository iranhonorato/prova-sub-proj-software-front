import { Avaliacao, CriarAvaliacaoDto, Role } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

async function request<T>(
  path: string,
  role: Role,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    role,
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

export const listarAvaliacoes = (role: Role): Promise<Avaliacao[]> =>
  request<Avaliacao[]>("/avaliacoes", role);

export const criarAvaliacao = (
  data: CriarAvaliacaoDto,
  role: Role
): Promise<Avaliacao> =>
  request<Avaliacao>("/avaliacoes", role, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deletarAvaliacao = (id: string, role: Role): Promise<void> =>
  request<void>(`/avaliacoes/${id}`, role, { method: "DELETE" });
