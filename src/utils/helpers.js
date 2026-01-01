/**
 * Format price with currency
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: AED)
 * @returns {string} Formatted price string
 */
export const formatPrice = (price, currency = 'AED') => {
  const formatter = new Intl.NumberFormat('ar-AE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })

  const symbols = {
    AED: 'د.إ',
    USD: '$',
    EUR: '€',
    SAR: 'ر.س',
  }

  return `${formatter.format(price)} ${symbols[currency] || currency}`
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} salePrice - Sale price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || salePrice >= originalPrice) return 0
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

/**
 * Format date to Arabic locale
 * @param {string|Date} date - Date to format
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }

  return new Intl.DateTimeFormat('ar-SA', defaultOptions).format(new Date(date))
}

/**
 * Format relative time (e.g., "منذ 3 أيام")
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const now = new Date()
  const then = new Date(date)
  const diffInSeconds = Math.floor((now - then) / 1000)

  const intervals = [
    { label: 'سنة', seconds: 31536000 },
    { label: 'شهر', seconds: 2592000 },
    { label: 'أسبوع', seconds: 604800 },
    { label: 'يوم', seconds: 86400 },
    { label: 'ساعة', seconds: 3600 },
    { label: 'دقيقة', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      if (count === 1) {
        return `منذ ${interval.label}`
      } else if (count === 2) {
        return `منذ ${interval.label}ين`
      } else if (count >= 3 && count <= 10) {
        return `منذ ${count} ${interval.label}ات`
      } else {
        return `منذ ${count} ${interval.label}`
      }
    }
  }

  return 'الآن'
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate slug from text
 * @param {string} text - Text to slugify
 * @returns {string} URL-friendly slug
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\u0621-\u064A\w\-]+/g, '') // Keep Arabic letters
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 300) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Deep clone object
 * @param {object} obj - Object to clone
 * @returns {object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if object is empty
 * @param {object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
  if (!obj) return true
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

/**
 * Generate random ID
 * @param {number} length - ID length
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length)
}

/**
 * Get query params from URL
 * @param {string} url - URL string
 * @returns {object} Query params object
 */
export const getQueryParams = (url) => {
  const params = new URLSearchParams(new URL(url).search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}

/**
 * Build URL with query params
 * @param {string} baseUrl - Base URL
 * @param {object} params - Query params
 * @returns {string} URL with query params
 */
export const buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl, window.location.origin)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })
  return url.toString()
}

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 بايت'
  const k = 1024
  const sizes = ['بايت', 'ك.ب', 'م.ب', 'ج.ب']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

/**
 * Validate UAE phone number
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidUAEPhone = (phone) => {
  const regex = /^(05[0-9]|5[0-9])[0-9]{7}$/
  return regex.test(phone.replace(/\s/g, ''))
}

/**
 * Get star rating array
 * @param {number} rating - Rating value
 * @returns {array} Array of star states
 */
export const getStarRating = (rating) => {
  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push('full')
    } else if (i === fullStars && hasHalfStar) {
      stars.push('half')
    } else {
      stars.push('empty')
    }
  }

  return stars
}

/**
 * Sort products
 * @param {array} products - Products array
 * @param {string} sortBy - Sort option
 * @returns {array} Sorted products
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products]

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    case 'price-low':
      return sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    case 'price-high':
      return sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    default:
      return sorted
  }
}

/**
 * Filter products by price range
 * @param {array} products - Products array
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @returns {array} Filtered products
 */
export const filterByPrice = (products, min, max) => {
  return products.filter((product) => {
    const price = product.salePrice || product.price
    return price >= min && (max === Infinity || price <= max)
  })
}

/**
 * Storage helpers
 */
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },
  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  },
}

export default {
  formatPrice,
  calculateDiscount,
  formatDate,
  formatRelativeTime,
  truncateText,
  slugify,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  generateId,
  getQueryParams,
  buildUrl,
  formatFileSize,
  isValidEmail,
  isValidUAEPhone,
  getStarRating,
  sortProducts,
  filterByPrice,
  storage,
}
