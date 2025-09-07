"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarGroupContent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import {
  Bot,
  CreditCard,
  LayoutDashboard,
  Plus,
  Presentation,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icons: LayoutDashboard,
  },
  {
    title: "Q&A",
    url: "/qa",
    icons: Bot,
  },
  {
    title: "Meetings",
    url: "/meetings",
    icons: Presentation,
  },
  {
    title: "Billing",
    url: "/billing",
    icons: CreditCard,
  },
];

// const projects = [
//   {
//     name: "Project 1",
//   },
//   {
//     name: "Project 2",
//   },
//   {
//     name: "Project 3",
//   },
// ];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  const {projects,projectId,setProjectId} = useProject()
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Image
            src="/github-logo-png-transparent-background-photoshop-11659780041lubphycood.png"
            alt="Logo"
            width={40}
            height={40}
          />

          {open && (
            <h1 className="text-primary/80 text-xl font-bold">IssueInsight</h1>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            {items.map((item) => {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        {
                          "!bg-primary !text-white": pathname === item.url,
                        },
                        "list-none",
                      )}
                    >
                      <item.icons />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => {
                return (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <div onClick={()=>{
                        setProjectId(project.id)

                      }}>
                        <div
                          className={cn(
                            "text-primary flex size-8 items-center justify-center rounded-sm border bg-white text-sm",
                            { "bg-primary text-white": project.id === projectId

                             },
                          )}
                        >
                          {project.name[0]}
                        </div>
                        <span>{project.name}</span>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}

              <div className="h-2"></div>
              {open && (
                <SidebarMenuItem>
                  <Link href="/create">
                    <Button size={"sm"} variant={"outline"} className="w-fit">
                      {" "}
                      <Plus />
                      Create Project
                    </Button>
                  </Link>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* sidebar content */}
      </SidebarContent>
    </Sidebar>
  );
}
