import Link from "next/link";
import { ArrowLeft, Scale } from "lucide-react";

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-brand-negro/60 hover:text-brand-cuero transition-colors mb-8 font-sans text-xs font-semibold tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>

        <div className="bg-white p-8 md:p-14 rounded-[2rem] border border-brand-cuero/15 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold-metallic flex items-center justify-center">
              <Scale className="w-5 h-5 text-brand-negro" />
            </div>
            <div>
              <span className="font-script text-brand-oro text-2xl block">Cuadra Imperial Loy</span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-negro">Términos y Condiciones</h1>
            </div>
          </div>

          <p className="font-sans text-xs text-brand-gris mb-8">
            Condiciones Generales de Reserva, Compraventa e Importación de Ejemplares Equinos Frisones (KFPS).
          </p>

          <div className="space-y-6 font-sans text-brand-negro/80 text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">1. Reservas y Bloqueo Comercial</h2>
              <p>
                El bloqueo de un ejemplar del catálogo por un periodo de 48 horas naturales se formaliza mediante el abono del 20% del valor total acordado. Dicho anticipo congela el precio en moneda nacional frente a fluctuaciones cambiarias del Euro / Dólar y se descuenta íntegramente del finiquito de compraventa.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">2. Certificación Zootécnica y Salud</h2>
              <p>
                Cada caballo frisón se entrega con su expediente genealógico oficial de la <strong>KFPS (Koninklijke Vereniging &quot;Het Friesch Paarden-Stamboek&quot;)</strong> de Leeuwarden, Holanda, chip subcutáneo verificado con lector internacional, pasaporte de la Unión Europea y el dictamen veterinario de exportación con 14 radiografías avaladas por clínicas autorizadas.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">3. Cobertura de Seguro &quot;Clavo a Clavo&quot;</h2>
              <p>
                Durante el flete terrestre en Europa, el vuelo transatlántico en vuelos de carga especializada y el periodo de cuarentena zoosanitaria de SENASICA en México, el ejemplar cuenta con una póliza de seguro de vida y salud integral. La custodia final se transfiere al comprador una vez realizada la entrega y firma de conformidad en sus instalaciones.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">4. Jurisdicción y Ley Aplicable</h2>
              <p>
                Para cualquier controversia derivada del presente contrato de compraventa zootécnica, las partes se someten expresamente a la jurisdicción de los tribunales competentes de la ciudad de Guadalajara, Jalisco, México.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
