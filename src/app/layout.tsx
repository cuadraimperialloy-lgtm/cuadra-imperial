import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Pinyon_Script } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

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
  title: "Cuadra Imperial Loy | Venta de Caballos Frisones en México",
  description: "Venta directa e importación de caballos Frisones de pura raza KFPS en México. Ejemplares con 14 radiografías limpias y seguro internacional clavo a clavo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${cormorant.variable} ${pinyonScript.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#0B1528] text-white selection:bg-[#B8860B]/30 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-16 sm:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
