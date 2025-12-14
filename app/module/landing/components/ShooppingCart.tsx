import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ShoppingBag, Star, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useCart } from '~/shared/hooks/useCart';
import { courseService } from '~/module/landing/services/CourseApi';
import type { CourseResponse } from '~/module/landing/services/CourseApi';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Fetch course details for all cart items
  const courseIds = cartItems.map(item => item.courseId);
  const { data: allCourses = [] } = useQuery<CourseResponse[]>({
    queryKey: ['public-courses'],
    queryFn: () => courseService.getPublicCourses(),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Map cart items to course details
  const cartCourses = cartItems
    .map(cartItem => {
      const course = allCourses.find(c => c.id === cartItem.courseId);
      return course ? { ...cartItem, course } : null;
    })
    .filter((item): item is { course: CourseResponse; courseId: string; addedAt: string } => item !== null);

  const handleRemoveItem = (courseId: string) => {
    removeFromCart(courseId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const subtotal = cartCourses.reduce((sum, item) => sum + (item.course?.price || 0), 0);

  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'}
                </h1>
                <p className="text-sm text-slate-400">Review your cart before checkout</p>
              </div>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-2 px-5 py-2.5 text-red-400 hover:text-red-300 border-2 border-red-500/50 hover:border-red-500 rounded-lg font-semibold transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear cart
              </button>
            )}
          </div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-8">Start adding courses to your cart!</p>
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartCourses.length === 0 ? (
                <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
                  <div className="text-slate-400">Loading cart items...</div>
                </div>
              ) : (
                cartCourses.map((item) => (
                  <div
                    key={item.courseId}
                    className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden hover:border-violet-500/50 transition"
                  >
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      {/* Course Image */}
                      <div className="flex-shrink-0">
                        <Link to={`/course/detail/${item.courseId}`}>
                          <img
                            src={item.course.image}
                            alt={item.course.title}
                            className="w-full md:w-64 h-48 object-cover rounded-xl cursor-pointer hover:opacity-90 transition"
                          />
                        </Link>
                      </div>

                      {/* Course Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Instructor */}
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={item.course.avatar}
                              alt={item.course.instructor}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-600"
                            />
                            <span className="text-sm font-medium text-slate-300">{item.course.instructor}</span>
                          </div>

                          {/* Title */}
                          <Link to={`/course/detail/${item.courseId}`}>
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-violet-400 transition cursor-pointer">
                              {item.course.title}
                            </h3>
                          </Link>

                          {/* Rating & Level */}
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-bold text-sm text-white">{item.course.rating}</span>
                              <span className="text-slate-400 text-sm">({item.course.reviews} Reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-violet-500 rounded-full" />
                              <span className="text-sm text-slate-300 font-medium">{item.course.level}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price & Action */}
                      <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-violet-400 mb-1">${item.course.price.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.courseId)}
                          className="p-3 hover:bg-red-500/10 rounded-lg transition group"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-5 h-5 text-slate-400 group-hover:text-red-400 transition" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Subtotal Section */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Subtotal</h3>
                  <p className="text-sm text-slate-400">
                    All Courses have a <span className="font-semibold text-white">30-day</span> money-back guarantee
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-violet-400">${subtotal}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Link
                  to="/courses"
                  className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-600 text-slate-300 rounded-xl font-semibold hover:bg-slate-700 hover:text-violet-400 transition"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Continue Shopping
                </Link>
                <button
                  onClick={() => {
                    if (cartItems.length === 0) {
                      return;
                    }
                    navigate('/checkout');
                  }}
                  disabled={cartItems.length === 0}
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
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