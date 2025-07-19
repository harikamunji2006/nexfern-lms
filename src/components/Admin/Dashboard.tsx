import React, { useEffect, useState } from 'react';
import { Users, BookOpen, Clock, DollarSign, Server, Database, HardDrive, Activity } from 'lucide-react';
import { AdminDashboardStats, SystemHealthItem, PendingCourse, RecentActivity } from '../../types';

const API_BASE = 'http://localhost:3001/admin/dashboard';

const iconMap: Record<string, any> = {
  'Server Status': Server,
  'Database': Database,
  'Database Storage': HardDrive,
  'Storage': HardDrive,
  'API Response': Activity,
  'External DB': Database,
};

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealthItem[]>([]);
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiAvg, setApiAvg] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('nexfern_token');
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, healthRes, pendingRes, activityRes] = await Promise.all([
          fetch(`${API_BASE}/stats`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/system-health`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/pending-courses`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/recent-activity`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setStats(await statsRes.json());
        setSystemHealth(await healthRes.json());
        setPendingCourses(await pendingRes.json());
        setRecentActivity(await activityRes.json());
      } catch (e) {
        // handle error
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('nexfern_token');
    const fetchApiAvg = async () => {
      try {
        const res = await fetch(`${API_BASE}/api-average-response`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setApiAvg(data.averageResponseMs);
      } catch (e) {
        // handle error
      }
    };
    fetchApiAvg();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <svg className="animate-spin h-10 w-10 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path className="opacity-75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" d="M12 4a8 8 0 018 8" />
        </svg>
        <div className="text-lg text-gray-700 dark:text-gray-200 font-medium">Loading dashboard, please wait...</div>
      </div>
    );
  }

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
        {stats && [
          { icon: Users, label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500' },
          { icon: BookOpen, label: 'Active Courses', value: stats.activeCourses, color: 'bg-green-500' },
          { icon: Clock, label: 'Pending Approvals', value: stats.pendingApprovals, color: 'bg-yellow-500' },
          { icon: DollarSign, label: 'Revenue', value: `₹${stats.revenue}`, color: 'bg-purple-500' },
        ].map((stat, index) => {
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
        <div className="grid grid-flow-col auto-cols-fr gap-2 overflow-x-auto">
          {systemHealth
            .filter(item => item.label !== 'Database Storage') // Remove old label if present
            .map((item, index) => {
              const Icon = iconMap[item.label] || Activity;
              return (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[220px]">
                  <div className={`p-2 rounded-lg ${
                    item.status === 'healthy' ? 'bg-green-100 dark:bg-green-900/30' :
                    item.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' :
                    item.status === 'down' ? 'bg-red-100 dark:bg-red-900/30' :
                    'bg-gray-100 dark:bg-gray-900/30'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      item.status === 'healthy' ? 'text-green-600 dark:text-green-400' :
                      item.status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                      item.status === 'down' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-600 dark:text-gray-400'
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
              <div key={course.course_id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                      {course.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Instructor ID: {course.instructor_id}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300`}>
                    Pending
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Submitted: {new Date(course.created_at).toLocaleDateString()}
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