import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PlusIcon, SearchIcon } from "lucide-react"

import { PlantsTable } from "@/components/plants-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { listPlants } from "@/services/plants"

const ESTADO_TABS = [
  { value: "todos", label: "Todos" },
  { value: "ACTIVO", label: "Activos" },
  { value: "BORRADOR", label: "Borradores" },
  { value: "INACTIVO", label: "Inactivos" },
]

export function PlantsListPage() {
  const [search, setSearch] = useState("")
  const [estado, setEstado] = useState("todos")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [result, setResult] = useState({ data: [], total: 0 })
  const [loading, setLoading] = useState(true)

  const refetch = useCallback(() => {
    setLoading(true)
    listPlants({ search, estado, page, pageSize })
      .then(setResult)
      .finally(() => setLoading(false))
  }, [search, estado, page, pageSize])

  useEffect(() => {
    refetch()
  }, [refetch])

  function handleEstadoChange(value) {
    setEstado(value)
    setPage(1)
  }

  function handleSearchChange(value) {
    setSearch(value)
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Plantas</h2>
          <p className="text-sm text-muted-foreground">
            Administra el catálogo de plantas medicinales del atlas.
          </p>
        </div>
        <Button nativeButton={false} render={<Link to="/dashboard/plantas/nueva" />}>
          <PlusIcon className="size-4" />
          Nueva planta
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs value={estado} onValueChange={handleEstadoChange}>
          <TabsList>
            {ESTADO_TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full max-w-64">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, familia..."
            className="pl-8"
            value={search}
            onChange={(event) => handleSearchChange(event.target.value)}
          />
        </div>
      </div>

      <PlantsTable
        data={result.data}
        total={result.total}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        loading={loading}
        onChanged={refetch}
      />
    </div>
  )
}
