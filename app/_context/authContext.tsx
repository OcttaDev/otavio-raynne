"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { auth, db } from "@/lib/firebase.confing";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { IGift, IGifts } from "../gifts/_components/gifts";

interface AuthContextType {
  user: User | null;
  gifts: IGifts;
  giftsList: IGiftsList[];
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  gifts: {} as IGifts,
  giftsList: [] as IGiftsList[],
  loading: true,
});

interface IGiftsList {
  id: string;
  number: number;
  uid: string;
  item: string;
  image: string;
  category: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const [gifts, setGifts] = useState<IGifts>({
    cozinha: [],
    sala: [],
    quarto: [],
    banheiro: [],
  });
  const [giftsList, setGiftsList] = useState<IGiftsList[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userE) => {
      setUser(userE);
      setLoading(false);
      if (!userE) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router, user]);

  const handleGetGifts = async () => {
    try {
      const giftsRef = collection(db, "presentes");
      const snapshot = await getDocs(giftsRef);

      const fetchedGifts: IGifts = {
        cozinha: [],
        sala: [],
        quarto: [],
        banheiro: [],
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category as keyof IGifts;
        const items = data.items as IGift[];

        if (category && fetchedGifts[category]) {
          // Adiciona o id do documento como um campo em cada item
          const itemsWithIds = items.map((item) => ({
            ...item,
            uid: doc.id, // Associa o id do documento a cada item
          }));

          fetchedGifts[category] = itemsWithIds;
        } else {
          console.log("Categoria não encontrada:", category);
        }
      });

      setGifts(fetchedGifts);
    } catch (error) {
      console.error("Deu algum erro ao buscar os presentes:", error);
    }
  };

  const handleGetGiftsList = async () => {
    try {
      const giftsRef = collection(db, "presentes-escolhidos");
      const snapshot = await getDocs(giftsRef);
      let list: IGiftsList[] = [];
      snapshot.forEach((doc) => {
        if (user) {
          if (user.uid === doc.data().convidado) {
            list.push({
              id: doc.id,
              item: doc.data().item,
              number: doc.data().number,
              uid: doc.data().tableId,
              image: doc.data().image,
              category: doc.data().category,
            });
          }
        }
      });
      setGiftsList(list);
    } catch (error) {
      console.error("Deu algum erro ao buscar os presentes:", error);
    }
  };

  useEffect(() => {
    handleGetGifts();
  }, []);

  useEffect(() => {
    handleGetGiftsList();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, gifts, giftsList, loading }}>
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
