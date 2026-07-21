import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// Contenidos publicados vs en revisión por mes
const chartData = [
  { date: "2024-10-01", publicados: 12, revision: 5 },
  { date: "2024-10-08", publicados: 18, revision: 8 },
  { date: "2024-10-15", publicados: 15, revision: 6 },
  { date: "2024-10-22", publicados: 22, revision: 9 },
  { date: "2024-10-29", publicados: 19, revision: 4 },
  { date: "2024-11-05", publicados: 25, revision: 11 },
  { date: "2024-11-12", publicados: 30, revision: 7 },
  { date: "2024-11-19", publicados: 28, revision: 10 },
  { date: "2024-11-26", publicados: 35, revision: 13 },
  { date: "2024-12-03", publicados: 32, revision: 8 },
  { date: "2024-12-10", publicados: 40, revision: 15 },
  { date: "2024-12-17", publicados: 38, revision: 12 },
  { date: "2024-12-24", publicados: 42, revision: 9 },
  { date: "2024-12-31", publicados: 45, revision: 14 },
  { date: "2025-01-07", publicados: 50, revision: 18 },
  { date: "2025-01-14", publicados: 47, revision: 11 },
  { date: "2025-01-21", publicados: 55, revision: 20 },
  { date: "2025-01-28", publicados: 52, revision: 16 },
  { date: "2025-02-04", publicados: 60, revision: 22 },
  { date: "2025-02-11", publicados: 58, revision: 19 },
  { date: "2025-02-18", publicados: 65, revision: 25 },
  { date: "2025-02-25", publicados: 70, revision: 21 },
  { date: "2025-03-04", publicados: 68, revision: 17 },
  { date: "2025-03-11", publicados: 75, revision: 28 },
  { date: "2025-03-18", publicados: 72, revision: 24 },
  { date: "2025-03-25", publicados: 80, revision: 30 },
  { date: "2025-04-01", publicados: 78, revision: 26 },
  { date: "2025-04-08", publicados: 85, revision: 32 },
  { date: "2025-04-15", publicados: 88, revision: 29 },
  { date: "2025-04-22", publicados: 92, revision: 35 },
]

const chartConfig = {
  publicados: {
    label: "Publicados",
    color: "var(--primary)",
  },
  revision: {
    label: "En Revisión",
    color: "var(--muted-foreground)",
  },
}

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("30d")
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2025-04-22")
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Actividad de Contenido</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Publicaciones vs revisiones en los últimos meses
          </span>
          <span className="@[540px]/card:hidden">Últimos meses</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => v && setTimeRange(v)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Últimos 3 meses</ToggleGroupItem>
            <ToggleGroupItem value="30d">Últimos 30 días</ToggleGroupItem>
            <ToggleGroupItem value="7d">Últimos 7 días</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(v) => v && setTimeRange(v)}>
            <SelectTrigger
              className="flex w-44 @[767px]/card:hidden"
              size="sm"
              aria-label="Seleccionar período"
            >
              <SelectValue placeholder="Últimos 3 meses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">Últimos 3 meses</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Últimos 30 días</SelectItem>
              <SelectItem value="7d" className="rounded-lg">Últimos 7 días</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPublicados" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-publicados)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-publicados)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRevision" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revision)" stopOpacity={0.5} />
                <stop offset="95%" stopColor="var(--color-revision)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("es-MX", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("es-MX", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revision"
              type="natural"
              fill="url(#fillRevision)"
              stroke="var(--color-revision)"
              stackId="a"
            />
            <Area
              dataKey="publicados"
              type="natural"
              fill="url(#fillPublicados)"
              stroke="var(--color-publicados)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
