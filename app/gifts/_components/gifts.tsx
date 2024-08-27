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
  image: string;
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
  const { user, gifts: giftsContext } = useAuthContext();

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
              <h2 className="text-xl font-bold">Local</h2>
              <div className="w-full h-40 mt-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1724523753454!6m8!1m7!1s2dlysGJGtsqC-ONS6dvW5Q!2m2!1d-7.666519938698076!2d-36.88942507221317!3f41.68625808687909!4f-8.78220618584595!5f0.7820865974627469"
                  width={250}
                  height={150}
                  style={{ border: 0, borderRadius: "8px" }}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </>
        </Icons>
      </section>
      <div className="mt-10 flex flex-wrap gap-5 ">
        {Object.entries(giftsContext).map(([category, giftsList]) =>
          giftsList.map((gift: IGift) => (
            <Cards gift={gift} key={gift.id} category={category} />
          ))
        )}
      </div>
    </main>
  );
}
