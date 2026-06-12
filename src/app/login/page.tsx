"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Role } from "@/types";
import styles from "./login.module.css";

export default function LoginPage() {
  const { entrar } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("USER");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    entrar(email, role);
    router.push("/avaliacoes");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sistema de Avaliações</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div className={styles.field}>
            <label>Papel</label>
            <div className={styles.roleGroup}>
              <label className={`${styles.roleOption} ${role === "USER" ? styles.roleSelected : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  checked={role === "USER"}
                  onChange={() => setRole("USER")}
                />
                USER
              </label>
              <label className={`${styles.roleOption} ${role === "ADMIN" ? styles.roleSelected : ""}`}>
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={role === "ADMIN"}
                  onChange={() => setRole("ADMIN")}
                />
                ADMIN
              </label>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
