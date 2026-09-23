import type {
  AdminCourse,
  CourseAssessment,
  CourseInstructor,
  CourseOverviewStats,
} from '../types/course'

const thumb = (n: number) => `/courses/course-${n}.png`

export const instructors: CourseInstructor[] = [
  { id: 'ogundele-isaac', name: 'Ogundele Isaac', email: 'isaac@trueminds.com', avatar: '/james.jpg' },
  { id: 'matthew-coker', name: 'Matthew Coker', email: '.mattc@trueminds.com', avatar: '/courses/instructor-matthew.png' },
  { id: 'abdul-femi', name: 'Abdul FEmi', email: 'abdul@trueminds.com', avatar: '/supon.png' },
  { id: 'ngozi-favour', name: 'Ngozi Favour', email: 'ngozif@trueminds.com', avatar: '/rita.png' },
  { id: 'john-akike', name: 'John Akike', email: 'johna@trueminds.com', avatar: '/avatar.png' },
  { id: 'trueminds-innovation', name: 'Trueminds INNovation', email: 'admin@trueminds.com', avatar: '/james.jpg' },
]

const findInstructor = (id: string) =>
  instructors.find((i) => i.id === id) ?? instructors[0]

const DEFAULT_OUTCOMES = `By the end of this course, learners will be able to:
• Understand UX research principles.
• Conduct basic user research.
• Analyze research findings.
• Present actionable insights.`

const buildLessons = (courseId: string, startThumb: number) => [
  {
    id: `${courseId}-l1`,
    title: 'Introduction to UI/UX',
    module: 'Module 1',
    thumbnail: thumb(startThumb),
    status: 'Completed' as const,
    learners: 102,
    progress: 100,
    completionRate: '98%',
    assessmentCompletion: '96%',
    passRate: '67%',
  },
  {
    id: `${courseId}-l2`,
    title: 'Design System',
    module: 'Module 2',
    thumbnail: thumb(startThumb + 1),
    status: 'In Progress' as const,
    learners: 67,
    progress: 75,
    completionRate: '90%',
    assessmentCompletion: '96%',
    passRate: '45%',
  },
  {
    id: `${courseId}-l3`,
    title: 'Components & variables',
    module: 'Module 2',
    thumbnail: thumb(startThumb + 2),
    status: 'In Progress' as const,
    learners: 34,
    progress: 60,
    completionRate: '84%',
    assessmentCompletion: '90%',
    passRate: '67%',
  },
  {
    id: `${courseId}-l4`,
    title: 'UI/UX Research',
    module: 'Module 5',
    thumbnail: thumb(startThumb + 3),
    status: 'Not Started' as const,
    learners: 0,
    progress: 0,
    completionRate: '-',
    assessmentCompletion: '-',
    passRate: '-',
  },
]

const buildAssessments = (courseId: string): CourseAssessment[] => [
  { id: `${courseId}-a1`, name: 'Design Essentials', type: 'Assignment', courseId, passRate: '65%', averageScore: '67%', assessmentCompletion: '56%' },
  { id: `${courseId}-a2`, name: 'Wireframe Challenge', type: 'Quiz', courseId, passRate: '87%', averageScore: '90%', assessmentCompletion: '96%' },
  { id: `${courseId}-a3`, name: 'Components', type: 'Project', courseId, passRate: '77%', averageScore: '84%', assessmentCompletion: '90%' },
  { id: `${courseId}-a4`, name: 'High-Fidelity Designs', type: 'Quiz', courseId, passRate: '56%', averageScore: '45%', assessmentCompletion: '67%' },
  { id: `${courseId}-a5`, name: 'Low-Fidelity Prototyping', type: 'Quiz', courseId, passRate: '56%', averageScore: '78%', assessmentCompletion: '67%' },
]

interface RawCourse {
  id: string
  title: string
  description: string
  instructorId: string
  status: AdminCourse['status']
  enrollees: number
  thumbIndex: number
  cohort: string
  lessonCount: number
  moduleCount: number
}

const raw: RawCourse[] = [
  { id: 'intro-basic-computer', title: 'Introduction to  Basic Computer app..', description: 'A 21st century essential course.', instructorId: 'ogundele-isaac', status: 'Published', enrollees: 200, thumbIndex: 1, cohort: 'Cohort 2B', lessonCount: 25, moduleCount: 5 },
  { id: 'intro-frontend-dev', title: 'Introduction to Front End Development', description: 'Learn the users interface development', instructorId: 'matthew-coker', status: 'Draft', enrollees: 245, thumbIndex: 2, cohort: 'Cohort 1A', lessonCount: 40, moduleCount: 34 },
  { id: 'graphic-design-basics', title: 'GRaphic Design Bssics', description: 'Essential graphic design course', instructorId: 'abdul-femi', status: 'Archived', enrollees: 102, thumbIndex: 3, cohort: 'Cohort 3A', lessonCount: 25, moduleCount: 40 },
  { id: 'web-dev-essentials', title: 'Web Development ESsentials', description: 'Learn the basics of web dev', instructorId: 'ngozi-favour', status: 'Published', enrollees: 99, thumbIndex: 4, cohort: 'Cohort 2B', lessonCount: 25, moduleCount: 7 },
  { id: 'time-management', title: 'Time Mangement', description: 'Manage your time in a busy life.', instructorId: 'john-akike', status: 'Draft', enrollees: 367, thumbIndex: 5, cohort: 'Cohort 1A', lessonCount: 40, moduleCount: 3 },
  { id: 'understanding-tf-lms', title: 'Understanidng Talent Faculty LMS', description: 'All You need to know about TF', instructorId: 'trueminds-innovation', status: 'Published', enrollees: 2000, thumbIndex: 6, cohort: 'Cohort 3A', lessonCount: 25, moduleCount: 4 },
  { id: 'fundamentals-uiux', title: 'Fundamentals of UI/UX', description: 'Earn the fundamentals of UX research, from understanding user needs and selecting research methods to analyzing insights and presenting findings that support better design decisions.', instructorId: 'matthew-coker', status: 'Published', enrollees: 312, thumbIndex: 7, cohort: 'Cohort 2B', lessonCount: 25, moduleCount: 5 },
  { id: 'advanced-react-dev', title: 'Advanced React Development', description: 'Master modern React patterns and performance.', instructorId: 'matthew-coker', status: 'Published', enrollees: 154, thumbIndex: 8, cohort: 'Cohort 2B', lessonCount: 40, moduleCount: 3 },
  { id: 'data-analysis-python', title: 'Data Analysis with Python', description: 'Turn raw data into clear insight.', instructorId: 'ngozi-favour', status: 'Published', enrollees: 312, thumbIndex: 9, cohort: 'Cohort 1A', lessonCount: 30, moduleCount: 6 },
  { id: 'machine-learning', title: 'Machine Learning', description: 'Practical foundations of applied ML.', instructorId: 'abdul-femi', status: 'Draft', enrollees: 88, thumbIndex: 10, cohort: 'Cohort 3A', lessonCount: 25, moduleCount: 45 },
  { id: 'intro-python', title: 'Introduction to  Python D..', description: 'Start programming with Python.', instructorId: 'john-akike', status: 'Published', enrollees: 421, thumbIndex: 11, cohort: 'Cohort 2B', lessonCount: 40, moduleCount: 23 },
  { id: 'project-management', title: 'Project Management Essentials', description: 'Plan, execute and deliver with confidence.', instructorId: 'ogundele-isaac', status: 'Archived', enrollees: 76, thumbIndex: 12, cohort: 'Cohort 1A', lessonCount: 20, moduleCount: 4 },
]

export const courses: AdminCourse[] = raw.map((c) => ({
  id: c.id,
  title: c.title,
  description: c.description,
  thumbnail: thumb(c.thumbIndex),
  instructor: findInstructor(c.instructorId),
  status: c.status,
  enrollees: c.enrollees,
  created: '2/3/26',
  createdLong: 'January 23rd, 2026',
  duration: '1 month',
  cohort: c.cohort,
  lessonCount: c.lessonCount,
  moduleCount: c.moduleCount,
  learningOutcomes: DEFAULT_OUTCOMES,
  lessons: buildLessons(c.id, ((c.thumbIndex - 1) % 9) + 1),
  assessments: buildAssessments(c.id),
  certificates: [
    {
      id: `${c.id}-cert`,
      title: c.title,
      code: 'TF-CERT_BCA_TF-01-01-0001A',
      thumbnail: thumb(c.thumbIndex),
      learners: 312,
      issued: 200,
      pending: 112,
      ineligible: null,
    },
  ],
}))

export const getCourse = (id: string) => courses.find((c) => c.id === id)

export const courseOverviewStats: CourseOverviewStats = {
  totalCourses: { value: 102, delta: '+10', caption: 'This Month' },
  totalPublished: { value: 82, delta: '+4', caption: 'In last 7 days' },
  totalDraft: { value: 10, delta: '+2', caption: 'This Month' },
  totalArchived: { value: 10, delta: '+1', caption: 'This Month' },
}

/** Flattened assessments across every course, for the list page's Assessments table. */
export const allAssessments = courses.flatMap((course) =>
  course.assessments.map((a) => ({
    ...a,
    courseTitle: course.title,
    courseThumbnail: course.thumbnail,
    courseMeta: `${course.lessonCount} Lessons  ${course.moduleCount} Modules`,
  }))
)

export const courseDurations = ['1 week', '2 weeks', '1 month', '3 months', '6 months', '1 year']
export const cohortOptions = ['Cohort 1A', 'Cohort 2A', 'Cohort 2B', 'Cohort 3A']
