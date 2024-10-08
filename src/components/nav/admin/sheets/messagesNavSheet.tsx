import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircleMore } from "lucide-react";
export const MessagesNavSheet = () => {
  return (
    <Sheet>
       <SheetTrigger className=" btn btn-circle btn-sm btn-ghost">
            <MessageCircleMore size={28}/>
       </SheetTrigger>
       <SheetContent className=" dark:bg-black">
            Hello you notifications 
       </SheetContent>
    </Sheet>
  )
}
