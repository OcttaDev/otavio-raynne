"use client";

import { Great_Vibes, Forum } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const forum = Forum({ weight: "400", subsets: ["latin"] });
const great = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full">
      <header className="w-full h-[600px] flex flex-col items-center justify-center ">
        <Image
          src="/elements/flor.svg"
          alt="gifts"
          width={200}
          height={0}
          className="absolute -top-16 right-0"
        />
        <div className="flex flex-col items-center gap-10">
          <h1 className={` ${great.className} text-5xl font-bold`}>Chá de</h1>
          <Image
            src="/elements/telhado.svg"
            alt="gifts"
            width={150}
            height={0}
            className="absolute"
          />
          <p className={` ${forum.className} font-bold text-2xl mt-5`}>NOVA</p>
          <h1 className={` ${great.className} text-5xl font-bold`}>
            Otávio e Raynne
          </h1>
        </div>
        <div className="w-full flex justify-center mt-28">
          <Link
            href="/auth"
            className="p-2 bg-yellow-900/50 w-60 rounded-full shadow-xl shadow-black/20 text-center text-white text-xl font-bold"
          >
            Prosseguir
          </Link>
        </div>
      </header>
    </main>
  );
}
