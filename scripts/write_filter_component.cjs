const fs = require('fs');

const content = `"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/home/ProjectCard";
import { Project } from "@/data/projects";

interface ProjectsGridWithFiltersProps {
  projects: Project[];
}

const FILTER_CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "RESTAURANT", label: "RESTAURANT" },
  { id: "DAYCARE", label: "DAYCARE" },
  { id: "MEDICAL", label: "MEDICAL" },
] as const;

type FilterId = (typeof FILTER_CATEGORIES)[number]["id"];

function isProjectInCategory(project: Project, categoryId: FilterId): boolean {
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

export function ProjectsGridWithFilters({ projects }: ProjectsGridWithFiltersProps) {
  const [activeTab, setActiveTab] = useState<FilterId>("ALL");

  const filtered = useMemo(() => {
    return projects.filter((p) => isProjectInCategory(p, activeTab));
  }, [projects, activeTab]);

  return (
    <div>
      {/* 4 Interactive Category Filter Buttons in Exact Order */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        {FILTER_CATEGORIES.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer border \${
              activeTab === tab.id
                ? "bg-[#C89552] border-[#C89552] text-white shadow-lg"
                : "bg-[#0B2025]/80 border-white/10 text-slate-300 hover:text-white hover:border-[#C89552]/60"
            }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Matching Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((project, idx) => (
          <ProjectCard key={project.slug} project={project} priority={idx < 4} />
        ))}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('D:/kiaan/steelage/src/components/projects/ProjectsGridWithFilters.tsx', content, 'utf8');
console.log('Successfully written clean ProjectsGridWithFilters.tsx');
