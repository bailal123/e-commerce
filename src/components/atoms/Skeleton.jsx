import { clsx } from 'clsx'

const Skeleton = ({
  variant = 'rectangular',
  width,
  height,
  className,
  animate = true,
  ...props
}) => {
  const variants = {
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4',
    card: 'rounded-2xl',
  }

  return (
    <div
      className={clsx(
        'bg-neutral-200 dark:bg-neutral-800',
        animate && 'animate-pulse',
        variants[variant],
        className
      )}
      style={{ width, height }}
      {...props}
    />
  )
}

// Pre-built skeleton components
export const ProductCardSkeleton = () => (
  <div className="card p-4 space-y-4">
    <Skeleton variant="rectangular" className="aspect-product w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" className="w-20 h-6" />
        <Skeleton variant="circular" className="w-10 h-10" />
      </div>
    </div>
  </div>
)

export const VendorCardSkeleton = () => (
  <div className="card p-6 space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" className="w-16 h-16" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="text" className="w-24" />
      </div>
    </div>
    <Skeleton variant="text" className="w-full h-12" />
  </div>
)

export const CategoryCardSkeleton = () => (
  <div className="card overflow-hidden">
    <Skeleton variant="rectangular" className="aspect-video w-full" />
    <div className="p-4 space-y-2">
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  </div>
)

export default Skeleton
