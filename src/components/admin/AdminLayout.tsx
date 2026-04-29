import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronLeft,
  Activity,
  FileText,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Blog", href: "/admin/blog", icon: FileText },
  { label: "Leads / CRM", href: "/admin/leads", icon: Users },
  { label: "Configuración", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user, isEditor, loading, signOut } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[hsl(210,25%,4%)] text-white flex items-center justify-center text-sm">Cargando…</div>;
  }
  if (!user || !isEditor) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  const isActive = (href: string) =>
    href === "/admin"
      ? location.pathname === "/admin"
      : location.pathname.startsWith(href);

  return (
    <div className="min-h-screen flex bg-[hsl(210,25%,4%)] text-white">
      <aside
        className={cn(
          "sticky top-0 h-screen flex flex-col border-r border-white/5 transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
        style={{ background: "hsl(210 25% 6%)" }}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-white/5">
          {!collapsed && (
            <span className="flex items-center gap-2 text-sm font-bold tracking-wide text-[hsl(148,72%,45%)]">
              <Activity size={18} />
              Admin Panel
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            <ChevronLeft size={18} className={cn("transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive(item.href)
                  ? "bg-[hsl(148,65%,22%)] text-white"
                  : "text-[hsl(0,0%,55%)] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className="shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-xs text-[hsl(0,0%,45%)] hover:text-white transition-colors w-full"
          >
            <LogOut size={14} />
            {!collapsed && <span>Cerrar sesión</span>}
          </button>
          <Link to="/" className="flex items-center gap-2 text-xs text-[hsl(0,0%,45%)] hover:text-white transition-colors">
            <ChevronLeft size={14} />
            {!collapsed && <span>Volver al sitio</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
