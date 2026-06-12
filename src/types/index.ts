export type Role = "ADMIN" | "USER";

export interface Avaliacao {
  id: number;
  emailAvaliador: string;
  emailAvaliado: string;
  comentarios: string;
  nota: number;
  dataAvaliacao: string;
}

export interface CriarAvaliacaoDto {
  emailAvaliador: string;
  emailAvaliado: string;
  comentarios: string;
  nota: number;
}

export interface AuthUser {
  email: string;
  role: Role;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: Role;
  email: string;
}
