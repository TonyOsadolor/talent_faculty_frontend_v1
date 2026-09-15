import React from 'react'
import { Check } from 'lucide-react'
import Modal from '../Modal'

interface SuccessModalAction {
  label: string
  onClick: () => void
  variant?: 'filled' | 'outline'
}

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description: string
  primaryAction: SuccessModalAction
  secondaryAction?: SuccessModalAction
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-admin-primary">
          <Check size={30} className="text-admin-primary" strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-extrabold text-admin-ink mb-3">{title}</h3>
        <p className="text-sm text-admin-ash-3 mb-7 leading-relaxed px-2">{description}</p>

        <div className="flex items-center gap-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex-1 px-4 py-3 rounded-xl border border-admin-ash-6 text-admin-ash-1 text-sm font-semibold hover:bg-admin-ash-7/50 transition-colors"
            >
              {secondaryAction.label}
            </button>
          )}
          <button
            onClick={primaryAction.onClick}
            className="flex-1 px-4 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors"
          >
            {primaryAction.label}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default SuccessModal
