import React from "react";

const Loading = ({ message = "Cargando datos..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Círculo girando */}
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      {/* Mensaje */}
      <p className="mt-4 text-gray-500 text-center" role="alert">
        {message}
      </p>
    </div>
  );
};

export default Loading;
