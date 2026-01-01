import { useState, useEffect } from 'react'
import { MainLayout } from '../components/templates'
import {
  HeroSection,
  MobileHero,
  CategoryGrid,
  ProductGrid,
  VendorShowcase,
  Testimonials,
  TrustBadges,
  PromoBanner,
} from '../components/organisms'
import { 
  heroSlides, 
  categories, 
  products,
  vendors, 
  testimonials 
} from '../data/mockData'

// Filter products for different sections
const featuredProducts = products.filter(p => p.featured)
const newProducts = products.filter(p => p.isNew)

// Mobile hero data optimized for fast LCP
const mobileHeroSlide = {
  ...heroSlides[0],
  mobileImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=480&h=360&fit=crop&auto=format&q=80',
  cta: { text: 'تسوق الآن', href: '/category/sale' },
}

const HomePage = () => {
  // Detect mobile for optimized hero rendering
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // Schema.org structured data for the homepage
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'سوق',
    description: 'أكبر سوق متعدد التجار في المنطقة',
    url: 'https://souq.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://souq.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <MainLayout
      title="الرئيسية"
      description="اكتشف آلاف المنتجات من مئات التجار المميزين. أفضل الأسعار وخدمة توصيل سريعة."
      structuredData={structuredData}
    >
      {/* Hero Section - Optimized: Simple hero on mobile, Full carousel on desktop */}
      {isMobile ? (
        <MobileHero slide={mobileHeroSlide} />
      ) : (
        <HeroSection slides={heroSlides} />
      )}

      {/* Trust Badges */}
      <TrustBadges variant="default" />

      {/* Categories */}
      <section className="section">
        <div className="container-custom">
          <CategoryGrid
            categories={categories}
            title="تصفح حسب الأقسام"
            subtitle="اختر القسم المناسب لك"
            viewAllLink="/categories"
            variant="minimal"
            columns={6}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="section bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-custom">
          <ProductGrid
            products={featuredProducts}
            title="منتجات مميزة"
            subtitle="أفضل المنتجات المختارة لك"
            viewAllLink="/products?filter=featured"
            variant="carousel"
          />
        </div>
      </section>

      {/* Promo Banner */}
      <section className="section">
        <div className="container-custom">
          <PromoBanner
            variant="split"
            title="خصومات نهاية الموسم"
            subtitle="خصم يصل إلى 50%"
            description="استمتع بأفضل العروض على الإلكترونيات والأزياء والمزيد. العرض ساري لفترة محدودة."
            badge="عرض حصري"
            image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=672&h=448&fit=crop&auto=format&q=75"
            cta={{ text: 'تسوق الآن', href: '/deals' }}
          />
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section">
        <div className="container-custom">
          <ProductGrid
            products={newProducts}
            title="وصل حديثاً"
            subtitle="أحدث المنتجات في المتجر"
            viewAllLink="/products?filter=new"
            columns={5}
          />
        </div>
      </section>

      {/* Categories Featured */}
      <section className="section bg-neutral-50 dark:bg-neutral-900/50">
        <div className="container-custom">
          <CategoryGrid
            categories={categories.slice(0, 5)}
            title="أقسام مميزة"
            subtitle="اكتشف أفضل الأقسام"
            viewAllLink="/categories"
            variant="featured"
          />
        </div>
      </section>

      {/* Top Vendors */}
      <section className="section">
        <div className="container-custom">
          <VendorShowcase
            vendors={vendors}
            title="أفضل التجار"
            subtitle="تجار موثوقون ومعتمدون"
            viewAllLink="/vendors"
            variant="carousel"
          />
        </div>
      </section>

      {/* Promo Banner - Countdown */}
      {/* <section className="section">
        <div className="container-custom">
          <PromoBanner
            variant="countdown"
            title="عرض اليوم الوطني"
            badge="🎉 عرض خاص"
            bgColor="bg-gradient-to-r from-emerald-600 to-teal-700"
            countdown={{
              days: 3,
              hours: 12,
              minutes: 45,
              seconds: 30,
            }}
            cta={{ text: 'اكتشف العروض', href: '/deals/national-day' }}
          />
        </div>
      </section> */}

      {/* Testimonials */}
      <Testimonials
        testimonials={testimonials}
        title="آراء عملائنا"
        subtitle="ماذا يقول عملاؤنا عن تجربتهم معنا"
        variant="featured"
      />

      {/* Trust Badges - Detailed */}
      <TrustBadges variant="detailed" />

      {/* Newsletter CTA */}
      {/* <section className="section">
        <div className="container-custom">
          <PromoBanner
            variant="default"
            title="اشترك في النشرة البريدية"
            subtitle="احصل على خصم 10% على أول طلب"
            description="كن أول من يعرف عن العروض الحصرية والمنتجات الجديدة"
            bgColor="bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800"
            cta={{ text: 'اشترك الآن', href: '#newsletter' }}
          />
        </div>
      </section> */}
    </MainLayout>
  )
}

export default HomePage
