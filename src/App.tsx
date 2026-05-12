// 🔒 FROZEN ROUTES — DO NOT MODIFY EXISTING <Route path="..."> VALUES
// Append-only. Renaming any path destroys SEO and breaks backlinks.
// New routes: append at the bottom. Renames: add new path + 301 in seo_redirects.
// See: src/config/frozenUrls.ts and mem://constraints/seo/frozen-urls-policy
// Frozen on: 2026-04-20

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import CartFAB from "@/components/common/CartFAB";
import AdminLayout from "@/components/admin/AdminLayout";
import { CartProvider } from "@/hooks/useCart";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Nosotros from "./pages/Nosotros";
import Servicios from "./pages/Servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Soluciones from "./pages/Soluciones";
import SolucionDetalle from "./pages/SolucionDetalle";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import Socios from "./pages/Socios";
import HazteSocio from "./pages/HazteSocio";
import SociosPortal from "./pages/SociosPortal";
import Tienda from "./pages/Tienda";
import TiendaCategoria from "./pages/TiendaCategoria";
import ProductoDetalle from "./pages/ProductoDetalle";
import TiendaCheckout from "./pages/TiendaCheckout";
import Contacto from "./pages/Contacto";
import Accesibilidad from "./pages/Accesibilidad";
import BlogItv from "./pages/BlogItv";
import BlogGuias from "./pages/BlogGuias";
import EncuentraTuCentro from "./pages/EncuentraTuCentro";
import CentroProvincia from "./pages/CentroProvincia";
import CentroDetalle from "./pages/CentroDetalle";
import LegacyDescarbonizacion from "./pages/LegacyDescarbonizacion";
import LegacyLimpiezaFiltros from "./pages/LegacyLimpiezaFiltros";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import { AuthProvider } from "@/hooks/useAuth";

const queryClient = new QueryClient();

function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <Routes>
        {/* MAIN */}
        <Route path="/" element={<Index />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/accesibilidad" element={<Accesibilidad />} />

        {/* SERVICIOS */}
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/:servicio" element={<ServicioDetalle />} />

        {/* SOLUCIONES */}
        <Route path="/soluciones" element={<Soluciones />} />
        <Route path="/soluciones/:slug" element={<SolucionDetalle />} />

        {/* BLOG */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/itv" element={<BlogItv />} />
        <Route path="/blog/guias" element={<BlogGuias />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog/categoria/:category" element={<BlogCategory />} />

        {/* SOCIOS */}
        <Route path="/socios" element={<Socios />} />
        <Route path="/socios/hazte-socio" element={<HazteSocio />} />
        <Route path="/socios/portal" element={<SociosPortal />} />

        {/* TIENDA */}
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/tienda/:categoria" element={<TiendaCategoria />} />
        <Route path="/tienda/:categoria/:slug" element={<ProductoDetalle />} />

        {/* ADMIN — hidden panel */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<AdminBlogEditor />} />
          <Route path="blog/:id" element={<AdminBlogEditor />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* LEGACY URLs → redirect */}
        <Route path="/descarbonizacion" element={<LegacyDescarbonizacion />} />
        <Route path="/limpieza-de-filtros-de-particulas" element={<LegacyLimpiezaFiltros />} />
        <Route path="/socio" element={<Navigate to="/socios" replace />} />
        <Route path="/carbon-fap" element={<Navigate to="/tienda/maquinas-limpieza-filtro-particulas/carbon-fap" replace />} />
        <Route path="/hy-calamine-1000s-egr-pilot" element={<Navigate to="/tienda/descarbonizadoras/h2-profit-1000" replace />} />
        <Route path="/hy-calamine-2000s-egr-pilot" element={<Navigate to="/tienda/descarbonizadoras/h2-profit-2000" replace />} />
        <Route path="/hy-calamine-3000s-egr-pilot" element={<Navigate to="/tienda/descarbonizadoras/h2-profit-3000" replace />} />
        <Route path="/hy-carbon-connect" element={<Navigate to="/tienda/descarbonizadoras/hy-carbon-connect" replace />} />

        {/* APPEND-ONLY new routes */}
        <Route path="/encuentra-tu-centro" element={<EncuentraTuCentro />} />
        <Route path="/encuentra-tu-centro/:provincia" element={<CentroProvincia />} />
        <Route path="/encuentra-tu-centro/:provincia/:slug" element={<CentroDetalle />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppShell />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
