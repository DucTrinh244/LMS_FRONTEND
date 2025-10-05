import { Bell, MapPin, Phone, ShoppingCart } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>1442 Crosswind Drive Madisonville</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1 45887 77874</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent border-none text-white focus:outline-none">
              <option>ENG</option>
              <option>VIE</option>
            </select>
            <select className="bg-transparent border-none text-white focus:outline-none">
              <option>USD</option>
              <option>VND</option>
            </select>
            <div className="flex items-center gap-2">
              {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social, i) => (
                <a key={i} href="#" className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dreams
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a href="#home" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition font-medium">
              Home
            </a>
            <a href="#courses" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition font-medium">
              Courses
            </a>
            <a href="#dashboard" className="px-4 py-2 text-purple-600 font-medium border-b-2 border-purple-600">
              Dashboard
            </a>
            <a href="#pages" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition font-medium">
              Pages
            </a>
            <a href="#blog" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition font-medium">
              Blog
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                1
              </span>
            </button>
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;