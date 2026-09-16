import React, { useState, useEffect, useCallback } from 'react'
import { Award, Download, Search, Loader2, RefreshCw } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import CertificateRow from '../../components/ui/CertificateRow'
import Modal from '../../components/common/Modal'
import SuccessToast from '../../components/ui/SuccessToast'
import { certificateService } from '../../services/certificateService'
import { dashboardService } from '../../services/dashboardService'
import type { CertificateItem } from '../../types/certificate'

export type TabKey = 'earned' | 'inProgress'

export interface Certificate {
  id?: string | number
  uuid?: string
  title: string
  instructor: string
  status?: string
  file_url?: string
  certificate_url?: string
  share_url?: string
  image_url?: string
  progress?: number
  issue_date?: string
}

const fallbackEarned: Certificate[] = [
  {
    id: 1,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Grace Johnson',
    status: 'earned',
    progress: 100,
  },
]

const fallbackInProgress: Certificate[] = [
  {
    id: 2,
    title: 'Data Analysis Bootcamp',
    instructor: 'Grace Johnson',
    status: 'in_progress',
    progress: 60,
  },
  {
    id: 3,
    title: 'Advanced JavaScript Patterns',
    instructor: 'Grace Johnson',
    status: 'in_progress',
    progress: 45,
  },
  {
    id: 4,
    title: 'Product Management Essentials',
    instructor: 'Grace Johnson',
    status: 'in_progress',
    progress: 30,
  },
  {
    id: 5,
    title: 'Public Speaking for Educators',
    instructor: 'Grace Johnson',
    status: 'in_progress',
    progress: 15,
  },
]

const mapRawCertificate = (raw: CertificateItem | Record<string, unknown>, defaultStatus: string): Certificate => {
  const r = raw as Record<string, unknown>
  const title =
    (typeof r?.title === 'string' && r.title) ||
    (typeof r?.course_title === 'string' && r.course_title) ||
    (typeof r?.course_name === 'string' && r.course_name) ||
    ((r?.course as Record<string, unknown>)?.title as string) ||
    'Course Certificate'

  let instructorName = 'Grace Johnson'
  if (typeof r?.instructor === 'string') {
    instructorName = r.instructor
  } else if (typeof r?.instructor === 'object' && r?.instructor !== null) {
    instructorName = (r.instructor as Record<string, unknown>).name as string || 'Grace Johnson'
  } else if (typeof (r?.course as Record<string, unknown>)?.instructor === 'string') {
    instructorName = (r.course as Record<string, unknown>).instructor as string
  }

  const statusVal = String(r?.status || defaultStatus).toLowerCase()
  const isEarned = ['earned', 'issued', 'completed'].includes(statusVal) || Number(r?.progress) === 100

  return {
    id: (r?.id as string | number) || (r?.uuid as string) || Math.random().toString(36).substring(2, 9),
    uuid: r?.uuid as string,
    title,
    instructor: instructorName,
    status: isEarned ? 'earned' : 'in_progress',
    file_url: (r?.file_url as string) || (r?.certificate_url as string) || (r?.download_url as string),
    share_url: r?.share_url as string,
    image_url: (r?.image_url as string) || (r?.banner_url as string),
    progress: typeof r?.progress === 'number' ? r.progress : (isEarned ? 100 : 50),
    issue_date: (r?.issue_date as string) || (r?.issued_at as string) || (r?.created_at as string),
  }
}

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <Award size={32} className="text-neutral-300 mb-3" />
    <p className="text-sm text-neutral-400 max-w-xs">{message}</p>
  </div>
)

const Certificates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('earned')
  const [searchQuery, setSearchQuery] = useState('')
  const [startDate] = useState('')
  const [endDate] = useState('')

  const [earnedList, setEarnedList] = useState<Certificate[]>(fallbackEarned)
  const [inProgressList, setInProgressList] = useState<Certificate[]>(fallbackInProgress)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const [pendingCertificate, setPendingCertificate] = useState<Certificate | null>(null)
  const [downloadedCertificate, setDownloadedCertificate] = useState<Certificate | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const fetchCertificates = useCallback(async () => {
    setIsLoading(true)
    try {
      // Fetch certificates from API with query params
      const response = await certificateService.getMyCertificates({
        search: searchQuery.trim() || undefined,
        status: activeTab === 'earned' ? 'earned' : 'in_progress',
        start_date: startDate || undefined,
        end_date: endDate || undefined,
      })

      const rawList = Array.isArray(response?.data) ? response.data : []

      if (rawList.length > 0) {
        const mapped = rawList.map((item) => mapRawCertificate(item, activeTab))
        const earnedItems = mapped.filter((c) => c.status === 'earned')
        const inProgItems = mapped.filter((c) => c.status === 'in_progress')

        if (earnedItems.length > 0 || activeTab === 'earned') {
          setEarnedList(earnedItems)
        }
        if (inProgItems.length > 0 || activeTab === 'inProgress') {
          setInProgressList(inProgItems)
        }
      } else {
        // Supplemental check from learner's courses if backend /certificates is empty
        try {
          const coursesRes = await dashboardService.getMyCourses({
            search: searchQuery.trim() || undefined,
          })
          if (coursesRes?.data && Array.isArray(coursesRes.data) && coursesRes.data.length > 0) {
            const completedCourses = coursesRes.data
              .filter((c) => (c.progress && c.progress >= 100) || c.status === 'completed')
              .map((c) => ({
                id: c.id || c.uuid,
                title: c.title,
                instructor: typeof c.instructor === 'object' ? c.instructor.name : (c.instructor || 'Grace Johnson'),
                status: 'earned',
                progress: 100,
              }))

            const activeCourses = coursesRes.data
              .filter((c) => (!c.progress || c.progress < 100) && c.status !== 'completed')
              .map((c) => ({
                id: c.id || c.uuid,
                title: c.title,
                instructor: typeof c.instructor === 'object' ? c.instructor.name : (c.instructor || 'Grace Johnson'),
                status: 'in_progress',
                progress: c.progress || 50,
              }))

            if (completedCourses.length > 0) setEarnedList(completedCourses)
            if (activeCourses.length > 0) setInProgressList(activeCourses)
          }
        } catch {
          // Keep defaults
        }
      }
    } catch {
      // Gracefully fall back to courses or fallback list
      try {
        const coursesRes = await dashboardService.getMyCourses()
        if (coursesRes?.data && Array.isArray(coursesRes.data) && coursesRes.data.length > 0) {
          const completedCourses = coursesRes.data
            .filter((c) => (c.progress && c.progress >= 100) || c.status === 'completed')
            .map((c) => ({
              id: c.id || c.uuid,
              title: c.title,
              instructor: typeof c.instructor === 'object' ? c.instructor.name : (c.instructor || 'Grace Johnson'),
              status: 'earned',
              progress: 100,
            }))
          if (completedCourses.length > 0) setEarnedList(completedCourses)
        }
      } catch {
        // Keep defaults
      }
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery, activeTab, startDate, endDate])

  useEffect(() => {
    fetchCertificates()
  }, [fetchCertificates])

  // Client-side search filter over current active tab list
  const currentList = activeTab === 'earned' ? earnedList : inProgressList
  const filteredList = currentList.filter((cert) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return cert.title.toLowerCase().includes(q) || cert.instructor.toLowerCase().includes(q)
  })

  const tabs = [
    { key: 'earned' as const, label: 'Earned', count: earnedList.length },
    { key: 'inProgress' as const, label: 'In Progress', count: inProgressList.length },
  ]

  const handleDownloadClick = (certificate: Certificate) => {
    setPendingCertificate(certificate)
  }

  const handleConfirmDownload = async () => {
    if (!pendingCertificate) return

    setIsDownloading(true)
    try {
      await certificateService.downloadCertificate(
        pendingCertificate.id,
        pendingCertificate.title,
        pendingCertificate.file_url
      )
      const downloaded = pendingCertificate
      setPendingCertificate(null)
      setDownloadedCertificate(downloaded)
    } catch {
      setToastMessage('Could not complete certificate download. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async (certificate: Certificate) => {
    let shareUrl = certificate.share_url

    if (!shareUrl) {
      try {
        const res = await certificateService.getShareLink(certificate.id, certificate.title)
        shareUrl = res.shareUrl
      } catch {
        shareUrl = `https://talentfaculty.com/certificates/${encodeURIComponent(certificate.title)}`
      }
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: `Check out my certificate for ${certificate.title}!`,
          url: shareUrl,
        })
        return
      } catch {
        // User cancelled sharing
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setToastMessage('Certificate link copied to clipboard.')
    } catch {
      setToastMessage('Could not copy link to clipboard.')
    }
  }

  return (
    <DashboardLayout
      title="Certificates"
      subtitle="View and download your earned certificates."
    >
      <div className="space-y-6 relative">
        {toastMessage && (
          <div className="absolute top-0 right-0 z-20">
            <SuccessToast message={toastMessage} onDismiss={() => setToastMessage(null)} />
          </div>
        )}

        {/* Search & Filter bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search certificates by title or instructor..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <button
            onClick={() => fetchCertificates()}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-medium text-neutral-600 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors disabled:opacity-50"
            title="Refresh certificates"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-6 border-b border-neutral-100">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.key
                  ? 'text-primary'
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              {tab.label} ({tab.count})

              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content list */}
        <div className="bg-white rounded-2xl border border-neutral-100 px-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-sm text-neutral-400">
              <Loader2 size={18} className="animate-spin text-primary" />
              <span>Loading certificates...</span>
            </div>
          ) : filteredList.length > 0 ? (
            filteredList.map((certificate) => (
              <CertificateRow
                key={String(certificate.id || certificate.title)}
                certificate={certificate}
                locked={activeTab === 'inProgress'}
                onDownload={handleDownloadClick}
                onShare={handleShare}
              />
            ))
          ) : (
            <EmptyState
              message={
                searchQuery
                  ? `No certificates found matching "${searchQuery}".`
                  : activeTab === 'earned'
                  ? 'Complete a course to earn your first certificate.'
                  : "Courses you're actively working through will show up here."
              }
            />
          )}
        </div>
      </div>

      {/* Your certificate is ready! */}
      <Modal isOpen={!!pendingCertificate} onClose={() => !isDownloading && setPendingCertificate(null)}>
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">
            Your certificate is ready!
          </h3>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed px-2">
            You&apos;ve successfully completed <span className="font-semibold text-neutral-800">{pendingCertificate?.title}</span>. Download your certificate to save,
            share, or add to your professional portfolio.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPendingCertificate(null)}
              disabled={isDownloading}
              className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 text-neutral-700 text-sm font-semibold hover:bg-neutral-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDownload}
              disabled={isDownloading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={16} />
                  Download Certificate
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Download Success! */}
      <Modal isOpen={!!downloadedCertificate} onClose={() => setDownloadedCertificate(null)}>
        <div className="text-center">
          <h3 className="text-2xl font-extrabold text-neutral-900 mb-3">Download Success!</h3>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed px-2">
            Your certificate for <span className="font-semibold text-neutral-800">{downloadedCertificate?.title}</span> is now saved to your device. You can access it
            anytime from your downloads or your Talent Faculty profile.
          </p>
          <button
            onClick={() => setDownloadedCertificate(null)}
            className="w-full px-4 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
          >
            Done
          </button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Certificates
