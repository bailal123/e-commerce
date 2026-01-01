import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ChevronLeft, Check, CreditCard, Wallet,
  MapPin, User, Phone, Mail, Building,
  Truck, Shield, Clock
} from 'lucide-react'
import { clsx } from 'clsx'
import { MainLayout } from '../components/templates'
import { CartItem } from '../components/molecules'
import { Button, Input, Badge } from '../components/atoms'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/helpers'

const CheckoutPage = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardName: '',
  })

  const steps = [
    { id: 1, title: 'الشحن', icon: Truck },
    { id: 2, title: 'الدفع', icon: CreditCard },
    { id: 3, title: 'التأكيد', icon: Check },
  ]

  const shipping = cartTotal > 200 ? 0 : 25
  const total = cartTotal + shipping

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    navigate('/order-success')
  }

  if (cartItems.length === 0) {
    return (
      <MainLayout title="إتمام الطلب">
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
          <Link to="/">
            <Button>تصفح المنتجات</Button>
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="إتمام الطلب">
      {/* Progress Steps */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 sticky top-0 z-40">
        <div className="container-custom py-4">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Step */}
                <div className="flex items-center gap-3">
                  <div className={clsx(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                    currentStep >= step.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-400'
                  )}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={clsx(
                    'hidden sm:block font-medium',
                    currentStep >= step.id
                      ? 'text-neutral-900 dark:text-neutral-100'
                      : 'text-neutral-400'
                  )}>
                    {step.title}
                  </span>
                </div>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className={clsx(
                    'w-16 md:w-24 h-0.5 mx-4',
                    currentStep > step.id
                      ? 'bg-primary-600'
                      : 'bg-neutral-200 dark:bg-neutral-700'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  معلومات الشحن
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="الاسم الأول"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="أحمد"
                    leftIcon={<User className="w-4 h-4" />}
                    required
                  />
                  <Input
                    label="اسم العائلة"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="محمد"
                    required
                  />
                  <Input
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />
                  <Input
                    label="رقم الهاتف"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="05xxxxxxxx"
                    leftIcon={<Phone className="w-4 h-4" />}
                    required
                  />
                  <div className="md:col-span-2">
                    <Input
                      label="العنوان"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="الشارع، رقم المبنى، الشقة"
                      leftIcon={<Building className="w-4 h-4" />}
                      required
                    />
                  </div>
                  <Input
                    label="المدينة"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="دبي"
                    required
                  />
                  <Input
                    label="الرمز البريدي"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="12345"
                  />
                </div>

                {/* Shipping Options */}
                <div className="mt-8">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                    خيارات الشحن
                  </h3>
                  <div className="space-y-3">
                    {[
                      { id: 'standard', label: 'شحن عادي', time: '3-5 أيام', price: shipping === 0 ? 'مجاني' : '25 د.إ', selected: true },
                      { id: 'express', label: 'شحن سريع', time: '1-2 يوم', price: '50 د.إ' },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={clsx(
                          'flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all',
                          option.selected
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={option.id}
                            defaultChecked={option.selected}
                            className="w-4 h-4 text-primary-600"
                          />
                          <div>
                            <p className="font-medium text-neutral-900 dark:text-neutral-100">
                              {option.label}
                            </p>
                            <p className="text-sm text-neutral-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {option.time}
                            </p>
                          </div>
                        </div>
                        <span className={clsx(
                          'font-semibold',
                          option.price === 'مجاني' ? 'text-success-600' : 'text-neutral-900 dark:text-neutral-100'
                        )}>
                          {option.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <Link to="/cart">
                    <Button variant="ghost" leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}>
                      العودة للسلة
                    </Button>
                  </Link>
                  <Button onClick={handleNextStep}>
                    متابعة للدفع
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-6 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary-600" />
                  طريقة الدفع
                </h2>

                {/* Payment Methods */}
                <div className="space-y-3 mb-8">
                  {[
                    { id: 'card', label: 'بطاقة ائتمان / مدى', icon: CreditCard },
                    { id: 'wallet', label: 'Apple Pay / Google Pay', icon: Wallet },
                    { id: 'cod', label: 'الدفع عند الاستلام', icon: Truck },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={clsx(
                        'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                        formData.paymentMethod === method.id
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300'
                      )}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-primary-600"
                      />
                      <method.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {method.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'card' && (
                  <div className="space-y-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl">
                    <Input
                      label="رقم البطاقة"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      leftIcon={<CreditCard className="w-4 h-4" />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="تاريخ الانتهاء"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                      />
                      <Input
                        label="CVC"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                      />
                    </div>
                    <Input
                      label="الاسم على البطاقة"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="AHMED MOHAMMED"
                    />
                  </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <Button variant="ghost" onClick={handlePrevStep} leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}>
                    العودة
                  </Button>
                  <Button onClick={handleNextStep}>
                    مراجعة الطلب
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Shipping Summary */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary-600" />
                      عنوان الشحن
                    </h3>
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      تعديل
                    </button>
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>{formData.address}</p>
                    <p>{formData.city} {formData.postalCode}</p>
                    <p>{formData.phone}</p>
                    <p>{formData.email}</p>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                      طريقة الدفع
                    </h3>
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="text-sm text-primary-600 hover:underline"
                    >
                      تعديل
                    </button>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {formData.paymentMethod === 'card' && `بطاقة تنتهي بـ ${formData.cardNumber.slice(-4) || '****'}`}
                    {formData.paymentMethod === 'wallet' && 'Apple Pay / Google Pay'}
                    {formData.paymentMethod === 'cod' && 'الدفع عند الاستلام'}
                  </p>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6">
                  <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    المنتجات ({cartItems.length})
                  </h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} variant="compact" />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="ghost" onClick={handlePrevStep} leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}>
                    العودة
                  </Button>
                  <Button 
                    size="lg"
                    onClick={handlePlaceOrder}
                    isLoading={isProcessing}
                  >
                    تأكيد الطلب - {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">
                ملخص الطلب
              </h2>

              {/* Items Preview */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} variant="compact" />
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">المجموع الفرعي</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">الشحن</span>
                  <span className={shipping === 0 ? 'text-success-600' : ''}>
                    {shipping === 0 ? 'مجاني' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <span className="font-semibold">الإجمالي</span>
                  <span className="text-xl font-bold text-primary-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  دفع آمن
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  شحن مجاني +200 د.إ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default CheckoutPage
