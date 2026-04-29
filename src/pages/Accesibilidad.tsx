import { Link } from "react-router-dom";
import {
  CheckCircle,
  Mail,
  Phone,
  Eye,
  Keyboard,
  Volume2,
  Monitor,
  Map,
  Contrast,
  Type,
  MousePointer2,
  AlertTriangle,
  FileText,
  Smartphone,
  Languages,
  ShieldCheck,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";

export default function Accesibilidad() {
  return (
    <main>
      <PageHero
        title="Declaración de Accesibilidad"
        subtitle="Ecología Rentable está comprometida con la accesibilidad web para que todas las personas, con independencia de sus capacidades, puedan navegar, comprender e interactuar con nuestros contenidos y servicios."
        breadcrumbs={[{ label: "Accesibilidad" }]}
        badge="Compromiso digital · WCAG 2.1 AA"
      />

      {/* 1. DECLARACIÓN DE CONFORMIDAD */}
      <section className="py-14 section-light" aria-labelledby="seccion-declaracion">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            01 · Marco normativo
          </span>
          <h2 id="seccion-declaracion" className="text-2xl md:text-3xl font-bold mt-2 mb-5" style={{ color: "hsl(var(--foreground))" }}>
            Declaración de conformidad
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Ecología Rentable S.L. se compromete a hacer accesible su sitio web conforme al{" "}
            <strong>Real Decreto 1112/2018, de 7 de septiembre</strong>, sobre accesibilidad de los sitios web y
            aplicaciones para dispositivos móviles del sector público, aplicado con carácter voluntario al
            sector privado, y a la <strong>Directiva (UE) 2016/2102</strong>.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Este sitio web aplica los criterios de conformidad de las{" "}
            <strong>Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA</strong>, publicadas por el
            W3C, así como la norma europea armonizada <strong>EN 301 549 V3.2.1</strong>.
          </p>
          <div className="card-eco p-5 mb-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 mt-0.5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                  Estado de conformidad: parcialmente conforme
                </p>
                <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                  Algunas partes del contenido pueden no cumplir todavía con la totalidad de los requisitos de
                  accesibilidad. Trabajamos de forma continua para subsanarlas.
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            Última revisión y actualización de esta declaración: <strong>abril de 2026</strong>. Próxima revisión
            programada: octubre de 2026.
          </p>
        </div>
      </section>

      {/* 2. MAPA DE RECURSOS DE ACCESIBILIDAD */}
      <section className="py-14" aria-labelledby="seccion-recursos">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            02 · Mapa de recursos
          </span>
          <h2 id="seccion-recursos" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Recursos de accesibilidad implementados
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Resumen de las funcionalidades técnicas activas en todas las páginas del sitio.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Map,
                title: "Estructura semántica",
                desc: "Uso correcto de <main>, <nav>, <section>, <article>, <header> y <footer>. Jerarquía única de H1 por página y orden lógico de encabezados.",
              },
              {
                icon: Contrast,
                title: "Contraste de color",
                desc: "Ratios de contraste mínimo 4.5:1 para texto normal y 3:1 para texto grande. Compatibilidad con modo claro y modo oscuro del sistema.",
              },
              {
                icon: Keyboard,
                title: "Navegación por teclado",
                desc: "Todos los elementos interactivos accesibles con Tab, Shift+Tab, Enter y Espacio. Foco visible permanente y orden de tabulación coherente.",
              },
              {
                icon: Type,
                title: "Tipografía escalable",
                desc: "Tamaños base en rem. Soporta zoom del navegador hasta el 200 % sin pérdida de funcionalidad ni desbordamiento horizontal.",
              },
              {
                icon: Eye,
                title: "Textos alternativos",
                desc: "Atributo alt descriptivo en imágenes informativas y alt vacío en imágenes decorativas. Iconografía marcada con aria-hidden cuando es ornamental.",
              },
              {
                icon: MousePointer2,
                title: "Áreas táctiles amplias",
                desc: "Botones y enlaces con área mínima de 44×44 px en móvil para facilitar la interacción con dedos o dispositivos asistidos.",
              },
              {
                icon: Volume2,
                title: "Compatibilidad con lectores",
                desc: "Compatible con NVDA, JAWS, VoiceOver y TalkBack. Etiquetas ARIA en formularios, botones y regiones interactivas.",
              },
              {
                icon: Smartphone,
                title: "Diseño responsive",
                desc: "Adaptación fluida a móvil, tablet y escritorio. Orientación vertical y horizontal soportadas sin restricciones.",
              },
              {
                icon: Languages,
                title: "Idioma declarado",
                desc: "Atributo lang=\"es\" en el documento HTML. Cambios de idioma puntuales señalados con lang en línea cuando corresponde.",
              },
            ].map((r) => (
              <div key={r.title} className="card-eco p-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
                >
                  <r.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: "hsl(var(--foreground))" }}>
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CONTRASTE Y PRESENTACIÓN VISUAL */}
      <section className="py-14 section-light" aria-labelledby="seccion-contraste">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            03 · Contraste y visualización
          </span>
          <h2 id="seccion-contraste" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Contraste y presentación visual
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Aplicamos los criterios <strong>WCAG 1.4.3 (Contraste mínimo)</strong> y{" "}
            <strong>1.4.11 (Contraste no textual)</strong> para garantizar la legibilidad.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="card-eco p-6">
              <Contrast className="w-6 h-6 mb-3" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--foreground))" }}>
                Ratios garantizados
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Texto normal: ratio mínimo <strong>4.5:1</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Texto grande (≥18 pt o 14 pt negrita): ratio mínimo <strong>3:1</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Componentes de interfaz e iconos: <strong>3:1</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Indicador de foco visible con contraste <strong>≥3:1</strong></span>
                </li>
              </ul>
            </div>

            <div className="card-eco p-6">
              <Monitor className="w-6 h-6 mb-3" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--foreground))" }}>
                Personalización del usuario
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Zoom hasta <strong>200 %</strong> sin pérdida de contenido</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Respeto de <code>prefers-reduced-motion</code> para animaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Compatible con esquema de color del sistema operativo</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>Sin información transmitida solo por color</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NAVEGACIÓN POR TECLADO */}
      <section className="py-14" aria-labelledby="seccion-teclado">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            04 · Navegación por teclado
          </span>
          <h2 id="seccion-teclado" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Atajos y navegación por teclado
          </h2>
          <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            Todo el sitio puede operarse sin ratón. Cumplimos los criterios{" "}
            <strong>WCAG 2.1.1 (Teclado)</strong>, <strong>2.1.2 (Sin trampas)</strong> y{" "}
            <strong>2.4.7 (Foco visible)</strong>.
          </p>

          <div className="card-eco overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Tabla de atajos de teclado disponibles</caption>
              <thead style={{ backgroundColor: "hsl(var(--muted))" }}>
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                    Tecla / combinación
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tab", "Avanzar al siguiente elemento interactivo"],
                  ["Shift + Tab", "Retroceder al elemento interactivo anterior"],
                  ["Enter", "Activar enlaces y enviar formularios"],
                  ["Espacio", "Activar botones y casillas de verificación"],
                  ["Esc", "Cerrar menús, modales y diálogos abiertos"],
                  ["Flechas ↑ ↓", "Navegar dentro de menús desplegables y listas"],
                  ["Inicio / Fin", "Ir al primer o último elemento de una lista"],
                ].map(([k, a]) => (
                  <tr key={k} className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="px-4 py-3">
                      <kbd
                        className="inline-block px-2 py-1 rounded text-xs font-mono font-semibold"
                        style={{
                          backgroundColor: "hsl(var(--muted))",
                          color: "hsl(var(--foreground))",
                          border: "1px solid hsl(var(--border))",
                        }}
                      >
                        {k}
                      </kbd>
                    </td>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {a}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 card-eco p-5">
            <div className="flex items-start gap-3">
              <Keyboard className="w-5 h-5 mt-0.5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <strong style={{ color: "hsl(var(--foreground))" }}>Enlace «Saltar al contenido»:</strong>{" "}
                disponible al pulsar Tab desde el inicio de cualquier página, permite saltar la cabecera y la
                navegación principal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIMITACIONES CONOCIDAS Y CONTENIDO NO ACCESIBLE */}
      <section className="py-14 section-light" aria-labelledby="seccion-limitaciones">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            05 · Limitaciones conocidas
          </span>
          <h2 id="seccion-limitaciones" className="text-2xl md:text-3xl font-bold mt-2 mb-5" style={{ color: "hsl(var(--foreground))" }}>
            Contenido no accesible
          </h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            A pesar de nuestros esfuerzos, existen elementos en revisión que pueden no cumplir todavía con los
            estándares de accesibilidad:
          </p>

          <div className="space-y-3">
            {[
              {
                title: "Documentos PDF heredados",
                desc: "Algunos catálogos y fichas técnicas anteriores a 2025 pueden no estar etiquetados correctamente. Estamos sustituyéndolos progresivamente por versiones accesibles.",
              },
              {
                title: "Vídeos sin subtítulos",
                desc: "Determinados vídeos demostrativos antiguos no disponen de subtítulos ni transcripción. Los nuevos contenidos audiovisuales se publican siempre con subtítulos en español.",
              },
              {
                title: "Mapas interactivos de terceros",
                desc: "El mapa de centros utiliza una integración externa que puede presentar limitaciones de accesibilidad. Ofrecemos siempre una alternativa textual con la lista completa de centros.",
              },
              {
                title: "Formularios complejos",
                desc: "Algunos formularios de contacto avanzados están en proceso de mejora para reforzar las indicaciones de error y la asistencia contextual.",
              },
            ].map((l) => (
              <div key={l.title} className="card-eco p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    style={{ color: "hsl(var(--primary))" }}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                      {l.title}
                    </p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {l.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACTO Y RECLAMACIONES */}
      <section className="py-14" aria-labelledby="seccion-contacto">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            06 · Contacto y reclamaciones
          </span>
          <h2 id="seccion-contacto" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Comentarios, sugerencias y reclamaciones
          </h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            Si encuentra una barrera de accesibilidad, necesita información en un formato alternativo o desea
            presentar una queja, póngase en contacto con nosotros. Le responderemos en un plazo máximo de{" "}
            <strong>20 días hábiles</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-6">
            <a
              href="mailto:accesibilidad@ecologiarentable.com"
              className="card-eco p-5 hover:shadow-lg transition-shadow"
            >
              <Mail className="w-6 h-6 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                Correo electrónico
              </p>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                accesibilidad@ecologiarentable.com
              </p>
            </a>

            <a href="tel:+34900000000" className="card-eco p-5 hover:shadow-lg transition-shadow">
              <Phone className="w-6 h-6 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                Teléfono de atención
              </p>
              <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                +34 900 000 000 · L–V de 9:00 a 18:00
              </p>
            </a>
          </div>

          <div className="card-eco p-5 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>
                  Información que debe incluir su comunicación
                </p>
                <ul className="text-sm space-y-1 list-disc pl-4" style={{ color: "hsl(var(--muted-foreground))" }}>
                  <li>URL exacta de la página donde detectó la barrera</li>
                  <li>Descripción del problema encontrado</li>
                  <li>Navegador, sistema operativo y tecnología asistida utilizada</li>
                  <li>Datos de contacto para responderle</li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            Si tras dirigirse a Ecología Rentable su solicitud no ha sido atendida, puede presentar una
            reclamación ante el órgano competente conforme al artículo 13 del Real Decreto 1112/2018.
          </p>

          <div className="mt-10">
            <CTABox
              title="¿Necesita ayuda adicional?"
              description="Nuestro equipo está disponible para asistirle por el canal que prefiera."
              primaryLabel="Ir a contacto"
              primaryHref="/contacto"
              secondaryLabel="Ver servicios"
              secondaryHref="/servicios"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
