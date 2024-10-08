import { AdminMenu } from "@/components/menu/adminMenu";

interface props {
    children: React.ReactNode;
}

const AdminLayout = ({
    children
} : props) => {
  return (
    <main className=" min-h-screen w-full">
      <AdminMenu>
        {children}
      </AdminMenu>
    </main>
  )
}

export default AdminLayout
