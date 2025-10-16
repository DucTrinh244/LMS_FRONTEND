import { Edit, Trash2 } from "lucide-react";

const CoursesContent: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses</h2>
      <p className="text-gray-600 mb-6">Manage all courses available on the platform.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example course card */}
        <div className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80"
            alt="Course"
            className="w-full h-40 rounded-lg object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-900">Complete Web Development</h3>
          <p className="text-sm text-gray-600 mb-2">Instructor: Sarah Wilson</p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-purple-600">$149</span>
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1.5 hover:bg-red-50 rounded-lg transition">
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        </div>
        {/* Add more course cards as needed */}
      </div>
    </div>
  );
};
export default CoursesContent;