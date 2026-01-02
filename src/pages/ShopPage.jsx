import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Grid, List, SlidersHorizontal, X, Store } from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { ProductGrid } from '../components/organisms'
import { FilterSidebar, ProductCard } from '../components/molecules'
import { Button, Badge } from '../components/atoms'
import { categories, products, vendors } from '../data/mockData'

const PRODUCTS_PER_PAGE = 20

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [viewMode, setViewMode] = useState('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [activeFilters, setActiveFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)

  // Get filter from URL
  const filterType = searchParams.get('filter')

  // Filter configuration
  const filters = [
    {
      key: 'category',
      label: 'القسم',
      type: 'checkbox',
      options: categories.map(cat => ({
        value: cat.slug,
        label: cat.name,
        count: products.filter(p => p.category?.slug === cat.slug).length,
      })),
    },
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
      options: vendors.map(v => ({
        value: v.slug,
        label: v.name,
        count: products.filter(p => p.vendor?.slug === v.slug).length,
      })),
    },
    {
      key: 'availability',
      label: 'التوفر',
      type: 'checkbox',
      options: [
        { value: 'in-stock', label: 'متوفر', count: products.filter(p => p.stock > 0).length },
        { value: 'on-sale', label: 'عروض', count: products.filter(p => p.salePrice).length },
      ],
    },
  ]

  const sortOptions = [
    { value: 'newest', label: 'الأحدث' },
    { value: 'popular', label: 'الأكثر شعبية' },
    { value: 'price-low', label: 'السعر: من الأقل للأعلى' },
    { value: 'price-high', label: 'السعر: من الأعلى للأقل' },
    { value: 'rating', label: 'الأعلى تقييماً' },
  ]

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Filter by URL param
    if (filterType === 'new') {
      result = result.filter(p => p.isNew)
    } else if (filterType === 'featured') {
      result = result.filter(p => p.featured)
    } else if (filterType === 'sale') {
      result = result.filter(p => p.salePrice)
    }

    // Filter by category
    if (activeFilters.category?.length > 0) {
      result = result.filter(p => activeFilters.category.includes(p.category?.slug))
    }

    // Filter by vendor
    if (activeFilters.vendor?.length > 0) {
      result = result.filter(p => activeFilters.vendor.includes(p.vendor?.slug))
    }

    // Filter by availability
    if (activeFilters.availability?.length > 0) {
      if (activeFilters.availability.includes('in-stock')) {
        result = result.filter(p => p.stock > 0)
      }
      if (activeFilters.availability.includes('on-sale')) {
        result = result.filter(p => p.salePrice)
      }
    }

    // Filter by rating
    if (activeFilters.rating) {
      result = result.filter(p => p.rating >= activeFilters.rating)
    }

    // Filter by price range
    if (activeFilters.price) {
      const [min, max] = activeFilters.price
      result = result.filter(p => {
        const price = p.salePrice || p.price
        return price >= min && price <= max
      })
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'price-low':
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        break
      case 'price-high':
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
    }

    return result
  }, [filterType, activeFilters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Update URL when page changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (currentPage > 1) {
      params.set('page', currentPage.toString())
    } else {
      params.delete('page')
    }
    if (sortBy !== 'newest') {
      params.set('sort', sortBy)
    } else {
      params.delete('sort')
    }
    setSearchParams(params, { replace: true })
  }, [currentPage, sortBy])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilters, filterType])

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get page title based on filter
  const getPageTitle = () => {
    if (filterType === 'new') return 'وصل حديثاً'
    if (filterType === 'featured') return 'منتجات مميزة'
    if (filterType === 'sale') return 'عروض وتخفيضات'
    return 'جميع المنتجات'
  }

  const getPageDescription = () => {
    if (filterType === 'new') return 'أحدث المنتجات في متجرنا'
    if (filterType === 'featured') return 'منتجات مختارة بعناية لك'
    if (filterType === 'sale') return 'أفضل العروض والتخفيضات'
    return 'تصفح جميع المنتجات المتاحة في المتجر'
  }

  // Breadcrumbs - include shop link when filter is active
  const breadcrumbs = filterType 
    ? [
        { name: 'الرئيسية', href: '/' },
        { name: 'المتجر', href: '/shop' },
        { name: getPageTitle(), href: '#' },
      ]
    : [
        { name: 'الرئيسية', href: '/' },
        { name: 'المتجر', href: '#' },
      ]

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: getPageTitle(),
    description: getPageDescription(),
    url: `https://souq.com/shop`,
  }

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = []
    const showPages = 5
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    let end = Math.min(totalPages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <MainLayout
      title={getPageTitle()}
      description={getPageDescription()}
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

      {/* Page Header */}
      <header className="bg-gradient-to-l from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-3">
            <Store className="w-10 h-10" />
            <h1 className="heading-1">{getPageTitle()}</h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">{getPageDescription()}</p>
          <div className="flex items-center gap-4 mt-4">
            <p className="text-white/60">
              {filteredProducts.length.toLocaleString('ar-EG')} منتج
            </p>
            {filterType && (
              <Link 
                to="/shop"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
              >
                <Store className="w-4 h-4" />
                عرض جميع المنتجات
              </Link>
            )}
          </div>
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
                  عرض {paginatedProducts.length} من {filteredProducts.length} منتج
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
                products={paginatedProducts}
                columns={4}
              />
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant="horizontal"
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <nav 
                aria-label="صفحات المنتجات"
                className="flex items-center justify-center gap-2 mt-12"
              >
                {/* Previous */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={clsx(
                    'p-2 rounded-lg border transition-colors',
                    currentPage === 1
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-300 hover:border-primary-500 hover:text-primary-600'
                  )}
                  aria-label="الصفحة السابقة"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* First page */}
                {getPaginationNumbers()[0] > 1 && (
                  <>
                    <button
                      onClick={() => handlePageChange(1)}
                      className="w-10 h-10 rounded-lg border border-neutral-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                      1
                    </button>
                    {getPaginationNumbers()[0] > 2 && (
                      <span className="px-2 text-neutral-400">...</span>
                    )}
                  </>
                )}

                {/* Page numbers */}
                {getPaginationNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={clsx(
                      'w-10 h-10 rounded-lg border transition-colors font-medium',
                      page === currentPage
                        ? 'bg-primary-600 border-primary-600 text-white'
                        : 'border-neutral-300 hover:border-primary-500 hover:text-primary-600'
                    )}
                    aria-current={page === currentPage ? 'page' : undefined}
                  >
                    {page.toLocaleString('ar-EG')}
                  </button>
                ))}

                {/* Last page */}
                {getPaginationNumbers()[getPaginationNumbers().length - 1] < totalPages && (
                  <>
                    {getPaginationNumbers()[getPaginationNumbers().length - 1] < totalPages - 1 && (
                      <span className="px-2 text-neutral-400">...</span>
                    )}
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="w-10 h-10 rounded-lg border border-neutral-300 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                      {totalPages.toLocaleString('ar-EG')}
                    </button>
                  </>
                )}

                {/* Next */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={clsx(
                    'p-2 rounded-lg border transition-colors',
                    currentPage === totalPages
                      ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                      : 'border-neutral-300 hover:border-primary-500 hover:text-primary-600'
                  )}
                  aria-label="الصفحة التالية"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </nav>
            )}

            {/* Page info */}
            {totalPages > 1 && (
              <p className="text-center text-neutral-500 text-sm mt-4">
                صفحة {currentPage.toLocaleString('ar-EG')} من {totalPages.toLocaleString('ar-EG')}
              </p>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && (
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
                عرض {filteredProducts.length} نتيجة
              </Button>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  )
}

export default ShopPage
