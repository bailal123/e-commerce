import { Quote } from 'lucide-react'
import { clsx } from 'clsx'
import { Avatar, Rating } from '../atoms'

const TestimonialCard = ({
  testimonial,
  variant = 'default',
  className,
}) => {
  const {
    name,
    avatar,
    comment,
    rating,
    role,
  } = testimonial

  if (variant === 'featured') {
    return (
      <div className={clsx(
        'relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 text-white',
        className
      )}>
        {/* Quote icon */}
        <Quote className="w-12 h-12 text-white/20 absolute top-6 left-6" />
        
        {/* Content */}
        <blockquote className="relative z-10">
          <p className="text-lg md:text-xl leading-relaxed">
            "{comment}"
          </p>
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4 mt-8">
          <Avatar
            src={avatar}
            name={name}
            size="lg"
            className="ring-2 ring-white/20"
          />
          <div>
            <p className="font-semibold">{name}</p>
            {role && <p className="text-white/80 text-sm">{role}</p>}
            <Rating value={rating} size="sm" className="mt-1" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(
      'card p-6',
      className
    )}>
      {/* Quote icon */}
      <Quote className="w-8 h-8 text-primary-200 dark:text-primary-800 mb-4" />

      {/* Rating */}
      <Rating value={rating} size="sm" className="mb-4" />
      
      {/* Content */}
      <blockquote>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          "{comment}"
        </p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <Avatar
          src={avatar}
          name={name}
          size="md"
        />
        <div>
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            {name}
          </p>
          {role && (
            <p className="text-sm text-neutral-500">{role}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
