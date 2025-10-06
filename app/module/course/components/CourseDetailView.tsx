import {
  ArrowLeft,
  CheckCircle, ChevronDown, ChevronUp, Clock,
  Play
} from 'lucide-react';
import { useState } from 'react';

const CourseDetailView = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [expandedSections, setExpandedSections] = useState([0]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const tabs = ['Overview', 'Notes', 'FAQ'];

  const courseSections = [
    {
      title: 'Html Introduction',
      sectionNumber: 1,
      lessons: [
        { title: 'Introduction', duration: '2m 10s', completed: true },
        { title: 'What is HTML', duration: '2m 10s', completed: true },
        { title: 'What is a Web page?', duration: '2m 10s', completed: true }
      ]
    },
    {
      title: 'Your First webpage',
      sectionNumber: 2,
      lessons: []
    },
    {
      title: 'Your First webpage',
      sectionNumber: 3,
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

  const learningPoints = [
    'Setting up the environment',
    'Advanced HTML Practices',
    'Build a portfolio website',
    'Responsive Designs',
    'Understand HTML Programming',
    'Code HTML',
    'Start building beautiful websites'
  ];

  const requirements = [
    'Any computer will work: Windows, macOS or Linux',
    'Basic programming HTML and CSS.',
    'Basic/Minimal understanding of JavaScript'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* Back Button */}
              <button className="flex items-center gap-2 text-pink-600 hover:text-pink-700 font-semibold mb-6 transition">
                <ArrowLeft className="w-4 h-4" />
                Back to Course
              </button>

              {/* Course Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Learn Responsive Web Design Essentials
              </h1>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-green-600">46% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '46%' }} />
                </div>
              </div>

              {/* Last Activity */}
              <p className="text-sm text-gray-500 mb-6">
                Last activity on April 20, 2025
              </p>

              {/* Course Sections */}
              <div className="space-y-3">
                {courseSections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full bg-gray-50 px-4 py-3 flex items-center justify-between hover:bg-gray-100 transition"
                    >
                      <div className="text-left">
                        <p className="text-xs text-gray-500 mb-1">Section {section.sectionNumber}</p>
                        <h3 className="font-bold text-gray-900 text-sm">{section.title}</h3>
                      </div>
                      {expandedSections.includes(index) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {/* Section Content */}
                    {expandedSections.includes(index) && section.lessons.length > 0 && (
                      <div className="p-4 space-y-2 bg-white">
                        {section.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                                lesson.completed ? 'bg-green-500' : 'bg-gray-300'
                              }`}>
                                {lesson.completed && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm font-medium text-gray-700">
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Video & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
                  alt="Course Video"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition shadow-2xl group">
                    <Play className="w-10 h-10 text-gray-900 ml-1 group-hover:scale-110 transition" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 py-4 font-semibold transition ${
                      activeTab === tab
                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'Overview' && (
                  <div className="space-y-8">
                    {/* About This Course */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        About this course
                      </h2>
                      <p className="text-gray-600">
                        Learn Web Development Without Writing Much Code
                      </p>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Description
                      </h3>
                      <div className="text-gray-600 leading-relaxed space-y-4">
                        <p>
                          Embark on a transformative journey into AI with Mike Wheeler, your guide in this Udemy Best Seller course on ChatGPT and Prompt Engineering. As an experience instructor who has taught well over 300,000 students, Mike unveils the secrets of developing your own custom GPTs, ensuring your skills shine in the thriving digital marketplace.
                        </p>
                        
                        {showFullDescription && (
                          <p>
                            This course will get your familiar with Generative AI and the effective use of ChatGPT and is perfect for the beginner. You will also learn advanced prompting techniques to take your Prompt Engineering skills to the next level!
                          </p>
                        )}
                        
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-pink-600 hover:text-pink-700 font-semibold transition"
                        >
                          {showFullDescription ? 'Show less' : 'Readmore'}
                        </button>
                      </div>
                    </div>

                    {/* What You'll Learn */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        What You'll Learn
                      </h3>
                      <ul className="space-y-3">
                        {learningPoints.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0 mt-2" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'Notes' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No notes yet</h3>
                    <p className="text-gray-600">Start taking notes to remember important points</p>
                  </div>
                )}

                {activeTab === 'FAQ' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No FAQs available</h3>
                    <p className="text-gray-600">Check back later for frequently asked questions</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailView;