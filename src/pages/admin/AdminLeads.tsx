import { useState } from "react";
import { Search, Filter, MoreHorizontal, Mail, Phone, Plus, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LeadStatus = "nuevo" | "contactado" | "en_proceso" | "cerrado" | "perdido";

interface Lead {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  origen: string;
  servicio: string;
  status: LeadStatus;
  fecha: string;
  notas: string;
}

const statusConfig: Record<LeadStatus, { label: string; bg: string; text: string }> = {
  nuevo: { label: "Nuevo", bg: "hsl(148 72% 45% / 0.15)", text: "hsl(148,72%,45%)" },
  contactado: { label: "Contactado", bg: "hsl(200 80% 55% / 0.15)", text: "hsl(200,80%,55%)" },
  en_proceso: { label: "En proceso", bg: "hsl(40 90% 55% / 0.15)", text: "hsl(40,90%,55%)" },
  cerrado: { label: "Cerrado", bg: "hsl(148 65% 22% / 0.2)", text: "hsl(148,65%,35%)" },
  perdido: { label: "Perdido", bg: "hsl(0 70% 50% / 0.15)", text: "hsl(0,70%,55%)" },
};

// Sample data — will be replaced by DB data later
const sampleLeads: Lead[] = [
  {
    id: "1",
    nombre: "Carlos García",
    email: "carlos@example.com",
    telefono: "+34 612 345 678",
    origen: "Formulario Web",
    servicio: "Descarbonización",
    status: "nuevo",
    fecha: "2026-03-08",
    notas: "",
  },
  {
    id: "2",
    nombre: "María López",
    email: "maria@example.com",
    telefono: "+34 698 765 432",
    origen: "WhatsApp",
    servicio: "Limpieza DPF",
    status: "contactado",
    fecha: "2026-03-07",
    notas: "Llamar el lunes",
  },
];

export default function AdminLeads() {
  const [leads] = useState<Lead[]>(sampleLeads);
  const [search, setSearch] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.nombre.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads / CRM</h1>
          <p className="text-sm text-[hsl(0,0%,50%)] mt-1">
            Gestiona tus contactos comerciales y haz seguimiento.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-white/10 text-[hsl(0,0%,70%)] hover:bg-white/5"
          >
            <Download size={14} className="mr-1" /> Exportar
          </Button>
          <Button
            size="sm"
            className="bg-[hsl(148,65%,22%)] hover:bg-[hsl(148,65%,28%)] text-white"
          >
            <Plus size={14} className="mr-1" /> Añadir Lead
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(0,0%,40%)]" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[hsl(210,25%,7%)] border-white/10 text-white placeholder:text-[hsl(0,0%,35%)]"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          className="border-white/10 text-[hsl(0,0%,60%)] hover:bg-white/5"
        >
          <Filter size={14} className="mr-1" /> Filtros
        </Button>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border border-white/5 overflow-hidden"
        style={{ background: "hsl(210 25% 7%)" }}
      >
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-[hsl(0,0%,40%)]">
            <Users size={40} className="mb-3 opacity-30" />
            <p className="text-sm">No se encontraron leads.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[hsl(0,0%,50%)]">Nombre</TableHead>
                <TableHead className="text-[hsl(0,0%,50%)]">Servicio</TableHead>
                <TableHead className="text-[hsl(0,0%,50%)]">Origen</TableHead>
                <TableHead className="text-[hsl(0,0%,50%)]">Estado</TableHead>
                <TableHead className="text-[hsl(0,0%,50%)]">Fecha</TableHead>
                <TableHead className="text-[hsl(0,0%,50%)] text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => {
                const sc = statusConfig[lead.status];
                return (
                  <TableRow
                    key={lead.id}
                    className="border-white/5 hover:bg-white/[0.02]"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-white text-sm">{lead.nombre}</p>
                        <p className="text-xs text-[hsl(0,0%,45%)]">{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-[hsl(0,0%,65%)]">
                      {lead.servicio}
                    </TableCell>
                    <TableCell className="text-sm text-[hsl(0,0%,65%)]">
                      {lead.origen}
                    </TableCell>
                    <TableCell>
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium"
                        style={{ background: sc.bg, color: sc.text }}
                      >
                        {sc.label}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-[hsl(0,0%,55%)]">
                      {lead.fecha}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[hsl(0,0%,50%)] hover:text-white"
                          title="Enviar email"
                        >
                          <Mail size={14} />
                        </button>
                        <a
                          href={`tel:${lead.telefono}`}
                          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[hsl(0,0%,50%)] hover:text-white"
                          title="Llamar"
                        >
                          <Phone size={14} />
                        </a>
                        <button
                          className="p-1.5 rounded hover:bg-white/10 transition-colors text-[hsl(0,0%,50%)] hover:text-white"
                          title="Más opciones"
                        >
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
