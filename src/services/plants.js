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

export async function getPlantsSummary() {
  const plants = collection.all()
  const total = plants.length
  const activos = plants.filter((p) => p.estado === "ACTIVO").length
  const borrador = plants.filter((p) => p.estado === "BORRADOR").length
  const inactivos = plants.filter((p) => p.estado === "INACTIVO").length
  const familiasCount = new Set(plants.map((p) => p.taxonomia?.familia).filter(Boolean)).size

  return { total, activos, borrador, inactivos, familiasCount }
}

export const ESTADO_OPTIONS = ["ACTIVO", "BORRADOR", "INACTIVO"]
