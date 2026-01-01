import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import { Button, Badge, Image } from '../atoms'
import { optimizeImageUrl } from '../atoms/Image'

const PromoBanner = ({
  variant = 'default', // default | split | minimal | countdown
  title,
  subtitle,
  description,
  image,
  cta,
  secondaryCta,
  badge,
  bgColor = 'bg-gradient-to-r from-primary-600 to-primary-800',
  countdown,
  className,
}) => {
  if (variant === 'split') {
    return (
      <section className={clsx(
        'rounded-3xl overflow-hidden',
        bgColor,
        className
      )}>
        <div className="grid md:grid-cols-2 items-center">
          {/* Content */}
          <div className="p-8 md:p-12 text-white">
            {badge && (
              <Badge variant="accent" size="lg" className="mb-4">
                {badge}
              </Badge>
            )}
            
            {title && (
              <h2 className="heading-2 mb-4">{title}</h2>
            )}
            
            {subtitle && (
              <p className="text-2xl font-bold text-white/90 mb-2">{subtitle}</p>
            )}
            
            {description && (
              <p className="text-white/80 mb-6">{description}</p>
            )}
            
            {cta && (
              <div className="flex flex-wrap gap-3">
                <Link to={cta.href}>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-white text-primary-700 hover:bg-neutral-100"
                  >
                    {cta.text}
                  </Button>
                </Link>
                {secondaryCta && (
                  <Link to={secondaryCta.href}>
                    <Button 
                      size="lg" 
                      variant="ghost"
                      className="text-white border-white/30 hover:bg-white/10"
                    >
                      {secondaryCta.text}
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
          
          {/* Image */}
          {image && (
            <div className="relative h-64 md:h-full">
              <img
                src={optimizeImageUrl(image, { width: 672, height: 448, quality: 75 })}
                alt=""
                loading="lazy"
                decoding="async"
                width={672}
                height={448}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'countdown' && countdown) {
    return (
      <section className={clsx(
        'rounded-3xl overflow-hidden py-8 md:py-12 text-center',
        bgColor,
        className
      )}>
        <div className="container-custom">
          {badge && (
            <Badge variant="accent" size="lg" className="mb-4">
              {badge}
            </Badge>
          )}
          
          {title && (
            <h2 className="heading-2 text-white mb-4">{title}</h2>
          )}
          
          {/* Countdown */}
          <div className="flex justify-center gap-4 md:gap-6 mb-6">
            {[
              { label: 'يوم', value: countdown.days },
              { label: 'ساعة', value: countdown.hours },
              { label: 'دقيقة', value: countdown.minutes },
              { label: 'ثانية', value: countdown.seconds },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-2">
                  <span className="text-2xl md:text-4xl font-bold text-white">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-sm text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
          
          {cta && (
            <Link to={cta.href}>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary-700 hover:bg-neutral-100"
              >
                {cta.text}
              </Button>
            </Link>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'minimal') {
    return (
      <section className={clsx(
        'rounded-2xl py-6 px-8',
        'flex flex-col md:flex-row items-center justify-between gap-4',
        bgColor,
        className
      )}>
        <div className="flex items-center gap-4 text-white">
          {badge && (
            <Badge variant="accent">{badge}</Badge>
          )}
          <p className="font-medium">
            {title}
            {subtitle && <span className="text-white/80 mr-2">{subtitle}</span>}
          </p>
        </div>
        
        {cta && (
          <Link to={cta.href}>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white text-primary-700 hover:bg-neutral-100"
            >
              {cta.text}
            </Button>
          </Link>
        )}
      </section>
    )
  }

  // Default variant
  return (
    <section 
      className={clsx(
        'relative rounded-3xl overflow-hidden py-12 md:py-16',
        !image && bgColor,
        className
      )}
    >
      {/* Background Image */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30" />
        </>
      )}
      
      <div className="container-custom relative z-10">
        <div className="max-w-xl">
          {badge && (
            <Badge variant="accent" size="lg" className="mb-4">
              {badge}
            </Badge>
          )}
          
          {title && (
            <h2 className="heading-2 text-white mb-4">{title}</h2>
          )}
          
          {subtitle && (
            <p className="text-2xl font-bold text-white/90 mb-2">{subtitle}</p>
          )}
          
          {description && (
            <p className="text-white/80 mb-6">{description}</p>
          )}
          
          {cta && (
            <div className="flex flex-wrap gap-3">
              <Link to={cta.href}>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-white text-primary-700 hover:bg-neutral-100"
                >
                  {cta.text}
                </Button>
              </Link>
              {secondaryCta && (
                <Link to={secondaryCta.href}>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {secondaryCta.text}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PromoBanner
