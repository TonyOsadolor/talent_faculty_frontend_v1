import { Routes, Route, Navigate } from 'react-router-dom'
import App from '../App'
import Login from '../pages/auth/Login'
import Signupemail from '../pages/auth/SignupEmail.tsx'
import SignupSubmitDetails from '../pages/auth/SignupSubmitDetails.tsx'
import Signup11 from '../pages/auth/Signup11'
import Dashboard from '../pages/student/Dashboard'
import MyCourses from '../pages/student/MyCourses'
import SignupVerifyEmail from '../pages/auth/SignupVerifyEmail.tsx'
import Signup6 from '../pages/auth/Signup6'
import Signup9 from '../pages/auth/Signup9'
import Signup10 from '../pages/auth/Signup10.tsx'
import Messages from '../pages/student/Messages.tsx'
import Notifications from '../pages/student/Notifications.tsx'
import MyProfile from '../pages/student/MyProfile.tsx'
import Settings from '../pages/student/Settings.tsx'
import Help$Support from '../pages/student/Help & Support.tsx'
import Welcome from '../pages/auth/Welcome.tsx'
import PasswordReset from '../pages/auth/PasswordReset.tsx'
import Assignments from '../pages/student/Assignment.tsx'
import Assessments from '../pages/student/Assessment.tsx'
import Progress from '../pages/student/Progress.tsx'
import Certificates from '../pages/student/Certificates.tsx'
import InstructorDashboard from '../pages/instructor/Dashboard.tsx'
import CreateCourse from '../pages/instructor/CreateCourse.tsx'
import InstructorLayout from '../components/layout/instruct/DashboardLayout.tsx'
import AdminDashboard from '../pages/admin/Dashboard.tsx'
import AdminCourses from '../pages/admin/Courses.tsx'
import AdminUsers from '../pages/admin/Users.tsx'
import AdminNotifications from '../pages/admin/Notifications.tsx'
import AdminAnnouncements from '../pages/admin/Announcement.tsx'
import AdminCohorts from '../pages/admin/Cohorts.tsx'
import AdminProfile from '../pages/admin/profile.tsx'
import InSignup6 from '../pages/auth/instructor/Signup6.tsx'
import InPasswordReset from '../pages/auth/instructor/PasswordReset.tsx'
import InSignup9 from '../pages/auth/instructor/Signup9.tsx'
import InSignup10 from '../pages/auth/instructor/Signup10.tsx'
import AdSignup6 from '../pages/auth/admin/Signup6.tsx'
import AdPasswordReset from '../pages/auth/admin/PasswordReset.tsx'
import AdSignup9 from '../pages/auth/admin/Signup9.tsx'
import AdSignup10 from '../pages/auth/admin/Signup10.tsx'

import InstructorCourses from '../pages/instructor/courses/Courses.tsx'
import ManageCourse from '../pages/instructor/courses/ManageCourse.tsx'
import Assignment from '../pages/instructor/courses/Assignment.tsx'
import Quiz from '../pages/instructor/courses/Quiz.tsx'
import Pdf from '../pages/instructor/courses/Pdf.tsx'
import LinkResource from '../pages/instructor/courses/Link.tsx'
import VideoResource from '../pages/instructor/courses/Video.tsx'
import ReportsAnalytics from '../pages/instructor/courses/Report.tsx'
import Learners from '../pages/instructor/learners/Learners.tsx'
import LearnerProfile from '../pages/instructor/learners/LearnerProfile.tsx'
import AssessmentManagement from '../pages/instructor/assessments/AssessmentManagement.tsx'
import AssignmentGrading from '../pages/instructor/assessments/AssignmentGrading.tsx'
import MeetTheTeam from '../pages/MeetTheTeam'

import TakeQuiz from '../components/common/instructor/learners/TakeQuiz.tsx'
import AdminCertificates from '../pages/admin/Certificates.tsx'
import EditCertificate from '../components/layout/admin/EditCertificate.tsx'
import GenerateCertificate from '../components/layout/admin/GenerateCertificate.tsx'
import GenerateCertificatesReport from '../components/layout/admin/GenerateCertificatesReport.tsx'
import AdminSignin from '../pages/auth/admin/signin.tsx'
import SignupAdminDetails from '../pages/auth/admin/signup.tsx'
import InstructorSignin from '../pages/auth/instructor/signin.tsx'
import SignupInstructorDetails from '../pages/auth/instructor/signup.tsx'

import Cohorts from "../pages/admin/Cohorts";
import CohortDetail from "../pages/admin/CohortDetail";
import CohortForm from "../pages/admin/CohortForm";
import GenerateCohortReport from "../pages/admin/GenerateCohortReport";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/team" element={<MeetTheTeam />} />
      <Route path="/meet-the-team" element={<MeetTheTeam />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup-email" element={<Signupemail />} />

      {/* Student sign up flow */}
      <Route path="/signup-verify-email" element={<SignupVerifyEmail />} />
      <Route path="/signup-submit-details" element={<SignupSubmitDetails />} />
      <Route path="/signup10" element={<Signup10 />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Password reset flow: Request -> Verify -> Reset */}
      <Route path="/passwordReset" element={<PasswordReset />} />
      <Route path="/signup6" element={<Signup6 />} />
      <Route path="/signup9" element={<Signup9 />} />

      {/* Tutor / faculty sign up flow */}
      <Route path="/signup11" element={<Signup11 />} />

      {/* Legacy generic /signup link -> send to the student sign up flow */}
      <Route path="/signup" element={<Navigate to="/signup-email" replace />} />
      <Route path="/signup-verify-email" element={<Navigate to="/signup-verify-email" replace />} />
      <Route path="/signup-submit-details" element={<Navigate to="/signup-submit-details" replace />} />

      {/* Student Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<MyCourses />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/assessments" element={<Assessments />} />
      <Route path="assessments/:id/take" element={<TakeQuiz />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/help" element={<Help$Support />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/certificates" element={<Certificates />} />

      {/* Admin */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/announcements" element={<AdminAnnouncements />} />
      <Route path="/admin/cohorts" element={<AdminCohorts />} />
      <Route path="/admin/certificates" element={<AdminCertificates />} />
      <Route path="/admin/certificates/:id/edit" element={<EditCertificate />} />
      <Route path="/admin/certificates/generate" element={<GenerateCertificate />} />
      <Route path="/admin/certificates/reports" element={<GenerateCertificatesReport />} />
      <Route path="/admin/profile" element={<AdminProfile /> }/>

      {/* Admin sign in flow */}
      <Route path="/admin/signin" element={<AdminSignin />} />

      {/* Admin Sign Up flow */}
      <Route path="/admin/signup" element={<SignupAdminDetails />} />

      {/* Instructor sign in flow */}
      <Route path="/instructor/signin" element={<InstructorSignin />} />

      {/* Instructor Sign Up flow */}
      <Route path="/instructor/signup" element={<SignupInstructorDetails />} />

      <Route path="/admin/cohorts" element={<Cohorts />} />
      <Route path="/admin/cohorts/new" element={<CohortForm />} />
      <Route path="/admin/cohorts/report" element={<GenerateCohortReport />} />
      <Route path="/admin/cohorts/:id" element={<CohortDetail />} />
      <Route path="/admin/cohorts/:id/edit" element={<CohortForm />} />


      {/* Instructor Password Reset Flow */}
      <Route path="/instructor/passwordReset" element={<InPasswordReset />} />
      <Route path="/instructor/signup6" element={<InSignup6 />} />
      <Route path="/instructor/signup9" element={<InSignup9 />} />
      <Route path="/instructor/signup10" element={<InSignup10 />} />

      {/* Admin Password Reset Flow */}
      <Route path="/admin/passwordReset" element={<AdPasswordReset />} />
      <Route path="/admin/signup6" element={<AdSignup6 />} />
      <Route path="/admin/signup9" element={<AdSignup9 />} />
      <Route path="/admin/signup10" element={<AdSignup10 />} />

      {/* Instructor Dashboard */}
      <Route path="/instructor" element={<InstructorLayout />}>
        <Route path='/instructor/assessments' element={<AssessmentManagement />} />
        <Route path="/instructor/assessments/:id" element={<AssignmentGrading />} />
        <Route index element={<Navigate to="/instructor/dashboard" replace />} />
        <Route path="dashboard" element={<InstructorDashboard />} />
        <Route path="create-course" element={<CreateCourse />} />
        <Route path="CreateCourse" element={<CreateCourse />} />
        <Route path="courses" element={<InstructorCourses />} />
        <Route path="courses/:courseId" element={<ManageCourse />} />
        <Route path="courses/assignment" element={<Assignment />} />
        <Route path="courses/quiz" element={<Quiz />} />
        <Route path="courses/pdf" element={<Pdf />} />
        <Route path="courses/link" element={<LinkResource />} />
        <Route path="courses/video" element={<VideoResource />} />
        <Route path="report" element={<ReportsAnalytics />} />

        <Route path="learners" element={<Navigate to="/instructor/learners/all" replace />} />
        <Route path="learners/:learnerId/:tab" element={<LearnerProfile />} />
        <Route path="learners/:status" element={<Learners />} />
      </Route>

      {/* Catch-all fallback route at the end */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
