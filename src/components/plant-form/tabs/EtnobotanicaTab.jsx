import { useFormContext } from "react-hook-form"

import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function EtnobotanicaTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="etnobotanica.clasificacion">Clasificación</FieldLabel>
          <Input id="etnobotanica.clasificacion" {...register("etnobotanica.clasificacion")} />
          <FieldError
            errors={[getFieldError(errors, "etnobotanica.clasificacion")].filter(Boolean)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="etnobotanica.parteUtilizada">Parte utilizada</FieldLabel>
          <Input id="etnobotanica.parteUtilizada" {...register("etnobotanica.parteUtilizada")} />
          <FieldError
            errors={[getFieldError(errors, "etnobotanica.parteUtilizada")].filter(Boolean)}
          />
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="etnobotanica.usoTradicional">Uso tradicional</FieldLabel>
        <Textarea id="etnobotanica.usoTradicional" {...register("etnobotanica.usoTradicional")} />
        <FieldError
          errors={[getFieldError(errors, "etnobotanica.usoTradicional")].filter(Boolean)}
        />
      </Field>

      <Field>
        <FieldLabel htmlFor="perfilEtnobotanico">Perfil etnobotánico</FieldLabel>
        <Textarea
          id="perfilEtnobotanico"
          className="min-h-32"
          {...register("perfilEtnobotanico")}
        />
        <FieldError errors={[getFieldError(errors, "perfilEtnobotanico")].filter(Boolean)} />
      </Field>
    </div>
  )
}
