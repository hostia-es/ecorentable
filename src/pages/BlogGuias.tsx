import { Link } from "react-router-dom";
import {
  Wrench,
  Filter,
  Gauge,
  Zap,
  Droplet,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ClipboardList,
  ShieldCheck,
  Package,
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import CTABox from "@/components/common/CTABox";

export default function BlogGuias() {
  return (
    <main>
      <PageHero
        title="Guías prácticas: mantenimiento y descarbonización"
        subtitle="Procedimientos paso a paso, síntomas y soluciones para los problemas más habituales en motores diésel y gasolina modernos."
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Guías" },
        ]}
        badge="Guía pilar · Talleres y conductores"
      />

      {/* 1. INTRODUCCIÓN */}
      <section className="py-14 section-light" aria-labelledby="seccion-intro">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            01 · Introducción
          </span>
          <h2 id="seccion-intro" className="text-2xl md:text-3xl font-bold mt-2 mb-5" style={{ color: "hsl(var(--foreground))" }}>
            Por qué un mantenimiento preventivo es rentable
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            Los motores modernos de inyección directa, tanto diésel como gasolina, sufren acumulación progresiva
            de carbono en válvulas, EGR, turbo y filtro de partículas. Detectar y tratar estos depósitos a
            tiempo evita averías graves y reduce el consumo entre un <strong>5 % y un 12 %</strong>.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
            Esta guía pilar reúne los <strong>procedimientos esenciales</strong> que todo taller y conductor debería
            conocer: limpieza de DPF, válvula EGR, descarbonización, inyectores y diagnóstico de emisiones.
          </p>
        </div>
      </section>

      {/* 2. ÍNDICE DE GUÍAS POR INTERVENCIÓN */}
      <section className="py-14" aria-labelledby="seccion-indice">
        <div className="container mx-auto px-4 max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            02 · Índice por intervención
          </span>
          <h2 id="seccion-indice" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Guías prácticas por tipo de intervención
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Filter,
                title: "Limpieza de DPF/FAP",
                desc: "Procedimiento sin desmontaje, productos químicos y regeneración forzada con OBD2.",
                anchor: "#guia-dpf",
              },
              {
                icon: Wrench,
                title: "Válvula EGR",
                desc: "Síntomas de obstrucción, limpieza in situ y comparativa frente al desmontaje.",
                anchor: "#guia-egr",
              },
              {
                icon: Zap,
                title: "Descarbonización por hidrógeno",
                desc: "Protocolo HHO completo, RPM de tratamiento y precauciones en motores con cadena.",
                anchor: "#guia-hho",
              },
              {
                icon: Droplet,
                title: "Inyectores diésel",
                desc: "Test de retorno, limpieza ultrasónica y aditivos de mantenimiento.",
                anchor: "#guia-inyectores",
              },
              {
                icon: Gauge,
                title: "Diagnóstico de emisiones",
                desc: "Lectura de opacidad, gases y códigos OBD2 más frecuentes (P0420, P2002, P0401).",
                anchor: "#guia-diagnostico",
              },
              {
                icon: ShieldCheck,
                title: "Mantenimiento preventivo",
                desc: "Calendario por kilometraje, fluidos críticos y rutinas anti-carbono.",
                anchor: "#guia-preventivo",
              },
            ].map((g) => (
              <a key={g.title} href={g.anchor} className="card-eco p-5 group hover:shadow-md transition-shadow block">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
                >
                  <g.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                  {g.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {g.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROCEDIMIENTOS PASO A PASO */}
      <section className="py-14 section-light" aria-labelledby="seccion-procedimientos">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            03 · Procedimientos
          </span>
          <h2 id="seccion-procedimientos" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Procedimientos paso a paso
          </h2>

          {/* DPF */}
          <article id="guia-dpf" className="card-eco p-6 mb-5 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Limpieza de filtro de partículas (DPF/FAP)</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Diagnóstico previo con OBD2: presión diferencial y kilómetros desde la última regeneración.</li>
              <li>Calentar el motor a temperatura de servicio (mínimo 80 °C).</li>
              <li>Inyectar producto descarbonizante en la línea de admisión o directamente en el DPF.</li>
              <li>Forzar regeneración estática con equipo profesional o trayecto a 2.500 RPM durante 20 min.</li>
              <li>Verificar la nueva contrapresión y borrar códigos de avería.</li>
            </ol>
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3" style={{ borderColor: "hsl(var(--border))" }}>
              <Link to="/tienda/maquinas-limpieza-filtro-particulas" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Ver máquinas DPF en tienda <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
              <Link to="/servicios/limpieza-filtros" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Servicio profesional · 100 € <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* EGR */}
          <article id="guia-egr" className="card-eco p-6 mb-5 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Limpieza de válvula EGR</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Síntomas: humo negro, ralentí inestable, código P0401 o P0402.</li>
              <li>Opción A — limpieza in situ con descarbonización por hidrógeno (sin desmontaje).</li>
              <li>Opción B — desmontaje, limpieza con disolvente específico y nueva junta.</li>
              <li>Reset de adaptaciones con equipo de diagnosis.</li>
              <li>Prueba en carretera y verificación con opacímetro.</li>
            </ol>
            <div className="mt-4 pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
              <Link to="/soluciones" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Ver soluciones técnicas <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* HHO */}
          <article id="guia-hho" className="card-eco p-6 mb-5 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Descarbonización por hidrógeno (HHO)</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Conectar la máquina H2 Profit a la admisión con motor en marcha y a temperatura.</li>
              <li>Mantener el régimen entre 1.500 y 2.500 RPM durante 30-45 min según cilindrada.</li>
              <li>Monitorizar temperatura y presión de aceite durante todo el ciclo.</li>
              <li>Tras el tratamiento, sustituir aceite y filtro si supera el intervalo recomendado.</li>
              <li>Documentar mejora con prueba de opacidad antes/después.</li>
            </ol>
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3" style={{ borderColor: "hsl(var(--border))" }}>
              <Link to="/tienda/descarbonizadoras" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Máquinas H2 Profit <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
              <Link to="/servicios/particulares" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Servicio para particulares · 90 € <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Inyectores */}
          <article id="guia-inyectores" className="card-eco p-6 mb-5 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Droplet className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Limpieza de inyectores</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Test de retorno para detectar inyectores fuera de tolerancia.</li>
              <li>Desmontaje, banco de pruebas y limpieza ultrasónica en frecuencia 40 kHz.</li>
              <li>Sustitución de toberas o reparación según diagnóstico.</li>
              <li>Recodificación de inyectores con equipo de diagnosis.</li>
              <li>Comprobación final con prueba de aceleración bajo carga.</li>
            </ol>
          </article>

          {/* Diagnóstico */}
          <article id="guia-diagnostico" className="card-eco p-6 mb-5 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <Gauge className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Diagnóstico de emisiones</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Inspección visual de tubo de escape y conexiones.</li>
              <li>Medición de opacidad en motor diésel con opacímetro homologado.</li>
              <li>Análisis de gases (CO, HC, CO₂, O₂, lambda) en motor gasolina.</li>
              <li>Lectura de códigos DTC y datos en vivo de sondas lambda y MAF.</li>
              <li>Comparativa con valores de referencia del fabricante.</li>
            </ol>
            <div className="mt-4 pt-4 border-t flex flex-wrap gap-3" style={{ borderColor: "hsl(var(--border))" }}>
              <Link to="/tienda/opacimetros" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Opacímetros <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
              <Link to="/tienda/analizadores-gases" className="text-xs font-semibold inline-flex items-center gap-1 hover:underline" style={{ color: "hsl(var(--primary))" }}>
                Analizadores de gases <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Preventivo */}
          <article id="guia-preventivo" className="card-eco p-6 scroll-mt-24">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <h3 className="text-lg font-bold" style={{ color: "hsl(var(--foreground))" }}>Mantenimiento preventivo anti-carbono</h3>
            </div>
            <ol className="space-y-2 text-sm list-decimal pl-5" style={{ color: "hsl(var(--muted-foreground))" }}>
              <li>Cambio de aceite de calidad ACEA C3/C4 cada 15.000 km en uso urbano.</li>
              <li>Sustitución de filtro de aire y combustible según fabricante.</li>
              <li>Trayecto largo (&gt;50 km) cada 2 semanas para favorecer regeneración del DPF.</li>
              <li>Descarbonización HHO preventiva cada 30.000-50.000 km.</li>
              <li>Lectura OBD2 anual para detectar derivas tempranas.</li>
            </ol>
          </article>
        </div>
      </section>

      {/* 4. SÍNTOMAS RÁPIDOS */}
      <section className="py-14" aria-labelledby="seccion-sintomas">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            04 · Diagnóstico rápido
          </span>
          <h2 id="seccion-sintomas" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Tabla de síntomas y causas probables
          </h2>
          <p className="text-sm mb-6" style={{ color: "hsl(var(--muted-foreground))" }}>
            Identifique el problema en menos de un minuto.
          </p>

          <div className="card-eco overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Síntomas y causas probables en motores diésel y gasolina</caption>
              <thead style={{ backgroundColor: "hsl(var(--muted))" }}>
                <tr>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>Síntoma</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>Causa probable</th>
                  <th scope="col" className="text-left px-4 py-3 font-semibold" style={{ color: "hsl(var(--foreground))" }}>Intervención</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Humo negro al acelerar", "DPF saturado o EGR sucia", "Limpieza DPF + descarbonización"],
                  ["Pérdida de potencia", "Carbono en admisión / turbo", "Descarbonización HHO"],
                  ["Consumo elevado", "Inyectores sucios", "Limpieza ultrasónica"],
                  ["Ralentí inestable", "EGR obstruida", "Limpieza EGR"],
                  ["Testigo motor P0420", "Catalizador o sondas lambda", "Diagnóstico OBD2"],
                  ["Regeneración fallida", "DPF muy saturado", "Regeneración forzada"],
                ].map(([s, c, i]) => (
                  <tr key={s} className="border-t" style={{ borderColor: "hsl(var(--border))" }}>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--foreground))" }}>{s}</td>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--muted-foreground))" }}>{c}</td>
                    <td className="px-4 py-3" style={{ color: "hsl(var(--muted-foreground))" }}>{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. EQUIPOS RECOMENDADOS */}
      <section className="py-14 section-light" aria-labelledby="seccion-equipos">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            05 · Equipamiento
          </span>
          <h2 id="seccion-equipos" className="text-2xl md:text-3xl font-bold mt-2 mb-3" style={{ color: "hsl(var(--foreground))" }}>
            Equipos recomendados para taller
          </h2>
          <p className="text-sm mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
            Selección profesional para cubrir todas las intervenciones descritas en esta guía.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Zap, title: "Descarbonizadoras H2 Profit", desc: "Gama 1000 / 2000 / 3000 según cilindrada y volumen de trabajo.", to: "/tienda/descarbonizadoras" },
              { icon: Filter, title: "Carbón FAP", desc: "Sistema profesional de limpieza de filtros de partículas sin desmontaje.", to: "/tienda/maquinas-limpieza-filtro-particulas" },
              { icon: Gauge, title: "Opacímetros homologados", desc: "Equipos certificados ITV para medición de opacidad diésel.", to: "/tienda/opacimetros" },
              { icon: Package, title: "Analizadores de gases", desc: "Análisis de 4 y 5 gases para motores gasolina e híbridos.", to: "/tienda/analizadores-gases" },
            ].map((p) => (
              <Link key={p.title} to={p.to} className="card-eco p-5 group hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
                >
                  <p.icon className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold mb-1.5 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {p.desc}
                </p>
                <span className="text-xs font-semibold inline-flex items-center gap-1 mt-3" style={{ color: "hsl(var(--primary))" }}>
                  Ver en tienda <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <Link to="/soluciones" className="card-eco p-5 hover:shadow-md transition-shadow group">
              <ClipboardList className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Soluciones técnicas integrales
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Asesoramiento personalizado para implantar el servicio en su taller
              </p>
            </Link>
            <Link to="/tienda" className="card-eco p-5 hover:shadow-md transition-shadow group">
              <Package className="w-5 h-5 mb-2" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
              <p className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors" style={{ color: "hsl(var(--foreground))" }}>
                Catálogo completo
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                Todos los equipos profesionales y consumibles
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. ERRORES FRECUENTES Y CTA */}
      <section className="py-14" aria-labelledby="seccion-errores">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(var(--primary))" }}>
            06 · Errores frecuentes
          </span>
          <h2 id="seccion-errores" className="text-2xl md:text-3xl font-bold mt-2 mb-8" style={{ color: "hsl(var(--foreground))" }}>
            Errores frecuentes a evitar
          </h2>

          <div className="space-y-3 mb-8">
            {[
              { t: "Descarbonizar con motor frío", d: "El proceso requiere temperatura óptima para resultar efectivo y seguro." },
              { t: "Saltarse el cambio de aceite posterior", d: "Los residuos quemados acaban en el cárter. Sustituir aceite y filtro tras intervenciones intensas." },
              { t: "Borrar códigos sin reparar", d: "El testigo volverá en pocos kilómetros. Diagnostique siempre antes de borrar." },
              { t: "Usar productos genéricos en DPF", d: "Pueden cristalizar en la cerámica y agravar la obstrucción. Utilice productos homologados." },
              { t: "Ignorar la presión diferencial", d: "El sensor de presión es la mejor referencia objetiva del estado del DPF." },
            ].map((e) => (
              <div key={e.t} className="card-eco p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "hsl(var(--foreground))" }}>{e.t}</p>
                    <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>{e.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <CTABox
            title="¿Quiere implantar este servicio en su taller?"
            description="Le acompañamos con formación, equipos y soporte técnico continuo."
            primaryLabel="Hablar con un experto"
            primaryHref="/contacto"
            secondaryLabel="Ver soluciones"
            secondaryHref="/soluciones"
          />

          <div className="mt-10 text-center">
            <Link
              to="/blog/categoria/guias"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
              style={{ color: "hsl(var(--primary))" }}
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Ver todos los artículos de la categoría Guías
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
