import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Separator } from "@/components/ui/separator"

function Section({ title, children }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

function Field({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground/70">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

export function PlantPreviewDrawer({ plant, open, onOpenChange }) {
  if (!plant) return null

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{plant.nombreComun}</DrawerTitle>
          <DrawerDescription className="italic">{plant.nombreCientifico}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-4 text-sm">
          <Separator />

          {plant.multimediaPrincipal?.imagenUrl && (
            <img
              src={plant.multimediaPrincipal.imagenUrl}
              alt={plant.nombreComun}
              className="aspect-video w-full rounded-lg border object-cover"
            />
          )}

          <div className="flex items-center gap-2">
            <Badge variant="outline">{plant.estado}</Badge>
            {plant.nombresAlternativos?.length > 0 && (
              <span className="text-xs text-muted-foreground">
                También conocido como: {plant.nombresAlternativos.join(", ")}
              </span>
            )}
          </div>

          <Section title="Taxonomía">
            <Field label="Reino" value={plant.taxonomia?.reino} />
            <Field label="División" value={plant.taxonomia?.division} />
            <Field label="Clase" value={plant.taxonomia?.clase} />
            <Field label="Familia" value={plant.taxonomia?.familia} />
            <Field label="Género" value={plant.taxonomia?.genero} />
          </Section>

          <Section title="Etnobotánica">
            <Field label="Clasificación" value={plant.etnobotanica?.clasificacion} />
            <Field label="Parte utilizada" value={plant.etnobotanica?.parteUtilizada} />
            <Field label="Uso tradicional" value={plant.etnobotanica?.usoTradicional} />
          </Section>

          {plant.perfilEtnobotanico && (
            <Section title="Perfil etnobotánico">
              <p>{plant.perfilEtnobotanico}</p>
            </Section>
          )}

          <Section title="Historia y evolución">
            <Field label="Origen" value={plant.historiaEvolucion?.origen} />
            <Field label="Dispersión" value={plant.historiaEvolucion?.dispersion} />
            <Field label="Evolución" value={plant.historiaEvolucion?.evolucion} />
          </Section>

          {(plant.comercio?.exportacion?.length > 0 || plant.comercio?.importacion?.length > 0) && (
            <Section title="Comercio">
              {plant.comercio?.exportacion?.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground/70">Exportación</span>
                  {plant.comercio.exportacion.map((row, i) => (
                    <p key={i}>
                      <span className="font-medium text-foreground">{row.pais}: </span>
                      {row.detalle}
                    </p>
                  ))}
                </div>
              )}
              {plant.comercio?.importacion?.length > 0 && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground/70">Importación</span>
                  {plant.comercio.importacion.map((row, i) => (
                    <p key={i}>
                      <span className="font-medium text-foreground">{row.pais}: </span>
                      {row.detalle}
                    </p>
                  ))}
                </div>
              )}
            </Section>
          )}

          {plant.compuestosQuimicos?.length > 0 && (
            <Section title="Compuestos químicos">
              {plant.compuestosQuimicos.map((row, i) => (
                <p key={i}>
                  <span className="font-medium text-foreground">{row.nombre}: </span>
                  {row.detalle}
                </p>
              ))}
            </Section>
          )}

          {plant.contenido && (
            <Section title="Contenido">
              <p className="whitespace-pre-wrap">{plant.contenido}</p>
            </Section>
          )}

          {plant.updatedAt && (
            <span className="text-xs text-muted-foreground/70">
              Última actualización: {new Date(plant.updatedAt).toLocaleString("es-MX")}
            </span>
          )}
        </div>
        <DrawerFooter>
          <Button nativeButton={false} render={<Link to={`/dashboard/plantas/${plant._id}/editar`} />}>
            Editar
          </Button>
          <DrawerClose render={<Button variant="outline" />}>Cerrar</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
