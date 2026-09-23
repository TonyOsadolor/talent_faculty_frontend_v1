import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, TrendingUp, ClipboardList,
  FileText, Award, MessageSquare, User, Settings,
  HelpCircle, LogOut, ChevronDown, ChevronUp, X,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'

interface SidebarProps {
  onLogoutClick: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const mainMenuItems = [
  { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  { label: 'My Courses', icon: <BookOpen size={20} />, path: '/courses' },
  { label: 'Deliverables', icon: <TrendingUp size={20} />, path: '/Deliverables' },
    { label: 'Group Project', icon: <BookOpen size={20} />, path: '/Group Project' },
  { label: 'Progress', icon: <TrendingUp size={20} />, path: '/progress' },
  { label: 'Assessments', icon: <ClipboardList size={20} />, path: '/assessments' },
  { label: 'Assignments', icon: <FileText size={20} />, path: '/assignments' },
  { label: 'Certificates', icon: <Award size={20} />, path: '/certificates' },
  { label: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
  { label: 'Profile', icon: <User size={20} />, path: '/profile' },
]

const otherToolsItems = [
  { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  { label: 'Help & Support', icon: <HelpCircle size={20} />, path: '/help' },
]

const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick, mobileOpen, onMobileClose }) => {
  const location = useLocation()
  const [toolsOpen, setToolsOpen] = useState(true)
  const [menuOpen, setMenuOpen] = useState(true)

  // Persist collapsed state in localStorage
  const [collapsed, setCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    return saved ? JSON.parse(saved) : false
  })

  // Save to localStorage whenever sidebar is collapsed
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed))
  }, [collapsed])

  // Highlights active parent item for both direct routes and nested sub-routes
  const isActive = (path: string) => location.pathname.startsWith(path)

  // Only close mobile sidebar on mobile viewport
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      onMobileClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen bg-[#EDF7EE] flex flex-col
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${collapsed ? 'lg:w-[76px]' : 'w-[260px]'}
        `}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2 px-5 py-5 ${collapsed ? 'lg:justify-center lg:px-3' : ''}`}>
          <div className="flex items-center gap-2 overflow-hidden">
            <img
              src="./logo1.png"
              alt="Talent-Flow Logo"
              className={`h-18 object-contain transition-all duration-300 ${collapsed ? 'lg:h-8' : ''}`}
            />
          </div>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex ml-auto p-1.5 rounded-lg text-neutral-500 hover:text-primary hover:bg-primary/10 transition-all"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
          </button>

          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden text-neutral-600 hover:text-neutral-800 ml-auto"
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {/* Main Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider hover:text-neutral-700 transition-colors ${collapsed ? 'lg:justify-center' : ''}`}
          >
            {!collapsed && (menuOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
            {!collapsed && <span>Main Menu</span>}
          </button>

          {menuOpen && (
            <div className="space-y-1 mt-1">
              {mainMenuItems.map((item) => {
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`
                      group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${collapsed ? 'lg:justify-center lg:px-2' : ''}
                      ${active
                        ? 'bg-[#057834] text-white shadow-sm'
                        : 'text-neutral-600 hover:bg-primary/10 hover:text-primary'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>

                    <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
                      {item.label}
                    </span>

                    {active && collapsed && (
                      <span className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                        <span className="block w-1.5 h-6 bg-primary rounded-l-full" />
                      </span>
                    )}

                    {collapsed && (
                      <span className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
                        {item.label}
                        <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-800 rotate-45" />
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          )}

          <div className="my-4 border-t border-neutral-200/60 mx-2" />

          {/* Other Tools */}
          <button
            onClick={() => setToolsOpen(!toolsOpen)}
            className={`flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider hover:text-neutral-700 transition-colors ${collapsed ? 'lg:justify-center' : ''}`}
          >
            {!collapsed && (toolsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
            {!collapsed && <span>Other Tools</span>}
          </button>

          {toolsOpen && (
            <div className="space-y-1 mt-1">
              {otherToolsItems.map((item) => {
                const active = isActive(item.path)
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`
                      group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${collapsed ? 'lg:justify-center lg:px-2' : ''}
                      ${active
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-neutral-600 hover:bg-primary/10 hover:text-primary'
                      }
                    `}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
                      {item.label}
                    </span>
                    {active && collapsed && (
                      <span className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                        <span className="block w-1.5 h-6 bg-primary rounded-l-full" />
                      </span>
                    )}
                    {collapsed && (
                      <span className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
                        {item.label}
                        <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-800 rotate-45" />
                      </span>
                    )}
                  </Link>
                )
              })}

              <button
                onClick={() => { onLogoutClick(); handleNavClick() }}
                className={`
                  group relative flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                  text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full text-left
                  ${collapsed ? 'lg:justify-center lg:px-2' : ''}
                `}
              >
                <span className="flex-shrink-0"><LogOut size={20} /></span>
                <span className={`whitespace-nowrap transition-all duration-300 ${collapsed ? 'lg:hidden' : ''}`}>
                  Log Out
                </span>
                {collapsed && (
                  <span className="hidden lg:group-hover:block absolute left-full ml-3 px-3 py-1.5 bg-neutral-800 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 shadow-lg">
                    Log Out
                    <span className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-neutral-800 rotate-45" />
                  </span>
                )}
              </button>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar