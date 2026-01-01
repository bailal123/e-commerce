import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ChevronLeft, Truck, Shield, RefreshCw, 
  Share2, Heart, Store, Package, Star,
  Check, Info
} from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { ProductGrid } from '../components/organisms'
import { ImageGallery, ProductInfo, ReviewCard } from '../components/molecules'
import { Badge, Rating, Button, Avatar } from '../components/atoms'
import { products, reviews } from '../data/mockData'
import { formatPrice } from '../utils/helpers'

const ProductDetailPage = () => {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('description')
  
  // Find product
  const product = products.find(p => p.slug === slug) || products[0]
  
  // Related products
  const relatedProducts = products
    .filter(p => p.category?.slug === product.category?.slug && p.id !== product.id)
    .slice(0, 4)

  const tabs = [
    { id: 'description', label: 'الوصف' },
    { id: 'specifications', label: 'المواصفات' },
    { id: 'reviews', label: 'التقييمات', count: product.reviewCount },
  ]

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'الرئيسية', href: '/' },
    { name: product.category?.name || 'المنتجات', href: `/category/${product.category?.slug}` },
    { name: product.name, href: `/product/${slug}` },
  ]

  // Structured data for product
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'AED',
      availability: product.inStock 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.vendor?.name,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  }

  return (
    <MainLayout
      title={product.name}
      description={product.shortDescription || product.description}
      ogImage={product.images?.[0]}
      structuredData={structuredData}
    >
      {/* Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb"
        className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800"
      >
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronLeft className="w-4 h-4 text-neutral-400 rtl:rotate-180" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-neutral-500 line-clamp-1">{crumb.name}</span>
                ) : (
                  <Link 
                    to={crumb.href}
                    className="text-neutral-600 dark:text-neutral-400 hover:text-primary-600 transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Product Section */}
      <section className="section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ImageGallery 
                images={product.images || [product.image]} 
                productName={product.name}
              />
            </div>

            {/* Product Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* Vendor Info */}
      <section className="border-y border-neutral-100 dark:border-neutral-800 py-6">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link 
              to={`/vendor/${product.vendor?.slug}`}
              className="flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-3 -m-3 rounded-xl transition-colors"
            >
              <Avatar
                src={product.vendor?.logo}
                name={product.vendor?.name}
                size="lg"
                verified={product.vendor?.isVerified}
              />
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {product.vendor?.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <Rating value={product.vendor?.rating || 4.5} size="sm" showValue />
                  <span>|</span>
                  <span>{product.vendor?.productCount || 150} منتج</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                زيارة المتجر
              </Button>
              <Button variant="ghost" size="sm">
                متابعة
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'شحن سريع', desc: 'توصيل خلال 2-5 أيام' },
              { icon: Shield, title: 'ضمان الجودة', desc: 'منتج أصلي 100%' },
              { icon: RefreshCw, title: 'إرجاع مجاني', desc: 'خلال 14 يوم' },
              { icon: Package, title: 'تغليف آمن', desc: 'حماية كاملة للمنتج' },
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-neutral-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section">
        <div className="container-custom">
          {/* Tab Headers */}
          <div className="border-b border-neutral-200 dark:border-neutral-800 mb-8">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={clsx(
                    'px-6 py-4 text-sm font-medium transition-colors relative',
                    activeTab === tab.id
                      ? 'text-primary-600'
                      : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                  )}
                >
                  <span className="flex items-center gap-2">
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </span>
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'description' && (
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {product.description || `
                  هذا المنتج من أفضل المنتجات في فئته. يتميز بجودة عالية ومتانة استثنائية. 
                  صُنع بعناية فائقة ليلبي احتياجاتك ويتجاوز توقعاتك. 
                  يأتي مع ضمان الجودة وخدمة ما بعد البيع المتميزة.
                `}
              </p>
              
              {product.features && product.features.length > 0 && (
                <>
                  <h3>المميزات</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl">
              <table className="w-full">
                <tbody>
                  {(product.specifications || [
                    { label: 'العلامة التجارية', value: product.brand || 'غير محدد' },
                    { label: 'رمز المنتج', value: product.sku || 'SKU-12345' },
                    { label: 'الوزن', value: '500 جرام' },
                    { label: 'الأبعاد', value: '20 × 15 × 5 سم' },
                    { label: 'بلد المنشأ', value: 'الصين' },
                    { label: 'الضمان', value: '12 شهر' },
                  ]).map((spec, index) => (
                    <tr 
                      key={index}
                      className={clsx(
                        index % 2 === 0 ? 'bg-neutral-50 dark:bg-neutral-900/50' : ''
                      )}
                    >
                      <td className="px-4 py-3 text-neutral-500 font-medium w-1/3">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-neutral-900 dark:text-neutral-100">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              {/* Rating Summary */}
              <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                      {product.rating}
                    </p>
                    <Rating value={product.rating} size="md" className="justify-center mt-2" />
                    <p className="text-sm text-neutral-500 mt-1">
                      بناءً على {product.reviewCount?.toLocaleString('ar-EG')} تقييم
                    </p>
                  </div>
                  
                  {/* Rating bars */}
                  <div className="flex-1 space-y-2 w-full md:w-auto">
                    {[5, 4, 3, 2, 1].map((stars) => {
                      const percentage = stars === 5 ? 65 : stars === 4 ? 20 : stars === 3 ? 10 : 3
                      return (
                        <div key={stars} className="flex items-center gap-3">
                          <span className="text-sm w-3">{stars}</span>
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-amber-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-neutral-500 w-10">
                            {percentage}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700 text-center">
                  <Button>كتابة تقييم</Button>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.slice(0, 5).map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>

              {reviews.length > 5 && (
                <div className="text-center mt-8">
                  <Button variant="outline">
                    عرض المزيد من التقييمات
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section bg-neutral-50 dark:bg-neutral-900/50">
          <div className="container-custom">
            <ProductGrid
              products={relatedProducts}
              title="منتجات ذات صلة"
              subtitle="قد تعجبك أيضاً"
              columns={4}
            />
          </div>
        </section>
      )}
    </MainLayout>
  )
}

export default ProductDetailPage
