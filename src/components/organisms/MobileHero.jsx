/**
 * MobileHero - Lightweight hero component optimized for mobile LCP
 * This component loads faster by:
 * - Using simpler DOM structure
 * - No carousel animations on initial load
 * - Immediate image display without transitions
 * - Reduced JavaScript overhead
 */

import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { Button } from '../atoms'

const MobileHero = ({ slide, className }) => {
  if (!slide) return null

  return (
    <section 
      className={clsx('relative overflow-hidden', className)}
      aria-label="Hero Banner"
    >
      <div className="relative aspect-[4/3] sm:aspect-[16/9]">
        {/* LCP Image - No lazy loading, immediate display */}
        <img
          src={slide.mobileImage || slide.image}
          alt={slide.title}
          fetchpriority="high"
          decoding="sync"
          loading="eager"
          width={480}
          height={360}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ contentVisibility: 'auto' }}
        />
        
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content - Simplified for mobile */}
        <div className="absolute inset-0 flex items-end p-4 pb-6">
          <div className="w-full text-center">
            {slide.badge && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent-500 text-white mb-2">
                {slide.badge}
              </span>
            )}
            
            <h1 className="text-2xl font-bold text-white mb-2">
              {slide.title}
            </h1>
            
            {slide.subtitle && (
              <p className="text-sm text-white/90 mb-4">
                {slide.subtitle}
              </p>
            )}
            
            {slide.cta && (
              <Link to={slide.cta.href}>
                <Button size="md" variant="primary" className="shadow-lg w-full max-w-xs">
                  {slide.cta.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileHero
