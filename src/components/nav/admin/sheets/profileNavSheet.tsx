import { MyImage } from "@/components/ui/myImage"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export const ProfileNavSheet = () => {
  return (
    <Sheet>
       <SheetTrigger className=" btn btn-circle btn-sm btn-ghost flex flex-row-reverse">
            <div className=" flex gap-2 flex-row-reverse items-center">
              <MyImage type="icon" src="/p.jpg" />
            </div>
       </SheetTrigger>
       <SheetContent className=" dark:bg-black">
            Hello you profile 
       </SheetContent>
    </Sheet>
  )
}
