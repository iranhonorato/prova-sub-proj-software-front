"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Avaliacao, CriarAvaliacaoDto } from "@/types";
import { listarAvaliacoes, criarAvaliacao, deletarAvaliacao } from "@/services/api";
import Header from "@/components/Header";
import AvaliacaoCard from "@/components/AvaliacaoCard";
import AvaliacaoForm from "@/components/AvaliacaoForm";
import styles from "./avaliacoes.module.css";

export default function AvaliacoesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  const fetchAvaliacoes = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    setError("");
    try {
      const data = await listarAvaliacoes(user.token);
      setAvaliacoes(data);
    } catch {
      setError("Erro ao carregar avaliações. Tente recarregar a página.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    fetchAvaliacoes();
  }, [user, authLoading, router, fetchAvaliacoes]);

  const handleCriar = async (data: CriarAvaliacaoDto) => {
    await criarAvaliacao(data, user!.token);
    setShowForm(false);
    await fetchAvaliacoes();
  };

  const handleDeletar = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) return;
    try {
      await deletarAvaliacao(id, user!.token);
      setAvaliacoes((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setError("Erro ao excluir avaliação.");
    }
  };

  if (authLoading) return null;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.toolbar}>
          <h2 className={styles.heading}>Avaliações</h2>
          {isAdmin && (
            <button
              className={styles.addButton}
              onClick={() => setShowForm(true)}
            >
              + Nova Avaliação
            </button>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {isLoading ? (
          <p className={styles.status}>Carregando avaliações...</p>
        ) : avaliacoes.length === 0 ? (
          <p className={styles.status}>Nenhuma avaliação cadastrada.</p>
        ) : (
          <div className={styles.list}>
            {avaliacoes.map((avaliacao) => (
              <AvaliacaoCard
                key={avaliacao.id}
                avaliacao={avaliacao}
                canDelete={isAdmin}
                onDelete={handleDeletar}
              />
            ))}
          </div>
        )}

        {showForm && (
          <AvaliacaoForm
            onSubmit={handleCriar}
            onCancel={() => setShowForm(false)}
          />
        )}
      </main>
    </>
  );
}
