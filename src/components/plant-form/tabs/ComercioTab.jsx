import { useFormContext } from "react-hook-form"

import { RepeatableFieldList } from "@/components/plant-form/RepeatableFieldList"
import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function ComercioRow({ name, index, errors }) {
  const { register } = useFormContext()

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor={`${name}.${index}.pais`}>País</FieldLabel>
        <Input id={`${name}.${index}.pais`} {...register(`${name}.${index}.pais`)} />
        <FieldError errors={[getFieldError(errors, `${name}.${index}.pais`)].filter(Boolean)} />
      </Field>
      <Field>
        <FieldLabel htmlFor={`${name}.${index}.detalle`}>Detalle</FieldLabel>
        <Input id={`${name}.${index}.detalle`} {...register(`${name}.${index}.detalle`)} />
        <FieldError
          errors={[getFieldError(errors, `${name}.${index}.detalle`)].filter(Boolean)}
        />
      </Field>
    </div>
  )
}

export function ComercioTab() {
  const {
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-6">
      <RepeatableFieldList
        name="comercio.exportacion"
        label="Exportación"
        emptyRow={{ pais: "", detalle: "" }}
        renderRow={(index) => (
          <ComercioRow name="comercio.exportacion" index={index} errors={errors} />
        )}
      />

      <RepeatableFieldList
        name="comercio.importacion"
        label="Importación"
        emptyRow={{ pais: "", detalle: "" }}
        renderRow={(index) => (
          <ComercioRow name="comercio.importacion" index={index} errors={errors} />
        )}
      />
    </div>
  )
}
