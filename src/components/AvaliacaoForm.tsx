"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { CriarAvaliacaoDto } from "@/types";
import styles from "./AvaliacaoForm.module.css";

interface Props {
  onSubmit: (data: CriarAvaliacaoDto) => Promise<void>;
  onCancel: () => void;
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 16);
}

const initialForm: CriarAvaliacaoDto = {
  email_avaliador: "",
  email_avaliado: "",
  comentarios: "",
  nota: 5,
  data_avaliacao: todayISO(),
};

export default function AvaliacaoForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CriarAvaliacaoDto>(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTextChange =
    (field: keyof CriarAvaliacaoDto) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleNotaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, nota: Number(e.target.value) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await onSubmit({
        ...form,
        data_avaliacao: new Date(form.data_avaliacao).toISOString(),
      });
    } catch {
      setError("Erro ao cadastrar avaliação. Tente novamente.");
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Nova Avaliação</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email_avaliador">E-mail do Avaliador</label>
            <input
              id="email_avaliador"
              type="email"
              value={form.email_avaliador}
              onChange={handleTextChange("email_avaliador")}
              placeholder="avaliador@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email_avaliado">E-mail do Avaliado</label>
            <input
              id="email_avaliado"
              type="email"
              value={form.email_avaliado}
              onChange={handleTextChange("email_avaliado")}
              placeholder="avaliado@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="comentarios">Comentários</label>
            <textarea
              id="comentarios"
              value={form.comentarios}
              onChange={handleTextChange("comentarios")}
              placeholder="Descreva o desempenho do colaborador..."
              rows={4}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="data_avaliacao">Data da Avaliação</label>
            <input
              id="data_avaliacao"
              type="datetime-local"
              value={form.data_avaliacao}
              onChange={handleTextChange("data_avaliacao")}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="nota">
              Nota: <strong>{form.nota}</strong> / 10
            </label>
            <input
              id="nota"
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={form.nota}
              onChange={handleNotaChange}
              className={styles.rangeInput}
            />
            <div className={styles.rangeLabels}>
              <span>0</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
