import React, { useEffect, useRef } from "react";

export default function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  // Cerrar con Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap básico
  useEffect(() => {
    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstElement?.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, []);

  // Cierre al hacer clic fuera
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white p-4 rounded-lg w-full max-w-[60vw] max-h-[100vh] overflow-y-auto relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-700 hover:text-black font-bold"
          >
            X
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
