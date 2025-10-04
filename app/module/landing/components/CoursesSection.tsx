import React from 'react';
import { Star, Heart, Video, Clock, Users } from 'lucide-react';

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp 2024',
      instructor: 'John Smith',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      category: 'Development',
      rating: 4.9,
      reviews: 1250,
      students: 5400,
      price: 149,
      originalPrice: 299,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
      lessons: 68,
      duration: '24h 15m',
      level: 'All Levels'
    },
    {
      id: 2,
      title: 'UI/UX Design Masterclass with Figma',
      instructor: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      category: 'Design',
      rating: 5.0,
      reviews: 890,
      students: 3200,
      price: 129,
      originalPrice: 249,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
      lessons: 52,
      duration: '18h 30m',
      level: 'Intermediate'
    },
    {
      id: 3,
      title: 'Digital Marketing Complete Guide 2024',
      instructor: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      category: 'Marketing',
      rating: 4.8,
      reviews: 620,
      students: 2800,
      price: 99,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
      lessons: 45,
      duration: '15h 45m',
      level: 'Beginner'
    },
    {
      id: 4,
      title: 'Python Programming: From Zero to Hero',
      instructor: 'Sarah Davis',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      category: 'Development',
      rating: 4.9,
      reviews: 1100,
      students: 6200,
      price: 139,
      originalPrice: 279,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
      lessons: 72,
      duration: '26h 20m',
      level: 'All Levels'
    }
  ];

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Most Popular Courses
          </h2>
          <p className="text-slate-400 text-lg">
            Join thousands of students learning from the best
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl overflow-hidden hover:border-violet-500/50 transition group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-44 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 text-rose-500" />
                </button>
                <div className="absolute top-3 left-3">
                  <span className="bg-violet-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-semibold">{course.rating}</span>
                    <span className="text-slate-500 text-xs">({course.reviews})</span>
                  </div>
                </div>

                <h3 className="text-white font-bold mb-3 leading-snug line-clamp-2 group-hover:text-violet-400 transition text-base">
                  {course.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src={course.avatar} 
                    alt={course.instructor} 
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-700"
                  />
                  <span className="text-slate-400 text-xs font-medium">{course.instructor}</span>
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5" />
                    {course.lessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.students}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div>
                    <span className="text-white text-xl font-bold">${course.price}</span>
                    <span className="text-slate-500 text-sm line-through ml-2">${course.originalPrice}</span>
                  </div>
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-violet-500/50 transition text-xs font-semibold">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-slate-800/50 border border-slate-700 text-white px-8 py-3.5 rounded-xl hover:border-violet-500/50 transition font-medium">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;