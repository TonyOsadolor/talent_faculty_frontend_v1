import type { ApiResponse } from './auth'

export interface CertificateItem {
  id?: string | number
  uuid?: string
  title: string
  course_title?: string
  course_name?: string
  instructor?: string | { name: string; avatarUrl?: string; role?: string }
  status?: 'earned' | 'inProgress' | 'in_progress' | 'completed' | 'pending' | string
  issue_date?: string
  issued_at?: string
  expiry_date?: string
  certificate_url?: string
  file_url?: string
  download_url?: string
  share_url?: string
  image_url?: string
  banner_url?: string
  course_id?: string | number
  verification_code?: string
  progress?: number
  credential_id?: string
}

export interface CertificateQueryParams {
  search?: string
  status?: string
  start_date?: string
  end_date?: string
  page?: number
  per_page?: number
}

export type CertificatesResponse = ApiResponse<CertificateItem[]>
export type CertificateDetailResponse = ApiResponse<CertificateItem>
