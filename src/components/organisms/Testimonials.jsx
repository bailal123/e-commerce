import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { clsx } from 'clsx'
import { TestimonialCard } from '../molecules'

const Testimonials = ({
  testimonials = [],
  title,
  subtitle,
  variant = 'carousel', // carousel | grid | featured
  className,
}) => {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  if (variant === 'featured' && testimonials.length > 0) {
    return (
      <section className={clsx('py-12', className)}>
        <div className="container-custom">
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center mb-10">
              {title && (
                <h2 className="heading-2 text-neutral-900 dark:text-neutral-100 mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-neutral-500 max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Featured testimonial */}
            <TestimonialCard 
              testimonial={testimonials[0]} 
              variant="featured"
            />
            
            {/* Other testimonials */}
            <div className="space-y-4">
              {testimonials.slice(1, 3).map((testimonial, index) => (
                <TestimonialCard 
                  key={index} 
                  testimonial={testimonial}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'grid') {
    return (
      <section className={clsx('py-12', className)}>
        <div className="container-custom">
          {/* Header */}
          {(title || subtitle) && (
            <div className="text-center mb-10">
              {title && (
                <h2 className="heading-2 text-neutral-900 dark:text-neutral-100 mb-3">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-neutral-500 max-w-2xl mx-auto">{subtitle}</p>
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index} 
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Carousel variant (default)
  return (
    <section className={clsx('py-12 bg-neutral-50 dark:bg-neutral-900/50', className)}>
      <div className="container-custom">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            {title && (
              <h2 className="heading-2 text-neutral-900 dark:text-neutral-100 mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-neutral-500">{subtitle}</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="التمرير للخلف"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="التمرير للأمام"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4 -mb-4"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-96">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
