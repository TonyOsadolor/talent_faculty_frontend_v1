import React, { useMemo, useRef, useState, useEffect } from 'react'
import {
  Search,
  SlidersHorizontal,
  SquarePen,
  Star,
  MoreVertical,
  Paperclip,
  Send,
  Mail,
  Phone,
  Calendar,
  CheckCheck,
  User,
  Ban,
  Flag,
  CheckCircle2,
} from 'lucide-react'

import AdminDashboardLayout from '../../components/layout/admin/layout/AdminDashboardLayout'
import ConfirmActionModal from '../../components/modals/ConfirmActionModal'
import { conversations as initialConversations } from '../../data/messages'
import type { ChatMessage, Conversation } from '../../data/messages'

type TabKey = 'all' | 'unread' | 'starred'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'starred', label: 'Starred' },
]

type ActionModalState = { type: 'suspend' | 'deactivate'; contact: Conversation } | null

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [search, setSearch] = useState('')
  const [activeId, setActiveId] = useState<string | null>(initialConversations[0]?.id ?? null)
  const [draft, setDraft] = useState('')
  const [actionModal, setActionModal] = useState<ActionModalState>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const threadEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const active = conversations.find((c) => c.id === activeId) ?? null

  const showToast = (message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 3000)
  }

  const filtered = useMemo(() => {
    return conversations.filter((c) => {
      if (activeTab === 'unread' && c.unreadCount === 0) return false
      if (activeTab === 'starred' && !c.starred) return false
      if (search && !`${c.name} ${c.preview}`.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [conversations, activeTab, search])

  // Keep the thread pinned to the newest message.
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages.length, activeId])

  const handleSelect = (id: string) => {
    setActiveId(id)
    setMenuOpen(false)
    // Opening a conversation clears its unread badge.
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)))
  }

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!draft.trim() || !active) return

    const message: ChatMessage = {
      id: `${active.id}-${Date.now()}`,
      from: 'me',
      body: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase(),
      read: false,
    }

    /**
     * Backend Integration
     *
     * await messageService.sendMessage({ conversationId: active.id, body: draft })
     */

    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, messages: [...c.messages, message], preview: message.body, time: message.time }
          : c
      )
    )
    setDraft('')
  }

  const toggleStar = () => {
    if (!active) return
    setConversations((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, starred: !c.starred } : c))
    )
    showToast(active.starred ? 'Removed from starred.' : 'Added to starred.')
  }

  const handleConfirmAction = () => {
    if (!actionModal) return
    showToast(
      actionModal.type === 'suspend'
        ? `${actionModal.contact.name} has been suspended.`
        : `${actionModal.contact.name} has been deactivated.`
    )
    setActionModal(null)
  }

  const handleNewChat = () => {
    setActiveId(null)
    setDraft('')
    showToast('Select a contact to start a new conversation.')
  }

  return (
    <AdminDashboardLayout
      title="Messages"
      subtitle="Communicate with learners, instructors and admins."
    >
      <div className="max-w-[1400px] w-full mx-auto">
        {toast && (
          <div className="fixed top-6 right-6 z-[110] flex items-center gap-2.5 rounded-xl border border-admin-ash-7 bg-white px-4 py-3 shadow-lg animate-fade-in">
            <CheckCircle2 size={20} className="text-admin-primary shrink-0" />
            <p className="text-sm text-admin-ash-1">{toast}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,360px)_minmax(0,1fr)_minmax(0,280px)] gap-5 items-start">
          {/* ---------- Conversation list ---------- */}
          <section className="rounded-2xl h-full border border-admin-ash-7 bg-white overflow-hidden flex flex-col max-h-[720px]">
            <div className="flex items-center gap-2 p-4">
              <div className="flex items-center bg-admin-ash-7/60 rounded-full px-4 py-2.5 flex-1 min-w-0">
                <Search size={16} className="text-admin-ash-3 mr-2 shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search messages, users....."
                  className="bg-transparent text-sm text-admin-ink outline-none w-full placeholder:text-admin-ash-4"
                />
              </div>
              <button
                title="Filters"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-admin-ash-6 text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors"
              >
                <SlidersHorizontal size={16} />
              </button>
              <button
                onClick={handleNewChat}
                title="New message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-admin-primary-light text-admin-primary hover:bg-admin-primary hover:text-white transition-colors"
              >
                <SquarePen size={16} />
              </button>
            </div>

            <div className="flex border-b border-admin-ash-7 px-4">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 pb-3 text-sm font-semibold border-b-[3px] transition-colors ${
                    activeTab === tab.key
                      ? 'border-admin-primary text-admin-primary'
                      : 'border-transparent text-admin-ash-3 hover:text-admin-ash-1'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-admin-ash-7">
              {filtered.map((c) => {
                const isActive = c.id === activeId
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelect(c.id)}
                    className={`w-full text-left flex items-start gap-3 px-4 py-3.5 transition-colors ${
                      isActive
                        ? 'bg-admin-primary-light border-l-[3px] border-admin-primary'
                        : 'hover:bg-admin-ash-7/30 border-l-[3px] border-transparent'
                    }`}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-11 w-11 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-admin-ink truncate">{c.name}</p>
                      <p className="text-xs text-admin-ash-3 truncate mt-0.5">{c.preview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      <span className="text-xs text-admin-ash-3 whitespace-nowrap">{c.time}</span>
                      {c.unreadCount > 0 && (
                        <span className="inline-flex min-w-[22px] items-center justify-center rounded-full bg-admin-primary-light px-1.5 py-0.5 text-[11px] font-bold text-admin-primary">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </button>
                )
              })}

              {filtered.length === 0 && (
                <p className="px-4 py-12 text-center text-sm text-admin-ash-3">
                  No conversations found.
                </p>
              )}
            </div>
          </section>

          {/* ---------- Chat thread ---------- */}
          <section className="rounded-2xl border border-admin-ash-7 bg-white overflow-hidden flex flex-col h-[720px]">
            {active ? (
              <>
                <div className="flex items-center gap-3 bg-admin-primary-light px-4 py-3.5 border-l-[3px] border-admin-primary relative">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="h-11 w-11 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-admin-ink truncate">{active.name}</p>
                    <p className="text-xs text-admin-ash-3">{active.role}</p>
                  </div>

                  {active.online && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-admin-ink">
                      <span className="h-2 w-2 rounded-full bg-admin-success" />
                      Online
                    </span>
                  )}

                  <button
                    onClick={toggleStar}
                    title={active.starred ? 'Unstar' : 'Star'}
                    className="text-admin-ash-2 hover:text-admin-secondary transition-colors"
                  >
                    <Star size={18} className={active.starred ? 'fill-admin-secondary text-admin-secondary' : ''} />
                  </button>

                  <button
                    onClick={() => setMenuOpen((o) => !o)}
                    title="More"
                    className="text-admin-ash-2 hover:text-admin-ink transition-colors"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-3 top-full mt-1 z-20 w-44 rounded-xl border border-admin-ash-7 bg-white py-1.5 shadow-lg">
                      <button
                        onClick={() => {
                          setMenuOpen(false)
                          setConversations((prev) =>
                            prev.map((c) => (c.id === active.id ? { ...c, unreadCount: 10 } : c))
                          )
                          showToast('Marked as unread.')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-admin-ash-1 hover:bg-admin-ash-7/40"
                      >
                        Mark as unread
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false)
                          setConversations((prev) =>
                            prev.map((c) => (c.id === active.id ? { ...c, messages: [] } : c))
                          )
                          showToast('Conversation cleared.')
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-admin-danger hover:bg-admin-danger-light/50"
                      >
                        Clear conversation
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-admin-ash-7" />
                    <span className="text-xs text-admin-ash-3 whitespace-nowrap">{active.dateLabel}</span>
                    <span className="h-px flex-1 bg-admin-ash-7" />
                  </div>

                  {active.messages.map((m) =>
                    m.from === 'them' ? (
                      <div key={m.id} className="flex items-start gap-2.5 max-w-[80%]">
                        <img
                          src={active.avatar}
                          alt={active.name}
                          className="h-8 w-8 rounded-full object-cover shrink-0"
                        />
                        <div>
                          <div className="rounded-xl bg-admin-ash-7/60 px-4 py-3">
                            <p className="text-sm text-admin-ink leading-relaxed">{m.body}</p>
                          </div>
                          <p className="mt-1 text-xs text-admin-ash-3">{m.time}</p>
                        </div>
                      </div>
                    ) : (
                      <div key={m.id} className="flex flex-col items-end ml-auto max-w-[80%]">
                        <div className="rounded-xl bg-admin-ash-7/60 px-4 py-3">
                          <p className="text-sm text-admin-ink leading-relaxed">{m.body}</p>
                        </div>
                        <p className="mt-1 flex items-center gap-1 text-xs text-admin-ash-3">
                          <CheckCheck size={14} className={m.read ? 'text-admin-primary' : 'text-admin-ash-4'} />
                          {m.time}
                        </p>
                      </div>
                    )
                  )}

                  {active.messages.length === 0 && (
                    <p className="py-10 text-center text-sm text-admin-ash-3">
                      No messages in this conversation yet.
                    </p>
                  )}

                  <div ref={threadEndRef} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center px-6">
                <p className="text-sm text-admin-ash-3 text-center">Select a Message or Start New Chat</p>
              </div>
            )}

            {/* Composer */}
            <form onSubmit={handleSend} className="flex items-center gap-3 p-4 border-t border-admin-ash-7">
              <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) showToast(`Attached ${file.name}`)
              }} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach file"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-admin-ash-6 text-admin-ash-2 hover:bg-admin-ash-7/40 transition-colors"
              >
                <Paperclip size={16} />
              </button>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                disabled={!active}
                placeholder="Type your message....."
                className="flex-1 rounded-xl bg-admin-ash-7/50 px-4 py-2.5 text-sm text-admin-ink outline-none placeholder:text-admin-ash-4 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!active || !draft.trim()}
                title="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-admin-primary-light text-admin-primary hover:bg-admin-primary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-admin-primary-light disabled:hover:text-admin-primary"
              >
                <Send size={16} />
              </button>
            </form>
          </section>

          {/* ---------- Contact information ---------- */}
          <aside className="rounded-2xl h-full border border-admin-ash-7 bg-white p-5 hidden xl:block">
            <h2 className="text-base font-bold text-admin-ink mb-5">Contact Information</h2>

            {active ? (
              <>
                <div className="flex items-start gap-5 border-l-[3px] border-admin-primary pl-3">
                  <img
                    src={active.avatar}
                    alt={active.name}
                    className="h-11 w-11 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1 text-start">
                    <p className="text-sm font-bold text-admin-ink truncate">{active.name}</p>
                    <p className="text-xs font-semibold text-admin-secondary mt-0.5">{active.role}</p>
                    {active.online && (
                      <p className="flex items-center justify-start gap-1.5 text-xs text-admin-ash-2 mt-1">
                        <span className="h-2 w-2 rounded-full bg-admin-success" />
                        Online
                      </p>
                    )}
                  </div>
                  
                </div>

                <div className="mt-12 space-y-4">
                  <p className="flex items-start gap-2.5 text-sm text-admin-ash-2 break-all">
                    <Mail size={16} className="text-admin-ash-3 shrink-0 mt-0.5" />
                    {active.email}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-admin-ash-2">
                    <Phone size={16} className="text-admin-ash-3 shrink-0" />
                    {active.phone}
                  </p>
                  <p className="flex items-center gap-2.5 text-sm text-admin-ash-2">
                    <Calendar size={16} className="text-admin-ash-3 shrink-0" />
                    {active.joined}
                  </p>
                </div>

                <h3 className="text-base font-bold text-admin-ink mt-45 mb-4">Actions</h3>
                <div className="space-y-3.5">
                  <a
                    href={`mailto:${active.email}`}
                    className="flex items-center gap-2.5 text-sm text-admin-ash-1 hover:text-admin-primary transition-colors"
                  >
                    <User size={16} className="shrink-0" />
                    View Profile
                  </a>
                  <button
                    onClick={() => setActionModal({ type: 'suspend', contact: active })}
                    className="flex items-center gap-2.5 text-sm text-admin-secondary hover:opacity-70 transition-opacity"
                  >
                    <Ban size={16} className="shrink-0" />
                    Suspend User
                  </button>
                  <button
                    onClick={() => setActionModal({ type: 'deactivate', contact: active })}
                    className="flex items-center gap-2.5 text-sm text-admin-danger hover:opacity-70 transition-opacity"
                  >
                    <Flag size={16} className="shrink-0" />
                    Deactivate User
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-admin-ash-3">Select a conversation to see contact details.</p>
            )}
          </aside>
        </div>
      </div>

      <ConfirmActionModal
        open={actionModal?.type === 'suspend'}
        tone="warning"
        title="Are You Sure?"
        description={`You are about to suspend ${actionModal?.contact.name ?? ''}. Suspended users can be restored!`}
        confirmLabel="Yes, Suspend!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />

      <ConfirmActionModal
        open={actionModal?.type === 'deactivate'}
        tone="danger"
        title="Are You Sure?"
        description={`You are about to deactivate ${actionModal?.contact.name ?? ''}. They will lose access to the platform!`}
        confirmLabel="Yes, Deactivate!"
        cancelLabel="No, Go Back"
        onConfirm={handleConfirmAction}
        onCancel={() => setActionModal(null)}
      />
    </AdminDashboardLayout>
  )
}
