import { useEffect, useState } from "react"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
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
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive stats={stats} />
      </div>
    </>
  )
}
