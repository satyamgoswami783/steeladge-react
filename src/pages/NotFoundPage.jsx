import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { usePageTitle } from "@/compat/usePageTitle";
export default function NotFoundPage() {
    usePageTitle("Page Not Found | Steelage Construction");
    return (<div className="pt-32 pb-24 min-h-[70vh] flex items-center justify-center bg-[#08171A] text-white">
      <Container size="tight" className="text-center space-y-6">
        <span className="text-xs font-bold tracking-[0.25em] text-[#D3A15D] uppercase block">
          ERROR 404
        </span>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight">
          PAGE NOT FOUND
        </h1>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          The commercial project, service, or page you are looking for does not exist or may have been moved.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            <ArrowLeft className="w-4 h-4 mr-2"/>
            RETURN TO HOMEPAGE
          </Button>
          <Button href="/contact/" variant="outline" size="md">
            CONTACT ESTIMATING
          </Button>
        </div>
      </Container>
    </div>);
}
