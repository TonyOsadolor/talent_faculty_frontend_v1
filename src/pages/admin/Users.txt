import { useState } from 'react'
import {
  Users,
  UserCheck,
  GraduationCap,
  ShieldCheck,
  UserPlus,
  FileSpreadsheet,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Ban,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import AdminSidebar from '../../components/layout/admin/AdminSidebar'
import AdminTopBar from '../../components/layout/admin/AdminTopBar'

const MOCK_USERS = [
  {
    id: '1',
    name: 'Aduname Elizabeth',
    email: 'eliz34@yahoomail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'Instructor',
    roleColor: 'text-orange-500',
    cohort: 'Cohort 1A',
    status: 'Active',
    statusBg: 'bg-[#D1FADF] text-[#027A48]',
  },
  {
    id: '2',
    name: 'Adaure Clement',
    email: 'Elda4@yahoomail.com',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98a?w=150',
    role: 'Instructor',
    roleColor: 'text-orange-500',
    cohort: 'Cohort 2B',
    status: 'Active',
    statusBg: 'bg-[#D1FADF] text-[#027A48]',
  },
  {
    id: '3',
    name: 'Musa Muhammad',
    email: 'amusog@trueminds.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'Administrator',
    roleColor: 'text-fuchsia-600',
    cohort: '-',
    status: 'Active',
    statusBg: 'bg-[#D1FADF] text-[#027A48]',
  },
  {
    id: '4',
    name: 'Kenneth Michael',
    email: 'kend@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'Learner',
    roleColor: 'text-[#008753]',
    cohort: '-',
    status: 'Disabled',
    statusBg: 'bg-gray-200 text-gray-500',
  },
  {
    id: '5',
    name: 'Ikediri Linus',
    email: 'liked@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150',
    role: 'Learner',
    roleColor: 'text-[#008753]',
    cohort: 'Cohort 3A',
    status: 'Suspended',
    statusBg: 'bg-orange-100 text-orange-600',
  },
  {
    id: '6',
    name: 'Trueminds Innovations',
    email: 'admin@trueminds.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
    role: 'Administrator',
    roleColor: 'text-fuchsia-600',
    cohort: '-',
    status: 'Active',
    statusBg: 'bg-[#D1FADF] text-[#027A48]',
  },
]

export default function AdminUsers() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'learners' | 'instructors' | 'administrators'>('all')

  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCohort, setSelectedCohort] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleLogout = () => {
    console.log('Logging out...')
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCohort('')
    setSelectedStatus('')
    setSelectedRole('')
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      {/* Sidebar Component */}
      <AdminSidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
        onLogoutClick={handleLogout}
      />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TopBar Component */}
        <AdminTopBar
          title="Users Management"
          subtitle="Continue to monitor the progress of Users"
          onMenuClick={() => setMobileOpen(true)}
          onLogoutClick={handleLogout}
        />

        <main className="p-4 sm:p-8 space-y-8 max-w-[1400px] mx-auto w-full bg-white">

          {/* Top Action Buttons */}
          <div className="flex justify-end gap-4">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors shadow-sm">
              <FileSpreadsheet size={18} />
              Generate Report
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#008753] text-white rounded-lg text-sm font-semibold hover:bg-[#007043] transition-colors shadow-sm">
              <UserPlus size={18} />
              Add User
            </button>
          </div>

          {/* Section 1: User Overview Cards */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">User Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Users */}
              <div className="bg-[#EEF2FF] p-6 rounded-xl flex flex-col items-start gap-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                  <div className="p-1.5 bg-blue-100 rounded-md text-blue-500">
                    <Users size={16} />
                  </div>
                  <span>Total Users</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">2,346</div>
                  <p className="text-xs mt-1"><span className="font-semibold text-emerald-600">+120</span> <span className="text-gray-500">This Month</span></p>
                </div>
              </div>

              {/* Total Admins */}
              <div className="bg-[#FDF4FF] p-6 rounded-xl flex flex-col items-start gap-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                  <div className="p-1.5 bg-purple-100 rounded-md text-fuchsia-500">
                    <ShieldCheck size={16} />
                  </div>
                  <span>Total Admins</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-fuchsia-500">10</div>
                  <p className="text-xs mt-1"><span className="font-semibold text-emerald-600">+4</span> <span className="text-gray-500">This Month</span></p>
                </div>
              </div>

              {/* Total Learners */}
              <div className="bg-[#ECFDF5] p-6 rounded-xl flex flex-col items-start gap-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                  <div className="p-1.5 bg-emerald-100 rounded-md text-[#008753]">
                    <GraduationCap size={16} />
                  </div>
                  <span>Total Learners</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#008753]">2,306</div>
                  <p className="text-xs mt-1"><span className="font-semibold text-emerald-600">+118</span> <span className="text-gray-500">In last 7 days</span></p>
                </div>
              </div>

              {/* Total Instructors */}
              <div className="bg-[#FFF8F1] p-6 rounded-xl flex flex-col items-start gap-4 shadow-sm">
                <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                  <div className="p-1.5 bg-orange-100 rounded-md text-orange-500">
                    <UserCheck size={16} />
                  </div>
                  <span>Total Instructors</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">40</div>
                  <p className="text-xs mt-1"><span className="font-semibold text-emerald-600">+2</span> <span className="text-gray-500">This Month</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Users Table & Filters */}
          <section className="space-y-6">

            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 space-x-8 text-sm font-semibold max-lg:overflow-x-auto">
              {[
                { id: 'all', label: 'All Users' },
                { id: 'learners', label: 'Learners' },
                { id: 'instructors', label: 'Instructors' },
                { id: 'administrators', label: 'Administrators' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 border-b-[3px] transition-colors ${activeTab === tab.id
                    ? 'border-[#008753] text-[#008753]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-gray-100/80 rounded-full px-4 py-2.5 w-full sm:w-80 border border-gray-200/50">
                <Search size={16} className="text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search users, courses or lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-sm text-gray-700 outline-none w-full placeholder:text-gray-400"
                />
              </div>

              <div className="relative">
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 outline-none cursor-pointer hover:border-gray-300 shadow-sm"
                >
                  <option value="">All Cohort</option>
                  <option value="1a">Cohort 1A</option>
                  <option value="2b">Cohort 2B</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 outline-none cursor-pointer hover:border-gray-300 shadow-sm"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                  <option value="suspended">Suspended</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-600 outline-none cursor-pointer hover:border-gray-300 shadow-sm"
                >
                  <option value="">All Role</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Administrator</option>
                  <option value="learner">Learner</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              <button
                onClick={clearFilters}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 px-3 py-2.5 text-sm font-medium border border-gray-200 rounded-lg bg-white shadow-sm"
              >
                Clear filter
                <SlidersHorizontal size={14} />
              </button>
            </div>

            {/* Users Data Table */}
            <div className="bg-white overflow-x-auto border border-gray-100 rounded-md">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[#F8F9FA] text-gray-700 text-sm font-semibold border-b border-gray-200">
                    <th className="py-4 px-6 w-10">
                      <input type="checkbox" className="rounded border-gray-300 text-[#008753] focus:ring-[#008753]" />
                    </th>
                    <th className="py-4 px-6">Users</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Cohort</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {MOCK_USERS.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <input type="checkbox" className="rounded border-gray-300 bg-gray-200 text-[#008753] focus:ring-[#008753]" />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-bold text-gray-900">{user.name}</p>
                            <p className="text-[13px] text-gray-400 font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className={`py-4 px-6 font-bold text-[13px] ${user.roleColor}`}>
                        {user.role}
                      </td>
                      <td className="py-4 px-6 text-gray-800 font-semibold text-[13px]">
                        {user.cohort}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-4 py-1.5 rounded-full text-[13px] font-bold inline-block w-28 text-center ${user.statusBg}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-3">
                          <button className="text-blue-500 hover:text-blue-700 transition-colors" title="Edit">
                            <Pencil size={18} />
                          </button>
                          <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                            <Trash2 size={18} />
                          </button>
                          <button className="text-amber-500 hover:text-amber-700 transition-colors" title="Suspend/Block">
                            <Ban size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer / Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between py-2 gap-4 text-sm text-gray-500">
              <span className="font-medium">Showing 1 to 5 of 2346 users</span>

              <div className="flex items-center gap-2">
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
                  <ChevronLeft size={16} />
                </button>
                <button className="px-3 py-1 rounded bg-[#EBF5FF] text-blue-600 font-bold">1</button>
                <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 font-medium">2</button>
                <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 font-medium">3</button>
                <button className="p-1.5 rounded border border-gray-200 hover:bg-gray-50 text-gray-500">
                  <ChevronRight size={16} />
                </button>
                <button className="px-3 py-1 rounded border border-gray-200 hover:bg-gray-50 font-medium ml-2">43</button>

                <div className="relative ml-1">
                  <select className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm font-medium text-gray-700 outline-none cursor-pointer hover:bg-gray-50">
                    <option>Last page</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

          </section>
        </main>
      </div>
    </div>
  )
}