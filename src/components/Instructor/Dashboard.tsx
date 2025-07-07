import React from 'react';
import { Users, Star, MessageSquare, FileText, Plus, Eye, CheckCircle, BarChart3 } from 'lucide-react';

const InstructorDashboard: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Total Students', value: '324', color: 'bg-blue-500' },
    { icon: Star, label: 'Average Rating', value: '4.8', color: 'bg-yellow-500' },
    { icon: MessageSquare, label: 'Active Discussions', value: '12', color: 'bg-purple-500' },
    { icon: FileText, label: 'Pending Reviews', value: '8', color: 'bg-red-500' },
  ];

  const quickActions = [
    { icon: Plus, label: 'Create Course', action: 'create', color: 'bg-green-500' },
    { icon: MessageSquare, label: 'View Discussions', action: 'discussions', color: 'bg-purple-500' },
    { icon: CheckCircle, label: 'Check Assignments', action: 'assignments', color: 'bg-blue-500' },
    { icon: BarChart3, label: 'View Analytics', action: 'analytics', color: 'bg-orange-500' },
  ];

  const recentDiscussions = [
    { id: 1, course: 'React Fundamentals', student: 'Alice Johnson', question: 'How do I handle state in functional components?', time: '2 hours ago' },
    { id: 2, course: 'Advanced JavaScript', student: 'Bob Smith', question: 'Clarification on async/await syntax', time: '4 hours ago' },
    { id: 3, course: 'Node.js Backend', student: 'Carol Davis', question: 'Database connection issues', time: '6 hours ago' },
  ];

  const performanceData = [
    { metric: 'Students Taught', value: '324', change: '+12%' },
    { metric: 'Certificates Issued', value: '156', change: '+8%' },
    { metric: 'Course Rating', value: '4.8/5', change: '+0.2' },
    { metric: 'Engagement Rate', value: '92%', change: '+5%' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Instructor Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage your courses and connect with students
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

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className={`${action.color} p-2 rounded-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Discussions */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Discussions</h2>
            <button className="text-green-600 hover:text-green-700 text-sm font-medium">
              View all
            </button>
          </div>
          
          <div className="space-y-4">
            {recentDiscussions.map((discussion) => (
              <div key={discussion.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {discussion.course}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      by {discussion.student}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{discussion.time}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  {discussion.question}
                </p>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Reply
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Performance Overview</h2>
          
          <div className="space-y-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.metric}</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;