import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import StatusBadge from '../../../components/ui/admin/StatusBadge'
import Pagination from '../../../components/ui/admin/Pagination'
import { getCourse } from '../../../data/courses'
import type { LessonStatus } from '../../../types/course'

type TabKey = 'overview' | 'lessons' | 'assessments' | 'certificates'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'lessons', label: 'Lessons' },
  { key: 'assessments', label: 'Assessments' },
  { key: 'certificates', label: 'Certificates' },
]

const lessonStatusTone: Record<LessonStatus, string> = {
  Completed: 'bg-admin-success-light text-admin-success',
  'In Progress': 'bg-admin-info-light text-admin-info',
  'Not Started': 'bg-admin-ash-7 text-admin-ash-3',
}

const LessonPill: React.FC<{ status: LessonStatus }> = ({ status }) => (
  <span className={`inline-flex w-28 items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${lessonStatusTone[status]}`}>
    {status}
  </span>
)

export default function ViewCourse() {
  const navigate = useNavigate()
  const { id, tab } = useParams<{ id: string; tab?: string }>()
  const course = id ? getCourse(id) : undefined

  const [lessonPage, setLessonPage] = React.useState(1)
  const [assessmentPage, setAssessmentPage] = React.useState(1)

  const activeTab: TabKey = (['overview', 'lessons', 'assessments', 'certificates'] as TabKey[]).includes(
    tab as TabKey
  )
    ? (tab as TabKey)
    : 'overview'

  if (!course) {
    return (
      <AdminDashboardLayout title="Course not found">
        <div className="max-w-[1400px] mx-auto text-center py-20">
          <p className="text-admin-ash-3 mb-4">We couldn&apos;t find that course.</p>
          <Link to="/admin/courses" className="text-admin-primary font-semibold hover:underline">
            Back to Courses
          </Link>
        </div>
      </AdminDashboardLayout>
    )
  }

  const pageSize = 5
  const lessonTotalPages = Math.max(1, Math.ceil(course.lessons.length / pageSize))
  const pagedLessons = course.lessons.slice((lessonPage - 1) * pageSize, lessonPage * pageSize)

  const assessmentTotalPages = Math.max(1, Math.ceil(course.assessments.length / pageSize))
  const pagedAssessments = course.assessments.slice(
    (assessmentPage - 1) * pageSize,
    assessmentPage * pageSize
  )

  return (
    <AdminDashboardLayout>
      <div className="max-w-[1400px] w-full mx-auto space-y-6">
        <button
          onClick={() => navigate('/admin/courses')}
          className="flex items-center gap-1.5 text-sm font-semibold text-admin-ink hover:text-admin-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Courses
        </button>

        {/* Header */}
        <div className="rounded-2xl bg-admin-info-light/50 p-6 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 flex-1">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-24 w-24 rounded-full object-cover shrink-0"
            />
            <div className="shrink-0">
              <h1 className="text-xl font-bold text-admin-ink">{course.title}</h1>
              <p className="text-sm text-admin-ash-2 mt-3">{course.lessonCount} Lessons</p>
              <p className="text-sm text-admin-ash-2 mt-1.5">{course.moduleCount} Modules</p>
            </div>
            <p className="text-sm text-admin-ash-2 sm:max-w-sm lg:max-w-md sm:pl-2">{course.description}</p>
          </div>
          <button
            onClick={() => navigate(`/admin/courses/${course.id}/edit`)}
            className="px-6 py-2.5 rounded-xl border border-admin-ash-6 bg-white text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/40 transition-colors whitespace-nowrap shrink-0"
          >
            Edit Course
          </button>
        </div>

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 rounded-2xl bg-admin-ash-7/40 px-5 py-4">
          <StatusBadge status={course.status} />
          <span className="text-sm text-admin-ash-3">
            <span className="font-semibold text-admin-ink">Created:</span> {course.createdLong}
          </span>
          <span className="text-sm text-admin-ash-3">
            <span className="font-semibold text-admin-ink">Duration</span> {course.duration}
          </span>
          <span className="text-sm text-admin-ash-3">
            <span className="font-semibold text-admin-ink">Cohort</span> {course.cohort}
          </span>
        </div>

        {/* Instructors */}
        <Card title="Instructors">
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 rounded-xl border border-admin-ash-7 px-4 py-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="h-10 w-10 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-admin-ink">{course.instructor.name}</p>
                <p className="text-xs text-admin-ash-3">{course.instructor.email}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-admin-ash-7 text-sm font-semibold overflow-x-auto">
          {TABS.map((t) => (
            <Link
              key={t.key}
              to={`/admin/courses/${course.id}/view/${t.key}`}
              className={`pb-3 border-b-[3px] whitespace-nowrap transition-colors ${
                activeTab === t.key
                  ? 'border-admin-primary text-admin-primary'
                  : 'border-transparent text-admin-ash-3 hover:text-admin-ash-1'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <Card title="Course Overview">
            <div className="pt-2 space-y-6">
              <div>
                <p className="text-sm font-semibold text-admin-ink mb-1.5">Course description</p>
                <p className="text-sm text-admin-ash-2 leading-relaxed">{course.description}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-admin-ink mb-1.5">Learning outcomes</p>
                <p className="text-sm text-admin-ash-2 leading-relaxed whitespace-pre-line">
                  {course.learningOutcomes}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <div className="rounded-xl border border-admin-ash-7 p-4">
                  <p className="text-xs text-admin-ash-3">Enrollees</p>
                  <p className="text-lg font-bold text-admin-ink mt-1">{course.enrollees}</p>
                </div>
                <div className="rounded-xl border border-admin-ash-7 p-4">
                  <p className="text-xs text-admin-ash-3">Lessons</p>
                  <p className="text-lg font-bold text-admin-ink mt-1">{course.lessonCount}</p>
                </div>
                <div className="rounded-xl border border-admin-ash-7 p-4">
                  <p className="text-xs text-admin-ash-3">Modules</p>
                  <p className="text-lg font-bold text-admin-ink mt-1">{course.moduleCount}</p>
                </div>
                <div className="rounded-xl border border-admin-ash-7 p-4">
                  <p className="text-xs text-admin-ash-3">Assessments</p>
                  <p className="text-lg font-bold text-admin-ink mt-1">{course.assessments.length}</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Lessons */}
        {activeTab === 'lessons' && (
          <Card title="Lessons" bodyClassName="!px-0 !pb-0">
            <div className="overflow-x-auto border-t border-admin-ash-7 mt-2">
              <table className="w-full min-w-[860px] border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                    <th className="px-5 py-3.5 text-sm font-semibold text-admin-ink">Lessons</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Status</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Learners</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink w-44">Progress</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Completion Rate</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Assessment Completion</th>
                    <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Pass Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {pagedLessons.map((lesson) => (
                    <tr key={lesson.id} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3 min-w-[200px]">
                          <img src={lesson.thumbnail} alt={lesson.title} className="h-10 w-10 rounded-full object-cover shrink-0" />
                          <div>
                            <p className="text-sm text-admin-ink">{lesson.title}</p>
                            <p className="text-xs text-admin-ash-3">{lesson.module}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3"><LessonPill status={lesson.status} /></td>
                      <td className="px-3 py-3 text-sm text-admin-ash-1">{lesson.learners}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                lesson.progress === 0
                                  ? 'bg-admin-danger'
                                  : lesson.progress === 100
                                    ? 'bg-admin-success'
                                    : 'bg-admin-info'
                              }`}
                              style={{ width: `${Math.max(lesson.progress, 3)}%` }}
                            />
                          </div>
                          <span className="text-xs text-admin-ash-3 shrink-0">{lesson.progress}%</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-sm text-admin-ash-1">{lesson.completionRate}</td>
                      <td className="px-3 py-3 text-sm text-admin-ash-1">{lesson.assessmentCompletion}</td>
                      <td className="px-3 pr-5 py-3 text-sm text-admin-ash-1">{lesson.passRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4">
              <Pagination
                page={lessonPage}
                totalPages={lessonTotalPages}
                onPageChange={setLessonPage}
                showingFrom={course.lessons.length === 0 ? 0 : (lessonPage - 1) * pageSize + 1}
                showingTo={Math.min(lessonPage * pageSize, course.lessons.length)}
                totalCount={course.lessonCount}
                pageSize={pageSize}
                onPageSizeChange={() => {}}
              />
              <p className="text-xs text-admin-ash-3 mt-2">
                Showing {course.lessons.length === 0 ? 0 : (lessonPage - 1) * pageSize + 1} to{' '}
                {Math.min(lessonPage * pageSize, course.lessons.length)} of {course.lessonCount} Lessons
              </p>
            </div>
          </Card>
        )}

        {/* Assessments */}
        {activeTab === 'assessments' && (
          <Card title="Assessments" bodyClassName="!px-0 !pb-0">
            <div className="overflow-x-auto border-t border-admin-ash-7 mt-2">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                    <th className="px-5 py-3.5 text-sm font-semibold text-admin-ink">Assessments</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Type</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Pass Rate</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Average Score</th>
                    <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Assessment Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {pagedAssessments.map((a) => (
                    <tr key={a.id} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className="px-5 py-3.5 text-sm text-admin-ink">{a.name}</td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{a.type}</td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{a.passRate}</td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{a.averageScore}</td>
                      <td className="px-3 pr-5 py-3.5 text-sm text-admin-ash-1">{a.assessmentCompletion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-5 py-4">
              <Pagination
                page={assessmentPage}
                totalPages={assessmentTotalPages}
                onPageChange={setAssessmentPage}
                showingFrom={course.assessments.length === 0 ? 0 : (assessmentPage - 1) * pageSize + 1}
                showingTo={Math.min(assessmentPage * pageSize, course.assessments.length)}
                totalCount={course.assessments.length}
                pageSize={pageSize}
                onPageSizeChange={() => {}}
              />
              <p className="text-xs text-admin-ash-3 mt-2">
                Showing {course.assessments.length === 0 ? 0 : (assessmentPage - 1) * pageSize + 1} to{' '}
                {Math.min(assessmentPage * pageSize, course.assessments.length)} of {course.assessments.length}{' '}
                Assessments
              </p>
            </div>
          </Card>
        )}

        {/* Certificates */}
        {activeTab === 'certificates' && (
          <Card title="Certificates" bodyClassName="!px-0 !pb-0">
            <div className="overflow-x-auto border-t border-admin-ash-7 mt-2">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                    <th className="px-5 py-3.5 text-sm font-semibold text-admin-ink">Certificates</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Learners</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Issued</th>
                    <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Pending</th>
                    <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Ineligible</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {course.certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3 min-w-[240px]">
                          <img src={cert.thumbnail} alt={cert.title} className="h-10 w-10 rounded-full object-cover shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-admin-ink">{cert.title}</p>
                            <p className="text-xs text-admin-ash-3">{cert.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{cert.learners}</td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{cert.issued}</td>
                      <td className="px-3 py-3.5 text-sm text-admin-ash-1">{cert.pending}</td>
                      <td className="px-3 pr-5 py-3.5 text-sm text-admin-ash-1">{cert.ineligible ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-6" />
          </Card>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
