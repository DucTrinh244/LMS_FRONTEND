import { useQuery } from '@tanstack/react-query';
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
import { Link } from 'react-router';
import { courseService, type CategoryWithCount, type CourseResponse, type InstructorWithCount } from '~/module/landing/services/CourseApi';
import { useWishlist } from '~/shared/hooks/useWishlist';

const CourseGridPage = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newly-published');
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [instructorsOpen, setInstructorsOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<string[]>([]);
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Fetch courses from API
  const {
    data: courses = [],
    isLoading,
    error
  } = useQuery<CourseResponse[]>({
    queryKey: ['public-courses'],
    queryFn: () => courseService.getPublicCourses(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Fetch categories with count from API
  const {
    data: categories = [],
    isLoading: categoriesLoading
  } = useQuery<CategoryWithCount[]>({
    queryKey: ['categories-with-count'],
    queryFn: () => courseService.getCategoriesWithCount(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Fetch instructors with count from API
  const {
    data: instructors = [],
    isLoading: instructorsLoading
  } = useQuery<InstructorWithCount[]>({
    queryKey: ['instructors-with-count'],
    queryFn: () => courseService.getInstructorsWithCount(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });


  const handleToggleWishlist = (courseId: string) => {
    toggleWishlist(courseId);
  };

  // Filter courses based on selected filters
  const filteredCourses = (courses || [])
    .filter((course) => {
      // If no categories selected, show all courses
      if (selectedCategories.length === 0) return true;
      // Try to find matching category by id or name (case-insensitive)
      const matchedCategory = categories.find(cat =>
        cat.id.toLowerCase() === course.category.toLowerCase() ||
        cat.name.toLowerCase() === course.category.toLowerCase() ||
        course.category.toLowerCase().includes(cat.name.toLowerCase()) ||
        cat.name.toLowerCase().includes(course.category.toLowerCase())
      );
      // If category found and selected, include course
      if (matchedCategory && selectedCategories.includes(matchedCategory.id)) return true;
      // If no match found and we have selected categories, exclude the course
      return false;
    })
    .filter((course) => {
      // If no instructors selected, show all courses
      if (selectedInstructors.length === 0) return true;
      // Try to find matching instructor
      const matchedInstructor = instructors.find(inst =>
        inst.name.toLowerCase() === course.instructor.toLowerCase() ||
        course.instructor.toLowerCase().includes(inst.name.toLowerCase())
      );
      // If instructor found and selected, include course, otherwise exclude
      return matchedInstructor ? selectedInstructors.includes(matchedInstructor.id) : false;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: newly-published (compare by string ID)
      return b.id.localeCompare(a.id);
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
                  {categoriesLoading ? (
                    <div className="text-slate-400 text-sm py-2">Loading categories...</div>
                  ) : categories.length === 0 ? (
                    <div className="text-slate-400 text-sm py-2">No categories available</div>
                  ) : (
                    <>
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
                    </>
                  )}
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
                  {instructorsLoading ? (
                    <div className="text-slate-400 text-sm py-2">Loading instructors...</div>
                  ) : instructors.length === 0 ? (
                    <div className="text-slate-400 text-sm py-2">No instructors available</div>
                  ) : (
                    instructors.map((instructor) => (
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
                    ))
                  )}
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

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-slate-400">Loading courses...</div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-red-400">Error loading courses. Please try again later.</div>
            </div>
          )}

          {/* Courses */}
          {!isLoading && !error && (
            <div className={`grid ${view === 'grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-slate-400">No courses found matching your filters.</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/20 transition group"
                  >
                    {/* Image */}
                    <Link to={`/course/detail/${course.id}`} className="block">
                      <div className="relative overflow-hidden cursor-pointer">
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
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleWishlist(course.id);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-slate-800/50 backdrop-blur-xl border border-slate-600 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition z-10"
                        >
                          <Heart
                            className={`w-4 h-4 ${isInWishlist(course.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
                          />
                        </button>
                      </div>
                    </Link>

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

                      <Link to={`/course/detail/${course.id}`} className="block">
                        <h3 className="font-bold text-white text-base mb-2.5 line-clamp-2 group-hover:text-violet-400 transition cursor-pointer">
                          {course.title}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span className="font-semibold text-white text-sm">{course.rating}</span>
                        </div>
                        <span className="text-slate-400 text-sm">({course.reviews} Reviews)</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                        <span className="text-lg font-bold text-violet-400">${course.price.toLocaleString()}</span>
                        <Link
                          to={`/course/detail/${course.id}`}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl transition font-medium text-sm flex items-center gap-1.5 group"
                        >
                          View Course
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

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