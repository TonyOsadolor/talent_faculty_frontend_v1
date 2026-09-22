import React, { useState } from 'react'
import { GraduationCap, MessageSquareText, UserRoundCog, UsersRound, BookOpen, FileSpreadsheet } from 'lucide-react'
import Modal from '../../common/Modal'

export type DashboardReportType = 'admins' | 'instructors' | 'learners' | 'cohorts' | 'courses' | 'certificates'

const OPTIONS: { key: DashboardReportType; label: string; description: string; icon: React.ReactNode; tone: string }[] = [
  {
    key: 'admins',
    label: 'Admins',
    description: 'Export a detailed report of Admins.',
    icon: <GraduationCap size={20} />,
    tone: 'bg-admin-purple-light text-admin-purple',
  },
  {
    key: 'instructors',
    label: 'Instructors',
    description: 'Export a detailed report of instructors.',
    icon: <MessageSquareText size={20} />,
    tone: 'bg-admin-warning-light text-admin-secondary',
  },
  {
    key: 'learners',
    label: 'Learners',
    description: 'Export a detailed report of learners.',
    icon: <UserRoundCog size={20} />,
    tone: 'bg-admin-success-light text-admin-success',
  },
  {
    key: 'cohorts',
    label: 'Cohorts',
    description: 'Export a detailed report of cohorts.',
    icon: <UsersRound size={20} />,
    tone: 'bg-admin-purple-light text-admin-purple',
  },
  {
    key: 'courses',
    label: 'Courses',
    description: 'Export a detailed report of courses.',
    icon: <BookOpen size={20} />,
    tone: 'bg-admin-info-light text-admin-info',
  },
  {
    key: 'certificates',
    label: 'Certificates',
    description: 'Export a detailed report of certificates.',
    icon: <FileSpreadsheet size={20} />,
    tone: 'bg-admin-success-light text-admin-success',
  },
]

interface DashboardReportModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (type: DashboardReportType) => void
}

const DashboardReportModal: React.FC<DashboardReportModalProps> = ({ isOpen, onClose, onContinue }) => {
  const [selected, setSelected] = useState<DashboardReportType>('admins')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center w-auto">
        <h3 className="text-2xl font-extrabold text-admin-ink mb-2">Generate Reports</h3>
        <p className="text-sm text-admin-ash-3 mb-6">
          Choose the type of report to generate and export.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:w-180 mb-6 text-left">
          {OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSelected(opt.key)}
              className={`flex items-start gap-3 rounded-2xl border p-4 transition-colors ${
                selected === opt.key
                  ? 'border-admin-primary bg-admin-primary-light'
                  : 'border-admin-ash-6 hover:bg-admin-ash-7/40'
              }`}
            >
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${opt.tone}`}>
                {opt.icon}
              </span>
              <span>
                <span className="block text-md font-semibold text-start text-admin-ink">{opt.label}</span>
                <span className="block text-sm text-start text-admin-ash-3">{opt.description}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onContinue(selected)}
          className="w-full px-4 py-3.5 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors mb-4"
        >
          Continue
        </button>

        <button
          onClick={onClose}
          className="text-sm font-semibold text-admin-ink hover:text-admin-primary transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </Modal>
  )
}

export default DashboardReportModal
