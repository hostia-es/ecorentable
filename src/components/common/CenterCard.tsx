import { Link } from "react-router-dom";
import { Phone, Clock, MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Center } from "@/data/centers";

interface CenterCardProps {
  center: Center;
}

export default function CenterCard({ center }: CenterCardProps) {
  return (
    <div className="center-card">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-bold text-base leading-tight" style={{ color: "hsl(var(--foreground))" }}>
          {center.name}
        </h3>
        <span className="badge-green shrink-0 text-xs">Certificado</span>
      </div>

      <div className="space-y-2 text-sm mb-4" style={{ color: "hsl(var(--muted-foreground))" }}>
        <div className="flex items-start gap-2">
          <MapPin size={13} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--primary))" }} />
          <span>{center.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone size={13} className="shrink-0" style={{ color: "hsl(var(--primary))" }} />
          <a href={`tel:${center.phone}`} className="hover:underline" style={{ color: "hsl(var(--primary))" }}>
            {center.phone}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={13} className="shrink-0" style={{ color: "hsl(var(--primary))" }} />
          <span>{center.hours}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs font-semibold mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
          SERVICIOS DISPONIBLES
        </p>
        <div className="flex flex-wrap gap-1">
          {center.services.map((s) => (
            <span key={s} className="flex items-center gap-1 text-xs rounded-full px-2 py-0.5" style={{ background: "hsl(var(--accent-green-light))", color: "hsl(var(--primary))" }}>
              <CheckCircle size={10} />
              {s}
            </span>
          ))}
        </div>
      </div>

      <Link
        to="/contacto"
        className="flex items-center justify-center gap-2 w-full rounded-md py-2 text-sm font-semibold transition-all"
        style={{ background: "var(--gradient-primary)", color: "white" }}
      >
        Solicitar cita <ArrowRight size={13} />
      </Link>
    </div>
  );
}
