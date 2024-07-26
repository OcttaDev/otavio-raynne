import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function Cards() {
  return (
    <Card>
      <CardHeader>
        <Image src="/elements/flor.svg" alt="gifts" width={100} height={0} />
      </CardHeader>
      <CardContent className="w-60">
        <p>Panela de Pressão</p>
      </CardContent>
    </Card>
  );
}
