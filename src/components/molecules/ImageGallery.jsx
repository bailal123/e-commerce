import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { clsx } from 'clsx'
import { Image } from '../atoms'

const ImageGallery = ({
  images = [],
  productName,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleMouseMove = (e) => {
    if (!isZoomed) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handleNext()
    if (e.key === 'ArrowRight') handlePrevious()
  }

  if (!images || images.length === 0) {
    return (
      <div className={clsx('aspect-square bg-neutral-100 dark:bg-neutral-800 rounded-2xl', className)}>
        <div className="w-full h-full flex items-center justify-center text-neutral-400">
          لا توجد صور
        </div>
      </div>
    )
  }

  return (
    <div className={clsx('space-y-4', className)} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Main Image */}
      <div className="relative group">
        <div
          className={clsx(
            'relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800',
            isZoomed && 'cursor-zoom-out',
            !isZoomed && 'cursor-zoom-in'
          )}
          onClick={() => setIsZoomed(!isZoomed)}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <img
            src={images[activeIndex]}
            alt={`${productName} - صورة ${activeIndex + 1}`}
            className={clsx(
              'w-full h-full object-contain transition-transform duration-200',
              isZoomed && 'scale-150'
            )}
            style={
              isZoomed
                ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` }
                : {}
            }
          />
        </div>

        {/* Zoom indicator */}
        <div className={clsx(
          'absolute bottom-4 right-4 p-2 bg-black/50 text-white rounded-lg',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'flex items-center gap-2 text-sm'
        )}>
          <ZoomIn className="w-4 h-4" />
          <span>اضغط للتكبير</span>
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevious() }}
              className={clsx(
                'absolute top-1/2 right-4 -translate-y-1/2',
                'w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-800/90',
                'flex items-center justify-center shadow-lg',
                'opacity-0 group-hover:opacity-100 transition-opacity',
                'hover:bg-white dark:hover:bg-neutral-700'
              )}
              aria-label="الصورة السابقة"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); handleNext() }}
              className={clsx(
                'absolute top-1/2 left-4 -translate-y-1/2',
                'w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-800/90',
                'flex items-center justify-center shadow-lg',
                'opacity-0 group-hover:opacity-100 transition-opacity',
                'hover:bg-white dark:hover:bg-neutral-700'
              )}
              aria-label="الصورة التالية"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 text-white text-sm rounded-lg">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={clsx(
                'flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden',
                'border-2 transition-all duration-200',
                activeIndex === index
                  ? 'border-primary-500 ring-2 ring-primary-500/30'
                  : 'border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
              )}
              aria-label={`عرض الصورة ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            >
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
