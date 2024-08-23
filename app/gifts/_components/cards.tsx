"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { HandIcon } from "@radix-ui/react-icons";
import { IGift } from "./gifts";
import { db } from "@/lib/firebase.confing";
import { addDoc, collection } from "firebase/firestore";
import { useAuthContext } from "@/app/_context/authContext";

export default function Cards({
  gift,
  category,
}: {
  gift: IGift;
  category: string;
}) {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const handleCheckItem = async () => {
    await addDoc(collection(db, "presentes"), {
      item: gift.name,
      convidado: user?.uid,
    })
      .then(() => {
        handleCheckItemQuantity();
        toast({
          title: gift.name,
          description: "Item escolhido com sucesso!",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Erro ao escolher o item",
          description: "Tente novamente mais tarde",
        });
      });
  };

  const handleCheckItemQuantity = async () => {
    if (gift.quantity > 1) {
      const data = {
        id: gift.id,
        name: gift.name,
        quantity: gift.quantity - 1,
      };
      const fetchConfig = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // Use 'body' ao invés de 'data'
      };
      try {
        const response = await fetch(
          `http://localhost:3001/${category}/${gift.id}`,
          fetchConfig
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedGift = await response.json();
        console.log("Updated gift:", updatedGift);

        window.location.reload();
      } catch (error) {
        console.error("Error updating gift:", error);
      }
    }

    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `http://localhost:3001/${category}/${gift.id}`,
      fetchConfig
    );
  };

  return (
    <Card>
      <CardHeader className="relative flex flex-col items-center justify-center gap-2 ">
        {/* <Image src="" alt="gifts" width={200} height={200} /> */}
        <span className="absolute top-2 left-5 bg-green-500/40 p-2 rounded-md shadow-xl shadow-black/20">
          <p className="text-white font-medium ">Disponivel</p>
        </span>
      </CardHeader>
      <CardContent className="w-40 flex flex-col items-center">
        <div className="w-full flex flex-col mt-10">
          <div className="flex items-center justify-between">
            <p className="text-xs  capitalize">{category}</p>
            <p className="text-xs  capitalize">{gift.quantity}</p>
          </div>
          <p className="text-xs font-bold capitalize">{gift.name}</p>
        </div>
        <Button
          className="bg-amber-800/30 hover:bg-amber-800/20 text-md w-full mt-5"
          onClick={handleCheckItem}
        >
          <HandIcon className="mr-5" width={20} height={20} />
          <p>Escolher</p>
        </Button>
      </CardContent>
    </Card>
  );
}
