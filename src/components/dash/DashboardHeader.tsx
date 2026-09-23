import { SearchNormal1, Notification } from "iconsax-react";

interface DashboardHeaderProps {
  studentName: string;
  avatarUrl: string;
}

export default function DashboardHeader({ studentName, avatarUrl }: DashboardHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          Good Morning, {studentName} <span aria-hidden>ÃƒÂ°Ã…Â¸Ã¢â‚¬ËœÃ¢â‚¬Â¹</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Continue your learning journey and stay on track!
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchNormal1
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search courses or lessons..."
            className="w-64 rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button className="flex items-center gap-1 rounded-full">
          <img
            src={avatarUrl}
            alt={studentName}
            className="h-9 w-9 rounded-full object-cover"
          />
        </button>

        <button
          aria-label="Notifications"
          className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100"
        >
          <Notification size={20} />
        </button>
      </div>
    </div>
  );
}
