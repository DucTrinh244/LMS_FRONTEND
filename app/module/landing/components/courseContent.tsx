import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Filter,
  Grid,
  Heart,
  List,
  Search,
  Star
} from 'lucide-react';
import { useState } from 'react';

const CourseGridPage = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newly-published');
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [instructorsOpen, setInstructorsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [rangeOpen, setRangeOpen] = useState(true);
  const [levelOpen, setLevelOpen] = useState(true);
  const [reviewsOpen, setReviewsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(['it-software']);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(4.0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const categories = [
    { id: 'backend', name: 'Backend', count: 3 },
    { id: 'css', name: 'CSS', count: 2 },
    { id: 'frontend', name: 'Frontend', count: 2 },
    { id: 'general', name: 'General', count: 2 },
    { id: 'it-software', name: 'IT & Software', count: 2 },
    { id: 'photography', name: 'Photography', count: 2 },
    { id: 'programming', name: 'Programming Language', count: 3 },
    { id: 'technology', name: 'Technology', count: 2 },
  ];

  const instructors = [
    { id: 'keny', name: 'Keny White', count: 10 },
    { id: 'hinala', name: 'Hinala Hyuga', count: 5 },
    { id: 'john', name: 'John Doe', count: 3 },
  ];

  const durations = [
    { id: '0-5', name: '0-5 hours', count: 2 },
    { id: '5-10', name: '5-10 hours', count: 3 },
    { id: '10+', name: '10+ hours', count: 1 },
  ];

  const levels = [
    { id: 'beginner', name: 'Beginner', count: 3 },
    { id: 'intermediate', name: 'Intermediate', count: 2 },
    { id: 'advanced', name: 'Advanced', count: 1 },
  ];

  const courses = [
    {
      id: 1,
      title: 'Information About UI/UX Design Degree',
      instructor: 'Brenda Slaton',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Design',
      duration: '5-10',
      level: 'intermediate',
      rating: 4.9,
      reviews: 200,
      price: 120,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      badge: '15% off',
      badgeColor: 'bg-rose-500',
    },
    {
      id: 2,
      title: 'Wordpress for Beginners - Master Wordpress Quickly',
      instructor: 'Ana Reyes',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Wordpress',
      duration: '0-5',
      level: 'beginner',
      rating: 4.4,
      reviews: 160,
      price: 140,
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&q=80',
    },
    {
      id: 3,
      title: 'Sketch from A to Z (2024): Become an app designer',
      instructor: 'Andrew Pirtle',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Design',
      duration: '5-10',
      level: 'intermediate',
      rating: 4.4,
      reviews: 160,
      price: 140,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
    },
    {
      id: 4,
      title: 'Complete JavaScript Course 2024: From Zero to Expert',
      instructor: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      category: 'Development',
      duration: '10+',
      level: 'advanced',
      rating: 4.8,
      reviews: 320,
      price: 159,
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80',
    },
    {
      id: 5,
      title: 'Digital Marketing Masterclass - 23 Courses in 1',
      instructor: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Marketing',
      duration: '10+',
      level: 'intermediate',
      rating: 4.7,
      reviews: 280,
      price: 125,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    },
    {
      id: 6,
      title: 'Python for Data Science and Machine Learning',
      instructor: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      category: 'Data Science',
      duration: '10+',
      level: 'advanced',
      rating: 4.9,
      reviews: 450,
      price: 189,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      badge: 'Bestseller',
      badgeColor: 'bg-amber-500',
    },
  ];

  const toggleWishlist = (courseId: number) => {
    setWishlist((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  // Filter courses based on selected filters
  const filteredCourses = courses
    .filter((course) => selectedCategories.length === 0 || selectedCategories.includes(categories.find(cat => cat.name === course.category)?.id || ''))
    .filter((course) => selectedInstructors.length === 0 || selectedInstructors.includes(instructors.find(inst => inst.name === course.instructor)?.id || ''))
    .filter((course) => course.price >= priceRange[0] && course.price <= priceRange[1])
    .filter((course) => selectedDurations.length === 0 || selectedDurations.includes(course.duration))
    .filter((course) => selectedLevels.length === 0 || selectedLevels.includes(course.level))
    .filter((course) => course.rating >= minRating)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.id - a.id; // Default: newly-published (higher ID first)
    });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-5 sticky top-24">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Filter className="w-4 h-4 text-violet-400" />
                Filters
              </h3>
              <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">
                Clear
              </button>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Categories</h4>
                {categoriesOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {categoriesOpen && (
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category.id]);
                          } else {
                            setSelectedCategories(selectedCategories.filter((id) => id !== category.id));
                          }
                        }}
                        className="w-3.5 h-3.5 text-violet-500 rounded border-slate-600 focus:ring-violet-500 bg-slate-900"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white flex-1">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                  <button className="text-violet-400 hover:text-violet-300 text-sm font-medium mt-2">
                    See More
                  </button>
                </div>
              )}
            </div>

            {/* Instructors */}
            <div className="border-t border-slate-700 pt-5 mb-5">
              <button
                onClick={() => setInstructorsOpen(!instructorsOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Instructors</h4>
                {instructorsOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {instructorsOpen && (
                <div className="space-y-2">
                  {instructors.map((instructor) => (
                    <label key={instructor.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedInstructors.includes(instructor.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedInstructors([...selectedInstructors, instructor.id]);
                          } else {
                            setSelectedInstructors(selectedInstructors.filter((id) => id !== instructor.id));
                          }
                        }}
                        className="w-3.5 h-3.5 text-violet-500 rounded border-slate-600 focus:ring-violet-500 bg-slate-900"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white">
                        {instructor.name} ({instructor.count})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price */}
            <div className="border-t border-slate-700 pt-5 mb-5">
              <button
                onClick={() => setPriceOpen(!priceOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Price</h4>
                {priceOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {priceOpen && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              )}
            </div>

            {/* Duration (Range) */}
            <div className="border-t border-slate-700 pt-5 mb-5">
              <button
                onClick={() => setRangeOpen(!rangeOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Duration</h4>
                {rangeOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {rangeOpen && (
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <label key={duration.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedDurations.includes(duration.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDurations([...selectedDurations, duration.id]);
                          } else {
                            setSelectedDurations(selectedDurations.filter((id) => id !== duration.id));
                          }
                        }}
                        className="w-3.5 h-3.5 text-violet-500 rounded border-slate-600 focus:ring-violet-500 bg-slate-900"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white">
                        {duration.name} ({duration.count})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Level */}
            <div className="border-t border-slate-700 pt-5 mb-5">
              <button
                onClick={() => setLevelOpen(!levelOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Level</h4>
                {levelOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {levelOpen && (
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedLevels.includes(level.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLevels([...selectedLevels, level.id]);
                          } else {
                            setSelectedLevels(selectedLevels.filter((id) => id !== level.id));
                          }
                        }}
                        className="w-3.5 h-3.5 text-violet-500 rounded border-slate-600 focus:ring-violet-500 bg-slate-900"
                      />
                      <span className="text-sm text-slate-400 group-hover:text-white">
                        {level.name} ({level.count})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="border-t border-slate-700 pt-5">
              <button
                onClick={() => setReviewsOpen(!reviewsOpen)}
                className="flex items-center justify-between w-full mb-3"
              >
                <h4 className="font-bold text-white text-base">Reviews</h4>
                {reviewsOpen ? (
                  <ChevronUp className="w-4 h-4 text-violet-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-violet-400" />
                )}
              </button>
              {reviewsOpen && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-slate-400">
                    <span>{minRating.toFixed(1)} Stars</span>
                    <span>5.0 Stars</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="lg:col-span-3">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <p className="text-slate-400 text-sm">Showing {filteredCourses.length} of {courses.length} results</p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* View Toggle */}
              <div className="flex bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg p-1">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 rounded ${view === 'grid' ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 rounded ${view === 'list' ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm text-white"
              >
                <option value="newly-published">Newly Published</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Search */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full sm:w-48 pl-9 pr-3 py-2 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm text-white placeholder-slate-500"
                />
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className={`grid ${view === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-44 object-cover group-hover:scale-105 transition duration-500"
                  />
                  {course.badge && (
                    <span className={`absolute top-3 left-3 ${course.badgeColor} text-white text-sm font-semibold px-2.5 py-1 rounded-full`}>
                      {course.badge}
                    </span>
                  )}
                  <button
                    onClick={() => toggleWishlist(course.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlist.includes(course.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <img
                      src={course.avatar}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-violet-500/50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-400 truncate">{course.instructor}</p>
                    </div>
                    <span className="text-sm font-semibold text-violet-300 bg-violet-500/20 px-2.5 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2.5 line-clamp-2 group-hover:text-violet-400 transition">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-white text-sm">{course.rating}</span>
                    </div>
                    <span className="text-slate-400 text-sm">({course.reviews} Reviews)</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <span className="text-lg font-bold text-violet-400">${course.price}</span>
                    <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition font-medium text-sm flex items-center gap-1.5 group">
                      View Course
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full flex items-center justify-center hover:bg-violet-600/50 hover:border-violet-500 transition">
                <ChevronDown className="w-4 h-4 text-white rotate-90" />
              </button>
              <button className="w-9 h-9 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full flex items-center justify-center">1</button>
              <button className="w-9 h-9 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full flex items-center justify-center hover:bg-violet-600/50 hover:border-violet-500 hover:text-white transition">2</button>
              <button className="w-9 h-9 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full flex items-center justify-center hover:bg-violet-600/50 hover:border-violet-500 hover:text-white transition">3</button>
              <span className="text-slate-400 text-sm">...</span>
              <button className="w-9 h-9 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full flex items-center justify-center hover:bg-violet-600/50 hover:border-violet-500 hover:text-white transition">10</button>
              <button className="w-9 h-9 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-full flex items-center justify-center hover:bg-violet-600/50 hover:border-violet-500 transition">
                <ChevronDown className="w-4 h-4 text-white -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseGridPage;