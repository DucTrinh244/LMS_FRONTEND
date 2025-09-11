// app/routes/dashboard/_layout.tsx
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
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop'
  },
  {
    id: 2,
    title: 'JavaScript Fundamentals',
    instructor: 'Mike Johnson',
    progress: 92,
    nextLesson: 'Async/Await Patterns',
    dueDate: '2025-09-12',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop'
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    instructor: 'Emma Davis',
    progress: 45,
    nextLesson: 'Color Theory in Design',
    dueDate: '2025-09-18',
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop'
  },
];

const mockAssignments = [
  { id: 1, title: 'React Component Assignment', course: 'React Development', dueDate: '2025-09-14', status: 'pending' },
  { id: 2, title: 'JavaScript Quiz #3', course: 'JavaScript Fundamentals', dueDate: '2025-09-12', status: 'overdue' },
  { id: 3, title: 'Design Portfolio Review', course: 'UI/UX Design', dueDate: '2025-09-16', status: 'submitted' },
];

// UI Components
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
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
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
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
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole = 'student' }) => {
  const navigationItems = [
    { name: 'Dashboard', href: '#', icon: 'home', active: true },
    { name: 'Courses', href: '#', icon: 'book' },
    { name: 'Assignments', href: '#', icon: 'clipboard' },
    { name: 'Grades', href: '#', icon: 'star' },
    { name: 'Calendar', href: '#', icon: 'calendar' },
    { name: 'Messages', href: '#', icon: 'chat' },
    { name: 'Settings', href: '#', icon: 'cog' },
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

      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-50 border-b border-gray-200">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">EduLMS</span>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.active 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <span className={`mr-3 ${item.active ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'}`}>
                  {icons[item.icon as keyof typeof icons]}
                </span>
                {item.name}
              </a>
            ))}
          </nav>

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

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userRole="student" 
      />
      
      <div className="lg:pl-64">
        <Header 
          user={mockUser} 
          onToggleSidebar={() => setSidebarOpen(true)} 
        />
        
        <main className="p-6">
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
                  {mockCourses.map((course) => (
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
                  {mockAssignments.map((assignment) => (
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
        </main>
      </div>
    </div>
  );
}