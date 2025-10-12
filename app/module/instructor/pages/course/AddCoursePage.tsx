import {
  ArrowLeft,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  Image,
  Plus,
  Save,
  Star,
  Tag,
  Users,
  Video,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const AddCoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [courseType, setCourseType] = useState('paid');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [curriculum, setCurriculum] = useState([
    {
      id: 1,
      title: 'Introduction',
      lessons: [
        { id: 1, title: 'Welcome to the Course', duration: '5:30' },
        { id: 2, title: 'Course Overview', duration: '10:45' }
      ]
    }
  ]);

  const categories = [
    'Development', 'Business', 'Design', 'Marketing',
    'Photography', 'Music', 'Health & Fitness', 'Teaching'
  ];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Calculate total duration in seconds
  const calculateTotalDuration = () => {
    let totalSeconds = 0;
    curriculum.forEach(section => {
      section.lessons.forEach(lesson => {
        const [minutes, seconds] = lesson.duration.split(':').map(Number);
        totalSeconds += (minutes * 60) + seconds;
      });
    });
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const addSection = () => {
    const newSectionTitle = `New Section ${curriculum.length + 1}`;
    setCurriculum([...curriculum, {
      id: Date.now(),
      title: newSectionTitle,
      lessons: []
    }]);
  };

  const addLesson = (sectionId: number) => {
    setCurriculum(curriculum.map(section =>
      section.id === sectionId
        ? { ...section, lessons: [...section.lessons, { id: Date.now(), title: 'New Lesson', duration: '0:00' }] }
        : section
    ));
  };

  const removeSection = (sectionId: number) => {
    setCurriculum(curriculum.filter(section => section.id !== sectionId));
  };

  const removeLesson = (sectionId: number, lessonId: number) => {
    setCurriculum(curriculum.map(section =>
      section.id === sectionId
        ? { ...section, lessons: section.lessons.filter(lesson => lesson.id !== lessonId) }
        : section
    ));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!courseTitle.trim()) newErrors.title = 'Course Title is required';
    if (!courseDescription.trim()) newErrors.description = 'Course Description is required';
    if (!selectedCategory) newErrors.category = 'Category is required';
    if (!selectedLevel) newErrors.level = 'Level is required';
    if (courseType === 'paid' && !price.trim()) newErrors.price = 'Price is required for paid courses';
    curriculum.forEach((section, index) => {
      if (!section.title.trim()) {
        newErrors[`section_${index}`] = `Section ${index + 1} title is required`;
      }
      section.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.title.trim()) {
          newErrors[`lesson_${index}_${lessonIndex}`] = `Lesson ${lessonIndex + 1} title in Section ${index + 1} is required`;
        }
        if (!/^\d+:\d{2}$/.test(lesson.duration)) {
          newErrors[`duration_${index}_${lessonIndex}`] = `Invalid duration format in Section ${index + 1}, Lesson ${lessonIndex + 1} (use MM:SS)`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validateForm()) {
      console.log('Publishing course:', {
        title: courseTitle,
        description: courseDescription,
        category: selectedCategory,
        level: selectedLevel,
        courseType,
        price: courseType === 'paid' ? price : '0',
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        curriculum
      });
      // TODO: Implement publish API call
    } else {
      console.log('Validation errors:', errors);
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving as draft:', {
      title: courseTitle,
      description: courseDescription,
      category: selectedCategory,
      level: selectedLevel,
      courseType,
      price: courseType === 'paid' ? price : '0',
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      curriculum
    });
    // TODO: Implement save draft API call
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/courses"
            className="flex items-center gap-2 text-slate-400 hover:text-violet-400 font-semibold mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-bold text-white mb-2">Add New Course</h1>
              <p className="text-sm text-slate-400">Create a new course and start teaching</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-6 py-2 border border-slate-700 text-slate-200 rounded-lg font-semibold hover:bg-slate-700/50 hover:border-violet-500 transition"
              >
                Save as Draft
              </button>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Publish Course
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 sm:p-8">
              <h2 className="text-base font-bold text-white mb-6">Basic Information</h2>
              
              {/* Course Title */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-white mb-2">
                  Course Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter course title"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Course Description */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-white mb-2">
                  Course Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter course description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 resize-none"
                />
                {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
              </div>

              {/* Category & Level */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    {errors.category && <p className="text-red-400 text-xs mt-1">{errors.category}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Level <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedLevel}
                      onChange={(e) => setSelectedLevel(e.target.value)}
                      className="w-full appearance-none px-4 py-3 pr-10 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white"
                    >
                      <option value="">Select Level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    {errors.level && <p className="text-red-400 text-xs mt-1">{errors.level}</p>}
                  </div>
                </div>
              </div>

              {/* Course Image */}
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Course Thumbnail <span className="text-red-400">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-violet-500 transition cursor-pointer bg-slate-800/50">
                  <Image className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-200 font-semibold mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-400">PNG, JPG or JPEG (max. 2MB)</p>
                </div>
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-white">Course Curriculum</h2>
                <button
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-violet-500/50 transition"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>

              <div className="space-y-4">
                {curriculum.map((section, sectionIndex) => (
                  <div key={section.id} className="border border-slate-600 rounded-lg overflow-hidden">
                    {/* Section Header */}
                    <div className="bg-slate-700/50 p-4 flex items-center gap-4">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => {
                          const newCurriculum = [...curriculum];
                          newCurriculum[sectionIndex].title = e.target.value;
                          setCurriculum(newCurriculum);
                        }}
                        className="flex-1 px-4 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 font-semibold"
                        placeholder="Section Title"
                      />
                      <button
                        onClick={() => addLesson(section.id)}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition font-medium text-sm text-slate-200"
                      >
                        <Plus className="w-4 h-4" />
                        Add Lesson
                      </button>
                      <button
                        onClick={() => removeSection(section.id)}
                        className="p-2 text-red-400 hover:bg-red-600/50 rounded-lg transition"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    {errors[`section_${sectionIndex}`] && (
                      <p className="text-red-400 text-xs px-4 pt-2">{errors[`section_${sectionIndex}`]}</p>
                    )}

                    {/* Lessons */}
                    <div className="p-4 space-y-2">
                      {section.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                          <Video className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => {
                              const newCurriculum = [...curriculum];
                              newCurriculum[sectionIndex].lessons[lessonIndex].title = e.target.value;
                              setCurriculum(newCurriculum);
                            }}
                            className="flex-1 px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 text-sm"
                            placeholder="Lesson Title"
                          />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => {
                              const newCurriculum = [...curriculum];
                              newCurriculum[sectionIndex].lessons[lessonIndex].duration = e.target.value;
                              setCurriculum(newCurriculum);
                            }}
                            className="w-24 px-3 py-2 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 text-sm"
                            placeholder="MM:SS"
                          />
                          <button
                            onClick={() => removeLesson(section.id, lesson.id)}
                            className="p-2 text-red-400 hover:bg-red-600/50 rounded-lg transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {section.lessons.map((_, lessonIndex) => (
                        <div key={lessonIndex} className="px-4">
                          {errors[`lesson_${sectionIndex}_${lessonIndex}`] && (
                            <p className="text-red-400 text-xs">{errors[`lesson_${sectionIndex}_${lessonIndex}`]}</p>
                          )}
                          {errors[`duration_${sectionIndex}_${lessonIndex}`] && (
                            <p className="text-red-400 text-xs">{errors[`duration_${sectionIndex}_${lessonIndex}`]}</p>
                          )}
                        </div>
                      ))}
                      {section.lessons.length === 0 && (
                        <p className="text-center text-slate-400 py-4 text-sm">No lessons yet. Click "Add Lesson" to start.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements & What You'll Learn */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 sm:p-8">
              <h2 className="text-base font-bold text-white mb-6">Additional Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-bold text-white mb-2">
                  What You'll Learn
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter learning objectives (one per line)"
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Requirements
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter course requirements (one per line)"
                  className="w-full px-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pricing */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6 sticky top-24">
              <h3 className="text-base font-bold text-white mb-4">Pricing</h3>
              
              {/* Course Type */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-white mb-3">
                  Course Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-700/50 transition">
                    <input
                      type="radio"
                      name="courseType"
                      value="free"
                      checked={courseType === 'free'}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-4 h-4 text-violet-500 border-slate-600 focus:ring-violet-500"
                    />
                    <span className="font-semibold text-slate-200">Free Course</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 border-2 ${courseType === 'paid' ? 'border-violet-500 bg-violet-500/20' : 'border-slate-700'} rounded-lg cursor-pointer hover:bg-slate-700/50 transition`}>
                    <input
                      type="radio"
                      name="courseType"
                      value="paid"
                      checked={courseType === 'paid'}
                      onChange={(e) => setCourseType(e.target.value)}
                      className="w-4 h-4 text-violet-500 border-slate-600 focus:ring-violet-500"
                    />
                    <span className="font-semibold text-slate-200">Paid Course</span>
                  </label>
                </div>
              </div>

              {/* Price Input */}
              {courseType === 'paid' && (
                <div className="mb-6">
                  <label className="block text-sm font-bold text-white mb-2">
                    Price (USD) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500"
                    />
                    {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
                  </div>
                </div>
              )}

              {/* Course Stats Preview */}
              <div className="pt-6 border-t border-slate-600">
                <h4 className="text-sm font-bold text-white mb-4">Course Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Total Students
                    </span>
                    <span className="font-semibold text-white">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Total Duration
                    </span>
                    <span className="font-semibold text-white">{calculateTotalDuration()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Total Lessons
                    </span>
                    <span className="font-semibold text-white">{curriculum.reduce((acc, section) => acc + section.lessons.length, 0)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating
                    </span>
                    <span className="font-semibold text-white">No ratings yet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-md p-6">
              <h3 className="text-base font-bold text-white mb-4">Tags</h3>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Add tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-900 text-white placeholder-slate-500"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Example: javascript, react, web development
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoursePage;