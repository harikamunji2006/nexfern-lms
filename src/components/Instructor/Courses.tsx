import React, { useState } from 'react';
import { BookOpen, Plus, Users, Star, Edit, Eye, CheckCircle, Clock, ArrowLeft } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  status: 'published' | 'pending' | 'draft';
  enrolledStudents: number;
  rating: number;
  modules: number;
  assignments: number;
  createdDate: string;
  thumbnail: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  enrolledDate: string;
  progress: number;
  lastActivity: string;
}

const InstructorCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const courses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      description: 'Master the fundamentals of React including components, state, props, and hooks.',
      status: 'published',
      enrolledStudents: 324,
      rating: 4.8,
      modules: 8,
      assignments: 5,
      createdDate: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      description: 'Deep dive into advanced JavaScript concepts including async programming and ES6+ features.',
      status: 'published',
      enrolledStudents: 256,
      rating: 4.6,
      modules: 12,
      assignments: 8,
      createdDate: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
      status: 'pending',
      enrolledStudents: 0,
      rating: 0,
      modules: 10,
      assignments: 6,
      createdDate: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const enrolledStudents: Student[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      enrolledDate: '2024-01-16',
      progress: 85,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      enrolledDate: '2024-01-17',
      progress: 60,
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol@example.com',
      enrolledDate: '2024-01-18',
      progress: 92,
      lastActivity: '3 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (selectedCourse) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedCourse.description}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedCourse.status)}`}>
                    {selectedCourse.status}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {selectedCourse.enrolledStudents} students
                  </div>
                  {selectedCourse.rating > 0 && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 mr-1 text-yellow-400" />
                      {selectedCourse.rating}
                    </div>
                  )}
                </div>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Edit className="h-4 w-4" />
                <span>Edit Course</span>
              </button>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {['overview', 'students', 'submissions', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Total Students</p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{selectedCourse.enrolledStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600 dark:text-green-400">Modules</p>
                      <p className="text-2xl font-bold text-green-900 dark:text-green-100">{selectedCourse.modules}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Assignments</p>
                      <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{selectedCourse.assignments}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Rating</p>
                      <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{selectedCourse.rating || 'N/A'}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-4">
                {enrolledStudents.map((student) => (
                  <div key={student.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{student.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{student.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">{student.progress}%</div>
                        <p className="text-xs text-gray-500">Progress</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                        <span>Enrolled: {student.enrolledDate}</span>
                        <span>Last activity: {student.lastActivity}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="text-center py-12">
                <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No submissions yet</h3>
                <p className="text-gray-500 dark:text-gray-400">Student submissions will appear here once assignments are completed.</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Enrollment Trend</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">This Week</span>
                      <span className="font-medium text-gray-900 dark:text-white">+12 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                      <span className="font-medium text-gray-900 dark:text-white">+45 students</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedCourse.enrolledStudents} students</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Completion Rate</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                      <span className="font-medium text-green-600">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">In Progress</span>
                      <span className="font-medium text-blue-600">25%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Not Started</span>
                      <span className="font-medium text-gray-600">7%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and track your course content</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white">{course.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{course.description}</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Students</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.enrolledStudents}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Modules</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.modules}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Assignments</span>
                  <span className="font-medium text-gray-900 dark:text-white">{course.assignments}</span>
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Rating</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium text-gray-900 dark:text-white">{course.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </button>
                <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;