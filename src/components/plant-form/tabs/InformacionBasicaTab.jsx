import { Controller, useFormContext } from "react-hook-form"

import { RepeatableFieldList } from "@/components/plant-form/RepeatableFieldList"
import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ESTADO_OPTIONS = [
  { value: "ACTIVO", label: "Activo" },
  { value: "BORRADOR", label: "Borrador" },
  { value: "INACTIVO", label: "Inactivo" },
]

export function InformacionBasicaTab() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="nombreComun">Nombre común</FieldLabel>
          <Input id="nombreComun" {...register("nombreComun")} />
          <FieldError errors={[getFieldError(errors, "nombreComun")].filter(Boolean)} />
        </Field>

        <Field>
          <FieldLabel htmlFor="nombreCientifico">Nombre científico</FieldLabel>
          <Input id="nombreCientifico" {...register("nombreCientifico")} />
          <FieldError errors={[getFieldError(errors, "nombreCientifico")].filter(Boolean)} />
        </Field>
      </div>

      <Field className="sm:w-56">
        <FieldLabel htmlFor="estado">Estado</FieldLabel>
        <Controller
          control={control}
          name="estado"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="estado" className="w-full">
                <SelectValue placeholder="Selecciona un estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ESTADO_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[getFieldError(errors, "estado")].filter(Boolean)} />
      </Field>

      <RepeatableFieldList
        name="nombresAlternativos"
        label="Nombres alternativos"
        emptyRow={{ value: "" }}
        renderRow={(index) => (
          <Field>
            <FieldLabel htmlFor={`nombresAlternativos.${index}.value`} className="sr-only">
              Nombre alternativo
            </FieldLabel>
            <Input
              id={`nombresAlternativos.${index}.value`}
              placeholder="Ej. Chile"
              {...register(`nombresAlternativos.${index}.value`)}
            />
            <FieldError
              errors={[getFieldError(errors, `nombresAlternativos.${index}.value`)].filter(Boolean)}
            />
          </Field>
        )}
      />
    </div>
  )
}
