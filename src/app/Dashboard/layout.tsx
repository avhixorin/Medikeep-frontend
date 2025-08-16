import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-[100dvh]">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
