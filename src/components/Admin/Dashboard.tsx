import React from 'react';
import { Users, BookOpen, Clock, DollarSign, Server, Database, HardDrive, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'Active Courses', value: '67', color: 'bg-green-500' },
    { icon: Clock, label: 'Pending Approvals', value: '12', color: 'bg-yellow-500' },
    { icon: DollarSign, label: 'Revenue', value: '$45,678', color: 'bg-purple-500' },
  ];

  const systemHealth = [
    { icon: Server, label: 'Server Status', status: 'healthy', value: '99.9%' },
    { icon: Database, label: 'Database', status: 'healthy', value: '98.5%' },
    { icon: HardDrive, label: 'Storage', status: 'warning', value: '85%' },
    { icon: Activity, label: 'API Response', status: 'healthy', value: '150ms' },
  ];

  const pendingCourses = [
    { id: 1, title: 'Advanced Python Programming', instructor: 'Dr. Sarah Wilson', submitted: '2024-01-15', status: 'pending' },
    { id: 2, title: 'Machine Learning Basics', instructor: 'Prof. Michael Chen', submitted: '2024-01-14', status: 'pending' },
    { id: 3, title: 'Web Development Bootcamp', instructor: 'Jane Smith', submitted: '2024-01-13', status: 'review' },
  ];

  const recentActivity = [
    { id: 1, type: 'course_approved', message: 'Course "React Fundamentals" approved', time: '2 hours ago' },
    { id: 2, type: 'new_enrollment', message: '15 new student enrollments', time: '4 hours ago' },
    { id: 3, type: 'assignment_submitted', message: '42 assignments submitted', time: '6 hours ago' },
    { id: 4, type: 'certificate_issued', message: '8 certificates issued', time: '8 hours ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          System overview and management
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Health */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className={`p-2 rounded-lg ${
                  item.status === 'healthy' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'
                }`}>
                  <Icon className={`h-5 w-5 ${
                    item.status === 'healthy' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Course Approvals */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {pendingCourses.map((course) => (
              <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {course.instructor}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                  }`}>
                    {course.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Submitted: {course.submitted}
                </p>
                <div className="flex space-x-2">
                  <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                    Approve
                  </button>
                  <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                    Reject
                  </button>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'course_approved' ? 'bg-green-500' :
                  activity.type === 'new_enrollment' ? 'bg-blue-500' :
                  activity.type === 'assignment_submitted' ? 'bg-purple-500' :
                  'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;