import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentDashboard from './Student module/StudentDashboard'
import SupervisorDashboard from './Supervisor module/SupervisorDashboard'
import AdminDashboard from './Admin module/AdminDashboard'
import './App.css'
import StudentLoginModal from './Student module/StudentLoginModal';
import SupervisorLoginModal from './Supervisor module/SupervisorLoginModal';
import AdminLoginModal from './Admin module/AdminLoginModal';
import ForgotPasswordModal from './ForgotPasswordModal';

function App() {
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const handleForgotPassword = () => {
    setShowStudentModal(false);
    setShowSupervisorModal(false);
    setShowAdminModal(false);
    setShowForgotPasswordModal(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto px-4 py-8">
            <div className="bg-circle-left"></div>
            <div className="bg-circle-right"></div>
            
            {/* Floating bubbles for additional glassmorphism effect */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-cyan-100 opacity-20 blur-3xl"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-100 opacity-15 blur-3xl"></div>
            
            <div className="max-w-4xl mx-auto">
              {/* Logo and System Name */}
              <div className="flex flex-col items-center mb-10">
                <div className="logo-container w-20 h-20 rounded-full flex items-center justify-center shadow-lg mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -mt-8">
                    <path d="M12 4V2"></path>
                    <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4"></path>
                    <path d="M12 8V4"></path>
                    <path d="M8 8V6"></path>
                    <path d="M16 8V6"></path>
                  </svg>
                </div>
                <h1 className="text-2xl font-semibold text-gray-700">Postgraduate Project Management System</h1>
              </div>
              
              {/* Welcome Card */}
              <div className="glass-card p-10 mb-10">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome</h2>
                <p className="text-center text-gray-600 mb-8">Log in as your role to continue</p>
                
                {/* Role Selection Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Card */}
                  <div 
                    className="glass-card p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setShowStudentModal(true)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Student</h3>
                      <p className="text-gray-600">Access your project portal</p>
                    </div>
                  </div>
                  
                  {/* Supervisor Card */}
                  <div 
                    className="glass-card p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setShowSupervisorModal(true)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Supervisor</h3>
                      <p className="text-gray-600">Manage your students</p>
                    </div>
                  </div>
                  
                  {/* Admin Card */}
                  <div 
                    className="glass-card p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setShowAdminModal(true)}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin</h3>
                      <p className="text-gray-600">System Management</p>
                    </div>
                  </div>
                </div>
                
                {/* Forgot Password Link */}
                <div className="text-center mt-8">
                  <a href="#" className="text-blue-600 hover:text-blue-800 text-sm" onClick={handleForgotPassword}>Forgot Password?</a>
                  
                </div>
              </div>
              
              {/* Footer */}
              <div className="text-center">
                <p className="text-xs text-gray-500 inline-block footer-text">© 2025 PGPMS Portal. All rights reserved.</p>
              </div>
            </div>
            <StudentLoginModal 
              isOpen={showStudentModal} 
              onClose={() => setShowStudentModal(false)} 
              onForgotPassword={handleForgotPassword}
            />
            <SupervisorLoginModal 
              isOpen={showSupervisorModal} 
              onClose={() => setShowSupervisorModal(false)} 
              onForgotPassword={handleForgotPassword}
            />
            <AdminLoginModal 
              isOpen={showAdminModal} 
              onClose={() => setShowAdminModal(false)} 
              onForgotPassword={handleForgotPassword}
            />
            <ForgotPasswordModal
              isOpen={showForgotPasswordModal}
              onClose={() => setShowForgotPasswordModal(false)}
            />
          </div>
        } />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/supervisor" element={<SupervisorDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
