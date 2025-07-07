import React, { useState } from 'react';
import { FileText, Clock, CheckCircle, Star, Eye, MessageSquare, Calendar } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  courseName: string;
  studentName: string;
  studentEmail: string;
  submittedDate: string;
  dueDate: string;
  status: 'submitted' | 'graded' | 'late';
  grade?: number;
  feedback?: string;
  submissionContent: string;
}

const InstructorAssignments: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [gradeInput, setGradeInput] = useState('');
  const [feedbackInput, setFeedbackInput] = useState('');

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'React Components Quiz',
      courseName: 'React Fundamentals',
      studentName: 'Alice Johnson',
      studentEmail: 'alice@example.com',
      submittedDate: '2024-01-20',
      dueDate: '2024-01-25',
      status: 'submitted',
      submissionContent: 'This is my submission for the React Components quiz. I have completed all the required components and implemented the state management as requested.'
    },
    {
      id: '2',
      title: 'JavaScript Promises Assignment',
      courseName: 'Advanced JavaScript',
      studentName: 'Bob Smith',
      studentEmail: 'bob@example.com',
      submittedDate: '2024-01-18',
      dueDate: '2024-01-20',
      status: 'graded',
      grade: 85,
      feedback: 'Great work! Your understanding of async programming is solid. Consider exploring error handling patterns.',
      submissionContent: 'I have built a weather app using promises and async/await as requested. The application handles API calls properly and includes error handling.'
    },
    {
      id: '3',
      title: 'CSS Flexbox Layout',
      courseName: 'Web Design Fundamentals',
      studentName: 'Carol Davis',
      studentEmail: 'carol@example.com',
      submittedDate: '2024-01-22',
      dueDate: '2024-01-15',
      status: 'late',
      submissionContent: 'Sorry for the late submission. I have created a responsive layout using CSS Flexbox with all the required components.'
    }
  ];

  const getFilteredAssignments = () => {
    switch (activeTab) {
      case 'pending':
        return assignments.filter(a => a.status === 'submitted' || a.status === 'late');
      case 'graded':
        return assignments.filter(a => a.status === 'graded');
      case 'all':
        return assignments;
      default:
        return assignments;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'graded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'late':
        return <Clock className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'graded':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'late':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const handleGradeSubmission = () => {
    // Here you would typically save to backend
    console.log('Grading submission:', { grade: gradeInput, feedback: feedbackInput });
    setSelectedAssignment(null);
    setGradeInput('');
    setFeedbackInput('');
  };

  if (selectedAssignment) {
    return (
      <div className="p-6">
        <button
          onClick={() => setSelectedAssignment(null)}
          className="flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          ← Back to Assignments
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedAssignment.title}</h1>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>by {selectedAssignment.studentName}</span>
                  <span>{selectedAssignment.courseName}</span>
                  <span>Submitted: {selectedAssignment.submittedDate}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(selectedAssignment.status)}`}>
                {selectedAssignment.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                <span>Due: {selectedAssignment.dueDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                <span>Submitted: {selectedAssignment.submittedDate}</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-gray-400" />
                <span>{selectedAssignment.studentEmail}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Student Submission</h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
              <p className="text-gray-700 dark:text-gray-300">{selectedAssignment.submissionContent}</p>
            </div>

            {selectedAssignment.status === 'graded' ? (
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-green-800 dark:text-green-300">Grade</h4>
                    <div className="text-2xl font-bold text-green-600">{selectedAssignment.grade}%</div>
                  </div>
                  <p className="text-green-700 dark:text-green-400 text-sm">{selectedAssignment.feedback}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-white">Grade Assignment</h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter grade"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Feedback
                  </label>
                  <textarea
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Provide feedback to the student..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleGradeSubmission}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Submit Grade
                  </button>
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignment Reviews</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Grade and provide feedback on student submissions</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'pending', label: 'Pending Review', count: assignments.filter(a => a.status === 'submitted' || a.status === 'late').length },
              { key: 'graded', label: 'Graded', count: assignments.filter(a => a.status === 'graded').length },
              { key: 'all', label: 'All Submissions', count: assignments.length }
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
                      <p className="text-sm text-gray-500 dark:text-gray-500">by {assignment.studentName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {assignment.dueDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Submitted: {assignment.submittedDate}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    {assignment.grade && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{assignment.grade}%</div>
                        <p className="text-xs text-gray-500">Grade</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedAssignment(assignment)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span>{assignment.status === 'graded' ? 'View' : 'Review'}</span>
                    </button>
                  </div>
                </div>
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

export default InstructorAssignments;