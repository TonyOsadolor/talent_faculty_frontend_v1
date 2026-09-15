import React from 'react'
import type { UserRole } from '../../../../types/user'

const styles: Record<UserRole, string> = {
  Instructor: 'text-admin-secondary',
  Administrator: 'text-admin-purple',
  Learner: 'text-admin-ink',
}

const RoleBadge: React.FC<{ role: UserRole }> = ({ role }) => (
  <span className={`font-bold text-sm ${styles[role]}`}>{role}</span>
)

export default RoleBadge
