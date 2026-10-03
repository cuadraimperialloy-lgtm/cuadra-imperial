import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeadWallModal from "@/components/auth/LeadWallModal";
import CartDrawer from "@/components/cart/CartDrawer";
import ChatConcierge from "@/components/chat/ChatConcierge";
import HorseComparerModal from "@/components/horses/HorseComparerModal";
import GlobalSearchModal from "@/components/search/GlobalSearchModal";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-poppins'
});
const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-figtree'
});
const pinyonScript = Pinyon_Script({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-pinyon'
});

export const metadata: Metadata = {
  title: "Cuadra Imperial Loy | Venta de Caballos Frisones de Pura Raza en México",
  description: "Marketplace de alta gama para la venta de caballos Frisones oficiales KFPS, importación directa desde Países Bajos y guarnicionería de lujo.",
  icons: {
    icon: "/images/logo-cuadra-imperial.jpg",
    apple: "/images/logo-cuadra-imperial.jpg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${cormorant.variable} ${pinyonScript.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-white selection:bg-[#D4AF37]/30 selection:text-white">
        <StoreProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />

          {/* Global Functional Overlays */}
          <LeadWallModal />
          <CartDrawer />
          <ChatConcierge />
          <HorseComparerModal />
          <GlobalSearchModal />
        </StoreProvider>
      </body>
    </html>
  );
}
