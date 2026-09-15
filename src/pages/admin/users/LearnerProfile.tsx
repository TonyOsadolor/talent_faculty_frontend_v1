import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Circle,
  Gauge,
  BarChart3,
  BookOpen,
  Award,
  ClipboardList,
  CheckCircle2,
  Snowflake,
  Clock,
  AlertTriangle,
  Ban,
} from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import Avatar from '../../../components/ui/admin/Avatar'
import StatCard from '../../../components/ui/admin/StatCard'
import Pagination from '../../../components/ui/admin/Pagination'
import ExportFormatPanel, { type ExportFormat } from '../../../components/ui/admin/users/ExportFormatPanel'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import { getUser, buildLearnerProfile } from '../../../data/users'

type TabKey = 'overview' | 'courses' | 'assessments' | 'certificates'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'courses', label: 'Courses' },
  { key: 'assessments', label: 'Assessments' },
  { key: 'certificates', label: 'Certificates' },
]

const pillTone: Record<string, string> = {
  Completed: 'bg-admin-success-light text-admin-success',
  Issued: 'bg-admin-success-light text-admin-success',
  'In Progress': 'bg-admin-info-light text-admin-info',
  Submitted: 'bg-admin-info-light text-admin-info',
  Pending: 'bg-admin-warning-light text-admin-secondary',
  Missed: 'bg-admin-danger-light text-admin-danger',
}

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${pillTone[label] ?? 'bg-admin-ash-7 text-admin-ash-3'}`}>
    {label}
  </span>
)

export default function LearnerProfile() {
  const navigate = useNavigate()
  const { id, tab } = useParams<{ id: string; tab?: string }>()
  const user = id ? getUser(id) : undefined

  const activeTab: TabKey = (['overview', 'courses', 'assessments', 'certificates'] as TabKey[]).includes(tab as TabKey)
    ? (tab as TabKey)
    : 'overview'

  const [format, setFormat] = useState<ExportFormat>('CSV')
  const [sendToAdminEmail, setSendToAdminEmail] = useState(false)
  const [sendToCustomEmail, setSendToCustomEmail] = useState(false)
  const [customEmail, setCustomEmail] = useState('maryjohnson@gmail.com')
  const [successOpen, setSuccessOpen] = useState(false)
  const [page, setPage] = useState(1)

  if (!user) {
    return (
      <AdminDashboardLayout title="User not found">
        <div className="max-w-[1400px] mx-auto text-center py-20">
          <p className="text-admin-ash-3 mb-4">We couldn&apos;t find that user.</p>
          <Link to="/admin/users" className="text-admin-primary font-semibold hover:underline">
            Back to Users
          </Link>
        </div>
      </AdminDashboardLayout>
    )
  }

  const profile = buildLearnerProfile(user)
  const inProgressCount = profile.courses.filter((c) => c.status === 'In Progress').length
  const completedCount = profile.courses.filter((c) => c.status === 'Completed').length
  const completedAssessments = profile.assessments.filter((a) => a.status === 'Completed').length
  const overdueAssessments = profile.assessments.filter((a) => a.status === 'Missed').length
  const issuedCerts = profile.certificates.filter((c) => c.certificateStatus === 'Issued').length
  const pendingCerts = profile.certificates.filter((c) => c.certificateStatus === 'Pending').length

  const reportLabel =
    activeTab === 'overview' ? 'Learner' : activeTab === 'courses' ? 'Courses' : activeTab === 'assessments' ? 'Assessment' : 'Certificate'

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessOpen(true)
  }

  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(profile.assessments.length / pageSize))
  const pagedAssessments = profile.assessments.slice((page - 1) * pageSize, page * pageSize)

  return (
    <AdminDashboardLayout>
      <div className="max-w-[1400px] w-full mx-auto space-y-6">
        <button
          onClick={() => navigate('/admin/users')}
          className="flex items-center gap-1.5 text-sm font-semibold text-admin-ink hover:text-admin-primary transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Users
        </button>

        {/* Header */}
        <div className="rounded-2xl bg-admin-primary-light/60 p-6 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 flex-1">
            <Avatar name={user.name} src={user.avatar} size={80} />
            <div className="shrink-0">
              <h1 className="text-xl font-bold text-admin-ink">{user.name}</h1>
              <p className="text-sm text-admin-ash-2 mt-1">{user.email}</p>
              <p className="text-sm text-admin-ash-2">{user.phone}</p>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-admin-info mt-1.5">
                <Circle size={8} className="fill-admin-info text-admin-info" />
                {user.online ? 'Online' : 'Offline'}
              </p>
            </div>
            <p className="text-sm text-admin-ash-2 sm:max-w-sm lg:max-w-md sm:pl-2">{user.bio}</p>
          </div>
          <div className="flex sm:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => navigate(`/admin/users/${user.id}/edit`)}
              className="px-5 py-2.5 rounded-xl border border-admin-ash-6 bg-white text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/40 transition-colors whitespace-nowrap"
            >
              Edit User
            </button>
            <a
              href={`mailto:${user.email}`}
              className="px-5 py-2.5 rounded-xl border border-admin-ash-6 bg-white text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/40 transition-colors whitespace-nowrap text-center"
            >
              Send Message
            </a>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 rounded-2xl border border-admin-ash-7 px-5 py-4">
          <span className="inline-flex items-center rounded-full bg-admin-info-light px-4 py-1.5 text-xs font-bold text-admin-info">
            {user.status}
          </span>
          <span className="text-sm font-bold text-admin-ink">{user.role}</span>
          <span className="text-sm text-admin-ash-3">
            <span className="font-semibold text-admin-ink">Joined:</span> {user.joined}
          </span>
          <span className="text-sm text-admin-ash-3">
            <span className="font-semibold text-admin-ink">Last Login:</span> {user.lastLogin}
          </span>
        </div>
        
        {/* Tabs */}
        <Card bodyClassName="px-0 p-5 pb-0">
          <div className="flex gap-8 border-b border-admin-ash-7 px-1 -mt-2">
            {TABS.map((t) => (
              <Link
                key={t.key}
                to={`/admin/users/${user.id}/${t.key}`}
                className={`pb-3 pt-1 text-sm font-semibold border-b-[3px] transition-colors ${
                  activeTab === t.key
                    ? 'border-admin-primary text-admin-primary'
                    : 'border-transparent text-admin-ash-3 hover:text-admin-ash-1'
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="p-5 space-y-6">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <StatCard icon={<Gauge size={16} />} tone="green" label="Progress" value={`${profile.progress}%`} />
                  <StatCard icon={<BarChart3 size={16} />} tone="blue" label="Completion Rate" value={`${profile.completionRate}%`} />
                  <StatCard icon={<BookOpen size={16} />} tone="purple" label="Courses" value={profile.courses.length} />
                  <StatCard icon={<Award size={16} />} tone="orange" label="Certificates" value={profile.certificatesCount} />
                  <StatCard icon={<ClipboardList size={16} />} tone="pink" label="Assessments" value={profile.assessments.length} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-admin-ink mb-3">Cohort Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 rounded-2xl border border-admin-ash-7 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-ash-3">Cohort</span>
                      <span className="text-sm font-semibold text-admin-ink">{profile.cohort.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-ash-3">Enrolment Date</span>
                      <span className="text-sm font-semibold text-admin-ink">{profile.cohort.enrolmentDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-ash-3">Program Type</span>
                      <span className="text-sm font-semibold text-admin-ink">{profile.cohort.programType}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-ash-3">Expected Completion</span>
                      <span className="text-sm font-semibold text-admin-ink">{profile.cohort.expectedCompletion}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-admin-ash-3">Status</span>
                      <span className="text-sm font-semibold text-admin-success">{profile.cohort.status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-admin-ash-3 whitespace-nowrap">Completion Rate</span>
                      <div className="h-1.5 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
                        <div className="h-full rounded-full bg-admin-info" style={{ width: `${profile.cohort.completionRate}%` }} />
                      </div>
                      <span className="text-xs text-admin-ash-3 shrink-0">{profile.cohort.completionRate}%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-admin-ink mb-3">Recent Activities</h3>
                  <div className="overflow-x-auto rounded-2xl border border-admin-ash-7">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="bg-admin-primary-light text-admin-ash-2 text-xs font-semibold">
                          <th className="py-3 px-5">Activity</th>
                          <th className="py-3 px-5">Type</th>
                          <th className="py-3 px-5">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-admin-ash-7 text-sm">
                        {profile.activities.map((a, idx) => (
                          <tr key={idx}>
                            <td className="py-3.5 px-5 text-admin-ink">{a.activity}</td>
                            <td className="py-3.5 px-5 text-admin-ash-2">{a.type}</td>
                            <td className="py-3.5 px-5 text-admin-ash-2">{a.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'courses' && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <StatCard icon={<BarChart3 size={16} />} tone="green" label="Overall Progress" value={`${profile.progress}%`} />
                  <StatCard icon={<Gauge size={16} />} tone="blue" label="Completion Rate" value={`${profile.completionRate}%`} />
                  <StatCard icon={<BookOpen size={16} />} tone="purple" label="Courses" value={profile.courses.length} />
                  <StatCard icon={<CheckCircle2 size={16} />} tone="green" label="Completed" value={completedCount} />
                  <StatCard icon={<Snowflake size={16} />} tone="orange" label="In Progress" value={inProgressCount} />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-admin-ash-7">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-admin-ash-7/40 text-admin-ash-2 text-xs font-semibold border-b border-admin-ash-7">
                        <th className="py-3 px-5">Course</th>
                        <th className="py-3 px-5">Instructors</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Certificates</th>
                        <th className="py-3 px-5">Course Completion</th>
                        <th className="py-3 px-5">Assessment Completion</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-ash-7 text-sm">
                      {profile.courses.map((c) => (
                        <tr key={c.id}>
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <img
                                src="/course-image.jpg"
                                alt={c.title}
                                className="h-10 w-10 rounded-lg object-cover shrink-0"
                              />
                              <div>
                                <p className="font-semibold text-admin-ink">{c.title}</p>
                                <p className="text-xs text-admin-ash-3">{c.lessons} Lessons  {c.modules} Modules</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.instructor}</td>
                          <td className="py-3.5 px-5"><Pill label={c.status} /></td>
                          <td className="py-3.5 px-5"><Pill label={c.certificate} /></td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.courseCompletion}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.assessmentCompletion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'assessments' && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <StatCard icon={<BarChart3 size={16} />} tone="green" label="Completion Rate" value={`${profile.completionRate}%`} />
                  <StatCard icon={<ClipboardList size={16} />} tone="blue" label="Assessments" value={profile.assessments.length} />
                  <StatCard icon={<CheckCircle2 size={16} />} tone="green" label="Completed" value={completedAssessments} />
                  <StatCard icon={<Snowflake size={16} />} tone="purple" label="In Progress" value={Math.max(profile.assessments.length - completedAssessments - overdueAssessments, 0)} />
                  <StatCard icon={<AlertTriangle size={16} />} tone="red" label="Overdue" value={overdueAssessments} />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-admin-ash-7">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-admin-ash-7/40 text-admin-ash-2 text-xs font-semibold border-b border-admin-ash-7">
                        <th className="py-3 px-5">Assessments</th>
                        <th className="py-3 px-5">Type</th>
                        <th className="py-3 px-5">Course</th>
                        <th className="py-3 px-5">Status</th>
                        <th className="py-3 px-5">Score</th>
                        <th className="py-3 px-5">Due Date</th>
                        <th className="py-3 px-5">Attempts</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-ash-7 text-sm">
                      {pagedAssessments.map((a) => (
                        <tr key={a.id}>
                          <td className="py-3.5 px-5 font-semibold text-admin-ink">{a.name}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{a.type}</td>
                          <td className="py-3.5 px-5">
                            <p className="text-admin-ink">{a.course}</p>
                            <p className="text-xs text-admin-ash-3">{a.courseMeta}</p>
                          </td>
                          <td className="py-3.5 px-5"><Pill label={a.status} /></td>
                          <td className="py-3.5 px-5 text-admin-ink">{a.score}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{a.dueDate}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{a.attempts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                  showingFrom={profile.assessments.length === 0 ? 0 : (page - 1) * pageSize + 1}
                  showingTo={Math.min(page * pageSize, profile.assessments.length)}
                  totalCount={profile.assessments.length}
                  pageSize={pageSize}
                  onPageSizeChange={() => {}}
                />
              </>
            )}

            {activeTab === 'certificates' && (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <StatCard icon={<BarChart3 size={16} />} tone="green" label="Completion Rate" value={`${profile.completionRate}%`} />
                  <StatCard icon={<Award size={16} />} tone="blue" label="Certificates" value={profile.certificates.length} />
                  <StatCard icon={<CheckCircle2 size={16} />} tone="green" label="Issued" value={issuedCerts} />
                  <StatCard icon={<Clock size={16} />} tone="orange" label="Pending" value={pendingCerts} />
                  <StatCard icon={<Ban size={16} />} tone="red" label="Ineligible" value={0} />
                </div>

                <div className="overflow-x-auto rounded-2xl border border-admin-ash-7">
                  <table className="w-full text-left border-collapse min-w-[720px]">
                    <thead>
                      <tr className="bg-admin-ash-7/40 text-admin-ash-2 text-xs font-semibold border-b border-admin-ash-7">
                        <th className="py-3 px-5">Certificate</th>
                        <th className="py-3 px-5">Instructors</th>
                        <th className="py-3 px-5">Course Status</th>
                        <th className="py-3 px-5">Certificates Status</th>
                        <th className="py-3 px-5">Course Completion</th>
                        <th className="py-3 px-5">Issued Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-ash-7 text-sm">
                      {profile.certificates.map((c) => (
                        <tr key={c.id}>
                          <td className="py-3.5 px-5 font-semibold text-admin-ink">{c.title}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.instructor}</td>
                          <td className="py-3.5 px-5"><Pill label={c.courseStatus} /></td>
                          <td className="py-3.5 px-5"><Pill label={c.certificateStatus} /></td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.courseCompletion}</td>
                          <td className="py-3.5 px-5 text-admin-ink">{c.issuedDate}</td>
                        </tr>
                      ))}

                      {profile.certificates.length === 0 && (
                        <tr>
                          <td colSpan={6} className="py-10 text-center text-sm text-admin-ash-3">
                            No certificates yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Export */}
        <form onSubmit={handleExport}>
          <Card title={`Export ${reportLabel} Report`}>
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
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors"
                >
                  Export
                </button>
              </div>
            </div>
          </Card>
        </form>
      </div>

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Report Generated"
        description={`${user.name}'s ${reportLabel.toLowerCase()} report has been exported successfully.`}
        primaryAction={{ label: 'Done', onClick: () => setSuccessOpen(false) }}
      />
    </AdminDashboardLayout>
  )
}
