"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { CriarAvaliacaoDto } from "@/types";
import styles from "./AvaliacaoForm.module.css";

interface Props {
  onSubmit: (data: CriarAvaliacaoDto) => Promise<void>;
  onCancel: () => void;
}

const initialForm: CriarAvaliacaoDto = {
  emailAvaliador: "",
  emailAvaliado: "",
  comentarios: "",
  nota: 5,
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
      await onSubmit(form);
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
            <label htmlFor="emailAvaliador">E-mail do Avaliador</label>
            <input
              id="emailAvaliador"
              type="email"
              value={form.emailAvaliador}
              onChange={handleTextChange("emailAvaliador")}
              placeholder="avaliador@email.com"
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="emailAvaliado">E-mail do Avaliado</label>
            <input
              id="emailAvaliado"
              type="email"
              value={form.emailAvaliado}
              onChange={handleTextChange("emailAvaliado")}
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
            <label htmlFor="nota">
              Nota: <strong>{form.nota}</strong> / 10
            </label>
            <input
              id="nota"
              type="range"
              min={0}
              max={10}
              step={1}
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
