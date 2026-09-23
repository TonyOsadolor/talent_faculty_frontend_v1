import { Filter, Sort, ArrowRight3 } from "iconsax-react";
import type { Cohort } from "../../types";
import CohortCard from "./CohortCard";

interface FindNextCohortProps {
  cohorts: Cohort[];
  onCohortAction: (cohort: Cohort) => void;
  onExploreCohorts?: () => void;
  explorerDisabled?: boolean;
  /** ID of the cohort the user has already joined */
  joinedCohortId?: string | number;
  /** Called when user clicks "View Details" on their joined cohort */
  onViewDetails?: () => void;
}

export default function FindNextCohort({
  cohorts,
  onCohortAction,
  onExploreCohorts,
  explorerDisabled = false,
  joinedCohortId,
  onViewDetails,
}: FindNextCohortProps) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Find Your Next Learning Cohort</h2>
          <p className="mt-1 text-sm text-slate-500">
            Join a cohort, choose your track, and learn alongside other people building skills
            for the future.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Sort size={16} />
            Sort
          </button>
          <button
            onClick={onExploreCohorts}
            disabled={explorerDisabled || !onExploreCohorts}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity ${
              explorerDisabled || !onExploreCohorts
                ? "cursor-not-allowed bg-slate-200 text-slate-400 opacity-60"
                : "bg-primary text-white hover:bg-primary"
            }`}
          >
            <ArrowRight3 color={explorerDisabled || !onExploreCohorts ? "#94a3b8" : "#ffffff"} size={16} />
            Explore Cohorts
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {cohorts.map((cohort) => (
          <CohortCard
            key={cohort.id}
            cohort={cohort}
            onAction={onCohortAction}
            isJoined={cohort.id === joinedCohortId}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </section>
  );
}
