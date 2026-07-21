import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  TrendingUpIcon,
  TrendingDownIcon,
  FileTextIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {/* Total de contenidos */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Contenidos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            248
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon className="size-3" />
              +18%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Crecimiento este mes
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Artículos, páginas y medios registrados
          </div>
        </CardFooter>
      </Card>

      {/* Publicados */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Publicados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            174
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon className="size-3" />
              +8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            70% del total activo
            <CheckCircleIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Contenido visible para los usuarios
          </div>
        </CardFooter>
      </Card>

      {/* En revisión */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>En Revisión</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            42
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon className="size-3" />
              -5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Pendientes de aprobación
            <ClockIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Requieren revisión editorial
          </div>
        </CardFooter>
      </Card>

      {/* Colaboradores activos */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Colaboradores Activos</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon className="size-3" />
              +2
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Equipo en crecimiento
            <UsersIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Editores y revisores activos
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
