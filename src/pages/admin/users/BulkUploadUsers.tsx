import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Upload, Paperclip, ShieldQuestion, Eye, EyeOff } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import Modal from '../../../components/common/Modal'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import Toggle from '../../../components/ui/admin/users/Toggle'

const ROLES = ['Learner', 'Instructor', 'Administrator']

export default function BulkUploadUsers() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fileName, setFileName] = useState<string | null>(null)
  const [passwordMode, setPasswordMode] = useState<'temporary' | 'default'>('temporary')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true)
  const [role, setRole] = useState('')
  const [cohort, setCohort] = useState('')

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  // Mock detected-user count for the "Ready to Upload?" confirmation copy
  const detectedCount = 239

  const passwordsEditable = passwordMode === 'default'
  const canUpload = !!fileName && !!role

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setFileName(file.name)
  }

  const handleUploadClick = () => {
    if (!canUpload) return
    setConfirmOpen(true)
  }

  const handleConfirmUpload = () => {
    /**
     * Backend Integration
     *
     * const formData = new FormData()
     * formData.append('file', file)
     * await userService.bulkUploadUsers({ formData, role, cohort, passwordMode, password, sendWelcomeEmail })
     */

    setConfirmOpen(false)
    setSuccessOpen(true)
  }

  const handleUploadAnother = () => {
    setSuccessOpen(false)
    setFileName(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <AdminDashboardLayout title="Bulk Upload Learners" subtitle="Add multiple learners at once">
      <div className="max-w-[1100px] w-full mx-auto space-y-6">
        <div className="flex items-center gap-2 text-sm">
          <Link to="/admin/users" className="text-admin-primary font-semibold hover:underline">
            Users
          </Link>
          <ChevronRight size={14} className="text-admin-ash-4" />
          <ChevronRight size={14} className="text-admin-ash-4 -ml-2.5" />
          <span className="font-semibold text-admin-ink">Bulk Upload Learners</span>
        </div>

        <Card title="1. Bulk Upload">
          <div className="pt-2">
            <label className="block text-sm font-semibold text-admin-ink mb-2">
              Select File <span className="text-admin-danger">*</span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="bulk-upload-file"
            />

            <label
              htmlFor="bulk-upload-file"
              className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-admin-ash-6 py-12 cursor-pointer hover:bg-admin-ash-7/30 transition-colors text-center"
            >
              {fileName ? (
                <span className="flex items-center gap-2 text-sm font-medium text-admin-ink">
                  <Paperclip size={16} className="text-admin-primary" />
                  {fileName}
                </span>
              ) : (
                <>
                  <Upload size={22} className="text-admin-ash-4" />
                  <span className="text-sm text-admin-ash-3">
                    Click to Upload or drag and drop csv or excel file (max. 20mb)
                  </span>
                </>
              )}
            </label>
          </div>
        </Card>

        <Card title="2. Account Information">
          <div className="pt-2 space-y-5">
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="bulkPasswordMode"
                  checked={passwordMode === 'temporary'}
                  onChange={() => setPasswordMode('temporary')}
                  className="mt-1 h-4 w-4 accent-admin-primary"
                />
                <span>
                  <span className="block text-sm font-semibold text-admin-ink">Generate Temporary Password</span>
                  <span className="block text-xs text-admin-ash-3">System will generate a password automatically.</span>
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="bulkPasswordMode"
                  checked={passwordMode === 'default'}
                  onChange={() => setPasswordMode('default')}
                  className="mt-1 h-4 w-4 accent-admin-primary"
                />
                <span>
                  <span className="block text-sm font-semibold text-admin-ink">Use a default Password</span>
                  <span className="block text-xs text-admin-ash-3">Enter a default password for users.</span>
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Password</label>
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 ${
                    passwordsEditable ? 'border-admin-ash-6 focus-within:border-admin-primary' : 'border-admin-ash-7 bg-admin-ash-7/40'
                  }`}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!passwordsEditable}
                    placeholder="Enter password"
                    className="w-full text-sm text-admin-ink outline-none placeholder:text-admin-ash-4 bg-transparent disabled:cursor-not-allowed"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-admin-ash-4 shrink-0">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-admin-ink mb-1.5">Confirm Password</label>
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 ${
                    passwordsEditable ? 'border-admin-ash-6 focus-within:border-admin-primary' : 'border-admin-ash-7 bg-admin-ash-7/40'
                  }`}
                >
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!passwordsEditable}
                    placeholder="Confirm password"
                    className="w-full text-sm text-admin-ink outline-none placeholder:text-admin-ash-4 bg-transparent disabled:cursor-not-allowed"
                  />
                  <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-admin-ash-4 shrink-0">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-1">
              <Toggle checked={sendWelcomeEmail} onChange={setSendWelcomeEmail} />
              <span>
                <span className="block text-sm font-semibold text-admin-ink">Send Welcome Email to the user</span>
                <span className="block text-xs text-admin-ash-3">
                  An email with login details and welcome message will be sent
                </span>
              </span>
            </label>
          </div>
        </Card>

        <Card title="3.Roles and Cohort">
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                Role <span className="text-admin-danger">*</span>
              </label>
              <select
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
              >
                <option value="">Select Role</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-admin-ink mb-1.5">Cohort</label>
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
              >
                <option value="">Select Cohort</option>
                <option>Cohort 1A</option>
                <option>Cohort 2B</option>
                <option>Cohort 3A</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => navigate('/admin/users')}
            className="px-6 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUploadClick}
            disabled={!canUpload}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={18} />
            Upload Users
          </button>
        </div>
      </div>

      {/* Ready to Upload? confirmation */}
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <div className="text-center">
          <ShieldQuestion size={56} strokeWidth={1.3} className="mx-auto text-admin-danger mb-4" />
          <h3 className="text-2xl font-extrabold text-admin-ink mb-3">Ready to Upload?</h3>
          <p className="text-sm text-admin-ash-3 mb-7 leading-relaxed px-2">
            {detectedCount} users has been found. This will create {detectedCount} {role.toLowerCase() || 'learner'}{' '}
            accounts and assign them to selected programe.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setConfirmOpen(false)}
              className="flex-1 px-4 py-3 rounded-xl border border-admin-ash-6 text-admin-ink text-sm font-semibold hover:bg-admin-ash-7/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmUpload}
              className="flex-1 px-4 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors"
            >
              Confirm Upload
            </button>
          </div>
        </div>
      </Modal>

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Upload Complete"
        description={`${detectedCount} ${role.toLowerCase() || 'learners'} uploaded successfully.`}
        primaryAction={{ label: 'Upload Another File', onClick: handleUploadAnother }}
        secondaryAction={{ label: 'Go back to Users', onClick: () => navigate('/admin/users') }}
      />
    </AdminDashboardLayout>
  )
}
