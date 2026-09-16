import React, { useState, useEffect, useCallback } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import StatCard from '../../components/ui/StatCard'
import WeeklyHoursChart from '../../components/ui/WeeklyHoursChart'
import CompletionDonut from '../../components/ui/CompletionDonut'
import AchievementBadge from '../../components/ui/AchievementBadge'
import { progressService } from '../../services/progressService'
import { dashboardService } from '../../services/dashboardService'
import type { ProgressData, DayLearningHours, CompletionSegment, AchievementItem } from '../../types/progress'

import fireIcon from '../../assets/fire.jpg'
import trophyIcon from '../../assets/trophy.jpg'
import brainIcon from '../../assets/brain.jpg'
import certIcon from '../../assets/certificate.jpg'

const defaultWeeklyHours: DayLearningHours[] = [
  { day: 'Sun', hours: 8, color: '#2B72FB' },
  { day: 'Mon', hours: 6, color: '#64BDC6' },
  { day: 'Tue', hours: 14, color: '#EECA34' },
  { day: 'Wed', hours: 40, color: '#FE6A35' },
  { day: 'Thu', hours: 42, color: '#FA4B42' },
  { day: 'Fri', hours: 34, color: '#EE60E0' },
  { day: 'Sat', hours: 46, color: '#7B47E9' },
]

const defaultCompletionBreakdown: CompletionSegment[] = [
  { name: 'In Progress', value: 51.6, color: '#EECA34' },
  { name: 'Completed', value: 32.3, color: '#64BDC6' },
  { name: 'Not Started', value: 16.1, color: '#2B72FB' },
]

const defaultAchievements = [
  {
    label: '7-Day Streak',
    icon: fireIcon,
    color: '#F59E0B',
  },
  {
    label: 'Top Performer',
    icon: trophyIcon,
    color: '#3B82F6',
  },
  {
    label: 'Quiz Master',
    icon: brainIcon,
    color: '#9747FF',
  },
  {
    label: 'First Certificate',
    icon: certIcon,
    color: '#057834',
  },
]

const PALETTE_COLORS = ['#2B72FB', '#64BDC6', '#EECA34', '#FE6A35', '#FA4B42', '#EE60E0', '#7B47E9']

const resolveAchievementIcon = (item: AchievementItem) => {
  const key = `${item.label || ''} ${item.title || ''} ${item.name || ''}`.toLowerCase()
  if (key.includes('streak') || key.includes('fire') || key.includes('day')) return fireIcon
  if (key.includes('quiz') || key.includes('master') || key.includes('brain') || key.includes('exam')) return brainIcon
  if (key.includes('cert') || key.includes('degree') || key.includes('graduate')) return certIcon
  return trophyIcon
}

const Progress: React.FC = () => {
  const [range, setRange] = useState<'This Week' | 'Last Week' | 'This Month'>('This Week')
  const [rangeOpen, setRangeOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Dynamic progress state
  const [progressData, setProgressData] = useState<ProgressData | null>(null)
  const [weeklyHours, setWeeklyHours] = useState<DayLearningHours[]>(defaultWeeklyHours)
  const [completionBreakdown, setCompletionBreakdown] = useState<CompletionSegment[]>(defaultCompletionBreakdown)
  const [achievementsList, setAchievementsList] = useState(defaultAchievements)

  const fetchProgress = useCallback(async () => {
    setIsLoading(true)
    try {
      // 1. Fetch main progress data
      const response = await progressService.getProgressData({ range })
      const rawData = response?.data
      const data: ProgressData | null = Array.isArray(rawData) ? rawData[0] : (rawData || null)

      if (data) {
        setProgressData(data)

        // Weekly hours mapping
        const hoursList = data.weekly_hours || data.daily_hours
        if (Array.isArray(hoursList) && hoursList.length > 0) {
          setWeeklyHours(
            hoursList.map((item, idx) => ({
              day: item.day || `Day ${idx + 1}`,
              hours: typeof item.hours === 'number' ? item.hours : 0,
              color: item.color || PALETTE_COLORS[idx % PALETTE_COLORS.length],
            }))
          )
        }

        // Completion breakdown mapping
        if (Array.isArray(data.completion_breakdown) && data.completion_breakdown.length > 0) {
          setCompletionBreakdown(
            data.completion_breakdown.map((seg, idx) => ({
              name: seg.name,
              value: Number(seg.value) || 0,
              color: seg.color || PALETTE_COLORS[idx % PALETTE_COLORS.length],
            }))
          )
        } else if (
          typeof data.in_progress_count === 'number' ||
          typeof data.completed_count === 'number' ||
          typeof data.not_started_count === 'number'
        ) {
          const inProg = data.in_progress_count || 0
          const comp = data.completed_count || 0
          const notStart = data.not_started_count || 0
          const total = inProg + comp + notStart
          if (total > 0) {
            setCompletionBreakdown([
              { name: 'In Progress', value: Math.round((inProg / total) * 1000) / 10, color: '#EECA34' },
              { name: 'Completed', value: Math.round((comp / total) * 1000) / 10, color: '#64BDC6' },
              { name: 'Not Started', value: Math.round((notStart / total) * 1000) / 10, color: '#2B72FB' },
            ])
          }
        }

        // Achievements mapping
        if (Array.isArray(data.achievements) && data.achievements.length > 0) {
          setAchievementsList(
            data.achievements.map((item, idx) => ({
              label: item.label || item.title || item.name || `Achievement ${idx + 1}`,
              icon: item.icon && item.icon.startsWith('http') ? item.icon : resolveAchievementIcon(item),
              color: item.color || PALETTE_COLORS[idx % PALETTE_COLORS.length],
            }))
          )
        }
      } else {
        // Fallback: supplemental metrics from dashboard if available
        try {
          const dashRes = await dashboardService.getDashboardData()
          const dash = Array.isArray(dashRes.data) ? dashRes.data[0] : dashRes.data
          if (dash?.metrics) {
            setProgressData({
              overall_progress: dash.metrics.overall_progress,
              assessment_average: dash.metrics.assessment_average,
              assignments_completed: dash.metrics.pending_assignments_count,
              learning_streak_days: dash.metrics.learning_streak_days,
            })
          }
        } catch {
          // Keep defaults
        }
      }
    } catch {
      // Gracefully fall back to supplemental dashboard data or defaults
      try {
        const dashRes = await dashboardService.getDashboardData()
        const dash = Array.isArray(dashRes.data) ? dashRes.data[0] : dashRes.data
        if (dash?.metrics) {
          setProgressData({
            overall_progress: dash.metrics.overall_progress,
            assessment_average: dash.metrics.assessment_average,
            assignments_completed: dash.metrics.pending_assignments_count,
            learning_streak_days: dash.metrics.learning_streak_days,
          })
        }
      } catch {
        // Keep defaults
      }
    } finally {
      setIsLoading(false)
    }
  }, [range])

  useEffect(() => {
    fetchProgress()
  }, [fetchProgress])

  // Calculated display metrics with reliable fallbacks
  const courseCompletionVal =
    progressData?.course_completion_rate ??
    progressData?.overall_progress ??
    progressData?.metrics?.course_completion_percentage ??
    76

  const modulesCompleted =
    progressData?.completed_modules ??
    progressData?.metrics?.completed_modules ??
    12

  const totalModules =
    progressData?.total_modules ??
    progressData?.metrics?.total_modules ??
    16

  const modulesHelperText =
    progressData?.modules_completed_text || `${modulesCompleted} of ${totalModules} modules completed`

  const assignmentsVal =
    progressData?.assignments_completed ??
    progressData?.metrics?.assignments_completed ??
    progressData?.pending_assignments_count ??
    18

  const assessmentAvgVal =
    progressData?.assessment_average ??
    progressData?.metrics?.assessment_average ??
    88

  const learningHoursVal =
    progressData?.learning_hours ??
    progressData?.total_hours ??
    progressData?.metrics?.learning_hours ??
    84

  return (
    <DashboardLayout
      title="Progress"
      subtitle="Track your learning progress and achievements"
    >
      <div className="space-y-8">
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <Loader2 size={14} className="animate-spin text-primary" />
            <span>Updating progress data...</span>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Course Completion"
            value={`${courseCompletionVal}%`}
            variant="green"
            helper={modulesHelperText}
          />
          <StatCard
            label="Assignments Completed"
            value={String(assignmentsVal)}
            variant="blue"
          />
          <StatCard
            label="Assessment Average"
            value={`${assessmentAvgVal}%`}
            variant="orange"
          />
          <StatCard
            label="Learning Hours"
            value={String(learningHoursVal)}
            variant="purple"
            helper="Total Hours"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:flex-[1.5] bg-white rounded-2xl border border-neutral-100 p-5 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-neutral-800">
                Weekly Learning Hours
              </h3>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRangeOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-600 border border-neutral-200 rounded-lg px-3 py-1.5 hover:bg-neutral-50 transition-colors"
                >
                  {range}
                  <ChevronDown size={14} />
                </button>

                {rangeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setRangeOpen(false)}
                    />
                    <div className="absolute right-0 mt-1 w-36 bg-white border border-neutral-100 rounded-lg shadow-lg py-1 z-20">
                      {(['This Week', 'Last Week', 'This Month'] as const).map(
                        (opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setRange(opt)
                              setRangeOpen(false)
                            }}
                            className="w-full text-left px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50"
                          >
                            {opt}
                          </button>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            <WeeklyHoursChart data={weeklyHours} />
          </div>

          <div className="w-full lg:flex-1 bg-white rounded-2xl border border-neutral-100 p-5 min-w-0">
            <h3 className="text-sm font-bold text-neutral-800 mb-6">
              Course Completion
            </h3>

            <CompletionDonut data={completionBreakdown} />
          </div>
        </div>

        <section>
          <h2 className="text-lg font-bold text-neutral-800 mb-5">
            Recent Achievements
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {achievementsList.map((item) => (
              <AchievementBadge key={item.label} {...item} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default Progress