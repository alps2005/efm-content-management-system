import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LeafIcon,
  CheckCircleIcon,
  FileEditIcon,
  Layers3Icon,
} from "lucide-react"

export function SectionCards({ stats }) {
  const total = stats?.total ?? "—"
  const activos = stats?.activos ?? "—"
  const borrador = stats?.borrador ?? "—"
  const familiasCount = stats?.familiasCount ?? "—"

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Plantas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {total}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Catálogo del atlas
            <LeafIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Especies medicinales registradas
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Activas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {activos}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Visibles en el sitio público
            <CheckCircleIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Contenido publicado</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>En Borrador</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {borrador}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pendientes de publicar
            <FileEditIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Requieren revisión editorial</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Familias Taxonómicas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {familiasCount}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Diversidad del catálogo
            <Layers3Icon className="size-4" />
          </div>
          <div className="text-muted-foreground">Familias botánicas representadas</div>
        </CardFooter>
      </Card>
    </div>
  )
}
