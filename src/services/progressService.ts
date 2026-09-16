import { api } from './apiClient'
import type { ProgressResponse, ProgressQueryParams } from '../types/progress'

export const progressService = {
  async getProgressData(params?: ProgressQueryParams): Promise<ProgressResponse> {
    const query = new URLSearchParams()
    if (params?.range) query.append('range', params.range)
    if (params?.start_date) query.append('start_date', params.start_date)
    if (params?.end_date) query.append('end_date', params.end_date)

    const qs = query.toString()
    const endpoint = `/api/v1/progress${qs ? `?${qs}` : ''}`
    return api.get<ProgressResponse>(endpoint)
  },
}
