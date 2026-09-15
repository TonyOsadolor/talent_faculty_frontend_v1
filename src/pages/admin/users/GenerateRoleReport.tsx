import React, { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronRight, Check, Search, Download } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import ExportFormatPanel, { type ExportFormat } from '../../../components/ui/admin/users/ExportFormatPanel'
import type { ReportRole } from '../../../components/ui/admin/users/GenerateReportChoiceModal'

interface DataField {
  key: string
  label: string
  description: string
}

const FIELD_CONFIG: Record<ReportRole, DataField[]> = {
  learners: [
    { key: 'basic', label: 'Basic Information', description: 'Name, email, username etc.' },
    { key: 'completion', label: 'Course Completion', description: 'Completed courses, date, score etc.' },
    { key: 'enrollment', label: 'Course Enrollment', description: 'Enrolled courses, start date etc.' },
    { key: 'cohort', label: 'Cohort Information', description: 'Cohort name, enrollment date etc.' },
    { key: 'assignment', label: 'Assignment Progress', description: 'Status, scores, due dates etc.' },
    { key: 'assessments', label: 'Assessments Results', description: 'Quiz/assessments scores, attempts' },
    { key: 'certificates', label: 'Certificates Earned', description: 'Certificate name, issue date, etc.' },
    { key: 'login', label: 'Login Activity', description: 'Last login date and time.' },
  ],
  instructors: [
    { key: 'basic', label: 'Basic Information', description: 'Name, email, username etc.' },
    { key: 'courseInfo', label: 'Course Information', description: 'Courses created, date, enrollments etc' },
    { key: 'roles', label: 'Roles and Permissions', description: 'Roles assigned, permissions, etc.' },
    { key: 'cohort', label: 'Cohort Information', description: 'Cohort name, enrollment date etc.' },
    { key: 'assignmentInfo', label: 'Assignment Information', description: 'Assignment created, scores, due dates etc.' },
    { key: 'assessmentInfo', label: 'Assessments Information', description: 'Quiz/assessments scores, attempts etc.' },
    { key: 'certificateInfo', label: 'Certificates Information', description: 'Certificate issued, issue date, etc.' },
    { key: 'login', label: 'Login Activity', description: 'Last login date and time.' },
  ],
  admins: [
    { key: 'basic', label: 'Basic Information', description: 'Name, email, username etc.' },
    { key: 'courseInfo', label: 'Course Information', description: 'Courses created, date, enrollments etc' },
    { key: 'roles', label: 'Roles and Permissions', description: 'Roles assigned, permissions, etc.' },
    { key: 'cohort', label: 'Cohort Information', description: 'Cohort name, enrollment date etc.' },
    { key: 'assignmentInfo', label: 'Assignment Information', description: 'Assignment created, scores, due dates etc.' },
    { key: 'assessmentInfo', label: 'Assessments Information', description: 'Quiz/assessments scores, attempts etc.' },
    { key: 'certificateInfo', label: 'Certificates Information', description: 'Certificate issued, issue date, etc.' },
    { key: 'userMgmt', label: 'User Management Activity', description: 'Users created, updated, suspended etc.' },
    { key: 'systemSettings', label: 'System Settings', description: 'Settings modified, configurations, etc' },
    { key: 'login', label: 'Login Activity', description: 'Last login date and time.' },
  ],
}

const ROLE_META: Record<ReportRole, { title: string; crumb: string; statusLabel: string; quickSelectLabel: string }> = {
  learners: { title: 'Learners', crumb: 'Learners', statusLabel: 'Learners Status', quickSelectLabel: 'Learners' },
  instructors: { title: 'Insructors', crumb: 'Instructors', statusLabel: 'Instructors Status', quickSelectLabel: 'Instructors' },
  admins: { title: 'Admins', crumb: 'Admins', statusLabel: 'Admin Status', quickSelectLabel: 'Admins' },
}

const QUICK_SELECT_SUFFIXES = ['All', 'Active', 'Inactive', 'New Registrations (This month)']

export default function GenerateRoleReport() {
  const navigate = useNavigate()
  const { role } = useParams<{ role: ReportRole }>()
  const reportRole: ReportRole = role === 'instructors' || role === 'admins' ? role : 'learners'

  const fields = FIELD_CONFIG[reportRole]
  const meta = ROLE_META[reportRole]

  const [selectedFields, setSelectedFields] = useState<Set<string>>(new Set())
  const [cohort, setCohort] = useState('')
  const [course, setCourse] = useState('')
  const [status, setStatus] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [quickSelect, setQuickSelect] = useState<string | null>(null)
  const [additionalFilter, setAdditionalFilter] = useState('')

  const [format, setFormat] = useState<ExportFormat>('CSV')
  const [sendToAdminEmail, setSendToAdminEmail] = useState(true)
  const [sendToCustomEmail, setSendToCustomEmail] = useState(true)
  const [customEmail, setCustomEmail] = useState('maryjohnson@gmail.com')

  const [successOpen, setSuccessOpen] = useState(false)

  const quickSelectOptions = useMemo(
    () =>
      QUICK_SELECT_SUFFIXES.map((suffix) =>
        suffix.startsWith('New Registrations') ? suffix : `${suffix} ${meta.quickSelectLabel}`
      ),
    [meta.quickSelectLabel]
  )

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
     * await reportService.generateUsersReport({
     *   role: reportRole,
     *   fields: Array.from(selectedFields),
     *   filters: { cohort, course, status, startDate, endDate, quickSelect, additionalFilter },
     *   format, sendToAdminEmail, sendToCustomEmail, customEmail,
     * })
     */

    setSuccessOpen(true)
  }

  return (
    <AdminDashboardLayout
      title={`Generate ${meta.title} Report`}
      subtitle={`Generate and export a detailed reports of ${meta.crumb}.`}
    >
      <form onSubmit={handleExport} className="max-w-[1100px] w-full mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Link to="/admin/users" className="text-admin-primary font-semibold hover:underline">
            Users
          </Link>
          <ChevronRight size={14} className="text-admin-ash-4" />
          <span className="font-semibold text-admin-ash-3">Reports</span>
          <ChevronRight size={14} className="text-admin-ash-4" />
          <span className="font-semibold text-admin-ink">{meta.crumb}</span>
        </div>

        <Card title="1. Select data to include">
          <div className="pt-1">
            <p className="text-xs text-admin-ash-3 mb-5 -mt-2">
              Choose the information you want to include in the report.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
              {fields.map((field) => {
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
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Cohorts</label>
                <select
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                  className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                >
                  <option value="">Select Cohort</option>
                  <option>Cohort 1A</option>
                  <option>Cohort 2B</option>
                  <option>Cohort 3A</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Courses</label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                >
                  <option value="">Select Course</option>
                  <option>Graphic Design Basics</option>
                  <option>Advanced React Dev</option>
                  <option>Machine Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">{meta.statusLabel}</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                >
                  <option value="">Select Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-admin-ink mb-1.5">Enrollment Date Range</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-admin-ink mb-2">Quick Select</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {quickSelectOptions.map((opt) => (
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
          <Link to="/admin/users" className="text-sm font-semibold text-admin-ink hover:text-admin-primary">
            Back to Users
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/users')}
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
        description={`The new ${reportRole} report has been exported${
          sendToAdminEmail || sendToCustomEmail ? ' and also sent to your mail, you should see a download request soon.' : '.'
        }`}
        primaryAction={{ label: 'Generate New Report', onClick: () => setSuccessOpen(false) }}
        secondaryAction={{ label: 'Back to dashboard', onClick: () => navigate('/admin/dashboard') }}
      />
    </AdminDashboardLayout>
  )
}
