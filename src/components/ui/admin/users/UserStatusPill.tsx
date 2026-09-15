import React from 'react'
import type { UserStatus } from '../../../../types/user'

const styles: Record<UserStatus, string> = {
  Active: 'bg-admin-success-light text-admin-success',
  Disabled: 'bg-admin-ash-7 text-admin-ash-3',
  Suspended: 'bg-admin-warning-light text-admin-secondary',
}

const UserStatusPill: React.FC<{ status: UserStatus }> = ({ status }) => (
  <span
    className={`inline-flex w-28 items-center justify-center rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap ${styles[status]}`}
  >
    {status}
  </span>
)

export default UserStatusPill
