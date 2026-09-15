import React, { useState } from 'react'
import { UserRoundCog, MessageSquareText, GraduationCap } from 'lucide-react'
import Modal from '../../../common/Modal'

export type ReportRole = 'learners' | 'instructors' | 'admins'

const ROLE_OPTIONS: { key: ReportRole; label: string; description: string; icon: React.ReactNode; tone: string }[] = [
  {
    key: 'learners',
    label: 'Learners',
    description: 'Export a detailed report of learners.',
    icon: <UserRoundCog size={20} />,
    tone: 'bg-admin-success-light text-admin-success',
  },
  {
    key: 'instructors',
    label: 'Instructors',
    description: 'Export a detailed report of instructors.',
    icon: <MessageSquareText size={20} />,
    tone: 'bg-admin-warning-light text-admin-secondary',
  },
  {
    key: 'admins',
    label: 'Admins',
    description: 'Export a detailed report of Admins.',
    icon: <GraduationCap size={20} />,
    tone: 'bg-admin-purple-light text-admin-purple',
  },
]

interface GenerateReportChoiceModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (role: ReportRole) => void
}

const GenerateReportChoiceModal: React.FC<GenerateReportChoiceModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const [role, setRole] = useState<ReportRole>('learners')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h3 className="text-2xl font-extrabold text-admin-ink mb-2">Generate User Reports</h3>
        <p className="text-sm text-admin-ash-3 mb-6">
          Choose user type or role to generate and export report.
        </p>

        <div className="space-y-3 mb-6 text-left">
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setRole(opt.key)}
              className={`w-full flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                role === opt.key ? 'border-admin-primary bg-admin-primary-light' : 'border-admin-ash-6 hover:bg-admin-ash-7/40'
              }`}
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${opt.tone}`}>
                {opt.icon}
              </span>
              <span>
                <span className="block text-base font-semibold text-admin-ink">{opt.label}</span>
                <span className="block text-xs text-admin-ash-3">{opt.description}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => onContinue(role)}
          className="w-full px-4 py-3.5 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors mb-4"
        >
          Continue
        </button>

        <button
          onClick={onClose}
          className="text-sm font-semibold text-admin-ink hover:text-admin-primary transition-colors"
        >
          Back to User Management
        </button>
      </div>
    </Modal>
  )
}

export default GenerateReportChoiceModal
