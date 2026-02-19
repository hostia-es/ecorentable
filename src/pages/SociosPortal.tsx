import { Link } from "react-router-dom";
import { Lock, BarChart2, Users, Package, FileText, ArrowRight } from "lucide-react";
import PageHero from "@/components/common/PageHero";

export default function SociosPortal() {
  return (
    <main>
      <PageHero
        title="Portal de socios — Acceso restringido"
        subtitle="Área privada para talleres socios certificados de Ecología Rentable."
        breadcrumbs={[{ label: "Socios", href: "/socios" }, { label: "Portal" }]}
        badge="Acceso restringido"
      />

      {/* AVISO + DEMO */}
      <section className="py-16 section-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-xl border p-5 mb-10 flex items-start gap-3" style={{ background: "hsl(82 70% 42% / 0.08)", borderColor: "hsl(82 70% 42% / 0.3)" }}>
            <Lock size={18} style={{ color: "hsl(82 70% 38%)", marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold mb-1" style={{ color: "hsl(82 60% 30%)" }}>Modo demo — contenido de muestra</p>
              <p className="text-sm" style={{ color: "hsl(82 50% 25%)" }}>El portal real requiere credenciales de socio. Si ya eres socio, contacta con nosotros para recibir acceso. Si quieres ser socio, <Link to="/socios/hazte-socio" className="underline font-semibold">regístrate aquí</Link>.</p>
            </div>
          </div>

          {/* DEMO DASHBOARD */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Leads este mes", value: "14", icon: <Users size={18} />, trend: "+3 vs. mes anterior" },
              { label: "Servicios realizados", value: "47", icon: <BarChart2 size={18} />, trend: "Acumulado anual" },
              { label: "Pedidos pendientes", value: "2", icon: <Package size={18} />, trend: "Consumibles en camino" },
              { label: "Formaciones completadas", value: "3/4", icon: <FileText size={18} />, trend: "1 módulo pendiente" },
            ].map((s) => (
              <div key={s.label} className="card-eco p-4">
                <div className="flex items-center gap-2 mb-2" style={{ color: "hsl(var(--primary))" }}>{s.icon}</div>
                <div className="text-2xl font-bold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.value}</div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: "hsl(var(--foreground))" }}>{s.label}</div>
                <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{s.trend}</div>
              </div>
            ))}
          </div>

          {/* LEADS DEMO */}
          <div className="card-eco p-6 mb-6">
            <h3 className="font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Leads recientes (demo)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                    {["Cliente", "Vehículo", "Servicio", "Fecha", "Estado"].map((h) => (
                      <th key={h} className="text-left py-2 pr-4 text-xs font-semibold" style={{ color: "hsl(var(--muted-foreground))" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cliente: "María G.", vehiculo: "Peugeot 308 1.6 HDI", servicio: "Limpieza DPF", fecha: "15/01/2025", estado: "Pendiente" },
                    { cliente: "Carlos M.", vehiculo: "VW Golf 2.0 TDI", servicio: "Descarbonización", fecha: "14/01/2025", estado: "Confirmado" },
                    { cliente: "Ana R.", vehiculo: "Ford Focus 1.5 TDCi", servicio: "Limpieza EGR", fecha: "12/01/2025", estado: "Realizado" },
                  ].map((l, i) => (
                    <tr key={i} className="border-b" style={{ borderColor: "hsl(var(--border))" }}>
                      <td className="py-3 pr-4 font-medium">{l.cliente}</td>
                      <td className="py-3 pr-4" style={{ color: "hsl(var(--muted-foreground))" }}>{l.vehiculo}</td>
                      <td className="py-3 pr-4">{l.servicio}</td>
                      <td className="py-3 pr-4" style={{ color: "hsl(var(--muted-foreground))" }}>{l.fecha}</td>
                      <td className="py-3">
                        <span className={`badge-${l.estado === "Realizado" ? "green" : "steel"} text-xs`}>{l.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RECURSOS TÉCNICOS DEMO */}
          <div className="card-eco p-6">
            <h3 className="font-bold mb-4" style={{ color: "hsl(var(--foreground))" }}>Recursos técnicos disponibles (demo)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["Manual operación Hy-Calamine 2000S.pdf", "Protocolo limpieza DPF — versión 3.2.pdf", "Tabla compatibilidad motores Euro 6d.xlsx", "Guía fijación de precios — 2024.pdf"].map((r) => (
                <div key={r} className="flex items-center gap-2 p-3 rounded-lg border text-sm" style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
                  <FileText size={14} style={{ color: "hsl(var(--primary))", flexShrink: 0 }} />
                  <span className="truncate">{r}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>¿No tienes acceso? Regístrate como socio para obtener credenciales reales.</p>
            <Link to="/socios/hazte-socio" className="btn-primary text-sm px-5 py-2">Solicitar acceso <ArrowRight size={13} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
