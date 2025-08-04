// Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  widthClass?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, widthClass, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
      <div className={`
          bg-white p-6 rounded-lg shadow-lg
          ${widthClass?widthClass:'w-full sm:w-3/4 md:w-1/2 lg:w-1/3'}
          transition-transform transform
        `}>
        <button
          onClick={onClose}
          className="absolute text-gray-500 hover:text-red-500 top-[30px] right-[30px] text-2xl"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
