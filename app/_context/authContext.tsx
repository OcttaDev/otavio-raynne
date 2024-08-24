"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth } from "@/lib/firebase.confing";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

// Definição da interface para o contexto de autenticação
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Criação do contexto com valores padrão
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userE) => {
      setUser(userE);
      setLoading(false); // Parar de carregar após a mudança de estado
      if (!userE) {
        router.push("/"); // Redirecionar para a página inicial se não autenticado
      }
    });

    // Limpar o listener quando o componente for desmontado
    return () => unsubscribe();
  }, [router, user]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
