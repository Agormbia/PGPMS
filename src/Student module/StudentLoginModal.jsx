import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLoginModal = ({ isOpen, onClose}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after a small delay
      setTimeout(() => setIsVisible(true), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Wait for animation to complete before closing
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      handleClose();
      navigate('/student');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black transition-opacity duration-300 ${isVisible ? 'bg-opacity-50' : 'bg-opacity-0'}`}>
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          ref={modalRef}
          className={`w-full max-w-md transform transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden p-8">
            {/* Icon Section */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  <path d="M19 16v6"></path>
                  <path d="M22 19l-3 3-3-3"></path>
                </svg>
              </div>
            </div>
            
            {/* Title Section */}
            <div className="text-center mb-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Login as Student</h2>
              <p className="text-sm text-gray-500 mb-8">Use your student ID and password to continue</p>
            </div>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Student ID Field */}
              <div className="input-container">
                <label htmlFor="student-id" className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
        <input
          type="text"
                  id="student-id" 
                  className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-0"
                  placeholder="Enter your student ID" 
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="input-container">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
        <input
                    type={showPassword ? "text" : "password"} 
                    id="password" 
                    className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-0 pr-10"
                    placeholder="Enter your password" 
                    required
                  />
                  <button 
                    type="button" 
                    className="password-toggle absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Login Button */}
              <button 
                type="submit" 
                className="login-btn w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
              
              {/* Back Link */}
              <div className="text-center">
                <button 
                  onClick={handleClose}
                  className="back-link inline-flex items-center text-sm font-medium text-gray-500 hover:text-purple-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Back to Role Selection
                </button>
              </div>

              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginModal;