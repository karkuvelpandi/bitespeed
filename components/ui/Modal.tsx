import React, { useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  closeOnOverlayClick?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  closeOnOverlayClick = true,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black opacity-20 z-40"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className={`bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto ${className}`}>
          {/* Header */}
          {(title || true) && (
            <div className="flex items-center justify-between p-4 sticky top-0 bg-white">
              {title && <h3 className="text-lg font-semibold">{title}</h3>}
              <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <IoCloseSharp className="w-5 h-5 cursor-pointer text-red-500" />
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;