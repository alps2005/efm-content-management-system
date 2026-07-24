import { z } from "zod"

const requiredText = (label) => z.string().min(1, `${label} es obligatorio.`)

export const informacionBasicaSchema = z.object({
  nombreComun: requiredText("El nombre común"),
  nombreCientifico: requiredText("El nombre científico"),
  nombresAlternativos: z.array(
    z.object({ value: requiredText("El nombre alternativo") })
  ),
  estado: z.enum(["ACTIVO", "BORRADOR", "INACTIVO"], {
    message: "Selecciona un estado válido.",
  }),
})

export const taxonomiaSchema = z.object({
  taxonomia: z.object({
    reino: requiredText("El reino"),
    division: requiredText("La división"),
    clase: requiredText("La clase"),
    familia: requiredText("La familia"),
    genero: requiredText("El género"),
  }),
})

export const etnobotanicaSchema = z.object({
  etnobotanica: z.object({
    clasificacion: requiredText("La clasificación"),
    parteUtilizada: requiredText("La parte utilizada"),
    usoTradicional: requiredText("El uso tradicional"),
  }),
  perfilEtnobotanico: requiredText("El perfil etnobotánico"),
})

export const historiaEvolucionSchema = z.object({
  historiaEvolucion: z.object({
    origen: requiredText("El origen"),
    dispersion: requiredText("La dispersión"),
    evolucion: requiredText("La evolución"),
  }),
})

const comercioRowSchema = z.object({
  pais: requiredText("El país"),
  detalle: requiredText("El detalle"),
})

export const comercioSchema = z.object({
  comercio: z.object({
    exportacion: z.array(comercioRowSchema),
    importacion: z.array(comercioRowSchema),
  }),
})

export const compuestosQuimicosSchema = z.object({
  compuestosQuimicos: z.array(
    z.object({
      nombre: requiredText("El nombre del compuesto"),
      detalle: requiredText("El detalle del compuesto"),
    })
  ),
})

export const multimediaSchema = z.object({
  multimediaPrincipal: z.object({
    imagenUrl: z.string().min(1, "La URL de la imagen es obligatoria.").url("Debe ser una URL válida."),
    imagenPublicId: z.string().optional().or(z.literal("")),
    videoUrl: z.string().url("Debe ser una URL válida.").optional().or(z.literal("")),
    videoPublicId: z.string().optional().or(z.literal("")),
    proveedor: requiredText("El proveedor"),
  }),
})

export const contenidoSchema = z.object({
  contenido: requiredText("El contenido"),
})

export const plantSchema = informacionBasicaSchema
  .merge(taxonomiaSchema)
  .merge(etnobotanicaSchema)
  .merge(historiaEvolucionSchema)
  .merge(comercioSchema)
  .merge(compuestosQuimicosSchema)
  .merge(multimediaSchema)
  .merge(contenidoSchema)

export const PLANT_TABS = [
  { key: "informacionBasica", label: "Información Básica" },
  { key: "taxonomia", label: "Taxonomía" },
  { key: "etnobotanica", label: "Etnobotánica" },
  { key: "historiaEvolucion", label: "Historia y Evolución" },
  { key: "comercio", label: "Comercio" },
  { key: "compuestosQuimicos", label: "Compuestos Químicos" },
  { key: "multimedia", label: "Multimedia" },
  { key: "contenido", label: "Contenido" },
]

export const PLANT_TAB_FIELDS = {
  informacionBasica: ["nombreComun", "nombreCientifico", "nombresAlternativos", "estado"],
  taxonomia: [
    "taxonomia.reino",
    "taxonomia.division",
    "taxonomia.clase",
    "taxonomia.familia",
    "taxonomia.genero",
  ],
  etnobotanica: [
    "etnobotanica.clasificacion",
    "etnobotanica.parteUtilizada",
    "etnobotanica.usoTradicional",
    "perfilEtnobotanico",
  ],
  historiaEvolucion: [
    "historiaEvolucion.origen",
    "historiaEvolucion.dispersion",
    "historiaEvolucion.evolucion",
  ],
  comercio: ["comercio.exportacion", "comercio.importacion"],
  compuestosQuimicos: ["compuestosQuimicos"],
  multimedia: [
    "multimediaPrincipal.imagenUrl",
    "multimediaPrincipal.imagenPublicId",
    "multimediaPrincipal.videoUrl",
    "multimediaPrincipal.videoPublicId",
    "multimediaPrincipal.proveedor",
  ],
  contenido: ["contenido"],
}

export function tabHasError(errors, tabKey) {
  const paths = PLANT_TAB_FIELDS[tabKey] ?? []
  return paths.some((path) => {
    const segments = path.split(".")
    let node = errors
    for (const segment of segments) {
      if (!node) return false
      node = node[segment]
    }
    return Boolean(node)
  })
}
