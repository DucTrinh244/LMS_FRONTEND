import { Star, Search, Filter, ThumbsUp, ThumbsDown, Trash2, Eye, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const ReviewsContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const reviews = [
    {
      id: 'REV-001',
      student: 'John Smith',
      studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      course: 'Complete Web Development Bootcamp',
      courseImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      instructor: 'Sarah Wilson',
      rating: 5,
      comment: 'Excellent course! The instructor explains everything clearly and the content is very comprehensive. Highly recommended!',
      date: '2024-01-15',
      helpful: 12,
      status: 'Published'
    },
    {
      id: 'REV-002',
      student: 'Emma Johnson',
      studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      course: 'UI/UX Design Masterclass',
      courseImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
      instructor: 'Michael Chen',
      rating: 4,
      comment: 'Great course with practical examples. The instructor is knowledgeable and responsive to questions.',
      date: '2024-01-14',
      helpful: 8,
      status: 'Published'
    },
    {
      id: 'REV-003',
      student: 'Michael Brown',
      studentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      course: 'Python Programming',
      courseImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
      instructor: 'David Lee',
      rating: 2,
      comment: 'The course content is outdated and the instructor is not very engaging.',
      date: '2024-01-13',
      helpful: 3,
      status: 'Pending'
    },
    {
      id: 'REV-004',
      student: 'Sophie Davis',
      studentAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      course: 'Digital Marketing',
      courseImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
      instructor: 'Lisa Anderson',
      rating: 5,
      comment: 'Amazing course! Learned so much about marketing strategies and best practices.',
      date: '2024-01-12',
      helpful: 15,
      status: 'Published'
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = filterRating === 'all' || review.rating.toString() === filterRating;
    const matchesStatus = filterStatus === 'all' || review.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesRating && matchesStatus;
  });

  const stats = {
    total: reviews.length,
    average: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1),
    published: reviews.filter(r => r.status === 'Published').length,
    pending: reviews.filter(r => r.status === 'Pending').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star className="w-7 h-7 text-purple-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm font-medium text-gray-600">Total Reviews</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <Star className="w-7 h-7 text-amber-600 fill-amber-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.average}</div>
              <div className="text-sm font-medium text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.published}</div>
              <div className="text-sm font-medium text-gray-600">Published</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-yellow-600" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
              <div className="text-sm font-medium text-gray-600">Pending</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews Management</h2>
            <p className="text-gray-600">Manage course and instructor reviews</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className={`p-5 border rounded-lg ${
                review.status === 'Pending'
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex gap-4">
                <img
                  src={review.courseImage}
                  alt={review.course}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={review.studentAvatar}
                          alt={review.student}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-semibold text-gray-900">{review.student}</span>
                        <span className="text-sm text-gray-500">on</span>
                        <span className="font-semibold text-gray-900">{review.course}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">Instructor: {review.instructor}</div>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-semibold text-gray-700">{review.rating}.0</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                        review.status === 'Published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.status}
                      </span>
                      <div className="text-xs text-gray-500 mt-2">{review.date}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful} helpful</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {review.status === 'Pending' && (
                        <>
                          <button className="p-2 hover:bg-green-50 rounded-lg transition" title="Approve">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition" title="Reject">
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}
                      <button className="p-2 hover:bg-purple-50 rounded-lg transition" title="View">
                        <Eye className="w-4 h-4 text-purple-600" />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg transition" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsContent;