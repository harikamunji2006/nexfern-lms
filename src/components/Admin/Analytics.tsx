import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, BookOpen, DollarSign, Calendar, Download, Filter } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('overview');

  const overviewStats = [
    { label: 'Total Revenue', value: '$45,678', change: '+12%', icon: DollarSign, color: 'bg-green-500' },
    { label: 'Active Users', value: '2,847', change: '+8%', icon: Users, color: 'bg-blue-500' },
    { label: 'Course Completions', value: '1,234', change: '+15%', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Avg. Rating', value: '4.7', change: '+0.2', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  const userGrowthData = [
    { month: 'Jan', students: 120, instructors: 8, admins: 2 },
    { month: 'Feb', students: 180, instructors: 12, admins: 2 },
    { month: 'Mar', students: 240, instructors: 15, admins: 3 },
    { month: 'Apr', students: 320, instructors: 18, admins: 3 },
    { month: 'May', students: 420, instructors: 22, admins: 4 },
    { month: 'Jun', students: 580, instructors: 28, admins: 4 }
  ];

  const coursePerformance = [
    { courseName: 'React Fundamentals', enrollments: 324, completionRate: 85, revenue: '$12,960' },
    { courseName: 'Advanced JavaScript', enrollments: 256, completionRate: 78, revenue: '$10,240' },
    { courseName: 'Node.js Backend', enrollments: 189, completionRate: 72, revenue: '$7,560' },
    { courseName: 'Python Basics', enrollments: 167, completionRate: 90, revenue: '$6,680' },
    { courseName: 'UI/UX Design', enrollments: 143, completionRate: 68, revenue: '$5,720' }
  ];

  const recentActivity = [
    { id: 1, type: 'enrollment', message: '15 new student enrollments in React Fundamentals', time: '2 hours ago' },
    { id: 2, type: 'completion', message: '8 students completed Advanced JavaScript', time: '4 hours ago' },
    { id: 3, type: 'course', message: 'New course "Vue.js Essentials" submitted for review', time: '6 hours ago' },
    { id: 4, type: 'payment', message: '$1,240 in course sales today', time: '8 hours ago' },
    { id: 5, type: 'review', message: 'React Fundamentals received 5-star review', time: '10 hours ago' }
  ];

  const engagementMetrics = [
    { metric: 'Daily Active Users', value: '1,247', trend: '+5.2%' },
    { metric: 'Avg. Session Duration', value: '24m 32s', trend: '+8.1%' },
    { metric: 'Course Completion Rate', value: '76%', trend: '+3.4%' },
    { metric: 'Discussion Participation', value: '68%', trend: '+12.7%' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'enrollment':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'completion':
        return <BookOpen className="h-4 w-4 text-green-500" />;
      case 'course':
        return <BarChart3 className="h-4 w-4 text-purple-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'review':
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Platform performance and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} vs last period
                  </p>
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
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Growth</h3>
          <div className="space-y-4">
            {userGrowthData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-1">
                    <div 
                      className="bg-green-500 h-6 rounded"
                      style={{ width: `${(data.students / 600) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-blue-500 h-6 rounded"
                      style={{ width: `${(data.instructors / 30) * 100}%` }}
                    ></div>
                    <div 
                      className="bg-purple-500 h-6 rounded"
                      style={{ width: `${(data.admins / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                  {data.students + data.instructors + data.admins}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Students</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Instructors</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded mr-1"></div>
              <span className="text-gray-600 dark:text-gray-400">Admins</span>
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Engagement Metrics</h3>
          <div className="space-y-4">
            {engagementMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{metric.metric}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    metric.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">vs last period</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Performing Courses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Course</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Enrollments</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</th>
                <th className="text-left py-3 text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {coursePerformance.map((course, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{course.courseName}</div>
                  </td>
                  <td className="py-4 text-gray-600 dark:text-gray-400">{course.enrollments}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${course.completionRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{course.completionRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 font-medium text-gray-900 dark:text-white">{course.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;