import {
  BookOpen,
  CheckCircle,
  ChevronDown, ChevronUp,
  Clock,
  FileText,
  Play,
  Trash2,
  Users
} from 'lucide-react';
import { useState } from 'react';

const CourseCurriculum = () => {
  const [expandedSections, setExpandedSections] = useState([0]);

  const courses = [
    {
      id: 1,
      title: 'The Complete Web Developer Course 2.0',
      description: 'Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
      lessons: 12,
      duration: '9hr 30min',
      students: 32,
      level: 'Web Development'
    },
    {
      id: 2,
      title: 'Sketch from A to Z (2024): Become an app designer',
      description: 'Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      lessons: 12,
      duration: '9hr 30min',
      students: 32,
      level: 'Web Development'
    }
  ];

  const curriculumSections = [
    {
      title: 'Introduction of Digital Marketing',
      lectures: 3,
      progress: 50,
      lessons: [
        {
          title: 'Introduction',
          duration: '2m 10s',
          completed: true,
          hasNote: true,
          subLessons: [
            { title: 'Describe SEO Engine', duration: '5:20', completed: true },
            { title: 'Know about all marketing', duration: '5:20', completed: true }
          ]
        },
        {
          title: 'What is Digital Marketing What is Digital Marketing',
          duration: '2m 10s',
          completed: true,
          hasNote: true
        },
        {
          title: 'Type of Digital Marketing',
          duration: '18m 10s',
          completed: false
        }
      ]
    },
    {
      title: 'Introduction of Digital Marketing',
      lectures: 3,
      progress: 0,
      lessons: []
    }
  ];

  const toggleSection = (index: number) => {
    setExpandedSections(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        {courses.map((course, courseIndex) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Course Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <img 
                    src={course.image}
                    alt={course.title}
                    className="w-full md:w-48 h-40 object-cover rounded-xl shadow-md"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-pink-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{course.lessons}+ Lesson</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{course.students} students enrolled</span>
                    </div>
                    <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full">
                      {course.level}
                    </span>
                  </div>

                  {/* Resume Button */}
                  <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all inline-flex items-center gap-2">
                    <Play className="w-4 h-4 fill-current" />
                    Resume Course
                  </button>
                </div>
              </div>
            </div>

            {/* Course Curriculum */}
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Course Curriculum</h3>

              <div className="space-y-4">
                {curriculumSections.map((section, sectionIndex) => {
                  const isExpanded = expandedSections.includes(sectionIndex + (courseIndex * 2));
                  
                  return (
                    <div key={sectionIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(sectionIndex + (courseIndex * 2))}
                        className="w-full bg-gray-50 px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">
                              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </span>
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-gray-900">{section.title}</h4>
                            <p className="text-sm text-gray-500">No of Lectures : {section.lectures}</p>
                          </div>
                        </div>
                      </button>

                      {/* Section Content */}
                      {isExpanded && section.lessons.length > 0 && (
                        <div className="p-6 space-y-4">
                          {/* Progress Bar */}
                          <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600">1/{section.lectures} Completed</span>
                              <span className="text-sm font-bold text-gray-900">{section.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-pink-500 to-red-500 h-2 rounded-full transition-all"
                                style={{ width: `${section.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Lessons */}
                          {section.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="space-y-3">
                              {/* Main Lesson */}
                              <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    lesson.completed 
                                      ? 'bg-green-500' 
                                      : 'bg-indigo-600'
                                  }`}>
                                    {lesson.completed ? (
                                      <CheckCircle className="w-4 h-4 text-white" />
                                    ) : (
                                      <Play className="w-3 h-3 text-white fill-current" />
                                    )}
                                  </div>
                                  <span className="font-semibold text-gray-900 flex-1">{lesson.title}</span>
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              {lesson.hasNote && (
                                <div className="flex items-center gap-2 pl-9">
                                  <button className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Note
                                  </button>
                                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all inline-flex items-center gap-2">
                                    <Play className="w-4 h-4 fill-current" />
                                    Play Again
                                  </button>
                                </div>
                              )}

                              {/* Sub Lessons */}
                              {lesson.subLessons && lesson.subLessons.map((subLesson, subIndex) => (
                                <div key={subIndex} className="pl-9 flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded">
                                      5:20
                                    </div>
                                    <span className="text-sm text-gray-700">{subLesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                                      {subLesson.completed ? (
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                      ) : (
                                        <Play className="w-4 h-4 text-gray-600" />
                                      )}
                                    </button>
                                    <button className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition">
                                      <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculum;