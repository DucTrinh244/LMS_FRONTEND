import { BookOpen, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2.5 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">Dreams</span>
                <span className="text-xs text-violet-400 block -mt-0.5">Learning Platform</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Empowering learners worldwide with quality education and expert mentorship.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-violet-600 transition">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="text-slate-400 hover:text-violet-400 transition text-sm">About Us</a></li>
              <li><a href="#courses" className="text-slate-400 hover:text-violet-400 transition text-sm">Browse Courses</a></li>
              <li><a href="#instructors" className="text-slate-400 hover:text-violet-400 transition text-sm">Become Instructor</a></li>
              <li><a href="#pricing" className="text-slate-400 hover:text-violet-400 transition text-sm">Pricing Plans</a></li>
              <li><a href="#blog" className="text-slate-400 hover:text-violet-400 transition text-sm">Blog & News</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#help" className="text-slate-400 hover:text-violet-400 transition text-sm">Help Center</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-violet-400 transition text-sm">FAQs</a></li>
              <li><a href="#terms" className="text-slate-400 hover:text-violet-400 transition text-sm">Terms of Service</a></li>
              <li><a href="#privacy" className="text-slate-400 hover:text-violet-400 transition text-sm">Privacy Policy</a></li>
              <li><a href="#contact" className="text-slate-400 hover:text-violet-400 transition text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Subscribe to get the latest courses and updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
              />
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2.5 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2025 Dreams LMS. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#terms" className="text-slate-500 hover:text-violet-400 transition text-sm">Terms</a>
            <a href="#privacy" className="text-slate-500 hover:text-violet-400 transition text-sm">Privacy</a>
            <a href="#cookies" className="text-slate-500 hover:text-violet-400 transition text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;