import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, FileText, Star } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  dueDate: string;
  submitted: boolean;
  grade?: number;
  feedback?: string;
  description: string;
  type: 'quiz' | 'project' | 'essay';
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
}

const StudentAssignments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'React Components Quiz',
      courseName: 'React Fundamentals',
      dueDate: '2024-01-25',
      submitted: false,
      description: 'Test your knowledge of React components, props, and state management.',
      type: 'quiz',
      status: 'pending'
    },
    {
      id: '2',
      title: 'JavaScript Promises Assignment',
      courseName: 'Advanced JavaScript',
      dueDate: '2024-01-20',
      submitted: true,
      grade: 85,
      feedback: 'Great work! Your understanding of async programming is solid. Consider exploring error handling patterns.',
      description: 'Build a weather app using promises and async/await.',
      type: 'project',
      status: 'graded'
    },
    {
      id: '3',
      title: 'CSS Flexbox Layout',
      courseName: 'Web Design Fundamentals',
      dueDate: '2024-01-15',
      submitted: true,
      grade: 92,
      feedback: 'Excellent implementation of flexbox concepts!',
      description: 'Create a responsive layout using CSS Flexbox.',
      type: 'project',
      status: 'graded'
    },
    {
      id: '4',
      title: 'Database Design Essay',
      courseName: 'Database Systems',
      dueDate: '2024-01-10',
      submitted: false,
      description: 'Write an essay on database normalization principles.',
      type: 'essay',
      status: 'overdue'
    }
  ];

  const getFilteredAssignments = () => {
    switch (activeTab) {
      case 'pending':
        return assignments.filter(a => a.status === 'pending');
      case 'submitted':
        return assignments.filter(a => a.status === 'submitted' || a.status === 'graded');
      case 'graded':
        return assignments.filter(a => a.status === 'graded');
      case 'overdue':
        return assignments.filter(a => a.status === 'overdue');
      default:
        return assignments;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'submitted':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'graded':
        return <Star className="h-5 w-5 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Track your assignments and submissions</p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
              { key: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted' || a.status === 'graded').length },
              { key: 'graded', label: 'Graded', count: assignments.filter(a => a.status === 'graded').length },
              { key: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.key ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
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
            {getFilteredAssignments().map((assignment) => (
              <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {getStatusIcon(assignment.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{assignment.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.courseName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">{assignment.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {assignment.dueDate}
                    </div>
                    <span className="capitalize">{assignment.type}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    {assignment.grade && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{assignment.grade}%</div>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                    )}
                    
                    {assignment.status === 'pending' && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        Start Assignment
                      </button>
                    )}
                    
                    {assignment.status === 'overdue' && (
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                        Submit Late
                      </button>
                    )}
                    
                    {(assignment.status === 'submitted' || assignment.status === 'graded') && (
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        View Submission
                      </button>
                    )}
                  </div>
                </div>

                {assignment.feedback && (
                  <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Instructor Feedback</h4>
                    <p className="text-green-700 dark:text-green-400 text-sm">{assignment.feedback}</p>
                  </div>
                )}
              </div>
            ))}

            {getFilteredAssignments().length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assignments found</h3>
                <p className="text-gray-500 dark:text-gray-400">No assignments in this category yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignments;