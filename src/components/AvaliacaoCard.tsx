import { Avaliacao } from "@/types";
import styles from "./AvaliacaoCard.module.css";

interface Props {
  avaliacao: Avaliacao;
  canDelete: boolean;
  onDelete: (id: number) => void;
}

function notaColorClass(nota: number): string {
  if (nota >= 8) return styles.notaAlta;
  if (nota >= 5) return styles.notaMedia;
  return styles.notaBaixa;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AvaliacaoCard({ avaliacao, canDelete, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.emails}>
          <span className={styles.label}>Avaliador:</span>
          <span>{avaliacao.emailAvaliador}</span>
          <span className={styles.label}>Avaliado:</span>
          <span>{avaliacao.emailAvaliado}</span>
        </div>
        <div className={styles.meta}>
          <span className={`${styles.nota} ${notaColorClass(avaliacao.nota)}`}>
            {avaliacao.nota}/10
          </span>
          <span className={styles.date}>{formatDate(avaliacao.dataAvaliacao)}</span>
        </div>
      </div>
      <p className={styles.comentarios}>{avaliacao.comentarios}</p>
      {canDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(avaliacao.id)}
        >
          Excluir
        </button>
      )}
    </div>
  );
}
