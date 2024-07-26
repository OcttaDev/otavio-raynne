"use client";

import { Great_Vibes, Forum } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cards from "./cards";

const forum = Forum({ weight: "400", subsets: ["latin"] });
const great = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function Gifts() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-03-01T00:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (mounted) {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

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
          <span className="bg-amber-800/30 py-[7px] px-5 rounded-full shadow-xl">
            <p className="font-medium text-lg text-white">
              {timeLeft.days} Dias
            </p>
          </span>
        </div>
      </header>

      <div className="px-10 ">
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-medium">Lista de presentes</h1>
          <p>
            Abaixo estão os produtos da lista de presentes para você escolher.
          </p>
        </div>

        <div className="flex gap-4 mt-10 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </main>
  );
}
