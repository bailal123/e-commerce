import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Heart, Share2, Check } from 'lucide-react'
import { clsx } from 'clsx'
import { Button, Badge, Rating } from '../atoms'
import { useCart } from '../../context/CartContext'
import { formatPrice, calculateDiscount } from '../../utils/helpers'

const ProductInfo = ({
  product,
  className,
}) => {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState({})
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const {
    name,
    price,
    originalPrice,
    rating,
    reviewCount,
    description,
    shortDescription,
    inStock,
    stockCount,
    sku,
    brand,
    vendor,
    variants,
    features,
    discount,
  } = product

  const discountPercent = originalPrice 
    ? calculateDiscount(originalPrice, price) 
    : discount

  const handleQuantityChange = (delta) => {
    setQuantity(prev => {
      const newValue = prev + delta
      if (newValue < 1) return 1
      if (stockCount && newValue > stockCount) return stockCount
      return newValue
    })
  }

  const handleAddToCart = () => {
    addToCart({ ...product, ...selectedVariant }, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  return (
    <div className={clsx('space-y-6', className)}>
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        {discountPercent > 0 && (
          <Badge variant="danger" size="lg">
            خصم {discountPercent}%
          </Badge>
        )}
        {!inStock && (
          <Badge variant="neutral" size="lg">
            نفذت الكمية
          </Badge>
        )}
        {product.isNew && (
          <Badge variant="primary" size="lg">
            جديد
          </Badge>
        )}
      </div>

      {/* Brand & Vendor */}
      <div className="flex items-center gap-4 text-sm">
        {brand && (
          <span className="text-neutral-500">
            العلامة التجارية: <span className="text-primary-600 font-medium">{brand}</span>
          </span>
        )}
        {vendor && (
          <span className="text-neutral-500">
            البائع: <a href={`/vendor/${vendor.slug}`} className="text-primary-600 font-medium hover:underline">{vendor.name}</a>
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="heading-2 text-neutral-900 dark:text-neutral-100">
        {name}
      </h1>

      {/* Rating */}
      <Rating 
        value={rating} 
        reviewCount={reviewCount} 
        size="md" 
        showValue 
      />

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
          {formatPrice(price)}
        </span>
        {originalPrice && (
          <>
            <span className="text-xl text-neutral-400 line-through">
              {formatPrice(originalPrice)}
            </span>
            <Badge variant="success">
              وفر {formatPrice(originalPrice - price)}
            </Badge>
          </>
        )}
      </div>

      {/* Short Description */}
      {shortDescription && (
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          {shortDescription}
        </p>
      )}

      {/* Variants */}
      {variants && variants.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          {variants.map((variant) => (
            <div key={variant.name}>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                {variant.name}: <span className="text-neutral-900 dark:text-neutral-100">{selectedVariant[variant.name] || 'اختر'}</span>
              </label>
              
              {variant.type === 'color' ? (
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedVariant(prev => ({ ...prev, [variant.name]: option.value }))}
                      className={clsx(
                        'w-10 h-10 rounded-full border-2 transition-all',
                        selectedVariant[variant.name] === option.value
                          ? 'border-primary-500 ring-2 ring-primary-500/30 scale-110'
                          : 'border-neutral-200 dark:border-neutral-700 hover:scale-105'
                      )}
                      style={{ backgroundColor: option.color }}
                      title={option.label}
                      disabled={!option.inStock}
                    >
                      {!option.inStock && (
                        <span className="block w-full h-0.5 bg-neutral-400 rotate-45 origin-center" />
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {variant.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedVariant(prev => ({ ...prev, [variant.name]: option.value }))}
                      disabled={!option.inStock}
                      className={clsx(
                        'px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all',
                        selectedVariant[variant.name] === option.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600',
                        !option.inStock && 'opacity-50 cursor-not-allowed line-through'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        {/* Quantity */}
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className={clsx(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
              quantity <= 1
                ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            )}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center bg-transparent font-medium text-neutral-900 dark:text-neutral-100 focus:outline-none"
            min="1"
            max={stockCount}
          />
          
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={stockCount && quantity >= stockCount}
            className={clsx(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-colors',
              stockCount && quantity >= stockCount
                ? 'text-neutral-300 dark:text-neutral-600 cursor-not-allowed'
                : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
            )}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          onClick={handleAddToCart}
          disabled={!inStock}
          leftIcon={addedToCart ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
          className={clsx(
            'flex-1',
            addedToCart && 'bg-success-600 hover:bg-success-600'
          )}
        >
          {addedToCart ? 'تمت الإضافة!' : inStock ? 'أضف للسلة' : 'نفذت الكمية'}
        </Button>

        {/* Wishlist */}
        <Button
          size="lg"
          variant="outline"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={clsx(
            isWishlisted && 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950'
          )}
        >
          <Heart className={clsx('w-5 h-5', isWishlisted && 'fill-current')} />
        </Button>

        {/* Share */}
        <Button size="lg" variant="ghost">
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      {/* Stock info */}
      {inStock && stockCount && stockCount < 10 && (
        <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          تبقى {stockCount} قطع فقط - اطلب الآن
        </p>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            المميزات
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <Check className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* SKU */}
      {sku && (
        <p className="text-xs text-neutral-400">
          رمز المنتج: {sku}
        </p>
      )}
    </div>
  )
}

export default ProductInfo
