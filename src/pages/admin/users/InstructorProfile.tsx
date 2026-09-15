import React, { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, ClipboardCheck, Gauge, GraduationCap, Target, UsersRound, Circle, Calendar, Hourglass, BarChart3 } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import Avatar from '../../../components/ui/admin/Avatar'
import StatCard from '../../../components/ui/admin/StatCard'
import ExportFormatPanel, { type ExportFormat } from '../../../components/ui/admin/users/ExportFormatPanel'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import { getUser, buildInstructorProfile } from '../../../data/users'

const courseStatusStyles: Record<string, string> = {
  Completed: 'text-admin-success',
  'In Progress': 'text-admin-info',
  'Not Started': 'text-admin-danger',
}

const cohortStatusStyles: Record<string, string> = {
  Active: 'text-admin-success',
  Upcoming: 'text-admin-secondary',
  Completed: 'text-admin-info',
}

export default function InstructorProfile() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const user = id ? getUser(id) : undefined

  const [format, setFormat] = useState<ExportFormat>('CSV')
  const [sendToAdminEmail, setSendToAdminEmail] = useState(false)
  const [sendToCustomEmail, setSendToCustomEmail] = useState(false)
  const [customEmail, setCustomEmail] = useState('maryjohnson@gmail.com')
  const [successOpen, setSuccessOpen] = useState(false)

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

  const profile = buildInstructorProfile(user)

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccessOpen(true)
  }

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
        <div className="rounded-2xl bg-admin-warning-light/60 p-6 flex flex-col lg:flex-row lg:items-center gap-6 justify-between">
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

        {/* Teaching Overview */}
        <Card title="Teaching Overview">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <StatCard icon={<UsersRound size={16} />} tone="blue" label="Total Learners" value={profile.totalLearners} />
            <StatCard icon={<GraduationCap size={16} />} tone="purple" label="Cohorts" value={profile.cohorts} />
            <StatCard icon={<BookOpen size={16} />} tone="green" label="Total Courses" value={profile.totalCourses} />
            <StatCard icon={<Gauge size={16} />} tone="orange" label="Avg. Completion Rate" value={profile.avgCompletionRate} />
            <StatCard icon={<ClipboardCheck size={16} />} tone="pink" label="Assessments" value={profile.assessments} />
            <StatCard icon={<Target size={16} />} tone="green" label="Pass Rate" value={profile.passRate} />
          </div>
        </Card>

        {/* Courses table */}
        <Card title="Courses" className="overflow-hidden" bodyClassName="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-admin-ash-7/40 text-admin-ash-2 text-xs font-semibold border-y border-admin-ash-7">
                  <th className="py-3 px-5">Course</th>
                  <th className="py-3 px-5">Status</th>
                  <th className="py-3 px-5">Learners</th>
                  <th className="py-3 px-5">Cohort</th>
                  <th className="py-3 px-5 w-40">Course Progress</th>
                  <th className="py-3 px-5">Course Completion</th>
                  <th className="py-3 px-5">Assessment Completion</th>
                  <th className="py-3 px-5">Pass Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-ash-7 text-sm">
                {profile.courses.map((course) => (
                  <tr key={course.id}>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src="/course-image.jpg"
                          alt={course.title}
                          className="h-10 w-10 rounded-lg object-cover shrink-0"
                        />
                        <div>
                          <p className="font-semibold text-admin-ink">{course.title}</p>
                          <p className="text-xs text-admin-ash-3">{course.lessons} Lessons  {course.modules} Modules</p>
                        </div>
                      </div>
                    </td>
                    <td className={`py-3.5 px-5 font-semibold text-xs ${courseStatusStyles[course.status]}`}>
                      {course.status}
                    </td>
                    <td className="py-3.5 px-5 text-admin-ink">{course.learners}</td>
                    <td className="py-3.5 px-5 text-admin-ink">{course.cohort}</td>
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${course.progress === 0 ? 'bg-admin-danger' : 'bg-admin-info'}`}
                            style={{ width: `${Math.max(course.progress, 3)}%` }}
                          />
                        </div>
                        <span className="text-xs text-admin-ash-3">{course.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5 text-admin-ink">{course.courseCompletion}</td>
                    <td className="py-3.5 px-5 text-admin-ink">{course.assessmentCompletion}</td>
                    <td className="py-3.5 px-5 text-admin-ink">{course.passRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Cohort Details */}
        <Card title="Cohort Details">
          <div className="pt-2 space-y-6">
            {profile.cohortDetails.map((cd) => (
              <div key={cd.label}>
                <p className="text-sm font-bold text-admin-ink mb-3">{cd.label}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <UsersRound size={14} />
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm text-admin-ash-3">Cohort</span>
                      <span className="text-sm font-semibold text-admin-ink">{cd.cohort}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <Calendar size={14} />
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm text-admin-ash-3">Start Date</span>
                      <span className="text-sm font-semibold text-admin-ink">{cd.startDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <BookOpen size={14} />
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm text-admin-ash-3">Program Type</span>
                      <span className="text-sm font-semibold text-admin-ink">{cd.programType}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <Hourglass size={14} />
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm text-admin-ash-3">Expected Completion</span>
                      <span className="text-sm font-semibold text-admin-ink">{cd.expectedCompletion}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <Gauge size={14} />
                    </span>
                    <div className="flex items-center justify-between flex-1">
                      <span className="text-sm text-admin-ash-3">Status</span>
                      <span className={`text-sm font-semibold ${cohortStatusStyles[cd.status]}`}>{cd.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-admin-success-light text-admin-success shrink-0">
                      <BarChart3 size={14} />
                    </span>
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-admin-ash-3 whitespace-nowrap">Completion Rate</span>
                      <div className="h-1.5 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cd.completionRate === 0 ? 'bg-admin-danger' : 'bg-admin-info'}`}
                          style={{ width: `${Math.max(cd.completionRate, 3)}%` }}
                        />
                      </div>
                      <span className="text-xs text-admin-ash-3 shrink-0">{cd.completionRate}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <Card title="Recent Activities" bodyClassName="px-0 pb-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="text-admin-ash-2 text-xs font-semibold border-y border-admin-ash-7">
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
        </Card>

        {/* Export */}
        <form onSubmit={handleExport}>
          <Card title="Export Instructor Report">
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
        description={`${user.name}'s instructor report has been exported successfully.`}
        primaryAction={{ label: 'Done', onClick: () => setSuccessOpen(false) }}
      />
    </AdminDashboardLayout>
  )
}
