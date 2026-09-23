export interface Horse {
  id: string;
  name: string;
  subname: string;
  kfpsNumber: string;
  age: string;
  birthYear: number;
  height: string;
  level: 'Alta Escuela' | 'Doma Básica' | 'Enganche' | 'Potro';
  lineage: string;
  sire: string;
  dam: string;
  status: 'DISPONIBLE' | 'RESERVADO' | 'VENDIDO' | 'EN IMPORTACIÓN';
  price: string;
  priceUsd: number;
  tagline: string;
  description: string;
  character: string;
  studbookClass: string; // e.g., "KFPS Stamboek Ster", "KFPS Kroon", etc.
  healthStatus: string;
  images: string[];
  featured?: boolean;
}

export const STATUS_COLORS: Record<Horse['status'], { bg: string; text: string; label: string }> = {
  'DISPONIBLE': { bg: '#3F7D58', text: '#FFFFFF', label: 'Disponible' },
  'RESERVADO': { bg: '#96621A', text: '#FFFFFF', label: 'Reservado' },
  'VENDIDO': { bg: '#9E2A3A', text: '#FFFFFF', label: 'Vendido' },
  'EN IMPORTACIÓN': { bg: '#213F72', text: '#FFFFFF', label: 'En Importación' },
};

export const HORSES: Horse[] = [
  {
    id: "tjerk-van-de-zwarte",
    name: "Tjerk van de Zwarte",
    subname: "Semental Aprobado · Linaje Real",
    kfpsNumber: "528004 2021 00894",
    age: "5 años",
    birthYear: 2021,
    height: "1.70m",
    level: "Alta Escuela",
    lineage: "Alwin 469 Sport x Tsjalke 397",
    sire: "Alwin 469 Sport-Preferent",
    dam: "Wypkje fan 'e Zwarte (Ster)",
    status: "DISPONIBLE",
    price: "$1,350,000 MXN",
    priceUsd: 75000,
    tagline: "Porte Imperial y Nobleza",
    description: "Tjerk encarna la máxima expresión del caballo Frisón moderno: impresionante suspensión en el trote, crines tupidas de más de un metro de longitud y una morfología barroca impecable. Entrenado con métodos de doma clásica y alta escuela, posee un temperamento extraordinariamente dócil y cooperativo, haciéndolo ideal tanto para alta competición como para cabalgata de gala y charrería.",
    character: "Temperamento noble, valiente y de trato sumamente cariñoso. Gran receptividad al jinete.",
    studbookClass: "KFPS Stamboek Ster · Primer Premio",
    healthStatus: "14 Proyecciones Rx Limpias (Categoría 1) · Libre de Enanismo e Hidrocefalia · Aprobado SENASICA",
    images: ["/images/tjerk.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    featured: true
  },
  {
    id: "willem-fan-e-simmer",
    name: "Willem fan 'e Simmer",
    subname: "Trote Elevado y Suspensión",
    kfpsNumber: "528004 2022 01244",
    age: "4 años",
    birthYear: 2022,
    height: "1.69m",
    level: "Alta Escuela",
    lineage: "Maurits 437 x Norbert 444 Sport",
    sire: "Maurits 437 Sport",
    dam: "Grietje fan 'e Simmer (Kroon)",
    status: "DISPONIBLE",
    price: "$1,150,000 MXN",
    priceUsd: 64000,
    tagline: "Genética de Campeones",
    description: "Hijo directo de campeones mundiales de la KFPS en Leeuwarden. Willem destaca por su deslumbrante elevación de rodilla y elasticidad en pista de arena. Es un prospecto estelar para exhibiciones ecuestres, doma española o alta escuela charra. Capa negro azabache profunda sin una sola mancha blanca.",
    character: "Energético, expresivo, de movimientos amplios y gran presencia escénica.",
    studbookClass: "KFPS Stamboek Ster",
    healthStatus: "Certificado Veterinario Internacional · Radiografías Grado A · Test Genético Completo",
    images: ["/images/willem.jpg", "/images/portrait.jpg", "/images/hero.jpg"],
    featured: true
  },
  {
    id: "benthe-van-de-imperial",
    name: "Benthe van de Imperial",
    subname: "Yegua de Élite · Predicado Kroon",
    kfpsNumber: "528004 2020 00412",
    age: "6 años",
    birthYear: 2020,
    height: "1.67m",
    level: "Doma Básica",
    lineage: "Jehannes 484 x Doaitsen 420",
    sire: "Jehannes 484 Sport",
    dam: "Anke van 't Land (Model-Sport)",
    status: "DISPONIBLE",
    price: "$980,000 MXN",
    priceUsd: 55000,
    tagline: "Matriz de Oro para Cría",
    description: "Una de las yeguas más galardonadas en las inspecciones de Frisia antes de su importación a México. Benthe ostenta el prestigioso predicado Kroon otorgado solo al 2% de las yeguas frisonas en el mundo. Con paso rítmico y aplomos perfectos, representa una oportunidad irrepetible para criaderos que buscan fundar líneas de sangre de élite en territorio nacional.",
    character: "Dulzura absoluta, maternal, serena en paseos y muy atenta a la voz humana.",
    studbookClass: "KFPS Kroon Predicate · Campeona de Raza",
    healthStatus: "Evaluación Reproductiva Positiva · Rx Completas Limpias · Pasaporte Equino Europeo",
    images: ["/images/benthe.jpg", "/images/portrait.jpg", "/images/hero.jpg"],
    featured: true
  },
  {
    id: "fedde-kfps",
    name: "Fedde de Imperial",
    subname: "Joven Promesa · Futuro Semental",
    kfpsNumber: "528004 2023 03110",
    age: "3 años",
    birthYear: 2023,
    height: "1.66m",
    level: "Potro",
    lineage: "Tymen 503 x Pier 448",
    sire: "Tymen 503 Sport",
    dam: "Lobke fan 'e Hoogeweg (Ster)",
    status: "EN IMPORTACIÓN",
    price: "$820,000 MXN",
    priceUsd: 46000,
    tagline: "Proyección Insuperable",
    description: "Potro en etapa de desarrollo con excelente pronóstico de crecimiento (alcanzará 1.71m en la cruz). Iniciado en cabestreo y trabajo a la cuerda pie a tierra. Con crines de gran densidad genética y una grupa poderosa, Fedde está listo para iniciar su doma bajo las manos de su futuro propietario en México.",
    character: "Curioso, noble, sin vicios de cuadra, con un temperamento muy estable y receptivo al aprendizaje.",
    studbookClass: "KFPS Veulenboek con Primer Premio (1e Premie)",
    healthStatus: "Placas de Crecimiento Verificadas · Vacunación Internacional al Día · En tránsito vía KLM Cargo",
    images: ["/images/fedde.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    featured: false
  },
  {
    id: "kasper-fan-e-bosksicht",
    name: "Kasper fan 'e Bosksicht",
    subname: "Maestro de Doma Clásica y Alta Escuela",
    kfpsNumber: "528004 2019 00198",
    age: "7 años",
    birthYear: 2019,
    height: "1.72m",
    level: "Alta Escuela",
    lineage: "Thorben 466 x Jasper 366",
    sire: "Thorben 466 Sport-Elite",
    dam: "Femke fan 'e Bosksicht (Ster-Pref)",
    status: "RESERVADO",
    price: "Consultar Precio",
    priceUsd: 85000,
    tagline: "Perfección en Cada Tranco",
    description: "Un verdadero 'caballo maestro' capaz de ejecutar pasaje, piaffe, cambios de pie y reverencia con la máxima finura. Montado por amazonas y jinetes de todos los niveles gracias a su temple a prueba de bombas en lienzos charros, desfiles y recintos feriales con música y multitudes.",
    character: "Seguridad absoluta garantizada. No se espanta, extraordinario compañero familiar y de paseo.",
    studbookClass: "KFPS Sport Predicate (Doma San Jorge)",
    healthStatus: "Chequeo Clínico Veterinario Vigente · Placas y Articulaciones Impecables",
    images: ["/images/kasper.jpg", "/images/hero.jpg", "/images/portrait.jpg"],
    featured: false
  },
  {
    id: "sjoerd-fan-holland",
    name: "Sjoerd van Holland",
    subname: "Enganche Real y Paseo de Gala",
    kfpsNumber: "528004 2018 00552",
    age: "8 años",
    birthYear: 2018,
    height: "1.71m",
    level: "Enganche",
    lineage: "Epke 474 x Tsjalke 397",
    sire: "Epke 474 Sport",
    dam: "Baukje fan Holland (Ster)",
    status: "VENDIDO",
    price: "Vendido a Jalisco",
    priceUsd: 68000,
    tagline: "Tradición y Belleza",
    description: "Ejemplar entregado a su nuevo hogar en una prestigiosa hacienda de Los Altos de Jalisco. Especialista en enganche a calesa y carruaje de gala, así como paseo charro con montura tradicional. Sjoerd es muestra viva de la calidad zootécnica que Cuadra Imperial Loy importa a nuestro país.",
    character: "Caballo señorial, imponente en arnés y de gran fiabilidad.",
    studbookClass: "KFPS Stamboek Ster",
    healthStatus: "Entregado con expediente médico completo y cuarentena SENASICA concluida con éxito.",
    images: ["/images/tjerk.jpg", "/images/willem.jpg", "/images/portrait.jpg"],
    featured: false
  }
];
