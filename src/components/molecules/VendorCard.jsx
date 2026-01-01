import { Link } from 'react-router-dom'
import { MapPin, Star, Package, UserPlus, MessageCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { Avatar, Badge, Rating, Button } from '../atoms'

const VendorCard = ({
  vendor,
  variant = 'default',
  className,
}) => {
  const {
    id,
    name,
    slug,
    logo,
    banner,
    description,
    rating,
    reviewCount,
    productCount,
    followerCount,
    location,
    isVerified,
    isTopSeller,
    joinedDate,
    categories,
  } = vendor

  if (variant === 'minimal') {
    return (
      <Link
        to={`/vendor/${slug}`}
        className={clsx(
          'flex items-center gap-3 p-3 rounded-xl',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'transition-colors',
          className
        )}
      >
        <Avatar 
          src={logo} 
          name={name} 
          size="md" 
          verified={isVerified} 
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {name}
          </h4>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Rating value={rating} size="sm" />
            <span>({reviewCount})</span>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <article className={clsx(
        'card overflow-hidden group',
        className
      )}>
        {/* Banner */}
        <div className="relative h-32 overflow-hidden">
          <img
            src={banner || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {isVerified && (
              <Badge variant="primary" icon={<Star className="w-3 h-3" />}>
                موثق
              </Badge>
            )}
            {isTopSeller && (
              <Badge variant="accent">الأكثر مبيعاً</Badge>
            )}
          </div>
        </div>

        {/* Avatar overlapping banner */}
        <div className="relative px-4">
          <div className="absolute -top-8">
            <Avatar
              src={logo}
              name={name}
              size="xl"
              verified={isVerified}
              className="ring-4 ring-white dark:ring-neutral-900"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-12 px-4 pb-4">
          <Link to={`/vendor/${slug}`}>
            <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 hover:text-primary-600 transition-colors">
              {name}
            </h3>
          </Link>

          {location && (
            <p className="flex items-center gap-1 text-sm text-neutral-500 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </p>
          )}

          <Rating 
            value={rating} 
            reviewCount={reviewCount} 
            size="sm" 
            showValue 
            className="mt-2"
          />

          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="text-center">
              <p className="font-bold text-neutral-900 dark:text-neutral-100">
                {productCount?.toLocaleString('ar-EG')}
              </p>
              <p className="text-xs text-neutral-500">منتج</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-neutral-900 dark:text-neutral-100">
                {followerCount?.toLocaleString('ar-EG')}
              </p>
              <p className="text-xs text-neutral-500">متابع</p>
            </div>
            <div className="flex-1" />
            <Button size="sm" variant="outline" leftIcon={<UserPlus className="w-4 h-4" />}>
              متابعة
            </Button>
          </div>
        </div>
      </article>
    )
  }

  // Default variant
  return (
    <article className={clsx('card card-hover p-6', className)}>
      <div className="flex items-start gap-4">
        <Avatar
          src={logo}
          name={name}
          size="xl"
          verified={isVerified}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <Link to={`/vendor/${slug}`}>
                <h3 className="font-bold text-neutral-900 dark:text-neutral-100 hover:text-primary-600 transition-colors">
                  {name}
                </h3>
              </Link>
              
              {location && (
                <p className="flex items-center gap-1 text-sm text-neutral-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {location}
                </p>
              )}
            </div>
            
            {isTopSeller && (
              <Badge variant="accent" size="sm">Top</Badge>
            )}
          </div>

          <Rating 
            value={rating} 
            reviewCount={reviewCount} 
            size="sm" 
            showValue 
            className="mt-2"
          />

          {description && (
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">
              {description}
            </p>
          )}

          {/* Categories */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {categories.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="neutral" size="sm">
                  {cat}
                </Badge>
              ))}
              {categories.length > 3 && (
                <Badge variant="neutral" size="sm">
                  +{categories.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats & Actions */}
          <div className="flex items-center gap-4 mt-4">
            <span className="flex items-center gap-1 text-sm text-neutral-500">
              <Package className="w-4 h-4" />
              {productCount?.toLocaleString('ar-EG')} منتج
            </span>
            
            <div className="flex-1" />
            
            <Button size="sm" variant="ghost">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button size="sm" leftIcon={<UserPlus className="w-4 h-4" />}>
              متابعة
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default VendorCard
