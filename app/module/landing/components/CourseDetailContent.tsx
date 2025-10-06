import {
  Award, BarChart3,
  BookOpen,
  CheckCircle,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Heart,
  Play,
  Share2,
  Smartphone,
  Star,
  Users,
  X
} from 'lucide-react';
import { useState } from 'react';

const CourseDetailContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);
  const [isVideoOpen, setIsVideoOpen] = useState(false);


  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const courseSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      lectures: 5
    },
    {
      id: 'the-brief',
      title: 'The Brief',
      lectures: 3
    },
    {
      id: 'wireframing',
      title: 'Wireframing Low Fidelity',
      lectures: 4
    },
    {
      id: 'type-color',
      title: 'Type, Color & Icon Introduction',
      lectures: 6
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
    <div className="bg-gradient-to-r from-violet-900/50 via-purple-900/50 to-slate-900 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              The Complete Web Developer Course 2.0
            </h1>
            <p className="text-slate-300 text-sm mb-3">
              Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python
            </p>
            
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                <BookOpen className="w-3 h-3 text-violet-400" />
                <span className="text-xs">12+ Lessons</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                <Clock className="w-3 h-3 text-violet-400" />
                <span className="text-xs">9hr 30min</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-700/50 px-2 py-1 rounded-lg">
                <Users className="w-3 h-3 text-violet-400" />
                <span className="text-xs">32 students enrolled</span>
              </div>
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-2 py-1 rounded-lg font-semibold text-xs">
                BEST SELLER
              </div>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                alt="Nicole Brown"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-white text-sm">Nicole Brown</p>
                <p className="text-xs text-slate-400">Instructor</p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                ))}
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                <span className="ml-1 font-semibold text-xs text-white">4.0 (15)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-xl p-2 shadow-md group">
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-violet-600/50 to-purple-600/50 p-4">
              <div className="flex items-center justify-center relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
                  alt="Course Preview"
                  className="rounded-lg w-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/20 transition"></div>
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition">
                    <Play className="w-5 h-5 text-violet-600 fill-violet-600 ml-1" />
                  </div>
                </button>
                <span className="absolute top-2 right-2 bg-violet-500 text-white font-semibold text-xs px-2 py-0.5 rounded-full">
                  2.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 w-full max-w-3xl mx-4 shadow-xl shadow-violet-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white">Course Demo</h3>
              <button
                onClick={() => setIsVideoOpen(false)}
                className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="relative aspect-video">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder video URL
                title="Course Demo Video"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md mb-6">
              <div className="border-b border-slate-700 px-5">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-3 font-semibold text-sm border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-violet-600 text-violet-400'
                      : 'border-transparent text-slate-300 hover:text-violet-400'
                  } transition`}
                >
                  Overview
                </button>
              </div>

              <div className="p-5">
                {/* Course Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Course Description</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">
                    Embark on a comprehensive journey into AI with Mike Wheeler, your guide to this Udemy Best Seller course on ChatGPT and Prompt Engineering. As an experienced instructor who has taught over 300,000 students, Mike unveils the secrets of developing your own custom GPTs, ensuring your skills shine in the next marketplace.
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This course will get you familiar with Generative AI and the effective use of ChatGPT and is perfect for the beginner. You will also learn advanced prompting techniques to take your Prompt Engineering skills to the next level.
                  </p>
                </div>

                {/* What you'll learn */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">What you'll learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Become a UX designer</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>You will be able to add UX designer to your CV</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Become a UI designer</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build & test a full website design</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build & test a full mobile app</span>
                    </li>
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You will need a copy of Adobe XD 2019 or above. A free trial can be downloaded from Adobe.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No previous design experience is needed.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-300 text-sm">
                      <div className="w-1.5 h-1.5 bg-violet-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No previous Adobe XD skills are needed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md mb-6">
              <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Course Content</h3>
                <div className="text-xs text-slate-400">
                  92 Lectures <span className="text-violet-400 ml-2">10:56:11</span>
                </div>
              </div>
              
              <div className="divide-y divide-slate-700">
                {courseSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-5 py-3 flex items-center justify-between hover:bg-slate-700 transition"
                    >
                      <span className="font-semibold text-white text-sm">{section.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-300 transition ${
                          expandedSections.includes(section.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSections.includes(section.id) && (
                      <div className="px-5 py-3 bg-slate-700/50">
                        <p className="text-xs text-slate-300">{section.lectures} lectures in this section</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* About Instructor */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md mb-6">
              <div className="p-5 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white">About the Instructor</h3>
              </div>
              
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="Nicole Brown"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white">Nicole Brown</h4>
                    <p className="text-slate-400 text-xs mb-2">UI/UX Designer</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="ml-2 text-xs font-semibold text-white">4.5</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white text-xs font-semibold mb-1">
                      <BookOpen className="w-4 h-4 text-violet-400" />
                      5 Courses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white text-xs font-semibold mb-1">
                      <Play className="w-4 h-4 text-violet-400" />
                      12+ Lessons
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white text-xs font-semibold mb-1">
                      <Clock className="w-4 h-4 text-violet-400" />
                      9hr 30min
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white text-xs font-semibold mb-1">
                      <Users className="w-4 h-4 text-violet-400" />
                      270,866
                    </div>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  UI/UX Designer, with 7+ Years Experience. Guarantee of High Quality Work.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  Skills: Web Design, UI Design, UX/UI, Mobile App Design, User Interface Design, Sketch, Photoshop, GUI, Html, Css, Grid Systems, Typography, Minimal, Template, English, Bootstrap, Responsive Web Design, Pixel Perfect, Graphic Design, Corporate, Creative, Flat, Luxury and much more.
                </p>

                <div className="mb-3">
                  <p className="font-semibold text-white text-sm mb-2">Available for:</p>
                  <ul className="space-y-1 text-slate-300 text-xs">
                    <li>• Full Time Office Work</li>
                    <li>• Remote Work</li>
                    <li>• Freelance</li>
                    <li>• Contract</li>
                    <li>• Worldwide</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Post Comment */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md">
              <div className="p-5 border-b border-slate-700">
                <h3 className="text-lg font-bold text-white">Post a Comment</h3>
              </div>
              
              <div className="p-5">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white mb-2">Comments</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-semibold text-sm"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md sticky top-24">
              <div className="p-5">
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-green-500">FREE</span>
                    <span className="text-slate-400 line-through text-sm">$99.00</span>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-semibold">50% off</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-4">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-violet-400 transition">
                    <Heart className="w-4 h-4" />
                    Add to Wishlist
                  </button>
                  <button className="flex items-center justify-center gap-2 px-3 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-violet-400 transition">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition font-semibold text-sm">
                  Enroll Now
                </button>

                {/* Includes */}
                <div className="my-4 border-t border-b border-slate-700 py-4">
                  <h4 className="font-bold text-white text-sm mb-3">Includes</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <Play className="w-4 h-4 text-violet-400" />
                      <span>11 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <Download className="w-4 h-4 text-violet-400" />
                      <span>69 downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <Clock className="w-4 h-4 text-violet-400" />
                      <span>Full Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <Smartphone className="w-4 h-4 text-violet-400" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span>Assignments</span>
                    </li>
                    <li className="flex items-center gap-2 text-slate-300 text-xs">
                      <Award className="w-4 h-4 text-violet-400" />
                      <span>Certificate of Completion</span>
                    </li>
                  </ul>
                </div>

                {/* Course Features */}
                <div>
                  <h4 className="font-bold text-white text-sm mb-3">Course Features</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <Users className="w-4 h-4 text-violet-400" />
                        Enrolled:
                      </span>
                      <span className="font-semibold text-white">32 students</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-violet-400" />
                        Duration:
                      </span>
                      <span className="font-semibold text-white">20 hours</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <BookOpen className="w-4 h-4 text-violet-400" />
                        Chapters:
                      </span>
                      <span className="font-semibold text-white">15</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <Play className="w-4 h-4 text-violet-400" />
                        Video:
                      </span>
                      <span className="font-semibold text-white">12 hours</span>
                    </li>
                    <li className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300">
                        <BarChart3 className="w-4 h-4 text-violet-400" />
                        Level:
                      </span>
                      <span className="font-semibold text-white">Beginner</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailContent;