import React, { useState } from 'react'
import { GraduationCap, UserRoundCog } from 'lucide-react'
import Modal from '../../../common/Modal'

export type AddUserMethod = 'bulk' | 'single'

interface AddUserChoiceModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: (method: AddUserMethod) => void
}

const AddUserChoiceModal: React.FC<AddUserChoiceModalProps> = ({ isOpen, onClose, onContinue }) => {
  const [method, setMethod] = useState<AddUserMethod>('single')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h3 className="text-2xl font-extrabold text-admin-ink mb-2">Add User</h3>
        <p className="text-sm text-admin-ash-3 mb-6">
          Choose the method of adding users to the platform.
        </p>

        <div className="space-y-3 mb-6 text-left">
          <button
            onClick={() => setMethod('bulk')}
            className={`w-full flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
              method === 'bulk' ? 'border-admin-primary bg-admin-primary-light' : 'border-admin-ash-6 hover:bg-admin-ash-7/40'
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-admin-purple-light text-admin-purple">
              <GraduationCap size={20} />
            </span>
            <span>
              <span className="block text-base font-semibold text-admin-ink">Bulk Upload</span>
              <span className="block text-xs text-admin-ash-3">Perfect for adding learners in batch</span>
            </span>
          </button>

          <button
            onClick={() => setMethod('single')}
            className={`w-full flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
              method === 'single' ? 'border-admin-primary bg-admin-primary-light' : 'border-admin-ash-6 hover:bg-admin-ash-7/40'
            }`}
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-admin-success-light text-admin-success">
              <UserRoundCog size={20} />
            </span>
            <span>
              <span className="block text-base font-semibold text-admin-ink">Single User</span>
              <span className="block text-xs text-admin-ash-3">
                Perfect for adding instructors and admin or single user
              </span>
            </span>
          </button>
        </div>

        <button
          onClick={() => onContinue(method)}
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

export default AddUserChoiceModal
