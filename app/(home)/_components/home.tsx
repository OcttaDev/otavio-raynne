"use client";

import { Great_Vibes, Forum } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const forum = Forum({ weight: "400", subsets: ["latin"] });
const great = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const text = `"Alegrem-se na esperança, sejam pacientes na tribulação, perseverem
            na oração." `;
  return (
    <main className="w-full flex items-center ">
      <div className="w-full h-screen flex flex-col items-center justify-center ">
        <Image
          src="/elements/flor-fundo.svg"
          alt="gifts"
          width={160}
          height={0}
          className="absolute -top-0 right-0 -rotate-[5deg]"
        />
        <div className="w-full flex justify-center mt-10">
          <Image
            src="/elements/panelas.svg"
            alt="gifts"
            width={80}
            height={0}
            className="ml-10 absolute top-40  rotate-40"
          />
        </div>
        <div className="flex flex-col items-center gap-10 mt-14">
          <h1 className={` ${great.className} text-5xl font-bold`}>Chá de</h1>
          <Image
            src="/elements/telhado.svg"
            alt="gifts"
            width={190}
            height={0}
            className="absolute top-40"
          />
          <p
            className={` ${forum.className} font-bold text-3xl mt-0 text-[#3f5736]`}
          >
            NOVA
          </p>
          <h1 className={` ${great.className} text-5xl font-bold`}>
            Otávio e Raynne
          </h1>
          <div className="max-w-[73%] text-center text-sm flex flex-col">
            <p>{text}</p>
            <p>Rm 12:12</p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <Link
            href="/auth"
            className="p-2 bg-[#3f5736] w-60 rounded-xl shadow-xl shadow-black/20 text-center text-white text-xl font-bold"
          >
            Prosseguir
          </Link>
        </div>
        <Image
          src="/elements/flor-fundo.svg"
          alt="gifts"
          width={160}
          height={0}
          className="absolute -bottom-14 left-0 rotate-[130deg]"
        />
      </div>
    </main>
  );
}
