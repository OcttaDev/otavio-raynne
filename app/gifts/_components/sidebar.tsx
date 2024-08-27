"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { auth } from "@/lib/firebase.confing";
import { signOut } from "firebase/auth";
import { SidebarOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  async function Signout() {
    await signOut(auth).then(() => {
      router.push("/auth");
    });
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          size="icon"
          variant="outline"
          className="flex items-center gap-2"
        >
          <SidebarOpen />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col items-center">
        <SheetHeader>
          <div className="w-full flex justify-center">
            <Image
              src="/elements/logo.svg"
              alt="Logo do projeto"
              width={100}
              height={100}
            />
          </div>
          <SheetDescription>
            Acompanhe nossos preparativos de pertinho.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-20 flex flex-col gap-4 w-[80%]">
          <Button variant="outline" asChild>
            <Link href="/gifts/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gifts/receved-gifts">Escolhidos por mim</Link>
          </Button>
        </div>
        <SheetFooter className="absolute bottom-10 left-0 right-0 w-full">
          <Button
            variant="destructive"
            size="sm"
            className="w-20 m-auto shadow-md shadow-black/20"
            onClick={Signout}
          >
            Sair
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
