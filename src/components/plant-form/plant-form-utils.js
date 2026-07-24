export function emptyPlantFormValues() {
  return {
    nombreComun: "",
    nombreCientifico: "",
    nombresAlternativos: [],
    estado: "BORRADOR",
    taxonomia: { reino: "", division: "", clase: "", familia: "", genero: "" },
    etnobotanica: { clasificacion: "", parteUtilizada: "", usoTradicional: "" },
    perfilEtnobotanico: "",
    historiaEvolucion: { origen: "", dispersion: "", evolucion: "" },
    comercio: { exportacion: [], importacion: [] },
    compuestosQuimicos: [],
    multimediaPrincipal: {
      imagenUrl: "",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "",
    },
    contenido: "",
  }
}

export function toFormValues(plant) {
  const base = emptyPlantFormValues()
  return {
    ...base,
    nombreComun: plant.nombreComun ?? base.nombreComun,
    nombreCientifico: plant.nombreCientifico ?? base.nombreCientifico,
    nombresAlternativos: (plant.nombresAlternativos ?? []).map((value) => ({ value })),
    estado: plant.estado ?? base.estado,
    taxonomia: { ...base.taxonomia, ...plant.taxonomia },
    etnobotanica: { ...base.etnobotanica, ...plant.etnobotanica },
    perfilEtnobotanico: plant.perfilEtnobotanico ?? base.perfilEtnobotanico,
    historiaEvolucion: { ...base.historiaEvolucion, ...plant.historiaEvolucion },
    comercio: {
      exportacion: plant.comercio?.exportacion ?? [],
      importacion: plant.comercio?.importacion ?? [],
    },
    compuestosQuimicos: plant.compuestosQuimicos ?? [],
    multimediaPrincipal: { ...base.multimediaPrincipal, ...plant.multimediaPrincipal },
    contenido: plant.contenido ?? base.contenido,
  }
}

export function fromFormValues(values) {
  return {
    ...values,
    nombresAlternativos: (values.nombresAlternativos ?? []).map((row) => row.value),
  }
}

export function getFieldError(errors, path) {
  const segments = path.split(".")
  let node = errors
  for (const segment of segments) {
    if (!node) return undefined
    node = node[segment]
  }
  return node
}
