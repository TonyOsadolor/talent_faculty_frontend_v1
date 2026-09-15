import React, { useState } from 'react'

interface AvatarProps {
  name: string
  src?: string
  size?: number
}

const palette = ['bg-admin-info-light text-admin-info', 'bg-admin-success-light text-admin-success', 'bg-admin-warning-light text-admin-secondary', 'bg-admin-purple-light text-admin-purple', 'bg-admin-pink-light text-admin-pink']

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')

const Avatar: React.FC<AvatarProps> = ({ name, src, size = 36 }) => {
  const [failed, setFailed] = useState(false)
  const colorClass = palette[name.length % palette.length]

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover shrink-0"
        onError={() => setFailed(true)}
      />
    )
  }
 
  return (
    <span
      style={{ width: size, height: size }}
      className={`flex shrink-0 items-center justify-center rounded-full text-xs font-semibold ${colorClass}`}
    >
      {initials(name)}
    </span>
  )
}

export default Avatar
