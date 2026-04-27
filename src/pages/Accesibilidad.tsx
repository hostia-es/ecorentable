import { Link } from "react-router-dom";
import { CheckCircle, Mail, Phone, Eye, Keyboard, Volume2, Monitor } from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";

export default function Accesibilidad() {
  return (
    <main>
      <PageHero
        title="Declaración de Accesibilidad"
        subtitle="Ecología Rentable está comprometida con la accesibilidad web y trabaja para garantizar que todos los usuarios puedan acceder a su contenido y servicios."
        breadcrumbs={[{ label: "Accesibilidad" }]}
        badge="Compromiso digital"
      />

      {/* DECLARACIÓN */}
      <section className="py-14 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Declaración de conformidad</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Ecología Rentable S.L. se compromete a hacer accesible su sitio web conforme al Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público, y con carácter voluntario para el sector privado.
          </p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Este sitio web aplica parcialmente los criterios de conformidad de las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA.
          </p>
          <div className="card-eco p-5 mb-6">
            <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>Estado de conformidad</p>
            <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>Parcialmente conforme — algunas partes del contenido pueden no cumplir con todos los criterios de accesibilidad. Trabajamos continuamente para mejorar.</p>
          </div>
        </div>
      </section>

      {/* ESTÁNDARES */}
      <section className="py-12 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Estándares y pautas aplicados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Eye size={18} />, title: "Percibible", desc: "Texto alternativo en imágenes, subtítulos en vídeo, contraste de color suficiente (ratio ≥4.5:1)." },
              { icon: <Keyboard size={18} />, title: "Operable", desc: "Toda la funcionalidad es accesible mediante teclado. Tiempo suficiente para leer el contenido." },
              { icon: <Monitor size={18} />, title: "Comprensible", desc: "Lenguaje claro, etiquetas en formularios, mensajes de error descriptivos." },
              { icon: <Volume2 size={18} />, title: "Robusto", desc: "HTML semántico compatible con tecnologías de asistencia como lectores de pantalla." },
            ].map((item) => (
              <div key={item.title} className="card-eco p-5 flex gap-3">
                <div style={{ color: "hsl(var(--primary))", flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>{item.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIDAS IMPLEMENTADAS */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6" style={{ color: "hsl(var(--foreground))" }}>Medidas implementadas</h2>
          <ul className="space-y-3">
            {[
              "Estructura de encabezados jerárquica (H1–H4) en todas las páginas",
              "Texto alternativo descriptivo en imágenes de contenido",
              "Contraste de color conforme a WCAG 2.1 nivel AA en texto principal",
              "Formularios con etiquetas asociadas y mensajes de error descriptivos",
              "Navegación accesible mediante teclado (Tab, Enter, flechas)",
              "Idioma de la página declarado en el atributo lang (es-ES)",
              "Estructura semántica HTML5 con roles ARIA donde corresponde",
              "Enlace de salto al contenido principal disponible en todas las páginas",
              "Diseño responsive adaptado a dispositivos móviles y distintos tamaños de pantalla",
              "Sin contenido que parpadee más de 3 veces por segundo",
            ].map((m) => (
              <li key={m} className="flex items-start gap-2">
                <CheckCircle size={14} className="shrink-0 mt-0.5" style={{ color: "hsl(var(--primary))" }} />
                <span className="text-sm" style={{ color: "hsl(var(--foreground))" }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LIMITACIONES CONOCIDAS */}
      <section className="py-12 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Limitaciones conocidas</h2>
          <p className="text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>A pesar de nuestro compromiso, existen áreas en proceso de mejora:</p>
          <ul className="space-y-2">
            {[
              "Algunos documentos PDF descargables pueden no estar completamente accesibles",
              "Las tablas de especificaciones técnicas pueden presentar dificultades en lectores de pantalla antiguos",
              "Los vídeos de demostración de productos aún no disponen de audiodescripción",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <span style={{ color: "hsl(var(--primary))" }}>·</span>{l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACTO ACCESIBILIDAD */}
      <section className="py-12 section-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Contacto para accesibilidad</h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>Si encuentras alguna barrera de accesibilidad en este sitio, o necesitas acceder a información en un formato alternativo, contacta con nosotros:</p>
          <div className="card-eco p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
              <Mail size={14} style={{ color: "hsl(var(--primary))" }} />
              <span>accesibilidad@ecologiarentable.es</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: "hsl(var(--foreground))" }}>
              <Phone size={14} style={{ color: "hsl(var(--primary))" }} />
              <span>+34 605 928 626 (Lun–Vie 7:00–15:00)</span>
            </div>
            <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Respondemos en un plazo máximo de 5 días hábiles. Si la respuesta no es satisfactoria, puedes acudir al <a href="https://administracion.gob.es" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "hsl(var(--primary))" }}>Portal de la Administración del Estado</a>.</p>
          </div>
        </div>
      </section>

      {/* COMPROMISO */}
      <section className="py-12 section-alt">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Nuestro compromiso</h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Ecología Rentable revisa periódicamente el cumplimiento de los estándares de accesibilidad mediante auditorías internas y externas. Nuestro objetivo es alcanzar la conformidad total con WCAG 2.1 nivel AA antes de finales de 2025.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Esta declaración fue preparada el 1 de enero de 2025 y se revisa anualmente o cuando se realizan cambios significativos en el sitio web.
          </p>
        </div>
      </section>

      <CTABox title="¿Necesitas ayuda?" description="Contacta con nuestro equipo para cualquier consulta sobre accesibilidad o para solicitar contenido en formato alternativo." primaryLabel="Contactar" primaryHref="/contacto" secondaryLabel="Volver al inicio" secondaryHref="/" />
    </main>
  );
}
