import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

const Logo = ({ size = 'md', className }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }

  return (
    <Link 
      to="/" 
      className={clsx(
        'font-display font-bold inline-flex items-center gap-2',
        sizes[size],
        className
      )}
      aria-label="الصفحة الرئيسية"
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-glow">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            className="w-6 h-6 text-white"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 3h18v18H3z" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-accent-500 rounded-full animate-pulse-soft" />
      </div>
      <span className="gradient-text">سوق</span>
    </Link>
  )
}

export default Logo
