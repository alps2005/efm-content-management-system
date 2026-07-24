import { useFormContext } from "react-hook-form"

import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function ContenidoTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Field>
      <FieldLabel htmlFor="contenido">Contenido del artículo</FieldLabel>
      <FieldDescription>
        Texto largo que se muestra como cuerpo del artículo en el sitio público.
      </FieldDescription>
      <Textarea id="contenido" className="min-h-56" {...register("contenido")} />
      <FieldError errors={[getFieldError(errors, "contenido")].filter(Boolean)} />
    </Field>
  )
}
