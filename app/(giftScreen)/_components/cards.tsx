"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { HandIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Cards() {
  const { toast } = useToast();

  const handleCheckItem = () => {
    toast({
      title: "Panela de Pressão",
      description: "Item escolhido com sucesso!",
    });
  };
  return (
    <Card>
      <CardHeader className="relative flex flex-col items-center justify-center gap-2 ">
        <Image src="/elements/flor.svg" alt="gifts" width={100} height={0} />
        <span className="absolute top-2 left-5 bg-green-500/40 p-2 rounded-md shadow-xl shadow-black/20">
          <p className="text-white font-medium ">Disponivel</p>
        </span>
      </CardHeader>
      <CardContent className="w-60">
        <div className="w-full flex flex-col gap-2">
          <p>Panela de Pressão</p>
          <Button
            className="bg-amber-800/30 hover:bg-amber-800/20 text-md"
            onClick={handleCheckItem}
          >
            <HandIcon className="mr-5" width={20} height={20} />
            <p>Escolher</p>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
