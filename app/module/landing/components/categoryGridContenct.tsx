import { X } from 'lucide-react';
import { useState } from 'react';

type CategoryTab = 'Graphics & Design' | 'Programming & Tech' | 'Digital Marketing' | 'Video & Animation';

interface Category {
  name: string;
  count: number;
  image: string;
  icon: string;
  description?: string; // Added for CategoryDetail
}

interface CategoryDetailProps {
  category: Category;
  onClose: () => void;
}

const CategoryDetail = ({ category, onClose }: CategoryDetailProps) => {
  // Mock sample courses for the category
  const sampleCourses = [
    { title: `${category.name} Fundamentals`, duration: '4 weeks', level: 'Beginner' },
    { title: `Advanced ${category.name}`, duration: '6 weeks', level: 'Intermediate' },
    { title: `Pro ${category.name} Techniques`, duration: '8 weeks', level: 'Advanced' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-lg mx-4 shadow-xl shadow-violet-500/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-md flex items-center justify-center text-white text-lg">
              {category.icon}
            </div>
            <h3 className="text-white text-xl font-bold">{category.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center hover:bg-violet-600/50 transition"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm mb-4">
          {category.description || `Explore our ${category.name} courses to enhance your skills. With ${category.count} courses available, there's something for everyone, from beginners to experts.`}
        </p>

        {/* Course Count */}
        <p className="text-slate-400 text-xs mb-4">
          {category.count} courses available
        </p>

        {/* Sample Courses */}
        <div className="mb-6">
          <h4 className="text-white text-base font-semibold mb-2">Sample Courses</h4>
          <div className="space-y-3">
            {sampleCourses.map((course, index) => (
              <div
                key={index}
                className="bg-slate-700/50 rounded-lg p-3 flex items-center justify-between hover:bg-slate-600 transition"
              >
                <div>
                  <p className="text-white text-sm font-medium">{course.title}</p>
                  <p className="text-slate-400 text-xs">{course.level} • {course.duration}</p>
                </div>
                <button className="text-violet-400 text-xs font-medium hover:text-violet-300 transition">
                  View Course
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-violet-500/50 transition">
          Explore All {category.name} Courses
        </button>
      </div>
    </div>
  );
};

const BrowseCategories = () => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('Graphics & Design');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const tabs: CategoryTab[] = [
    'Graphics & Design',
    'Programming & Tech',
    'Digital Marketing',
    'Video & Animation'
  ];

  const categories: Record<CategoryTab, Category[]> = {
    'Graphics & Design': [
      { name: 'Logo Design', count: 21, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&q=80', icon: '🎨', description: 'Create stunning logos that define brand identities.' },
      { name: 'Brand Style Guides', count: 15, image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=200&q=80', icon: '📋', description: 'Develop cohesive brand guidelines for consistent visuals.' },
      { name: 'Game Art', count: 15, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80', icon: '🎮', description: 'Design captivating art for immersive gaming experiences.' },
      { name: 'Business Cards', count: 22, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200&q=80', icon: '💼', description: 'Craft professional business cards that leave a lasting impression.' },
      { name: 'Illustration', count: 15, image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=200&q=80', icon: '🎨', description: 'Bring stories to life with custom illustrations.' },
      { name: 'Pattern Design', count: 15, image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=200&q=80', icon: '🔶', description: 'Create unique patterns for fabrics, wallpapers, and more.' },
      { name: 'Brochure Design', count: 14, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&q=80', icon: '📄', description: 'Design informative brochures that engage your audience.' },
      { name: 'Flyer Design', count: 15, image: 'https://images.unsplash.com/photo-1561070791-36c11767b26a?w=200&q=80', icon: '📰', description: 'Produce eye-catching flyers for events and promotions.' },
      { name: 'Book Design', count: 15, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&q=80', icon: '📖', description: 'Design beautiful book layouts for print and digital.' },
      { name: 'Social Media Design', count: 12, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80', icon: '📱', description: 'Create engaging visuals for social media platforms.' },
      { name: 'Icon Design', count: 15, image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=200&q=80', icon: '🎯', description: 'Design custom icons for apps and websites.' },
      { name: 'Invitation Design', count: 15, image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=200&q=80', icon: '💌', description: 'Craft elegant invitations for special occasions.' },
      { name: 'Graphics for Streamers', count: 6, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&q=80', icon: '🎮', description: 'Design overlays and graphics for streaming platforms.' },
      { name: 'Label Design', count: 15, image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&q=80', icon: '🏷️', description: 'Create professional labels for products and packaging.' },
      { name: 'UX Design', count: 15, image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=200&q=80', icon: '💻', description: 'Design intuitive user experiences for digital products.' },
      { name: 'Photoshop Editing', count: 10, image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&q=80', icon: '🖼️', description: 'Master photo editing with advanced Photoshop techniques.' },
      { name: 'Presentation Design', count: 15, image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&q=80', icon: '📊', description: 'Create impactful presentations for business and education.' },
      { name: 'Infographic Design', count: 15, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80', icon: '📈', description: 'Visualize data with compelling infographics.' }
    ],
    'Programming & Tech': [
      { name: 'Web Development', count: 45, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80', icon: '💻', description: 'Build responsive and dynamic websites.' },
      { name: 'Mobile Apps', count: 32, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&q=80', icon: '📱', description: 'Develop cross-platform mobile applications.' },
      { name: 'Python Programming', count: 28, image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200&q=80', icon: '🐍', description: 'Learn Python for automation, AI, and more.' },
      { name: 'Game Development', count: 18, image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80', icon: '🎮', description: 'Create engaging games with modern tools.' },
      { name: 'Data Science', count: 25, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80', icon: '📊', description: 'Analyze data and build predictive models.' },
      { name: 'WordPress', count: 20, image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=200&q=80', icon: '📝', description: 'Build and customize WordPress websites.' }
    ],
    'Digital Marketing': [
      { name: 'SEO', count: 35, image: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=200&q=80', icon: '🔍', description: 'Optimize websites for search engine rankings.' },
      { name: 'Social Media Marketing', count: 40, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&q=80', icon: '📱', description: 'Grow your brand on social media platforms.' },
      { name: 'Content Marketing', count: 28, image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=200&q=80', icon: '✍️', description: 'Create compelling content to engage audiences.' },
      { name: 'Email Marketing', count: 22, image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=200&q=80', icon: '📧', description: 'Design effective email marketing campaigns.' },
      { name: 'PPC Advertising', count: 18, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80', icon: '💰', description: 'Run targeted pay-per-click ad campaigns.' },
      { name: 'Marketing Strategy', count: 25, image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&q=80', icon: '📈', description: 'Develop strategic marketing plans for growth.' }
    ],
    'Video & Animation': [
      { name: 'Video Editing', count: 30, image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=80', icon: '🎬', description: 'Edit professional videos for various platforms.' },
      { name: '2D Animation', count: 25, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&q=80', icon: '🎨', description: 'Create engaging 2D animations.' },
      { name: '3D Animation', count: 20, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&q=80', icon: '🎭', description: 'Build immersive 3D animation projects.' },
      { name: 'Motion Graphics', count: 22, image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=200&q=80', icon: '✨', description: 'Design dynamic motion graphics for videos.' },
      { name: 'Whiteboard Animation', count: 15, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80', icon: '✏️', description: 'Create educational whiteboard animations.' },
      { name: 'Logo Animation', count: 18, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=200&q=80', icon: '🎪', description: 'Animate logos for brand intros.' }
    ]
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Browse By Categories
          </h2>
          <p className="text-slate-400 text-base">
            One stop shop for all your needs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-violet-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories[activeTab].map((category, index) => (
            <div
              key={index}
              className="group bg-slate-800 rounded-xl border border-slate-700 p-5 hover:shadow-xl hover:shadow-violet-500/50 hover:border-violet-500 transition-all cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <div className="flex items-center gap-4">
                {/* Image */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-slate-600">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {/* Icon Overlay */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-md flex items-center justify-center text-white text-xs shadow-md">
                    {category.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1 group-hover:text-violet-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    {category.count} courses
                  </p>
                </div>

                {/* Count Badge */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center font-semibold text-xs group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-purple-600 transition-all">
                    {category.count}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium text-sm hover:shadow-xl hover:shadow-violet-500/50 transition-all hover:scale-105">
            View All Categories
          </button>
        </div>

        {/* Category Detail Modal */}
        {selectedCategory && (
          <CategoryDetail
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </div>
    </section>
  );
};

export default BrowseCategories;