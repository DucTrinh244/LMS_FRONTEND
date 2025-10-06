import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Filter,
  Grid,
  Heart,
  List,
  Search,
  Star
} from 'lucide-react';
import { useState } from 'react';

const InstructorContent = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [expandedInstructors, setExpandedInstructors] = useState(true);
  const [expandedPrice, setExpandedPrice] = useState(true);
  const [expandedRange, setExpandedRange] = useState(true);
  const [expandedLevel, setExpandedLevel] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState(['IT & Software']);
  const [selectedInstructors, setSelectedInstructors] = useState(['Nicole Brown']);

  const instructors = [
    {
      id: 1,
      name: 'Rolands Granger',
      role: 'Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      rating: 4.9,
      reviews: 200,
      lessons: 12,
      duration: '169hr 20min',
      verified: true,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 2,
      name: 'Lisa Lopez',
      role: 'Finance',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      rating: 4.4,
      reviews: 130,
      lessons: 22,
      duration: '15hr 06min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 3,
      name: 'Charles Ruiz',
      role: 'Cloud Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      rating: 4.5,
      reviews: 120,
      lessons: 16,
      duration: '2hr 25min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 4,
      name: 'Rogerina Grogan',
      role: 'Vocational',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      rating: 4.6,
      reviews: 180,
      lessons: 6,
      duration: '19hr 30min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 5,
      name: 'Ivana Tow',
      role: 'Corporate Trainer',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
      rating: 4.2,
      reviews: 210,
      lessons: 25,
      duration: '4hr 20min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 6,
      name: 'Kevin Leonard',
      role: 'Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      rating: 4.5,
      reviews: 140,
      lessons: 11,
      duration: '7hr 10min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 7,
      name: 'David Roccoz',
      role: 'Sports Coach',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
      rating: 4.3,
      reviews: 190,
      lessons: 4,
      duration: '1hr 30min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 8,
      name: 'Jeanette Dulaney',
      role: 'Technical Trainer',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
      rating: 4.3,
      reviews: 190,
      lessons: 8,
      duration: '4hr 35min',
      verified: false,
      bgColor: 'from-slate-700 to-slate-600'
    },
    {
      id: 9,
      name: 'Debran Andrew',
      role: 'Health and Wellness',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
      rating: 4.3,
      reviews: 190,
      lessons: 8,
      duration: '4hr 35min',
      verified: false,
      bgColor: 'from-slate-800 to-slate-900'
    }
  ];

  const categories = [
    { name: 'Backend', count: 3 },
    { name: 'CSS', count: 2 },
    { name: 'Frontend', count: 2 },
    { name: 'General', count: 2 },
    { name: 'IT & Software', count: 2 },
    { name: 'Photography', count: 2 },
    { name: 'Programming Language', count: 3 },
    { name: 'Technology', count: 2 }
  ];

  const instructorsList = [
    { name: 'Keny White', count: 10 },
    { name: 'Himala Hyuga', count: 5 },
    { name: 'John Doe', count: 3 },
    { name: 'Nicole Brown', count: 0 }
  ];

  const priceOptions = [
    { name: 'All', count: 10 },
    { name: 'Free', count: 5 },
    { name: 'Paid', count: 3 }
  ];

  const levelOptions = [
    { name: 'Beginner', count: 10 },
    { name: 'Intermediate', count: 5 },
    { name: 'Advanced', count: 21 },
    { name: 'Expert', count: 3 }
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleInstructor = (instructor: string) => {
    setSelectedInstructors(prev => 
      prev.includes(instructor) 
        ? prev.filter(i => i !== instructor)
        : [...prev, instructor]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 sticky top-8">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-violet-400" />
                  <h2 className="text-base font-bold text-white">Filters</h2>
                </div>
                <button className="text-violet-400 hover:text-violet-300 font-semibold text-xs">
                  Clear
                </button>
              </div>

              {/* Categories */}
              <div className="mb-4 border-b border-slate-700 pb-4">
                <button
                  onClick={() => setExpandedCategories(!expandedCategories)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h3 className="font-bold text-white text-sm">Categories</h3>
                  {expandedCategories ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                {expandedCategories && (
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.name} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => toggleCategory(category.name)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition ${
                            selectedCategories.includes(category.name)
                              ? 'bg-violet-600 border-violet-600'
                              : 'border-slate-300 group-hover:border-violet-400'
                          }`}>
                            {selectedCategories.includes(category.name) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-300 flex-1">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                    <button className="text-violet-400 hover:text-violet-300 font-semibold text-xs mt-2">
                      See More
                    </button>
                  </div>
                )}
              </div>

              {/* Instructors */}
              <div className="mb-4 border-b border-slate-700 pb-4">
                <button
                  onClick={() => setExpandedInstructors(!expandedInstructors)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h3 className="font-bold text-white text-sm">Instructors</h3>
                  {expandedInstructors ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                {expandedInstructors && (
                  <div className="space-y-2">
                    {instructorsList.map((instructor) => (
                      <label key={instructor.name} className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={selectedInstructors.includes(instructor.name)}
                            onChange={() => toggleInstructor(instructor.name)}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition ${
                            selectedInstructors.includes(instructor.name)
                              ? 'bg-violet-600 border-violet-600'
                              : 'border-slate-300 group-hover:border-violet-400'
                          }`}>
                            {selectedInstructors.includes(instructor.name) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-slate-300 flex-1">
                          {instructor.name} {instructor.count > 0 && `(${instructor.count})`}
                        </span>
                      </label>
                    ))}
                    <button className="text-violet-400 hover:text-violet-300 font-semibold text-xs mt-2">
                      See More
                    </button>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4 border-b border-slate-700 pb-4">
                <button
                  onClick={() => setExpandedPrice(!expandedPrice)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h3 className="font-bold text-white text-sm">Price</h3>
                  {expandedPrice ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                {expandedPrice && (
                  <div className="space-y-2">
                    {priceOptions.map((option) => (
                      <label key={option.name} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="price"
                          className="w-4 h-4 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="text-xs text-slate-300">
                          {option.name} ({option.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Range */}
              <div className="mb-4 border-b border-slate-700 pb-4">
                <button
                  onClick={() => setExpandedRange(!expandedRange)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h3 className="font-bold text-white text-sm">Range</h3>
                  {expandedRange ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                {expandedRange && (
                  <input
                    type="range"
                    className="w-full h-1.5 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-violet-600"
                  />
                )}
              </div>

              {/* Level */}
              <div>
                <button
                  onClick={() => setExpandedLevel(!expandedLevel)}
                  className="w-full flex items-center justify-between mb-3"
                >
                  <h3 className="font-bold text-white text-sm">Level</h3>
                  {expandedLevel ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </button>
                {expandedLevel && (
                  <div className="space-y-2">
                    {levelOptions.map((option) => (
                      <label key={option.name} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
                        />
                        <span className="text-xs text-slate-300">
                          {option.name} ({option.count})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - Instructor Grid */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-4 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-slate-300 text-xs">
                  Showing <span className="font-semibold">1-9</span> of <span className="font-semibold">50</span> results
                </p>

                <div className="flex items-center gap-2">
                  {/* View Toggle */}
                  <div className="flex gap-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition ${
                        viewMode === 'grid'
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-violet-400'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition ${
                        viewMode === 'list'
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-violet-400'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort */}
                  <select className="px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-xs">
                    <option>Newly Published</option>
                    <option>Most Popular</option>
                    <option>Highest Rated</option>
                  </select>

                  {/* Search */}
                  <div className="relative hidden md:block">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="pl-8 pr-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-xs w-40"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructor Cards Grid */}
            <div className={`grid gap-6 mb-6 ${
              viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}>
              {instructors.map((instructor) => (
                <div
                  key={instructor.id}
                  className="group bg-slate-800 rounded-xl border border-slate-700 shadow-md hover:shadow-xl hover:shadow-violet-500/50 transition-all"
                >
                  {/* Image */}
                  <div className={`relative bg-gradient-to-br ${instructor.bgColor} p-6`}>
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-full h-40 object-cover object-top rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    {instructor.verified && (
                      <div className="absolute top-3 left-3 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-xs text-white">{instructor.rating}</span>
                      <span className="text-slate-400 text-xs">({instructor.reviews} Reviews)</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-violet-400 transition">
                      {instructor.name}
                    </h3>
                    <p className="text-slate-300 text-xs mb-3">{instructor.role}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                      <div className="flex items-center gap-2 text-xs">
                        <BookOpen className="w-4 h-4 text-violet-400" />
                        <span className="text-slate-300 font-medium">{instructor.lessons}+ Lessons</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Clock className="w-4 h-4 text-violet-400" />
                        <span className="text-slate-300 font-medium">{instructor.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5">
              <p className="text-xs text-slate-300">Page 1 of 2</p>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition">
                  <ChevronLeft className="w-4 h-4 text-slate-300" />
                </button>
                <button className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold text-xs">
                  1
                </button>
                <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition text-slate-300 font-medium">
                  2
                </button>
                <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition text-slate-300 font-medium">
                  3
                </button>
                <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition">
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorContent;