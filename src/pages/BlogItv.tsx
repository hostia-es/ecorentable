import { Link } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  Gauge,
  Wrench,
  ShieldCheck,
  ClipboardList,
  ArrowRight,
  HelpCircle,
  Calendar,
  FileText,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";

export default function BlogItv() {
  return (
    <main>
      <PageHero
        title="ITV y emisiones: guía completa para superar la inspección"
        subtitle="Todo lo que necesita saber sobre la Inspección Técnica de Vehículos en España, los nuevos límites de opacidad y cómo la descarbonización ayuda a aprobar a la primera."
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "ITV" },
        ]}
        badge="Guía pilar · ITV 2026"
      />

      {/* 1. QUÉ ES LA ITV Y QUIÉN DEBE PASARLA */}
      <section className="py-14 section-light" aria-labelledby="seccion-que-es">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            01 · Marco general
          </span>
          <h2 id="seccion-que-es" className="text-2xl md:text-3xl font-bold mt-2 mb-5" style={{ color: "hsl(var(--foreground))" }}>
            ¿Qué es la ITV y cuándo debe pasarse?
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            La <strong>Inspección Técnica de Vehículos (ITV)</strong> es el control obligatorio que verifica el
            estado mecánico, la seguridad y las emisiones contaminantes de cada vehículo en circulación. Está
            regulada por el <strong>Real Decreto 920/2017</strong> y supervisada por el Ministerio de Industria.
          </p>

          <div className="card-eco overflow-hidden mt-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Periodicidad ITV en España</caption>
              <thead style={{ backgroundColor: "hsl(var(--muted))" }}>
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                    Tipo de vehículo
                  </th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                    Periodicidad
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Turismos hasta 4 años", "Exento"],
                  ["Turismos de 4 a 10 años", "Cada 2 años"],
                  ["Turismos de más de 10 años", "Anual"],
                  ["Furgonetas hasta 3.500 kg", "Cada 2 años (>2 años)"],
                  ["Vehículos industriales >3.500 kg", "Anual / semestral"],
                  ["Motocicletas y ciclomotores", "Cada 2 años desde los 4 años"],
                ].map(([t, p]) => (
                  <tr key={t} className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--foreground))" }}>{t}</td>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--muted-foreground))" }}>{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 2. EMISIONES Y LÍMITES DE OPACIDAD */}
      <section className="py-14" aria-labelledby="seccion-emisiones">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            02 · Emisiones
          </span>
          <h2 id="seccion-emisiones" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Límites de emisiones y opacidad en la ITV
          </h2>
          <p className="text-sm mb-8 max-w-2xl" style={{ color: "hsl(var(--muted-foreground))" }}>
            Desde 2023 la ITV aplica el <strong>Manual de Procedimiento de Inspección v7.6</strong>, con
            tolerancias notablemente más estrictas en motores diésel.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="card-eco p-6">
              <Gauge className="w-6 h-6 mb-3" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--foreground))" }}>
                Motores diésel — opacidad
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <li>Pre-Euro 4: <strong>3,00 m⁻¹</strong></li>
                <li>Euro 4: <strong>1,50 m⁻¹</strong></li>
                <li>Euro 5 y 6: <strong>0,70 m⁻¹</strong> (con DPF)</li>
                <li>Si el valor en placa es inferior, prevalece el de placa</li>
              </ul>
            </div>

            <div className="card-eco p-6">
              <Gauge className="w-6 h-6 mb-3" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-semibold mb-3" style={{ color: "hsl(var(--foreground))" }}>
                Motores gasolina — gases
              </h3>
              <ul className="space-y-2 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
                <li>CO ralentí: <strong>≤0,5 %</strong></li>
                <li>CO ralentí acelerado: <strong>≤0,3 %</strong></li>
                <li>Lambda: <strong>1,00 ± 0,03</strong></li>
                <li>Vehículos pre-1986: <strong>CO ≤4,5 %</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAUSAS HABITUALES DE RECHAZO */}
      <section className="py-14 section-light" aria-labelledby="seccion-rechazo">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            03 · Causas de rechazo
          </span>
          <h2 id="seccion-rechazo" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Las 6 causas más frecuentes de no apto por emisiones
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { t: "DPF saturado", d: "El filtro de partículas obstruido eleva la opacidad por encima del límite legal." },
              { t: "Válvula EGR sucia", d: "Recirculación deficiente que provoca picos de NOx y humo negro en aceleración." },
              { t: "Inyectores con depósitos", d: "Mala atomización del combustible y combustión incompleta." },
              { t: "Sensor lambda envejecido", d: "Lecturas erróneas que descompensan la mezcla en motores gasolina." },
              { t: "Catalizador degradado", d: "Pérdida de capacidad de conversión de CO y HC." },
              { t: "Sonda MAF contaminada", d: "Cálculo erróneo del caudal de aire y exceso de combustible." },
            ].map((c) => (
              <div key={c.t} className="card-eco p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>{c.t}</p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{c.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DESCARBONIZACIÓN ANTES DE LA ITV */}
      <section className="py-14" aria-labelledby="seccion-descarb">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            04 · Solución preventiva
          </span>
          <h2 id="seccion-descarb" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Descarbonización antes de la ITV
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Una descarbonización por hidrógeno realizada entre <strong>5 y 10 días antes</strong> de la inspección
            reduce la opacidad y los gases hasta un <strong>60-70 %</strong>, eliminando los depósitos de carbono
            de admisión, válvula EGR, cámara de combustión y filtro de partículas.
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            Es una alternativa segura, no invasiva y económica frente al desmontaje del DPF o la sustitución de
            componentes.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <Link
              to="/servicios/limpieza-filtros"
              className="card-eco p-5 hover:shadow-md transition-shadow group"
            >
              <Wrench className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Limpieza de filtros DPF/FAP
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Servicio profesional sin desmontaje · 100 €
              </p>
            </Link>
            <Link
              to="/servicios/particulares"
              className="card-eco p-5 hover:shadow-md transition-shadow group"
            >
              <ShieldCheck className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Descarbonización para particulares
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Tratamiento completo del motor · 90 €
              </p>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Link to="/soluciones" className="card-eco p-5 hover:shadow-md transition-shadow group">
              <ClipboardList className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Soluciones técnicas
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Equipos profesionales para talleres
              </p>
            </Link>
            <Link to="/servicios" className="card-eco p-5 hover:shadow-md transition-shadow group">
              <FileText className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Catálogo de servicios
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Todos los tratamientos disponibles
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CHECKLIST PRE-ITV */}
      <section className="py-14 section-light" aria-labelledby="seccion-checklist">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            05 · Preparación
          </span>
          <h2 id="seccion-checklist" className="text-2xl md:text-3xl font-bold mt-2 mb-5" style={{ color: "hsl(var(--foreground))" }}>
            Checklist antes de pasar la ITV
          </h2>

          <div className="card-eco p-6">
            <ul className="space-y-3 text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
              {[
                "Realizar un trayecto de 30-40 km a temperatura óptima antes de la cita",
                "Comprobar que ningún testigo de avería está encendido (motor, ABS, airbag)",
                "Revisar nivel de aceite, refrigerante y AdBlue si corresponde",
                "Verificar luces, intermitentes y estado de neumáticos (≥1,6 mm)",
                "Llevar permiso de circulación, ficha técnica y DNI del titular",
                "En diésel con DPF: realizar regeneración o descarbonización 5-10 días antes",
                "Comprobar funcionamiento de cinturones y limpiaparabrisas",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. FAQ + CTA */}
      <section className="py-14" aria-labelledby="seccion-faq">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            06 · Preguntas frecuentes
          </span>
          <h2 id="seccion-faq" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Preguntas frecuentes sobre la ITV
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "¿Cuánto antes de la ITV debo descarbonizar el motor?",
                a: "Lo ideal es realizar la descarbonización entre 5 y 10 días antes de la inspección, después de un trayecto largo para que el motor expulse residuos sueltos y se estabilice.",
              },
              {
                q: "¿Qué ocurre si suspendo por emisiones?",
                a: "Dispone de 2 meses para volver a la misma estación con la avería corregida. Solo se reinspeccionará el defecto detectado.",
              },
              {
                q: "¿Puedo circular con la ITV caducada?",
                a: "No. Circular con la ITV caducada conlleva multa de hasta 500 €, retirada de puntos y nulidad del seguro en caso de siniestro.",
              },
              {
                q: "¿La descarbonización garantiza aprobar la ITV?",
                a: "Reduce drásticamente la opacidad y los gases, pero no sustituye a un mantenimiento general. En motores con averías mecánicas debe combinarse con la reparación correspondiente.",
              },
              {
                q: "¿Cuánto cuesta la ITV en España?",
                a: "Varía según comunidad autónoma y tipo de vehículo. Para turismos diésel oscila entre 35 € y 55 €, más tasas autonómicas.",
              },
              {
                q: "¿Qué pasa si tengo defectos graves?",
                a: "El vehículo recibe calificación 'Negativa'. Puede regresar al taller pero no circular libremente; debe acudir directamente a reparación.",
              },
            ].map((f) => (
              <details key={f.q} className="card-eco p-5 group">
                <summary className="flex items-start gap-3 cursor-pointer list-none">
                  <HelpCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <span className="text-sm font-semibold flex-1" style={{ color: "hsl(var(--foreground))" }}>
                    {f.q}
                  </span>
                  <ArrowRight
                    className="w-4 h-4 mt-1 flex-shrink-0 transition-transform group-open:rotate-90"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                    aria-hidden="true"
                  />
                </summary>
                <p className="text-sm mt-3 pl-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10">
            <CTABox
              title="¿Tiene la ITV próximamente?"
              description="Solicite cita para una descarbonización profesional y aumente sus posibilidades de aprobar a la primera."
              primaryLabel="Solicitar cita"
              primaryHref="/contacto"
              secondaryLabel="Ver servicios"
              secondaryHref="/servicios"
            />
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/blog/categoria/itv"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Ver todos los artículos de la categoría ITV
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
