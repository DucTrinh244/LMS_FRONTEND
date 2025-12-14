import { useQuery } from '@tanstack/react-query';
import { Heart, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import { useWishlist } from '~/shared/hooks/useWishlist';
import { courseService } from '~/module/landing/services/CourseApi';
import type { CourseResponse } from '~/module/landing/services/CourseApi';

const WishlistContent = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  // Fetch course details for all wishlist items
  const { data: allCourses = [] } = useQuery<CourseResponse[]>({
    queryKey: ['public-courses'],
    queryFn: () => courseService.getPublicCourses(),
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  // Map wishlist items to course details
  const wishlistCourses = wishlistItems
    .map(wishlistItem => {
      const course = allCourses.find(c => c.id === wishlistItem.courseId);
      return course ? { ...wishlistItem, course } : null;
    })
    .filter((item): item is { course: CourseResponse; courseId: string; addedAt: string } => item !== null);

  const handleRemoveItem = (courseId: string) => {
    removeFromWishlist(courseId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">My Wishlist</h2>
            <p className="text-slate-300">{wishlistItems.length} courses saved</p>
          </div>
          <div className="flex items-center gap-2 bg-violet-600/20 text-violet-400 px-4 py-2 rounded-lg">
            <Heart className="w-5 h-5 fill-violet-400" />
            <span className="font-semibold">{wishlistItems.length} Items</span>
          </div>
        </div>
      </div>

      {/* Wishlist Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistCourses.length === 0 && wishlistItems.length > 0 ? (
          <div className="col-span-full bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
            <div className="text-slate-400">Loading wishlist items...</div>
          </div>
        ) : (
          wishlistCourses.map((item) => (
            <div
              key={item.courseId}
              className="group relative bg-slate-800 rounded-xl border border-slate-700 overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition"
            >
              {/* Image */}
              <div className="relative">
                <Link to={`/course/detail/${item.courseId}`}>
                  <img
                    src={item.course.image}
                    alt={item.course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300 cursor-pointer"
                  />
                </Link>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleRemoveItem(item.courseId)}
                    className="bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-red-600/50 transition"
                    title="Remove from wishlist"
                  >
                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item.courseId)}
                    className="bg-slate-700/50 p-2 rounded-full shadow-md hover:bg-slate-600 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
                {item.course.badge && (
                  <span className="absolute top-3 left-3 bg-violet-600/20 text-violet-400 text-xs font-bold px-3 py-1 rounded-full">
                    {item.course.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.course.avatar}
                      alt={item.course.instructor}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-slate-300 font-medium">{item.course.instructor}</span>
                  </div>
                  <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-3 py-1 rounded-full">
                    {item.course.category}
                  </span>
                </div>

                <Link to={`/course/detail/${item.courseId}`}>
                  <h4 className="text-white font-bold mb-3 line-clamp-2 group-hover:text-violet-400 transition cursor-pointer">
                    {item.course.title}
                  </h4>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-sm text-white">{item.course.rating}</span>
                  </div>
                  <span className="text-slate-400 text-sm">({item.course.reviews} Reviews)</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-violet-400">${item.course.price.toLocaleString()}</span>
                  </div>
                  <Link
                    to={`/course/detail/${item.courseId}`}
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-sm flex items-center gap-2"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {wishlistItems.length === 0 && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
          <Heart className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Your wishlist is empty</h3>
          <p className="text-slate-400 mb-6">Start adding courses you're interested in!</p>
          <Link
            to="/courses"
            className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition"
          >
            Browse Courses
          </Link>
        </div>
      )}
    </div>
  );
};

export default WishlistContent;