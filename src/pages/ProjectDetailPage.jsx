import { useParams, Navigate } from "react-router-dom";
import Link from "@/compat/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Layers,
  Clock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  AlertCircle
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getProjectBySlug } from "@/data/projects";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { FinalCTA } from "@/components/home/FinalCTA";
import { usePageTitle } from "@/compat/usePageTitle";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageTitle(
    project ? `${project.title} | Commercial Case Study` : "Project Not Found",
    project
      ? `${project.type} in ${project.location} by Steelage Construction. ${project.summary}`.slice(0, 155)
      : undefined
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://steelage.ca",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://steelage.ca/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://steelage.ca/projects/${project.slug}/`,
      },
    ],
  };

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — Commercial Case Study`,
    description: project.summary,
    image: `https://steelage.ca${project.image}`,
    author: {
      "@type": "GeneralContractor",
      name: "Steelage Construction",
      url: "https://steelage.ca",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    url: `https://steelage.ca/projects/${project.slug}/`,
  };

  const projectFaqs = [
    {
      question: `What was the construction scope for ${project.title}?`,
      answer: project.scope || project.summary,
    },
    {
      question: `What technical challenges were solved by Steelage on this build?`,
      answer: `${project.challenge} Solution: ${project.solution}`,
    },
    {
      question: `What were the verified deliverables achieved for this project in ${project.location}?`,
      answer: `Steelage completed: ${project.results.join("; ")}.`,
    },
    {
      question: `How can a commercial client start a similar build in ${project.location}?`,
      answer: `Contact Steelage Construction's estimating team to review your commercial location, lease specifications, and architectural plans for a preliminary cost estimate.`,
    },
  ];

  const projectFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: projectFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="pt-24 pb-0 bg-white min-h-screen">
      {/* Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectFaqSchema) }}
      />

      {/* Header Banner */}
      <section className="bg-[#08171A] text-white py-12 sm:py-14 border-b border-white/10 bg-arch-grid">
        <Container size="wide">
          <Link
            href="/projects/"
            prefetch={true}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#C89552] uppercase tracking-widest hover:text-white transition-colors mb-5"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO ALL PROJECTS
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-0.5 bg-[#C89552]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#C89552] uppercase">
              COMMERCIAL CASE STUDY & REPORT
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight max-w-4xl text-white">
            {project.title}
          </h1>
          <p className="mt-2.5 text-xs sm:text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#C89552] shrink-0" />
            <span>{project.type}</span>
            <span className="text-[#C89552]">·</span>
            <span>{project.location}</span>
          </p>
        </Container>
      </section>

      {/* Main Case Study Content */}
      <section className="py-10 sm:py-14 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Main Report Body */}
            <div className="lg:col-span-8 space-y-10">
              {/* Photo Gallery Component */}
              <div className="border border-slate-200/90 p-4 sm:p-6 bg-slate-50/50 shadow-sm">
                <ProjectGallery key={project.slug} title={project.title} images={project.gallery} />
              </div>

              {/* 1. Project Scope */}
              <div className="border-t border-slate-200 pt-8 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#C89552]" />
                  <span className="text-xs font-bold text-[#C89552] uppercase tracking-widest">
                    PROJECT SCOPE
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08171A] uppercase tracking-tight">
                  Architectural & General Contracting Scope
                </h2>
                <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                  <p>{project.summary}</p>
                  {project.scope && <p>{project.scope}</p>}
                </div>
              </div>

              {/* 2. Construction Challenges & Solutions */}
              <div className="border-t border-slate-200 pt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#C89552]" />
                  <span className="text-xs font-bold text-[#C89552] uppercase tracking-widest">
                    CONSTRUCTION CHALLENGES
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08171A] uppercase tracking-tight">
                  Technical Site Hurdles & Execution Strategy
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Challenge */}
                  <div className="bg-[#FAF8F5] border border-slate-200 p-5 space-y-2 border-l-4 border-l-slate-400">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-slate-600 shrink-0" />
                      <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                        THE SITE & COMPLIANCE CHALLENGE
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {project.challenge}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="bg-[#FAF8F5] border border-[#E8DCBF] p-5 space-y-2 border-l-4 border-l-[#C89552]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C89552] shrink-0" />
                      <h3 className="text-xs font-extrabold text-[#A66C2E] uppercase tracking-wider">
                        STEELAGE ENGINEERED SOLUTION
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Completed Work & Deliverables */}
              <div className="border-t border-slate-200 pt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#C89552]" />
                  <span className="text-xs font-bold text-[#C89552] uppercase tracking-widest">
                    COMPLETED WORK & DELIVERABLES
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08171A] uppercase tracking-tight">
                  Key Milestones & Delivered Assets
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {project.results.map((res, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200/90 border-l-2 border-l-[#C89552]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-slate-800 leading-snug">
                        {res}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Project Outcome & Case Study Specifications */}
              <div className="border-t border-slate-200 pt-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#C89552]" />
                  <span className="text-xs font-bold text-[#C89552] uppercase tracking-widest">
                    PROJECT OUTCOME
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#08171A] uppercase tracking-tight">
                  Case Study Specifications & Technical Data Sheet
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  Completed commercial delivery adhering to strict architectural drawings, provincial health authority guidelines, and municipal building codes.
                </p>

                {/* Structured Specification Table */}
                <div className="border border-slate-200 overflow-hidden mt-3">
                  <table className="w-full text-left text-xs border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="py-2.5 px-4 font-bold text-slate-700 w-1/3 uppercase text-[11px] tracking-wider">
                          Project Classification
                        </th>
                        <td className="py-2.5 px-4 text-slate-800 font-medium">
                          {project.type}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-white">
                        <th className="py-2.5 px-4 font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                          Location & Jurisdiction
                        </th>
                        <td className="py-2.5 px-4 text-slate-800 font-medium">
                          {project.location}
                        </td>
                      </tr>
                      <tr className="border-b border-slate-200 bg-slate-50/80">
                        <th className="py-2.5 px-4 font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                          Contract Delivery Model
                        </th>
                        <td className="py-2.5 px-4 text-slate-800 font-medium">
                          Turnkey General Contracting & Multi-Trade Coordination
                        </td>
                      </tr>
                      {project.area && (
                        <tr className="border-b border-slate-200 bg-white">
                          <th className="py-2.5 px-4 font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                            Total Footprint / Size
                          </th>
                          <td className="py-2.5 px-4 text-slate-800 font-medium">
                            {project.area}
                          </td>
                        </tr>
                      )}
                      {project.completionTime && (
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                          <th className="py-2.5 px-4 font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                            Construction Duration
                          </th>
                          <td className="py-2.5 px-4 text-slate-800 font-medium">
                            {project.completionTime}
                          </td>
                        </tr>
                      )}
                      <tr className="bg-white">
                        <th className="py-2.5 px-4 font-bold text-slate-700 uppercase text-[11px] tracking-wider">
                          Quality & Inspection Status
                        </th>
                        <td className="py-2.5 px-4 text-emerald-700 font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>100% Passed Health Authority & Building Inspection Milestones</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                {/* Project Specs Quick Card */}
                <div className="bg-[#FAF8F5] p-5 sm:p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200">
                    <FileText className="w-4 h-4 text-[#C89552]" />
                    <h3 className="text-xs font-extrabold tracking-widest text-[#08171A] uppercase">
                      PROJECT SPECIFICATIONS
                    </h3>
                  </div>

                  <dl className="space-y-3.5 text-xs">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[10px] text-slate-500 uppercase font-semibold">Location</dt>
                        <dd className="font-bold text-slate-900">{project.location}</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Building2 className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[10px] text-slate-500 uppercase font-semibold">Commercial Client</dt>
                        <dd className="font-bold text-slate-900">{project.brand}</dd>
                      </div>
                    </div>

                    {project.area ? (
                      <div className="flex items-start gap-3">
                        <Layers className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Scope & Size</dt>
                          <dd className="font-bold text-slate-900">{project.area}</dd>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Layers className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Build Scope</dt>
                          <dd className="font-bold text-slate-900">Full Turnkey Build</dd>
                        </div>
                      </div>
                    )}

                    {project.completionTime ? (
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Completion Schedule</dt>
                          <dd className="font-bold text-slate-900">{project.completionTime}</dd>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Clock className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Delivery Schedule</dt>
                          <dd className="font-bold text-slate-900">On Schedule Handover</dd>
                        </div>
                      </div>
                    )}

                    {project.year ? (
                      <div className="flex items-start gap-3">
                        <Calendar className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Year Completed</dt>
                          <dd className="font-bold text-slate-900">{project.year}</dd>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="w-4 h-4 text-[#C89552] shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] text-slate-500 uppercase font-semibold">Compliance Status</dt>
                          <dd className="font-bold text-slate-900">100% Inspection Approved</dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Related Service Link */}
                {project.relatedServiceSlug && (
                  <div className="p-5 bg-white border border-[#E2D8C7] shadow-sm space-y-2.5">
                    <span className="text-[10px] font-extrabold text-[#A66C2E] uppercase tracking-wider block">
                      RELATED COMMERCIAL CAPABILITY
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      Learn more about Steelage&apos;s specialized general contracting capabilities for this project type.
                    </p>
                    <Link
                      href={`/services/${project.relatedServiceSlug}/`}
                      prefetch={true}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A66C2E] hover:text-[#08171A] uppercase tracking-wider transition-colors pt-1"
                    >
                      <span>VIEW SERVICE DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C89552]" />
                    </Link>
                  </div>
                )}

                {/* Quote CTA Widget */}
                <div className="bg-[#08171A] text-white p-5 sm:p-6 border border-white/15 shadow-xl bg-arch-grid">
                  <h3 className="text-sm sm:text-base font-extrabold uppercase mb-2 text-white">
                    HAVE A SIMILAR SPACE?
                  </h3>
                  <p className="text-xs text-slate-300 mb-5 leading-relaxed font-normal">
                    Let us bring the same precision, quality, and transparent management to your next commercial project.
                  </p>
                  <Button href="/contact/" variant="primary" size="md" className="w-full text-xs font-bold tracking-wider">
                    DISCUSS YOUR PROJECT
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Seamless Transition into Footer CTA */}
      <FinalCTA />
    </div>
  );
}
