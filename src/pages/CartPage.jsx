import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingBag, Trash2, ArrowLeft, 
  Tag, Truck, Shield, ChevronLeft 
} from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { ProductGrid } from '../components/organisms'
import { CartItem } from '../components/molecules'
import { Button, Input, Badge } from '../components/atoms'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'
import { products } from '../data/mockData'

const CartPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  // Group items by vendor
  const itemsByVendor = cartItems.reduce((acc, item) => {
    const vendorId = item.vendor?.id || 'unknown'
    if (!acc[vendorId]) {
      acc[vendorId] = {
        vendor: item.vendor,
        items: [],
        subtotal: 0,
      }
    }
    acc[vendorId].items.push(item)
    acc[vendorId].subtotal += item.price * item.quantity
    return acc
  }, {})

  const shipping = cartTotal > 200 ? 0 : 25
  const discount = appliedCoupon ? cartTotal * 0.1 : 0
  const total = cartTotal + shipping - discount

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setAppliedCoupon({ code: couponCode, discount: 10 })
    }
  }

  const suggestedProducts = products.slice(0, 4)

  if (cartItems.length === 0) {
    return (
      <MainLayout title="سلة التسوق">
        <div className="container-custom py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-neutral-400" />
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
              سلة التسوق فارغة
            </h1>
            <p className="text-neutral-500 mb-8">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. ابدأ بتصفح منتجاتنا المميزة.
            </p>
            <Link to="/">
              <Button size="lg">
                تصفح المنتجات
              </Button>
            </Link>
          </div>

          {/* Suggested Products */}
          <div className="mt-16">
            <ProductGrid
              products={suggestedProducts}
              title="قد يعجبك أيضاً"
              columns={4}
            />
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="سلة التسوق">
      {/* Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb"
        className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800"
      >
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link 
                to="/"
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
              >
                الرئيسية
              </Link>
            </li>
            <ChevronLeft className="w-4 h-4 text-neutral-400 rtl:rotate-180" />
            <li className="text-neutral-500">سلة التسوق</li>
          </ol>
        </div>
      </nav>

      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-2">سلة التسوق</h1>
          <Button 
            variant="ghost" 
            onClick={clearCart}
            leftIcon={<Trash2 className="w-4 h-4" />}
          >
            تفريغ السلة
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(itemsByVendor).map(([vendorId, { vendor, items, subtotal }]) => (
              <div 
                key={vendorId}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden"
              >
                {/* Vendor Header */}
                <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/vendor/${vendor?.slug}`}
                      className="flex items-center gap-3 hover:text-primary-600 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-4 h-4 text-primary-600" />
                      </div>
                      <span className="font-medium">{vendor?.name || 'متجر غير معروف'}</span>
                    </Link>
                    <Badge variant="success" size="sm">
                      <Truck className="w-3 h-3 ml-1" />
                      شحن مجاني للطلبات +200 د.إ
                    </Badge>
                  </div>
                </div>

                {/* Items */}
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                {/* Vendor Subtotal */}
                <div className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">المجموع الفرعي ({items.length} منتج)</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link 
              to="/"
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              متابعة التسوق
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                ملخص الطلب
              </h2>

              {/* Coupon */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  كود الخصم
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="أدخل كود الخصم"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    leftIcon={<Tag className="w-4 h-4" />}
                  />
                  <Button 
                    variant="secondary"
                    onClick={handleApplyCoupon}
                  >
                    تطبيق
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-sm text-success-600 mt-2 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    تم تطبيق كود الخصم ({appliedCoupon.discount}%)
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">المجموع الفرعي</span>
                  <span className="text-neutral-900 dark:text-neutral-100">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">الشحن</span>
                  <span className={clsx(
                    shipping === 0 ? 'text-success-600' : 'text-neutral-900 dark:text-neutral-100'
                  )}>
                    {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">الخصم</span>
                    <span className="text-success-600">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                      الإجمالي
                    </span>
                    <span className="text-xl font-bold text-primary-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    شامل ضريبة القيمة المضافة
                  </p>
                </div>
              </div>

              {/* Checkout Button */}
              <Link to="/checkout">
                <Button size="lg" fullWidth>
                  إتمام الطلب
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex items-center justify-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    دفع آمن
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    توصيل سريع
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CartPage
