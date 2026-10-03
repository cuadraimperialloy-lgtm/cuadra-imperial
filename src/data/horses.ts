export interface PedigreeNode {
  sire: string;
  dam: string;
  sireSire: string;
  sireDam: string;
  damSire: string;
  damDam: string;
}

export interface VeterinaryInfo {
  senasicaCertified: boolean;
  xRaysClearCount: number;
  piroplasmosisFree: boolean;
  geneticDefectsFree: boolean;
  healthPdfUrl: string;
}

export interface Horse {
  id: string;
  slug: string;
  name: string;
  subname: string;
  kfpsNumber: string;
  age: string;
  birthYear: number;
  height: string;
  gender: 'Semental' | 'Yegua' | 'Castrado' | 'Potro';
  level: 'Alta Escuela' | 'Doma Clásica' | 'Enganche' | 'Potro' | 'Paseo & Gala';
  lineage: string;
  status: 'DISPONIBLE' | 'RESERVADO' | 'VENDIDO' | 'EN IMPORTACIÓN';
  // Price requirements from prompt:
  price: number | null; // numeric nullable
  priceVisibility: 'VISIBLE' | 'CONSULTAR'; // text default 'VISIBLE'
  priceUsd?: number | null;
  tagline: string;
  description: string;
  character: string;
  studbookClass: string;
  healthStatus: string;
  location: string;
  viewsCount: number;
  discipline: string;
  pedigree: PedigreeNode;
  achievements: string[];
  veterinary: VeterinaryInfo;
  images: string[];
  videoUrl?: string;
  featured?: boolean;
  recommendedProductIds: string[]; // Many-to-Many cross-sell products
}

export const STATUS_COLORS: Record<Horse['status'], { bg: string; text: string; label: string; border: string }> = {
  'DISPONIBLE': { bg: '#105232', text: '#34D399', label: 'Disponible', border: 'border-emerald-500/30' },
  'RESERVADO': { bg: '#5B370B', text: '#FBBF24', label: 'Reservado', border: 'border-amber-500/30' },
  'VENDIDO': { bg: '#501720', text: '#F87171', label: 'Vendido', border: 'border-rose-500/30' },
  'EN IMPORTACIÓN': { bg: '#1C1C21', text: '#60A5FA', label: 'En Tránsito', border: 'border-blue-500/30' },
};

export const INITIAL_HORSES: Horse[] = [
  {
    id: "tjerk-van-de-zwarte",
    slug: "tjerk-van-de-zwarte",
    name: "Tjerk van de Zwarte",
    subname: "Semental Aprobado · Linaje Real",
    kfpsNumber: "528004 2021 00894",
    age: "5 años",
    birthYear: 2021,
    height: "1.70m",
    gender: "Semental",
    level: "Alta Escuela",
    discipline: "Alta Escuela y Exhibición Charra",
    lineage: "Alwin 469 Sport x Tsjalke 397",
    status: "DISPONIBLE",
    // Caballo con precio visible: Se puede comprar directo o agregar al carrito
    price: 1350000,
    priceVisibility: "VISIBLE",
    priceUsd: 75000,
    tagline: "Porte Imperial, Trote Elevado y Nobleza Absoluta",
    description: "Tjerk encarna la máxima expresión del caballo Frisón moderno: impresionante suspensión en el trote, crines tupidas de más de 1.10 metros y una morfología barroca impecable. Entrenado con métodos de doma clásica y alta escuela española, posee un temperamento extraordinariamente dócil y cooperativo, haciéndolo ideal tanto para alta competición como para cabalgata de gala y charrería de élite.",
    character: "Temperamento noble, valiente y de trato sumamente cariñoso. Gran receptividad al jinete y total serenidad ante multitudes y música.",
    studbookClass: "KFPS Stamboek Ster · Primer Premio (1e Premie)",
    healthStatus: "14 Proyecciones Rx Limpias (Categoría 1) · Libre de Enanismo e Hidrocefalia · Aprobado SENASICA",
    location: "Guadalajara, Jalisco (Hacienda Cuadra Imperial)",
    viewsCount: 18,
    pedigree: {
      sire: "Alwin 469 Sport-Preferent",
      dam: "Wypkje fan 'e Zwarte (Ster)",
      sireSire: "Fabe 348 Sport",
      sireDam: "Wobke van de Vrijburg (Model)",
      damSire: "Tsjalke 397 Sport",
      damDam: "Geertje f. Zwarte (Ster-Pref)"
    },
    achievements: [
      "Campeón Juvenil de Movimientos en Leeuwarden, Países Bajos (2023)",
      "Predicado KFPS Ster con Primer Premio por unanimidad del jurado",
      "Calificación morfológica de 8.5 en cabeza, cuello y línea superior"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/tjerk.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    recommendedProductIds: ["silla-gala-espanola", "cabezada-barroca-oro", "kit-cuidado-crines"]
  },
  {
    id: "willem-fan-e-simmer",
    slug: "willem-fan-e-simmer",
    name: "Willem fan 'e Simmer",
    subname: "Trote Elevado y Suspensión Extraordinaria",
    kfpsNumber: "528004 2022 01244",
    age: "4 años",
    birthYear: 2022,
    height: "1.69m",
    gender: "Semental",
    level: "Doma Clásica",
    discipline: "Doma Clásica y Espectáculo",
    lineage: "Maurits 437 x Norbert 444 Sport",
    status: "DISPONIBLE",
    // Caballo con precio visible
    price: 1150000,
    priceVisibility: "VISIBLE",
    priceUsd: 64000,
    tagline: "Genética Pura de Campeones del Libro de Oro",
    description: "Hijo directo de leyendas de la KFPS. Willem destaca por su deslumbrante elevación de rodilla y elasticidad en pista de arena. Es un prospecto estelar para exhibiciones ecuestres, doma clásica o alta escuela. Capa negro azabache profunda sin una sola mancha blanca, con aplomos perfectos y gran cadencia.",
    character: "Energético, expresivo, de movimientos amplios y gran presencia escénica. Sumamente agradecido al trabajo diario.",
    studbookClass: "KFPS Stamboek Ster",
    healthStatus: "Certificado Veterinario Internacional · Radiografías Grado A · Test Genético Negativo a Defectos",
    location: "Guadalajara, Jalisco",
    viewsCount: 14,
    pedigree: {
      sire: "Maurits 437 Sport",
      dam: "Grietje fan 'e Simmer (Kroon)",
      sireSire: "Ulke 338 Sport",
      sireDam: "Hinke fan 'e Simmer (Ster)",
      damSire: "Norbert 444 Sport-Pref",
      damDam: "Tryntsje fan 'e Simmer (Model)"
    },
    achievements: [
      "Subcampeón de Sementales Jóvenes KFPS 2024",
      "Puntaje de 82 puntos en prueba IBOP de funcionalidad bajo la silla"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/willem.jpg", "/images/portrait.jpg", "/images/hero.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    recommendedProductIds: ["silla-doma-divoza", "cabezada-barroca-oro", "bocado-pavonado-oro"]
  },
  {
    id: "benthe-van-de-imperial",
    slug: "benthe-van-de-imperial",
    name: "Benthe van de Imperial",
    subname: "Yegua de Élite · Predicado Kroon",
    kfpsNumber: "528004 2020 00412",
    age: "6 años",
    birthYear: 2020,
    height: "1.67m",
    gender: "Yegua",
    level: "Doma Clásica",
    discipline: "Cría de Élite y Paseo",
    lineage: "Jehannes 484 x Doaitsen 420",
    status: "DISPONIBLE",
    // Caballo con precio a consultar (null o priceVisibility CONSULTAR)
    price: null,
    priceVisibility: "CONSULTAR",
    priceUsd: null,
    tagline: "Matriz de Oro para Fundación de Yeguada en México",
    description: "Una de las yeguas más galardonadas en las inspecciones de Frisia antes de su importación a México. Benthe ostenta el prestigioso predicado Kroon otorgado solo al 2% de las yeguas frisonas en el mundo. Con paso rítmico y aplomos perfectos, representa una oportunidad irrepetible para criaderos que buscan fundar líneas de sangre de élite en territorio nacional.",
    character: "Dulzura absoluta, maternal, serena en paseos y muy atenta a la voz humana.",
    studbookClass: "KFPS Kroon Predicate · Campeona de Raza",
    healthStatus: "Evaluación Reproductiva Positiva · Rx Completas Limpias · Pasaporte Equino Europeo",
    location: "Querétaro (Instalaciones de Descanso)",
    viewsCount: 22,
    pedigree: {
      sire: "Jehannes 484 Sport",
      dam: "Anke van 't Land (Model-Sport)",
      sireSire: "Dries 421 Sport",
      sireDam: "Zandra van de Sprong (Ster)",
      damSire: "Doaitsen 420 Sport",
      damDam: "Wietske fan 't Land (Ster)"
    },
    achievements: [
      "Predicado Kroon KFPS otorgado en inspección oficial en Holanda",
      "Campeona Suprema de Yeguas Jóvenes 2022"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/benthe.jpg", "/images/portrait.jpg", "/images/hero.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    recommendedProductIds: ["silla-gala-espanola", "kit-cuidado-crines", "manta-termica-imperial"]
  },
  {
    id: "fedde-kfps",
    slug: "fedde-kfps",
    name: "Fedde de Imperial",
    subname: "Joven Promesa · Futuro Gran Semental",
    kfpsNumber: "528004 2023 03110",
    age: "3 años",
    birthYear: 2023,
    height: "1.66m",
    gender: "Potro",
    level: "Potro",
    discipline: "Futuro Semental y Doma",
    lineage: "Tymen 503 x Pier 448",
    status: "EN IMPORTACIÓN",
    price: 820000,
    priceVisibility: "VISIBLE",
    priceUsd: 46000,
    tagline: "Proyección Insuperable y Gran Envergadura",
    description: "Potro en etapa de desarrollo con excelente pronóstico de crecimiento (alcanzará 1.71m en la cruz). Iniciado en cabestreo y trabajo a la cuerda pie a tierra. Con crines de gran densidad genética y una grupa poderosa, Fedde está listo para iniciar su doma bajo las manos de su futuro propietario en México.",
    character: "Curioso, noble, sin vicios de cuadra, con un temperamento muy estable y receptivo al aprendizaje.",
    studbookClass: "KFPS Veulenboek con Primer Premio (1e Premie)",
    healthStatus: "Placas de Crecimiento Verificadas · Vacunación Internacional al Día · En tránsito vía KLM Cargo",
    location: "En Tránsito KLM Cargo Amsterdam -> CDMX",
    viewsCount: 11,
    pedigree: {
      sire: "Tymen 503 Sport",
      dam: "Lobke fan 'e Hoogeweg (Ster)",
      sireSire: "Tsjalle 454 Sport-Pref",
      sireDam: "Hylke fan 'e Hoogeweg",
      damSire: "Pier 448 Sport",
      damDam: "Setske fan 'e Hoogeweg (Ster)"
    },
    achievements: [
      "Primer Premio de Potros en Frisia Oriental 2023"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/fedde.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    recommendedProductIds: ["cabezada-barroca-oro", "kit-cuidado-crines", "suplemento-biotina"]
  },
  {
    id: "kasper-fan-e-bosksicht",
    slug: "kasper-fan-e-bosksicht",
    name: "Kasper fan 'e Bosksicht",
    subname: "Maestro de Doma Clásica y Alta Escuela",
    kfpsNumber: "528004 2019 00198",
    age: "7 años",
    birthYear: 2019,
    height: "1.72m",
    gender: "Castrado",
    level: "Alta Escuela",
    discipline: "Alta Escuela, Pasaje, Piaffe y Charrería",
    lineage: "Thorben 466 x Jasper 366",
    status: "RESERVADO",
    // Precio a consultar
    price: null,
    priceVisibility: "CONSULTAR",
    priceUsd: 85000,
    tagline: "Perfección en Cada Tranco y Nobleza Imperturbable",
    description: "Un verdadero 'caballo maestro' capaz de ejecutar pasaje, piaffe, cambios de pie y reverencia con la máxima finura. Montado por amazonas y jinetes de todos los niveles gracias a su temple a prueba de bombas en lienzos charros, desfiles y recintos feriales con música y multitudes.",
    character: "Seguridad absoluta garantizada. No se espanta, extraordinario compañero familiar y de paseo.",
    studbookClass: "KFPS Sport Predicate (Doma San Jorge)",
    healthStatus: "Chequeo Clínico Veterinario Vigente · Placas y Articulaciones Impecables",
    location: "Guadalajara, Jalisco",
    viewsCount: 29,
    pedigree: {
      sire: "Thorben 466 Sport-Elite",
      dam: "Femke fan 'e Bosksicht (Ster-Pref)",
      sireSire: "Reinder 452 Sport",
      sireDam: "Lutske fan 'e Bosksicht (Ster)",
      damSire: "Jasper 366 Sport-Pref",
      damDam: "Tetske fan 'e Bosksicht (Model)"
    },
    achievements: [
      "Predicado Sport KFPS en Doma Clásica Nivel San Jorge",
      "Primer lugar en concurso morfológico de sementales en Leeuwarden"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/kasper.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    recommendedProductIds: ["silla-gala-espanola", "silla-charra-piteada", "cabezada-barroca-oro"]
  },
  {
    id: "sjoerd-fan-holland",
    slug: "sjoerd-fan-holland",
    name: "Sjoerd van Holland",
    subname: "Enganche Real y Paseo de Gran Gala",
    kfpsNumber: "528004 2018 00552",
    age: "8 años",
    birthYear: 2018,
    height: "1.71m",
    gender: "Castrado",
    level: "Enganche",
    discipline: "Enganche a Calesa y Paseo",
    lineage: "Epke 474 x Tsjalke 397",
    status: "VENDIDO",
    price: null,
    priceVisibility: "CONSULTAR",
    priceUsd: 68000,
    tagline: "Tradición y Belleza Entregada a Hacienda en Jalisco",
    description: "Ejemplar entregado a su nuevo hogar en una prestigiosa hacienda de Los Altos de Jalisco. Especialista en enganche a calesa y carruaje de gala, así como paseo charro con montura tradicional. Sjoerd es muestra viva de la calidad zootécnica que Cuadra Imperial Loy importa a nuestro país.",
    character: "Caballo señorial, imponente en arnés y de gran fiabilidad.",
    studbookClass: "KFPS Stamboek Ster",
    healthStatus: "Entregado con expediente médico completo y cuarentena SENASICA concluida con éxito.",
    location: "Los Altos de Jalisco (Vendido)",
    viewsCount: 35,
    pedigree: {
      sire: "Epke 474 Sport",
      dam: "Baukje fan Holland (Ster)",
      sireSire: "Beart 411 Sport-Pref",
      sireDam: "Klaske fan Holland (Ster)",
      damSire: "Tsjalke 397 Sport",
      damDam: "Afke fan Holland (Ster-Pref)"
    },
    achievements: [
      "Campeón de Enganche en Carruajes Tradicionales de Holanda"
    ],
    veterinary: {
      senasicaCertified: true,
      xRaysClearCount: 14,
      piroplasmosisFree: true,
      geneticDefectsFree: true,
      healthPdfUrl: "#"
    },
    images: ["/images/tjerk.jpg", "/images/willem.jpg", "/images/portrait.jpg"],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    recommendedProductIds: ["silla-charra-piteada", "kit-cuidado-crines"]
  }
];

export const HORSES = INITIAL_HORSES;
