import {
  Award,
  BookOpen,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Repeat,
  Settings,
  ShoppingCart,
  Star,
  User
} from 'lucide-react';

const DashboardSidebar = () => {
  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
    { icon: <User className="w-5 h-5" />, label: 'My Profile' },
    { icon: <BookOpen className="w-5 h-5" />, label: 'Enrolled Courses' },
    { icon: <Award className="w-5 h-5" />, label: 'My Certificates' },
    { icon: <Heart className="w-5 h-5" />, label: 'Wishlist' },
    { icon: <Star className="w-5 h-5" />, label: 'Reviews' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'My Quiz Attempts' },
    { icon: <ShoppingCart className="w-5 h-5" />, label: 'Order History' },
    { icon: <Repeat className="w-5 h-5" />, label: 'Referrals' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'Support Tickets' },
  ];

  const accountItems = [
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
    { icon: <LogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return (
    <aside className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      {/* Main Menu */}
      <div className="mb-8">
        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
          Main Menu
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active
                  ? 'bg-red-50 text-red-600 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Account Settings */}
      <div>
        <h3 className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-4">
          Account Settings
        </h3>
        <nav className="space-y-1">
          {accountItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;