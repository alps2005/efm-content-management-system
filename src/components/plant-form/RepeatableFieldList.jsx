import { useFieldArray, useFormContext } from "react-hook-form"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RepeatableFieldList({ name, label, emptyRow, renderRow }) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <Button type="button" variant="outline" size="sm" onClick={() => append(emptyRow)}>
          <PlusIcon className="size-4" />
          Agregar
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-sm text-muted-foreground">No hay elementos agregados.</p>
      )}

      <div className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 rounded-lg border p-3">
            <div className="flex-1">{renderRow(index)}</div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2Icon className="size-4" />
              <span className="sr-only">Eliminar</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
