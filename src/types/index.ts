export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  dateJoined: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  duration: string;
  progress?: number;
  status: 'active' | 'pending' | 'completed';
  enrolledStudents: number;
  rating: number;
  thumbnail: string;
  modules: Module[];
  assignments: Assignment[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  submitted: boolean;
  grade?: number;
  feedback?: string;
  description: string;
}

export interface Discussion {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  replies: Reply[];
  createdAt: string;
}

export interface Reply {
  id: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  completedDate: string;
  certificateUrl: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  activeCourses: number;
  pendingApprovals: number;
  revenue: number;
  userGrowth: { month: string; students: number; instructors: number }[];
  coursePerformance: { courseName: string; enrollments: number; completionRate: number }[];
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeCourses: number;
  pendingApprovals: number;
  revenue: number;
}

export interface SystemHealthItem {
  label: string;
  status: string;
  value: string;
}

export interface PendingCourse {
  course_id: string;
  name: string;
  instructor_id: string;
  created_at: string;
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  time: string;
}