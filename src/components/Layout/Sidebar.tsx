import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Award, 
  User, 
  Settings, 
  Plus, 
  Users, 
  BarChart3,
  GraduationCap,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    const baseItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/${user?.role}` },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...baseItems,
          { icon: BookOpen, label: 'Courses', path: '/student/courses' },
          { icon: FileText, label: 'Assignments', path: '/student/assignments' },
          { icon: MessageSquare, label: 'Discussions', path: '/student/discussions' },
          { icon: Award, label: 'Certificates', path: '/student/certificates' },
          { icon: User, label: 'Profile', path: '/student/profile' },
          { icon: Settings, label: 'Settings', path: '/student/settings' },
        ];
      case 'instructor':
        return [
          ...baseItems,
          { icon: BookOpen, label: 'Courses', path: '/instructor/courses' },
          { icon: FileText, label: 'Assignments', path: '/instructor/assignments' },
          { icon: MessageSquare, label: 'Discussions', path: '/instructor/discussions' },
          { icon: Plus, label: 'Create Course', path: '/instructor/create-course' },
          { icon: User, label: 'Profile', path: '/instructor/profile' },
          { icon: Settings, label: 'Settings', path: '/instructor/settings' },
        ];
      case 'admin':
        return [
          ...baseItems,
          { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
          { icon: Users, label: 'Manage Users', path: '/admin/users' },
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
          { icon: User, label: 'Profile', path: '/admin/profile' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      default:
        return baseItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="bg-green-500 p-2 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Nexfern</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">LMS</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;