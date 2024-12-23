import { IoIosWarning } from 'react-icons/io'
import { CiCircleCheck } from "react-icons/ci";
import { cn } from '@/lib/utils';

interface Props {
  message ?: string;
  className ?: string;
}

export const FormMessageError = ({
  message , className
}: Props) => {
  if(!message) return null;
  return (
    <div className={cn("bg-error/20 px-1 py-2 rounded-md" , className )}>
      <div className='flex text-rose-600  text-sm gap-3'>
        <IoIosWarning size={20}/>
        <span>{message}</span>
      </div>
    </div>
  )
}

export const FormMessageSuccess = ({
  message , className 
}: Props) => {
  if(!message) return null;
  return (
    <div className={cn("flex text-success bg-success/20 text-sm gap-3  px-1 py-2 rounded-md" , className)}>
      <CiCircleCheck size={20}/>
      <span>{message}</span>
    </div>
  )
}
