"use client";
import { useAuthContext } from "@/app/_context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import Icons from "./icons";
import { MapPin, Palette } from "lucide-react";
import Cards from "./cards";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase.confing";
import Image from "next/image";

export interface IGift {
  id: string;
  name: string;
  quantity: number;
  uid: string;
}

// Define a interface para o estado dos gifts
export interface IGifts {
  cozinha: IGift[];
  sala: IGift[];
  quarto: IGift[];
  banheiro: IGift[];
}

export default function Gifts() {
  const [gifts, setGifts] = useState<IGifts>({
    cozinha: [],
    sala: [],
    quarto: [],
    banheiro: [],
  });

  const { user } = useAuthContext();

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
          console.log(
            `Itens adicionados à categoria ${category}:`,
            itemsWithIds
          );
        } else {
          console.log("Categoria não encontrada:", category);
        }
      });

      console.log("Gifts a serem definidos:", fetchedGifts);
      setGifts(fetchedGifts);
    } catch (error) {
      console.error("Deu algum erro ao buscar os presentes:", error);
    }
  };

  useEffect(() => {
    handleGetGifts();
  }, []);

  return (
    <main className="p-5 w-full">
      <header className="flex items-center justify-between ">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src={user! && user.photoURL!} alt="@shadcn" />
            <AvatarFallback>{user?.displayName}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-sm font-bold">Olá, bem vinda(o)</h1>
            <p className="text-xs">{user?.displayName}</p>
          </div>
        </div>
      </header>
      <section className="flex items-center gap-5 mt-10">
        <Icons Icon={Palette}>
          <>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-xl font-bold">Nossa Paleta de Cores</h2>
              <div className="flex gap-2 mt-2">
                <div className="border-2 border-gray-200 rounded-full w-10 h-10 bg-white"></div>
                <div className="border-2 border-gray-200 rounded-full w-10 h-10 bg-black"></div>
                <div className="border-2 border-gray-200 rounded-full w-10 h-10 relative">
                  <Image
                    src="/elements/cor.webp"
                    alt="cor"
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </>
        </Icons>
        <Icons Icon={MapPin}>
          <>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold">Favoritos</h2>
              <p className="text-sm">
                Favoritos são os itens que você gosta de ver e usar
              </p>
            </div>
          </>
        </Icons>
      </section>
      <div className="mt-10 flex flex-wrap gap-5 ">
        {Object.entries(gifts).map(([category, giftsList]) =>
          giftsList.map((gift: IGift) => (
            <Cards gift={gift} key={gift.id} category={category} />
          ))
        )}
      </div>
    </main>
  );
}
