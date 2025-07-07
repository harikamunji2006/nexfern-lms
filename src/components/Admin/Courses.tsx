import React, { useState } from 'react';
import { BookOpen, Eye, CheckCircle, X, Clock, Users, Star, Filter } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorEmail: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  enrolledStudents: number;
  rating?: number;
  category: string;
  modules: number;
  assignments: number;
}

const AdminCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const courses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      instructor: 'Jane Smith',
      instructorEmail: 'jane@example.com',
      description: 'Master the fundamentals of React including components, state, props, and hooks.',
      status: 'approved',
      submittedDate: '2024-01-15',
      enrolledStudents: 324,
      rating: 4.8,
      category: 'Programming',
      modules: 8,
      assignments: 5
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      instructorEmail: 'john@example.com',
      description: 'Deep dive into advanced JavaScript concepts including async programming and ES6+ features.',
      status: 'approved',
      submittedDate: '2024-01-10',
      enrolledStudents: 256,
      rating: 4.6,
      category: 'Programming',
      modules: 12,
      assignments: 8
    },
    {
      id: '3',
      title: 'Node.js Backend Development',
      instructor: 'Mike Johnson',
      instructorEmail: 'mike@example.com',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
      status: 'pending',
      submittedDate: '2024-01-20',
      enrolledStudents: 0,
      category: 'Programming',
      modules: 10,
      assignments: 6
    },
    {
      id: '4',
      title: 'UI/UX Design Principles',
      instructor: 'Sarah Wilson',
      instructorEmail: 'sarah@example.com',
      description: 'Learn the fundamentals of user interface and user experience design.',
      status: 'pending',
      submittedDate: '2024-01-22',
      enrolledStudents: 0,
      category: 'Design',
      modules: 6,
      assignments: 4
    },
    {
      id: '5',
      title: 'Python for Data Science',
      instructor: 'David Chen',
      instructorEmail: 'david@example.com',
      description: 'Introduction to Python programming for data analysis and machine learning.',
      status: 'rejected',
      submittedDate: '2024-01-18',
      enrolledStudents: 0,
      category: 'Data Science',
      modules: 15,
      assignments: 10
    }
  ];

  const getFilteredCourses = () => {
    switch (activeFilter) {
      case 'pending':
        return courses.filter(c => c.status === 'pending');
      case 'approved':
        return courses.filter(c => c.status === 'approved');
      case 'rejected':
        return courses.filter(c => c.status === 'rejected');
      default:
        return courses;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleApprove = (courseId: string) => {
    console.log('Approving course:', courseId);
    // Here you would typically update the backend
    alert('Course approved successfully!');
  };

  const handleReject = (courseId: string) => {
    console.log('Rejecting course:', courseId);
    // Here you would typically update the backend
    alert('Course rejected.');
  };

  if (selectedCourse) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedCourse(null)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          ← Back to Courses
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>by {selectedCourse.instructor}</span>
                  <span>{selectedCourse.instructorEmail}</span>
                  <span>Submitted: {selectedCourse.submittedDate}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(selectedCourse.status)}`}>
                {selectedCourse.status}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Category</p>
                    <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">{selectedCourse.category}</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 dark:text-green-400">Modules</p>
                    <p className="text-lg font-semibold text-green-900 dark:text-green-100">{selectedCourse.modules}</p>
                  </div>
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Assignments</p>
                    <p className="text-lg font-semibold text-purple-900 dark:text-purple-100">{selectedCourse.assignments}</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Students</p>
                    <p className="text-lg font-semibold text-orange-900 dark:text-orange-100">{selectedCourse.enrolledStudents}</p>
                  </div>
                  <Users className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Course Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{selectedCourse.description}</p>
            </div>

            {selectedCourse.status === 'pending' && (
              <div className="flex space-x-4">
                <button
                  onClick={() => handleApprove(selectedCourse.id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Approve Course</span>
                </button>
                <button
                  onClick={() => handleReject(selectedCourse.id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Reject Course</span>
                </button>
              </div>
            )}

            {selectedCourse.status === 'approved' && selectedCourse.rating && (
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-semibold text-green-800 dark:text-green-300">
                    Course Rating: {selectedCourse.rating}/5
                  </span>
                </div>
                <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                  This course has been approved and is performing well with students.
                </p>
              </div>
            )}

            {selectedCourse.status === 'rejected' && (
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Course Rejected</h4>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  This course was rejected due to content quality issues. The instructor has been notified.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Review and manage all courses on the platform</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Filter Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'all', label: 'All Courses', count: courses.length },
              { key: 'pending', label: 'Pending Review', count: courses.filter(c => c.status === 'pending').length },
              { key: 'approved', label: 'Approved', count: courses.filter(c => c.status === 'approved').length },
              { key: 'rejected', label: 'Rejected', count: courses.filter(c => c.status === 'rejected').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeFilter === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeFilter === tab.key ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {getFilteredCourses().map((course) => (
              <div key={course.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{course.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>by {course.instructor}</span>
                      <span>{course.category}</span>
                      <span>Submitted: {course.submittedDate}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.modules} modules
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {course.assignments} assignments
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.enrolledStudents} students
                    </div>
                    {course.rating && (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {course.rating}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    
                    {course.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(course.id)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleReject(course.id)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
                        >
                          <X className="h-4 w-4" />
                          <span>Reject</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {getFilteredCourses().length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No courses found</h3>
                <p className="text-gray-500 dark:text-gray-400">No courses match the current filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;