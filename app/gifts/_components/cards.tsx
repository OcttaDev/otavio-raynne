"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { HandIcon } from "@radix-ui/react-icons";
import { IGift } from "./gifts";
import { db } from "@/lib/firebase.confing";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthContext } from "@/app/_context/authContext";
import { useRouter } from "next/navigation";

export default function Cards({
  gift,
  category,
}: {
  gift: IGift;
  category: string;
}) {
  const { toast } = useToast();
  const { user } = useAuthContext();

  const router = useRouter();
  const handleCheckItem = async () => {
    await addDoc(collection(db, "presentes-escolhidos"), {
      item: gift.name,
      category: category,
      convidado: user?.uid,
    })
      .then((res) => {
        handleCheckItemQuantity(gift.uid, gift.id);
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

  const fetchDocument = async (docId: string) => {
    const docRef = doc(db, "presentes", docId);
    return await getDoc(docRef);
  };

  // Função para atualizar o item
  const updateItemQuantity = async (docId: string, updatedItems: any) => {
    const docRef = doc(db, "presentes", docId);
    await updateDoc(docRef, { items: updatedItems }).then(() => {
      router.push("/gifts/receved-gifts");
    });
  };

  // Função principal para verificar e atualizar a quantidade do item
  const handleCheckItemQuantity = async (docId: string, itemId: string) => {
    const docSnap = await fetchDocument(docId);

    if (!docSnap.exists()) {
      console.log("Nenhum documento encontrado com esse ID!");
      return;
    }

    const data = docSnap.data();
    const items = data.items || []; // Acessa o array de itens

    const itemIndex = items.findIndex((i: any) => i.id === itemId);

    if (itemIndex === -1) {
      console.log(`Item com ID ${itemId} não encontrado.`);
      return;
    }

    const item = items[itemIndex];

    if (item.quantity >= 1) {
      items[itemIndex].quantity -= 1;

      await updateItemQuantity(docId, items);
      console.log(
        `Quantidade do item ${itemId} atualizada para ${items[itemIndex].quantity}`
      );
    } else {
      console.log(
        `Quantidade do item ${itemId} não é suficiente para atualizar.`
      );
    }
  };

  return (
    <Card>
      <CardHeader className="relative flex flex-col items-center justify-center gap-2 ">
        {/* <Image src="" alt="gifts" width={200} height={200} /> */}
        <span
          className={`absolute top-2 left-5 ${
            gift.quantity >= 1 ? "bg-green-500/40" : "bg-red-500/40"
          } p-2 rounded-md shadow-xl shadow-black/20`}
        >
          <p className="text-white font-medium ">
            {gift.quantity >= 1 ? "Disponivel" : "Indisponivel"}
          </p>
        </span>
      </CardHeader>
      <CardContent className="w-48 h-40 flex flex-col items-center justify-end">
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
          disabled={gift.quantity <= 0}
        >
          <p>Escolher</p>
        </Button>
      </CardContent>
    </Card>
  );
}
