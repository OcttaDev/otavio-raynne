"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase.confing";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Auth() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const signInWithGoogle = async () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        router.push("/gifts");
      });
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-2xl text-center max-w-md">
        Faça login com o Google para continuar
      </h1>
      <Button onClick={signInWithGoogle}>Fazer login</Button>
    </div>
  );
}
