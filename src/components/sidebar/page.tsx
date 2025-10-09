"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Home, LayoutDashboard, List, Menu } from "lucide-react"
import { ModeToggle } from "../toggle-theme/toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

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

// Componente do menu para reutilizar
function MenuItems({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <SidebarMenu className="space-y-1 px-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <a 
              className="flex items-center gap-3 px-3 py-2 hover:bg-accent rounded-md transition-colors"
              href={item.url}
              onClick={onItemClick}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

// Sidebar mobile (Sheet)
function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden fixed top-4 left-4 z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetHeader className="border-b p-4 bg-black/60">
            <SheetTitle className="text-2xl font-bold text-left">DevBoard</SheetTitle>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-5rem)]">
            <div className="flex-1 pt-4 bg-black/60 overflow-y-auto">
              <SidebarGroup>
                <SidebarGroupLabel className="text-sm px-4 mb-2">
                  Menu
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <MenuItems onItemClick={() => setOpen(false)} />
                </SidebarGroupContent>
              </SidebarGroup>
            </div>
            
            <div className="mt-auto p-4 border-t bg-black/60">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Sidebar desktop
function DesktopSidebar() {
  const { open } = useSidebar()

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r hidden lg:flex"
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
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}

// Componente principal que exporta
export function AppSidebar() {
  return (
    <>
      <MobileSidebar />
      <DesktopSidebar />
    </>
  )
}