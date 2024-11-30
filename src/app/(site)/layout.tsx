import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" gap-2 w-full">
      <AppSidebar />
      <main className="w-full">
        {children}
      </main>
    </SidebarProvider>
  );
}
