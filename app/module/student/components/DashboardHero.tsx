import { Edit2 } from 'lucide-react';

const DashboardHero = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
            <span className="text-gray-400">➔</span>
            <span className="text-purple-600 font-medium">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Profile Banner */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-32 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                  alt="Ronald Richard"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-white"
                />
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-white">Ronald Richard</h2>
                  <button className="text-white/80 hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-blue-100">Student</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                Become an Instructor
              </button>
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
                Instructor Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
