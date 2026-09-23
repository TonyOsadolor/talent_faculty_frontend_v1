import { Heart, Book1 } from "iconsax-react";
import type { Course } from "../../types";

interface CourseCardProps {
  course: Course;
  onEnroll: (course: Course) => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="relative">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="h-40 w-full rounded-xl object-cover"
        />
        <button
          aria-label="Save course"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-400 hover:text-red-500"
        >
          <Heart size={16} variant="Bold" />
        </button>
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{course.title}</h3>
      <hr className="my-3 border-dashed border-slate-200" />

      <p className="text-sm font-semibold text-slate-800">Course Outline</p>
      <ul className="mt-2 space-y-2">
        {course.outline.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-slate-500">
            <Book1 size={16} className="mt-0.5 shrink-0 text-slate-400" />
            {point}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm font-semibold text-slate-800">Course Instructor</p>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
        <div className="flex items-center gap-2">
          <img
            src={course.instructorAvatarUrl}
            alt={course.instructorName}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-slate-800">{course.instructorName}</p>
            <p className="text-xs text-slate-400">{course.instructorRole}</p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-amber-500">
         {course.instructorRating}
        </span>
      </div>

      <button
        onClick={() => onEnroll(course)}
        className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary"
      >
        Enroll Now
      </button>
    </div>
  );
}
