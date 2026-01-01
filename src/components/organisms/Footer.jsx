import { Link } from 'react-router-dom'
import { 
  Mail, Phone, MapPin, 
  Facebook, Twitter, Instagram, Youtube,
  CreditCard, Shield, Truck, Headphones 
} from 'lucide-react'
import { Logo, Input, Button } from '../atoms'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'من نحن', href: '/about' },
      { name: 'تواصل معنا', href: '/contact' },
      { name: 'الوظائف', href: '/careers' },
      { name: 'المدونة', href: '/blog' },
    ],
    support: [
      { name: 'مركز المساعدة', href: '/help' },
      { name: 'سياسة الإرجاع', href: '/returns' },
      { name: 'طرق الدفع', href: '/payment' },
      { name: 'الشحن والتوصيل', href: '/shipping' },
    ],
    vendors: [
      { name: 'انضم كتاجر', href: '/sell' },
      { name: 'لوحة التحكم', href: '/vendor/dashboard' },
      { name: 'شروط البائعين', href: '/vendor/terms' },
      { name: 'رسوم البيع', href: '/vendor/fees' },
    ],
    legal: [
      { name: 'سياسة الخصوصية', href: '/privacy' },
      { name: 'الشروط والأحكام', href: '/terms' },
      { name: 'سياسة الكوكيز', href: '/cookies' },
    ],
  }

  const features = [
    { icon: Truck, title: 'شحن سريع', desc: 'توصيل خلال 2-5 أيام' },
    { icon: Shield, title: 'دفع آمن', desc: 'حماية كاملة لبياناتك' },
    { icon: Headphones, title: 'دعم 24/7', desc: 'فريق دعم متخصص' },
    { icon: CreditCard, title: 'دفع مرن', desc: 'طرق دفع متعددة' },
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'فيسبوك' },
    { icon: Twitter, href: '#', label: 'تويتر' },
    { icon: Instagram, href: '#', label: 'انستغرام' },
    { icon: Youtube, href: '#', label: 'يوتيوب' },
  ]

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Features Bar */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-600/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <p className="font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-neutral-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="text-white mb-4" />
            <p className="text-neutral-400 mb-6">
              أكبر سوق متعدد التجار في المنطقة. اكتشف آلاف المنتجات من مئات التجار الموثوقين.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <p className="font-semibold text-white">اشترك في النشرة البريدية</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="bg-neutral-800 border-neutral-600 text-white placeholder:text-neutral-300"
                />
                <Button variant="primary">اشتراك</Button>
              </div>
              <p className="text-xs text-neutral-500">
                بالاشتراك، أنت توافق على سياسة الخصوصية الخاصة بنا
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="font-semibold text-white mb-4">الشركة</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">الدعم</p>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white mb-4">للتجار</p>
            <ul className="space-y-3">
              {footerLinks.vendors.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold text-white mb-4">تواصل معنا</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-neutral-400">
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-neutral-400">
                <Mail className="w-4 h-4" />
                <span>support@souq.com</span>
              </li>
              <li className="flex items-start gap-3 text-neutral-400">
                <MapPin className="w-4 h-4 mt-1" />
                <span>دبي، الإمارات العربية المتحدة</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-400">
              طرق الدفع المعتمدة:
            </p>
            <div className="flex items-center gap-4">
              {/* Inline SVG icons - No external requests */}
              <svg className="h-6 w-auto opacity-80" viewBox="0 0 1000 324" fill="none" aria-label="Visa">
                <path d="M651.19 0.5L524.08 323.16H424.97L361.58 67.19C357.79 52.29 354.49 47.16 343.38 41.02C325.28 30.99 295.49 21.65 269.49 15.65L271.57 0.5H426.91C446.49 0.5 463.73 13.02 467.69 35.14L506.65 235.38L604.42 0.5H651.19ZM780.14 217.15C780.45 137.65 671.77 133.31 672.56 97.15C672.81 86.15 683.12 74.4 705.56 71.4C716.68 69.91 748.69 68.71 785.2 85.52L800.06 6.16C780.5 -0.43 756.19 -6.84 726.56 -6.84C636.31 -6.84 572.68 42.02 572.12 111.98C571.5 164.98 619.56 194.48 656.19 212.15C693.81 230.22 706.31 241.72 706.12 257.72C705.81 282.38 676.12 293.02 648.31 293.47C607.56 294.15 583.81 282.98 564.56 274.38L549.19 356.57C568.56 365.02 605.19 372.32 643.31 372.72C739.81 372.72 801.69 324.01 802.12 249.32C802.31 156.72 780.14 217.15 780.14 217.15Z" fill="#1A1F71"/>
              </svg>
              <svg className="h-8 w-auto opacity-80" viewBox="0 0 152 100" fill="none" aria-label="Mastercard">
                <circle cx="50" cy="50" r="45" fill="#EB001B"/>
                <circle cx="102" cy="50" r="45" fill="#F79E1B"/>
                <path d="M76 14.6C85.6 22.3 91.7 34.4 91.7 48S85.6 73.7 76 81.4C66.4 73.7 60.3 61.6 60.3 48S66.4 22.3 76 14.6Z" fill="#FF5F00"/>
              </svg>
              <svg className="h-5 w-auto opacity-80" viewBox="0 0 124 33" fill="none" aria-label="PayPal">
                <path d="M46.211 6.749H39.627L34.992 27.319H40.036L40.892 23.04C41.285 21.047 42.907 19.619 44.94 19.619H46.023C51.645 19.619 55.258 16.215 56.24 10.808C57.131 5.918 53.949 6.749 46.211 6.749ZM47.014 11.969C46.614 14.249 45.121 15.399 42.745 15.399H41.399L42.545 9.559H44.694C46.614 9.559 47.331 10.329 47.014 11.969Z" fill="#253B80"/>
                <path d="M68.732 10.579H63.688L63.439 11.769C62.856 10.769 61.455 10.189 59.455 10.189C55.041 10.189 51.238 13.959 50.458 18.919C49.678 23.879 52.548 27.649 56.963 27.649C58.963 27.649 60.746 26.879 61.828 25.489L61.579 27.319H66.373L68.732 10.579ZM58.455 23.429C56.455 23.429 55.373 21.879 55.789 19.419C56.205 16.959 58.039 15.409 60.039 15.409C62.039 15.409 63.121 16.959 62.705 19.419C62.288 21.879 60.455 23.429 58.455 23.429Z" fill="#253B80"/>
                <path d="M84.869 10.579H79.825L75.106 22.879L73.272 10.579H68.062L71.856 27.319H77.15L87.106 10.579H84.869Z" fill="#253B80"/>
                <path d="M117.732 10.579H112.688L112.439 11.769C111.856 10.769 110.455 10.189 108.455 10.189C104.041 10.189 100.238 13.959 99.458 18.919C98.678 23.879 101.548 27.649 105.963 27.649C107.963 27.649 109.746 26.879 110.828 25.489L110.579 27.319H115.373L117.732 10.579Z" fill="#179BD7"/>
              </svg>
              <svg className="h-6 w-auto opacity-80 dark:invert" viewBox="0 0 43 18" fill="none" aria-label="Apple Pay">
                <path d="M7.82 3.06C7.32 3.66 6.57 4.13 5.82 4.07C5.73 3.32 6.09 2.52 6.54 1.98C7.04 1.37 7.85 0.94 8.52 0.91C8.59 1.7 8.3 2.47 7.82 3.06ZM8.51 4.26C7.32 4.19 6.3 4.94 5.75 4.94C5.19 4.94 4.31 4.29 3.35 4.31C2.13 4.33 1 5.03 0.39 6.12C-0.86 8.31 0.06 11.53 1.27 13.32C1.86 14.2 2.56 15.19 3.5 15.15C4.41 15.12 4.77 14.55 5.86 14.55C6.95 14.55 7.28 15.15 8.24 15.13C9.23 15.1 9.83 14.24 10.42 13.35C11.09 12.34 11.37 11.36 11.39 11.31C11.37 11.29 9.3 10.47 9.28 8.08C9.26 6.08 10.89 5.14 10.97 5.08C10.03 3.69 8.57 3.52 8.09 3.49C8.51 4.26 8.51 4.26 8.51 4.26ZM14.95 1.36V15.04H17.23V10.49H20.41C23.28 10.49 25.27 8.55 25.27 5.91C25.27 3.27 23.32 1.36 20.49 1.36H14.95Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
            <p>© {currentYear} سوق. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="hover:text-white transition-colors text-neutral-400"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
