import React from 'react';
import { Award, Download, Calendar, ExternalLink, Star } from 'lucide-react';

interface Certificate {
  id: string;
  courseName: string;
  instructor: string;
  completedDate: string;
  certificateUrl: string;
  grade: number;
  duration: string;
  skills: string[];
}

const StudentCertificates: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: '1',
      courseName: 'React Fundamentals',
      instructor: 'Jane Smith',
      completedDate: '2024-01-15',
      certificateUrl: '#',
      grade: 92,
      duration: '12h 30m',
      skills: ['React', 'JSX', 'Components', 'Hooks']
    },
    {
      id: '2',
      courseName: 'Advanced JavaScript',
      instructor: 'John Doe',
      completedDate: '2024-01-10',
      certificateUrl: '#',
      grade: 88,
      duration: '18h 45m',
      skills: ['ES6+', 'Async/Await', 'Promises', 'Closures']
    },
    {
      id: '3',
      courseName: 'CSS Grid & Flexbox',
      instructor: 'Sarah Wilson',
      completedDate: '2024-01-05',
      certificateUrl: '#',
      grade: 95,
      duration: '8h 20m',
      skills: ['CSS Grid', 'Flexbox', 'Responsive Design', 'Layout']
    }
  ];

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 90) return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    if (grade >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
    if (grade >= 70) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Certificates</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Your learning achievements and accomplishments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Certificates</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{certificates.length}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Award className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Average Grade</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Math.round(certificates.reduce((sum, cert) => sum + cert.grade, 0) / certificates.length)}%
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Skills Earned</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {Array.from(new Set(certificates.flatMap(cert => cert.skills))).length}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <ExternalLink className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Certificate Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeBadge(certificate.grade)}`}>
                  {certificate.grade}% Grade
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{certificate.courseName}</h3>
              <p className="text-green-100">Certificate of Completion</p>
            </div>

            {/* Certificate Body */}
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Instructor:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{certificate.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{certificate.duration}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">{certificate.completedDate}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Skills Acquired:</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Online
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No certificates yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Complete courses to earn certificates and showcase your achievements.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentCertificates;