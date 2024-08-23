import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LucideIcon } from "lucide-react";

export default function Icons({
  Icon,
  children,
}: {
  Icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full w-7 h-7">
          <Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mx-2">
        <div className="">{children}</div>
      </PopoverContent>
    </Popover>
  );
}
