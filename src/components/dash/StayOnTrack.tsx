import type { UpcomingItem } from "../../types";

interface ListPanelProps {
  title: string;
  items: UpcomingItem[];
}

function ListPanel({ title, items }: ListPanelProps) {
  return (
    <div className="flex-1 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900">{title}</h3>
        <button className="text-sm font-medium text-slate-400 hover:text-primary">
          View All
        </button>
      </div>

      <ul className="mt-4 divide-y divide-slate-100">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-3 first:pt-0">
            <span className="text-sm text-slate-700">{item.title}</span>
            <span className="text-right text-sm">
              <span className="block font-medium text-slate-800">{item.dueLabel}</span>
              {item.meta && <span className="block text-xs text-slate-400">{item.meta}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface StayOnTrackProps {
  assignments: UpcomingItem[];
  assessments: UpcomingItem[];
}

export default function StayOnTrack({ assignments, assessments }: StayOnTrackProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900">Stay on Track</h2>
      <p className="mt-1 text-sm text-slate-500">
        You have assignments and assessments coming up. Stay prepared!
      </p>

      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        <ListPanel title="Upcoming Assignments" items={assignments} />
        <ListPanel title="Upcoming Assessments" items={assessments} />
      </div>
    </section>
  );
}
