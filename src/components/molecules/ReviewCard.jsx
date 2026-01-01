import { Link } from 'react-router-dom'
import { Star, ThumbsUp, CheckCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { Avatar, Rating, Badge } from '../atoms'
import { formatDate } from '../../utils/helpers'

const ReviewCard = ({
  review,
  showProduct = false,
  className,
}) => {
  const {
    id,
    author,
    rating,
    title,
    content,
    date,
    isVerifiedPurchase,
    helpfulCount,
    images,
    product,
  } = review

  return (
    <article className={clsx(
      'bg-white dark:bg-neutral-900 rounded-2xl p-6',
      'border border-neutral-100 dark:border-neutral-800',
      className
    )}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={author.avatar}
            name={author.name}
            size="md"
          />
          <div>
            <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
              {author.name}
            </h4>
            <p className="text-sm text-neutral-500">
              {formatDate(date)}
            </p>
          </div>
        </div>
        
        <Rating value={rating} size="sm" />
      </div>

      {/* Verified badge */}
      {isVerifiedPurchase && (
        <Badge 
          variant="success" 
          size="sm"
          icon={<CheckCircle className="w-3 h-3" />}
          className="mt-3"
        >
          مشتري موثق
        </Badge>
      )}

      {/* Product (if shown) */}
      {showProduct && product && (
        <Link 
          to={`/product/${product.slug}`}
          className="flex items-center gap-3 mt-4 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 line-clamp-1">
            {product.name}
          </span>
        </Link>
      )}

      {/* Content */}
      <div className="mt-4">
        {title && (
          <h5 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {title}
          </h5>
        )}
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {content}
        </p>
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`صورة المراجعة ${index + 1}`}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600 transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>مفيد ({helpfulCount || 0})</span>
        </button>
        
        <button className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors">
          إبلاغ
        </button>
      </div>
    </article>
  )
}

export default ReviewCard
