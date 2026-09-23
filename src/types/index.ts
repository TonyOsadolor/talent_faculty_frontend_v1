export interface StudentStats {
  overallProgress: number; // 0 - 100
  presentCohort: string; // e.g. "Jan - Mar" or "Nil"
  pendingAssignments: number;
  assessmentAverage: number; // 0 - 100
  learningStreakDays: number;
}

export interface ActiveCourse {
  id: string;
  title: string;
  thumbnailUrl: string;
  instructorName: string;
  instructorAvatarUrl: string;
  progress: number; // 0 - 100
}

export interface UpcomingItem {
  id: string;
  title: string;
  dueLabel: string; // "Tomorrow", "2nd May, 2024"
  meta?: string; // "10 mins" for assessments
}

export type CohortStatus = "in-session" | "upcoming" | "completed";

export interface Cohort {
  id: string;
  code: string; // "COHORT 1"
  name: string; // "January - March Cohort"
  description: string;
  status: CohortStatus;
  opensLabel?: string; // "Opens April 2027"
}

export interface Track {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnailUrl: string;
  category: "coding" | "design" | "business" | "marketing" | "personal-development";
  outline: string[];
  instructorName: string;
  instructorRole: string;
  instructorAvatarUrl: string;
  instructorRating: number;
}

export interface StudentProfile {
  name: string;
  avatarUrl: string;
}
