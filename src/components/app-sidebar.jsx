import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  FileTextIcon,
  FolderIcon,
  UsersIcon,
  BarChartIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  Settings2Icon,
  CircleHelpIcon,
  LeafIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Administrador",
    email: "admin@ecotecfloramedica.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Contenidos",
      url: "#contenidos",
      icon: FileTextIcon,
    },
    {
      title: "Categorías",
      url: "#categorias",
      icon: FolderIcon,
    },
    {
      title: "Colaboradores",
      url: "#colaboradores",
      icon: UsersIcon,
    },
    {
      title: "Analíticas",
      url: "#analiticas",
      icon: BarChartIcon,
    },
  ],
  documents: [
    {
      name: "Biblioteca de medios",
      url: "#medios",
      icon: DatabaseIcon,
    },
    {
      name: "Reportes",
      url: "#reportes",
      icon: FileChartColumnIcon,
    },
  ],
  navSecondary: [
    {
      title: "Configuración",
      url: "#configuracion",
      icon: Settings2Icon,
    },
    {
      title: "Ayuda",
      url: "#ayuda",
      icon: CircleHelpIcon,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <LeafIcon className="size-5!" />
              <span className="text-base font-semibold">Ecotec Flora Médica</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
