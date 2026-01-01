import { useState } from 'react'
import { clsx } from 'clsx'

const Image = ({
  src,
  alt,
  className,
  containerClassName,
  fallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3C/svg%3E',
  aspectRatio = 'aspect-square',
  objectFit = 'object-cover',
  lazy = true,
  priority = false,
  srcSet,
  sizes,
  width,
  height,
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
        loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
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
