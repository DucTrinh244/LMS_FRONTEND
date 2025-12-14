import { Edit2 } from 'lucide-react';
import { useToast } from '~/shared/hooks/useToast';

const DashboardHeroInstructor = () => {
  const { toast } = useToast();

  const handleSuccessClick = () => {
    toast.success("Xóa thành công!");
  };

  const handleErrorClick = () => {
    toast.error("Có lỗi xảy ra khi xóa!");
  };
  return (
    <div className="max-w-8xl mx-auto px-4 -mt-6 mt-6">
      <div className="relative bg-gradient-to-r from-violet-900/50 via-purple-900/50 to-slate-900 rounded-2xl p-6 overflow-hidden shadow-md">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-32 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
                alt="Ronald Richard"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-violet-500/50"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-800" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-white">Ronald Richard</h2>
                <button className="text-slate-300 hover:text-violet-400">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-300">InStructor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/instructor/course/add"
              className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold border border-slate-700 hover:bg-violet-600/50 hover:shadow-violet-500/50 transition cursor-pointer inline-block text-center"
            >
              Add New Course
            </a>
            <a
              href="/student"
              className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-violet-500/50 transition cursor-pointer inline-block text-center"
            >
              Student Dashboard
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHeroInstructor;
