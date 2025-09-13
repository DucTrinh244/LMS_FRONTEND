// app/routes/courses/_index.tsx
import React, { useState } from 'react';
import { Link } from 'react-router';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  tags: string[];
  isEnrolled: boolean;
  progress?: number;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Complete React Development Course',
    description: 'Learn React from scratch with hooks, context, and modern development practices. Build real-world projects and master component-based architecture.',
    instructor: 'Sarah Wilson',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=3b82f6&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    category: 'Web Development',
    level: 'Intermediate',
    duration: '12 hours',
    lessons: 24,
    students: 1250,
    rating: 4.8,
    reviews: 324,
    price: 89.99,
    originalPrice: 129.99,
    tags: ['React', 'JavaScript', 'Frontend'],
    isEnrolled: true,
    progress: 75
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals Masterclass',
    description: 'Master JavaScript fundamentals including ES6+, async programming, DOM manipulation, and modern development techniques.',
    instructor: 'Mike Johnson',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=10b981&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 hours',
    lessons: 16,
    students: 2100,
    rating: 4.9,
    reviews: 456,
    price: 69.99,
    tags: ['JavaScript', 'Programming', 'Web Development'],
    isEnrolled: true,
    progress: 92
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn design thinking, user research, prototyping, and create stunning user interfaces that convert.',
    instructor: 'Emma Davis',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=8b5cf6&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=250&fit=crop',
    category: 'Design',
    level: 'Intermediate',
    duration: '10 hours',
    lessons: 20,
    students: 890,
    rating: 4.7,
    reviews: 234,
    price: 79.99,
    originalPrice: 99.99,
    tags: ['UI/UX', 'Design', 'Figma'],
    isEnrolled: false
  },
  {
    id: 4,
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js, Express, MongoDB, and learn API development best practices.',
    instructor: 'David Chen',
    instructorAvatar: 'https://ui-avatars.com/api/?name=David+Chen&background=f59e0b&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop',
    category: 'Backend Development',
    level: 'Advanced',
    duration: '15 hours',
    lessons: 30,
    students: 750,
    rating: 4.6,
    reviews: 189,
    price: 99.99,
    tags: ['Node.js', 'Backend', 'API'],
    isEnrolled: false
  },
  {
    id: 5,
    title: 'Python Data Science Bootcamp',
    description: 'Learn Python for data science with pandas, numpy, matplotlib, and machine learning fundamentals.',
    instructor: 'Dr. Lisa Park',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Lisa+Park&background=ef4444&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
    category: 'Data Science',
    level: 'Intermediate',
    duration: '20 hours',
    lessons: 40,
    students: 1500,
    rating: 4.9,
    reviews: 678,
    price: 119.99,
    originalPrice: 149.99,
    tags: ['Python', 'Data Science', 'Machine Learning'],
    isEnrolled: false
  },
  {
    id: 6,
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps using React Native. Learn navigation, state management, and deployment.',
    instructor: 'Alex Rodriguez',
    instructorAvatar: 'https://ui-avatars.com/api/?name=Alex+Rodriguez&background=06b6d4&color=fff',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '14 hours',
    lessons: 28,
    students: 680,
    rating: 4.5,
    reviews: 145,
    price: 94.99,
    tags: ['React Native', 'Mobile', 'Cross-platform'],
    isEnrolled: false
  }
];

const categories = ['All', 'Web Development', 'Programming', 'Design', 'Backend Development', 'Data Science', 'Mobile Development'];
const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = ['Most Popular', 'Newest', 'Price: Low to High', 'Price: High to Low', 'Highest Rated'];

const CoursesPage: React.FC = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(mockCourses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const applyFilters = () => {
    let filtered = [...courses];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'All Levels') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Filter by enrollment status
    if (showEnrolledOnly) {
      filtered = filtered.filter(course => course.isEnrolled);
    }

    // Sort courses
    switch (sortBy) {
      case 'Newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'Price: Low to High':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Highest Rated':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // Most Popular
        filtered.sort((a, b) => b.students - a.students);
    }

    setFilteredCourses(filtered);
  };

  React.useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, selectedLevel, sortBy, showEnrolledOnly]);

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Course Thumbnail */}
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-48 object-cover"
        />
        {course.isEnrolled && (
          <div className="absolute top-3 left-3">
            <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Enrolled
            </span>
          </div>
        )}
        {course.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Sale
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${
            course.level === 'Beginner' ? 'bg-green-600' :
            course.level === 'Intermediate' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {course.level}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Category & Duration */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="font-medium">{course.category}</span>
          <span>{course.duration}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-3">
          <img 
            src={course.instructorAvatar} 
            alt={course.instructor}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="text-sm font-medium text-gray-700">{course.instructor}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              {course.rating} ({course.reviews})
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              {course.students}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {course.lessons} lessons
            </span>
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course.isEnrolled && course.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">${course.price}</span>
            {course.originalPrice && (
              <span className="text-lg text-gray-500 line-through ml-2">${course.originalPrice}</span>
            )}
          </div>
          
          {course.isEnrolled ? (
            <Link 
              to={`/courses/${course.id}`}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Continue Learning
            </Link>
          ) : (
            <Link 
              to={`/courses/${course.id}`}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              View Course
            </Link>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Courses</h1>
              <p className="mt-2 text-gray-600">
                Discover and learn new skills with our comprehensive course library
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                to="/courses/create"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Course
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Courses
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enrolled Only Filter */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showEnrolledOnly}
                    onChange={(e) => setShowEnrolledOnly(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">My Courses Only</span>
                </label>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Level Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredCourses.length} of {courses.length} courses
              </p>
            </div>

            {/* Courses Grid */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;