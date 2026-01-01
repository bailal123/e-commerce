import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { VendorCard } from '../molecules'
import { VendorCardSkeleton } from '../atoms'

const VendorShowcase = ({
  vendors = [],
  title,
  subtitle,
  viewAllLink,
  variant = 'grid', // grid | carousel | featured
  columns = 3,
  isLoading = false,
  loadingCount = 6,
  className,
}) => {
  const scrollRef = useRef(null)

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (variant === 'carousel') {
    return (
      <section className={clsx('relative', className)}>
        {/* Header */}
        {(title || viewAllLink) && (
          <div className="flex items-end justify-between mb-6">
            <div>
              {title && (
                <h2 className="heading-3 text-neutral-900 dark:text-neutral-100">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-neutral-500 mt-1">{subtitle}</p>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {viewAllLink && (
                <Link 
                  to={viewAllLink}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm hidden sm:block"
                >
                  عرض الكل
                </Link>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="التمرير للخلف"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="التمرير للأمام"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth pb-4 -mb-4"
        >
          {isLoading ? (
            [...Array(loadingCount)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <VendorCardSkeleton />
              </div>
            ))
          ) : (
            vendors.map((vendor) => (
              <div key={vendor.id} className="flex-shrink-0 w-80">
                <VendorCard vendor={vendor} variant="featured" />
              </div>
            ))
          )}
        </div>
      </section>
    )
  }

  if (variant === 'featured') {
    return (
      <section className={className}>
        {/* Header */}
        {(title || viewAllLink) && (
          <div className="flex items-end justify-between mb-6">
            <div>
              {title && (
                <h2 className="heading-3 text-neutral-900 dark:text-neutral-100">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-neutral-500 mt-1">{subtitle}</p>
              )}
            </div>
            
            {viewAllLink && (
              <Link 
                to={viewAllLink}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                عرض الكل ←
              </Link>
            )}
          </div>
        )}

        {/* Featured Grid */}
        <div className={clsx('grid gap-6', gridCols[columns])}>
          {isLoading ? (
            [...Array(loadingCount)].map((_, index) => (
              <VendorCardSkeleton key={index} />
            ))
          ) : (
            vendors.map((vendor) => (
              <VendorCard 
                key={vendor.id} 
                vendor={vendor} 
                variant="featured"
              />
            ))
          )}
        </div>
      </section>
    )
  }

  // Default grid variant
  return (
    <section className={className}>
      {/* Header */}
      {(title || viewAllLink) && (
        <div className="flex items-end justify-between mb-6">
          <div>
            {title && (
              <h2 className="heading-3 text-neutral-900 dark:text-neutral-100">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-neutral-500 mt-1">{subtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <Link 
              to={viewAllLink}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              عرض الكل ←
            </Link>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={clsx('grid gap-6', gridCols[columns])}>
        {isLoading ? (
          [...Array(loadingCount)].map((_, index) => (
            <VendorCardSkeleton key={index} />
          ))
        ) : (
          vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        )}
      </div>
    </section>
  )
}

export default VendorShowcase
