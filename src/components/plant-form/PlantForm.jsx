import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { ComercioTab } from "@/components/plant-form/tabs/ComercioTab"
import { CompuestosQuimicosTab } from "@/components/plant-form/tabs/CompuestosQuimicosTab"
import { ContenidoTab } from "@/components/plant-form/tabs/ContenidoTab"
import { EtnobotanicaTab } from "@/components/plant-form/tabs/EtnobotanicaTab"
import { HistoriaEvolucionTab } from "@/components/plant-form/tabs/HistoriaEvolucionTab"
import { InformacionBasicaTab } from "@/components/plant-form/tabs/InformacionBasicaTab"
import { MultimediaTab } from "@/components/plant-form/tabs/MultimediaTab"
import { TaxonomiaTab } from "@/components/plant-form/tabs/TaxonomiaTab"
import { fromFormValues } from "@/components/plant-form/plant-form-utils"
import { PLANT_TABS, plantSchema, tabHasError } from "@/schemas/plant-schema"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const TAB_COMPONENTS = {
  informacionBasica: InformacionBasicaTab,
  taxonomia: TaxonomiaTab,
  etnobotanica: EtnobotanicaTab,
  historiaEvolucion: HistoriaEvolucionTab,
  comercio: ComercioTab,
  compuestosQuimicos: CompuestosQuimicosTab,
  multimedia: MultimediaTab,
  contenido: ContenidoTab,
}

export function PlantForm({ mode, defaultValues, onSubmit }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(PLANT_TABS[0].key)

  const form = useForm({
    resolver: zodResolver(plantSchema),
    defaultValues,
    mode: "onSubmit",
  })

  async function handleSubmit(values) {
    await onSubmit(fromFormValues(values))
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
        <Card>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto flex-wrap justify-start">
                {PLANT_TABS.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="gap-1.5">
                    {tab.label}
                    {tabHasError(form.formState.errors, tab.key) && (
                      <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              {PLANT_TABS.map((tab) => {
                const TabComponent = TAB_COMPONENTS[tab.key]
                return (
                  <TabsContent key={tab.key} value={tab.key} className="pt-6">
                    <TabComponent />
                  </TabsContent>
                )
              })}
            </Tabs>
          </CardContent>
          <CardFooter className="justify-end gap-2 bg-transparent">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard/plantas")}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Guardando..."
                : mode === "create"
                  ? "Crear planta"
                  : "Guardar cambios"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}
