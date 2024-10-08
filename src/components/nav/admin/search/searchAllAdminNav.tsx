import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchAllAdminNav = () => {
  return (
    <div className=" relative">
      <Input placeholder=" Search" className="  w-80"/>
      <button className=" absolute right-2 top-3 text-gray-500">
        <Search size={20}/>
      </button>
    </div>
  )
}

export default SearchAllAdminNav
