"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase.confing";
import { useAuthContext } from "@/app/_context/authContext";

interface IGifts {
  id: string;
  item: string;
}
export default function RecevedGiftsC() {
  const [gifts, setGifts] = useState<IGifts[]>([]);
  const { user } = useAuthContext();
  const handleGetGifts = async () => {
    try {
      const giftsRef = collection(db, "presentes-escolhidos");
      const snapshot = await getDocs(giftsRef);
      let list: IGifts[] = [];
      snapshot.forEach((doc) => {
        if (doc.data().userId === user?.uid) {
          console.log(doc.data());

          list.push({
            id: doc.id,
            item: doc.data().item,
          });
        }
      });
      setGifts(list);
    } catch (error) {
      console.error("Deu algum erro ao buscar os presentes:", error);
    }
  };

  useEffect(() => {
    handleGetGifts();
  }, []);
  return (
    <main className="p-5">
      <Button variant="outline" size="icon">
        <Link href="/gifts">
          <ChevronLeft />
        </Link>
      </Button>
      <div className="mt-10">
        {gifts.map((gift) => (
          <div key={gift.id}>
            <p>{gift.item}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
