import { SidebarProvider } from "@/components/ui/sidebar";
import { ClerkProvider, UserButton } from "@clerk/nextjs";
import App from "next/app";
import React from "react";
import { AppSidebar } from "./app-sidebar";
type Props = {
  children: React.ReactNode;
};

const SideBarLayout = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="m-2 w-full">
          <div className="border-sidebar-border bg-sidebar flex items-center gap-2 rounded-md border p-2 px-4 shadow">
            {/* search bar */}
            <div className="ml-auto">
              <UserButton />
            </div>
          </div>
          <div className="mt-5">
            {/* main content */}
            <div className="border-sidebar-border bg-sidebar h-[calc(100vh-6rem)] overflow-y-scroll rounded-md border p-4 shadow">
              {children}
            </div>
          </div>
        </main>
      </SidebarProvider>
    </ClerkProvider>
  );
};

export default SideBarLayout;
