import React from 'react'
import { Check } from 'lucide-react'
import { PERMISSIONS } from '../../../../types/user'
import type { PermissionMap } from '../../../../types/user'

interface PermissionsChecklistProps {
  value: PermissionMap
  onChange: (next: PermissionMap) => void
}

const PermissionsChecklist: React.FC<PermissionsChecklistProps> = ({ value, onChange }) => {
  const toggle = (key: keyof PermissionMap) => {
    onChange({ ...value, [key]: !value[key] })
  }

  return (
    <div className="space-y-4">
      {PERMISSIONS.map((perm) => {
        const checked = value[perm.key]
        return (
          <label
            key={perm.key}
            className="flex items-start gap-3 cursor-pointer select-none"
          >
            <span
              onClick={(e) => {
                e.preventDefault()
                toggle(perm.key)
              }}
              className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-colors ${
                checked
                  ? 'bg-admin-primary border-admin-primary'
                  : 'bg-white border-admin-ash-6'
              }`}
            >
              {checked && <Check size={12} className="text-white" strokeWidth={3} />}
            </span>
            <span>
              <span className="block text-sm font-semibold text-admin-ink">{perm.label}</span>
              <span className="block text-xs text-admin-ash-3">{perm.description}</span>
            </span>
          </label>
        )
      })}
    </div>
  )
}

export default PermissionsChecklist
