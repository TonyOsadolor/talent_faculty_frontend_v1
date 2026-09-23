import React from 'react'
import { ChevronDown } from 'lucide-react'

interface TimeRangeSelectProps {
  value: string
  onChange: (value: string) => void
  options: string[]
}

const TimeRangeSelect: React.FC<TimeRangeSelectProps> = ({ value, onChange, options }) => (
  <div className="relative shrink-0">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none rounded-xl border border-admin-ash-6 bg-white py-2 pl-4 pr-9 text-sm font-semibold text-admin-ink outline-none focus:border-admin-primary cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    <ChevronDown
      size={15}
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-admin-ash-3"
    />
  </div>
)

export default TimeRangeSelect
