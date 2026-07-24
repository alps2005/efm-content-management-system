import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { PlantForm } from "@/components/plant-form/PlantForm"
import { emptyPlantFormValues, toFormValues } from "@/components/plant-form/plant-form-utils"
import { createPlant, getPlant, updatePlant } from "@/services/plants"

export function PlantFormPage({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [defaultValues, setDefaultValues] = useState(
    mode === "create" ? emptyPlantFormValues() : null
  )
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (mode !== "edit") return
    getPlant(id)
      .then((plant) => setDefaultValues(toFormValues(plant)))
      .catch(() => setNotFound(true))
  }, [mode, id])

  async function handleSubmit(payload) {
    try {
      if (mode === "create") {
        await createPlant(payload)
        toast.success("Planta creada correctamente.")
      } else {
        await updatePlant(id, payload)
        toast.success("Planta actualizada correctamente.")
      }
      navigate("/dashboard/plantas")
    } catch (error) {
      toast.error(error.message ?? "Ocurrió un error al guardar la planta.")
    }
  }

  if (notFound) {
    return (
      <div className="px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">No se encontró la planta solicitada.</p>
      </div>
    )
  }

  if (!defaultValues) {
    return (
      <div className="px-4 lg:px-6">
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-6">
      <PlantForm mode={mode} defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  )
}
