import { useFormContext } from "react-hook-form"

import { RepeatableFieldList } from "@/components/plant-form/RepeatableFieldList"
import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function CompuestosQuimicosTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <RepeatableFieldList
      name="compuestosQuimicos"
      label="Compuestos químicos"
      emptyRow={{ nombre: "", detalle: "" }}
      renderRow={(index) => (
        <div className="flex flex-col gap-3">
          <Field>
            <FieldLabel htmlFor={`compuestosQuimicos.${index}.nombre`}>Nombre</FieldLabel>
            <Input
              id={`compuestosQuimicos.${index}.nombre`}
              {...register(`compuestosQuimicos.${index}.nombre`)}
            />
            <FieldError
              errors={[
                getFieldError(errors, `compuestosQuimicos.${index}.nombre`),
              ].filter(Boolean)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`compuestosQuimicos.${index}.detalle`}>Detalle</FieldLabel>
            <Textarea
              id={`compuestosQuimicos.${index}.detalle`}
              {...register(`compuestosQuimicos.${index}.detalle`)}
            />
            <FieldError
              errors={[
                getFieldError(errors, `compuestosQuimicos.${index}.detalle`),
              ].filter(Boolean)}
            />
          </Field>
        </div>
      )}
    />
  )
}
