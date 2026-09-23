import { useMemo, useState } from "react";
import { ArrowLeft2, SearchNormal1, Sort } from "iconsax-react";
import type { Cohort, Course } from "../../types";
import CourseCard from "./CourseCard";

type CategoryTab = "all" | Course["category"];

const tabs: { id: CategoryTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "coding" as const, label: "Coding" },
  { id: "design" as const, label: "Design" },
  { id: "business" as const, label: "Business" },
  { id: "marketing" as const, label: "Marketing" },
  { id: "personal-development" as const, label: "Personal Development" },
];

interface CohortExplorerProps {
  cohort: Cohort;
  courses: Course[];
  onGoBack: () => void;
  onEnroll: (course: Course) => void;
}

export default function CohortExplorer({ cohort, courses, onGoBack, onEnroll }: CohortExplorerProps) {
  const [activeTab, setActiveTab] = useState<CategoryTab>("all");
  const [query, setQuery] = useState("");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesTab = activeTab === "all" || course.category === activeTab;
      const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [courses, activeTab, query]);

  return (
    <div>
      <button
        onClick={onGoBack}
        className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
      >
        <ArrowLeft2 size={16} color="#000000" />
        Go back
      </button>

      <h1 className="mt-6 text-2xl font-bold text-primary">{cohort.name.replace(" Cohort", " Cohort")}</h1>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-slate-900">All Tracks</h2>
          <p className="text-sm text-slate-500">Expand your skills. Build your future.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchNormal1
              color="#34C759 "
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search tracks, skills, or instructors..."
              className="w-72 rounded-full border border-slate-200 text-black py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Sort size={16} color="#34C759 " />
            Sort By: <span className="font-semibold text-slate-900">Most Popular</span>
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-6 border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} onEnroll={onEnroll} />
        ))}
      </div>
    </div>
  );
}
