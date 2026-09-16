export interface PerformerSummary {
  name: string
  email: string
  score: string
  avatar: string
}

export interface TopLearnerRow {
  id: string
  name: string
  email: string
  avatar: string
  cohort: string
  assessmentScore: string
  assessmentCompletion: string
  attendance: string
  courseCompletion: number
  totalScore: string
}

export interface TopInstructorRow {
  id: string
  name: string
  email: string
  avatar: string
  activeCohorts: number
  activeCourses: number
  completionRate: number
  assessmentPerformance: string
  attendance: string
  totalScore: string
}

export interface EngagedCourseRow {
  id: string
  course: string
  courseProgress: string
  completionRate: number
  attendance: string
  assessmentParticipation: string
  totalScore: string
}

const AVATAR = '/messages/top-performer.png'

export const platformOverview = [
  { label: 'Total Users', value: '2,346', delta: '+120', period: 'This Month', tone: 'blue' as const },
  { label: 'Total Courses', value: '24', delta: '+4', period: 'This Month', tone: 'pink' as const },
  { label: 'Total Learners', value: '2,306', delta: '+118', period: 'This Month', tone: 'green' as const },
  { label: 'Total Mentors', value: '40', delta: '+2', period: 'This Month', tone: 'orange' as const },
  { label: 'Total Cohorts', value: '8', delta: '+0', period: 'This Month', tone: 'purple' as const },
]

export const platformActivities = [
  { title: 'Active Users', subtitle: 'User logged in now', value: 406 },
  { title: 'Active Cohorts', subtitle: 'Running Cohorts', value: 2 },
  { title: 'Active Courses', subtitle: 'Published Courses', value: 16 },
  { title: 'Courses Completed', subtitle: 'Total Completed', value: 14 },
  { title: 'Completion Rate', subtitle: 'Average Rate', value: '68%' },
  { title: 'Certificates Issued', subtitle: 'Total Generated', value: 800 },
  { title: 'Assessments Taken', subtitle: 'Total this week', value: 8 },
  { title: 'Average Score', subtitle: 'Assessment Taken', value: '84%' },
  { title: 'Assignments Submitted', subtitle: 'Total this week', value: 23 },
]

export const topInstructor: PerformerSummary = {
  name: 'Michael Coker',
  email: 'mich.c@trueminds.com',
  score: '98%',
  avatar: AVATAR,
}

export const topLearner: PerformerSummary = {
  name: 'Adaobi Adaeze',
  email: 'adaobi@gmail.com',
  score: '98%',
  avatar: AVATAR,
}

export const userRegistrations = [
  { month: 'Jan', instructors: 8, admins: 7, learners: 45 },
  { month: 'Feb', instructors: 11, admins: 5, learners: 42 },
  { month: 'March', instructors: 6, admins: 7, learners: 51 },
  { month: 'April', instructors: 4, admins: 6, learners: 22 },
]

export const totalRegisteredUsers = 2346

export const learnerStatus = [
  { name: 'Active Learners', value: 70, color: '#22C55E' },
  { name: 'Inactive/Pending Learners', value: 20, color: '#F9A825' },
  { name: 'Suspended Learners', value: 10, color: '#EF4444' },
]

export const assignmentStatus = [
  { name: 'Submitted', value: 55, color: '#3B82F6' },
  { name: 'Pending', value: 35, color: '#F9A825' },
  { name: 'Overdue', value: 10, color: '#EF4444' },
]

export const assessmentPerformance = [
  { course: 'Web Dev', score: 80 },
  { course: 'UI/UX Fund', score: 50 },
  { course: 'Graphic De', score: 66 },
  { course: 'Data Ana.', score: 88 },
  { course: 'Digital Mar.', score: 59 },
]

export const topLearners: TopLearnerRow[] = [
  { id: 'adaobi', name: 'Adaobi Adaeze', email: 'Adaobi@gmail.com', avatar: AVATAR, cohort: 'Genesis (1A)', assessmentScore: '100%', assessmentCompletion: '100%', attendance: '98%', courseCompletion: 100, totalScore: '98%' },
  { id: 'ifeoma', name: 'Ifeoma Eguaveon', email: 'sajah@trueminds.com', avatar: AVATAR, cohort: 'Gemini( 3A)', assessmentScore: '96%', assessmentCompletion: '90%', attendance: '98%', courseCompletion: 75, totalScore: '96%' },
  { id: 'abdusalam', name: 'Abdusalam Abubakar', email: 'mary.s@trueminds.com', avatar: AVATAR, cohort: 'Genesis (1A)', assessmentScore: '90%', assessmentCompletion: '84%', attendance: '94%', courseCompletion: 72, totalScore: '94%' },
  { id: 'ogundele', name: 'Ogundele Femi', email: 'femi.o@trueminds.com', avatar: AVATAR, cohort: 'Alpha (1B)', assessmentScore: '90%', assessmentCompletion: '80%', attendance: '100%', courseCompletion: 70, totalScore: '89%' },
  { id: 'hassan', name: 'Hassan Ahmed', email: 'hassa.a@trueminds.com', avatar: AVATAR, cohort: 'Beta (2B)', assessmentScore: '88%', assessmentCompletion: '78%', attendance: '88%', courseCompletion: 50, totalScore: '88%' },
]

export const cohortStatus = [
  { name: 'Completed', value: 4, percent: 50, color: '#22C55E' },
  { name: 'Active', value: 2, percent: 25, color: '#3B82F6' },
  { name: 'Upcoming', value: 2, percent: 25, color: '#F9A825' },
]

export const totalCohorts = 8

export const topCohortsByEnrollment = [
  { cohort: 'Cohort 2 Batch B', enrollees: 345 },
  { cohort: 'Cohort 2 Batch A', enrollees: 234 },
  { cohort: 'Cohort 1 Batch A', enrollees: 178 },
]

export const cohortEnrollmentTrend = [
  { month: 'Jan', learners: 70 },
  { month: 'Feb', learners: 150 },
  { month: 'Mar', learners: 145 },
  { month: 'Apr', learners: 170 },
  { month: 'May', learners: 225 },
]

export const certificateTrend = [
  { month: 'Jan', certificates: 60 },
  { month: 'Feb', certificates: 110 },
  { month: 'Mar', certificates: 155 },
  { month: 'Apr', certificates: 165 },
  { month: 'May', certificates: 205 },
]

export const topCoursesByEnrollment = [
  { course: 'Graphic Design Basics', enrollees: 200 },
  { course: 'Intro to Back-end Dev', enrollees: 176 },
  { course: 'UI/Ux Fundamentals', enrollees: 156 },
  { course: 'Web Development Boot..', enrollees: 123 },
  { course: 'Front-End Dev Essentials', enrollees: 98 },
]

export const completionRateByCourse = [
  { course: 'Web Development Boot..', rate: 80 },
  { course: 'Front-End Dev ESsentials', rate: 75 },
  { course: 'Intro to Back-end Dev', rate: 72 },
  { course: 'UI/Ux Fundamentals', rate: 70 },
  { course: 'Graphic Design Basics', rate: 50 },
]

export const mostEngagedCourses: EngagedCourseRow[] = [
  { id: 'uiux', course: 'UI/Ux Fundamentals', courseProgress: '91%', completionRate: 80, attendance: '95%', assessmentParticipation: '91%', totalScore: '96%' },
  { id: 'webdev', course: 'Web Development Boot..', courseProgress: '90%', completionRate: 75, attendance: '95%', assessmentParticipation: '90%', totalScore: '90%' },
  { id: 'frontend', course: 'Front-End Dev Essentials', courseProgress: '89%', completionRate: 72, attendance: '93%', assessmentParticipation: '89%', totalScore: '87%' },
  { id: 'backend', course: 'Intro to Back-end Dev', courseProgress: '80%', completionRate: 70, attendance: '80%', assessmentParticipation: '80%', totalScore: '80%' },
  { id: 'graphic', course: 'Graphic Design Basics', courseProgress: '80%', completionRate: 50, attendance: '89%', assessmentParticipation: '80%', totalScore: '78%' },
]

export const topInstructors: TopInstructorRow[] = [
  { id: 'michael', name: 'Michael Coker', email: 'mich.c@trueminds.com', avatar: AVATAR, activeCohorts: 3, activeCourses: 8, completionRate: 80, assessmentPerformance: '91%', attendance: '95%', totalScore: '96%' },
  { id: 'sarah', name: 'Sarah Johnson', email: 'sajah@trueminds.com', avatar: AVATAR, activeCohorts: 2, activeCourses: 6, completionRate: 75, assessmentPerformance: '90%', attendance: '95%', totalScore: '90%' },
  { id: 'mary', name: 'Mary Johnson', email: 'mary.s@trueminds.com', avatar: AVATAR, activeCohorts: 2, activeCourses: 6, completionRate: 72, assessmentPerformance: '89%', attendance: '93%', totalScore: '87%' },
  { id: 'ogundele-f', name: 'Ogundele Femi', email: 'femi.o@trueminds.com', avatar: AVATAR, activeCohorts: 2, activeCourses: 4, completionRate: 70, assessmentPerformance: '80%', attendance: '80%', totalScore: '80%' },
  { id: 'hassan-a', name: 'Hassan Ahmed', email: 'hassa.a@trueminds.com', avatar: AVATAR, activeCohorts: 1, activeCourses: 3, completionRate: 50, assessmentPerformance: '80%', attendance: '89%', totalScore: '78%' },
]

export const timeRangeOptions = ['This Month', 'This Year', 'All Time', 'Last 7 days']
