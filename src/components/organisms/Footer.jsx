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
                  <h4 className="font-semibold text-white">{feature.title}</h4>
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
              <h4 className="font-semibold text-white">اشترك في النشرة البريدية</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="bg-neutral-800 border-neutral-700 placeholder:text-neutral-400"
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
            <h4 className="font-semibold text-white mb-4">الشركة</h4>
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
            <h4 className="font-semibold text-white mb-4">الدعم</h4>
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
            <h4 className="font-semibold text-white mb-4">للتجار</h4>
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
            <h4 className="font-semibold text-white mb-4">تواصل معنا</h4>
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
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width="48" height="24" className="h-6 w-auto opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width="52" height="32" className="h-8 w-auto opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width="60" height="20" className="h-5 w-auto opacity-80" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" width="24" height="24" className="h-6 w-auto opacity-80 invert" />
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
