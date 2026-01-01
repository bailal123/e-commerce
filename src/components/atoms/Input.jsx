import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
  ...props
}, ref) => {
  return (
    <div className={clsx('w-full', containerClassName)}>
      {label && (
        <label 
          htmlFor={props.id} 
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
        >
          {label}
          {props.required && <span className="text-red-500 mr-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={clsx(
            'input',
            leftIcon && 'pr-10',
            rightIcon && 'pl-10',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {rightIcon}
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className="mt-1.5 text-sm text-neutral-500">{hint}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
