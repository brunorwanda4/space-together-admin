import { Logo } from "../logo"
import SearchAllAdminNav from "./search/searchAllAdminNav"
import { MessagesNavSheet } from "./sheets/messagesNavSheet"
import { NotificationNavSheet } from "./sheets/notificationNavSheet"
import { ProfileNavSheet } from "./sheets/profileNavSheet"

export const AdminNav = () => {
  return (
    <div className=" fixed w-full">
        <div className=" pl-52 flex justify-end p-2 gap-4">
          {/* search */}
          <SearchAllAdminNav />
          <div className=" flex justify-between w-80">
            <NotificationNavSheet/> 
            <ProfileNavSheet />
          </div>
        </div>
    </div>
  )
}
