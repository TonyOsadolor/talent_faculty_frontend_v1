import type {
  ActiveCourse,
  Cohort,
  Course,
  StudentProfile,
  StudentStats,
  Track,
  UpcomingItem,
} from "../types";

export const student: StudentProfile = {
  name: "Samuel",
  avatarUrl: "/avatars/aduname-elizabeth.png",
};

export const returningStats: StudentStats = {
  overallProgress: 76,
  presentCohort: "Jan - Mar",
  pendingAssignments: 3,
  assessmentAverage: 88,
  learningStreakDays: 12,
};

export const newStudentStats: StudentStats = {
  overallProgress: 0,
  presentCohort: "Nil",
  pendingAssignments: 0,
  assessmentAverage: 0,
  learningStreakDays: 0,
};

export const activeCourse: ActiveCourse = {
  id: "uiux-fundamentals",
  title: "UI/UX Design Fundamentals",
  thumbnailUrl: "/courses/uiux-masterclass.jpg",
  instructorName: "Grace Johnson",
  instructorAvatarUrl: "/avatars/aduname-elizabeth.png",
  progress: 68,
};

export const upcomingAssignments: UpcomingItem[] = [
  { id: "a1", title: "Wireframe Mobile Banking", dueLabel: "Tomorrow" },
  { id: "a2", title: "User Research Report", dueLabel: "2nd May, 2024" },
  { id: "a3", title: "Design System Creation", dueLabel: "5th May, 2024" },
];

export const upcomingAssessments: UpcomingItem[] = [
  { id: "q1", title: "Design Thinking Quiz", dueLabel: "Tomorrow", meta: "10 mins" },
  { id: "q2", title: "UX Principles Test", dueLabel: "4th, May 2024", meta: "10 mins" },
];

export const cohorts: Cohort[] = [
  {
    id: "jan-mar",
    code: "COHORT 1",
    name: "January - March Cohort",
    description: "Start the year by building practical skills with a focused learning cohort",
    status: "completed",
  },
  {
    id: "apr-jun",
    code: "COHORT 2",
    name: "April - June Cohort",
    description: "Build practical skills and connect with other learners through guided learning",
    status: "upcoming",
    opensLabel: "Opens April 2027",
  },
  {
    id: "jul-sep",
    code: "COHORT 3",
    name: "July - September Cohort",
    description: "Your current opportunity to learn, build, and grow with your chosen track.",
    status: "in-session",
  },
  {
    id: "oct-dec",
    code: "COHORT 4",
    name: "October - December Cohort",
    description: "Get ready for the final learning cohort of the year.",
    status: "upcoming",
    opensLabel: "Opens October 2026",
  },
];

export const tracks: Track[] = [
  { id: "uiux", name: "UI/UX Design" },
  { id: "graphic-design", name: "Graphic Design" },
  { id: "video-editing", name: "Video Editing" },
  { id: "frontend", name: "Frontend Development" },
];

export const courses: Course[] = [
  {
    id: "graphic-design-fundamentals",
    title: "Graphic Design Fundamentals",
    thumbnailUrl: "/courses/graphic-design.jpg",
    category: "design",
    outline: [
      "Design Principles & Visual Hierarchy",
      "Typography & Font Pairing",
      "Colour Theory",
      "Social Media & Marketing Design",
    ],
    instructorName: "Grace Johnson",
    instructorRole: "Senior Visual Designer, Canva",
    instructorAvatarUrl: "/avatars/aduname-elizabeth.png",
    instructorRating: 4.9,
  },
  {
    id: "uiux-masterclass",
    title: "UI/UX Design Masterclass",
    thumbnailUrl: "/courses/uiux-masterclass.jpg",
    category: "design",
    outline: [
      "Introduction to UX Design",
      "User Research & Personas",
      "User Flows & Information Architecture",
      "Wireframing",
    ],
    instructorName: "Grace Johnson",
    instructorRole: "Senior Visual Designer, Canva",
    instructorAvatarUrl: "/avatars/aduname-elizabeth.png",
    instructorRating: 4.9,
  },
  {
    id: "professional-video-editing",
    title: "Professional Video Editing",
    thumbnailUrl: "/courses/video-editing.jpg",
    category: "marketing",
    outline: [
      "Video Editing Fundamentals",
      "Storytelling & Visual Narrative",
      "Timeline & Cutting Techniques",
      "Colour Correction & Grading",
    ],
    instructorName: "Grace Johnson",
    instructorRole: "Senior Visual Designer, Canva",
    instructorAvatarUrl: "/avatars/aduname-elizabeth.png",
    instructorRating: 4.9,
  },
  {
    id: "affinity-designer-essentials",
    title: "Affinity Designer Essentials",
    thumbnailUrl: "/courses/affinity-designer.jpg",
    category: "design",
    outline: [
      "Getting Started with Affinity Designer",
      "Vector & Raster Workflows",
      "Shapes, Paths & Curves",
      "Typography & Layout",
    ],
    instructorName: "Grace Johnson",
    instructorRole: "Senior Visual Designer, Canva",
    instructorAvatarUrl: "/avatars/aduname-elizabeth.png",
    instructorRating: 4.9,
  },
];
