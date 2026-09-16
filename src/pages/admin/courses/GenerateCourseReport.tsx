import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Check, Search, Download } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import ExportFormatPanel, { type ExportFormat } from '../../../components/ui/admin/users/ExportFormatPanel'
import { instructors, cohortOptions } from '../../../data/courses'

const DATA_FIELDS = [
  { key: 'basic', label: 'Basic Information', description: 'Course name, code, description, etc' },
  { key: 'progress', label: 'Course Progress', description: 'Progress status, completion rate, etc' },
  { key: 'instructors', label: 'Instructors', description: 'Insructor names, email, roles etc.' },
  { key: 'enrollment', label: 'Enrollment Information', description: 'Total enrollments, active learners, etc' },
  { key: 'settings', label: 'Course settings', description: 'Format, duration, visibility, modules, etc.' },
  { key: 'assessments', label: 'Assessments', description: 'Quiz/assessments scores, attempts' },
  { key: 'certificates', label: 'Certificates', description: 'Certificate name, issue date, etc.' },
  { key: 'login', label: 'Login Activity', description: 'Last login date and time.' },
]

const QUICK_SELECT = ['All Courses', 'Active Courses', 'Inactive Courses', 'New Registrations (This month)']

export default function GenerateCourseReport() {
  const navigate = useNavigate()

  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set())
  const [instructor, setInstructor] = useState('')
  const [cohort, setCohort] = useState('')
  const [status, setStatus] = useState('')
  const [enrollmentStatus, setEnrollmentStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quickSelect, setQuickSelect] = useState<string | null>(null)
  const [additionalFilter, setAdditionalFilter] = useState('')

  const [format, setFormat] = useState<ExportFormat>('CSV')
  const [sendToAdminEmail, setSendToAdminEmail] = useState(false)
  const [sendToCustomEmail, setSendToCustomEmail] = useState(false)
  const [customEmail, setCustomEmail] = useState('maryjohnson@gmail.com')

  const [successOpen, setSuccessOpen] = useState(false)

  const toggleField = (key: string) => {
    setSelectedFields((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault()

    /**
     * Backend Integration
     *
     * await reportService.generateCoursesReport({
     *   fields: Array.from(selectedFields),
     *   filters: { instructor, cohort, status, enrollmentStatus, startDate, endDate, quickSelect, additionalFilter },
     *   format, sendToAdminEmail, sendToCustomEmail, customEmail,
     * })
     */

    setSuccessOpen(true)
  }

  const fieldClass =
    'w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary'

  return (
    <AdminDashboardLayout
      title="Generate Courses Report"
      subtitle="Generate and export a detailed reports of Course, settings, enrollments and  performance."
    >
      <form onSubmit={handleExport} className="max-w-[1400px] w-full mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/admin/courses" className="text-admin-primary font-semibold hover:underline">
            Courses
          </Link>
          <ChevronRight size={14} className="text-admin-ash-4" />
          <ChevronRight size={14} className="text-admin-ash-4 -ml-2.5" />
          <span className="font-semibold text-admin-ink">Reports</span>
        </div>

        <Card title="1. Select data to include">
          <div className="pt-1">
            <p className="text-xs text-admin-ash-3 mb-5 -mt-2">
              Choose the information you want to include in the report.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
              {DATA_FIELDS.map((field) => {
                const checked = selectedFields.has(field.key)
                return (
                  <label key={field.key} className="flex items-start gap-3 cursor-pointer select-none">
                    <span
                      onClick={(e) => {
                        e.preventDefault()
                        toggleField(field.key)
                      }}
                      className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-colors ${
                        checked ? 'bg-admin-primary border-admin-primary' : 'bg-white border-admin-ash-6'
                      }`}
                    >
                      {checked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-admin-ink">{field.label}</span>
                      <span className="block text-xs text-admin-ash-3">{field.description}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
        </Card>

        <Card title="2. Apply Filters (Optional)">
          <div className="pt-1 space-y-5">
            <p className="text-xs text-admin-ash-3 -mt-2">Narrow down the data to export.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Instructor</label>
                <select value={instructor} onChange={(e) => setInstructor(e.target.value)} className={fieldClass}>
                  <option value="">Select Instructor</option>
                  {instructors.map((i) => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Cohort</label>
                <select value={cohort} onChange={(e) => setCohort(e.target.value)} className={fieldClass}>
                  <option value="">Select Cohort</option>
                  {cohortOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className={fieldClass}>
                  <option value="">Select Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Enrollment Status</label>
                <select
                  value={enrollmentStatus}
                  onChange={(e) => setEnrollmentStatus(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                  Course Creation Date Range
                </label>
                <div className="grid grid-cols-2 gap-5">
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={fieldClass} />
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className={fieldClass} />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-admin-ink mb-2">Quick Select</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {QUICK_SELECT.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setQuickSelect(opt)}
                    className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                      quickSelect === opt
                        ? 'border-admin-primary bg-admin-primary-light text-admin-primary'
                        : 'border-admin-ash-6 text-admin-ash-2 hover:bg-admin-ash-7/40'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-admin-ink mb-1.5">Additional Filter</label>
              <div className="flex items-center gap-2 rounded-full bg-admin-ash-7/60 px-4 py-2.5">
                <Search size={16} className="text-admin-ash-3 shrink-0" />
                <input
                  value={additionalFilter}
                  onChange={(e) => setAdditionalFilter(e.target.value)}
                  placeholder="Search by name, email or username"
                  className="w-full bg-transparent text-sm text-admin-ink outline-none placeholder:text-admin-ash-4"
                />
              </div>
            </div>
          </div>
        </Card>

        <Card title="3. Choose Export Format">
          <div className="pt-1">
            <p className="text-xs text-admin-ash-3 mb-5 -mt-2">Select the file format for your report</p>
            <ExportFormatPanel
              format={format}
              onFormatChange={setFormat}
              sendToAdminEmail={sendToAdminEmail}
              onSendToAdminEmailChange={setSendToAdminEmail}
              sendToCustomEmail={sendToCustomEmail}
              onSendToCustomEmailChange={setSendToCustomEmail}
              customEmail={customEmail}
              onCustomEmailChange={setCustomEmail}
            />
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link to="/admin/courses" className="text-sm font-semibold text-admin-ink hover:text-admin-primary">
            Back to Courses
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/courses')}
              className="px-6 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors"
            >
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </form>

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Report Generated"
        description="The new courses report has been exported and also sent to your mail, you should see a download request soon."
        primaryAction={{ label: 'Generate New Report', onClick: () => setSuccessOpen(false) }}
        secondaryAction={{ label: 'Back to dashboard', onClick: () => navigate('/admin/dashboard') }}
      />
    </AdminDashboardLayout>
  )
}
