import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
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

const chartConfig = {
  cantidad: {
    label: "Plantas",
    color: "var(--primary)",
  },
}

export function ChartAreaInteractive({ stats }) {
  const chartData = [
    { estado: "Activas", cantidad: stats?.activos ?? 0 },
    { estado: "Borradores", cantidad: stats?.borrador ?? 0 },
    { estado: "Inactivas", cantidad: stats?.inactivos ?? 0 },
  ]

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Distribución del Catálogo</CardTitle>
        <CardDescription>Plantas registradas según su estado de publicación</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="estado" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="cantidad" fill="var(--color-cantidad)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
