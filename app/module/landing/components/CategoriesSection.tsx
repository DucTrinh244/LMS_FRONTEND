import React from 'react';

const CategoriesSection = () => {
  const categories = [
    { name: 'Development', icon: '💻', count: 450, color: 'from-blue-500 to-cyan-500' },
    { name: 'Business', icon: '💼', count: 320, color: 'from-violet-500 to-purple-500' },
    { name: 'Design', icon: '🎨', count: 280, color: 'from-pink-500 to-rose-500' },
    { name: 'Marketing', icon: '📈', count: 210, color: 'from-orange-500 to-amber-500' },
    { name: 'Photography', icon: '📷', count: 180, color: 'from-emerald-500 to-teal-500' },
    { name: 'Music', icon: '🎵', count: 150, color: 'from-indigo-500 to-blue-500' }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Explore Top Categories
          </h2>
          <p className="text-slate-400 text-lg">
            Choose from thousands of courses across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl p-6 hover:border-violet-500/50 transition cursor-pointer group text-center"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">{category.icon}</div>
              <h3 className="text-white font-semibold mb-1 text-sm">{category.name}</h3>
              <p className="text-slate-500 text-xs">{category.count} courses</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;