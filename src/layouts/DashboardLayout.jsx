import { Outlet, useLocation } from "react-router-dom"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

const TITLES = [
  { match: (path) => path === "/dashboard", title: "Dashboard" },
  { match: (path) => path === "/dashboard/plantas", title: "Plantas" },
  { match: (path) => path === "/dashboard/plantas/nueva", title: "Nueva planta" },
  { match: (path) => path.endsWith("/editar"), title: "Editar planta" },
]

function getTitle(pathname) {
  return TITLES.find((entry) => entry.match(pathname))?.title ?? "Dashboard"
}

export function DashboardLayout() {
  const location = useLocation()

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={getTitle(location.pathname)} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
