import { cn } from "@/lib/utils"
import { MyImage } from "../ui/myImage"

interface logoProps {
  admin ?: boolean,
  title ?: boolean,
}

export const Logo = ({
  admin , title
} : logoProps) => {
  return (
    <div className=" flex gap-1 items-center flex-1">
      <MyImage className=" size-8" alt="Space together logo" src="/logo.png"/>
      {!title && <h1 className={cn("capitalize font-allura font-semibold text-lg")}>Space Together {admin && (<span className=" text-xs decoration-clone  badge badge-neutral">Admin</span>)}</h1>}
    </div>
  )
}
