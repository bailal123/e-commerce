import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { clsx } from 'clsx'

const SearchBar = ({
  placeholder = 'ابحث عن منتجات، تجار، أقسام...',
  onSearch,
  suggestions = [],
  className,
  size = 'md',
}) => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const sizes = {
    sm: 'py-2 text-sm',
    md: 'py-3 text-base',
    lg: 'py-4 text-lg',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query)
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion)
    onSearch?.(suggestion)
    setIsFocused(false)
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className={clsx('relative w-full', className)}
      role="search"
    >
      <div className={clsx(
        'relative flex items-center',
        'bg-white dark:bg-neutral-900 rounded-2xl',
        'border-2 transition-all duration-200',
        isFocused 
          ? 'border-primary-500 shadow-glow' 
          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
      )}>
        <Search className="w-5 h-5 text-neutral-400 mr-4" />
        
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className={clsx(
            'flex-1 bg-transparent border-none outline-none',
            'text-neutral-900 dark:text-neutral-100',
            'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            sizes[size]
          )}
          aria-label="البحث"
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
            aria-label="مسح البحث"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          className={clsx(
            'bg-primary-600 hover:bg-primary-700 text-white',
            'px-6 py-2 rounded-xl ml-2 my-1.5',
            'font-medium transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
          )}
        >
          بحث
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && query && (
        <div className={clsx(
          'absolute top-full left-0 right-0 mt-2 z-50',
          'bg-white dark:bg-neutral-900 rounded-xl',
          'border border-neutral-200 dark:border-neutral-700',
          'shadow-lg overflow-hidden',
          'animate-slide-down'
        )}>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={clsx(
                'w-full px-4 py-3 text-right',
                'flex items-center gap-3',
                'hover:bg-neutral-50 dark:hover:bg-neutral-800',
                'transition-colors'
              )}
            >
              <Search className="w-4 h-4 text-neutral-400" />
              <span className="text-neutral-700 dark:text-neutral-300">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  )
}

export default SearchBar
