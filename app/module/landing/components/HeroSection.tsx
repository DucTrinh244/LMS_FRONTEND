import React from 'react';
import { Search, Star, Heart, Video, Clock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-32 pb-24 px-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-violet-900/20 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
              <span className="text-violet-300 text-sm font-medium">The Leader in Online Learning</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
              Learn from the
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">
                Best Mentors
              </span>
              Worldwide
            </h1>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Access 10,000+ courses from industry experts. Build skills with interactive lessons and earn certificates.
            </p>

            {/* Search Bar */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="What do you want to learn today?"
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition font-medium">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-white mb-1">10K+</div>
                <div className="text-slate-400 text-sm">Active Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-slate-400 text-sm">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">2K+</div>
                <div className="text-slate-400 text-sm">Instructors</div>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl blur-3xl opacity-20" />
              
              <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-2 hover:border-violet-500/50 transition duration-300">
                <div className="relative rounded-2xl overflow-hidden group">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80" 
                    alt="Course" 
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2.5 rounded-full hover:bg-white transition">
                      <Heart className="w-4 h-4 text-rose-500" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-violet-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                      BESTSELLER
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Business
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      <span>4.9</span>
                      <span className="text-slate-500">(2.5k)</span>
                    </div>
                  </div>

                  <h3 className="text-white text-xl font-bold mb-3 leading-tight">
                    Complete Business Management Masterclass
                  </h3>

                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" 
                      alt="Instructor" 
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-violet-500/50"
                    />
                    <div>
                      <div className="text-white text-sm font-medium">Sarah Johnson</div>
                      <div className="text-slate-500 text-xs">Business Expert</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4" />
                      42 lessons
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      12h 30m
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <div>
                      <span className="text-2xl font-bold text-white">$89</span>
                      <span className="text-slate-500 text-sm line-through ml-2">$199</span>
                    </div>
                    <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-violet-500/50 transition font-medium text-sm">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;