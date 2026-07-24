import { useFormContext } from "react-hook-form"

import { getFieldError } from "@/components/plant-form/plant-form-utils"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function MultimediaTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className="flex flex-col gap-4">
      <Field>
        <FieldLabel htmlFor="multimediaPrincipal.imagenUrl">URL de la imagen</FieldLabel>
        <Input
          id="multimediaPrincipal.imagenUrl"
          placeholder="https://..."
          {...register("multimediaPrincipal.imagenUrl")}
        />
        <FieldError
          errors={[getFieldError(errors, "multimediaPrincipal.imagenUrl")].filter(Boolean)}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="multimediaPrincipal.imagenPublicId">
            ID público de la imagen
          </FieldLabel>
          <Input
            id="multimediaPrincipal.imagenPublicId"
            {...register("multimediaPrincipal.imagenPublicId")}
          />
          <FieldDescription>Opcional. Usado por el proveedor de medios (Cloudinary).</FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="multimediaPrincipal.proveedor">Proveedor</FieldLabel>
          <Input id="multimediaPrincipal.proveedor" {...register("multimediaPrincipal.proveedor")} />
          <FieldError
            errors={[getFieldError(errors, "multimediaPrincipal.proveedor")].filter(Boolean)}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="multimediaPrincipal.videoUrl">URL del video</FieldLabel>
          <Input
            id="multimediaPrincipal.videoUrl"
            placeholder="https://..."
            {...register("multimediaPrincipal.videoUrl")}
          />
          <FieldDescription>Opcional.</FieldDescription>
          <FieldError
            errors={[getFieldError(errors, "multimediaPrincipal.videoUrl")].filter(Boolean)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="multimediaPrincipal.videoPublicId">
            ID público del video
          </FieldLabel>
          <Input
            id="multimediaPrincipal.videoPublicId"
            {...register("multimediaPrincipal.videoPublicId")}
          />
          <FieldDescription>Opcional.</FieldDescription>
        </Field>
      </div>
    </div>
  )
}
