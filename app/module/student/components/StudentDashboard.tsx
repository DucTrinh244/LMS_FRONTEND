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
} from "lucide-react";
import { useState, type JSX } from "react";
import DashboardContent from "~/module/student/components/DashboardContent";

// Define type for menu item labels
type MenuItem =
  | 'Dashboard'
  | 'My Profile'
  | 'Enrolled Courses'
  | 'My Certificates'
  | 'Wishlist'
  | 'Reviews'
  | 'My Quiz Attempts'
  | 'Order History'
  | 'Referrals'
  | 'Messages'
  | 'Support Tickets'
  | 'Settings'
  | 'Logout';

// Placeholder content components
const MyProfileContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">My Profile</h2>
    <p className="text-slate-300 text-base">Edit your personal information, update your bio, and manage your account settings here.</p>
  </div>
);

const EnrolledCoursesContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Enrolled Courses</h2>
    <p className="text-slate-300 text-base">View and manage your enrolled courses here.</p>
  </div>
);

const MyCertificatesContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">My Certificates</h2>
    <p className="text-slate-300 text-base">View and download your earned certificates here.</p>
  </div>
);

const WishlistContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Wishlist</h2>
    <p className="text-slate-300 text-base">Manage your wishlist of courses here.</p>
  </div>
);

const ReviewsContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Reviews</h2>
    <p className="text-slate-300 text-base">View and submit course reviews here.</p>
  </div>
);

const MyQuizAttemptsContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">My Quiz Attempts</h2>
    <p className="text-slate-300 text-base">Review your quiz attempts and scores here.</p>
  </div>
);

const OrderHistoryContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Order History</h2>
    <p className="text-slate-300 text-base">View your purchase history and invoices here.</p>
  </div>
);

const ReferralsContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Referrals</h2>
    <p className="text-slate-300 text-base">Manage your referrals and rewards here.</p>
  </div>
);

const MessagesContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Messages</h2>
    <p className="text-slate-300 text-base">Communicate with instructors and view messages here.</p>
  </div>
);

const SupportTicketsContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Support Tickets</h2>
    <p className="text-slate-300 text-base">Manage your support tickets here.</p>
  </div>
);

const SettingsContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Settings</h2>
    <p className="text-slate-300 text-base">Configure your account settings and preferences here.</p>
  </div>
);

const LogoutContent = () => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">Logout</h2>
    <p className="text-slate-300 text-base">Click here to log out of your account.</p>
  </div>
);

const StudentDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('Dashboard');

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { icon: <User className="w-4 h-4" />, label: 'My Profile' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Enrolled Courses' },
    { icon: <Award className="w-4 h-4" />, label: 'My Certificates' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist' },
    { icon: <Star className="w-4 h-4" />, label: 'Reviews' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'My Quiz Attempts' },
    { icon: <ShoppingCart className="w-4 h-4" />, label: 'Order History' },
    { icon: <Repeat className="w-4 h-4" />, label: 'Referrals' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Support Tickets' }
  ];

  // Map menu items to content components
  const contentMap: Record<MenuItem, JSX.Element> = {
    Dashboard: <DashboardContent />,
    'My Profile': <MyProfileContent />,
    'Enrolled Courses': <EnrolledCoursesContent />,
    'My Certificates': <MyCertificatesContent />,
    Wishlist: <WishlistContent />,
    Reviews: <ReviewsContent />,
    'My Quiz Attempts': <MyQuizAttemptsContent />,
    'Order History': <OrderHistoryContent />,
    Referrals: <ReferralsContent />,
    Messages: <MessagesContent />,
    'Support Tickets': <SupportTicketsContent />,
    Settings: <SettingsContent />,
    Logout: <LogoutContent />
  };

  return (

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 sticky top-24">
                {/* Main Menu */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Main Menu
                  </h3>
                  <nav className="space-y-1">
                    {menuItems.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveMenu(item.label as MenuItem)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${
                          activeMenu === item.label
                            ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold'
                            : 'text-slate-300 hover:bg-slate-700 hover:text-violet-400'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Account Settings */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Account Settings
                  </h3>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveMenu('Settings')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${
                        activeMenu === 'Settings'
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-violet-400'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => setActiveMenu('Logout')}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${
                        activeMenu === 'Logout'
                          ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold'
                          : 'text-slate-300 hover:bg-slate-700 hover:text-violet-400'
                      }`}
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {contentMap[activeMenu]}
            </div>
          </div>
        </div>
    
  );
};

export default StudentDashboard;