"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Home, LayoutDashboard, List } from "lucide-react"
import { ModeToggle } from "../toggle-theme/toggle"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Formulario",
    url: "Formulario",
    icon: LayoutDashboard,
  },
  {
    title: "Devs - listagem",
    url: "List",
    icon: List,
  },
]

export function AppSidebar() {
  const { open } = useSidebar()

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r"
      style={{
        '--sidebar-width-icon': '4rem'
      } as React.CSSProperties}
    >
      <SidebarHeader className="border-b p-4 flex bg-black/60 flex-row items-center justify-between">
        {open && <h2 className="text-2xl font-bold">DevBoard</h2>}
        <SidebarTrigger className={`transition-all duration-300 ${open ? '' : 'mx-auto'}`} />
      </SidebarHeader>
      
      <SidebarContent className="pt-4 bg-black/60">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-sm px-4 mb-2">
              Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={open ? undefined : item.title}>
                    <a 
                      className="flex items-center gap-3 px-3 py-2"
                      href={item.url}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="truncate">{item.title}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="mt-auto p-4 border-t bg-black/60">
        <div className={open ? '' : 'flex justify-center'}>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}