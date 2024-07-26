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
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-12 h-12"
        >
          <Icon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[90%] flex justify-center mx-auto">
        <div className="px-3 mx-4 w-full flex flex-col items-center">
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
}
