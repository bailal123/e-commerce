import { clsx } from 'clsx'

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  className,
  status,
  verified = false,
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
    '3xl': 'w-24 h-24 text-3xl',
  }

  const statusColors = {
    online: 'bg-success-500',
    offline: 'bg-neutral-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
  }

  const getInitials = (name) => {
    if (!name) return '؟'
    return name
      .split(' ')
      .map(word => word[0])
      .slice(0, 2)
      .join('')
  }

  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={clsx(
            'rounded-full object-cover ring-2 ring-white dark:ring-neutral-900',
            sizes[size],
            className
          )}
        />
      ) : (
        <div
          className={clsx(
            'rounded-full bg-gradient-to-br from-primary-400 to-primary-600',
            'flex items-center justify-center text-white font-medium',
            'ring-2 ring-white dark:ring-neutral-900',
            sizes[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}

      {/* Status indicator */}
      {status && (
        <span
          className={clsx(
            'absolute bottom-0 left-0 block rounded-full ring-2 ring-white dark:ring-neutral-900',
            statusColors[status],
            size === 'xs' && 'w-1.5 h-1.5',
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-2.5 h-2.5',
            size === 'lg' && 'w-3 h-3',
            size === 'xl' && 'w-3.5 h-3.5',
            size === '2xl' && 'w-4 h-4',
            size === '3xl' && 'w-5 h-5',
          )}
        />
      )}

      {/* Verified badge */}
      {verified && (
        <span className={clsx(
          'absolute -bottom-0.5 -left-0.5 rounded-full bg-primary-500 text-white',
          'flex items-center justify-center',
          size === 'xs' && 'w-3 h-3',
          size === 'sm' && 'w-3.5 h-3.5',
          size === 'md' && 'w-4 h-4',
          size === 'lg' && 'w-5 h-5',
          size === 'xl' && 'w-6 h-6',
          size === '2xl' && 'w-7 h-7',
          size === '3xl' && 'w-8 h-8',
        )}>
          <svg className="w-2/3 h-2/3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </div>
  )
}

export default Avatar
