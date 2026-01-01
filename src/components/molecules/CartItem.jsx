import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, Heart } from 'lucide-react'
import { clsx } from 'clsx'
import { Image } from '../atoms'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../utils/helpers'

const CartItem = ({
  item,
  variant = 'default',
  className,
}) => {
  const { updateQuantity, removeFromCart } = useCart()
  const [isRemoving, setIsRemoving] = useState(false)

  const {
    id,
    name,
    slug,
    price,
    image,
    quantity,
    vendor,
    variant: productVariant,
    maxQuantity = 99,
  } = item

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      updateQuantity(id, quantity + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1)
    }
  }

  const handleRemove = () => {
    setIsRemoving(true)
    setTimeout(() => {
      removeFromCart(id)
    }, 300)
  }

  if (variant === 'compact') {
    return (
      <div className={clsx(
        'flex items-center gap-3 p-3',
        isRemoving && 'opacity-0 translate-x-4 transition-all duration-300',
        className
      )}>
        <Image
          src={image}
          alt={name}
          aspectRatio="aspect-square"
          containerClassName="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden"
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
            {name}
          </h4>
          <p className="text-xs text-neutral-500">
            {formatPrice(price)} × {quantity}
          </p>
        </div>
        
        <p className="font-medium text-neutral-900 dark:text-neutral-100">
          {formatPrice(price * quantity)}
        </p>
      </div>
    )
  }

  return (
    <div className={clsx(
      'flex gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900',
      'border border-neutral-100 dark:border-neutral-800',
      'transition-all duration-300',
      isRemoving && 'opacity-0 translate-x-4',
      className
    )}>
      {/* Image */}
      <Link to={`/product/${slug}`} className="flex-shrink-0">
        <Image
          src={image}
          alt={name}
          aspectRatio="aspect-square"
          containerClassName="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden"
        />
      </Link>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link 
              to={`/vendor/${vendor?.slug}`}
              className="text-xs text-neutral-500 hover:text-primary-600 transition-colors"
            >
              {vendor?.name}
            </Link>
            
            <Link to={`/product/${slug}`}>
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mt-1 hover:text-primary-600 transition-colors line-clamp-2">
                {name}
              </h3>
            </Link>
            
            {productVariant && (
              <p className="text-sm text-neutral-500 mt-1">
                {productVariant.color && `اللون: ${productVariant.color}`}
                {productVariant.size && ` | المقاس: ${productVariant.size}`}
              </p>
            )}
          </div>
          
          {/* Price */}
          <div className="text-left">
            <p className="price text-lg">{formatPrice(price * quantity)}</p>
            {quantity > 1 && (
              <p className="text-xs text-neutral-500">
                {formatPrice(price)} للوحدة
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity controls */}
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                quantity <= 1
                  ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
              aria-label="تقليل الكمية"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <span className="w-10 text-center font-medium text-neutral-900 dark:text-neutral-100">
              {quantity}
            </span>
            
            <button
              onClick={handleIncrement}
              disabled={quantity >= maxQuantity}
              className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                quantity >= maxQuantity
                  ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
              )}
              aria-label="زيادة الكمية"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Remove & Wishlist */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-neutral-400 hover:text-primary-600 transition-colors"
              aria-label="أضف للمفضلة"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={handleRemove}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
              aria-label="إزالة من السلة"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
