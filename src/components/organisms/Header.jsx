import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, X, ShoppingCart, Heart, User, Search, 
  ChevronDown, Sun, Moon, Globe 
} from 'lucide-react'
import { clsx } from 'clsx'
import { Logo, Badge, Avatar, Button } from '../atoms'
import { SearchBar } from '../molecules'
import { useCart } from '../../context/CartContext'
import { useTheme } from '../../context/ThemeContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const location = useLocation()
  const { cartItems } = useCart()
  const { theme, toggleTheme } = useTheme()

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setIsSearchOpen(false)
  }, [location])

  const categories = [
    { name: 'الإلكترونيات', slug: 'electronics', icon: '📱' },
    { name: 'الأزياء', slug: 'fashion', icon: '👕' },
    { name: 'المنزل والحديقة', slug: 'home-garden', icon: '🏠' },
    { name: 'الجمال والعناية', slug: 'beauty', icon: '💄' },
    { name: 'الرياضة', slug: 'sports', icon: '⚽' },
    { name: 'الكتب', slug: 'books', icon: '📚' },
  ]

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'الأقسام', href: '/categories', hasDropdown: true },
    { name: 'التجار', href: '/vendors' },
    { name: 'العروض', href: '/deals', badge: 'حصري' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary-600 text-white text-center py-2 text-sm">
        <p className="container-custom">
          🎉 خصم 20% على جميع المنتجات - استخدم كود: <span className="font-bold">WELCOME20</span>
        </p>
      </div>

      <header className={clsx(
        'sticky top-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-soft' 
          : 'bg-white dark:bg-neutral-900'
      )}>
        {/* Main Header */}
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4 py-4">
            {/* Logo */}
            <Logo size="md" />

            {/* Search - Desktop */}
            <div className="hidden lg:block flex-1 max-w-2xl mx-8">
              <SearchBar 
                placeholder="ابحث عن منتجات، تجار، أقسام..."
                onSearch={(query) => console.log('Search:', query)}
                suggestions={['هواتف ذكية', 'لابتوب', 'ملابس رجالية', 'عطور']}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search - Mobile */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="hidden sm:flex p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label={theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="hidden sm:flex p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
                aria-label="المفضلة"
              >
                <Heart className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors relative"
                aria-label="سلة التسوق"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="hidden sm:block relative">
                <Link
                  to="/account"
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Avatar name="أحمد" size="sm" />
                  <span className="hidden md:inline text-sm font-medium">حسابي</span>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-slide-down">
              <SearchBar 
                placeholder="ابحث..."
                onSearch={(query) => console.log('Search:', query)}
                size="sm"
              />
            </div>
          )}
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:block border-t border-neutral-100 dark:border-neutral-800">
          <div className="container-custom">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  {link.hasDropdown ? (
                    <div
                      onMouseEnter={() => setActiveDropdown(link.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className={clsx(
                        'flex items-center gap-1 px-4 py-3 text-sm font-medium transition-colors',
                        'hover:text-primary-600 dark:hover:text-primary-400',
                        location.pathname.startsWith('/category') && 'text-primary-600 dark:text-primary-400'
                      )}>
                        {link.name}
                        <ChevronDown className={clsx(
                          'w-4 h-4 transition-transform',
                          activeDropdown === link.name && 'rotate-180'
                        )} />
                      </button>

                      {/* Dropdown */}
                      {activeDropdown === link.name && (
                        <div className="absolute top-full right-0 w-64 bg-white dark:bg-neutral-900 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-800 py-2 animate-slide-down">
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              to={`/category/${cat.slug}`}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                              <span className="text-xl">{cat.icon}</span>
                              <span>{cat.name}</span>
                            </Link>
                          ))}
                          <div className="border-t border-neutral-100 dark:border-neutral-800 mt-2 pt-2">
                            <Link
                              to="/categories"
                              className="flex items-center gap-3 px-4 py-2.5 text-primary-600 dark:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                              عرض جميع الأقسام
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className={clsx(
                        'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                        'hover:text-primary-600 dark:hover:text-primary-400',
                        location.pathname === link.href && 'text-primary-600 dark:text-primary-400'
                      )}
                    >
                      {link.name}
                      {link.badge && (
                        <Badge variant="accent" size="sm">{link.badge}</Badge>
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 lg:hidden animate-slide-down overflow-y-auto">
              <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4">
                {/* User Section */}
                <div className="flex items-center gap-3 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl mb-4">
                  <Avatar name="أحمد" size="lg" />
                  <div>
                    <p className="font-medium">مرحباً، أحمد</p>
                    <Link to="/account" className="text-sm text-primary-600">عرض الحساب</Link>
                  </div>
                </div>

                {/* Nav Links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className={clsx(
                        'flex items-center justify-between px-4 py-3 rounded-xl transition-colors',
                        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                        location.pathname === link.href && 'bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                      )}
                    >
                      <span className="font-medium">{link.name}</span>
                      {link.badge && <Badge variant="accent" size="sm">{link.badge}</Badge>}
                    </Link>
                  ))}
                </nav>

                {/* Categories */}
                <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    الأقسام
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                      >
                        <span>{cat.icon}</span>
                        <span className="text-sm">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    <span>{theme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'}</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  )
}

export default Header
