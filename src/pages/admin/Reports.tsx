import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  BookOpen,
  GraduationCap,
  UserCheck,
  UsersRound,
  Activity,
  BookCheck,
  Gauge,
  Award,
  ClipboardList,
  Target,
  FileCheck2,
  FileSpreadsheet,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Label,
} from 'recharts'

import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../components/common/admin/Card'
import StatCard from '../../components/ui/admin/StatCard'
import ActivityCard from '../../components/ui/admin/ActivityCard'
import QuickLinkButton from '../../components/ui/admin/QuickLinkButton'
import TimeRangeSelect from '../../components/ui/admin/TimeRangeSelect'
import MiniCalendar from '../../components/ui/admin/MiniCalendar'

import {
  platformOverview,
  platformActivities,
  topInstructor,
  topLearner,
  userRegistrations,
  totalRegisteredUsers,
  learnerStatus,
  assignmentStatus,
  assessmentPerformance,
  topLearners,
  cohortStatus,
  totalCohorts,
  topCohortsByEnrollment,
  cohortEnrollmentTrend,
  certificateTrend,
  topCoursesByEnrollment,
  completionRateByCourse,
  mostEngagedCourses,
  topInstructors,
  timeRangeOptions,
} from '../../data/reports'
import type { PerformerSummary } from '../../data/reports'

const overviewIcons = [
  <Users size={18} key="u" />,
  <BookOpen size={18} key="c" />,
  <GraduationCap size={18} key="l" />,
  <UserCheck size={18} key="m" />,
  <UsersRound size={18} key="co" />,
]

const activityIcons = [
  <Activity size={18} key="a" />,
  <UsersRound size={18} key="b" />,
  <BookOpen size={18} key="c" />,
  <BookCheck size={18} key="d" />,
  <Gauge size={18} key="e" />,
  <Award size={18} key="f" />,
  <ClipboardList size={18} key="g" />,
  <Target size={18} key="h" />,
  <FileCheck2 size={18} key="i" />,
]

/** Shared progress bar used across the Reports tables. */
const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className="flex items-center gap-2 min-w-[140px]">
    <div className="h-2.5 flex-1 rounded-full bg-admin-ash-7 overflow-hidden">
      <div
        className={`h-full rounded-full ${value === 100 ? 'bg-admin-success' : 'bg-admin-info'}`}
        style={{ width: `${Math.max(value, 3)}%` }}
      />
    </div>
    <span className="text-xs text-admin-ash-2 shrink-0 w-9">{value}%</span>
  </div>
)

const PerformerCard: React.FC<{ title: string; performer: PerformerSummary }> = ({ title, performer }) => (
  <div className="rounded-2xl border border-admin-ash-7 bg-white p-5">
    <h3 className="text-base font-bold text-admin-ink pb-4 border-b border-admin-ash-7">{title}</h3>
    <div className="flex flex-col items-center text-center pt-5 pb-4 border-b border-admin-ash-7">
      <img src={performer.avatar} alt={performer.name} className="h-20 w-20 rounded-full object-cover" />
      <p className="mt-3 text-sm font-bold text-admin-ink">{performer.name}</p>
      <p className="mt-1 text-xs text-admin-ash-3">{performer.email}</p>
      <p className="mt-1 text-xs text-admin-ash-3">{performer.score}</p>
    </div>
    <div className="pt-4">
      <a
        href={`mailto:${performer.email}`}
        className="inline-block rounded-full border border-admin-ash-6 px-4 py-2 text-sm font-medium text-admin-ink hover:bg-admin-ash-7/40 transition-colors"
      >
        Send Message
      </a>
    </div>
  </div>
)

/** Donut chart with a centred total, used for Learner / Assignment / Cohort status. */
interface DonutProps {
  data: { name: string; value: number; color: string }[]
  centerValue: string | number
  centerLabel: string
  legendSuffix?: (entry: { name: string; value: number }) => string
}

const DonutChart: React.FC<DonutProps> = ({ data, centerValue, centerLabel, legendSuffix }) => (
  <div className="flex flex-col sm:flex-row items-center gap-6">
    <div className="h-[220px] w-[220px] shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={62}
            outerRadius={100}
            paddingAngle={0}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="none" />
            ))}
            <Label
              position="center"
              content={() => (
                <>
                  <text x="50%" y="47%" textAnchor="middle" className="fill-admin-ink text-lg font-bold">
                    {centerValue}
                  </text>
                  <text x="50%" y="59%" textAnchor="middle" className="fill-admin-ash-3 text-xs">
                    {centerLabel}
                  </text>
                </>
              )}
            />
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>

    <ul className="space-y-3">
      {data.map((entry) => (
        <li key={entry.name} className="flex items-center gap-2.5 text-sm text-admin-ash-1">
          <span className="h-3.5 w-3.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
          {entry.name}
          {legendSuffix ? ` ${legendSuffix(entry)}` : ''}
        </li>
      ))}
    </ul>
  </div>
)

export default function Reports() {
  const navigate = useNavigate()

  const [registrationRange, setRegistrationRange] = useState('This Year')
  const [assessmentRange, setAssessmentRange] = useState('This Month')
  const [learnersRange, setLearnersRange] = useState('This Month')
  const [cohortEnrollRange, setCohortEnrollRange] = useState('All Time')
  const [cohortTrendRange, setCohortTrendRange] = useState('This Year')
  const [certificateRange, setCertificateRange] = useState('This Year')
  const [topCoursesRange, setTopCoursesRange] = useState('All Time')
  const [completionRange, setCompletionRange] = useState('All Time')
  const [engagedRange, setEngagedRange] = useState('All Time')
  const [instructorsRange, setInstructorsRange] = useState('All Time')

  const thStyle = 'px-4 py-3.5 text-sm font-semibold text-admin-ink whitespace-nowrap'
  const tdStyle = 'px-4 py-3.5 text-sm text-admin-ash-1 whitespace-nowrap'

  return (
    <AdminDashboardLayout
      title="Reports"
      subtitle="Continue to monitor the Platform, track learning performance, engagement and activities"
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-6">
        {/* Platform Overview */}
        <Card title="Platform Overview">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 pt-2">
            {platformOverview.map((item, i) => (
              <StatCard
                key={item.label}
                icon={overviewIcons[i]}
                tone={item.tone}
                label={item.label}
                value={item.value}
                delta={item.delta}
                period={item.period}
              />
            ))}
          </div>
        </Card>

        {/* Platform Activities */}
        <Card title="Platform Activities">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pt-2">
            {platformActivities.map((item, i) => (
              <ActivityCard
                key={item.title}
                icon={activityIcons[i]}
                title={item.title}
                subtitle={item.subtitle}
                value={item.value}
              />
            ))}
          </div>
        </Card>

        {/* Quick Links */}
        <Card title="Quick Links">
          <div className="flex flex-wrap gap-4 pt-2">
            <QuickLinkButton
              icon={<Users size={20} />}
              tone="blue"
              label="Generate User Report"
              onClick={() => navigate('/admin/users/reports/learners')}
            />
            <QuickLinkButton
              icon={<UsersRound size={20} />}
              tone="purple"
              label="Generate Cohort Report"
              onClick={() => navigate('/admin/cohorts/report')}
            />
            <QuickLinkButton
              icon={<BookOpen size={20} />}
              tone="green"
              label="Generate Courses Report"
              onClick={() => navigate('/admin/courses/reports')}
            />
            <QuickLinkButton
              icon={<FileSpreadsheet size={20} />}
              tone="orange"
              label="Generate Certificate Report"
              onClick={() => navigate('/admin/certificates')}
            />
          </div>
        </Card>

        {/* Top performers + calendar */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-start">
          <PerformerCard title="Top Performing Instructor" performer={topInstructor} />
          <PerformerCard title="Top Performing Learner" performer={topLearner} />
          <MiniCalendar />
        </div>

        {/* User Registrations */}
        <Card>
          <div className="flex items-start justify-between gap-3 flex-wrap pt-1">
            <div>
              <h3 className="text-base font-bold text-admin-ink">User Registrations</h3>
              <p className="mt-4 text-sm text-admin-ash-3">Total Users</p>
              <p className="text-2xl font-extrabold text-admin-ink">{totalRegisteredUsers}</p>
            </div>
            <TimeRangeSelect
              value={registrationRange}
              onChange={setRegistrationRange}
              options={timeRangeOptions}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-4 mb-2">
            <span className="flex items-center gap-2 text-sm text-admin-ash-1">
              <span className="h-3.5 w-3.5 rounded-full bg-admin-primary-light" /> Instructors
            </span>
            <span className="flex items-center gap-2 text-sm text-admin-ash-1">
              <span className="h-3.5 w-3.5 rounded-full bg-admin-secondary" /> Admins
            </span>
            <span className="flex items-center gap-2 text-sm text-admin-ash-1">
              <span className="h-3.5 w-3.5 rounded-full bg-admin-primary-dark" /> Learners
            </span>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userRegistrations} barGap={4} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E6E6" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#808080' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#808080' }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="admins" fill="#F57C00" radius={[2, 2, 0, 0]} barSize={18} />
                <Bar dataKey="instructors" fill="#E6F4EA" radius={[2, 2, 0, 0]} barSize={18} />
                <Bar dataKey="learners" fill="#024F2A" radius={[2, 2, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Learner + Assignment status donuts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card title="Learner Status">
            <div className="pt-4">
              <DonutChart data={learnerStatus} centerValue={totalRegisteredUsers} centerLabel="Total Learners" />
            </div>
          </Card>
          <Card title="Assignment Completion Status">
            <div className="pt-4">
              <DonutChart data={assignmentStatus} centerValue="1,456" centerLabel="Total Assign." />
            </div>
          </Card>
        </div>

        {/* Assessment Performance */}
        <Card>
          <div className="flex items-center justify-between gap-3 flex-wrap pt-1 mb-4">
            <h3 className="text-base font-bold text-admin-ink">Assessment Performance</h3>
            <TimeRangeSelect value={assessmentRange} onChange={setAssessmentRange} options={timeRangeOptions} />
          </div>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E6E6E6" />
                <XAxis dataKey="course" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#808080' }} />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: '#808080' }}
                  label={{ value: 'Average Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#808080' } }}
                />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} formatter={(v) => `${v}%`} />
                <Bar dataKey="score" fill="#3B82F6" radius={[10, 10, 10, 10]} barSize={34} background={{ fill: '#EAF2FE', radius: 10 } as never} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Learners */}
        <Card bodyClassName="!px-0 !pb-0">
          <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
            <h3 className="text-base font-bold text-admin-ink">Top Learners</h3>
            <TimeRangeSelect value={learnersRange} onChange={setLearnersRange} options={timeRangeOptions} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                  <th className={thStyle}>Learner</th>
                  <th className={thStyle}>Cohort</th>
                  <th className={thStyle}>Assessment Score</th>
                  <th className={thStyle}>Assessment Completion</th>
                  <th className={thStyle}>Attendance</th>
                  <th className={thStyle}>Course Completion</th>
                  <th className={thStyle}>Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-ash-7">
                {topLearners.map((l) => (
                  <tr key={l.id} className="hover:bg-admin-ash-7/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img src={l.avatar} alt={l.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-admin-ink">{l.name}</p>
                          <p className="text-xs text-admin-ash-3">{l.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdStyle}>{l.cohort}</td>
                    <td className={tdStyle}>{l.assessmentScore}</td>
                    <td className={tdStyle}>{l.assessmentCompletion}</td>
                    <td className={tdStyle}>{l.attendance}</td>
                    <td className="px-4 py-3.5"><ProgressBar value={l.courseCompletion} /></td>
                    <td className={tdStyle}>{l.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </Card>

        {/* Cohort status + top cohorts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <Card title="Cohort Status">
            <div className="pt-4">
              <DonutChart
                data={cohortStatus.map((c) => ({ name: c.name, value: c.percent, color: c.color }))}
                centerValue={totalCohorts}
                centerLabel="Total Cohorts"
                legendSuffix={(entry) => {
                  const match = cohortStatus.find((c) => c.name === entry.name)
                  return match ? `(${match.value})` : ''
                }}
              />
            </div>
          </Card>

          <Card bodyClassName="!px-0 !pb-0">
            <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
              <h3 className="text-base font-bold text-admin-ink">Top Cohorts by Enrollment</h3>
              <TimeRangeSelect value={cohortEnrollRange} onChange={setCohortEnrollRange} options={timeRangeOptions} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                    <th className={thStyle}>Cohort</th>
                    <th className={thStyle}>Enrollees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {topCohortsByEnrollment.map((c) => (
                    <tr key={c.cohort} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className={tdStyle}>{c.cohort}</td>
                      <td className={tdStyle}>{c.enrollees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-4" />
          </Card>
        </div>

        {/* Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1 mb-4">
              <h3 className="text-base font-bold text-admin-ink">Cohort Enrollmennt  Trend</h3>
              <TimeRangeSelect value={cohortTrendRange} onChange={setCohortTrendRange} options={timeRangeOptions} />
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohortEnrollmentTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#808080' }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#808080' }}
                    label={{ value: 'Number of Learners', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#808080' } }}
                  />
                  <Tooltip />
                  <Line type="linear" dataKey="learners" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4, fill: '#3B82F6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between gap-3 flex-wrap pt-1 mb-4">
              <h3 className="text-base font-bold text-admin-ink">Certificate  Trend</h3>
              <TimeRangeSelect value={certificateRange} onChange={setCertificateRange} options={timeRangeOptions} />
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={certificateTrend} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="certGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22C55E" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#22C55E" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#808080' }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: '#808080' }}
                    label={{ value: 'Certificates', angle: -90, position: 'insideLeft', style: { fontSize: 11, fill: '#808080' } }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="certificates"
                    stroke="#22C55E"
                    strokeWidth={2}
                    fill="url(#certGradient)"
                    dot={{ r: 3, fill: '#fff', stroke: '#22C55E', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Top courses + completion rate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          <Card bodyClassName="!px-0 !pb-0">
            <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
              <h3 className="text-base font-bold text-admin-ink">Top Courses by Enrollment</h3>
              <TimeRangeSelect value={topCoursesRange} onChange={setTopCoursesRange} options={timeRangeOptions} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                    <th className={thStyle}>Course</th>
                    <th className={thStyle}>Enrollees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {topCoursesByEnrollment.map((c) => (
                    <tr key={c.course} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className={tdStyle}>{c.course}</td>
                      <td className={tdStyle}>{c.enrollees}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-4" />
          </Card>

          <Card bodyClassName="!px-0 !pb-0">
            <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
              <h3 className="text-base font-bold text-admin-ink">Completion Rate by Course</h3>
              <TimeRangeSelect value={completionRange} onChange={setCompletionRange} options={timeRangeOptions} />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[380px] border-collapse text-left">
                <thead>
                  <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                    <th className={thStyle}>Course</th>
                    <th className={thStyle}>Completion Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-ash-7">
                  {completionRateByCourse.map((c) => (
                    <tr key={c.course} className="hover:bg-admin-ash-7/20 transition-colors">
                      <td className={tdStyle}>{c.course}</td>
                      <td className="px-4 py-3.5"><ProgressBar value={c.rate} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-4" />
          </Card>
        </div>

        {/* Most Engaged Courses */}
        <Card bodyClassName="!px-0 !pb-0">
          <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
            <h3 className="text-base font-bold text-admin-ink">Most  Engaged Courses</h3>
            <TimeRangeSelect value={engagedRange} onChange={setEngagedRange} options={timeRangeOptions} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                  <th className={thStyle}>Course</th>
                  <th className={thStyle}>Course Progress</th>
                  <th className={thStyle}>Completion Rate</th>
                  <th className={thStyle}>Attendance</th>
                  <th className={thStyle}>Assessment Participation</th>
                  <th className={thStyle}>Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-ash-7">
                {mostEngagedCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-admin-ash-7/20 transition-colors">
                    <td className={tdStyle}>{c.course}</td>
                    <td className={tdStyle}>{c.courseProgress}</td>
                    <td className="px-4 py-3.5"><ProgressBar value={c.completionRate} /></td>
                    <td className={tdStyle}>{c.attendance}</td>
                    <td className={tdStyle}>{c.assessmentParticipation}</td>
                    <td className={tdStyle}>{c.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </Card>

        {/* Top Instructors */}
        <Card bodyClassName="!px-0 !pb-0">
          <div className="flex items-center justify-between gap-3 flex-wrap px-5 pt-1 pb-4">
            <h3 className="text-base font-bold text-admin-ink">Top Instructors</h3>
            <TimeRangeSelect value={instructorsRange} onChange={setInstructorsRange} options={timeRangeOptions} />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead>
                <tr className="bg-admin-ash-7/40 border-y border-admin-ash-7">
                  <th className={thStyle}>Instructor</th>
                  <th className={thStyle}>Active Cohorts</th>
                  <th className={thStyle}>Active Courses</th>
                  <th className={thStyle}>Completion Rate</th>
                  <th className={thStyle}>Assessment Performance</th>
                  <th className={thStyle}>Attendance</th>
                  <th className={thStyle}>Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-ash-7">
                {topInstructors.map((ins) => (
                  <tr key={ins.id} className="hover:bg-admin-ash-7/20 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <img src={ins.avatar} alt={ins.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-admin-ink">{ins.name}</p>
                          <p className="text-xs text-admin-ash-3">{ins.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdStyle}>{ins.activeCohorts}</td>
                    <td className={tdStyle}>{ins.activeCourses}</td>
                    <td className="px-4 py-3.5"><ProgressBar value={ins.completionRate} /></td>
                    <td className={tdStyle}>{ins.assessmentPerformance}</td>
                    <td className={tdStyle}>{ins.attendance}</td>
                    <td className={tdStyle}>{ins.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="h-4" />
        </Card>
      </div>
    </AdminDashboardLayout>
  )
}
