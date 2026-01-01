import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { CategoryCard } from '../molecules'
import { CategoryCardSkeleton } from '../atoms'

const CategoryGrid = ({
  categories = [],
  title,
  subtitle,
  viewAllLink,
  variant = 'default', // default | featured | minimal
  columns = 6,
  isLoading = false,
  loadingCount = 6,
  className,
}) => {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6',
    8: 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8',
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

        {/* Featured Grid - Asymmetric layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {isLoading ? (
            [...Array(loadingCount)].map((_, index) => (
              <CategoryCardSkeleton key={index} />
            ))
          ) : (
            <>
              {/* Large featured item */}
              {categories[0] && (
                <div className="col-span-2 row-span-2">
                  <CategoryCard 
                    category={categories[0]} 
                    variant="featured" 
                    className="h-full"
                  />
                </div>
              )}
              {/* Other items */}
              {categories.slice(1, 5).map((category) => (
                <CategoryCard 
                  key={category.id || category.slug} 
                  category={category} 
                  variant="featured"
                />
              ))}
            </>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'minimal') {
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

        {/* Minimal Grid */}
        <div className={clsx(
          'grid gap-2',
          gridCols[columns]
        )}>
          {isLoading ? (
            [...Array(loadingCount)].map((_, index) => (
              <div key={index} className="skeleton h-24 rounded-2xl" />
            ))
          ) : (
            categories.map((category) => (
              <CategoryCard 
                key={category.id || category.slug} 
                category={category} 
                variant="minimal"
              />
            ))
          )}
        </div>
      </section>
    )
  }

  // Default variant
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

      {/* Default Grid */}
      <div className={clsx(
        'grid gap-4 md:gap-6',
        gridCols[columns]
      )}>
        {isLoading ? (
          [...Array(loadingCount)].map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))
        ) : (
          categories.map((category) => (
            <CategoryCard 
              key={category.id || category.slug} 
              category={category}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default CategoryGrid
