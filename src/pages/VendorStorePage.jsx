import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  MapPin, Star, Package, Users, Calendar, 
  MessageCircle, Share2, Flag, ChevronLeft,
  Grid, Store as StoreIcon
} from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { ProductGrid } from '../components/organisms'
import { Avatar, Badge, Rating, Button } from '../components/atoms'
import { vendors, products } from '../data/mockData'
import { formatDate } from '../utils/helpers'

const VendorStorePage = () => {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('products')
  const [isFollowing, setIsFollowing] = useState(false)
  
  // Find vendor
  const vendor = vendors.find(v => v.slug === slug) || vendors[0]
  
  // Filter products by vendor
  const vendorProducts = products.filter(p => p.vendor?.id === vendor.id)

  const tabs = [
    { id: 'products', label: 'المنتجات', count: vendor.productCount },
    { id: 'reviews', label: 'التقييمات', count: vendor.reviewCount },
    { id: 'about', label: 'عن المتجر' },
  ]

  // Structured data for vendor
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: vendor.name,
    description: vendor.description,
    image: vendor.logo,
    url: `https://souq.com/vendor/${vendor.slug}`,
    address: vendor.location,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: vendor.rating,
      reviewCount: vendor.reviewCount,
    },
  }

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'الرئيسية', href: '/' },
    { name: 'التجار', href: '/vendors' },
    { name: vendor.name, href: `/vendor/${slug}` },
  ]

  return (
    <MainLayout
      title={vendor.name}
      description={vendor.description}
      ogImage={vendor.banner}
      structuredData={structuredData}
    >
      {/* Breadcrumbs */}
      <nav 
        aria-label="Breadcrumb"
        className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800"
      >
        <div className="container-custom py-3">
          <ol className="flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronLeft className="w-4 h-4 text-neutral-400 rtl:rotate-180" />
                )}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-neutral-500">{crumb.name}</span>
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

      {/* Store Banner */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <img
          src={vendor.banner || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200'}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Store Info */}
      <div className="container-custom">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-soft p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Avatar */}
              <Avatar
                src={vendor.logo}
                name={vendor.name}
                size="3xl"
                verified={vendor.isVerified}
                className="ring-4 ring-white dark:ring-neutral-900 -mt-16 md:-mt-20"
              />

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                        {vendor.name}
                      </h1>
                      {vendor.isVerified && (
                        <Badge variant="primary" icon={<Star className="w-3 h-3" />}>
                          موثق
                        </Badge>
                      )}
                      {vendor.isTopSeller && (
                        <Badge variant="accent">Top Seller</Badge>
                      )}
                    </div>

                    {vendor.location && (
                      <p className="flex items-center gap-2 text-neutral-500 mb-3">
                        <MapPin className="w-4 h-4" />
                        {vendor.location}
                      </p>
                    )}

                    <Rating 
                      value={vendor.rating} 
                      reviewCount={vendor.reviewCount} 
                      size="md" 
                      showValue 
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant={isFollowing ? 'outline' : 'primary'}
                      onClick={() => setIsFollowing(!isFollowing)}
                    >
                      {isFollowing ? 'إلغاء المتابعة' : 'متابعة'}
                    </Button>
                    <Button variant="secondary" leftIcon={<MessageCircle className="w-4 h-4" />}>
                      تواصل
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {vendor.productCount?.toLocaleString('ar-EG')}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      منتج
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {vendor.followerCount?.toLocaleString('ar-EG')}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      متابع
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {vendor.rating}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      تقييم
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                      {formatDate(vendor.joinedDate, 'year')}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      انضمام
                    </p>
                  </div>
                </div>

                {/* Description */}
                {vendor.description && (
                  <p className="text-neutral-600 dark:text-neutral-400 mt-4">
                    {vendor.description}
                  </p>
                )}

                {/* Categories */}
                {vendor.categories && vendor.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {vendor.categories.map((cat) => (
                      <Badge key={cat} variant="neutral">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
                      {tab.count.toLocaleString('ar-EG')}
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
        <div className="pb-12">
          {activeTab === 'products' && (
            <>
              {/* Sort & Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-500">
                  {vendorProducts.length} منتج
                </p>
                <select className="input py-2 text-sm w-48">
                  <option value="popular">الأكثر شعبية</option>
                  <option value="newest">الأحدث</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>
              </div>

              <ProductGrid
                products={vendorProducts.length > 0 ? vendorProducts : products.slice(0, 8)}
                columns={4}
              />
            </>
          )}

          {activeTab === 'reviews' && (
            <div className="max-w-3xl">
              {/* Rating Summary */}
              <div className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-neutral-900 dark:text-neutral-100">
                      {vendor.rating}
                    </p>
                    <Rating value={vendor.rating} size="md" className="justify-center mt-2" />
                    <p className="text-sm text-neutral-500 mt-1">
                      {vendor.reviewCount?.toLocaleString('ar-EG')} تقييم
                    </p>
                  </div>
                  
                  {/* Rating bars */}
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span className="text-sm w-3">{stars}</span>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <div className="flex-1 h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: `${Math.random() * 50 + 50}%` }}
                          />
                        </div>
                        <span className="text-sm text-neutral-500 w-8">
                          {Math.floor(Math.random() * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-neutral-500 text-center py-12">
                قريباً - عرض تقييمات المتجر
              </p>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="max-w-3xl space-y-8">
              {/* About */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  عن المتجر
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {vendor.description || 'لا يوجد وصف متاح لهذا المتجر.'}
                </p>
              </div>

              {/* Policies */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card p-6">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    سياسة الشحن
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    شحن مجاني للطلبات أكثر من 200 ريال. التوصيل خلال 2-5 أيام عمل.
                  </p>
                </div>
                <div className="card p-6">
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                    سياسة الإرجاع
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    إمكانية الإرجاع خلال 14 يوم من تاريخ الاستلام. المنتج يجب أن يكون بحالته الأصلية.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  معلومات التواصل
                </h3>
                <div className="space-y-3">
                  <p className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <MapPin className="w-5 h-5 text-neutral-400" />
                    {vendor.location || 'غير محدد'}
                  </p>
                  <p className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                    <Calendar className="w-5 h-5 text-neutral-400" />
                    عضو منذ {formatDate(vendor.joinedDate)}
                  </p>
                </div>
              </div>

              {/* Report */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-red-500 transition-colors">
                  <Flag className="w-4 h-4" />
                  الإبلاغ عن هذا المتجر
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default VendorStorePage
