import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Courses', href: '#Explore' },
    { label: 'Features', href: '#' },
    { label: 'Meet The Team', href: '/meet-the-team' },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="top-0 fixed z-50 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2.5 group transition-transform hover:scale-105 duration-200">
              <img src="./logo1.png" alt="Talent Faculty Logo" className='h-12 w-auto object-contain' />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isRouterLink = link.href.startsWith('/');
              const active = isActive(link.href);
              if (isRouterLink) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 group ${active
                      ? 'text-primary bg-green-50 border border-green-200 shadow-2xs font-semibold'
                      : 'text-neutral-700 hover:text-primary hover:bg-neutral-50'
                      }`}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-all duration-200"
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-neutral-800 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 rounded-xl px-4 py-2 transition-all hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="relative inline-flex items-center justify-center rounded-xl bg-primary hover:bg-primary-dark px-5 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-200 hover:scale-105"
            >
              Enroll Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 transition"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white/95 backdrop-blur-xl animate-fade-in" id="mobile-menu">
          <div className="space-y-2 px-5 py-5">
            {navLinks.map((link) => {
              const isRouterLink = link.href.startsWith('/');
              const active = isActive(link.href);
              if (isRouterLink) {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all ${active
                      ? 'text-primary bg-green-50 font-bold'
                      : 'text-neutral-800 hover:bg-neutral-50'
                      }`}
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

