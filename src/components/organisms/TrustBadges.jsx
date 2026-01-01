import { Shield, Truck, RefreshCw, Award, Headphones, CreditCard } from 'lucide-react'
import { clsx } from 'clsx'

const TrustBadges = ({
  variant = 'default', // default | compact | detailed
  className,
}) => {
  const badges = [
    {
      icon: Shield,
      title: 'ضمان الجودة',
      description: 'جميع المنتجات أصلية 100%',
      color: 'text-primary-600',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
    },
    {
      icon: Truck,
      title: 'شحن سريع',
      description: 'توصيل خلال 2-5 أيام عمل',
      color: 'text-success-600',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
    },
    {
      icon: RefreshCw,
      title: 'إرجاع مجاني',
      description: 'استرجاع خلال 14 يوم',
      color: 'text-accent-600',
      bgColor: 'bg-accent-100 dark:bg-accent-900/30',
    },
    {
      icon: CreditCard,
      title: 'دفع آمن',
      description: 'تشفير SSL كامل',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    {
      icon: Headphones,
      title: 'دعم 24/7',
      description: 'فريق دعم متخصص',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Award,
      title: 'تجار موثوقون',
      description: 'تجار معتمدون ومحققون',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
  ]

  if (variant === 'compact') {
    return (
      <div className={clsx(
        'flex flex-wrap justify-center gap-6 py-6',
        'border-y border-neutral-100 dark:border-neutral-800',
        className
      )}>
        {badges.slice(0, 4).map((badge) => (
          <div key={badge.title} className="flex items-center gap-2">
            <badge.icon className={clsx('w-5 h-5', badge.color)} />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {badge.title}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'detailed') {
    return (
      <section className={clsx('py-12', className)}>
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className={clsx(
                  'p-6 rounded-2xl text-center',
                  'bg-white dark:bg-neutral-900',
                  'border border-neutral-100 dark:border-neutral-800',
                  'hover:shadow-soft transition-shadow'
                )}
              >
                <div className={clsx(
                  'w-14 h-14 rounded-xl mx-auto mb-4',
                  'flex items-center justify-center',
                  badge.bgColor
                )}>
                  <badge.icon className={clsx('w-7 h-7', badge.color)} />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  {badge.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Default variant
  return (
    <section className={clsx(
      'py-8 bg-neutral-50 dark:bg-neutral-900/50',
      className
    )}>
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.slice(0, 4).map((badge) => (
            <div key={badge.title} className="flex items-center gap-4">
              <div className={clsx(
                'w-12 h-12 rounded-xl flex-shrink-0',
                'flex items-center justify-center',
                badge.bgColor
              )}>
                <badge.icon className={clsx('w-6 h-6', badge.color)} />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  {badge.title}
                </h3>
                <p className="text-sm text-neutral-500">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBadges
