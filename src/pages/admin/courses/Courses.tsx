import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  BookOpen,
  BookCheck,
  FileClock,
  Archive,
  ChartColumnBig,
  BookPlus,
  ListFilter,
  Pencil,
  Trash2,
  Search,
  CheckCircle2,
} from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import StatCard from '../../../components/ui/admin/StatCard'
import Card from '../../../components/common/admin/Card'
import PageActionButton from '../../../components/common/admin/PageActionButton'
import FilterDropdown from '../../../components/ui/admin/FilterDropdown'
import StatusBadge from '../../../components/ui/admin/StatusBadge'
import Avatar from '../../../components/ui/admin/Avatar'
import Pagination from '../../../components/ui/admin/Pagination'
import ConfirmActionModal from '../../../components/modals/ConfirmActionModal'

import { courses as initialCourses, courseOverviewStats, allAssessments } from '../../../data/courses'
import type { AdminCourse, CourseStatusValue } from '../../../types/course'

type ActionModalState = { type: 'delete' | 'archive'; course: AdminCourse } | null

const statusOptions: CourseStatusValue[] = ['Published', 'Draft', 'Archived']
const assessmentTypeOptions = ['Assignment', 'Quiz', 'Project']

export default function Courses() {
  const navigate = useNavigate()

  const [courses, setCourses] = useState<AdminCourse[]>(initialCourses)

  // Course table state
  const [courseFilter, setCourseFilter] = useState<string | null>(null)
  const [instructorFilter, setInstructorFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(6)
  const [selected, setSelected] = useState<string[]>([])

  // Assessment table state
  const [assessmentType, setAssessmentType] = useState<string | null>(null)
  const [assessmentCourse, setAssessmentCourse] = useState<string | null>(null)
  const [assessmentSearch, setAssessmentSearch] = useState('')
  const [assessmentPage, setAssessmentPage] = useState(1)
  const [assessmentPageSize, setAssessmentPageSize] = useState(5)

  const [actionModal, setActionModal] = useState<ActionModalState>(null)
  const [toast, setToast] = useState<string | null>(null)

  const courseTitleOptions = useMemo(() => courses.map((c) => c.title), [courses])
  const instructorOptions = useMemo(
    () => Array.from(new Set(courses.map((c) => c.instructor.name))),
    [courses]
  )

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3500)
  }

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      if (courseFilter && c.title !== courseFilter) return false
      if (instructorFilter && c.instructor.name !== instructorFilter) return false
      if (statusFilter && c.status !== statusFilter) return false
      if (search && !`${c.title} ${c.description} ${c.instructor.name}`.toLowerCase().includes(search.toLowerCase())) {
        return false
      }
      return true
    })
  }, [courses, courseFilter, instructorFilter, statusFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const hasFilters = Boolean(courseFilter || instructorFilter || statusFilter || search)

  const clearFilters = () => {
    setCourseFilter(null)
    setInstructorFilter(null)
    setStatusFilter(null)
    setSearch('')
    setPage(1)
  }

  const filteredAssessments = useMemo(() => {
    return allAssessments.filter((a) => {
      if (assessmentType && a.type !== assessmentType) return false
      if (assessmentCourse && a.courseTitle !== assessmentCourse) return false
      if (assessmentSearch && !`${a.name} ${a.courseTitle}`.toLowerCase().includes(assessmentSearch.toLowerCase())) {
        return false
      }
      return true
    })
  }, [assessmentType, assessmentCourse, assessmentSearch])

  const assessmentTotalPages = Math.max(1, Math.ceil(filteredAssessments.length / assessmentPageSize))
  const assessmentCurrentPage = Math.min(assessmentPage, assessmentTotalPages)
  const assessmentRows = filteredAssessments.slice(
    (assessmentCurrentPage - 1) * assessmentPageSize,
    assessmentCurrentPage * assessmentPageSize
  )

  const hasAssessmentFilters = Boolean(assessmentType || assessmentCourse || assessmentSearch)

  const clearAssessmentFilters = () => {
    setAssessmentType(null)
    setAssessmentCourse(null)
    setAssessmentSearch('')
    setAssessmentPage(1)
  }

  const toggleAll = () => {
    if (selected.length === pageRows.length) setSelected([])
    else setSelected(pageRows.map((r) => r.id))
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleConfirmAction = () => {
    if (!actionModal) return
    const { type, course } = actionModal

    /**
     * Backend Integration
     *
     * type === 'delete'
     *   ? await courseService.deleteCourse(course.id)
     *   : await courseService.archiveCourse(course.id)
     */

    if (type === 'delete') {
      setCourses((prev) => prev.filter((c) => c.id !== course.id))
      showToast(`${course.title} has been deleted.`)
    } else {
      const nextStatus: CourseStatusValue = course.status === 'Archived' ? 'Published' : 'Archived'
      setCourses((prev) => prev.map((c) => (c.id === course.id ? { ...c, status: nextStatus } : c)))
      showToast(
        nextStatus === 'Archived'
          ? `${course.title} has been archived.`
          : `${course.title} has been restored.`
      )
    }

    setActionModal(null)
  }

  return (
    <AdminDashboardLayout title="Course Management" subtitle="Continue to monitor the courses">
      <div className="space-y-6 max-w-[1400px] mx-auto">
        {toast && (
          <div className="fixed top-6 right-6 z-[110] flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-3 shadow-lg animate-fade-in">
            <CheckCircle2 size={20} className="text-admin-primary shrink-0" />
            <p className="text-sm text-admin-ash-1">{toast}</p>
          </div>
        )}

        {/* Header actions */}
        <div className="flex justify-end gap-3 flex-wrap">
          <PageActionButton
            icon={<ChartColumnBig size={16} />}
            variant="outline"
            onClick={() => navigate('/admin/courses/reports')}
          >
            Generate Report
          </PageActionButton>
          <PageActionButton
            icon={<BookPlus size={16} />}
            variant="filled"
            onClick={() => navigate('/admin/courses/new')}
          >
            Create Course
          </PageActionButton>
        </div>

        {/* Course Overview */}
        <section className="rounded-2xl border border-admin-ash-7 p-5 space-y-4">
          <h2 className="text-base font-bold text-admin-ink">Course Overview</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              icon={<BookOpen size={18} />}
              tone="blue"
              label="Total Courses"
              value={courseOverviewStats.totalCourses.value}
              delta={courseOverviewStats.totalCourses.delta}
              period={courseOverviewStats.totalCourses.caption}
            />
            <StatCard
              icon={<BookCheck size={18} />}
              tone="green"
              label="Total Published"
              value={courseOverviewStats.totalPublished.value}
              delta={courseOverviewStats.totalPublished.delta}
              period={courseOverviewStats.totalPublished.caption}
            />
            <StatCard
              icon={<FileClock size={18} />}
              tone="orange"
              label="Total Draft"
              value={courseOverviewStats.totalDraft.value}
              delta={courseOverviewStats.totalDraft.delta}
              period={courseOverviewStats.totalDraft.caption}
            />
            <StatCard
              icon={<Archive size={18} />}
              tone="red"
              label="Total Archived"
              value={courseOverviewStats.totalArchived.value}
              delta={courseOverviewStats.totalArchived.delta}
              period={courseOverviewStats.totalArchived.caption}
            />
          </div>
        </section>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-wrap">
          <div className="flex items-center bg-admin-ash-7/60 rounded-full px-4 py-2.5 w-full lg:w-80 shrink-0">
            <Search size={16} className="text-admin-ash-3 mr-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search users, courses or lessons..."
              className="bg-transparent text-sm text-admin-ink placeholder:text-admin-ash-4 outline-none w-full min-w-0"
            />
          </div>

          <FilterDropdown label="Courses" value={courseFilter} options={courseTitleOptions} onChange={(v) => { setCourseFilter(v); setPage(1) }} />
          <FilterDropdown label="Instructor" value={instructorFilter} options={instructorOptions} onChange={(v) => { setInstructorFilter(v); setPage(1) }} />
          <FilterDropdown label="Status" value={statusFilter} options={statusOptions} onChange={(v) => { setStatusFilter(v); setPage(1) }} />

          <button
            onClick={clearFilters}
            disabled={!hasFilters}
            className="flex items-center gap-2 rounded-xl border border-admin-ash-6 bg-white px-3 py-2.5 text-sm font-medium text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear filter <ListFilter size={15} />
          </button>
        </div>

        {/* Courses table */}
        <div className="bg-white overflow-x-auto border border-admin-ash-7 rounded-xl">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                <th className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={pageRows.length > 0 && selected.length === pageRows.length}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded accent-admin-primary"
                  />
                </th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Course</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Instructor</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Status</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Enrollees</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Created</th>
                <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-ash-7">
              {pageRows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => navigate(`/admin/courses/${row.id}`)}
                  className="hover:bg-admin-ash-7/20 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selected.includes(row.id)}
                      onChange={() => toggleOne(row.id)}
                      className="h-4 w-4 rounded accent-admin-primary"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 min-w-[240px]">
                      <img src={row.thumbnail} alt={row.title} className="h-10 w-10 rounded-full object-cover shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-admin-ink">{row.title}</p>
                        <p className="text-xs text-admin-ash-3">{row.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3 min-w-[160px]">
                      <Avatar name={row.instructor.name} src={row.instructor.avatar} />
                      <span className="text-sm text-admin-ash-1">{row.instructor.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-3 py-3 text-sm text-admin-ash-1">{row.enrollees}</td>
                  <td className="px-3 py-3 text-sm text-admin-ash-1">{row.created}</td>
                  <td className="px-3 pr-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/courses/${row.id}/edit`)}
                        className="text-admin-info hover:opacity-70 transition-opacity"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setActionModal({ type: 'archive', course: row })}
                        className="text-admin-secondary hover:opacity-70 transition-opacity"
                        title={row.status === 'Archived' ? 'Restore' : 'Archive'}
                      >
                        <Archive size={16} />
                      </button>
                      <button
                        onClick={() => setActionModal({ type: 'delete', course: row })}
                        className="text-admin-danger hover:opacity-70 transition-opacity"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-admin-ash-3">
                    No courses match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          showingFrom={filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          showingTo={Math.min(currentPage * pageSize, filtered.length)}
          totalCount={filtered.length}
          pageSize={pageSize}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1) }}
        />
        <p className="text-xs text-admin-ash-3 -mt-4">
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} courses
        </p>

        {/* Assessments */}
        <Card title="Assessments" bodyClassName="!px-0 !pb-0">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 flex-wrap px-5 pt-3 pb-4">
            <div className="flex items-center bg-admin-ash-7/60 rounded-full px-4 py-2.5 w-full lg:w-72 shrink-0">
              <Search size={16} className="text-admin-ash-3 mr-2 shrink-0" />
              <input
                type="text"
                value={assessmentSearch}
                onChange={(e) => {
                  setAssessmentSearch(e.target.value)
                  setAssessmentPage(1)
                }}
                placeholder="Search users, courses or lessons..."
                className="bg-transparent text-sm text-admin-ink placeholder:text-admin-ash-4 outline-none w-full min-w-0"
              />
            </div>

            <FilterDropdown label="Types" value={assessmentType} options={assessmentTypeOptions} onChange={(v) => { setAssessmentType(v); setAssessmentPage(1) }} />
            <FilterDropdown label="Courses" value={assessmentCourse} options={courseTitleOptions} onChange={(v) => { setAssessmentCourse(v); setAssessmentPage(1) }} />

            <button
              onClick={clearAssessmentFilters}
              disabled={!hasAssessmentFilters}
              className="flex items-center gap-2 rounded-xl border border-admin-ash-6 bg-white px-3 py-2.5 text-sm font-medium text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear filter <ListFilter size={15} />
            </button>
          </div>

          <div className="overflow-x-auto border-t border-admin-ash-7">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead>
                <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                  <th className="px-5 py-3.5 text-sm font-semibold text-admin-ink">Assignment</th>
                  <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Type</th>
                  <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Course</th>
                  <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Pass Rate</th>
                  <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Average Score</th>
                  <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Assessment Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-ash-7">
                {assessmentRows.map((a) => (
                  <tr key={a.id} className="hover:bg-admin-ash-7/20 transition-colors">
                    <td className="px-5 py-3 text-sm text-admin-ink">{a.name}</td>
                    <td className="px-3 py-3 text-sm text-admin-ash-1">{a.type}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3 min-w-[220px]">
                        <img src={a.courseThumbnail} alt={a.courseTitle} className="h-10 w-10 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-sm text-admin-ink">{a.courseTitle}</p>
                          <p className="text-xs text-admin-ash-3">{a.courseMeta}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-sm text-admin-ash-1">{a.passRate}</td>
                    <td className="px-3 py-3 text-sm text-admin-ash-1">{a.averageScore}</td>
                    <td className="px-3 pr-5 py-3 text-sm text-admin-ash-1">{a.assessmentCompletion}</td>
                  </tr>
                ))}

                {assessmentRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-admin-ash-3">
                      No assessments match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4">
            <Pagination
              page={assessmentCurrentPage}
              totalPages={assessmentTotalPages}
              onPageChange={setAssessmentPage}
              showingFrom={filteredAssessments.length === 0 ? 0 : (assessmentCurrentPage - 1) * assessmentPageSize + 1}
              showingTo={Math.min(assessmentCurrentPage * assessmentPageSize, filteredAssessments.length)}
              totalCount={filteredAssessments.length}
              pageSize={assessmentPageSize}
              onPageSizeChange={(size) => { setAssessmentPageSize(size); setAssessmentPage(1) }}
            />
            <p className="text-xs text-admin-ash-3 mt-2">
              Showing {filteredAssessments.length === 0 ? 0 : (assessmentCurrentPage - 1) * assessmentPageSize + 1} to{' '}
              {Math.min(assessmentCurrentPage * assessmentPageSize, filteredAssessments.length)} of{' '}
              {filteredAssessments.length} Assessments
            </p>
          </div>
        </Card>
      </div>

      <ConfirmActionModal
        open={actionModal?.type === 'delete'}
        tone="danger"
        title="Are You Sure?"
        description={`You are about to permanently delete ${actionModal?.course.title ?? ''} course. Deleted items cannot be recovered!`}
        confirmLabel="Yes, Delete!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />

      <ConfirmActionModal
        open={actionModal?.type === 'archive'}
        tone="warning"
        title="Are You Sure?"
        description={
          actionModal?.course.status === 'Archived'
            ? `You are about to restore ${actionModal.course.title}. It will become visible to learners again!`
            : `You are about to archive ${actionModal?.course.title ?? ''} Course. Archived items can be recovered!`
        }
        confirmLabel={actionModal?.course.status === 'Archived' ? 'Yes, Restore!' : 'Yes, Archive!'}
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />
    </AdminDashboardLayout>
  )
}
