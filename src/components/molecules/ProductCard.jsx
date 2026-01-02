import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { clsx } from 'clsx'
import { Image, Badge, Rating, Button } from '../atoms'
import { useCart } from '../../context/CartContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'

const ProductCard = ({
  product,
  variant = 'default',
  className,
}) => {
  const { addToCart } = useCart()
  const {
    id,
    name,
    slug,
    price,
    salePrice,
    image,
    images,
    rating,
    reviewCount,
    vendor,
    category,
    stock,
    isNew,
    isFeatured,
    tags,
  } = product

  const inStock = stock > 0
  const displayPrice = salePrice || price
  const originalPrice = salePrice ? price : null
  const discountPercent = originalPrice 
    ? calculateDiscount(originalPrice, displayPrice) 
    : 0

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  if (variant === 'horizontal') {
    return (
      <article className={clsx('card card-hover flex gap-4 p-4', className)}>
        <Link to={`/product/${slug}`} className="flex-shrink-0 w-32">
          <Image
            src={image || images?.[0]}
            alt={name}
            aspectRatio="aspect-square"
            className="rounded-xl"
          />
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link 
            to={`/vendor/${vendor?.slug}`}
            className="text-xs text-neutral-500 hover:text-primary-600 transition-colors"
          >
            {vendor?.name}
          </Link>
          
          <Link to={`/product/${slug}`}>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mt-1 line-clamp-2 hover:text-primary-600 transition-colors">
              {name}
            </h3>
          </Link>
          
          <Rating value={rating} reviewCount={reviewCount} size="sm" className="mt-2" />
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="price text-lg">{formatPrice(displayPrice)}</span>
              {originalPrice && (
                <span className="price-old">{formatPrice(originalPrice)}</span>
              )}
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!inStock}
              leftIcon={<ShoppingCart className="w-4 h-4" />}
            >
              أضف
            </Button>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={clsx('card card-hover group relative', className)}>
      {/* Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {isNew && <Badge variant="primary">جديد</Badge>}
        {isFeatured && <Badge variant="accent">مميز</Badge>}
        {discountPercent > 0 && (
          <Badge variant="danger">-{discountPercent}%</Badge>
        )}
        {!inStock && (
          <Badge variant="neutral">نفذت الكمية</Badge>
        )}
      </div>

      {/* Quick actions */}
      <div className={clsx(
        'absolute top-3 left-3 z-10',
        'flex flex-col gap-2',
        'opacity-0 group-hover:opacity-100',
        'translate-x-2 group-hover:translate-x-0',
        'transition-all duration-300'
      )}>
        <button
          className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-soft hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors"
          aria-label="أضف للمفضلة"
        >
          <Heart className="w-4 h-4" />
        </button>
        <button
          className="p-2 bg-white dark:bg-neutral-800 rounded-full shadow-soft hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors"
          aria-label="معاينة سريعة"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Image */}
      <Link to={`/product/${slug}`} className="block overflow-hidden">
        <Image
          src={image || images?.[0]}
          alt={name}
          aspectRatio="aspect-product"
          objectFit="object-contain"
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category & Vendor */}
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <Link 
            to={`/category/${category?.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {category?.name}
          </Link>
          <Link 
            to={`/vendor/${vendor?.slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {vendor?.name}
          </Link>
        </div>

        {/* Title */}
        <Link to={`/product/${slug}`}>
          <h3 className="font-medium text-neutral-900 dark:text-neutral-100 line-clamp-2 min-h-[2.5rem] hover:text-primary-600 transition-colors">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <Rating 
          value={rating} 
          reviewCount={reviewCount} 
          size="sm" 
          className="mt-2"
        />

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex flex-col">
            <span className="price text-xl">{formatPrice(displayPrice)}</span>
            {originalPrice && (
              <span className="price-old">{formatPrice(originalPrice)}</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={clsx(
              'p-3 rounded-xl transition-all duration-300',
              inStock
                ? 'bg-primary-600 text-white hover:bg-primary-700 hover:shadow-glow active:scale-95'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed'
            )}
            aria-label="أضف للسلة"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
