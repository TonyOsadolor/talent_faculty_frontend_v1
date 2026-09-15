import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users as UsersIcon,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  UserPlus,
  FileSpreadsheet,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Ban,
  CheckCircle2,
} from 'lucide-react'

import AdminDashboardLayout from '../../../components/layout/admin/layout/AdminDashboardLayout'
import StatCard from '../../../components/ui/admin/StatCard'
import Avatar from '../../../components/ui/admin/Avatar'
import Pagination from '../../../components/ui/admin/Pagination'
import FilterDropdown from '../../../components/ui/admin/FilterDropdown'
import RoleBadge from '../../../components/ui/admin/users/RoleBadge'
import UserStatusPill from '../../../components/ui/admin/users/UserStatusPill'
import AddUserChoiceModal, { type AddUserMethod } from '../../../components/ui/admin/users/AddUserChoiceModal'
import GenerateReportChoiceModal, { type ReportRole } from '../../../components/ui/admin/users/GenerateReportChoiceModal'
import ConfirmActionModal from '../../../components/modals/ConfirmActionModal'

import { users as initialUsers, overviewStats } from '../../../data/users'
import type { AppUser, UserRole, UserStatus } from '../../../types/user'

type TabKey = 'all' | 'learners' | 'instructors' | 'administrators'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All Users' },
  { key: 'learners', label: 'Learners' },
  { key: 'instructors', label: 'Instructors' },
  { key: 'administrators', label: 'Administrators' },
]

const roleForTab: Record<Exclude<TabKey, 'all'>, UserRole> = {
  learners: 'Learner',
  instructors: 'Instructor',
  administrators: 'Administrator',
}

type ActionModalState =
  | { type: 'delete' | 'suspend'; user: AppUser }
  | null

const PAGE_SIZE = 6

export default function Users() {
  const navigate = useNavigate()

  const [users, setUsers] = useState<AppUser[]>(initialUsers)
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCohort, setSelectedCohort] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)

  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [actionModal, setActionModal] = useState<ActionModalState>(null)
  const [toast, setToast] = useState<string | null>(null)

  const cohortOptions = useMemo(
    () => Array.from(new Set(users.map((u) => u.cohort).filter((c): c is string => !!c))),
    [users]
  )

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCohort(null)
    setSelectedStatus(null)
    setSelectedRole(null)
    setPage(1)
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (activeTab !== 'all' && u.role !== roleForTab[activeTab]) return false
      if (selectedCohort && u.cohort !== selectedCohort) return false
      if (selectedStatus && u.status !== selectedStatus) return false
      if (selectedRole && u.role !== selectedRole) return false
      if (searchTerm) {
        const q = searchTerm.toLowerCase()
        if (!u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
      }
      return true
    })
  }, [users, activeTab, selectedCohort, selectedStatus, selectedRole, searchTerm])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pagedUsers = filteredUsers.slice(pageStart, pageStart + pageSize)

  const roleLabel = activeTab === 'all' ? 'users' : activeTab

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3500)
  }

  const handleRowClick = (user: AppUser) => {
    if (user.role === 'Administrator') {
      navigate(`/admin/users/${user.id}/edit`)
    } else {
      navigate(`/admin/users/${user.id}`)
    }
  }

  const handleConfirmAction = () => {
    if (!actionModal) return
    const { type, user } = actionModal

    if (type === 'delete') {
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
      showToast(`${user.name} has been deleted.`)
    } else {
      const nextStatus: UserStatus = user.status === 'Suspended' ? 'Active' : 'Suspended'
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u)))
      showToast(
        nextStatus === 'Suspended' ? `${user.name} has been suspended.` : `${user.name} has been restored.`
      )
    }

    setActionModal(null)
  }

  const handleAddUserContinue = (method: AddUserMethod) => {
    setAddUserModalOpen(false)
    navigate(method === 'bulk' ? '/admin/users/bulk-upload' : '/admin/users/new')
  }

  const handleReportContinue = (role: ReportRole) => {
    setReportModalOpen(false)
    navigate(`/admin/users/reports/${role}`)
  }

  return (
    <AdminDashboardLayout title="Users Management" subtitle="Continue to monitor the progress of Users">
      <div className="max-w-[1400px] w-full mx-auto space-y-6 relative">
        {toast && (
          <div className="fixed top-6 right-6 z-[110] flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-3 shadow-lg animate-fade-in">
            <CheckCircle2 size={20} className="text-admin-primary shrink-0" />
            <p className="text-sm text-admin-ash-1">{toast}</p>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setReportModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-admin-ash-6 rounded-xl text-sm font-semibold text-admin-ink hover:bg-admin-ash-7/50 transition-colors"
          >
            <FileSpreadsheet size={18} />
            Generate Report
          </button>
          <button
            onClick={() => setAddUserModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-admin-primary text-white rounded-xl text-sm font-semibold hover:bg-admin-primary-dark transition-colors"
          >
            <UserPlus size={18} />
            Add User
          </button>
        </div>

        {/* User Overview — only on the All Users tab */}
        {activeTab === 'all' && (
          <section className="rounded-2xl border border-admin-ash-7 p-5 space-y-4">
            <h2 className="text-base font-bold text-admin-ink">User Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<UsersIcon size={16} />}
                tone="blue"
                label="Total Users"
                value={overviewStats.totalUsers.value.toLocaleString()}
                delta={overviewStats.totalUsers.delta}
                period={overviewStats.totalUsers.caption}
              />
              <StatCard
                icon={<ShieldCheck size={16} />}
                tone="purple"
                label="Total Admins"
                value={overviewStats.totalAdmins.value}
                delta={overviewStats.totalAdmins.delta}
                period={overviewStats.totalAdmins.caption}
              />
              <StatCard
                icon={<GraduationCap size={16} />}
                tone="green"
                label="Total Learners"
                value={overviewStats.totalLearners.value.toLocaleString()}
                delta={overviewStats.totalLearners.delta}
                period={overviewStats.totalLearners.caption}
              />
              <StatCard
                icon={<UserCheck size={16} />}
                tone="orange"
                label="Total Instructors"
                value={overviewStats.totalInstructors.value}
                delta={overviewStats.totalInstructors.delta}
                period={overviewStats.totalInstructors.caption}
              />
            </div>
          </section>
        )}

        {/* Tabs */}
        <div className="flex border-b border-admin-ash-7 gap-8 text-sm font-semibold overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key)
                setPage(1)
              }}
              className={`pb-3 border-b-[3px] whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'border-admin-primary text-admin-primary'
                  : 'border-transparent text-admin-ash-3 hover:text-admin-ash-1'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-admin-ash-7/60 rounded-full px-4 py-2.5 w-full sm:w-80">
            <Search size={16} className="text-admin-ash-3 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="Search users, courses or lessons..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="bg-transparent text-sm text-admin-ink outline-none w-full placeholder:text-admin-ash-4"
            />
          </div>

          <FilterDropdown label="Cohort" value={selectedCohort} options={cohortOptions} onChange={(v) => { setSelectedCohort(v); setPage(1) }} />
          <FilterDropdown label="Status" value={selectedStatus} options={['Active', 'Disabled', 'Suspended']} onChange={(v) => { setSelectedStatus(v); setPage(1) }} />
          <FilterDropdown label="Role" value={selectedRole} options={['Instructor', 'Administrator', 'Learner']} onChange={(v) => { setSelectedRole(v); setPage(1) }} />

          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-admin-ash-2 hover:text-admin-ink px-3 py-2.5 text-sm font-medium border border-admin-ash-6 rounded-xl bg-white"
          >
            Clear filter
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Table */}
        <div className="bg-white overflow-x-auto border border-admin-ash-7 rounded-xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-admin-ash-7/40 text-admin-ink text-sm font-semibold border-b border-admin-ash-7">
                <th className="py-4 px-6 w-10">
                  <input type="checkbox" className="rounded border-admin-ash-6 text-admin-primary focus:ring-admin-primary" />
                </th>
                <th className="py-4 px-6">Users</th>
                <th className="py-4 px-6">Role</th>
                <th className="py-4 px-6">Cohort</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-ash-7 text-sm">
              {pagedUsers.map((user) => (
                <tr
                  key={user.id}
                  onClick={() => handleRowClick(user)}
                  className="hover:bg-admin-ash-7/20 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="rounded border-admin-ash-6 text-admin-primary focus:ring-admin-primary" />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} src={user.avatar} size={40} />
                      <div>
                        <p className="font-bold text-admin-ink">{user.name}</p>
                        <p className="text-xs text-admin-ash-3 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="py-4 px-6 text-admin-ash-1 font-semibold text-sm">
                    {user.cohort ?? '-'}
                  </td>
                  <td className="py-4 px-6">
                    <UserStatusPill status={user.status} />
                  </td>
                  <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => navigate(`/admin/users/${user.id}/edit`)}
                        className="text-admin-info hover:opacity-70 transition-opacity"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => setActionModal({ type: 'delete', user })}
                        className="text-admin-danger hover:opacity-70 transition-opacity"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button
                        onClick={() => setActionModal({ type: 'suspend', user })}
                        className="text-admin-secondary hover:opacity-70 transition-opacity"
                        title={user.status === 'Suspended' ? 'Restore' : 'Suspend'}
                      >
                        <Ban size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {pagedUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-admin-ash-3">
                    No users match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
          showingFrom={filteredUsers.length === 0 ? 0 : pageStart + 1}
          showingTo={Math.min(pageStart + pageSize, filteredUsers.length)}
          totalCount={filteredUsers.length}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setPage(1)
          }}
        />
        <p className="text-xs text-admin-ash-3 -mt-4">
          Showing {filteredUsers.length === 0 ? 0 : pageStart + 1} to{' '}
          {Math.min(pageStart + pageSize, filteredUsers.length)} of {filteredUsers.length} {roleLabel}
        </p>
      </div>

      <AddUserChoiceModal
        isOpen={addUserModalOpen}
        onClose={() => setAddUserModalOpen(false)}
        onContinue={handleAddUserContinue}
      />

      <GenerateReportChoiceModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onContinue={handleReportContinue}
      />

      <ConfirmActionModal
        open={actionModal?.type === 'delete'}
        tone="danger"
        title="Are You Sure?"
        description="You are about to permanently delete user. Deleted items cannot be recovered!"
        confirmLabel="Yes, Delete!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />

      <ConfirmActionModal
        open={actionModal?.type === 'suspend'}
        tone="warning"
        title="Are You Sure?"
        description={
          actionModal?.user.status === 'Suspended'
            ? `You are about to restore ${actionModal.user.name}.`
            : 'You are about to suspend user. Suspended users can be restored!'
        }
        confirmLabel={actionModal?.user.status === 'Suspended' ? 'Yes, Restore!' : 'Yes, Suspend!'}
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />
    </AdminDashboardLayout>
  )
}
