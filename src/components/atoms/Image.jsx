import { useState, useMemo } from 'react'
import { clsx } from 'clsx'

/**
 * Image optimization utilities
 * Supports: Unsplash, Cloudinary, imgix, and generic URLs via wsrv.nl proxy
 */
const optimizeImageUrl = (url, options = {}) => {
  if (!url) return url
  
  const { width, height, quality = 80, format = 'auto' } = options
  
  // Unsplash images - use their native optimization
  if (url.includes('unsplash.com')) {
    const urlObj = new URL(url)
    if (width) urlObj.searchParams.set('w', width)
    if (height) urlObj.searchParams.set('h', height)
    urlObj.searchParams.set('auto', 'format')
    urlObj.searchParams.set('q', quality)
    urlObj.searchParams.set('fit', 'crop')
    return urlObj.toString()
  }
  
  // Cloudinary images
  if (url.includes('cloudinary.com')) {
    const transforms = []
    if (width) transforms.push(`w_${width}`)
    if (height) transforms.push(`h_${height}`)
    transforms.push(`q_${quality}`)
    transforms.push('f_auto')
    transforms.push('c_fill')
    
    return url.replace('/upload/', `/upload/${transforms.join(',')}/`)
  }
  
  // imgix images
  if (url.includes('imgix.net')) {
    const urlObj = new URL(url)
    if (width) urlObj.searchParams.set('w', width)
    if (height) urlObj.searchParams.set('h', height)
    urlObj.searchParams.set('auto', 'format,compress')
    urlObj.searchParams.set('q', quality)
    return urlObj.toString()
  }
  
  // For other images, use wsrv.nl (free image proxy/optimizer)
  // Only apply to external images (not local)
  if (url.startsWith('http') && !url.includes('localhost')) {
    const params = new URLSearchParams()
    params.set('url', url)
    if (width) params.set('w', width)
    if (height) params.set('h', height)
    params.set('q', quality)
    params.set('output', 'webp') // Convert to WebP
    params.set('fit', 'cover')
    return `https://wsrv.nl/?${params.toString()}`
  }
  
  return url
}

/**
 * Generate responsive srcSet for different screen sizes
 */
const generateSrcSet = (url, widths = [320, 480, 640, 768, 1024, 1280]) => {
  if (!url) return undefined
  
  return widths
    .map(w => `${optimizeImageUrl(url, { width: w })} ${w}w`)
    .join(', ')
}

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
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  quality = 80,
  optimize = true, // Enable automatic optimization
  responsive = false, // Enable automatic srcSet generation
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Optimize image URL
  const optimizedSrc = useMemo(() => {
    if (!optimize) return src
    return optimizeImageUrl(src, { width, height, quality })
  }, [src, width, height, quality, optimize])

  // Generate responsive srcSet if enabled
  const responsiveSrcSet = useMemo(() => {
    if (srcSet) return srcSet // Use provided srcSet
    if (!responsive || !src) return undefined
    return generateSrcSet(src)
  }, [src, srcSet, responsive])

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
        src={hasError ? fallback : optimizedSrc}
        alt={alt}
        loading={priority ? 'eager' : (lazy ? 'lazy' : 'eager')}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        srcSet={responsiveSrcSet}
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

// Export utilities for use in other components
export { optimizeImageUrl, generateSrcSet }
export default Image
