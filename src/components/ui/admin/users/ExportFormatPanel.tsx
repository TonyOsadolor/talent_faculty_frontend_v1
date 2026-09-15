import React from 'react'
import { Mail } from 'lucide-react'
import Toggle from './Toggle'

export type ExportFormat = 'CSV' | 'EXCEL (XLSX)' | 'PDF' | 'JSON'

const FORMATS: ExportFormat[] = ['CSV', 'EXCEL (XLSX)', 'PDF', 'JSON']

interface ExportFormatPanelProps {
  format: ExportFormat
  onFormatChange: (format: ExportFormat) => void
  sendToAdminEmail: boolean
  onSendToAdminEmailChange: (value: boolean) => void
  sendToCustomEmail: boolean
  onSendToCustomEmailChange: (value: boolean) => void
  customEmail: string
  onCustomEmailChange: (value: string) => void
}

const ExportFormatPanel: React.FC<ExportFormatPanelProps> = ({
  format,
  onFormatChange,
  sendToAdminEmail,
  onSendToAdminEmailChange,
  sendToCustomEmail,
  onSendToCustomEmailChange,
  customEmail,
  onCustomEmailChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
        {FORMATS.map((f) => (
          <label key={f} className="flex items-center gap-2.5 cursor-pointer select-none">
            <span
              onClick={() => onFormatChange(f)}
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                format === f ? 'border-admin-primary' : 'border-admin-ash-6'
              }`}
            >
              {format === f && <span className="h-2.5 w-2.5 rounded-full bg-admin-primary" />}
            </span>
            <span className="text-sm font-medium text-admin-ink">{f}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-3">
          <Toggle checked={sendToAdminEmail} onChange={onSendToAdminEmailChange} />
          <div>
            <p className="text-sm font-semibold text-admin-ink">Send to Admin Email</p>
            <p className="text-xs text-admin-ash-3">Send report to admin registered email</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Toggle checked={sendToCustomEmail} onChange={onSendToCustomEmailChange} />
          <p className="text-sm font-semibold text-admin-ink whitespace-nowrap">
            Send to Custom Email address
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-admin-ash-6 px-3 py-2 flex-1 min-w-[220px]">
          <Mail size={16} className="text-admin-ash-3 shrink-0" />
          <input
            type="email"
            value={customEmail}
            onChange={(e) => onCustomEmailChange(e.target.value)}
            placeholder="you@example.com"
            className="w-full text-sm outline-none text-admin-ink placeholder:text-admin-ash-4"
          />
        </div>
      </div>
    </div>
  )
}

export default ExportFormatPanel
