import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spinner } from './components/atoms'

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const ShopPage = lazy(() => import('./pages/ShopPage'))
const VendorStorePage = lazy(() => import('./pages/VendorStorePage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
    <div className="text-center">
      <Spinner size="lg" />
      <p className="mt-4 text-neutral-500 dark:text-neutral-400">جاري التحميل...</p>
    </div>
  </div>
)

// Order Success Page (inline for simplicity)
const OrderSuccessPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
    <div className="text-center max-w-md mx-auto px-4">
      <div className="w-20 h-20 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        تم تأكيد طلبك بنجاح!
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6">
        شكراً لك على طلبك. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
      </p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        رقم الطلب: <span className="font-mono font-semibold">#ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
      >
        العودة للتسوق
      </a>
    </div>
  </div>
)

// Not Found Page
const NotFoundPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
    <div className="text-center max-w-md mx-auto px-4">
      <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
        الصفحة غير موجودة
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors"
      >
        العودة للرئيسية
      </a>
    </div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/vendor/:slug" element={<VendorStorePage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        
        {/* Additional Routes */}
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/vendors" element={<VendorStorePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products" element={<ShopPage />} />
        <Route path="/deals" element={<ShopPage />} />
        <Route path="/new-arrivals" element={<ShopPage />} />
        <Route path="/search" element={<CategoryPage />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
