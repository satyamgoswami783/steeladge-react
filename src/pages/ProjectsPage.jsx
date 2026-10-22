"use client";
import { useState, useMemo } from "react";
import Image from "@/compat/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/home/ProjectCard";
import { projectsData } from "@/data/projects";
import { FinalCTA } from "@/components/home/FinalCTA";
import { FAQSection } from "@/components/common/FAQSection";
import { projectsListingFAQs } from "@/data/faqs";
import { usePageTitle } from "@/compat/usePageTitle";

const FILTER_CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "RESTAURANT", label: "RESTAURANT" },
  { id: "DAYCARE", label: "DAYCARE" },
  { id: "MEDICAL", label: "MEDICAL" },
];

function isProjectInCategory(project, categoryId) {
  if (categoryId === "ALL") return true;

  const combined = (project.title + " " + project.type + " " + project.brand).toLowerCase();

  if (categoryId === "DAYCARE") {
    return (
      combined.includes("daycare") ||
      combined.includes("childcare") ||
      combined.includes("early learning") ||
      combined.includes("preschool")
    );
  }

  if (categoryId === "MEDICAL") {
    return (
      combined.includes("medical") ||
      combined.includes("dental") ||
      combined.includes("clinic") ||
      combined.includes("healthcare") ||
      combined.includes("operatory")
    );
  }

  if (categoryId === "RESTAURANT") {
    return (
      combined.includes("restaurant") ||
      combined.includes("pizza") ||
      combined.includes("pizzeria") ||
      combined.includes("dairy queen") ||
      combined.includes("burrito") ||
      combined.includes("oakberry") ||
      combined.includes("açaí") ||
      combined.includes("acai") ||
      combined.includes("creamery") ||
      combined.includes("chipotle") ||
      combined.includes("fresh café") ||
      combined.includes("fresh cafe") ||
      combined.includes("lighthouse") ||
      combined.includes("ihop") ||
      combined.includes("chacha") ||
      combined.includes("qsr") ||
      combined.includes("cafe") ||
      combined.includes("café") ||
      combined.includes("food")
    );
  }

  return false;
}

export default function ProjectsPage() {
  usePageTitle(
    "Featured Commercial Projects | Steelage Construction",
    "View commercial projects completed across Surrey & Lower Mainland, BC, including Boston Pizza, Dairy Queen, Oakberry Açaí, Mucho Burrito, and Marble Slab Creamery build-outs."
  );

  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredProjects = useMemo(() => {
    const baseList = projectsData.filter((project) => isProjectInCategory(project, activeCategory));

    // When viewing "ALL", place flagship commercial restaurant builds upfront and move daycare / medical to the back
    if (activeCategory === "ALL") {
      const isPriorityBack = (p) =>
        p.slug === "daycare-early-learning-surrey" ||
        p.slug === "ascent-medical-dental-centre" ||
        p.slug === "masud-dental-lab";

      const front = baseList.filter((p) => !isPriorityBack(p));
      const back = baseList.filter((p) => isPriorityBack(p));
      return [...front, ...back];
    }

    return baseList;
  }, [activeCategory]);

  return (
    <div className="pt-28 pb-16 bg-[#08171A]">
      {/* Header Banner */}
      <section className="text-white py-16 border-b border-white/10 relative overflow-hidden">
        {/* Background Dark Blueprint Grid */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <Image
            src="/images/bg-blueprint-dark.png"
            alt="Architectural grid pattern"
            fill
            sizes="100vw"
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08171A] via-transparent to-[#08171A] opacity-80" />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            as="h1"
            eyebrow="COMMERCIAL PORTFOLIO"
            title="FEATURED PROJECTS"
            description="A showcase of retail renovations, restaurant build-outs, tenant improvements, and corporate commercial spaces completed across Surrey and the Lower Mainland, BC."
            darkBackground
          />
        </Container>
      </section>

      {/* Projects Showcase with Filter Tabs */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <Image
            src="/images/bg-blueprint-dark.png"
            alt="Architectural grid pattern"
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#08171A] via-transparent to-[#08171A] opacity-80" />
        </div>

        <Container size="wide" className="relative z-10">
          {/* Interactive Category Filter Tabs */}
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap items-center sm:justify-center gap-3 mb-10 no-scrollbar snap-x snap-mandatory">
            {FILTER_CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-5 py-2.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer border whitespace-nowrap shrink-0 snap-start ${
                    isActive
                      ? "bg-[#C89552] border-[#C89552] text-white shadow-lg"
                      : "bg-[#0B2025]/80 border-white/10 text-slate-300 hover:text-white hover:border-[#C89552]/60"
                  }`}
                  aria-pressed={isActive}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Grid of Projects or Empty State */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.slug} project={project} priority={idx < 4} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#0B2025]/60 border border-white/10 p-8 max-w-xl mx-auto">
              <p className="text-slate-300 text-sm font-semibold tracking-wide uppercase">
                No projects found in this category.
              </p>
            </div>
          )}
        </Container>
      </section>

      {/* Commercial Portfolio FAQs */}
      <FAQSection
        title="COMMERCIAL PORTFOLIO FAQS"
        eyebrow="PORTFOLIO & PROJECT FAQS"
        description="Learn more about our completed commercial builds, client walkthroughs, and quality execution standards across Metro Vancouver."
        faqs={projectsListingFAQs}
        dark
      />

      <FinalCTA />
    </div>
  );
}
