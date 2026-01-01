import { useState } from 'react'
import { clsx } from 'clsx'

const Image = ({
  src,
  alt,
  className,
  containerClassName,
  fallback = '/images/placeholder.jpg',
  aspectRatio = 'aspect-square',
  objectFit = 'object-cover',
  lazy = true,
  srcSet,
  sizes,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = (e) => {
    setIsLoading(false)
    onLoad?.(e)
  }

  const handleError = (e) => {
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }

  return (
    <div className={clsx(
      'relative overflow-hidden bg-neutral-100 dark:bg-neutral-800',
      aspectRatio,
      containerClassName
    )}>
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 skeleton shimmer" />
      )}

      <img
        src={hasError ? fallback : src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        srcSet={srcSet}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={clsx(
          'w-full h-full transition-opacity duration-300',
          objectFit,
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        {...props}
      />
    </div>
  )
}

export default Image
