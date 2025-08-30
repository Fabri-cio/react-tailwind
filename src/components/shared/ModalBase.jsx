import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

function ModalBase({
  isOpen,
  onClose,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  children,
}) {
  const modalRef = useRef(null);

  // Cerrar con ESC
  useEffect(() => {
    if (!closeOnEsc) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, closeOnEsc]);

  // Cerrar al hacer clic fuera
  const handleClickOutside = (e) => {
    if (
      closeOnOverlayClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto rounded-2xl"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Header solo con "X" para cerrar
ModalBase.Header = function ModalHeader({ onClose }) {
  return (
    <div className="flex justify-end p-2">
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>
      )}
    </div>
  );
};

// Body normal
ModalBase.Body = function ModalBody({ children }) {
  return <div className="px-4 py-2">{children}</div>;
};

// Footer opcional (solo si lo necesitas)
ModalBase.Footer = function ModalFooter({ children }) {
  return (
    <div className="px-4 py-2 border-t flex justify-end gap-2">{children}</div>
  );
};

export default ModalBase;
