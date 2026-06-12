import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sistema de Avaliações",
  description: "Gerencie avaliações de colaboradores",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
