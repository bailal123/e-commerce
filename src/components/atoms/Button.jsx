import { forwardRef } from 'react'
import { clsx } from 'clsx'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
}

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs rounded-lg',
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-5 py-3 text-base rounded-xl',
  xl: 'px-6 py-3.5 text-lg rounded-2xl',
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'btn',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        isLoading && 'opacity-70 cursor-wait',
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg 
            className="animate-spin h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>جاري التحميل...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
