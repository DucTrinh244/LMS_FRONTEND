import { ArrowLeft, ShoppingBag, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Information About UI/UX Design Degree',
      instructor: 'David Benitez',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      rating: 4.9,
      reviews: 200,
      level: 'Intermediate',
      price: 120,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80'
    },
    {
      id: 2,
      title: 'Sketch from A to Z (2024): Become an app designer',
      instructor: 'Andrew Pirtle',
      instructorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      rating: 4.6,
      reviews: 170,
      level: 'Basic',
      price: 160,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80'
    },
    {
      id: 3,
      title: 'Complete Web Development Bootcamp 2024',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      rating: 4.8,
      reviews: 350,
      level: 'All Levels',
      price: 170,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80'
    }
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'}
                </h1>
                <p className="text-sm text-gray-500">Review your cart before checkout</p>
              </div>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 px-5 py-2.5 text-pink-600 hover:text-pink-700 border-2 border-pink-600 hover:border-pink-700 rounded-lg font-semibold transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear cart
            </button>
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding courses to your cart!</p>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
              Browse Courses
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full md:w-64 h-48 object-cover rounded-xl"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Instructor */}
                        <div className="flex items-center gap-3 mb-3">
                          <img
                            src={item.instructorAvatar}
                            alt={item.instructor}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                          />
                          <span className="text-sm font-medium text-gray-700">{item.instructor}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {item.title}
                        </h3>

                        {/* Rating & Level */}
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="font-bold text-sm">{item.rating}</span>
                            <span className="text-gray-500 text-sm">({item.reviews} Reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-pink-500 rounded-full" />
                            <span className="text-sm text-gray-600 font-medium">{item.level}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price & Action */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                      <div className="text-right">
                        <p className="text-3xl font-bold text-pink-600 mb-1">${item.price}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-3 hover:bg-red-50 rounded-lg transition group"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subtotal Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Subtotal</h3>
                  <p className="text-sm text-gray-600">
                    All Courses have a <span className="font-semibold text-gray-900">30-day</span> money-back guarantee
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-gray-900">${subtotal}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition">
                  <ArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </button>
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;