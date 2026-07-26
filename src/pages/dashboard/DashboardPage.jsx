import { useEffect, useState } from "react"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartCatalogTimeline } from "@/components/chart-catalog-timeline"
import { ChartDistributionPie } from "@/components/chart-distribution-pie"
import { SectionCards } from "@/components/section-cards"
import { getPlantsSummary } from "@/services/plants"

export default function DashboardPage() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    getPlantsSummary().then(setStats)
  }, [])

  return (
    <>
      <SectionCards stats={stats} />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2">
        <ChartAreaInteractive stats={stats} />
        <ChartCatalogTimeline stats={stats} />
        <ChartDistributionPie
          title="Por Familia Taxonómica"
          description="Cantidad de plantas registradas por familia"
          data={stats?.porFamilia}
        />
        <ChartDistributionPie
          title="Por Clasificación Etnobotánica"
          description="Distribución según su clasificación de uso"
          data={stats?.porClasificacion}
        />
      </div>
    </>
  )
}
