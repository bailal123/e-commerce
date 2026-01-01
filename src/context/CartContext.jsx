import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

const initialState = {
  cartItems: [],
  isCartOpen: false,
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cartItems.find(
        item => item.id === action.payload.id && 
                JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
      )

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id && 
            JSON.stringify(item.selectedVariants) === JSON.stringify(action.payload.selectedVariants)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload }],
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      }

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      }

    case 'OPEN_CART':
      return {
        ...state,
        isCartOpen: true,
      }

    case 'CLOSE_CART':
      return {
        ...state,
        isCartOpen: false,
      }

    case 'LOAD_CART':
      return {
        ...state,
        cartItems: action.payload,
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Error loading cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cartItems))
  }, [state.cartItems])

  const addToCart = (product, quantity = 1, selectedVariants = {}) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...product,
        quantity,
        selectedVariants,
      },
    })
  }

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId)
      return
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' })
  }

  const openCart = () => {
    dispatch({ type: 'OPEN_CART' })
  }

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' })
  }

  // Calculate totals
  const cartCount = state.cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const cartTotal = state.cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price
    return total + (price * item.quantity)
  }, 0)

  // Group items by vendor
  const itemsByVendor = state.cartItems.reduce((groups, item) => {
    const vendorId = item.vendor?.id || 'unknown'
    if (!groups[vendorId]) {
      groups[vendorId] = {
        vendor: item.vendor,
        items: [],
      }
    }
    groups[vendorId].items.push(item)
    return groups
  }, {})

  const value = {
    cartItems: state.cartItems,
    isCartOpen: state.isCartOpen,
    cartCount,
    cartTotal,
    itemsByVendor,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartContext
