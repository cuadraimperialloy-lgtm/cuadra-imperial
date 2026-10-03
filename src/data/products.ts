export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  category: 'Sillas de Montar' | 'Cabezadas y Frenos' | 'Cuidados y Nutrición' | 'Equipamiento de Cuadra' | 'Ropa Ecuestre';
  images: string[];
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  badge?: string;
  variants?: ProductVariant[];
  details: string[];
}

export const STORE_CATEGORIES = [
  'Todos',
  'Sillas de Montar',
  'Cabezadas y Frenos',
  'Cuidados y Nutrición',
  'Equipamiento de Cuadra',
  'Ropa Ecuestre'
] as const;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "silla-gala-espanola",
    slug: "silla-gala-espanola",
    title: "Silla Española de Gala Imperial",
    subtitle: "Cuero curtido vegetal con herrajes dorados grabados a mano",
    description: "Silla de montar tradicional española fabricada exclusivamente para Cuadra Imperial Loy por maestros guarnicioneros. Armadura flexible de fibra de vidrio con puente anatómico ancho adaptado a la morfología ancha del caballo frisón. Asiento profundo acolchado en borrego natural que proporciona máxima seguridad y comodidad en alta escuela y paseos de gala.",
    price: 38500,
    compareAtPrice: 44000,
    sku: "CIL-SIL-ESP-01",
    stock: 4,
    category: "Sillas de Montar",
    images: [
      "/images/portrait.jpg",
      "/images/hero.jpg",
      "/images/tjerk.jpg"
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 16,
    badge: "Más Vendida",
    variants: [
      { name: "Talla Asiento", options: ["17.0 pulgadas", "17.5 pulgadas", "18.0 pulgadas"] },
      { name: "Color Cuero", options: ["Negro Azabache Real", "Habano Chocolate"] }
    ],
    details: [
      "Armazón anatómico con apertura especial para cruz ancha de frisón",
      "Piel de vacuno premium de 4.5 mm de espesor",
      "Incluye estribos barrocos dorados y cincha acolchada",
      "Garantía artesanal de 5 años"
    ]
  },
  {
    id: "silla-doma-divoza",
    slug: "silla-doma-divoza",
    title: "Silla de Doma Clásica Royal Grand Prix",
    subtitle: "Diseño ergonómico con taco anatómico para contacto ultra-cercano",
    description: "Diseñada para la competición de alto nivel y doma de exhibición. Canal espinal extra ancho que libera las vértebras dorsales del equino. Piel suave antideslizante con memoria de adaptación anatómica.",
    price: 46900,
    compareAtPrice: 52000,
    sku: "CIL-SIL-DOM-02",
    stock: 3,
    category: "Sillas de Montar",
    images: [
      "/images/willem.jpg",
      "/images/hero.jpg"
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 11,
    badge: "Competición",
    variants: [
      { name: "Talla", options: ["17.5\"", "18\""] },
      { name: "Cuero", options: ["Piel Francesa Grano Fino"] }
    ],
    details: [
      "Bastes de lana sintética indeformable de alta recuperación",
      "Sistema de cinchado en V de balance dinámico",
      "Diseño testado en jinetes de Gran Premio KFPS"
    ]
  },
  {
    id: "silla-charra-piteada",
    slug: "silla-charra-piteada",
    title: "Montura Charra Imperial Piteada Fina",
    subtitle: "Fuste forrado en baqueta de primera piteado con hilo de plata y oro",
    description: "Homenaje a la tradición de la charrería mexicana adaptada al porte monumental del frisón. Elaborada en Colotlán, Jalisco, con piteado floral en hilo fino y campanas forradas. Una joya para lienzo charro y cabalgatas patrias.",
    price: 58000,
    compareAtPrice: 65000,
    sku: "CIL-SIL-CHR-03",
    stock: 2,
    category: "Sillas de Montar",
    images: [
      "/images/benthe.jpg",
      "/images/hero.jpg"
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 8,
    badge: "Exclusiva",
    variants: [
      { name: "Fuste", options: ["Fuste Guadalupano 15.5\"", "Fuste 16\""] }
    ],
    details: [
      "Bordado a mano con hilo de pita y remates metálicos dorados",
      "Incluye carona de lana tejida, pecho pretal y cabezada charra",
      "Herrajes en latón pulido con monograma Cuadra Imperial"
    ]
  },
  {
    id: "cabezada-barroca-oro",
    slug: "cabezada-barroca-oro",
    title: "Cabezada Barroca Friesian Gold",
    subtitle: "Piel holandesa con hebillas barrocas con baño de oro 24K",
    description: "Especialmente dimensionada para las proporciones de la cabeza del caballo Frisón. Frontalera acolchada en forma de V decorada con medallón imperial y riendas de cuero trenzado fino de gran agarre.",
    price: 9800,
    compareAtPrice: 11500,
    sku: "CIL-ACC-CAB-01",
    stock: 8,
    category: "Cabezadas y Frenos",
    images: [
      "/images/portrait.jpg",
      "/images/tjerk.jpg"
    ],
    featured: true,
    rating: 4.9,
    reviewsCount: 24,
    badge: "Recomendado",
    variants: [
      { name: "Medida", options: ["Full Frisón / Sangre Caliente"] },
      { name: "Herrajes", options: ["Oro Imperial 24K", "Plata Envejecida"] }
    ],
    details: [
      "Cuero europeo curtido con aceites orgánicos de larga duración",
      "Frontalera con cristales ámbar y dorado imperial",
      "Incluye riendas de piel lisa de 16mm"
    ]
  },
  {
    id: "bocado-pavonado-oro",
    slug: "bocado-pavonado-oro",
    title: "Freno Bocado Pavonado con Pierna Barroca",
    subtitle: "Acero pavonado negro con relieves dorados y embocadura suave",
    description: "Freno de bocado para caballos entrenados en alta escuela y doma barroca. Embocadura curva que alivia la presión en la lengua y favorece la salivación y relajación de la mandíbula del equino.",
    price: 5400,
    compareAtPrice: 6200,
    sku: "CIL-ACC-FRE-02",
    stock: 12,
    category: "Cabezadas y Frenos",
    images: [
      "/images/willem.jpg",
      "/images/fedde.jpg"
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 19,
    details: [
      "Pierna curva de 14 cm de apalancamiento moderado",
      "Cadenilla suave con forro de cuero protector",
      "Tratamiento antioxidante de alta durabilidad"
    ]
  },
  {
    id: "kit-cuidado-crines",
    slug: "kit-cuidado-crines",
    title: "Kit Real de Cuidado y Lustre para Crines Negras",
    subtitle: "Shampoo con pigmento orgánico negro + Bálsamo sedoso desenredante",
    description: "Fórmula holandesa desarrollada específicamente para preservar el negro azabache de las crines y cola del caballo frisón, protegiéndolas del óxido solar y aportando un brillo cristalino sin dejar residuos grasos.",
    price: 3600,
    compareAtPrice: 4200,
    sku: "CIL-NUT-CRI-01",
    stock: 25,
    category: "Cuidados y Nutrición",
    images: [
      "/images/hero.jpg",
      "/images/tjerk.jpg"
    ],
    featured: true,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Bestseller",
    details: [
      "Shampoo Black Coat Protector 1000ml",
      "Spray desenredante de keratina y aceite de argán 500ml",
      "Cepillo de cerdas de jabalí para crines largas de exposición",
      "100% biodegradable y seguro para piel sensible"
    ]
  },
  {
    id: "suplemento-biotina",
    slug: "suplemento-biotina",
    title: "Suplemento Equino Biotina Ultra-Cascos & Masa Muscular",
    subtitle: "Polvo micronizado de 5 kg con zinc quelado y metionina",
    description: "El suplemento diario indispensable para caballos en adiestramiento intenso y crecimiento. Estimula la regeneración del casco y potencia el desarrollo de masa muscular en dorso y grupa.",
    price: 4900,
    sku: "CIL-NUT-BIO-02",
    stock: 15,
    category: "Cuidados y Nutrición",
    images: [
      "/images/benthe.jpg",
      "/images/fedde.jpg"
    ],
    featured: false,
    rating: 4.9,
    reviewsCount: 28,
    details: [
      "Rinde para 90 dosis diarias",
      "Concentración de 50mg de Biotina activa pura por servicio",
      "Certificado SAGARPA / SENASICA para libre consumo en México"
    ]
  },
  {
    id: "manta-termica-imperial",
    slug: "manta-termica-imperial",
    title: "Manta Térmica Imperial Impermeable 1200D",
    subtitle: "Tejido balístico ripstop en azul noche con vivos dorados bordados",
    description: "Protección climática completa para viajes y establos fríos. Aislamiento térmico de 300g transpirable que evita la sudoración manteniendo la temperatura corporal óptima del caballo.",
    price: 7200,
    compareAtPrice: 8500,
    sku: "CIL-CUA-MAN-01",
    stock: 7,
    category: "Equipamiento de Cuadra",
    images: [
      "/images/hero.jpg",
      "/images/willem.jpg"
    ],
    featured: false,
    rating: 4.8,
    reviewsCount: 15,
    variants: [
      { name: "Talla", options: ["145 cm (Mediana)", "155 cm (Grande Frisón)", "165 cm (Extra Grande)"] }
    ],
    details: [
      "Cierres de pecho dobles en acero inoxidable con mosquetón rápido",
      "Cubrecola acolchado y correas de patas elásticas removibles",
      "Bordado de escudo Cuadra Imperial Loy en flanco izquierdo"
    ]
  }
];

export const PRODUCTS = INITIAL_PRODUCTS;
