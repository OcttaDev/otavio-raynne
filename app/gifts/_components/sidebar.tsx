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
import { SidebarOpen } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
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
          <SheetTitle>O & R</SheetTitle>
          <SheetDescription>
            Acompanhe nossos preparativos de pertinho.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-20 flex flex-col gap-4 w-[80%]">
          <Button variant="outline" asChild>
            <Link href="/gifts/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/gifts/receved-gifts">Favoritos</Link>
          </Button>
        </div>
        <SheetFooter className="absolute bottom-10 left-0 right-0 w-full">
          <Button
            variant="destructive"
            size="sm"
            className="w-20 m-auto shadow-md shadow-black/20"
          >
            Sair
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
