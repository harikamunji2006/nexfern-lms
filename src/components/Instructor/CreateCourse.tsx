import React, { useState } from 'react';
import { Plus, X, Upload, Video, FileText, Clock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoFile?: File;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  type: 'quiz' | 'project' | 'essay';
}

const CreateCourse: React.FC = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: 'beginner',
    estimatedDuration: '',
    thumbnail: null as File | null
  });

  const [modules, setModules] = useState<Module[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState('basic');

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: '',
      lessons: []
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (moduleId: string, title: string) => {
    setModules(modules.map(module => 
      module.id === moduleId ? { ...module, title } : module
    ));
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: '',
      duration: ''
    };
    
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: [...module.lessons, newLesson] }
        : module
    ));
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? {
            ...module,
            lessons: module.lessons.map(lesson =>
              lesson.id === lessonId ? { ...lesson, [field]: value } : lesson
            )
          }
        : module
    ));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, lessons: module.lessons.filter(lesson => lesson.id !== lessonId) }
        : module
    ));
  };

  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: '',
      description: '',
      dueDate: '',
      type: 'quiz'
    };
    setAssignments([...assignments, newAssignment]);
  };

  const updateAssignment = (assignmentId: string, field: string, value: string) => {
    setAssignments(assignments.map(assignment =>
      assignment.id === assignmentId ? { ...assignment, [field]: value } : assignment
    ));
  };

  const deleteAssignment = (assignmentId: string) => {
    setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
  };

  const handleSubmit = () => {
    // Here you would typically save to backend
    console.log('Course Data:', { courseData, modules, assignments });
    alert('Course submitted for review! You will be notified once it\'s approved.');
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Course</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Build and publish your course content</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { key: 'basic', label: 'Basic Info' },
              { key: 'modules', label: 'Modules & Lessons' },
              { key: 'assignments', label: 'Assignments' },
              { key: 'review', label: 'Review & Submit' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    value={courseData.title}
                    onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category *
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => setCourseData({...courseData, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select category</option>
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="business">Business</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level *
                  </label>
                  <select
                    value={courseData.difficulty}
                    onChange={(e) => setCourseData({...courseData, difficulty: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={courseData.estimatedDuration}
                    onChange={(e) => setCourseData({...courseData, estimatedDuration: e.target.value})}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 10 hours"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Description *
                </label>
                <textarea
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                  rows={6}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe what students will learn in this course..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course Thumbnail
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 2MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Modules Tab */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Modules</h3>
                <button
                  onClick={addModule}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Module</span>
                </button>
              </div>

              {modules.map((module, moduleIndex) => (
                <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <input
                      type="text"
                      value={module.title}
                      onChange={(e) => updateModule(module.id, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mr-4"
                      placeholder={`Module ${moduleIndex + 1} Title`}
                    />
                    <button
                      onClick={() => deleteModule(module.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white">Lessons</h4>
                      <button
                        onClick={() => addLesson(module.id)}
                        className="text-green-600 hover:text-green-700 text-sm flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Lesson</span>
                      </button>
                    </div>

                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                          placeholder={`Lesson ${lessonIndex + 1} Title`}
                        />
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => updateLesson(module.id, lesson.id, 'duration', e.target.value)}
                          className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-600 text-gray-900 dark:text-white"
                          placeholder="Duration (e.g., 15m)"
                        />
                        <div className="flex items-center space-x-2">
                          <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors flex items-center justify-center">
                            <Video className="h-4 w-4 mr-1" />
                            Upload Video
                          </button>
                          <button
                            onClick={() => deleteLesson(module.id, lesson.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {modules.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No modules yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Start by adding your first course module</p>
                  <button
                    onClick={addModule}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add First Module
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Course Assignments</h3>
                <button
                  onClick={addAssignment}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Assignment</span>
                </button>
              </div>

              {assignments.map((assignment, index) => (
                <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Assignment {index + 1}</h4>
                    <button
                      onClick={() => deleteAssignment(assignment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={assignment.title}
                      onChange={(e) => updateAssignment(assignment.id, 'title', e.target.value)}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Assignment Title"
                    />
                    <select
                      value={assignment.type}
                      onChange={(e) => updateAssignment(assignment.id, 'type', e.target.value)}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="quiz">Quiz</option>
                      <option value="project">Project</option>
                      <option value="essay">Essay</option>
                    </select>
                  </div>

                  <textarea
                    value={assignment.description}
                    onChange={(e) => updateAssignment(assignment.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4"
                    placeholder="Assignment description and requirements..."
                  />

                  <input
                    type="date"
                    value={assignment.dueDate}
                    onChange={(e) => updateAssignment(assignment.id, 'dueDate', e.target.value)}
                    className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              ))}

              {assignments.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No assignments yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">Add assignments to test student knowledge</p>
                  <button
                    onClick={addAssignment}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add First Assignment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Review Tab */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Review Your Course</h3>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-4">Course Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Title:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{courseData.title || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{courseData.category || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white capitalize">{courseData.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{courseData.estimatedDuration || 'Not set'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Modules:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{modules.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Assignments:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{assignments.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Submission Notice</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  Once you submit this course, it will be sent to administrators for review. 
                  You'll be notified via email once the review is complete. The course will be 
                  published and available to students after approval.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit for Review
                </button>
                <button className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors">
                  Save as Draft
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;