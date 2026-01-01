import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { clsx } from 'clsx'
import { Button, Rating } from '../atoms'

const FilterSidebar = ({
  filters,
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  className,
}) => {
  const [expandedSections, setExpandedSections] = useState(
    filters.map(f => f.key)
  )

  const toggleSection = (key) => {
    setExpandedSections(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    )
  }

  const handleFilterChange = (filterKey, value) => {
    onFilterChange?.(filterKey, value)
  }

  const hasActiveFilters = Object.values(activeFilters).some(
    v => (Array.isArray(v) ? v.length > 0 : v !== null && v !== undefined)
  )

  return (
    <aside className={clsx(
      'bg-white dark:bg-neutral-900 rounded-2xl',
      'border border-neutral-100 dark:border-neutral-800',
      'p-4',
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
          تصفية النتائج
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
          >
            مسح الكل
          </button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null
            
            const filter = filters.find(f => f.key === key)
            const values = Array.isArray(value) ? value : [value]
            
            return values.map((v) => (
              <span
                key={`${key}-${v}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-xs"
              >
                {filter?.options?.find(o => o.value === v)?.label || v}
                <button
                  onClick={() => {
                    if (Array.isArray(activeFilters[key])) {
                      handleFilterChange(key, activeFilters[key].filter(item => item !== v))
                    } else {
                      handleFilterChange(key, null)
                    }
                  }}
                  className="hover:text-primary-900 dark:hover:text-primary-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          })}
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-4">
        {filters.map((filter) => (
          <div
            key={filter.key}
            className="border-b border-neutral-100 dark:border-neutral-800 pb-4 last:border-0"
          >
            <button
              onClick={() => toggleSection(filter.key)}
              className="flex items-center justify-between w-full py-2 text-right"
            >
              <span className="font-medium text-neutral-900 dark:text-neutral-100">
                {filter.label}
              </span>
              <ChevronDown
                className={clsx(
                  'w-4 h-4 text-neutral-400 transition-transform',
                  expandedSections.includes(filter.key) && 'rotate-180'
                )}
              />
            </button>

            {expandedSections.includes(filter.key) && (
              <div className="mt-2 space-y-2 animate-slide-down">
                {filter.type === 'checkbox' && (
                  <div className="space-y-2">
                    {filter.options?.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={activeFilters[filter.key]?.includes(option.value)}
                          onChange={(e) => {
                            const currentValues = activeFilters[filter.key] || []
                            if (e.target.checked) {
                              handleFilterChange(filter.key, [...currentValues, option.value])
                            } else {
                              handleFilterChange(filter.key, currentValues.filter(v => v !== option.value))
                            }
                          }}
                          className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                          {option.label}
                        </span>
                        {option.count !== undefined && (
                          <span className="text-xs text-neutral-400">
                            ({option.count})
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}

                {filter.type === 'range' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="من"
                        value={activeFilters[filter.key]?.min || ''}
                        onChange={(e) => handleFilterChange(filter.key, {
                          ...activeFilters[filter.key],
                          min: e.target.value
                        })}
                        className="input py-2 text-sm"
                      />
                      <input
                        type="number"
                        placeholder="إلى"
                        value={activeFilters[filter.key]?.max || ''}
                        onChange={(e) => handleFilterChange(filter.key, {
                          ...activeFilters[filter.key],
                          max: e.target.value
                        })}
                        className="input py-2 text-sm"
                      />
                    </div>
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      fullWidth
                      onClick={() => {/* Apply range filter */}}
                    >
                      تطبيق
                    </Button>
                  </div>
                )}

                {filter.type === 'rating' && (
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label
                        key={rating}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="rating"
                          checked={activeFilters[filter.key] === rating}
                          onChange={() => handleFilterChange(filter.key, rating)}
                          className="w-4 h-4 border-neutral-300 text-primary-600 focus:ring-primary-500"
                        />
                        <Rating value={rating} size="sm" />
                        <span className="text-sm text-neutral-500">وأكثر</span>
                      </label>
                    ))}
                  </div>
                )}

                {filter.type === 'color' && (
                  <div className="flex flex-wrap gap-2">
                    {filter.options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange(filter.key, option.value)}
                        className={clsx(
                          'w-8 h-8 rounded-full border-2 transition-all',
                          activeFilters[filter.key] === option.value
                            ? 'border-primary-500 scale-110'
                            : 'border-transparent hover:scale-105'
                        )}
                        style={{ backgroundColor: option.color }}
                        title={option.label}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}

export default FilterSidebar
