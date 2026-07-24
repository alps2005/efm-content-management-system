// Datos de ejemplo con la misma estructura que src/docs/aji.md
export const plantsSeed = [
  {
    _id: "11111111-1111-4111-8111-111111111111",
    nombreComun: "Ají",
    nombreCientifico: "Capsicum annuum",
    nombresAlternativos: ["Chile", "Pimiento picante"],
    taxonomia: {
      reino: "Plantae",
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      familia: "Solanaceae",
      genero: "Capsicum",
    },
    etnobotanica: {
      clasificacion: "Alimenticia - Medicinal",
      parteUtilizada: "Fruto",
      usoTradicional: "Analgésico, antiinflamatorio y estimulante circulatorio",
    },
    perfilEtnobotanico:
      "Dentro de la categoría alimenticia-medicinal, el ají destaca por el aprovechamiento de sus frutos frescos o secos. Actualmente, sus extractos son utilizados en la elaboración de cremas analgésicas y productos farmacéuticos destinados al tratamiento del dolor neuropático.",
    historiaEvolucion: {
      origen:
        "Es originario de América Central y Sudamérica. Diversas investigaciones arqueológicas sitúan los primeros procesos de domesticación en regiones de México y Centroamérica hace aproximadamente 6.000 años.",
      dispersion:
        "Tras la llegada de los europeos, el ají fue rápidamente incorporado a las rutas comerciales internacionales, difundiéndose hacia África, India, China y el sudeste asiático.",
      evolucion:
        "Pertenece a la familia Solanaceae, la misma del tomate y la papa. Los procesos de selección artificial dieron origen a una enorme diversidad de variedades.",
    },
    comercio: {
      exportacion: [
        { pais: "China", detalle: "Lidera la producción mundial de ají y pimientos." },
        { pais: "México", detalle: "Uno de los principales exportadores hacia Estados Unidos." },
      ],
      importacion: [
        { pais: "Estados Unidos", detalle: "Uno de los principales importadores mundiales." },
        { pais: "Alemania", detalle: "Junto con Reino Unido y Francia, importante mercado europeo." },
      ],
    },
    compuestosQuimicos: [
      { nombre: "Capsaicina", detalle: "Principal compuesto bioactivo responsable de la sensación picante y de la acción analgésica." },
      { nombre: "Carotenoides", detalle: "Capsantina y capsorrubina responsables de la coloración roja y de la actividad antioxidante." },
    ],
    multimediaPrincipal: {
      imagenUrl: "https://res.cloudinary.com/hi6t0jpv/image/upload/v1783453725/Aj%C3%AD_wcecco.webp",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "PICSUM",
    },
    estado: "ACTIVO",
    contenido:
      "El ají (Capsicum annuum) constituye uno de los cultivos hortícolas más importantes del planeta y uno de los recursos etnobotánicos más utilizados en la alimentación humana. Su importancia trasciende el ámbito gastronómico gracias a la presencia de capsaicinoides.",
    createdAt: "2026-01-10T10:00:00.000Z",
    updatedAt: "2026-01-10T10:00:00.000Z",
  },
  {
    _id: "22222222-2222-4222-8222-222222222222",
    nombreComun: "Matico",
    nombreCientifico: "Piper aduncum",
    nombresAlternativos: ["Hierba soldado", "Higuillo"],
    taxonomia: {
      reino: "Plantae",
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      familia: "Piperaceae",
      genero: "Piper",
    },
    etnobotanica: {
      clasificacion: "Medicinal",
      parteUtilizada: "Hojas",
      usoTradicional: "Cicatrizante, antiinflamatorio y antiséptico en heridas cutáneas",
    },
    perfilEtnobotanico:
      "El matico es ampliamente utilizado en la medicina tradicional andina y amazónica para el cuidado de heridas, aplicándose las hojas maceradas directamente sobre la piel o en infusión.",
    historiaEvolucion: {
      origen: "Nativo de las regiones tropicales de América del Sur, especialmente de la cuenca amazónica y los Andes.",
      dispersion: "Se ha extendido de forma natural por Centroamérica y el Caribe, favorecido por su rápida propagación como especie pionera.",
      evolucion: "Pertenece a la familia Piperaceae, cercana a la pimienta negra, compartiendo rutas metabólicas de producción de compuestos aromáticos.",
    },
    comercio: {
      exportacion: [
        { pais: "Perú", detalle: "Exporta extractos estandarizados para la industria fitofarmacéutica." },
      ],
      importacion: [
        { pais: "Estados Unidos", detalle: "Importa extractos para suplementos naturales." },
      ],
    },
    compuestosQuimicos: [
      { nombre: "Dilapiol", detalle: "Compuesto con actividad antimicrobiana e insecticida." },
      { nombre: "Taninos", detalle: "Responsables de la acción astringente y cicatrizante." },
    ],
    multimediaPrincipal: {
      imagenUrl: "https://picsum.photos/seed/matico/800/600",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "PICSUM",
    },
    estado: "ACTIVO",
    contenido:
      "El matico (Piper aduncum) es un arbusto de gran valor etnobotánico en la Amazonía y los Andes, reconocido tradicionalmente por sus propiedades cicatrizantes y antisépticas aplicadas sobre heridas y afecciones de la piel.",
    createdAt: "2026-01-12T09:30:00.000Z",
    updatedAt: "2026-01-12T09:30:00.000Z",
  },
  {
    _id: "33333333-3333-4333-8333-333333333333",
    nombreComun: "Sábila",
    nombreCientifico: "Aloe vera",
    nombresAlternativos: ["Aloe", "Zábila"],
    taxonomia: {
      reino: "Plantae",
      division: "Magnoliophyta",
      clase: "Liliopsida",
      familia: "Asphodelaceae",
      genero: "Aloe",
    },
    etnobotanica: {
      clasificacion: "Alimenticia - Medicinal - Cosmética",
      parteUtilizada: "Gel de las hojas",
      usoTradicional: "Cicatrizante, hidratante y digestivo",
    },
    perfilEtnobotanico:
      "El gel extraído de sus hojas se utiliza tradicionalmente para tratar quemaduras leves, irritaciones cutáneas y como coadyuvante digestivo, además de ser un ingrediente habitual en la industria cosmética.",
    historiaEvolucion: {
      origen: "Originaria de la Península Arábiga y el norte de África, adaptada a climas áridos y semiáridos.",
      dispersion: "Introducida por comerciantes árabes en Asia y posteriormente por europeos en América, donde se naturalizó ampliamente.",
      evolucion: "Sus hojas suculentas evolucionaron como reserva de agua y compuestos defensivos frente a la herbivoría en ambientes desérticos.",
    },
    comercio: {
      exportacion: [
        { pais: "México", detalle: "Uno de los mayores productores y exportadores mundiales de gel de aloe." },
      ],
      importacion: [
        { pais: "Estados Unidos", detalle: "Principal importador de derivados cosméticos y alimenticios de aloe." },
      ],
    },
    compuestosQuimicos: [
      { nombre: "Acemanano", detalle: "Polisacárido con propiedades inmunomoduladoras y cicatrizantes." },
      { nombre: "Aloína", detalle: "Compuesto con efecto laxante presente en la corteza de la hoja." },
    ],
    multimediaPrincipal: {
      imagenUrl: "https://picsum.photos/seed/sabila/800/600",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "PICSUM",
    },
    estado: "BORRADOR",
    contenido:
      "La sábila (Aloe vera) es una de las plantas medicinales más reconocidas a nivel mundial, valorada tanto en la medicina tradicional como en la industria cosmética moderna por las propiedades regenerativas de su gel.",
    createdAt: "2026-01-15T14:00:00.000Z",
    updatedAt: "2026-02-01T11:20:00.000Z",
  },
  {
    _id: "44444444-4444-4444-8444-444444444444",
    nombreComun: "Eucalipto",
    nombreCientifico: "Eucalyptus globulus",
    nombresAlternativos: [],
    taxonomia: {
      reino: "Plantae",
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      familia: "Myrtaceae",
      genero: "Eucalyptus",
    },
    etnobotanica: {
      clasificacion: "Medicinal",
      parteUtilizada: "Hojas",
      usoTradicional: "Expectorante y descongestionante respiratorio",
    },
    perfilEtnobotanico:
      "Las hojas de eucalipto se emplean tradicionalmente en infusiones y vahos para aliviar la congestión respiratoria, la tos y los síntomas de gripe, gracias a su alto contenido en aceites esenciales.",
    historiaEvolucion: {
      origen: "Originario de Australia y Tasmania, donde forma extensos bosques nativos.",
      dispersion: "Introducido en el siglo XIX en Europa, África y América como especie forestal de rápido crecimiento y posteriormente aprovechado medicinalmente.",
      evolucion: "Sus hojas desarrollaron glándulas productoras de aceites esenciales como mecanismo de defensa química frente a herbívoros e insectos.",
    },
    comercio: {
      exportacion: [
        { pais: "Portugal", detalle: "Importante productor y exportador de aceite esencial de eucalipto." },
      ],
      importacion: [
        { pais: "Francia", detalle: "Importa aceites esenciales para la industria farmacéutica y cosmética." },
      ],
    },
    compuestosQuimicos: [
      { nombre: "Eucaliptol (1,8-cineol)", detalle: "Principal componente del aceite esencial, con acción expectorante y antiséptica." },
    ],
    multimediaPrincipal: {
      imagenUrl: "https://picsum.photos/seed/eucalipto/800/600",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "PICSUM",
    },
    estado: "ACTIVO",
    contenido:
      "El eucalipto (Eucalyptus globulus) es uno de los remedios respiratorios tradicionales más difundidos en el mundo, utilizado en infusiones, vahos y preparados farmacéuticos para el alivio de afecciones de las vías respiratorias.",
    createdAt: "2026-01-20T08:45:00.000Z",
    updatedAt: "2026-01-20T08:45:00.000Z",
  },
  {
    _id: "55555555-5555-4555-8555-555555555555",
    nombreComun: "Manzanilla",
    nombreCientifico: "Matricaria chamomilla",
    nombresAlternativos: ["Camomila"],
    taxonomia: {
      reino: "Plantae",
      division: "Magnoliophyta",
      clase: "Magnoliopsida",
      familia: "Asteraceae",
      genero: "Matricaria",
    },
    etnobotanica: {
      clasificacion: "Alimenticia - Medicinal",
      parteUtilizada: "Flores",
      usoTradicional: "Digestivo, sedante suave y antiinflamatorio",
    },
    perfilEtnobotanico:
      "La infusión de flores de manzanilla es uno de los remedios caseros más extendidos para trastornos digestivos leves, ansiedad e insomnio, además de emplearse en compresas para irritaciones oculares y cutáneas.",
    historiaEvolucion: {
      origen: "Originaria de Europa y el occidente de Asia, distribuida en zonas templadas.",
      dispersion: "Cultivada y naturalizada en prácticamente todos los continentes gracias a su fácil adaptación y amplio uso doméstico.",
      evolucion: "Sus flores concentran aceites esenciales y flavonoides como parte de su estrategia reproductiva y de defensa frente a patógenos.",
    },
    comercio: {
      exportacion: [
        { pais: "Egipto", detalle: "Uno de los mayores exportadores mundiales de flor seca de manzanilla." },
      ],
      importacion: [
        { pais: "Alemania", detalle: "Gran importador para la industria de infusiones y fitofármacos." },
      ],
    },
    compuestosQuimicos: [
      { nombre: "Apigenina", detalle: "Flavonoide asociado al efecto sedante suave." },
      { nombre: "Bisabolol", detalle: "Componente del aceite esencial con acción antiinflamatoria." },
    ],
    multimediaPrincipal: {
      imagenUrl: "https://picsum.photos/seed/manzanilla/800/600",
      imagenPublicId: "",
      videoUrl: "",
      videoPublicId: "",
      proveedor: "PICSUM",
    },
    estado: "INACTIVO",
    contenido:
      "La manzanilla (Matricaria chamomilla) es una de las plantas medicinales de uso más universal, presente en la mayoría de los hogares como infusión digestiva y calmante, con un largo historial de uso documentado desde la antigüedad.",
    createdAt: "2026-01-25T16:10:00.000Z",
    updatedAt: "2026-02-05T09:00:00.000Z",
  },
]
