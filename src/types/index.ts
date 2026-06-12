export type Role = "ADMIN" | "USER";

export interface Avaliacao {
  id: string;
  email_avaliador: string;
  email_avaliado: string;
  comentarios: string;
  nota: number;
  data_avaliacao: string;
}

export interface CriarAvaliacaoDto {
  email_avaliador: string;
  email_avaliado: string;
  comentarios: string;
  nota: number;
  data_avaliacao: string;
}

export interface AuthUser {
  email: string;
  role: Role;
}
