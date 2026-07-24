import { useFormContext } from "react-hook-form"

import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const FIELDS = [
  { key: "reino", label: "Reino" },
  { key: "division", label: "División" },
  { key: "clase", label: "Clase" },
  { key: "familia", label: "Familia" },
  { key: "genero", label: "Género" },
]

export function TaxonomiaTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {FIELDS.map(({ key, label }) => (
        <Field key={key}>
          <FieldLabel htmlFor={`taxonomia.${key}`}>{label}</FieldLabel>
          <Input id={`taxonomia.${key}`} {...register(`taxonomia.${key}`)} />
          <FieldError errors={[getFieldError(errors, `taxonomia.${key}`)].filter(Boolean)} />
        </Field>
      ))}
    </div>
  )
}
