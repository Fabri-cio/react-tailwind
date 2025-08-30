import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import FocusLock from "react-focus-lock";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  fullscreen: "w-full h-full rounded-none",
};

// Stack global de modales
let modalStack = [];

function ModalBase({
  isOpen,
  onClose,
  size = "md",
  closeOnEsc = true,
  closeOnOverlayClick = true,
  children,
}) {
  const modalRef = useRef(null);

  // Manejo de stack
  useEffect(() => {
    if (isOpen) modalStack.push(onClose);
    return () => {
      modalStack = modalStack.filter((fn) => fn !== onClose);
    };
  }, [isOpen, onClose]);

  // Solo el modal superior responde al ESC
  useEffect(() => {
    if (!closeOnEsc) return;
    const handleEsc = (event) => {
      if (
        event.key === "Escape" &&
        modalStack[modalStack.length - 1] === onClose
      ) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose, closeOnEsc]);

  const handleClickOutside = (event) => {
    if (
      closeOnOverlayClick &&
      modalRef.current &&
      !modalRef.current.contains(event.target) &&
      modalStack[modalStack.length - 1] === onClose
    ) {
      onClose();
    }
  };

  const indexInStack = modalStack.indexOf(onClose);
  const isTopModal = indexInStack === modalStack.length - 1;

  // Animación de stack
  const stackTransform = {
    scale: 1 - (modalStack.length - 1 - indexInStack) * 0.04,
    y: (modalStack.length - 1 - indexInStack) * 20,
    opacity: 1 - (modalStack.length - 1 - indexInStack) * 0.1,
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 + 0.05 * indexInStack }}
          exit={{ opacity: 0 }}
          onClick={handleClickOutside}
          className="fixed inset-0 flex items-center justify-center bg-black"
          style={{ zIndex: 50 + indexInStack * 2 }}
        >
          <FocusLock returnFocus disabled={!isTopModal}>
            <motion.div
              key="modal"
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ ...stackTransform }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`
                bg-white shadow-lg relative flex flex-col
                ${
                  size !== "fullscreen"
                    ? "rounded-2xl w-full mx-4 max-h-[90vh]"
                    : ""
                }
                ${sizeClasses[size]}
              `}
              style={{ zIndex: 50 + indexInStack * 2 + 1 }}
            >
              {children}
            </motion.div>
          </FocusLock>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// Subcomponentes
ModalBase.Header = function ModalHeader({ children, onClose }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b">
      <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
      {onClose && (
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      )}
    </div>
  );
};

ModalBase.Body = function ModalBody({ children }) {
  return <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>;
};

ModalBase.Footer = function ModalFooter({ children }) {
  return (
    <div className="px-6 py-4 border-t flex justify-end gap-2">{children}</div>
  );
};

export default ModalBase;
