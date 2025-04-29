import { useState, useEffect, useRef, useCallback } from 'react';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [accountType, setAccountType] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen, handleClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!accountType) {
      alert('Please select your account type');
      return;
    }
    
    if (!userId) {
      alert('Please enter your email');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      alert(`Password reset link will be sent to ${userId} (${accountType})`);
      setIsLoading(false);
      handleClose();
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
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
            </div>
            
            {/* Title Section */}
            <div className="text-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
              <p className="text-gray-500 mt-2">Enter your email to receive password reset instructions.</p>
            </div>
            
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mt-6">
              {/* Account Type Dropdown */}
              <div className="mb-4">
                <label htmlFor="account-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <div className="relative">
                  <select
                    id="account-type"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition appearance-none"
                  >
                    <option value="" disabled>Select your role</option>
                    <option value="student">Student</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Registered ID Input */}
              <div className="mb-6">
                <label htmlFor="user-id" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your email
                </label>
                <input
                  type="text"
                  id="user-id"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
                />
              </div>
              <p className="text-gray-500 mt-2" style={{fontSize: '12px', textAlign: 'center'}}>An email will be sent to you to reset your password.</p>

              
              {/* Action Buttons */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mb-4 transition-colors duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                    
                  </div>
                ) :
                 (
                  'Send Reset Link'
                )}
              </button>
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal; 