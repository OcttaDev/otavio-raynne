"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, HandIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase.confing";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/_context/authContext";
import Cards from "../../_components/cards";
import { IGifts } from "../../_components/gifts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RecevedGiftsC() {
  const [gifts, setGifts] = useState<IGifts[]>([]);

  const { user } = useAuthContext();

  interface IGifts {
    id: string;
    item: string;
    category: string;
  }
  const handleGetGifts = async () => {
    try {
      const giftsRef = collection(db, "presentes-escolhidos");
      const snapshot = await getDocs(giftsRef);
      let list: IGifts[] = [];
      snapshot.forEach((doc) => {
        if (user) {
          if (user.uid === doc.data().convidado) {
            list.push({
              id: doc.id,
              item: doc.data().item,
              category: doc.data().category,
            });
          }
        }
      });
      setGifts(list);
    } catch (error) {
      console.error("Deu algum erro ao buscar os presentes:", error);
    }
  };

  useEffect(() => {
    handleGetGifts();
  }, [user]);
  return (
    <main className="p-5">
      <Button variant="outline" size="icon">
        <Link href="/gifts">
          <ChevronLeft />
        </Link>
      </Button>
      <div className="mt-10 flex flex-wrap gap-5 w-[99%] m-auto">
        {gifts.map((gift) => (
          <Card key={gift.id}>
            <CardHeader className="relative flex flex-col items-center justify-center gap-2 ">
              {/* <Image src="" alt="gifts" width={200} height={200} /> */}
              <span className="absolute top-2 left-5 bg-green-500/40 p-2 rounded-md shadow-xl shadow-black/20">
                <p className="text-white font-medium ">Escolhido</p>
              </span>
            </CardHeader>

            <CardContent className="w-40 flex flex-col items-center">
              <div className="w-full flex flex-col mt-10">
                <p className="text-xs  capitalize">{gift.category}</p>
                <p className="text-xs font-bold capitalize">{gift.item}</p>
              </div>
              <Button className="bg-[#617c53] hover:bg-[#617c53]/80 text-md w-full mt-5">
                <p>Concluir</p>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
