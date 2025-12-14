import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Heart, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router';
import type { CourseResponse } from '~/module/landing/services/CourseApi';
import { courseService } from '~/module/landing/services/CourseApi';
import { useWishlist } from '~/shared/hooks/useWishlist';

const WishlistContent = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

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

  const handleClearWishlist = () => {
    clearWishlist();
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {wishlistItems.length} {wishlistItems.length === 1 ? 'Course' : 'Courses'} in Wishlist
                </h1>
                <p className="text-sm text-slate-400">Your saved courses for later</p>
              </div>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={handleClearWishlist}
                className="flex items-center gap-2 px-5 py-2.5 text-red-400 hover:text-red-300 border-2 border-red-500/50 hover:border-red-500 rounded-lg font-semibold transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear Wishlist
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Your wishlist is empty</h2>
            <p className="text-slate-400 mb-8">Start saving courses to your wishlist!</p>
            <Link
              to="/courses"
              className="inline-block bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {wishlistCourses.length === 0 ? (
                <div className="col-span-full bg-slate-800 rounded-xl border border-slate-700 shadow-md p-12 text-center">
                  <div className="text-slate-400">Loading wishlist items...</div>
                </div>
              ) : (
                wishlistCourses.map((item) => (
                  <div
                    key={item.courseId}
                    className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden hover:border-violet-500/50 transition group"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <Link to={`/course/detail/${item.courseId}`}>
                        <img
                          src={item.course.image}
                          alt={item.course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                      <button
                        onClick={() => handleRemoveItem(item.courseId)}
                        className="absolute top-3 right-3 bg-slate-700/80 backdrop-blur-sm p-2 rounded-full hover:bg-red-500/80 transition opacity-0 group-hover:opacity-100"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                      <div className="absolute top-3 left-3">
                        <span className="bg-violet-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          {item.course.level}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={item.course.avatar}
                          alt={item.course.instructor}
                          className="w-6 h-6 rounded-full object-cover ring-2 ring-slate-600"
                        />
                        <span className="text-xs font-medium text-slate-400">{item.course.instructor}</span>
                      </div>

                      {/* Title */}
                      <Link to={`/course/detail/${item.courseId}`}>
                        <h3 className="text-base font-bold text-white mb-2 line-clamp-2 hover:text-violet-400 transition cursor-pointer">
                          {item.course.title}
                        </h3>
                      </Link>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-xs text-white">{item.course.rating}</span>
                        </div>
                        <span className="text-slate-400 text-xs">({item.course.reviews})</span>
                      </div>

                      {/* Price & Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                        <div>
                          <p className="text-xl font-bold text-violet-400">${item.course.price.toLocaleString()}</p>
                        </div>
                        <Link
                          to={`/course/detail/${item.courseId}`}
                          className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition text-sm"
                        >
                          View Course
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
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
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistContent;

