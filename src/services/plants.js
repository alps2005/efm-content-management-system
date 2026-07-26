import { createMockCollection } from "@/services/mockDb"
import { plantsSeed } from "@/services/plants.mock"

const collection = createMockCollection(plantsSeed)

export async function listPlants({ search = "", estado, page = 1, pageSize = 10, sortBy, sortDir } = {}) {
  return collection.list({
    search,
    filters: { estado },
    page,
    pageSize,
    sortBy,
    sortDir,
  })
}

export async function getPlant(id) {
  return collection.get(id)
}

export async function createPlant(payload) {
  return collection.create(payload)
}

export async function updatePlant(id, payload) {
  return collection.update(id, payload)
}

export async function removePlant(id) {
  return collection.remove(id)
}

function countBy(items, getKey) {
  const counts = new Map()
  for (const item of items) {
    const key = getKey(item)
    if (!key) continue
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return [...counts.entries()].map(([name, value]) => ({ name, value }))
}

function buildTimeline(plants) {
  const byDate = new Map()
  for (const plant of plants) {
    const date = plant.createdAt?.slice(0, 10)
    if (!date) continue
    byDate.set(date, (byDate.get(date) ?? 0) + 1)
  }

  const sortedDates = [...byDate.keys()].sort()
  let running = 0
  return sortedDates.map((date) => {
    running += byDate.get(date)
    return { date, total: running }
  })
}

export async function getPlantsSummary() {
  const plants = collection.all()
  const total = plants.length
  const activos = plants.filter((p) => p.estado === "ACTIVO").length
  const borrador = plants.filter((p) => p.estado === "BORRADOR").length
  const inactivos = plants.filter((p) => p.estado === "INACTIVO").length
  const familiasCount = new Set(plants.map((p) => p.taxonomia?.familia).filter(Boolean)).size
  const porFamilia = countBy(plants, (p) => p.taxonomia?.familia)
  const porClasificacion = countBy(plants, (p) => p.etnobotanica?.clasificacion)
  const timeline = buildTimeline(plants)

  return {
    total,
    activos,
    borrador,
    inactivos,
    familiasCount,
    porFamilia,
    porClasificacion,
    timeline,
  }
}

export const ESTADO_OPTIONS = ["ACTIVO", "BORRADOR", "INACTIVO"]
