import React, { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Calendar defaults to the month shown in the design (August 2026). */
const DEFAULT_YEAR = 2026
const DEFAULT_MONTH = 7 // August

const MiniCalendar: React.FC = () => {
  const [year, setYear] = useState(DEFAULT_YEAR)
  const [month, setMonth] = useState(DEFAULT_MONTH)

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const result: (number | null)[] = Array(firstDay).fill(null)
    for (let d = 1; d <= daysInMonth; d += 1) result.push(d)
    return result
  }, [year, month])

  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  const handleMonthChange = (value: string) => {
    const [m, y] = value.split('|')
    setMonth(Number(m))
    setYear(Number(y))
  }

  // Offer the surrounding 12 months so the control is genuinely usable.
  const monthOptions = useMemo(() => {
    const opts: { label: string; value: string }[] = []
    for (let offset = -6; offset <= 6; offset += 1) {
      const d = new Date(DEFAULT_YEAR, DEFAULT_MONTH + offset, 1)
      opts.push({
        label: `${MONTHS[d.getMonth()]}, ${d.getFullYear()}`,
        value: `${d.getMonth()}|${d.getFullYear()}`,
      })
    }
    return opts
  }, [])

  return (
    <div className="rounded-2xl border border-admin-ash-7 bg-white p-5">
      <div className="flex items-center justify-between gap-3 mb-5">
        <h3 className="text-base font-bold text-admin-ink">Calendar</h3>
        <div className="relative shrink-0">
          <select
            value={`${month}|${year}`}
            onChange={(e) => handleMonthChange(e.target.value)}
            className="appearance-none rounded-xl border border-admin-ash-6 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-admin-ink outline-none focus:border-admin-primary cursor-pointer"
          >
            {monthOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-admin-ash-3"
          />
        </div>
      </div>

      <p className="text-center text-base font-bold text-admin-ink mb-4">
        {MONTHS[month]} {year}
      </p>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_LABELS.map((d, i) => (
          <span
            key={d}
            className={`rounded-md bg-admin-primary-light py-1.5 text-center text-xs font-semibold ${
              i === 0 ? 'text-admin-danger' : 'text-admin-ash-2'
            }`}
          >
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, idx) => {
          if (day === null) return <span key={`empty-${idx}`} />

          const isSunday = idx % 7 === 0
          const isToday = isCurrentMonth && today.getDate() === day

          return (
            <span
              key={day}
              className={`flex h-9 items-center justify-center rounded-full text-sm ${
                isToday
                  ? 'bg-admin-warning-light font-bold text-admin-ink'
                  : isSunday
                    ? 'text-admin-danger'
                    : 'text-admin-ash-1'
              }`}
            >
              {day}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default MiniCalendar
