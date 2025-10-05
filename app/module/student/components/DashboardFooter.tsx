import { Mail, MapPin, Phone } from 'lucide-react';

const DashboardFooter = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-16 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                  <div className="w-6 h-6 bg-white rounded" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Dreams
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Platform designed for organizations, educators, and learners manage, deliver, and track learning and training activities.
              </p>
              <div className="flex gap-3">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-10"
                />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10"
                />
              </div>
            </div>

            {/* For Instructor */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">For Instructor</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Search Mentors</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Login</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Register</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Booking</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Students Dashboard</a></li>
              </ul>
            </div>

            {/* For Student */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">For Student</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Appointments</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Chat</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Login</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Register</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600 transition">Instructor Dashboard</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-gray-900 font-bold mb-6">Newsletter</h4>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-3"
                />
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                  Subscribe
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>3556 Beech Street, San Francisco, California, CA 94108</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>[email protected]</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  <span>+19 123-456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="bg-purple-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-200 text-sm">
            Copyright © 2025 DreamsLMS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-purple-200 hover:text-white transition text-sm">Terms & Conditions</a>
            <a href="#" className="text-purple-200 hover:text-white transition text-sm">Privacy Policy</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardFooter;