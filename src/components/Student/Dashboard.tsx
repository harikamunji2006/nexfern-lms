import React from 'react';
import { BookOpen, Clock, Award, TrendingUp, PlayCircle, Calendar } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: '12', color: 'bg-blue-500' },
    { icon: Clock, label: 'Hours Learned', value: '48', color: 'bg-green-500' },
    { icon: Award, label: 'Certificates', value: '3', color: 'bg-purple-500' },
    { icon: TrendingUp, label: 'Overall Progress', value: '75%', color: 'bg-orange-500' },
  ];

  const courses = [
    { id: 1, title: 'React Fundamentals', progress: 85, duration: '12h', instructor: 'Jane Smith' },
    { id: 2, title: 'Advanced JavaScript', progress: 60, duration: '18h', instructor: 'John Doe' },
    { id: 3, title: 'Node.js Backend', progress: 40, duration: '24h', instructor: 'Mike Johnson' },
  ];

  const announcements = [
    { id: 1, title: 'New Course Available: TypeScript Masterclass', date: '2024-01-15', type: 'info' },
    { id: 2, title: 'Assignment Due: React Project', date: '2024-01-18', type: 'warning' },
    { id: 3, title: 'Congratulations! You completed Advanced JavaScript', date: '2024-01-12', type: 'success' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, John!
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Ready to continue your learning journey?
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Courses</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{course.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">by {course.instructor}</p>
                  </div>
                  <button className="flex items-center text-green-600 hover:text-green-700 text-sm">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Continue
                  </button>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Announcements</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {announcement.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {announcement.date}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    announcement.type === 'info' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                    announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {announcement.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;