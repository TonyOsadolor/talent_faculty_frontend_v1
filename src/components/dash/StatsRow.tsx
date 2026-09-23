import type { StudentStats } from "../../types";

interface StatCardProps {
  label: string;
  value: string;
  tone: "green" | "purple" | "red" | "blue" | "orange";
}

const toneClasses: Record<StatCardProps["tone"], { bg: string; label: string; value: string }> = {
  green: { bg: "bg-primary", label: "text-primary-500", value: "text-white" },
  purple: { bg: "bg-purple-50", label: "text-purple-600", value: "text-purple-600" },
  red: { bg: "bg-red-50", label: "text-red-500", value: "text-red-500" },
  blue: { bg: "bg-blue-50", label: "text-blue-600", value: "text-blue-600" },
  orange: { bg: "bg-orange-50", label: "text-orange-500", value: "text-orange-500" },
};

function StatCard({ label, value, tone }: StatCardProps) {
  const classes = toneClasses[tone];
  return (
    <div className={`flex-1 rounded-2xl ${classes.bg} px-5 py-4`}>
      <p className={`text-sm font-medium ${classes.label}`}>{label}</p>
      <p className={`mt-1 text-2xl font-bold ${classes.value}`}>{value}</p>
    </div>
  );
}

export default function StatsRow({ stats }: { stats: StudentStats }) {
  return (
    <div className="flex flex-wrap gap-4">
      <StatCard label="Overall Progress" value={`${stats.overallProgress}%`} tone="green" />
      <StatCard label="Present Cohort" value={stats.presentCohort} tone="purple" />
      <StatCard label="Pending Assignments" value={String(stats.pendingAssignments)} tone="red" />
      <StatCard label="Assessment Average" value={`${stats.assessmentAverage}%`} tone="blue" />
      <StatCard
        label="Learning Streak"
        value={`${stats.learningStreakDays} Day${stats.learningStreakDays === 1 ? "" : "s"}`}
        tone="orange"
      />
    </div>
  );
}
