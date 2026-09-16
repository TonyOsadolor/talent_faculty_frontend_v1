import { api, BASE_URL, getStoredToken } from './apiClient'
import type {
  CertificatesResponse,
  CertificateDetailResponse,
  CertificateQueryParams,
} from '../types/certificate'

export const certificateService = {
  async getMyCertificates(params?: CertificateQueryParams): Promise<CertificatesResponse> {
    const query = new URLSearchParams()
    if (params?.search !== undefined && params.search !== '') {
      query.append('search', params.search)
    }
    if (params?.status !== undefined && params.status !== '') {
      query.append('status', params.status)
    }
    if (params?.start_date !== undefined && params.start_date !== '') {
      query.append('start_date', params.start_date)
    }
    if (params?.end_date !== undefined && params.end_date !== '') {
      query.append('end_date', params.end_date)
    }
    if (params?.page) {
      query.append('page', String(params.page))
    }
    if (params?.per_page) {
      query.append('per_page', String(params.per_page))
    }

    const qs = query.toString()
    const endpoint = `/api/v1/certificates${qs ? `?${qs}` : ''}`
    return api.get<CertificatesResponse>(endpoint)
  },

  async getCertificate(id: string | number): Promise<CertificateDetailResponse> {
    return api.get<CertificateDetailResponse>(`/api/v1/certificates/${id}`)
  },

  async downloadCertificate(id?: string | number, title?: string, fileUrl?: string): Promise<void> {
    // If a direct download/file URL is provided, trigger download
    if (fileUrl) {
      window.open(fileUrl, '_blank')
      return
    }

    // Attempt download endpoint
    if (id) {
      try {
        const token = getStoredToken()
        const res = await fetch(`${BASE_URL}/api/v1/certificates/${id}/download`, {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf, application/json, */*',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          },
        })

        if (res.ok) {
          const blob = await res.blob()
          const blobUrl = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = blobUrl
          a.download = `${title || 'Certificate'}.pdf`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(blobUrl)
          return
        }
      } catch {
        // Fallback below
      }
    }

    // Client-side fallback download simulation for offline/dev environments
    const fallbackContent = `Talent Faculty - Certificate of Completion\n\nThis is to certify the successful completion of:\n${title || 'Course'}\n\nIssued by Talent Faculty`
    const blob = new Blob([fallbackContent], { type: 'text/plain;charset=utf-8' })
    const blobUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = `${(title || 'Certificate').replace(/\s+/g, '_')}_Certificate.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(blobUrl)
  },

  async getShareLink(id?: string | number, title?: string): Promise<{ shareUrl: string }> {
    if (id) {
      try {
        const res = await api.get<{ data?: { share_url?: string } }>(`/api/v1/certificates/${id}/share`)
        if (res?.data?.share_url) {
          return { shareUrl: res.data.share_url }
        }
      } catch {
        // Fallback below
      }
    }

    const shareUrl = `https://talentfaculty.com/certificates/${encodeURIComponent(
      title || String(id || 'learner')
    )}`
    return { shareUrl }
  },
}
