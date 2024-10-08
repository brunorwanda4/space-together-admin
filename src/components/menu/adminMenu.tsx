import { AdminNav } from "../nav/admin/AdminNav"
import { AdminAside } from "./adminAside"

interface props {
    children: React.ReactNode
}

export const AdminMenu = ({
    children
} : props) => {
  return (
    <main>
        <AdminNav />
        <div className=" flex gap-2">
            <AdminAside />
            <section className=" pl-52 pt-12">
                {children}
            </section>
        </div>
    </main>
  )
}
