import { clsx } from 'clsx'

const variants = {
  primary: 'badge-primary',
  accent: 'badge-accent',
  success: 'badge-success',
  warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
}

const sizes = {
  sm: 'px-2 py-0.5 text-2xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  dot = false,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        'badge',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full',
          variant === 'success' && 'bg-success-500',
          variant === 'warning' && 'bg-amber-500',
          variant === 'danger' && 'bg-red-500',
          variant === 'primary' && 'bg-primary-500',
          variant === 'accent' && 'bg-accent-500',
          variant === 'neutral' && 'bg-neutral-500',
        )} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
