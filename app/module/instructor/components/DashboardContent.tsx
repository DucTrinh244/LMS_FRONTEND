import {
  BookMarked,
  BookOpen,
  Calendar,
  Check,
  GraduationCap,
  Users,
  Wallet
} from 'lucide-react';

// Placeholder components for each menu item
const DashboardContent = () => {
  const statsCards = [
    { 
      icon: <GraduationCap className="w-5 h-5 text-violet-600" />, 
      title: 'Enrolled Courses', 
      value: '12', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    },
    { 
      icon: <BookMarked className="w-5 h-5 text-violet-600" />, 
      title: 'Active Courses', 
      value: '08', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    },
    { 
      icon: <Check className="w-5 h-5 text-violet-600" />, 
      title: 'Completed Courses', 
      value: '06', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    },
    { 
      icon: <Users className="w-5 h-5 text-violet-600" />, 
      title: 'Total Students', 
      value: '17', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    },
    { 
      icon: <BookOpen className="w-5 h-5 text-violet-600" />, 
      title: 'Total Courses', 
      value: '11', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    },
    { 
      icon: <Wallet className="w-5 h-5 text-violet-600" />, 
      title: 'Total Earnings', 
      value: '$486', 
      bgColor: 'from-violet-600 to-purple-600',
      iconBg: 'bg-violet-600/20'
    }
  ];

  const courses = [
    {
      id: 1,
      title: 'Complete HTML, CSS and Javascript Course',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80',
      enrolled: 0,
      status: 'Published'
    },
    {
      id: 2,
      title: 'Complete Course on Fullstack Web Developer',
      image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&q=80',
      enrolled: 2,
      status: 'Published'
    },
    {
      id: 3,
      title: 'Data Science Fundamentals and Advanced Bootcamp',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80',
      enrolled: 2,
      status: 'Published'
    },
    {
      id: 4,
      title: 'Master Microservices with Spring Boot and Spring Cloud',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&q=80',
      enrolled: 1,
      status: 'Published'
    },
    {
      id: 5,
      title: 'Information About UI/UX Design Degree',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=200&q=80',
      enrolled: 0,
      status: 'Published'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <div key={index} className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 hover:shadow-xl hover:shadow-violet-500/50 transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                {card.icon}
              </div>
            </div>
            <h3 className="text-slate-300 text-xs mb-2">{card.title}</h3>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Earnings by Year */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Earnings by Year</h2>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="dd/mm/yyyy - dd/mm/yyyy"
              className="px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-xs"
            />
          </div>
        </div>
        <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
          <p className="text-slate-400">Chart Area</p>
        </div>
      </div>

      {/* Recently Created Courses */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
        <h2 className="text-lg font-bold text-white mb-4">Recently Created Courses</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Courses</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Enrolled</th>
                <th className="text-left py-3 px-4 text-xs font-bold text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-medium text-white">{course.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-300">{course.enrolled}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-violet-600/20 text-violet-400 px-2 py-1 rounded-full text-xs font-semibold">
                      {course.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent ;

