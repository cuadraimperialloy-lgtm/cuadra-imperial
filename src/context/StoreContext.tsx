"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Horse, INITIAL_HORSES } from "@/data/horses";
import { Product, INITIAL_PRODUCTS } from "@/data/products";

export type Role = "SUPER_ADMIN" | "STAFF" | "CUSTOMER";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  budget: string;
  buyerType: "Criador" | "Deportista" | "Inversionista" | "Aficionado / Particular";
  role: Role;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  budget: string;
  buyerType: string;
  horsesViewed: string[];
  notes?: string;
  source?: string;
  createdAt: string;
}

export type CartItemType = "HORSE" | "PRODUCT";

export interface CartItem {
  type: CartItemType;
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  variant?: string;
  sku?: string;
  horseKfps?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  city: string;
  status: "PENDIENTE" | "VERIFICANDO EQUINO" | "ENVIADO" | "ENTREGADO";
  hasHorse: boolean;
  equineDetails?: {
    dni: string;
    ranchDestination: string;
    equineExperience: string;
    vetReference: string;
  };
  paymentMethod: "Mercado Pago" | "Transferencia SPEI" | "PayPal" | "Tarjeta Débito/Crédito";
  createdAt: string;
}

interface StoreContextType {
  // Auth & Roles
  user: User | null;
  role: Role;
  isLoggedIn: boolean;
  login: (email: string, role?: Role) => void;
  loginWithGoogle: () => void;
  registerLead: (leadData: Omit<Lead, "id" | "createdAt" | "horsesViewed">) => void;
  logout: () => void;
  setRole: (role: Role) => void;

  // Leads
  leads: Lead[];
  addLead: (lead: Lead) => void;

  // Lead Wall Modal
  isLeadWallOpen: boolean;
  leadWallTargetHorse: Horse | null;
  leadWallReason: string;
  openLeadWall: (horse?: Horse | null, reason?: string) => void;
  closeLeadWall: () => void;

  // Unified Cart
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, variant?: string) => void;
  updateQuantity: (id: string, delta: number, variant?: string) => void;
  clearCart: () => void;
  hasHorseInCart: boolean;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (horseId: string) => void;
  isInWishlist: (horseId: string) => boolean;

  // Comparer
  comparisonList: string[];
  addToComparison: (horseId: string) => void;
  removeFromComparison: (horseId: string) => void;
  isComparing: (horseId: string) => boolean;

  // Horses CRUD & tracking
  horses: Horse[];
  trackHorseView: (horseId: string) => void;
  viewedHorsesSession: string[];
  updateHorse: (updatedHorse: Horse) => void;
  addHorse: (newHorse: Horse) => void;
  deleteHorse: (id: string) => void;

  // Products CRUD
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  addProduct: (newProduct: Product) => void;
  deleteProduct: (id: string) => void;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, "id" | "createdAt">) => Order;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // Proactive Chat Trigger
  proactiveChatTriggered: boolean;
  dismissProactiveChat: () => void;

  // Language Selector
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-01",
    name: "Don Guillermo Garza",
    phone: "+52 81 1234 5678",
    email: "ggarza@haciendasantaelena.mx",
    city: "Monterrey, N.L.",
    budget: "$1,500,000 - $2,500,000 MXN",
    buyerType: "Criador",
    horsesViewed: ["tjerk-van-de-zwarte", "willem-fan-e-simmer"],
    notes: "Interesado en semental con alta elevación de rodilla para su yeguada.",
    source: "Teaser Ficha Técnica",
    createdAt: "2026-09-28T14:30:00Z"
  },
  {
    id: "lead-02",
    name: "Lic. Roberto Morales",
    phone: "+52 33 9876 5432",
    email: "rmorales@inversionesgdl.com",
    city: "Guadalajara, JAL",
    budget: "$800,000 - $1,500,000 MXN",
    buyerType: "Deportista",
    horsesViewed: ["kasper-fan-e-bosksicht"],
    notes: "Busca caballo maestro para exhibición charra y alta escuela.",
    source: "Botón Me Interesa",
    createdAt: "2026-10-01T10:15:00Z"
  },
  {
    id: "lead-03",
    name: "Arq. Sofia Villalobos",
    phone: "+52 44 2345 6789",
    email: "sofia.villa@queretaro.mx",
    city: "Querétaro, QRO",
    budget: "Más de $2,500,000 MXN",
    buyerType: "Inversionista",
    horsesViewed: ["benthe-van-de-imperial"],
    notes: "Preguntó por yegua Kroon y opciones de gestación con semental importado.",
    source: "Pedigree Wall",
    createdAt: "2026-10-02T18:40:00Z"
  }
];

const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-2026-089",
    customerName: "Don Guillermo Garza",
    customerPhone: "+52 81 1234 5678",
    customerEmail: "ggarza@haciendasantaelena.mx",
    address: "Carretera Nacional Km 248, Hacienda Santa Elena",
    city: "Santiago, Nuevo León",
    status: "VERIFICANDO EQUINO",
    hasHorse: true,
    total: 1388500,
    paymentMethod: "Transferencia SPEI",
    items: [
      {
        type: "HORSE",
        id: "tjerk-van-de-zwarte",
        name: "Tjerk van de Zwarte",
        price: 1350000,
        image: "/images/tjerk.jpg",
        quantity: 1,
        horseKfps: "528004 2021 00894"
      },
      {
        type: "PRODUCT",
        id: "silla-gala-espanola",
        name: "Silla Española de Gala Imperial",
        price: 38500,
        image: "/images/portrait.jpg",
        quantity: 1,
        sku: "CIL-SIL-ESP-01"
      }
    ],
    equineDetails: {
      dni: "GARZ750412NL4",
      ranchDestination: "Hacienda Santa Elena, Caballerizas de Sementales",
      equineExperience: "Más de 20 años como criador y jinete de alta escuela",
      vetReference: "Dr. Fernando Leal (Médico Veterinario Zootecnista MVZ)"
    },
    createdAt: "2026-09-29T16:20:00Z"
  },
  {
    id: "ORD-2026-094",
    customerName: "Carolina V. Montes",
    customerPhone: "+52 55 4321 8765",
    customerEmail: "carolina.montes@gmail.com",
    address: "Rancho San Francisco, Lote 12",
    city: "Valle de Bravo, Edo. Méx.",
    status: "ENVIADO",
    hasHorse: false,
    total: 13400,
    paymentMethod: "Mercado Pago",
    items: [
      {
        type: "PRODUCT",
        id: "cabezada-barroca-oro",
        name: "Cabezada Barroca Friesian Gold",
        price: 9800,
        image: "/images/portrait.jpg",
        quantity: 1,
        sku: "CIL-ACC-CAB-01"
      },
      {
        type: "PRODUCT",
        id: "kit-cuidado-crines",
        name: "Kit Real de Cuidado y Lustre para Crines Negras",
        price: 3600,
        image: "/images/hero.jpg",
        quantity: 1,
        sku: "CIL-NUT-CRI-01"
      }
    ],
    createdAt: "2026-10-02T11:05:00Z"
  }
];

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<"es" | "en">("es");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("cil_lang");
      if (savedLang === "es" || savedLang === "en") {
        setLanguageState(savedLang);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: "es" | "en") => {
    setLanguageState(lang);
    try {
      localStorage.setItem("cil_lang", lang);
    } catch {}
  };
  const [user, setUser] = useState<User | null>(null);
  const [role, setRoleState] = useState<Role>("CUSTOMER");
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [horses, setHorses] = useState<Horse[]>(INITIAL_HORSES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [viewedHorsesSession, setViewedHorsesSession] = useState<string[]>([]);
  const [proactiveChatTriggered, setProactiveChatTriggered] = useState(false);

  const [isLeadWallOpen, setIsLeadWallOpen] = useState(false);
  const [leadWallTargetHorse, setLeadWallTargetHorse] = useState<Horse | null>(null);
  const [leadWallReason, setLeadWallReason] = useState<string>("Ver ficha técnica completa");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("cil_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setRoleState(parsed.role || "CUSTOMER");
      }
      const savedCart = localStorage.getItem("cil_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("cil_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedLeads = localStorage.getItem("cil_leads");
      if (savedLeads) setLeads(JSON.parse(savedLeads));

      const savedOrders = localStorage.getItem("cil_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cil_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("cil_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("cil_leads", JSON.stringify(leads));
    } catch {}
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem("cil_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const login = (email: string, assignedRole: Role = "CUSTOMER") => {
    const newUser: User = {
      id: "usr-" + Date.now(),
      name: email.split("@")[0].toUpperCase(),
      email,
      phone: "+52 33 2606 0218",
      city: "Guadalajara, JAL",
      budget: "$1,500,000 MXN",
      buyerType: "Deportista",
      role: assignedRole,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    setRoleState(assignedRole);
    try {
      localStorage.setItem("cil_user", JSON.stringify(newUser));
    } catch {}
    closeLeadWall();
  };

  const loginWithGoogle = () => {
    const googleUser: User = {
      id: "usr-google-" + Date.now(),
      name: "Comprador Verificado Google",
      email: "cliente.verificado@gmail.com",
      phone: "+52 55 1234 5678",
      city: "Ciudad de México",
      budget: "$1,500,000 - $2,500,000 MXN",
      buyerType: "Inversionista",
      role: "CUSTOMER",
      createdAt: new Date().toISOString()
    };
    setUser(googleUser);
    setRoleState("CUSTOMER");
    try {
      localStorage.setItem("cil_user", JSON.stringify(googleUser));
    } catch {}
    closeLeadWall();
  };

  const registerLead = (leadData: Omit<Lead, "id" | "createdAt" | "horsesViewed">) => {
    const newLead: Lead = {
      ...leadData,
      id: "lead-" + Date.now(),
      horsesViewed: leadWallTargetHorse ? [leadWallTargetHorse.id] : [...viewedHorsesSession],
      createdAt: new Date().toISOString()
    };
    setLeads((prev) => [newLead, ...prev]);

    const newUser: User = {
      id: "usr-" + newLead.id,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      city: newLead.city,
      budget: newLead.budget,
      buyerType: newLead.buyerType as User["buyerType"],
      role: "CUSTOMER",
      createdAt: newLead.createdAt
    };
    setUser(newUser);
    setRoleState("CUSTOMER");
    try {
      localStorage.setItem("cil_user", JSON.stringify(newUser));
    } catch {}
    closeLeadWall();
  };

  const logout = () => {
    setUser(null);
    setRoleState("CUSTOMER");
    try {
      localStorage.removeItem("cil_user");
    } catch {}
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (user) {
      const updated = { ...user, role: newRole };
      setUser(updated);
      try {
        localStorage.setItem("cil_user", JSON.stringify(updated));
      } catch {}
    }
  };

  const openLeadWall = (horse: Horse | null = null, reason: string = "Ver ficha técnica completa") => {
    setLeadWallTargetHorse(horse);
    setLeadWallReason(reason);
    setIsLeadWallOpen(true);
  };

  const closeLeadWall = () => {
    setIsLeadWallOpen(false);
    setLeadWallTargetHorse(null);
  };

  const trackHorseView = (horseId: string) => {
    setHorses((prev) =>
      prev.map((h) => (h.id === horseId ? { ...h, viewsCount: (h.viewsCount || 10) + 1 } : h))
    );

    setViewedHorsesSession((prev) => {
      const updated = prev.includes(horseId) ? prev : [...prev, horseId];
      if (!user && updated.length >= 2 && !proactiveChatTriggered) {
        setProactiveChatTriggered(true);
      }
      return updated;
    });

    if (user) {
      setLeads((prev) =>
        prev.map((l) => {
          if (l.email === user.email && !l.horsesViewed.includes(horseId)) {
            return { ...l, horsesViewed: [...l.horsesViewed, horseId] };
          }
          return l;
        })
      );
    }
  };

  const dismissProactiveChat = () => {
    setProactiveChatTriggered(false);
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && (item.type === "HORSE" || i.variant === item.variant)
      );
      if (existing) {
        if (item.type === "HORSE") return prev;
        return prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, variant?: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && (!variant || i.variant === variant))));
  };

  const updateQuantity = (id: string, delta: number, variant?: string) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id && (!variant || i.variant === variant)) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const hasHorseInCart = cart.some((i) => i.type === "HORSE");
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const toggleWishlist = (horseId: string) => {
    if (!user) {
      openLeadWall(horses.find((h) => h.id === horseId) || null, "Guardar ejemplar en tus Favoritos");
      return;
    }
    setWishlist((prev) =>
      prev.includes(horseId) ? prev.filter((id) => id !== horseId) : [...prev, horseId]
    );
  };

  const isInWishlist = (horseId: string) => wishlist.includes(horseId);

  const addToComparison = (horseId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(horseId)) return prev;
      if (prev.length >= 2) {
        return [prev[1], horseId];
      }
      return [...prev, horseId];
    });
  };

  const removeFromComparison = (horseId: string) => {
    setComparisonList((prev) => prev.filter((id) => id !== horseId));
  };

  const isComparing = (horseId: string) => comparisonList.includes(horseId);

  const updateHorse = (updatedHorse: Horse) => {
    setHorses((prev) => prev.map((h) => (h.id === updatedHorse.id ? updatedHorse : h)));
  };

  const addHorse = (newHorse: Horse) => {
    setHorses((prev) => [newHorse, ...prev]);
  };

  const deleteHorse = (id: string) => {
    setHorses((prev) => prev.filter((h) => h.id !== id));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const createOrder = (orderData: Omit<Order, "id" | "createdAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900),
      createdAt: new Date().toISOString()
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const addLead = (lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);
  };

  return (
    <StoreContext.Provider
      value={{
        user,
        role,
        isLoggedIn: !!user,
        login,
        loginWithGoogle,
        registerLead,
        logout,
        setRole,
        leads,
        addLead,
        isLeadWallOpen,
        leadWallTargetHorse,
        leadWallReason,
        openLeadWall,
        closeLeadWall,
        cart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        hasHorseInCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        comparisonList,
        addToComparison,
        removeFromComparison,
        isComparing,
        horses,
        trackHorseView,
        viewedHorsesSession,
        updateHorse,
        addHorse,
        deleteHorse,
        products,
        updateProduct,
        addProduct,
        deleteProduct,
        orders,
        createOrder,
        updateOrderStatus,
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        proactiveChatTriggered,
        dismissProactiveChat,
        language,
        setLanguage
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
