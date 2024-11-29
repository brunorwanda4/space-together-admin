import { cn } from '@/lib/utils'
import Image from 'next/image'

interface props {
    src : string,
    alt ?: string,
    className ?: string,
    classname ?: string, 
}
const MyImage = ({src , alt , className , classname} : props) => {
  return (
    <div className={cn("size-32 relative", className)}>
      <Image src={src} alt={cn("alt for :" , alt)} className={cn("object-cover", classname)} fill/>
    </div>
  )
}

export default MyImage
