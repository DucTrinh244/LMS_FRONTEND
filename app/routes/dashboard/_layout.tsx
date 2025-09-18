import React, { useState } from 'react';

// Mock data for demo
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff',
  role: 'Student'
};

const mockStats = [
  { label: 'Enrolled Courses', value: '8', change: '+2 from last month', color: 'blue' },
  { label: 'Completed Assignments', value: '24', change: '+5 this week', color: 'green' },
  { label: 'Average Grade', value: '87%', change: '+3% improvement', color: 'purple' },
  { label: 'Study Hours', value: '42h', change: '+8h this week', color: 'orange' },
];

const mockCourses = [
  {
    id: 1,
    title: 'React Development',
    instructor: 'Sarah Wilson',
    progress: 75,
    nextLesson: 'State Management with Redux',
    dueDate: '2025-09-15',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
    description: 'Master React development with hooks, context, and modern patterns',
    duration: '12 weeks',
    lessons: 24,
    students: 156,
    rating: 4.8,
    category: 'Frontend Development'
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    instructor: 'Mike Johnson',
    progress: 92,
    nextLesson: 'Async/Await Patterns',
    dueDate: '2025-09-12',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop',
    description: 'Complete guide to JavaScript from basics to advanced concepts',
    duration: '8 weeks',
    lessons: 18,
    students: 203,
    rating: 4.7,
    category: 'Programming'
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    instructor: 'Emma Davis',
    progress: 45,
    nextLesson: 'Color Theory in Design',
    dueDate: '2025-09-18',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop',
    description: 'Learn the fundamentals of user interface and experience design',
    duration: '10 weeks',
    lessons: 20,
    students: 89,
    rating: 4.9,
    category: 'Design'
  },
  {
    id: 4,
    title: 'Python for Data Science',
    instructor: 'Alex Chen',
    progress: 0,
    nextLesson: 'Introduction to Python',
    dueDate: '2025-09-20',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop',
    description: 'Data analysis and visualization with Python and popular libraries',
    duration: '14 weeks',
    lessons: 28,
    students: 234,
    rating: 4.6,
    category: 'Data Science'
  }
];

const mockAssignments = [
  { 
    id: 1, 
    title: 'React Component Assignment', 
    course: 'React Development', 
    dueDate: '2025-09-14', 
    status: 'pending',
    description: 'Create a reusable component library with proper prop types and documentation',
    points: 100,
    submissionType: 'Code Repository'
  },
  { 
    id: 2, 
    title: 'JavaScript Quiz #3', 
    course: 'JavaScript Fundamentals', 
    dueDate: '2025-09-12', 
    status: 'overdue',
    description: 'Test your knowledge of async programming and promises',
    points: 50,
    submissionType: 'Online Quiz'
  },
  { 
    id: 3, 
    title: 'Design Portfolio Review', 
    course: 'UI/UX Design', 
    dueDate: '2025-09-16', 
    status: 'submitted',
    description: 'Submit your complete design portfolio with case studies',
    points: 150,
    submissionType: 'Portfolio Upload'
  },
  {
    id: 4,
    title: 'Data Visualization Project',
    course: 'Python for Data Science',
    dueDate: '2025-09-22',
    status: 'pending',
    description: 'Create interactive visualizations using matplotlib and plotly',
    points: 120,
    submissionType: 'Jupyter Notebook'
  }
];

const mockGrades = [
  { id: 1, course: 'React Development', assignment: 'Component Architecture', grade: 92, maxGrade: 100, date: '2025-09-01' },
  { id: 2, course: 'JavaScript Fundamentals', assignment: 'ES6 Features Quiz', grade: 88, maxGrade: 100, date: '2025-08-28' },
  { id: 3, course: 'UI/UX Design', assignment: 'Wireframe Design', grade: 95, maxGrade: 100, date: '2025-08-25' },
  { id: 4, course: 'React Development', assignment: 'State Management', grade: 85, maxGrade: 100, date: '2025-08-20' },
  { id: 5, course: 'JavaScript Fundamentals', assignment: 'DOM Manipulation', grade: 90, maxGrade: 100, date: '2025-08-18' }
];

const mockMessages = [
  {
    id: 1,
    sender: 'Sarah Wilson',
    subject: 'Great work on your React assignment!',
    preview: 'I wanted to congratulate you on your excellent component architecture...',
    date: '2025-09-10',
    read: false,
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson&background=e11d48&color=fff'
  },
  {
    id: 2,
    sender: 'Mike Johnson',
    subject: 'JavaScript Quiz Feedback',
    preview: 'Here are some suggestions for improvement on your recent quiz...',
    date: '2025-09-09',
    read: true,
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=059669&color=fff'
  },
  {
    id: 3,
    sender: 'Emma Davis',
    subject: 'Design Review Schedule',
    preview: 'Your portfolio review is scheduled for next week. Please prepare...',
    date: '2025-09-08',
    read: true,
    avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=7c3aed&color=fff'
  }
];

const mockEvents = [
  { id: 1, title: 'React Development - Live Session', date: '2025-09-15', time: '14:00', type: 'class' },
  { id: 2, title: 'JavaScript Quiz Due', date: '2025-09-12', time: '23:59', type: 'assignment' },
  { id: 3, title: 'Design Portfolio Presentation', date: '2025-09-18', time: '10:00', type: 'presentation' },
  { id: 4, title: 'Python Workshop', date: '2025-09-20', time: '16:00', type: 'workshop' }
];

// UI Components
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500 bg-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  padding = 'md' 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-md ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

interface HeaderProps {
  user: any;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onToggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center ml-4 lg:ml-0">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">EduLMS</h1>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search courses, assignments..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9a7 7 0 11-14 0v3l-2 2v2h5.59l2-2H19V9z" />
              </svg>
              <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>

            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                  <div className="ml-3 text-left hidden sm:block">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <svg className="ml-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                      <hr className="my-1" />
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole = 'student', activeView, onViewChange }) => {
  const navigationItems = [
    { name: 'Dashboard', key: 'dashboard', icon: 'home' },
    { name: 'Courses', key: 'courses', icon: 'book' },
    { name: 'Assignments', key: 'assignments', icon: 'clipboard' },
    { name: 'Grades', key: 'grades', icon: 'star' },
    { name: 'Calendar', key: 'calendar', icon: 'calendar' },
    { name: 'Messages', key: 'messages', icon: 'chat' },
    { name: 'Settings', key: 'settings', icon: 'cog' },
  ];

  const icons = {
    home: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    book: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    clipboard: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    star: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    calendar: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    chat: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    cog: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75" onClick={onClose} />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 lg:z-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-50 border-b border-gray-200">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">EduLMS</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onViewChange(item.key);
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
                className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeView === item.key 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={`mr-3 ${activeView === item.key ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                  {icons[item.icon as keyof typeof icons]}
                </span>
                {item.name}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-medium text-white ${
                  userRole === 'admin' ? 'bg-red-500' : 
                  userRole === 'instructor' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {userRole === 'admin' ? 'A' : userRole === 'instructor' ? 'I' : 'S'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 capitalize">
                  {userRole} Mode
                </p>
                <p className="text-xs text-gray-500">EduLMS Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Page Components
const DashboardPage = () => (
  <>
    {/* Welcome Section */}
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome back, {mockUser.name}! 👋
      </h1>
      <p className="text-gray-600">
        Here's what's happening with your learning journey today.
      </p>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {mockStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'purple' ? 'bg-purple-100' :
              'bg-orange-100'
            }`}>
              <div className={`h-6 w-6 ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>
                {stat.color === 'blue' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                {stat.color === 'green' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                {stat.color === 'purple' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                {stat.color === 'orange' && <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-xs ${
                stat.color === 'blue' ? 'text-blue-600' :
                stat.color === 'green' ? 'text-green-600' :
                stat.color === 'purple' ? 'text-purple-600' :
                'text-orange-600'
              }`}>{stat.change}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Current Courses */}
      <div className="lg:col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Current Courses</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600">by {course.instructor}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-600 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Next: {course.nextLesson}
                  </p>
                </div>
                <div className="ml-4">
                  <Button size="sm">Continue</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Upcoming Assignments */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Assignments</h2>
          <div className="space-y-3">
            {mockAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="p-3 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-sm text-gray-900">{assignment.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{assignment.course}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Due: {assignment.dueDate}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    assignment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                    assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="w-full mt-4">
            View All Assignments
          </Button>
        </Card>

        {/* Quick Actions */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Browse Courses
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              View Calendar
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Reports
            </Button>
          </div>
        </Card>

        {/* Study Streak */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Study Streak 🔥</h2>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
            <p className="text-sm text-gray-600 mb-4">Days in a row</p>
            <div className="grid grid-cols-7 gap-1 mb-4">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-8 w-8 rounded text-xs flex items-center justify-center font-medium ${
                    i < 5 ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">Keep it up! You're doing great!</p>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-start text-sm">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Completed lesson</p>
                <p className="text-gray-600">"React Hooks Overview"</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start text-sm">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Submitted assignment</p>
                <p className="text-gray-600">"JavaScript Quiz #2"</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start text-sm">
              <div className="h-2 w-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-900">Earned certificate</p>
                <p className="text-gray-600">"HTML/CSS Fundamentals"</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>

    {/* Recent Announcements */}
    <div className="mt-8">
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-medium text-gray-900">New Course: Advanced React Patterns</h3>
            <p className="text-sm text-gray-600 mt-1">
              We're excited to announce our latest course on advanced React patterns including 
              hooks, context, and performance optimization techniques.
            </p>
            <p className="text-xs text-gray-500 mt-2">Posted by Sarah Wilson • 2 days ago</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-medium text-gray-900">System Maintenance Scheduled</h3>
            <p className="text-sm text-gray-600 mt-1">
              We'll be performing system maintenance on Sunday, September 15th from 2:00 AM to 4:00 AM EST. 
              The platform may be temporarily unavailable.
            </p>
            <p className="text-xs text-gray-500 mt-2">Posted by EduLMS Team • 1 week ago</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-medium text-gray-900">New Discussion Forum Features</h3>
            <p className="text-sm text-gray-600 mt-1">
              We've added new features to our discussion forums including better search, 
              real-time notifications, and improved mobile experience.
            </p>
            <p className="text-xs text-gray-500 mt-2">Posted by Mike Johnson • 2 weeks ago</p>
          </div>
        </div>
      </Card>
    </div>
  </>
);

const CoursesPage = () => (
  <>
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <Button>Browse New Courses</Button>
      </div>
      <p className="text-gray-600">Manage and continue your learning journey</p>
    </div>

    {/* Course Filter */}
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="primary">All Courses</Button>
        <Button size="sm" variant="outline">In Progress</Button>
        <Button size="sm" variant="outline">Completed</Button>
        <Button size="sm" variant="outline">Not Started</Button>
      </div>
    </div>

    {/* Courses Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockCourses.map((course) => (
        <Card key={course.id} className="hover:shadow-lg transition-shadow">
          <div className="relative">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="absolute top-4 left-4">
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                {course.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 bg-white rounded-full p-2">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
              </div>
              <span className="text-sm text-gray-500">{course.students} students</span>
            </div>
            
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-2">by {course.instructor}</p>
            <p className="text-sm text-gray-700 mb-4">{course.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>{course.lessons} lessons</span>
              <span>{course.duration}</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1" size="sm">
                {course.progress === 0 ? 'Start Course' : 'Continue'}
              </Button>
              <Button variant="outline" size="sm">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </>
);

const AssignmentsPage = () => (
  <>
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Assignments</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Filter</Button>
          <Button variant="outline" size="sm">Sort by Due Date</Button>
        </div>
      </div>
      <p className="text-gray-600">Track and submit your course assignments</p>
    </div>

    {/* Assignment Status Tabs */}
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button className="px-3 py-2 bg-white text-blue-600 rounded-md font-medium text-sm">All</button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">Pending</button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">Submitted</button>
        <button className="px-3 py-2 text-gray-600 hover:text-gray-900 rounded-md font-medium text-sm">Graded</button>
      </div>
    </div>

    {/* Assignments List */}
    <div className="space-y-4">
      {mockAssignments.map((assignment) => (
        <Card key={assignment.id} className="hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  assignment.status === 'overdue' ? 'bg-red-100 text-red-800' :
                  assignment.status === 'submitted' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {assignment.status === 'overdue' ? 'Overdue' : 
                   assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{assignment.course}</p>
              <p className="text-gray-700 mb-4">{assignment.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Due: {assignment.dueDate}</span>
                  <span>Points: {assignment.points}</span>
                  <span>{assignment.submissionType}</span>
                </div>
              </div>
            </div>
            
            <div className="ml-6 flex flex-col gap-2">
              {assignment.status === 'pending' && (
                <Button size="sm">Submit Assignment</Button>
              )}
              {assignment.status === 'submitted' && (
                <Button variant="outline" size="sm">View Submission</Button>
              )}
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </>
);

const GradesPage = () => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Grades & Progress</h1>
      <p className="text-gray-600">Track your academic performance across all courses</p>
    </div>

    {/* Grade Summary */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
          <p className="text-sm font-medium text-gray-600">Overall GPA</p>
          <p className="text-xs text-green-600">+3% from last month</p>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
          <p className="text-sm font-medium text-gray-600">Completed</p>
          <p className="text-xs text-blue-600">Assignments</p>
        </div>
      </Card>
      <Card>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">4</div>
          <p className="text-sm font-medium text-gray-600">Active Courses</p>
          <p className="text-xs text-purple-600">This semester</p>
        </div>
      </Card>
    </div>

    {/* Course Grades */}
    <Card className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Course Overview</h2>
      <div className="space-y-6">
        {mockCourses.map((course) => (
          <div key={course.id} className="border-b border-gray-200 pb-4 last:border-b-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">
                  {course.progress === 100 ? '92%' : course.progress > 50 ? '87%' : course.progress > 0 ? '75%' : 'Not graded'}
                </div>
                <p className="text-sm text-gray-500">Current Grade</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${course.progress === 100 ? 92 : course.progress > 50 ? 87 : course.progress > 0 ? 75 : 0}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Recent Grades */}
    <Card>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Grades</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Assignment</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Course</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockGrades.map((grade) => (
              <tr key={grade.id} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">{grade.assignment}</td>
                <td className="py-3 px-4 text-gray-600">{grade.course}</td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${
                    grade.grade >= 90 ? 'text-green-600' : 
                    grade.grade >= 80 ? 'text-blue-600' : 
                    grade.grade >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {grade.grade}/{grade.maxGrade}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-600">{grade.date}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Graded
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </>
);

const CalendarPage = () => (
  <>
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Today</Button>
          <Button variant="outline" size="sm">Month</Button>
          <Button size="sm">Add Event</Button>
        </div>
      </div>
      <p className="text-gray-600">Manage your schedule and upcoming events</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar View */}
      <div className="lg:col-span-2">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">September 2025</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded">
                <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mini Calendar */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 font-medium text-gray-700">{day}</div>
            ))}
            
            {/* Calendar Days */}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2; // Start from day -2 to show previous month days
              const isCurrentMonth = day > 0 && day <= 30;
              const isToday = day === 18;
              const hasEvent = [12, 14, 15, 18, 20, 22].includes(day);
              
              return (
                <div key={i} className={`p-2 rounded cursor-pointer transition-colors ${
                  !isCurrentMonth ? 'text-gray-300' :
                  isToday ? 'bg-blue-600 text-white' :
                  hasEvent ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                  'hover:bg-gray-100'
                }`}>
                  {isCurrentMonth ? day : day <= 0 ? 30 + day : day - 30}
                  {hasEvent && isCurrentMonth && (
                    <div className={`w-1 h-1 rounded-full mx-auto mt-1 ${
                      isToday ? 'bg-white' : 'bg-blue-600'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {mockEvents.map((event) => (
              <div key={event.id} className="flex items-start p-3 border border-gray-200 rounded-lg">
                <div className={`p-2 rounded mr-3 ${
                  event.type === 'class' ? 'bg-blue-100 text-blue-600' :
                  event.type === 'assignment' ? 'bg-red-100 text-red-600' :
                  event.type === 'presentation' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {event.type === 'class' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
                  {event.type === 'assignment' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                  {event.type === 'presentation' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z" /></svg>}
                  {event.type === 'workshop' && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm">{event.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-blue-900">Current: Break Time</p>
                <p className="text-sm text-blue-700">Next: React Development at 2:00 PM</p>
              </div>
              <div className="text-blue-600 font-bold">15:30</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">React Development</p>
                  <p className="text-sm text-gray-600">Live Session</p>
                </div>
                <span className="text-sm text-gray-500">2:00 PM</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Assignment Due</p>
                  <p className="text-sm text-gray-600">JavaScript Quiz</p>
                </div>
                <span className="text-sm text-red-500">11:59 PM</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </>
);

const MessagesPage = () => (
  <>
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <Button>Compose Message</Button>
      </div>
      <p className="text-gray-600">Communicate with instructors and fellow students</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Message List */}
      <div className="lg:col-span-1">
        <Card padding="none">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {mockMessages.map((message) => (
              <div key={message.id} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start">
                  <img src={message.avatar} alt={message.sender} className="h-10 w-10 rounded-full mr-3" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-medium truncate ${!message.read ? 'text-blue-900' : 'text-gray-900'}`}>
                        {message.sender}
                      </p>
                      {!message.read && <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />}
                    </div>
                    <p className={`text-sm font-medium truncate mt-1 ${!message.read ? 'text-blue-800' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate mt-1">{message.preview}</p>
                    <p className="text-xs text-gray-400 mt-2">{message.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-2">
        <Card>
          <div className="border-b border-gray-200 pb-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={mockMessages[0].avatar} alt={mockMessages[0].sender} className="h-12 w-12 rounded-full mr-4" />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{mockMessages[0].subject}</h2>
                  <p className="text-sm text-gray-600">From: {mockMessages[0].sender}</p>
                  <p className="text-sm text-gray-500">{mockMessages[0].date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Reply</Button>
                <Button variant="outline" size="sm">Forward</Button>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Hi John,
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              I wanted to congratulate you on your excellent work on the React component architecture assignment. 
              Your implementation of the reusable component library was outstanding, and I particularly appreciated 
              your attention to prop validation and comprehensive documentation.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Your code demonstrates a solid understanding of React best practices, including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              <li>Proper component composition and separation of concerns</li>
              <li>Effective use of TypeScript for type safety</li>
              <li>Clean and maintainable code structure</li>
              <li>Comprehensive unit tests</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              I've left some additional feedback in the assignment portal. Keep up the excellent work!
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Best regards,<br />
              Sarah Wilson<br />
              React Development Instructor
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Reply</h3>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your reply..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline">Save Draft</Button>
              <Button>Send Reply</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </>
);

const SettingsPage = () => (
  <>
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-600">Manage your account preferences and system settings</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="lg:col-span-1">
        <Card padding="none">
          <nav className="space-y-1">
            <a href="#" className="bg-blue-50 text-blue-700 group flex items-center px-3 py-2 text-sm font-medium rounded-md border-r-2 border-blue-700">
              Profile
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Account
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Notifications
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
              Appearance
            </a>
          </nav>
        </Card>
      </div>

      {/* Settings Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Profile Settings */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <img src={mockUser.avatar} alt={mockUser.name} className="h-20 w-20 rounded-full mr-6" />
              <div>
                <Button variant="outline" size="sm" className="mr-2">Change Photo</Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue={mockUser.name}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={mockUser.email}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Assignment due date reminders</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Grade updates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Course announcements</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">New message notifications</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Push Notifications</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Live session reminders</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Assignment submissions</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-3 text-sm text-gray-700">Weekly progress summaries</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>
        </Card>

        {/* Account Security */}
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Security</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-700">Add an extra layer of security to your account</p>
                  <p className="text-xs text-gray-500 mt-1">Status: Not enabled</p>
                </div>
                <Button variant="outline" size="sm">Enable 2FA</Button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-md font-medium text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Delete Account</p>
                    <p className="text-xs text-gray-500">Permanently remove your account and all data</p>
                  </div>
                  <Button variant="danger" size="sm">Delete Account</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </>
);

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return <CoursesPage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'grades':
        return <GradesPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'messages':
        return <MessagesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userRole="student" 
        activeView={activeView}
        onViewChange={setActiveView}
      />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-0">
        <Header 
          user={mockUser} 
          onToggleSidebar={() => setSidebarOpen(true)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};