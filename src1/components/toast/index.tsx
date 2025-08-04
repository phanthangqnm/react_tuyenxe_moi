import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', duration = 3000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null;

  const base = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-4 py-3 rounded shadow-lg text-white transition-all";
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500 text-black"
  };

  return (
    <div className={`${base} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default Toast;
