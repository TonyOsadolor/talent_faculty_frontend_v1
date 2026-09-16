import React, { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronRight, CheckCircle2 } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import { getCourse, instructors, courseDurations, cohortOptions } from '../../../data/courses'

const DESCRIPTION_LIMIT = 150
const OUTCOMES_LIMIT = 150

export default function EditCourse() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id

  const existing = useMemo(() => (id ? getCourse(id) : undefined), [id])

  const [title, setTitle] = useState(existing?.title ?? '')
  const [description, setDescription] = useState(existing?.description ?? '')
  const [outcomes, setOutcomes] = useState(existing?.learningOutcomes ?? '')
  const [duration, setDuration] = useState(existing?.duration ?? '')
  const [cohort, setCohort] = useState(existing?.cohort ?? '')
  const [instructorId, setInstructorId] = useState(existing?.instructor.id ?? '')

  const [savedToast, setSavedToast] = useState(false)

  const isDirty = useMemo(() => {
    if (!isEdit || !existing) return true

    return (
      title !== existing.title ||
      description !== existing.description ||
      outcomes !== existing.learningOutcomes ||
      duration !== existing.duration ||
      cohort !== existing.cohort ||
      instructorId !== existing.instructor.id
    )
  }, [isEdit, existing, title, description, outcomes, duration, cohort, instructorId])

  const canSubmit =
    !!title.trim() &&
    !!description.trim() &&
    !!duration &&
    !!instructorId &&
    (!isEdit || isDirty)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    /**
     * Backend Integration
     *
     * isEdit
     *   ? await courseService.updateCourse(id, { title, description, outcomes, duration, cohort, instructorId })
     *   : await courseService.createCourse({ title, description, outcomes, duration, cohort, instructorId })
     */

    setSavedToast(true)
  }

  const fieldClass =
    'w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary placeholder:text-admin-ash-4'

  return (
    <AdminDashboardLayout
      title={isEdit ? 'Edit Course' : 'Create Course'}
      subtitle={isEdit ? 'Edit  and update a course.' : 'Create and publish a new course.'}
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/admin/courses" className="text-admin-primary font-semibold hover:underline">
              Courses
            </Link>
            <ChevronRight size={14} className="text-admin-ash-4" />
            <ChevronRight size={14} className="text-admin-ash-4 -ml-2.5" />
            <span className="font-semibold text-admin-ink">{isEdit ? 'Edit Course' : 'Create Course'}</span>
          </div>

          {savedToast && (
            <div className="flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-2.5 text-sm font-medium text-admin-ink shadow-sm animate-fade-in">
              <CheckCircle2 size={18} className="text-admin-primary shrink-0" />
              Changes successfully saved.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <h2 className="text-lg font-semibold text-admin-ink">Course details</h2>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Course Title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter course title"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Course description</label>
            <textarea
              required
              rows={5}
              maxLength={DESCRIPTION_LIMIT}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this course covers"
              className={`${fieldClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-admin-ash-3">
              {description.length}/{DESCRIPTION_LIMIT}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Learning outcomes</label>
            <textarea
              rows={5}
              maxLength={OUTCOMES_LIMIT}
              value={outcomes}
              onChange={(e) => setOutcomes(e.target.value)}
              placeholder="What will learners be able to do?"
              className={`${fieldClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-admin-ash-3">
              {outcomes.length}/{OUTCOMES_LIMIT}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Course duration</label>
            <select
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={fieldClass}
            >
              <option value="">Select duration</option>
              {courseDurations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Cohort Assigned</label>
            <select value={cohort} onChange={(e) => setCohort(e.target.value)} className={fieldClass}>
              <option value="">Select cohort</option>
              {cohortOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-admin-ink mb-1.5">Instructor</label>
            <select
              required
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              className={fieldClass}
            >
              <option value="">Select instructor</option>
              {instructors.map((i) => (
                <option key={i.id} value={i.id}>{i.name}</option>
              ))}
            </select>
          </div>

          {savedToast ? (
            <div className="flex justify-center pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/courses')}
                className="px-8 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
              >
                Back to Courses
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/admin/courses')}
                className="px-8 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="px-8 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEdit ? 'Save changes' : 'Create Course'}
              </button>
            </div>
          )}
        </form>
      </div>
    </AdminDashboardLayout>
  )
}
