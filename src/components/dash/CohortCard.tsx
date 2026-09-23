import { ArrowRight2 } from "iconsax-react";
import type { Cohort } from "../../types";

const statusStyles: Record<Cohort["status"], string> = {
  "in-session": "bg-primary text-white",
  upcoming: "bg-orange-50 text-orange-500",
  completed: "bg-blue-50 text-blue-600",
};

const statusLabel: Record<Cohort["status"], string> = {
  "in-session": "IN SESSION",
  upcoming: "UPCOMING",
  completed: "COMPLETED",
};

const statusDot: Record<Cohort["status"], string> = {
  "in-session": "bg-white",
  upcoming: "bg-orange-400",
  completed: "bg-blue-500",
};

interface CohortCardProps {
  cohort: Cohort;
  onAction: (cohort: Cohort) => void;
  isJoined?: boolean;
  onViewDetails?: () => void;
}

export default function CohortCard({
  cohort,
  onAction,
  isJoined = false,
  onViewDetails,
}: CohortCardProps) {
  const isJoinable = cohort.status === "in-session" && !isJoined;
  const actionLabel = isJoined ? "View Details" : "Join Cohort";
  const canViewDetails = isJoined && !!onViewDetails;

  return (
    <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-slate-400">{cohort.code}</p>
      <h3 className="mt-2 text-lg font-bold text-slate-900">{cohort.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{cohort.description}</p>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="text-slate-400">Status:</span>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[cohort.status]}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusDot[cohort.status]}`} />
          {statusLabel[cohort.status]}
          {cohort.opensLabel && ` (${cohort.opensLabel})`}
        </span>
      </div>

      <button
        onClick={() => {
          if (canViewDetails) {
            onViewDetails?.();
            return;
          }

          if (isJoinable) {
            onAction(cohort);
          }
        }}
        disabled={!canViewDetails && !isJoinable}
        className={`mt-4 flex items-center gap-1 text-sm font-semibold ${canViewDetails || isJoinable ? "text-primary hover:text-primary" : "cursor-not-allowed text-slate-300"}`}
      >
        <ArrowRight2 size={14} color="#34C759 " />

        {actionLabel}
      </button>
    </div>
  );
}
