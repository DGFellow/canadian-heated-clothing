import React, { useState, useEffect, createContext, useContext } from 'react';
import { ShoppingCart, User, Menu, X, Flame, Search } from 'lucide-react';
import { supabase } from './lib/supabase';

// Cart Context
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === product.size);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId, size);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Router Setup
const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return React.Children.map(children, child =>
    React.cloneElement(child, { currentPath })
  );
};

const Route = ({ path, component: Component, currentPath }) => {
  if (path.includes(':id')) {
    const basePath = path.split(':')[0];
    if (currentPath.startsWith(basePath)) {
      return <Component currentPath={currentPath} />;
    }
  }
  return currentPath === path ? <Component /> : null;
};

const Link = ({ to, children, className = '' }) => (
  <a href={`#${to}`} className={className}>
    {children}
  </a>
);

// Mock Products (replace with Supabase data later)
const mockProducts = [
  { id: 1, name: 'Heated Jacket Pro', price: 299.99, category: 'jackets', image: '🧥', description: 'Premium heated jacket with 3 heat settings' },
  { id: 2, name: 'Thermal Gloves', price: 79.99, category: 'gloves', image: '🧤', description: 'Battery-powered heated gloves' },
  { id: 3, name: 'Heated Vest', price: 189.99, category: 'vests', image: '🦺', description: 'Lightweight heated vest for layering' },
  { id: 4, name: 'Warm Socks', price: 49.99, category: 'socks', image: '🧦', description: 'Heated socks with wireless control' },
  { id: 5, name: 'Heated Hoodie', price: 249.99, category: 'hoodies', image: '👔', description: 'Casual heated hoodie for everyday wear' },
  { id: 6, name: 'Winter Beanie', price: 59.99, category: 'accessories', image: '🎩', description: 'Heated beanie with rechargeable battery' },
];

// Navigation Component
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Flame className="text-orange-500" />
            <span>Canadian Heated</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-orange-400 transition">Home</Link>
            <Link to="/shop" className="hover:text-orange-400 transition">Shop</Link>
            <Link to="/cart" className="hover:text-orange-400 transition relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="hover:text-orange-400 transition">
              <User size={20} />
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/" className="block py-2 hover:text-orange-400">Home</Link>
            <Link to="/shop" className="block py-2 hover:text-orange-400">Shop</Link>
            <Link to="/cart" className="block py-2 hover:text-orange-400">Cart ({cartCount})</Link>
            <Link to="/account" className="block py-2 hover:text-orange-400">Account</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Stay Warm, Stay Active</h1>
          <p className="text-xl mb-8 text-slate-300">
            Premium heated clothing designed for the Canadian winter
          </p>
          <Link
            to="/shop"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-4">🔥</div>
          <h3 className="text-xl font-bold mb-2">Advanced Heating</h3>
          <p className="text-slate-600">3 heat settings for customized warmth</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">🔋</div>
          <h3 className="text-xl font-bold mb-2">Long Battery Life</h3>
          <p className="text-slate-600">Up to 10 hours of continuous heat</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-4">🇨🇦</div>
          <h3 className="text-xl font-bold mb-2">Canadian Made</h3>
          <p className="text-slate-600">Designed for our harsh winters</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockProducts.slice(0, 3).map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-slate-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-orange-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Shop Page
const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'jackets', 'vests', 'gloves', 'socks', 'hoodies', 'accessories'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="text-6xl mb-4 text-center">{product.image}</div>
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-slate-600 text-sm mb-4">{product.description}</p>
              <p className="text-xl font-bold text-orange-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Page
const ProductPage = ({ currentPath }) => {
  const productId = parseInt(currentPath.split('/').pop());
  const product = mockProducts.find(p => p.id === productId);
  const [selectedSize, setSelectedSize] = useState('M');
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link to="/shop" className="text-orange-600 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center bg-slate-100 rounded-lg p-12">
              <div className="text-9xl">{product.image}</div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-3xl font-bold text-orange-600 mb-6">${product.price}</p>
              <p className="text-slate-700 mb-6">{product.description}</p>

              <div className="mb-6">
                <label className="block font-semibold mb-2">Size:</label>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg transition ${
                        selectedSize === size
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-orange-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-orange-500">✓</span>
                  <span>3 adjustable heat settings</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500">✓</span>
                  <span>Rechargeable battery included</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500">✓</span>
                  <span>Machine washable (remove battery)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-orange-500">✓</span>
                  <span>1-year warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Page
const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto mb-4 text-slate-300" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link
            to="/shop"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="bg-white rounded-lg shadow-md">
          {cartItems.map((item, index) => (
            <div
              key={`${item.id}-${item.size}`}
              className={`p-6 flex items-center gap-6 ${
                index !== cartItems.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="text-5xl">{item.image}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-slate-600">Size: {item.size}</p>
                <p className="text-orange-600 font-semibold">${item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="p-6 bg-slate-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-orange-600">
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-lg font-semibold transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Checkout Page
const CheckoutPage = () => {
  const { cartItems, cartTotal } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Checkout functionality will be connected to Stripe payment processing');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <Link to="/shop" className="text-orange-600 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />

                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Province"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Payment</h2>
                <div className="bg-slate-50 p-6 rounded-lg text-center">
                  <p className="text-slate-600 mb-4">
                    Stripe payment integration will be added here
                  </p>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Complete Order
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>{item.name} ({item.size}) x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span className="text-orange-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Account Page
const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Account</h1>
          
          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={() => setIsLoggedIn(true)}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold mb-4"
          >
            Sign In
          </button>

          <div className="text-center">
            <p className="text-slate-600 mb-2">Don't have an account?</p>
            <button className="text-orange-600 hover:underline font-semibold">
              Create Account
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-slate-700">
            <p className="font-semibold mb-1">Note:</p>
            <p>Authentication will be connected to Supabase</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Name:</span> John Doe</p>
              <p><span className="font-semibold">Email:</span> {email || 'john@example.com'}</p>
              <button className="text-orange-600 hover:underline font-semibold">
                Edit Profile
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order History</h2>
            <p className="text-slate-600">No orders yet</p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-red-600 hover:underline font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-slate-50">
        <Navigation />
        <Router>
          <Route path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account" component={AccountPage} />
        </Router>
      </div>
    </CartProvider>
  );
};

export default App;