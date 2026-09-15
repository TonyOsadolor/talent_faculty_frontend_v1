import React, { useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ChevronRight, Mail, EyeOff, Eye, UserPlus, CheckCircle2 } from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import Card from '../../../components/common/admin/Card'
import SuccessModal from '../../../components/common/admin/SuccessModal'
import PermissionsChecklist from '../../../components/ui/admin/users/PermissionsChecklist'
import Toggle from '../../../components/ui/admin/users/Toggle'
import { getUser } from '../../../data/users'
import type { PermissionMap, UserRole, UserStatus } from '../../../types/user'

const NO_PERMISSIONS: PermissionMap = {
  courses: false,
  cohorts: false,
  assignments: false,
  reports: false,
  userManagement: false,
  systemSettings: false,
}

const ROLES: UserRole[] = ['Learner', 'Instructor', 'Administrator']
const STATUSES: UserStatus[] = ['Active', 'Disabled', 'Suspended']

export default function AddEditUser() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = !!id

  const existingUser = useMemo(() => (id ? getUser(id) : undefined), [id])

  const [firstName, setFirstName] = useState(existingUser?.firstName ?? '')
  const [lastName, setLastName] = useState(existingUser?.lastName ?? '')
  const [email, setEmail] = useState(existingUser?.email ?? '')
  const [phone, setPhone] = useState(existingUser?.phone ?? '')

  const [passwordMode, setPasswordMode] = useState<'temporary' | 'default'>('temporary')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true)
  const [status, setStatus] = useState<UserStatus>(existingUser?.status ?? 'Active')
  const [cohort, setCohort] = useState(existingUser?.cohort ?? '')

  const [role, setRole] = useState<UserRole>(existingUser?.role ?? 'Instructor')
  const [permissions, setPermissions] = useState<PermissionMap>(existingUser?.permissions ?? NO_PERMISSIONS)

  const [savedToast, setSavedToast] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

  const passwordsEditable = !isEdit && passwordMode === 'default'
  const fullName = `${firstName} ${lastName}`.trim()

  // Edit mode: Save Changes only lights up once something has actually
  // changed from the user's current record.
  const isDirty = useMemo(() => {
    if (!isEdit) return true
    if (!existingUser) return true

    return (
      firstName !== existingUser.firstName ||
      lastName !== existingUser.lastName ||
      email !== existingUser.email ||
      phone !== existingUser.phone ||
      role !== existingUser.role ||
      status !== existingUser.status ||
      cohort !== (existingUser.cohort ?? '') ||
      password.length > 0 ||
      JSON.stringify(permissions) !== JSON.stringify(existingUser.permissions)
    )
  }, [isEdit, existingUser, firstName, lastName, email, phone, role, status, cohort, password, permissions])

  const canSubmit =
    !!firstName.trim() &&
    !!lastName.trim() &&
    !!email.trim() &&
    !!role &&
    (!passwordsEditable || (!!password && password === confirmPassword)) &&
    (!isEdit || isDirty)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    /**
     * Backend Integration
     *
     * if (isEdit) {
     *   await userService.updateUser(id, { firstName, lastName, email, phone, role, status, cohort, permissions, ...(password && { password }) })
     * } else {
     *   await userService.createUser({ firstName, lastName, email, phone, role, permissions, passwordMode, password, sendWelcomeEmail })
     * }
     */

    if (isEdit) {
      setSavedToast(true)
    } else {
      setSuccessOpen(true)
    }
  }


  return (
    <AdminDashboardLayout
      title={isEdit ? 'Edit User' : 'Add User'}
      subtitle="Add new Learners, instructors and admnistrators"
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-6 relative">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/admin/users" className="text-admin-primary font-semibold hover:underline">
              Users
            </Link>
            <ChevronRight size={14} className="text-admin-ash-4" />
            <ChevronRight size={14} className="text-admin-ash-4 -ml-2.5" />
            <span className="font-semibold text-admin-ink">{isEdit ? 'Edit User' : 'Add New User'}</span>
          </div>

          {savedToast && (
            <div className="flex items-center gap-2 rounded-xl border border-admin-ash-7 bg-white px-4 py-2.5 text-sm font-medium text-admin-ink shadow-sm animate-fade-in">
              <CheckCircle2 size={18} className="text-admin-primary shrink-0" />
              User successfully saved.
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 items-start">
          {/* Left column */}
          <div className="space-y-6">
            <Card title="1. Personal Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                    First Name <span className="text-admin-danger">*</span>
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary placeholder:text-admin-ash-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                    Last Name <span className="text-admin-danger">*</span>
                  </label>
                  <input
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary placeholder:text-admin-ash-4"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                    Email address <span className="text-admin-danger">*</span>
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-admin-ash-6 px-3.5 py-2.5 focus-within:border-admin-primary">
                    <Mail size={16} className="text-admin-ash-4 shrink-0" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="You@example.com"
                      className="w-full text-sm text-admin-ink outline-none placeholder:text-admin-ash-4"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-admin-ink mb-1.5">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary placeholder:text-admin-ash-4"
                  />
                </div>
              </div>
            </Card>

            <Card title="2. Account Information">
              <div className="space-y-5 pt-2">
                {!isEdit && (
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="passwordMode"
                        checked={passwordMode === 'temporary'}
                        onChange={() => setPasswordMode('temporary')}
                        className="mt-1 h-4 w-4 accent-admin-primary"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-admin-ink">
                          Generate Temporary Password
                        </span>
                        <span className="block text-xs text-admin-ash-3">
                          System will generate a password automatically.
                        </span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="passwordMode"
                        checked={passwordMode === 'default'}
                        onChange={() => setPasswordMode('default')}
                        className="mt-1 h-4 w-4 accent-admin-primary"
                      />
                      <span>
                        <span className="block text-sm font-semibold text-admin-ink">Use a default Password</span>
                        <span className="block text-xs text-admin-ash-3">
                          Enter a default password for users.
                        </span>
                      </span>
                    </label>
                  </div>
                )}

                <div className={`grid grid-cols-1 ${isEdit ? 'sm:grid-cols-2' : 'sm:grid-cols-2'} gap-5`}>
                  <div>
                    <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                      Password {!isEdit && <span className="text-admin-danger">*</span>}
                    </label>
                    <div
                      className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 ${
                        isEdit || passwordsEditable
                          ? 'border-admin-ash-6 focus-within:border-admin-primary'
                          : 'border-admin-ash-7 bg-admin-ash-7/40'
                      }`}
                    >
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!isEdit && !passwordsEditable}
                        placeholder="Enter password"
                        className="w-full text-sm text-admin-ink outline-none placeholder:text-admin-ash-4 bg-transparent disabled:cursor-not-allowed"
                      />
                      <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-admin-ash-4 shrink-0">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {isEdit ? (
                    <div>
                      <label className="block text-sm font-semibold text-admin-ink mb-1.5">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as UserStatus)}
                        className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm font-semibold text-admin-success outline-none focus:border-admin-primary bg-admin-success-light"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                        Confirm Password <span className="text-admin-danger">*</span>
                      </label>
                      <div
                        className={`flex items-center gap-2 rounded-lg border px-3.5 py-2.5 ${
                          passwordsEditable
                            ? 'border-admin-ash-6 focus-within:border-admin-primary'
                            : 'border-admin-ash-7 bg-admin-ash-7/40'
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
                  )}
                </div>

                {isEdit && (
                  <div className="sm:w-1/2 sm:pr-2.5">
                    <label className="block text-sm font-semibold text-admin-ink mb-1.5">Cohort</label>
                    <select
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                    >
                      <option value="">Unassigned</option>
                      <option>Cohort 1A</option>
                      <option>Cohort 2B</option>
                      <option>Cohort 3A</option>
                    </select>
                  </div>
                )}

                {!isEdit && (
                  <label className="flex items-center gap-3 cursor-pointer pt-1">
                    <Toggle checked={sendWelcomeEmail} onChange={setSendWelcomeEmail} />
                    <span>
                      <span className="block text-sm font-semibold text-admin-ink">
                        Send Welcome Email to the user
                      </span>
                      <span className="block text-xs text-admin-ash-3">
                        An email with login details and welcome message will be sent
                      </span>
                    </span>
                  </label>
                )}
              </div>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card title="3.Roles and Permission">
              <div className="space-y-5 pt-2">
                <div>
                  <label className="block text-sm font-semibold text-admin-ink mb-1.5">
                    Role <span className="text-admin-danger">*</span>
                  </label>
                  <select
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full rounded-lg border border-admin-ash-6 px-3.5 py-2.5 text-sm text-admin-ink outline-none focus:border-admin-primary"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className="text-sm font-semibold text-admin-ink">Permissions</p>
                  <p className="text-xs text-admin-ash-3 mb-4">
                    Choose what this user can access and manage
                  </p>
                  <PermissionsChecklist value={permissions} onChange={setPermissions} />
                </div>
              </div>
            </Card>

            {!isEdit && (
              <Card title="4. Summary">
                <div className="pt-1 space-y-3">
                  <p className="text-xs text-admin-ash-3 -mt-2 mb-3">
                    Review the information before creating the user
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-admin-ash-3">Name</span>
                    <span className="font-semibold text-admin-ink">{fullName || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-admin-ash-3">Email</span>
                    <span className="font-semibold text-admin-ink">{email || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-admin-ash-3">Role</span>
                    <span className="font-semibold text-admin-ink">{role || '-'}</span>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Footer actions */}
          {isEdit && savedToast ? (
            <div className="lg:col-span-2 flex justify-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/admin/users')}
                className="px-8 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
              >
                Back to users
              </button>
            </div>
          ) : (
            <div className="lg:col-span-2 flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => navigate('/admin/users')}
                className="px-6 py-3 rounded-xl border border-admin-ash-6 text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!canSubmit}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-admin-primary text-white text-sm font-semibold hover:bg-admin-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
              >
                <UserPlus size={18} />
                {isEdit ? 'Save Changes' : 'Add User'}
              </button>
            </div>
          )}
        </form>
      </div>

      <SuccessModal
        isOpen={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="User Added"
        description="The new user has been added and can be managed from the users page."
        primaryAction={{
          label: 'View Profile',
          onClick: () => navigate('/admin/users'),
        }}
        secondaryAction={{
          label: 'Back to dashboard',
          onClick: () => navigate('/admin/dashboard'),
        }}
      />
    </AdminDashboardLayout>
  )
}
