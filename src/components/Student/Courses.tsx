import React, { useState } from 'react';
import { BookOpen, Clock, PlayCircle, Star, Users, ChevronRight, ArrowLeft } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  progress: number;
  rating: number;
  enrolled: number;
  thumbnail: string;
  description: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

const StudentCourses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeTab, setActiveTab] = useState('modules');

  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'React Fundamentals',
      instructor: 'Jane Smith',
      duration: '12h 30m',
      progress: 85,
      rating: 4.8,
      enrolled: 1234,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master the fundamentals of React including components, state, props, and hooks.',
      modules: [
        {
          id: 'm1',
          title: 'Introduction to React',
          completed: true,
          lessons: [
            { id: 'l1', title: 'What is React?', duration: '15m', completed: true, videoUrl: '#' },
            { id: 'l2', title: 'Setting up React', duration: '20m', completed: true, videoUrl: '#' },
          ]
        },
        {
          id: 'm2',
          title: 'Components and JSX',
          completed: false,
          lessons: [
            { id: 'l3', title: 'Creating Components', duration: '25m', completed: true, videoUrl: '#' },
            { id: 'l4', title: 'JSX Syntax', duration: '18m', completed: false, videoUrl: '#' },
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Advanced JavaScript',
      instructor: 'John Doe',
      duration: '18h 45m',
      progress: 60,
      rating: 4.6,
      enrolled: 892,
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Deep dive into advanced JavaScript concepts including async programming, closures, and ES6+ features.',
      modules: [
        {
          id: 'm3',
          title: 'Async JavaScript',
          completed: true,
          lessons: [
            { id: 'l5', title: 'Promises', duration: '30m', completed: true, videoUrl: '#' },
            { id: 'l6', title: 'Async/Await', duration: '25m', completed: true, videoUrl: '#' },
          ]
        }
      ]
    }
  ];

  const availableCourses: Course[] = [
    {
      id: '3',
      title: 'Node.js Backend Development',
      instructor: 'Mike Johnson',
      duration: '24h 15m',
      progress: 0,
      rating: 4.9,
      enrolled: 567,
      thumbnail: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB.',
      modules: []
    }
  ];

  const assignments = [
    { id: 'a1', title: 'React Component Quiz', courseId: '1', dueDate: '2024-01-25', submitted: false, grade: null },
    { id: 'a2', title: 'JavaScript Promises Assignment', courseId: '2', dueDate: '2024-01-20', submitted: true, grade: 85 },
  ];

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedCourse.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedCourse.description}</p>
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm text-gray-500">by {selectedCourse.instructor}</span>
              <span className="text-sm text-gray-500">{selectedCourse.duration}</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="text-sm text-gray-500">{selectedCourse.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {['modules', 'assignments', 'grades'].map((tab) => (
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
            {activeTab === 'modules' && (
              <div className="space-y-4">
                {selectedCourse.modules.map((module) => (
                  <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-t-lg">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <PlayCircle className={`h-5 w-5 ${lesson.completed ? 'text-green-500' : 'text-gray-400'}`} />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{lesson.title}</p>
                              <p className="text-sm text-gray-500">{lesson.duration}</p>
                            </div>
                          </div>
                          {lesson.completed && (
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {assignments.filter(a => a.courseId === selectedCourse.id).map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        assignment.submitted ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {assignment.submitted ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Due: {assignment.dueDate}</p>
                    {!assignment.submitted && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Start Assignment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'grades' && (
              <div className="space-y-4">
                {assignments.filter(a => a.courseId === selectedCourse.id && a.submitted).map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Submitted: {assignment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{assignment.grade}%</div>
                        <p className="text-sm text-gray-500">Grade</p>
                      </div>
                    </div>
                  </div>
                ))}
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Courses</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Continue your learning journey</p>
      </div>

      {/* Enrolled Courses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Enrolled Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {course.instructor}</p>
                
                <div className="mb-4">
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

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Continue Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Courses */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableCourses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <img src={course.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {course.instructor}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{course.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    {course.enrolled}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;