import { Star } from 'lucide-react'
import { clsx } from 'clsx'

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  readonly = true,
  onChange,
  className,
}) => {
  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  }

  const handleClick = (rating) => {
    if (!readonly && onChange) {
      onChange(rating)
    }
  }

  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= value
          const isHalf = !isFilled && starValue - 0.5 <= value

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              disabled={readonly}
              className={clsx(
                'focus:outline-none transition-transform',
                !readonly && 'hover:scale-110 cursor-pointer',
                readonly && 'cursor-default'
              )}
              aria-label={`${starValue} من ${max} نجوم`}
            >
              <Star
                className={clsx(
                  sizes[size],
                  isFilled && 'text-amber-400 fill-amber-400',
                  isHalf && 'text-amber-400 fill-amber-400/50',
                  !isFilled && !isHalf && 'text-neutral-300 dark:text-neutral-600'
                )}
              />
            </button>
          )
        })}
      </div>

      {showValue && (
        <span className={clsx(
          'font-medium text-neutral-700 dark:text-neutral-300',
          textSizes[size]
        )}>
          {value.toFixed(1)}
        </span>
      )}

      {reviewCount !== undefined && (
        <span className={clsx(
          'text-neutral-500 dark:text-neutral-400',
          textSizes[size]
        )}>
          ({reviewCount.toLocaleString('ar-EG')} تقييم)
        </span>
      )}
    </div>
  )
}

export default Rating
