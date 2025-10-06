import { Award, BookOpen, Check, CreditCard, DollarSign, FileCheck, FileText, HelpCircle, LayoutDashboard, LogOut, Megaphone, MessageSquare, Settings, User, Users } from "lucide-react";
import { useState, type JSX } from "react";
import AnnouncementsContent from "~/module/instructor/components/AnnouncementsContent";
import AssignmentsContent from "~/module/instructor/components/AssignmentsContent";
import CertificatesContent from "~/module/instructor/components/CertificatesContent";
import CoursesContent from "~/module/instructor/components/CoursesContent";
import DashboardContent from "~/module/instructor/components/DashboardContent";
import EarningsContent from "~/module/instructor/components/EarningsContent";
import LogoutContent from "~/module/instructor/components/LogoutContent";
import MessagesContent from "~/module/instructor/components/MessagesContent";
import MyProfileContent from "~/module/instructor/components/MyProfileContent";
import PayoutContent from "~/module/instructor/components/PayoutContent";
import QuizContent from "~/module/instructor/components/QuizContent";
import QuizResultsContent from "~/module/instructor/components/QuizResultsContent";
import SettingsContent from "~/module/instructor/components/SettingsContent";
import StatementsContent from "~/module/instructor/components/StatementsContent";
import StudentsContent from "~/module/instructor/components/StudentsContent";
import SupportTicketsContent from "~/module/instructor/components/SupportTicketsContent";

type MenuItem =
  | 'Dashboard'
  | 'My Profile'
  | 'Courses'
  | 'Announcements'
  | 'Assignments'
  | 'Students'
  | 'Quiz'
  | 'Quiz Results'
  | 'Certificates'
  | 'Earnings'
  | 'Payout'
  | 'Statements'
  | 'Messages'
  | 'Support Tickets'
  | 'Settings'
  | 'Logout';

const InstructorDashboard = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('Dashboard');

  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: 'Dashboard' },
    { icon: <User className="w-4 h-4" />, label: 'My Profile' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Courses' },
    { icon: <Megaphone className="w-4 h-4" />, label: 'Announcements' },
    { icon: <FileText className="w-4 h-4" />, label: 'Assignments' },
    { icon: <Users className="w-4 h-4" />, label: 'Students' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Quiz' },
    { icon: <FileCheck className="w-4 h-4" />, label: 'Quiz Results' },
    { icon: <Award className="w-4 h-4" />, label: 'Certificates' },
    { icon: <DollarSign className="w-4 h-4" />, label: 'Earnings' },
    { icon: <CreditCard className="w-4 h-4" />, label: 'Payout' },
    { icon: <FileCheck className="w-4 h-4" />, label: 'Statements' },
    { icon: <MessageSquare className="w-4 h-4" />, label: 'Messages' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Support Tickets' }
  ];

  // Map menu items to content components
  const contentMap: Record<MenuItem, JSX.Element> = {
    Dashboard: <DashboardContent />,
    'My Profile': <MyProfileContent />,
    Courses: <CoursesContent />,
    Announcements: <AnnouncementsContent />,
    Assignments: <AssignmentsContent />,
    Students: <StudentsContent />,
    Quiz: <QuizContent />,
    'Quiz Results': <QuizResultsContent />,
    Certificates: <CertificatesContent />,
    Earnings: <EarningsContent />,
    Payout: <PayoutContent />,
    Statements: <StatementsContent />,
    Messages: <MessagesContent />,
    'Support Tickets': <SupportTicketsContent />,
    Settings: <SettingsContent />,
    Logout: <LogoutContent />
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-900/50 via-purple-900/50 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Profile Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
                  alt="Eugene Andre"
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-violet-500/50"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-white">Eugene Andre</h1>
                  <Check className="w-4 h-4 text-violet-400" />
                </div>
                <p className="text-slate-300 text-xs">Instructor</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold border border-slate-700 hover:bg-violet-600/50 hover:shadow-violet-500/50 transition text-xs">
                Add New Course
              </button>
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-violet-500/50 transition text-xs">
                Student Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-md p-5 sticky top-8">
              {/* Main Menu */}
              <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Main Menu
                </h3>
                <nav className="space-y-1">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveMenu(item.label as MenuItem)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs ${
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
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Account Settings
                </h3>
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveMenu('Settings')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs ${
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
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs ${
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
    </div>
  );
};

export default InstructorDashboard;