import { Users, TrendingUp, Mail, Clock, ArrowUpRight } from "lucide-react";

const metrics = [
  { label: "Total Leads", value: "0", icon: Users, change: "+0%", color: "hsl(148,72%,45%)" },
  { label: "Tasa de Conversión", value: "0%", icon: TrendingUp, change: "+0%", color: "hsl(200,80%,55%)" },
  { label: "Emails Enviados", value: "0", icon: Mail, change: "+0%", color: "hsl(280,70%,60%)" },
  { label: "Tiempo Medio Respuesta", value: "—", icon: Clock, change: "—", color: "hsl(40,90%,55%)" },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[hsl(0,0%,50%)] mt-1">
          Resumen general de tu actividad comercial.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl p-5 border border-white/5"
            style={{ background: "hsl(210 25% 7%)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `${m.color}20`, color: m.color }}
              >
                <m.icon size={18} />
              </div>
              <span className="text-xs flex items-center gap-0.5 text-[hsl(148,72%,45%)]">
                {m.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-[hsl(0,0%,45%)] mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div
        className="rounded-xl border border-white/5 p-6"
        style={{ background: "hsl(210 25% 7%)" }}
      >
        <h2 className="text-lg font-semibold mb-4">Actividad Reciente</h2>
        <div className="flex flex-col items-center justify-center py-16 text-[hsl(0,0%,40%)]">
          <Users size={40} className="mb-3 opacity-30" />
          <p className="text-sm">Aún no hay actividad registrada.</p>
          <p className="text-xs mt-1">
            Los leads aparecerán aquí cuando los formularios de contacto estén conectados.
          </p>
        </div>
      </div>
    </div>
  );
}
