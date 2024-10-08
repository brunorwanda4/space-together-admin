import { Logo } from "../nav/logo"
import { AdminAsidePublic, AdminAsideRequest } from "./adminAsideClient"

export const AdminAside = () => {
  return (
    <div className=" flex flex-col fixed  z-40 h-screen w-52 border-r border-neutral-content">
        <div className=" w-full p-2">
            <div className=" mb-4">
              <Logo />
            </div>
            <AdminAsidePublic />
        </div>
        <span className=" text-gray-500 text-sm ml-2 font-semibold">Schools</span>
        <div className=" p-2">
            <AdminAsideRequest />
        </div>
    </div>
  )
}
