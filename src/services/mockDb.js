export class NotFoundError extends Error {
  constructor(id) {
    super(`No se encontró el registro con id "${id}".`)
    this.name = "NotFoundError"
  }
}

function matchesSearch(item, search) {
  if (!search) return true
  const needle = search.trim().toLowerCase()
  if (!needle) return true
  return JSON.stringify(item).toLowerCase().includes(needle)
}

function compareValues(a, b) {
  if (a === b) return 0
  return a > b ? 1 : -1
}

export function createMockCollection(seed, { latencyMs = 400 } = {}) {
  let records = structuredClone(seed)

  const delay = (value) =>
    new Promise((resolve) => setTimeout(() => resolve(value), latencyMs))

  async function list({
    search = "",
    filters = {},
    page = 1,
    pageSize = 10,
    sortBy,
    sortDir = "asc",
  } = {}) {
    let filtered = records.filter((item) => matchesSearch(item, search))

    for (const [key, value] of Object.entries(filters)) {
      if (value == null || value === "" || value === "todos") continue
      filtered = filtered.filter((item) => item[key] === value)
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const result = compareValues(a[sortBy], b[sortBy])
        return sortDir === "desc" ? -result : result
      })
    }

    const total = filtered.length
    const start = (page - 1) * pageSize
    const data = filtered.slice(start, start + pageSize)

    return delay({ data: structuredClone(data), total, page, pageSize })
  }

  async function get(id) {
    const record = records.find((item) => item._id === id)
    if (!record) throw new NotFoundError(id)
    return delay(structuredClone(record))
  }

  async function create(payload) {
    const now = new Date().toISOString()
    const record = {
      ...structuredClone(payload),
      _id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    }
    records = [record, ...records]
    return delay(structuredClone(record))
  }

  async function update(id, payload) {
    const index = records.findIndex((item) => item._id === id)
    if (index === -1) throw new NotFoundError(id)
    const updated = {
      ...records[index],
      ...structuredClone(payload),
      _id: records[index]._id,
      createdAt: records[index].createdAt,
      updatedAt: new Date().toISOString(),
    }
    records = records.map((item, i) => (i === index ? updated : item))
    return delay(structuredClone(updated))
  }

  async function remove(id) {
    const exists = records.some((item) => item._id === id)
    if (!exists) throw new NotFoundError(id)
    records = records.filter((item) => item._id !== id)
    return delay({ ok: true })
  }

  function all() {
    return structuredClone(records)
  }

  return { list, get, create, update, remove, all }
}
