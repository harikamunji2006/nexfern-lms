import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';

// Student Components
import StudentDashboard from './components/Student/Dashboard';
import StudentCourses from './components/Student/Courses';
import StudentAssignments from './components/Student/Assignments';
import StudentDiscussions from './components/Student/Discussions';
import StudentCertificates from './components/Student/Certificates';
import StudentProfile from './components/Student/Profile';
import StudentSettings from './components/Student/Settings';

// Instructor Components
import InstructorDashboard from './components/Instructor/Dashboard';
import InstructorCourses from './components/Instructor/Courses';
import InstructorAssignments from './components/Instructor/Assignments';
import InstructorDiscussions from './components/Instructor/Discussions';
import CreateCourse from './components/Instructor/CreateCourse';
import InstructorProfile from './components/Instructor/Profile';
import InstructorSettings from './components/Instructor/Settings';

// Admin Components
import AdminDashboard from './components/Admin/Dashboard';
import AdminCourses from './components/Admin/Courses';
import AdminUsers from './components/Admin/Users';
import AdminAnalytics from './components/Admin/Analytics';
import AdminProfile from './components/Admin/Profile';
import AdminSettings from './components/Admin/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              
              {/* Student Routes */}
              <Route path="/student/*" element={
                <ProtectedRoute requiredRole="student">
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<StudentDashboard />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="discussions" element={<StudentDiscussions />} />
                <Route path="certificates" element={<StudentCertificates />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="settings" element={<StudentSettings />} />
              </Route>

              {/* Instructor Routes */}
              <Route path="/instructor/*" element={
                <ProtectedRoute requiredRole="instructor">
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<InstructorDashboard />} />
                <Route path="courses" element={<InstructorCourses />} />
                <Route path="assignments" element={<InstructorAssignments />} />
                <Route path="discussions" element={<InstructorDiscussions />} />
                <Route path="create-course" element={<CreateCourse />} />
                <Route path="profile" element={<InstructorProfile />} />
                <Route path="settings" element={<InstructorSettings />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/*" element={
                <ProtectedRoute requiredRole="admin">
                  <Layout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;