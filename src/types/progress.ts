import type { ApiResponse } from './auth'

export interface DayLearningHours {
  day: string
  hours: number
  color: string
}

export interface CompletionSegment {
  name: string
  value: number
  color: string
}

export interface AchievementItem {
  id?: string | number
  label?: string
  title?: string
  name?: string
  icon?: string
  color?: string
  date?: string
  description?: string
}

export interface ProgressMetrics {
  course_completion_percentage?: number
  completed_modules?: number
  total_modules?: number
  assignments_completed?: number
  assessment_average?: number
  learning_hours?: number
  total_hours?: number
  streak_days?: number
}

export interface ProgressData {
  course_completion_rate?: number
  overall_progress?: number
  completed_modules?: number
  total_modules?: number
  modules_completed_text?: string
  assignments_completed?: number
  pending_assignments_count?: number
  assessment_average?: number
  learning_hours?: number
  total_hours?: number
  learning_streak_days?: number
  weekly_hours?: DayLearningHours[]
  daily_hours?: DayLearningHours[]
  completion_breakdown?: CompletionSegment[]
  in_progress_count?: number
  completed_count?: number
  not_started_count?: number
  achievements?: AchievementItem[]
  metrics?: ProgressMetrics
}

export interface ProgressQueryParams {
  range?: 'This Week' | 'Last Week' | 'This Month' | string
  start_date?: string
  end_date?: string
}

export type ProgressResponse = ApiResponse<ProgressData[] | ProgressData>
