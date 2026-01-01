import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { ChevronLeft, Grid, List, SlidersHorizontal, X } from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { ProductGrid } from '../components/organisms'
import { FilterSidebar, ProductCard } from '../components/molecules'
import { Button, Badge } from '../components/atoms'
import { categories, products } from '../data/mockData'

const CategoryPage = () => {
  const { slug } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [viewMode, setViewMode] = useState('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [activeFilters, setActiveFilters] = useState({})
  const [displayedProducts, setDisplayedProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Find category
  const category = categories.find(c => c.slug === slug) || {
    name: 'جميع المنتجات',
    description: 'تصفح جميع المنتجات المتاحة',
    productCount: products.length,
  }

  // Filter configuration
  const filters = [
    {
      key: 'price',
      label: 'السعر',
      type: 'range',
    },
    {
      key: 'rating',
      label: 'التقييم',
      type: 'rating',
    },
    {
      key: 'vendor',
      label: 'التاجر',
      type: 'checkbox',
      options: [
        { value: 'vendor-1', label: 'متجر التقنية', count: 45 },
        { value: 'vendor-2', label: 'أزياء العصر', count: 32 },
        { value: 'vendor-3', label: 'بيت الجمال', count: 28 },
      ],
    },
    {
      key: 'brand',
      label: 'العلامة التجارية',
      type: 'checkbox',
      options: [
        { value: 'apple', label: 'Apple', count: 24 },
        { value: 'samsung', label: 'Samsung', count: 18 },
        { value: 'nike', label: 'Nike', count: 15 },
        { value: 'adidas', label: 'Adidas', count: 12 },
      ],
    },
    {
      key: 'availability',
      label: 'التوفر',
      type: 'checkbox',
      options: [
        { value: 'in-stock', label: 'متوفر', count: 156 },
        { value: 'out-of-stock', label: 'نفذت الكمية', count: 23 },
      ],
    },
  ]

  const sortOptions = [
    { value: 'popular', label: 'الأكثر شعبية' },
    { value: 'newest', label: 'الأحدث' },
    { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
    { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
    { value: 'rating', label: 'الأعلى تقييماً' },
  ]

  // Load products
  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      let filtered = [...products]
      
      // Filter by category
      if (slug) {
        filtered = filtered.filter(p => p.category?.slug === slug)
      }
      
      // Sort
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          break
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        default:
          // popular - keep default order
          break
      }
      
      setDisplayedProducts(filtered)
      setIsLoading(false)
    }, 500)
  }, [slug, sortBy, activeFilters])

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  // Breadcrumbs
  const breadcrumbs = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الأقسام', href: '/categories' },
    { name: category.name, href: `/category/${slug}` },
  ]

  // Structured data for category
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description,
    url: `https://souq.com/category/${slug}`,
  }

  return (
    <MainLayout
      title={category.name}
      description={category.description}
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

      {/* Category Header */}
      <header className="bg-gradient-to-l from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <h1 className="heading-1 mb-3">{category.name}</h1>
          {category.description && (
            <p className="text-white/80 text-lg max-w-2xl">{category.description}</p>
          )}
          <p className="text-white/60 mt-4">
            {category.productCount?.toLocaleString('ar-EG') || displayedProducts.length} منتج
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-custom py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              {/* Results count & Active filters */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-neutral-500">
                  {displayedProducts.length} نتيجة
                </span>
                
                {/* Active filter tags */}
                {Object.entries(activeFilters).map(([key, value]) => {
                  if (!value || (Array.isArray(value) && value.length === 0)) return null
                  const filter = filters.find(f => f.key === key)
                  const values = Array.isArray(value) ? value : [value]
                  
                  return values.map((v) => (
                    <Badge
                      key={`${key}-${v}`}
                      variant="primary"
                      className="cursor-pointer"
                      onClick={() => {
                        if (Array.isArray(activeFilters[key])) {
                          handleFilterChange(key, activeFilters[key].filter(item => item !== v))
                        } else {
                          handleFilterChange(key, null)
                        }
                      }}
                    >
                      {filter?.options?.find(o => o.value === v)?.label || v}
                      <X className="w-3 h-3 mr-1" />
                    </Badge>
                  ))
                })}
              </div>

              {/* Sort & View */}
              <div className="flex items-center gap-3">
                {/* Filter button - Mobile */}
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<SlidersHorizontal className="w-4 h-4" />}
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden"
                >
                  تصفية
                </Button>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-2 text-sm min-w-[180px]"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View mode */}
                <div className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={clsx(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'grid' 
                        ? 'bg-white dark:bg-neutral-700 shadow-sm' 
                        : 'hover:bg-white/50 dark:hover:bg-neutral-700/50'
                    )}
                    aria-label="عرض شبكي"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={clsx(
                      'p-2 rounded-md transition-colors',
                      viewMode === 'list' 
                        ? 'bg-white dark:bg-neutral-700 shadow-sm' 
                        : 'hover:bg-white/50 dark:hover:bg-neutral-700/50'
                    )}
                    aria-label="عرض قائمة"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <ProductGrid
                products={displayedProducts}
                columns={4}
                isLoading={isLoading}
                loadingCount={12}
              />
            ) : (
              <div className="space-y-4">
                {isLoading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="skeleton h-32 rounded-2xl" />
                  ))
                ) : (
                  displayedProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      variant="horizontal"
                    />
                  ))
                )}
              </div>
            )}

            {/* Load More / Pagination */}
            {!isLoading && displayedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="lg">
                  عرض المزيد من المنتجات
                </Button>
              </div>
            )}

            {/* No Results */}
            {!isLoading && displayedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  لا توجد منتجات
                </h3>
                <p className="text-neutral-500 mb-6">
                  جرب تغيير معايير البحث أو تصفح أقسام أخرى
                </p>
                <Button onClick={handleClearFilters}>
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 lg:hidden overflow-y-auto animate-slide-down">
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <h3 className="font-semibold">تصفية النتائج</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-800">
              <Button 
                fullWidth 
                onClick={() => setIsFilterOpen(false)}
              >
                عرض {displayedProducts.length} نتيجة
              </Button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  )
}

export default CategoryPage
