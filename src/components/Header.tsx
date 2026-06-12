"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>Sistema de Avaliações</h1>
        {user && (
          <div className={styles.userInfo}>
            <span className={styles.email}>{user.email}</span>
            <span className={styles.role}>{user.role}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
