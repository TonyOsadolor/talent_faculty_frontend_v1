export type UserRole = 'Learner' | 'Instructor' | 'Administrator'
export type UserStatus = 'Active' | 'Disabled' | 'Suspended'

export interface PermissionKey {
  key: 'courses' | 'cohorts' | 'assignments' | 'reports' | 'userManagement' | 'systemSettings'
  label: string
  description: string
}

export const PERMISSIONS: PermissionKey[] = [
  { key: 'courses', label: 'Courses', description: 'Create, manage and view courses' },
  { key: 'cohorts', label: 'Cohorts', description: 'Create, manage and view Cohorts' },
  { key: 'assignments', label: 'Assignments and Assessments', description: 'Create, and manage assignments' },
  { key: 'reports', label: 'Reports', description: 'View and export reports' },
  { key: 'userManagement', label: 'User Management', description: 'Add, edit and manage users' },
  { key: 'systemSettings', label: 'System Settings', description: 'Configure system settings.' },
]

export type PermissionMap = Record<PermissionKey['key'], boolean>

export interface AppUser {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  phone: string
  avatar: string
  role: UserRole
  cohort: string | null
  status: UserStatus
  permissions: PermissionMap
  bio: string
  joined: string
  lastLogin: string
  online: boolean
}

export interface CourseProgressRow {
  id: string
  title: string
  lessons: number
  modules: number
  status: 'Completed' | 'In Progress' | 'Not Started'
  learners: number
  cohort: string
  progress: number
  courseCompletion: string
  assessmentCompletion: string
  passRate: string
}

export interface InstructorCohortDetail {
  label: string
  cohort: string
  programType: string
  status: 'Active' | 'Upcoming' | 'Completed'
  startDate: string
  expectedCompletion: string
  completionRate: number
}

export interface ActivityRow {
  activity: string
  type: string
  time: string
}

export interface LearnerCourseRow {
  id: string
  title: string
  lessons: number
  modules: number
  instructor: string
  status: 'Completed' | 'In Progress'
  certificate: 'Issued' | 'Pending'
  courseCompletion: string
  assessmentCompletion: string
}

export interface LearnerAssessmentRow {
  id: string
  name: string
  type: 'Assignment' | 'Quiz' | 'Project'
  course: string
  courseMeta: string
  status: 'Completed' | 'Missed' | 'Submitted' | 'Pending'
  score: string
  dueDate: string
  attempts: string
}

export interface LearnerCertificateRow {
  id: string
  title: string
  instructor: string
  courseStatus: 'Completed' | 'In Progress'
  certificateStatus: 'Issued' | 'Pending'
  courseCompletion: string
  issuedDate: string
}

export interface InstructorProfileDetail {
  totalLearners: number
  cohorts: number
  totalCourses: number
  avgCompletionRate: string
  assessments: number
  passRate: string
  courses: CourseProgressRow[]
  cohortDetails: InstructorCohortDetail[]
  activities: ActivityRow[]
}

export interface LearnerProfileDetail {
  progress: number
  completionRate: number
  courses: LearnerCourseRow[]
  certificatesCount: number
  cohort: {
    name: string
    programType: string
    status: 'Active' | 'Upcoming' | 'Completed'
    enrolmentDate: string
    expectedCompletion: string
    completionRate: number
  }
  activities: ActivityRow[]
  assessments: LearnerAssessmentRow[]
  certificates: LearnerCertificateRow[]
}
