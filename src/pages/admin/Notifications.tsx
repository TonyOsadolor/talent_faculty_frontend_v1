import React, { useMemo, useState } from 'react'
import {
  ClipboardList,
  UserRound,
  BookOpen,
  Megaphone,
  BarChart3,
  Archive,
  Trash2,
  CheckCircle2,
} from 'lucide-react'

import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'
import Pagination from '../../components/ui/admin/Pagination'
import ConfirmActionModal from '../../components/modals/ConfirmActionModal'
import { notifications as initialNotifications } from '../../data/adminNotifications'
import type { AdminNotification, NotificationKind } from '../../data/adminNotifications'

type TabKey = 'all' | 'pending' | 'unread' | 'mentions' | 'messages' | 'archived'

const kindStyles: Record<NotificationKind, { icon: React.ReactNode; bg: string; text: string }> = {
  task: { icon: <ClipboardList size={20} strokeWidth={1.5} />, bg: 'bg-admin-warning-light', text: 'text-admin-secondary' },
  registration: { icon: <UserRound size={20} strokeWidth={1.5} />, bg: 'bg-admin-info-light', text: 'text-admin-info' },
  course: { icon: <BookOpen size={20} strokeWidth={1.5} />, bg: 'bg-admin-success-light', text: 'text-admin-success' },
  announcement: { icon: <Megaphone size={20} strokeWidth={1.5} />, bg: 'bg-admin-danger-light', text: 'text-admin-danger' },
  report: { icon: <BarChart3 size={20} strokeWidth={1.5} />, bg: 'bg-admin-ash-7', text: 'text-admin-ash-3' },
  message: { icon: null, bg: '', text: '' },
}

type ActionModalState = { type: 'archive' | 'delete'; item: AdminNotification } | null

const PAGE_SIZE = 6

export default function Notifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE)
  const [actionModal, setActionModal] = useState<ActionModalState>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const counts = useMemo(
    () => ({
      all: notifications.filter((n) => !n.archived).length,
      pending: notifications.filter((n) => n.pendingTask && !n.archived).length,
      unread: notifications.filter((n) => n.unread && !n.archived).length,
      mentions: notifications.filter((n) => n.mention && !n.archived).length,
      messages: notifications.filter((n) => n.kind === 'message' && !n.archived).length,
      archived: notifications.filter((n) => n.archived).length,
    }),
    [notifications]
  )

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: `All` },
    { key: 'pending', label: `Pending Tasks (${counts.pending})` },
    { key: 'unread', label: `Unread (${counts.unread})` },
    { key: 'mentions', label: `Mentions (${counts.mentions})` },
    { key: 'messages', label: `Messages (${counts.messages})` },
    { key: 'archived', label: `Archived (${counts.archived})` },
  ]

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      if (activeTab === 'all') return !n.archived
      if (activeTab === 'pending') return n.pendingTask && !n.archived
      if (activeTab === 'unread') return n.unread && !n.archived
      if (activeTab === 'mentions') return n.mention && !n.archived
      if (activeTab === 'messages') return n.kind === 'message' && !n.archived
      return n.archived
    })
  }, [notifications, activeTab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = (currentPage - 1) * pageSize
  const pageRows = filtered.slice(pageStart, pageStart + pageSize)

  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.includes(r.id))

  const toggleAll = () => {
    if (allOnPageSelected) {
      setSelected((prev) => prev.filter((id) => !pageRows.some((r) => r.id === id)))
    } else {
      setSelected((prev) => Array.from(new Set([...prev, ...pageRows.map((r) => r.id)])))
    }
  }

  const toggleOne = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleRowClick = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)))
  }

  const handleConfirmAction = () => {
    if (!actionModal) return
    const { type, item } = actionModal

    /**
     * Backend Integration
     *
     * type === 'archive'
     *   ? await notificationService.archiveNotification(item.id)
     *   : await notificationService.deleteNotification(item.id)
     */

    if (type === 'archive') {
      setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, archived: true } : n)))
      showToast('Notification archived.')
    } else {
      setNotifications((prev) => prev.filter((n) => n.id !== item.id))
      showToast('Notification deleted.')
    }

    setSelected((prev) => prev.filter((id) => id !== item.id))
    setActionModal(null)
  }

  return (
    <AdminDashboardLayout
      title="Notifications"
      subtitle="Stay updated with important activities and alerts."
    >
      <div className="max-w-[1400px] w-full mx-auto space-y-6 relative">
        {toast && (
          <div className="fixed top-6 right-6 z-[110] flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-3 shadow-lg animate-fade-in">
            <CheckCircle2 size={20} className="text-admin-primary shrink-0" />
            <p className="text-sm text-admin-ash-1">{toast}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-10 border-b border-admin-ash-7 text-sm font-semibold overflow-x-auto">
          {tabs.map((tab) => (
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

        {/* Table */}
        <div className="bg-white overflow-x-auto border border-admin-ash-7 rounded-xl">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <thead>
              <tr className="bg-admin-ash-7/40 border-b border-admin-ash-7">
                <th className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allOnPageSelected}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded accent-admin-primary"
                  />
                </th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Alert</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Date</th>
                <th className="px-3 py-3.5 text-sm font-semibold text-admin-ink">Status</th>
                <th className="px-3 pr-5 py-3.5 text-sm font-semibold text-admin-ink">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-ash-7">
              {pageRows.map((item) => {
                const style = kindStyles[item.kind]
                const muted = item.archived

                return (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.id)}
                    className={`cursor-pointer transition-colors ${muted ? 'opacity-60' : 'hover:bg-admin-ash-7/20'}`}
                  >
                    <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.includes(item.id)}
                        onChange={() => toggleOne(item.id)}
                        className="h-4 w-4 rounded accent-admin-primary"
                      />
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-3 min-w-[260px]">
                        {item.kind === 'message' ? (
                          <img
                            src={item.avatar}
                            alt={item.title}
                            className="h-11 w-11 rounded-full object-cover shrink-0"
                          />
                        ) : (
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${muted ? 'bg-admin-ash-7 text-admin-ash-4' : `${style.bg} ${style.text}`}`}
                          >
                            {style.icon}
                          </span>
                        )}
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${muted ? 'text-admin-ash-3' : 'text-admin-ink'}`}>
                            {item.title}
                          </p>
                          <p className="text-xs text-admin-ash-3 truncate">{item.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <p className="text-sm text-admin-ash-1">{item.date}</p>
                      <p className="text-xs text-admin-ash-3">{item.time}</p>
                    </td>
                    <td className="px-3 py-3.5">
                      {item.unread && !item.archived && (
                        <span className="block h-2 w-2 rounded-full bg-admin-info" />
                      )}
                    </td>
                    <td className="px-3 pr-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-3">
                        {!item.archived && (
                          <button
                            onClick={() => setActionModal({ type: 'archive', item })}
                            className="text-admin-secondary hover:opacity-70 transition-opacity"
                            title="Archive"
                          >
                            <Archive size={17} strokeWidth={1.5} />
                          </button>
                        )}
                        <button
                          onClick={() => setActionModal({ type: 'delete', item })}
                          className="text-admin-danger hover:opacity-70 transition-opacity"
                          title="Delete"
                        >
                          <Trash2 size={17} strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}

              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-sm text-admin-ash-3">
                    No notifications here.
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
          showingFrom={filtered.length === 0 ? 0 : pageStart + 1}
          showingTo={Math.min(pageStart + pageSize, filtered.length)}
          totalCount={filtered.length}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setPage(1)
          }}
        />
      </div>

      <ConfirmActionModal
        open={actionModal?.type === 'archive'}
        tone="warning"
        title="Are You Sure?"
        description="You are about to archive this notification. Archived items can be recovered!"
        confirmLabel="Yes, Archive!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />

      <ConfirmActionModal
        open={actionModal?.type === 'delete'}
        tone="danger"
        title="Are You Sure?"
        description="You are about to permanently delete this notification. Deleted items cannot be recovered!"
        confirmLabel="Yes, Delete!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />
    </AdminDashboardLayout>
  )
}
