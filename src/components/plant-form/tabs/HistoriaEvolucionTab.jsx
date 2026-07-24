import { useFormContext } from "react-hook-form"

import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const FIELDS = [
  { key: "origen", label: "Origen" },
  { key: "dispersion", label: "Dispersión" },
  { key: "evolucion", label: "Evolución" },
]

export function HistoriaEvolucionTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      {FIELDS.map(({ key, label }) => (
        <Field key={key}>
          <FieldLabel htmlFor={`historiaEvolucion.${key}`}>{label}</FieldLabel>
          <Textarea
            id={`historiaEvolucion.${key}`}
            className="min-h-28"
            {...register(`historiaEvolucion.${key}`)}
          />
          <FieldError
            errors={[getFieldError(errors, `historiaEvolucion.${key}`)].filter(Boolean)}
          />
        </Field>
      ))}
    </div>
  )
}
