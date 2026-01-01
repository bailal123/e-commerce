import { Helmet } from 'react-helmet-async'
import { Header, Footer } from '../organisms'

const MainLayout = ({
  children,
  title,
  description,
  keywords,
  ogImage,
  canonicalUrl,
  structuredData,
}) => {
  const siteTitle = 'سوق | متجر متعدد التجار'
  const fullTitle = title ? `${title} | سوق` : siteTitle
  const defaultDescription = 'اكتشف آلاف المنتجات من مئات التجار المميزين. أفضل الأسعار وخدمة توصيل سريعة.'

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{fullTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Canonical URL */}
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Structured Data */}
        {structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default MainLayout
