import { useEffect, useState } from 'react';

const NotificationPopup = ({ isVisible, onClose }) => {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      // Small delay to ensure the element is mounted before animation
      setTimeout(() => setAnimate(true), 10);
      
      const timer = setTimeout(() => {
        setAnimate(false);
        setTimeout(() => {
          setShow(false);
          onClose();
        }, 300); // Match this with the transition duration
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
      <div 
        className={`bg-white rounded-full p-6 shadow-2xl transform transition-all duration-300 ${
          animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup; 