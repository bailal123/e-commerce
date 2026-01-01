import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { Image } from '../atoms'

const CategoryCard = ({
  category,
  variant = 'default',
  className,
}) => {
  const { name, slug, image, productCount, description, icon } = category

  if (variant === 'minimal') {
    return (
      <Link
        to={`/category/${slug}`}
        className={clsx(
          'flex flex-col items-center gap-3 p-4',
          'rounded-2xl transition-all duration-300',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'group',
          className
        )}
      >
        <div className={clsx(
          'w-16 h-16 rounded-2xl',
          'bg-gradient-to-br from-primary-100 to-primary-200',
          'dark:from-primary-900/30 dark:to-primary-800/30',
          'flex items-center justify-center',
          'group-hover:scale-110 transition-transform duration-300'
        )}>
          {icon ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            <Image 
              src={image} 
              alt={name} 
              className="w-10 h-10 object-contain" 
              aspectRatio=""
            />
          )}
        </div>
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">
          {name}
        </span>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        to={`/category/${slug}`}
        className={clsx(
          'relative overflow-hidden rounded-3xl group',
          'aspect-[4/3] md:aspect-[3/2]',
          className
        )}
      >
        <Image
          src={image}
          alt={name}
          aspectRatio=""
          className="w-full h-full group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
            {name}
          </h3>
          {description && (
            <p className="text-white/80 text-sm line-clamp-2 mb-3">
              {description}
            </p>
          )}
          <span className="inline-flex items-center gap-2 text-white/90 text-sm">
            <span>{productCount?.toLocaleString('ar-EG')} منتج</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      to={`/category/${slug}`}
      className={clsx(
        'card card-hover overflow-hidden group',
        className
      )}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={name}
          aspectRatio=""
          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {productCount && (
          <span className="absolute top-3 left-3 badge badge-primary">
            {productCount?.toLocaleString('ar-EG')} منتج
          </span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 transition-colors">
          {name}
        </h3>
        {description && (
          <p className="text-sm text-neutral-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}

export default CategoryCard
