import React from "react";
import { FaImage } from "react-icons/fa";

const ImagePreview = ({
  image,
  alt = "Vista previa de la imagen",
  className = "",
}) => {
  // URL base configurable (en Vite)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const imageUrl = React.useMemo(() => {
    if (!image) return null;

    // Si ya es URL absoluta (Cloudinary, Railway o blob)
    if (typeof image === "string") {
      if (image.startsWith("http") || image.startsWith("blob:")) {
        return image;
      }
      // Si es una ruta relativa, la unimos con el backend
      return `${API_BASE_URL}/media/${image.startsWith("/") ? image.slice(1) : image}`;
    }

    // Si es un archivo local (File o Blob)
    if (image instanceof File || image instanceof Blob) {
      return URL.createObjectURL(image);
    }

    return null;
  }, [image, API_BASE_URL]);

  // Liberar memoria si se usó un objeto temporal
  React.useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  if (!imageUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 ${className}`}
      >
        <FaImage className="text-gray-400 text-4xl mb-2" />
        <span className="text-gray-500 text-sm">Sin imagen</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOC44OCAxMi44MzJjLS44MjYtMS4zMzktMi4wMTQtMi4xNDctMy4zOC0yLjE2YTIuOTkzIDIuOTkzIDAgMCAwLTIuNjQgMS44NWMtLjkzNCLSuNTYtMi4wMS0uODYtMy4zOS0uMzMtMS40NS41Ni0yLjQzIDEuODUtMi40MyAzLjM5IDAgMi40MSAxLjc0IDMuODkgMy4xNiA1LjY3LjM2LjQ2LjczLjkzIDEuMTQgMS40MS4yLjIyLjQ0LjQyLjY3LjY2LjE5LjE5LjQ3LjE5LjY2IDAgLjIzLS4yNC40Ny0uNDQuNjctLjY2LjQxLS40OC43OC0uOTUgMS4xNC0xLjQxIDEuNDItMS43OCAzLjE2LTQuMjYgMy4xNi01LjY3IDAtMS45OS0xLjQ5LTMuODEtMy4zNy00LjE2eiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMSAwLTQgMiAyIDAgMCAxIDAgNHoiPjwvcGF0aD48L3N2Zz4=";
        }}
        className="w-full h-full object-cover rounded-lg border border-gray-200"
      />
    </div>
  );
};

export default ImagePreview;
