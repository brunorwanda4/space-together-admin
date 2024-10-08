import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Bell } from "lucide-react"

export const NotificationNavSheet = () => {
  return (
    <Sheet>
       <SheetTrigger className=" btn btn-circle btn-sm btn-ghost">
            <Bell size={28}/>
       </SheetTrigger>
       <SheetContent className=" dark:bg-black">
            Hello you notifications 
       </SheetContent>
    </Sheet>
  )
}
