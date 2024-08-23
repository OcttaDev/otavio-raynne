"use client";
import { useAuthContext } from "@/app/_context/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect } from "react";
import Icons from "./icons";
import { MapPin, Palette } from "lucide-react";
import Cards from "./cards";

export interface IGift {
  id: number;
  name: string;
  quantity: number;
}

export default function Gifts() {
  const [gifts, setGifts] = React.useState<{
    cozinha: IGift[];
    sala: IGift[];
    quarto: IGift[];
    banheiro: IGift[];
  }>({
    cozinha: [],
    sala: [],
    quarto: [],
    banheiro: [],
  });

  const { user } = useAuthContext();

  const handleGetGifts = async () => {
    try {
      const [cozinha, sala, quarto, banheiro] = await Promise.all([
        fetch("http://localhost:3001/cozinha").then((res) => res.json()),
        fetch("http://localhost:3001/sala").then((res) => res.json()),
        fetch("http://localhost:3001/quarto").then((res) => res.json()),
        fetch("http://localhost:3001/banheiro").then((res) => res.json()),
      ]);

      setGifts({ cozinha, sala, quarto, banheiro });
    } catch (error) {
      console.log(error);
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
              <h2 className="text-xl font-bold">Favoritos</h2>
              <p className="text-sm">
                Favoritos são os itens que você gosta de ver e usar
              </p>
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
