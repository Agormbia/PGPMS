import { useState, useCallback, useEffect, useRef } from 'react';
import NotificationPopup from './NotificationPopup';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
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
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowNotification(true);
      // Reset form
      setEmail('');
      // Close modal after showing notification
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
              </div>
              
              {/* Title Section */}
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Reset Password</h2>
                <p className="text-sm text-gray-500 mb-8">Enter your email to receive a password reset link</p>
              </div>
              
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="input-container">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-0"
                    placeholder="Enter your email" 
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <button 
                  type="submit" 
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
                
                {/* Back Link */}
                <div className="text-center">
                  <button 
                    onClick={handleClose}
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <NotificationPopup 
        isVisible={showNotification} 
        onClose={() => setShowNotification(false)} 
      />
    </>
  );
};

export default ForgotPasswordModal; 