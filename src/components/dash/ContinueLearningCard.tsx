import type { ActiveCourse } from "../../types";

interface ContinueLearningCardProps {
  course: ActiveCourse;
  started: boolean; // false => "Start Course", true => "Resume Course"
  onAction?: () => void;
}

export default function ContinueLearningCard({
  course,
  started,
  onAction,
}: ContinueLearningCardProps) {
  return (
    <section>
      <h2 className="text-lg font-bold text-slate-900">Continue Learning</h2>
      <p className="mt-1 text-sm text-slate-500">
        Pick up where you left off and continue progressing through your active courses.
      </p>

      <div className="mt-4 w-72 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="h-36 w-full rounded-xl object-cover"
        />
        <h3 className="mt-4 font-semibold text-slate-900">{course.title}</h3>

        <div className="mt-3 flex items-center gap-2">
          <img
            src={course.instructorAvatarUrl}
            alt={course.instructorName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-800">{course.instructorName}</p>
            <p className="text-xs text-slate-400">Instructor</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-primary"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-xs font-medium text-primary">{course.progress}%</span>
        </div>

        <button
          onClick={onAction}
          className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary"
        >
          {started ? "Resume Course" : "Start Course"}
        </button>
      </div>
    </section>
  );
}
