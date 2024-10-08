import { cn } from "@/lib/utils"
import Image from "next/image"

interface MyImageProps {
    src : string
    alt ?: string
    className ?: string
    classname ? : string
    type ?: "icon" | "image" | "big"
}


export const MyImage = ({
    src , alt , classname , className , type
} : MyImageProps) => {
  return (
    <div className={cn("relative size-32" , type === "icon" && "size-8 rounded-full", className)}>
        <Image
         src={src} 
         alt={cn("image" , alt)}
         fill
         sizes="100vh"
         className={cn("object-contain" ,type === "icon" && " rounded-full", classname)}
        />
    </div>
  )
}
