export type CourseStatusValue = 'Published' | 'Draft' | 'Archived'
export type LessonStatus = 'Completed' | 'In Progress' | 'Not Started'
export type AssessmentType = 'Assignment' | 'Quiz' | 'Project'

export interface CourseInstructor {
  id: string
  name: string
  email: string
  avatar: string
}

export interface CourseLesson {
  id: string
  title: string
  module: string
  thumbnail: string
  status: LessonStatus
  learners: number
  progress: number
  completionRate: string
  assessmentCompletion: string
  passRate: string
}

export interface CourseAssessment {
  id: string
  name: string
  type: AssessmentType
  courseId: string
  passRate: string
  averageScore: string
  assessmentCompletion: string
}

export interface CourseCertificate {
  id: string
  title: string
  code: string
  thumbnail: string
  learners: number
  issued: number
  pending: number
  ineligible: number | null
}

export interface AdminCourse {
  id: string
  title: string
  description: string
  thumbnail: string
  instructor: CourseInstructor
  status: CourseStatusValue
  enrollees: number
  created: string
  createdLong: string
  duration: string
  cohort: string
  lessonCount: number
  moduleCount: number
  learningOutcomes: string
  lessons: CourseLesson[]
  assessments: CourseAssessment[]
  certificates: CourseCertificate[]
}

export interface CourseOverviewStats {
  totalCourses: { value: number; delta: string; caption: string }
  totalPublished: { value: number; delta: string; caption: string }
  totalDraft: { value: number; delta: string; caption: string }
  totalArchived: { value: number; delta: string; caption: string }
}
