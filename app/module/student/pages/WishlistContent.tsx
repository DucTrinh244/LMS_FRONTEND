import { Heart, ShoppingCart, Star, Trash2 } from 'lucide-react';

const WishlistContent = () => {
  const wishlistCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Development',
      rating: 4.8,
      reviews: 320,
      price: 149,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
      badge: 'Bestseller'
    },
    {
      id: 2,
      title: 'Complete Python Bootcamp',
      instructor: 'Michael Chen',
      instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Programming',
      rating: 4.9,
      reviews: 450,
      price: 129,
      originalPrice: 179,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80',
      badge: 'New'
    },
    {
      id: 3,
      title: 'Master Data Science with R',
      instructor: 'Emily Davis',
      instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Data Science',
      rating: 4.7,
      reviews: 280,
      price: 169,
      originalPrice: 229,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80'
    },
    {
      id: 4,
      title: 'Digital Marketing Mastery',
      instructor: 'David Wilson',
      instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      category: 'Marketing',
      rating: 4.6,
      reviews: 195,
      price: 99,
      originalPrice: 149,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      badge: 'Popular'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">My Wishlist</h2>
            <p className="text-slate-300">{wishlistCourses.length} courses saved</p>
          </div>
          <div className="flex items-center gap-2 bg-violet-600/20 text-violet-400 px-4 py-2 rounded-lg">
            <Heart className="w-5 h-5 fill-violet-400" />
            <span className="font-semibold">{wishlistCourses.length} Items</span>
          </div>
        </div>
      </div>

      {/* Wishlist Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistCourses.map((course) => (
          <div
            key={course.id}
            className="group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-red-600/50 transition">
                  <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                </button>
                <button className="bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-slate-600 transition">
                  <Trash2 className="w-4 h-4 text-slate-300" />
                </button>
              </div>
              {course.badge && (
                <span className="absolute top-3 left-3 bg-violet-600/20 text-violet-400 text-xs font-bold px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm text-slate-300 font-medium">{course.instructor}</span>
                </div>
                <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                  {course.category}
                </span>
              </div>

              <h4 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-violet-400 transition">
                {course.title}
              </h4>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-semibold text-sm text-white">{course.rating}</span>
                </div>
                <span className="text-slate-400 text-sm">({course.reviews} Reviews)</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-violet-400">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-slate-500 text-sm line-through">${course.originalPrice}</span>
                  )}
                </div>
                <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-sm flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {wishlistCourses.length === 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
          <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
          <p className="text-slate-400 mb-6">Start adding courses you're interested in!</p>
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistContent;