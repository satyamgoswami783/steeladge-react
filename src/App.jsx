import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { JsonLd } from "@/components/layout/JsonLd";
import { SmoothNavigation } from "@/components/layout/SmoothNavigation";
// Lazy-loaded Pages for optimal performance and chunk splitting
const HomePage = lazy(() => import("@/pages/HomePage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const ServicesPage = lazy(() => import("@/pages/ServicesPage"));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetailPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const ProcessPage = lazy(() => import("@/pages/ProcessPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const ServiceAreaPage = lazy(() => import("@/pages/ServiceAreaPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
export default function App() {
    const { pathname } = useLocation();
    useEffect(() => {
        // Google Analytics page view tracking on route changes
        if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("config", "G-K3K2LTF1WE", {
                page_path: pathname,
            });
        }
    }, [pathname]);
    return (<div className="min-h-full flex flex-col font-sans bg-[#08171A] text-white">
      <JsonLd />
      <Header />

      <main className="flex-grow flex flex-col">
        <SmoothNavigation>
          <Suspense fallback={<div className="min-h-[60vh] bg-[#08171A]"/>}>
            <Routes>
              <Route path="/" element={<HomePage />}/>
              
              <Route path="/about" element={<AboutPage />}/>
              <Route path="/about/" element={<AboutPage />}/>
              
              <Route path="/services" element={<ServicesPage />}/>
              <Route path="/services/" element={<ServicesPage />}/>
              <Route path="/services/:slug" element={<ServiceDetailPage />}/>
              <Route path="/services/:slug/" element={<ServiceDetailPage />}/>
              
              <Route path="/projects" element={<ProjectsPage />}/>
              <Route path="/projects/" element={<ProjectsPage />}/>
              <Route path="/projects/:slug" element={<ProjectDetailPage />}/>
              <Route path="/projects/:slug/" element={<ProjectDetailPage />}/>
              
              <Route path="/our-process" element={<ProcessPage />}/>
              <Route path="/our-process/" element={<ProcessPage />}/>
              
              <Route path="/contact" element={<ContactPage />}/>
              <Route path="/contact/" element={<ContactPage />}/>
              
              <Route path="/service-area" element={<ServiceAreaPage />}/>
              <Route path="/service-area/" element={<ServiceAreaPage />}/>
              
              <Route path="*" element={<NotFoundPage />}/>
            </Routes>
          </Suspense>
        </SmoothNavigation>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>);
}
