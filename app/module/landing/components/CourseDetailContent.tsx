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
  Users
} from 'lucide-react';
import { useState } from 'react';

const CourseDetailContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

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
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                The Complete Web Developer Course 2.0
              </h1>
              <p className="text-slate-300 text-lg mb-6">
                Learn Web Development by building 25 websites and mobile apps using HTML, CSS, Javascript, PHP, Python
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">12+ Lesson</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">9hr 30min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">32 students enrolled</span>
                </div>
                <div className="bg-amber-500 text-white px-4 py-1.5 rounded-lg font-semibold text-sm">
                  BEST SELLER
                </div>
              </div>

              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                  alt="Nicole Brown"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">Nicole Brown</p>
                  <p className="text-sm text-slate-400">Instructor</p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                  <span className="ml-2 font-semibold">4.0 (15)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-2 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 p-8">
                <div className="flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
                    alt="Course Preview"
                    className="rounded-xl"
                  />
                  <button className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition">
                      <Play className="w-8 h-8 text-violet-600 fill-violet-600 ml-1" />
                    </div>
                  </button>
                  <span className="absolute top-4 right-4 bg-cyan-400 text-white font-bold text-lg px-3 py-1 rounded-full">
                    2.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm mb-6">
              <div className="border-b px-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-4 font-semibold border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-violet-600 text-violet-600'
                      : 'border-transparent text-slate-600'
                  }`}
                >
                  Overview
                </button>
              </div>

              <div className="p-6">
                {/* Course Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Course Description</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Embark on a comprehensive journey into AI with Mlke Wheeler, your guide to this Udemy Best Seller course on ChatGPT and Prompt Engineering. As an experienced instructor who has taught over 300,000 students, Mike unveils the secrets of developing your own custom GPTs, ensuring your skills shine in the next marketplace.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    This course will get you familiar with Generative AI and the effective use of ChatGPT and is perfect for the beginner. You will also learn advanced prompting techniques to take your Prompt Engineering skills to the next level.
                  </p>
                </div>

                {/* What you'll learn */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">What you'll learn</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Become a UX designer</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>You will be able to add UX designer to your CV</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Become a UI designer</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build & test a full website design</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Build & test a full mobile app</span>
                    </li>
                  </ul>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>You will need a copy of Adobe XD 2019 or above. A free trial can be downloaded from Adobe.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No previous design experience is needed.</span>
                    </li>
                    <li className="flex items-start gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>No previous Adobe XD skills are needed.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-2xl shadow-sm mb-6">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Course Content</h3>
                <div className="text-sm text-slate-600">
                  92 Lectures <span className="text-rose-500 ml-2">10:56:11</span>
                </div>
              </div>
              
              <div className="divide-y">
                {courseSections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <span className="font-semibold text-slate-900">{section.title}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-600 transition ${
                          expandedSections.includes(section.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedSections.includes(section.id) && (
                      <div className="px-6 py-4 bg-slate-50">
                        <p className="text-sm text-slate-600">{section.lectures} lectures in this section</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* About Instructor */}
            <div className="bg-white rounded-2xl shadow-sm mb-6">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-slate-900">About the instructor</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                    alt="Nicole Brown"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900">Nicole Brown</h4>
                    <p className="text-slate-600 text-sm mb-3">UI/UX Designer</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="ml-2 text-sm font-semibold">4.5</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-900 font-semibold mb-1">
                      <BookOpen className="w-4 h-4 text-orange-500" />
                      5Courses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-900 font-semibold mb-1">
                      <Play className="w-4 h-4 text-rose-500" />
                      12+ Lesson
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-900 font-semibold mb-1">
                      <Clock className="w-4 h-4 text-violet-500" />
                      9hr 30min
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-slate-900 font-semibold mb-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      270,866
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed mb-4">
                  UI/UX Designer, with 7+ Years Experience. Guarantee of High Quality Work.
                </p>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Skills: Web Design, UI Design, UX/UI, Mobile App Design, User Interface Design, Sketch, Photoshop, GUI, Html, Css, Grid Systems, Typography, Minimal, Template, English, Bootstrap, Responsive Web Design, Pixel Perfect, Graphic Design, Corporate, Creative, Flat, Luxury and much more.
                </p>

                <div className="mb-4">
                  <p className="font-semibold text-slate-900 mb-2">Available for:</p>
                  <ul className="space-y-1 text-slate-600 text-sm">
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
            <div className="bg-white rounded-2xl shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold text-slate-900">Post A comment</h3>
              </div>
              
              <div className="p-6">
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Comments</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition font-semibold"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm sticky top-24">
              <div className="p-6">
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-bold text-green-500">FREE</span>
                    <span className="text-slate-400 line-through text-lg">$99.00</span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm font-semibold">50% off</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <Heart className="w-5 h-5" />
                    Add to Wishlist
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>

                <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition font-semibold text-lg mb-6">
                  Enroll Now
                </button>

                {/* Includes */}
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 mb-4">Includes</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-slate-600">
                      <Play className="w-5 h-5 text-rose-500" />
                      <span className="text-sm">11 hours on-demand video</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <Download className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">69 downloadable resources</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <Clock className="w-5 h-5 text-violet-500" />
                      <span className="text-sm">Full Lifetime access</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <Smartphone className="w-5 h-5 text-blue-500" />
                      <span className="text-sm">Access on mobile and TV</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <FileText className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Assignments</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-600">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span className="text-sm">Certificate of Completion</span>
                    </li>
                  </ul>
                </div>

                {/* Course Features */}
                <div className="border-t pt-6">
                  <h4 className="font-bold text-slate-900 mb-4">Course Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4" />
                        Enrolled:
                      </span>
                      <span className="font-semibold text-slate-900">32 students</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        Duration:
                      </span>
                      <span className="font-semibold text-slate-900">20 hours</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <BookOpen className="w-4 h-4" />
                        Chapters:
                      </span>
                      <span className="font-semibold text-slate-900">15</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <Play className="w-4 h-4" />
                        Video:
                      </span>
                      <span className="font-semibold text-slate-900">12 hours</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 text-slate-600">
                        <BarChart3 className="w-4 h-4" />
                        Level:
                      </span>
                      <span className="font-semibold text-slate-900">Beginner</span>
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