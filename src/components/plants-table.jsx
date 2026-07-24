import * as React from "react"
import { Link } from "react-router-dom"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { toast } from "sonner"
import {
  EllipsisVerticalIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { PlantPreviewDrawer } from "@/components/plant-form/PlantPreviewDrawer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { removePlant } from "@/services/plants"

const ESTADO_BADGE = {
  ACTIVO: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  BORRADOR: "border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  INACTIVO: "border-muted-foreground/20 text-muted-foreground",
}

function buildColumns({ onPreview }) {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todo"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      ),
    },
    {
      accessorKey: "nombreComun",
      header: "Nombre común",
      cell: ({ row }) => (
        <Button
          variant="link"
          className="w-fit px-0 text-left text-foreground"
          onClick={() => onPreview(row.original)}
        >
          {row.original.nombreComun}
        </Button>
      ),
    },
    {
      accessorKey: "nombreCientifico",
      header: "Nombre científico",
      cell: ({ row }) => <span className="italic">{row.original.nombreCientifico}</span>,
    },
    {
      id: "familia",
      header: "Familia",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.taxonomia?.familia}</span>
      ),
    },
    {
      id: "clasificacion",
      header: "Clasificación",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.etnobotanica?.clasificacion}</span>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant="outline" className={ESTADO_BADGE[row.original.estado]}>
          {row.original.estado}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <RowActions plant={row.original} onPreview={onPreview} />
      ),
    },
  ]
}

function RowActions({ plant, onPreview, onRequestDelete }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-open:bg-muted"
            size="icon"
          />
        }
      >
        <EllipsisVerticalIcon className="size-4" />
        <span className="sr-only">Abrir menú</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => onPreview(plant)}>Ver</DropdownMenuItem>
        <DropdownMenuItem render={<Link to={`/dashboard/plantas/${plant._id}/editar`} />}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => onRequestDelete(plant)}>
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function PlantsTable({
  data,
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading,
  onChanged,
}) {
  const [previewPlant, setPreviewPlant] = React.useState(null)
  const [deleteTarget, setDeleteTarget] = React.useState(null)
  const [deleting, setDeleting] = React.useState(false)

  const columns = React.useMemo(
    () =>
      buildColumns({ onPreview: setPreviewPlant }).map((col) =>
        col.id === "actions"
          ? {
              ...col,
              cell: ({ row }) => (
                <RowActions
                  plant={row.original}
                  onPreview={setPreviewPlant}
                  onRequestDelete={setDeleteTarget}
                />
              ),
            }
          : col
      ),
    []
  )

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => row._id,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(total / pageSize)),
  })

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await removePlant(deleteTarget._id)
      toast.success(`"${deleteTarget.nombreComun}" fue eliminada.`)
      setDeleteTarget(null)
      onChanged?.()
    } catch (error) {
      toast.error(error.message ?? "No se pudo eliminar la planta.")
    } finally {
      setDeleting(false)
    }
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize))

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Cargando plantas...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No hay plantas registradas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {total} planta{total === 1 ? "" : "s"} en total.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Filas por página
            </Label>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectGroup>
                  {[5, 10, 20].map((size) => (
                    <SelectItem key={size} value={`${size}`}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {page} de {pageCount}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={page <= 1}
            >
              <span className="sr-only">Primera página</span>
              <ChevronsLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => onPageChange(page - 1)}
              disabled={page <= 1}
            >
              <span className="sr-only">Página anterior</span>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => onPageChange(page + 1)}
              disabled={page >= pageCount}
            >
              <span className="sr-only">Página siguiente</span>
              <ChevronRightIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => onPageChange(pageCount)}
              disabled={page >= pageCount}
            >
              <span className="sr-only">Última página</span>
              <ChevronsRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <PlantPreviewDrawer
        plant={previewPlant}
        open={Boolean(previewPlant)}
        onOpenChange={(open) => !open && setPreviewPlant(null)}
      />

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar planta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente "{deleteTarget?.nombreComun}". No se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleConfirmDelete}
              disabled={deleting}
            >
              {deleting ? "Eliminando..." : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
