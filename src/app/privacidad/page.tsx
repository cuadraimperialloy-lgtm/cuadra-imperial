import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacidadPage() {
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
              <Shield className="w-5 h-5 text-brand-negro" />
            </div>
            <div>
              <span className="font-script text-brand-oro text-2xl block">Cuadra Imperial Loy</span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-negro">Aviso de Privacidad</h1>
            </div>
          </div>

          <p className="font-sans text-xs text-brand-gris mb-8">
            Última actualización: Septiembre 2026 · Cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).
          </p>

          <div className="space-y-6 font-sans text-brand-negro/80 text-sm leading-relaxed">
            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">1. Identidad y Domicilio del Responsable</h2>
              <p>
                <strong>Cuadra Imperial Loy S.A. de C.V.</strong>, con domicilio de operaciones en la Zona Metropolitana de Guadalajara, Jalisco, México, es responsable del tratamiento legítimo, controlado e informado de sus datos personales.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">2. Datos Personales Recabados</h2>
              <p>
                Para los fines de cotización, reserva de ejemplares equinos, expedición de certificados genealógicos y tramitación zoosanitaria ante el SENASICA, recabamos los siguientes datos:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Nombre completo o razón social del comprador.</li>
                <li>Teléfono celular / WhatsApp y correo electrónico.</li>
                <li>Domicilio o rancho de destino para la logística de entrega.</li>
                <li>Información fiscal para facturación y transferencias SPEI.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">3. Finalidades del Tratamiento</h2>
              <p>
                Sus datos son utilizados exclusivamente para:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Procesar la reserva y compraventa de ejemplares frisones registrados ante la KFPS.</li>
                <li>Tramitar permisos de importación, guías de traslado zoosanitario y pólizas de seguro de transporte.</li>
                <li>Agendar visitas guiadas a nuestras caballerizas e instalaciones.</li>
                <li>Brindar seguimiento post-venta, zootécnico y nutricional.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-lg font-bold text-brand-negro mb-2">4. Derechos ARCO</h2>
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos, para qué los utilizamos y las condiciones de su uso (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación), que la eliminemos de nuestros registros (Cancelación), oponerse al uso de sus datos para fines específicos (Oposición). Para ejercer cualquiera de los derechos ARCO, envíe un correo a <strong>privacidad@cuadraimperial.com</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
