import {
  AlertTriangle,
  Award,
  BookOpen,
  Heart,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  ShoppingCart,
  Star,
  User
} from "lucide-react";
import { useState, useEffect, type JSX } from "react";
import { useToast } from "~/shared/hooks/useToast";
import { useNavigate, useSearchParams } from "react-router";
import { useAuth } from "~/context/authContext";
import DashboardContent from "~/module/student/components/DashboardContent";
import EnrolledCoursesContent from "../pages/EnrolledCoursesContent";
import MessagesContent from "../pages/MessagesContent";
import MyCertificatesContent from "../pages/MyCertificatesContent";
import MyProfileContent from "../pages/MyProfileContent";
import MyQuizAttemptsContent from "../pages/MyQuizAttemptsContent";
import QuizListContent from "../pages/QuizListContent";
import OrderHistoryContent from "../pages/OrderHistoryContent";
import ReviewsContent from "../pages/ReviewsContent";
import SettingsContent from "../pages/SettingsContent";
import WishlistContent from "../pages/WishlistContent";

// Define type for menu item labels
type MenuItem =
  | 'Dashboard'
  | 'My Profile'
  | 'Enrolled Courses'
  | 'My Certificates'
  | 'Wishlist'
  | 'Reviews'
  | 'Quizzes'
  | 'My Quiz Attempts'
  | 'Order History'
  | 'Messages'
  | 'Settings'
  | 'Logout';

const LogoutContent = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-amber-500/20 rounded-full">
            <AlertTriangle className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Xác nhận đăng xuất</h2>
        <p className="text-slate-300 mb-2">
          Bạn có chắc chắn muốn đăng xuất, <span className="font-semibold text-violet-400">{user?.fullName}</span>?
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Bạn sẽ cần đăng nhập lại để truy cập vào dashboard của học viên.
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Có, đăng xuất
          </button>
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-600 transition"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const menuParam = searchParams.get('menu') as MenuItem | null
  const [activeMenu, setActiveMenu] = useState<MenuItem>(menuParam || 'Dashboard');

  // Update activeMenu when URL param changes
  useEffect(() => {
    const menu = searchParams.get('menu') as MenuItem | null
    const quizId = searchParams.get('quizId')
    if (menu) {
      setActiveMenu(menu)
      // Scroll to top of content area when menu changes
      setTimeout(() => {
        const contentArea = document.querySelector('.lg\\:col-span-3')
        if (contentArea) {
          contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [searchParams])

  // Also listen to popstate events for manual URL changes
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const menu = urlParams.get('menu') as MenuItem | null
      if (menu) {
        setActiveMenu(menu)
        setSearchParams(urlParams)
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [setSearchParams])

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { icon: <User className="w-4 h-4" />, label: 'My Profile' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Enrolled Courses' },
    { icon: <Award className="w-4 h-4" />, label: 'My Certificates' },
    { icon: <Heart className="w-4 h-4" />, label: 'Wishlist' },
    { icon: <Star className="w-4 h-4" />, label: 'Reviews' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Quizzes' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'My Quiz Attempts' },
    { icon: <ShoppingCart className="w-4 h-4" />, label: 'Order History' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages' }
  ];

  // Get quizId from URL params for MyQuizAttemptsContent
  const quizId = searchParams.get('quizId')

  // Handler to navigate to attempts with quizId
  const handleNavigateToAttempts = (quizId: string) => {
    setActiveMenu('My Quiz Attempts')
    setSearchParams({ menu: 'My Quiz Attempts', quizId })
    // Scroll to content area
    setTimeout(() => {
      const contentArea = document.querySelector('.lg\\:col-span-3')
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Map menu items to content components
  const contentMap: Record<MenuItem, JSX.Element> = {
    Dashboard: <DashboardContent />,
    'My Profile': <MyProfileContent />,
    'Enrolled Courses': <EnrolledCoursesContent />,
    'My Certificates': <MyCertificatesContent />,
    Wishlist: <WishlistContent />,
    Reviews: <ReviewsContent />,
    Quizzes: <QuizListContent onNavigateToAttempts={handleNavigateToAttempts} />,
    'My Quiz Attempts': <MyQuizAttemptsContent quizId={quizId || undefined} />,
    'Order History': <OrderHistoryContent />,
    Messages: <MessagesContent />,
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${activeMenu === item.label
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
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${activeMenu === 'Settings'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-violet-400'
                    }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => setActiveMenu('Logout')}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-base ${activeMenu === 'Logout'
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
        <div className="lg:col-span-3" key={`${activeMenu}-${quizId || ''}`}>
          {contentMap[activeMenu]}
        </div>
      </div>
    </div>

  );
};

export default StudentDashboard;