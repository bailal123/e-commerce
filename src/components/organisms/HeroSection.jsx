import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { Button } from '../atoms'

const HeroSection = ({
  slides = [],
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile for optimized image loading
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goToSlide = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, slides.length, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)
  }, [currentSlide, slides.length, goToSlide])

  // Auto play
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return
    
    const timer = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(timer)
  }, [autoPlay, autoPlayInterval, nextSlide, slides.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') nextSlide()
      if (e.key === 'ArrowRight') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide])

  if (!slides || slides.length === 0) {
    return null
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section 
      className={clsx('relative overflow-hidden', className)}
      aria-roledescription="carousel"
      aria-label="Hero Banner"
    >
      {/* Slides */}
      <div className="relative aspect-[21/9] md:aspect-[21/7] lg:aspect-[21/6]">
        {slides.map((slide, index) => (
          <div
            key={slide.id || index}
            className={clsx(
              'absolute inset-0 transition-all duration-700',
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105 pointer-events-none'
            )}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              srcSet={slide.imageSrcSet}
              sizes="100vw"
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : undefined}
              decoding={index === 0 ? 'sync' : 'async'}
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className={clsx(
              'absolute inset-0',
              slide.overlayGradient || 'bg-gradient-to-l from-black/60 via-black/30 to-transparent'
            )} />

            {/* Content */}
            <div className="absolute inset-0 container-custom flex items-center">
              <div className={clsx(
                'max-w-xl',
                slide.contentPosition === 'left' ? 'mr-auto' : 'ml-auto md:text-left'
              )}>
                {slide.badge && (
                  <span className={clsx(
                    'inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4',
                    'bg-accent-500 text-white',
                    'animate-fade-in'
                  )}>
                    {slide.badge}
                  </span>
                )}
                
                <h1 className={clsx(
                  'heading-1 text-white mb-4',
                  'animate-slide-up',
                  index === currentSlide && 'animate-slide-up'
                )}>
                  {slide.title}
                </h1>
                
                {slide.subtitle && (
                  <p className={clsx(
                    'text-lg md:text-xl text-white/90 mb-6',
                    'animate-slide-up animation-delay-100'
                  )}>
                    {slide.subtitle}
                  </p>
                )}
                
                {slide.cta && (
                  <div className="flex flex-wrap gap-3 animate-slide-up animation-delay-200">
                    <Link to={slide.cta.href}>
                      <Button 
                        size="lg" 
                        variant={slide.cta.variant || 'primary'}
                        className="shadow-lg"
                      >
                        {slide.cta.text}
                      </Button>
                    </Link>
                    {slide.secondaryCta && (
                      <Link to={slide.secondaryCta.href}>
                        <Button 
                          size="lg" 
                          variant="outline"
                          className="border-white text-white hover:bg-white/10"
                        >
                          {slide.secondaryCta.text}
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className={clsx(
              'absolute top-1/2 right-4 -translate-y-1/2',
              'w-12 h-12 rounded-full',
              'bg-white/20 hover:bg-white/40 backdrop-blur-sm',
              'flex items-center justify-center text-white',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-white/50'
            )}
            aria-label="الشريحة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className={clsx(
              'absolute top-1/2 left-4 -translate-y-1/2',
              'w-12 h-12 rounded-full',
              'bg-white/20 hover:bg-white/40 backdrop-blur-sm',
              'flex items-center justify-center text-white',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-white/50'
            )}
            aria-label="الشريحة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={clsx(
                'h-3 min-w-[44px] min-h-[44px] flex items-center justify-center',
                'transition-all duration-300'
              )}
              aria-label={`الانتقال للشريحة ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
            >
              <span className={clsx(
                'block h-2 rounded-full transition-all duration-300',
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/70'
              )} />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && slides.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all ease-linear"
            style={{
              width: '100%',
              animation: `progress ${autoPlayInterval}ms linear infinite`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); transform-origin: right; }
          to { transform: scaleX(1); transform-origin: right; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection
