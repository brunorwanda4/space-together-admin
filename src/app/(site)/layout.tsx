import { AppSidebar } from "@/components/site/navbar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className=" gap-2">
      <AppSidebar />
      <main>
        <SidebarTrigger className=" size-12"/>
        {children}
      </main>
    </SidebarProvider>
  );
}
