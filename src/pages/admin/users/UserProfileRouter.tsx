import { Navigate, useParams } from 'react-router-dom'
import { getUser } from '../../../data/users'
import InstructorProfile from './InstructorProfile'

export default function UserProfileRouter() {
  const { id } = useParams<{ id: string }>()
  const user = id ? getUser(id) : undefined

  if (!user) return <InstructorProfile />

  if (user.role === 'Learner') {
    return <Navigate to={`/admin/users/${id}/overview`} replace />
  }

  if (user.role === 'Administrator') {
    return <Navigate to={`/admin/users/${id}/edit`} replace />
  }

  return <InstructorProfile />
}
