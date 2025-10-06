import {
  BookOpen,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
  Users
} from 'lucide-react';

const InstructorProfile = () => {
  const certifications = [
    { id: 1, icon: '🎓', color: 'from-violet-600 to-purple-600' },
    { id: 2, icon: '🏆', color: 'from-violet-600 to-purple-600' },
    { id: 3, icon: '⭐', color: 'from-violet-600 to-purple-600' },
    { id: 4, icon: '🎖️', color: 'from-violet-600 to-purple-600' }
  ];

  const education = [
    {
      degree: 'BCA - Bachelor of Computer Applications',
      university: 'International University',
      period: '(2004 - 2010)'
    },
    {
      degree: 'MCA - Master of Computer Application',
      university: 'International University',
      period: '(2010 - 2012)'
    },
    {
      degree: 'Design Communication Visual',
      university: 'International University',
      period: '(2012-2015)'
    }
  ];

  const experience = [
    {
      title: 'Web Design & Development Team Leader',
      company: 'Creative Agency',
      period: '(2013 - 2016)'
    },
    {
      title: 'Project Manager',
      company: 'CJobocy Technology Pvt.Ltd',
      period: '(Present)'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Build Responsive Real World Websites w...',
      instructor: 'Christy',
      category: 'Programming',
      rating: 4.2,
      reviews: 220,
      price: 200,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80'
    },
    {
      id: 2,
      title: 'Wordpress for Beginners - Master Word...',
      instructor: 'Ana Reyes',
      category: 'Wordpress',
      rating: 4.4,
      reviews: 160,
      price: 140,
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-violet-900/50 to-slate-900 p-5">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Profile Image */}
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                      alt="Rolands Granger"
                      className="w-28 h-28 rounded-xl object-cover shadow-md"
                    />
                    <button className="absolute top-2 left-2 w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Heart className="w-4 h-4 text-violet-400" />
                    </button>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1">
                    <h1 className="text-xl font-bold text-white mb-2">
                      Rolands Granger
                    </h1>
                    <p className="text-slate-300 text-xs mb-2">Developer</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-sm text-white">4.9</span>
                      <span className="text-slate-400 text-xs">(200 Reviews)</span>
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed mb-3">
                      I am a web developer with a vast array of knowledge in many different front end and back end languages, responsive frameworks, databases, and best code practices.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-xs">
                        <BookOpen className="w-4 h-4 text-violet-400" />
                        <span className="font-semibold text-slate-300">12+ Lessons</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Users className="w-4 h-4 text-violet-400" />
                        <span className="font-semibold text-slate-300">50 Students</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex md:flex-col gap-2">
                    <a href="#" className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Facebook className="w-4 h-4 text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Instagram className="w-4 h-4 text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Twitter className="w-4 h-4 text-white" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                      <Linkedin className="w-4 h-4 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
              <h2 className="text-lg font-bold text-white mb-3">About Me</h2>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. Even if the client is being careless. Some quick example text to build on the card title and bulk the card's content Moltin gives you platform.
              </p>
              <button className="text-violet-400 hover:text-violet-300 font-semibold text-xs transition">
                Read More
              </button>
            </div>

            {/* Education */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
              <h2 className="text-lg font-bold text-white mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{edu.degree}</h3>
                      <p className="text-slate-300 text-xs">
                        {edu.university} - {edu.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
              <h2 className="text-lg font-bold text-white mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{exp.title}</h3>
                      <p className="text-slate-300 text-xs">
                        {exp.company} - {exp.period}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Courses</h2>
                <div className="flex gap-2">
                  <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition">
                    <ChevronLeft className="w-4 h-4 text-slate-300" />
                  </button>
                  <button className="w-8 h-8 border border-slate-600 rounded-lg flex items-center justify-center hover:bg-violet-600/50 transition">
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-violet-500/50 transition group">
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
                      />
                      <button className="absolute top-2 right-2 w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition shadow-md">
                        <Heart className="w-4 h-4 text-violet-400" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
                            alt={course.instructor}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-medium text-slate-300">{course.instructor}</span>
                        </div>
                        <span className="bg-violet-600/20 text-violet-400 text-xs font-semibold px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-sm mb-2 line-clamp-2 group-hover:text-violet-400 transition">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-xs text-white">{course.rating}</span>
                        <span className="text-slate-400 text-xs">({course.reviews} Reviews)</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                        <span className="text-lg font-bold text-violet-400">${course.price}</span>
                        <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-xs flex items-center gap-1">
                          View Course
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Certifications */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 sticky top-8">
              <h3 className="text-lg font-bold text-white mb-4">Certifications</h3>
              <div className="grid grid-cols-4 gap-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={`w-10 h-10 bg-gradient-to-br ${cert.color} rounded-lg flex items-center justify-center text-2xl hover:scale-105 transition shadow-md cursor-pointer`}
                  >
                    {cert.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5">
              <h3 className="text-lg font-bold text-white mb-4">Contact Details</h3>
              <div className="space-y-3">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Email</h4>
                    <p className="text-slate-300 text-xs break-all">jennywilson@example.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Address</h4>
                    <p className="text-slate-300 text-xs">827 Kerry Street, Huntsville, Alabama</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm mb-1">Phone</h4>
                    <p className="text-slate-300 text-xs">+1(452) 125-6789</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;