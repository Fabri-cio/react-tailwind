import React from "react";

export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-black font-bold"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
