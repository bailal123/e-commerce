import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { ProductCard } from '../molecules'
import { ProductCardSkeleton } from '../atoms'

const ProductGrid = ({
  products = [],
  title,
  subtitle,
  viewAllLink,
  variant = 'grid', // grid | carousel
  columns = 4,
  isLoading = false,
  loadingCount = 8,
  className,
}) => {
  const scrollRef = useRef(null)

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
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
                <a 
                  href={viewAllLink}
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm hidden sm:block"
                >
                  عرض الكل
                </a>
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
              <div key={index} className="flex-shrink-0 w-64">
                <ProductCardSkeleton />
              </div>
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64">
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>
    )
  }

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
            <a 
              href={viewAllLink}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              عرض الكل ←
            </a>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={clsx('grid gap-4 md:gap-6', gridCols[columns])}>
        {isLoading ? (
          [...Array(loadingCount)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductGrid
