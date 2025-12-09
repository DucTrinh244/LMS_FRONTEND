import { Edit, MessageSquare, Star, ThumbsUp, Trash2 } from 'lucide-react';
import { useState } from 'react';

const ReviewsContent = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const myReviews = [
    {
      id: 1,
      course: 'Wordpress for Beginners - Master Wordpress Quickly',
      courseImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80',
      rating: 5,
      comment: 'Excellent course! The instructor explains everything clearly and the content is very comprehensive. Highly recommended!',
      date: '2024-01-10',
      likes: 12,
      replies: 3,
      helpful: true
    },
    {
      id: 2,
      course: 'Build Responsive Real World Websites',
      courseImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      rating: 4,
      comment: 'Great course with practical examples. The instructor is knowledgeable and responsive to questions.',
      date: '2024-01-05',
      likes: 8,
      replies: 1,
      helpful: true
    },
    {
      id: 3,
      course: 'UI/UX Design Degree',
      courseImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      rating: 5,
      comment: 'Amazing course! Learned so much about design principles and best practices. Worth every penny!',
      date: '2023-12-28',
      likes: 15,
      replies: 5,
      helpful: true
    }
  ];

  const coursesToReview = [
    {
      id: 1,
      title: 'Sketch from A to Z (2024): Become an app designer',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&q=80',
      completedDate: '2024-01-12'
    },
    {
      id: 2,
      title: 'Advanced React Development',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
      completedDate: '2024-01-08'
    }
  ];

  return (
    <div className="space-y-6">
      {/* My Reviews */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">My Reviews</h3>
        <div className="space-y-4">
          {myReviews.map((review) => (
            <div
              key={review.id}
              className="p-5 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition border border-slate-600"
            >
              <div className="flex gap-4">
                <img
                  src={review.courseImage}
                  alt={review.course}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-white font-semibold mb-1">{review.course}</h4>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-600'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-slate-400">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-slate-400 hover:text-violet-400 transition">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-slate-400 hover:text-red-400 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.likes} helpful</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{review.replies} replies</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courses to Review */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h3 className="text-xl font-bold text-white mb-6">Courses to Review</h3>
        {coursesToReview.length > 0 ? (
          <div className="space-y-4">
            {coursesToReview.map((course) => (
              <div
                key={course.id}
                className="p-5 bg-slate-700/50 rounded-lg border border-slate-600"
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1">{course.title}</h4>
                    <p className="text-sm text-slate-400">
                      Completed: {new Date(course.completedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Rating</label>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setRating(i + 1)}
                        onMouseEnter={() => setHoverRating(i + 1)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition"
                      >
                        <Star
                          className={`w-6 h-6 ${i < (hoverRating || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your Review</label>
                  <textarea
                    rows={4}
                    placeholder="Share your thoughts about this course..."
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                  />
                </div>

                <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-violet-500/50 transition">
                  Submit Review
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Star className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No courses available for review</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsContent;