"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, Trash } from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/app/_context/authContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { db } from "@/lib/firebase.confing";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function RecevedGiftsC() {
  const { user, giftsList: list, gifts } = useAuthContext();

  const router = useRouter();
  const { toast } = useToast();
  const handleRemoveGift = async (
    name: string,
    id: string,
    uid: string,
    numberId: number
  ) => {
    try {
      for (const [category, giftsList] of Object.entries(gifts)) {
        for (const gift of giftsList) {
          if (gift.name === name) {
            remove(uid, id, numberId);
          }
        }
      }
    } catch (error) {
      console.error("Deu algum erro ao remover o presente:", error);
    }
  };

  const fetchDocument = async (docId: string) => {
    const docRef = doc(db, "presentes", docId);
    return await getDoc(docRef);
  };

  const updateItemQuantity = async (docId: string, updatedItems: any) => {
    const docRef = doc(db, "presentes", docId);
    await updateDoc(docRef, { items: updatedItems }).then(() => {
      console.log("Item atualizado com sucesso!");
    });
  };

  const remove = async (id: string, uid: string, itemId: number) => {
    const docSnap = await fetchDocument(id);
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

    if (item.quantity >= 0) {
      items[itemIndex].quantity += 1;

      await updateItemQuantity(id, items);
      handleDeleteItem(uid, false);
      console.log(
        `Quantidade do item ${itemId} atualizada para ${items[itemIndex].quantity}`
      );
    } else {
      console.log(
        `Quantidade do item ${itemId} não é suficiente para atualizar.`
      );
    }
  };

  const handleDeleteItem = async (id: string, isSucess: boolean) => {
    try {
      const docRef = doc(db, "presentes-escolhidos", id);
      await deleteDoc(docRef);

      if (isSucess) {
        toast({
          title: "Obrigado por nos ajudar!",
          description: "Agora você pode escolher outro!",
        });
        router.push("/gifts");
      } else {
        toast({
          title: "Item removido com sucesso!",
          description: "Escolha outro e continue nos abençoando!",
        });
        router.push("/gifts");
      }
    } catch (error) {
      console.error("Erro ao deletar o item: ", error);
    }
  };

  return (
    <main className="p-5">
      <Button variant="outline" size="icon">
        <Link href="/gifts">
          <ChevronLeft />
        </Link>
      </Button>
      <div className="mt-10 flex flex-wrap gap-5 w-[99%] m-auto">
        {list.map((gift) => (
          <Card key={gift.id}>
            <CardHeader className="relative flex flex-col items-center justify-center gap-2 ">
              <div className="w-full h-40 relative">
                <Image
                  src={gift.image}
                  alt="gifts"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="absolute top-2 left-5 bg-green-500/40 p-2 rounded-md shadow-xl shadow-black/20">
                <p className="text-white font-medium ">Escolhido</p>
              </span>
            </CardHeader>

            <CardContent className="w-40 flex flex-col items-center">
              <div className="w-full flex flex-col mt-10">
                <p className="text-xs capitalize">{gift.category}</p>
                <p className="text-xs font-bold capitalize">{gift.item}</p>
              </div>
              <div className="w-full flex justify-between">
                <Button
                  className="bg-[#617c53] hover:bg-[#617c53]/80 text-md  mt-5 shadow-xl shadow-black/20"
                  onClick={() => handleDeleteItem(gift.id, true)}
                >
                  <Check />
                </Button>
                <Button
                  className="bg-destructive hover:bg-destructive/80 text-md  mt-5 shadow-xl shadow-black/20"
                  size="icon"
                  onClick={() =>
                    handleRemoveGift(gift.item, gift.id, gift.uid, gift.number)
                  }
                >
                  <Trash />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
