"use client";

import { AuthProvider } from "@/app/_context/authContext";
import RecevedGiftsC from "./_components/receved-gifts";

export default function RecevedGifts() {
  return (
    <AuthProvider>
      <RecevedGiftsC />
    </AuthProvider>
  );
}
