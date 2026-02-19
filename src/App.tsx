import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
import EncuentreCentro from "./pages/EncuentreCentro";
import EncuentreCentroProvincia from "./pages/EncuentreCentroProvincia";
import Socios from "./pages/Socios";
import HazteSocio from "./pages/HazteSocio";
import SociosPortal from "./pages/SociosPortal";
import Tienda from "./pages/Tienda";
import TiendaCategoria from "./pages/TiendaCategoria";
import ProductoDetalle from "./pages/ProductoDetalle";
import Contacto from "./pages/Contacto";
import Accesibilidad from "./pages/Accesibilidad";
import LegacyDescarbonizacion from "./pages/LegacyDescarbonizacion";
import LegacyLimpiezaFiltros from "./pages/LegacyLimpiezaFiltros";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
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
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog/categoria/:category" element={<BlogCategory />} />

          {/* ENCUENTRE CENTRO */}
          <Route path="/encuentre-centro" element={<EncuentreCentro />} />
          <Route path="/encuentre-centro/:provincia" element={<EncuentreCentroProvincia />} />

          {/* SOCIOS */}
          <Route path="/socios" element={<Socios />} />
          <Route path="/socios/hazte-socio" element={<HazteSocio />} />
          <Route path="/socios/portal" element={<SociosPortal />} />

          {/* TIENDA */}
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/tienda/:categoria" element={<TiendaCategoria />} />
          <Route path="/tienda/:categoria/:slug" element={<ProductoDetalle />} />

          {/* LEGACY URLs → redirect */}
          <Route path="/descarbonizacion" element={<LegacyDescarbonizacion />} />
          <Route path="/limpieza-de-filtros-de-particulas" element={<LegacyLimpiezaFiltros />} />
          <Route path="/socio" element={<Navigate to="/socios" replace />} />
          <Route path="/carbon-fap" element={<Navigate to="/tienda/aditivos/carbon-fap" replace />} />
          <Route path="/hy-calamine-1000s-egr-pilot" element={<Navigate to="/tienda/maquinas-descarbonizadoras/hy-calamine-1000s-egr-pilot" replace />} />
          <Route path="/hy-calamine-2000s-egr-pilot" element={<Navigate to="/tienda/maquinas-descarbonizadoras/hy-calamine-2000s-egr-pilot" replace />} />
          <Route path="/hy-calamine-3000s-egr-pilot" element={<Navigate to="/tienda/maquinas-descarbonizadoras/hy-calamine-3000s-egr-pilot" replace />} />
          <Route path="/hy-carbon-connect" element={<Navigate to="/tienda/accesorios-consumibles/hy-carbon-connect" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
