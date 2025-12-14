import {
  Award,
  BookOpen,
  CreditCard,
  DollarSign,
  FileCheck,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  Settings,
  User,
  Users
} from "lucide-react";
import { useState, type JSX } from "react";
import DashboardContent from "~/module/instructor/components/DashboardContent";
import EarningsContent from "~/module/instructor/components/EarningsContent";
import LogoutContent from "~/module/instructor/components/LogoutContent";
import PayoutContent from "~/module/instructor/components/PayoutContent";
import QuizResultsContent from "~/module/instructor/components/QuizResultsContent";
import CertificatesContent from "~/module/instructor/pages/certificate/CertificatesContent";
import MessagesContent from "~/module/instructor/pages/chat/MessagesContent";
import CoursesContent from "~/module/instructor/pages/course/CoursesContent";
import MyProfileContent from "~/module/instructor/pages/profile/MyProfileContent";
import QuizContent from "~/module/instructor/pages/quiz/QuizContent";
import StudentsContent from "~/module/instructor/pages/student/StudentsContent";

type MenuItem =
  | 'Dashboard'
  | 'My Profile'
  | 'Courses'
  | 'Students'
  | 'Quiz'
  | 'Quiz Results'
  | 'Certificates'
  | 'Earnings'
  | 'Payout'
  | 'Messages'
  | 'Logout';

// Placeholder content components (for cases where actual components are not provided)
const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-6">
    <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
    <p className="text-slate-300 text-base">Manage your {title.toLowerCase()} here.</p>
  </div>
);

const InstructorDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('Dashboard');

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { icon: <User className="w-4 h-4" />, label: 'My Profile' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Courses' },
    { icon: <Users className="w-4 h-4" />, label: 'Students' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Quiz' },
    { icon: <FileCheck className="w-4 h-4" />, label: 'Quiz Results' },
    { icon: <Award className="w-4 h-4" />, label: 'Certificates' },
    { icon: <DollarSign className="w-4 h-4" />, label: 'Earnings' },
    { icon: <CreditCard className="w-4 h-4" />, label: 'Payout' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages' }
  ];

  // Map menu items to content components
  const contentMap: Record<MenuItem, JSX.Element> = {
    Dashboard: <DashboardContent />,
    'My Profile': <MyProfileContent />,
    Courses: <CoursesContent />,
    Students: <StudentsContent />,
    Quiz: <QuizContent />,
    'Quiz Results': <QuizResultsContent />,
    Certificates: <CertificatesContent />,
    Earnings: <EarningsContent />,
    Payout: <PayoutContent />,
    Messages: <MessagesContent />,
    Logout: <LogoutContent />
  };

  return (

        <div className="max-w-8xl mx-auto px-4 py-8">
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

export default InstructorDashboard;