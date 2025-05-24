import React from 'react';
import { FaImage } from 'react-icons/fa';

const ImagePreview = ({ image, alt = 'Vista previa de la imagen', className = '' }) => {
  // Si hay una imagen (puede ser un string con la URL o un objeto File/Blob)
  const imageUrl = React.useMemo(() => {
    if (!image) return null;
    if (typeof image === 'string') {
      // Si es una URL relativa, asegurarse de que tenga la ruta base
      if (image.startsWith('http') || image.startsWith('blob:')) {
        return image;
      }
      // Asume que las imágenes se sirven desde la raíz del backend
      return `http://localhost:3000${image.startsWith('/') ? '' : '/'}${image}`;
    }
    if (image instanceof File || image instanceof Blob) {
      return URL.createObjectURL(image);
    }
    return null;
  }, [image]);

  // Limpiar el objeto URL cuando el componente se desmonte o la imagen cambie
  React.useEffect(() => {
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  if (!imageUrl) {
    return (
      <div className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 ${className}`}>
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
          // Si hay un error al cargar la imagen, muestra el placeholder
          e.target.onerror = null;
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2QwZDBkMCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOC44OCAxMi44MzJjLS44MjYtMS4zMzktMi4wMTQtMi4xNDctMy4zOC0yLjE2YTIuOTkzIDIuOTkzIDAgMCAwLTIuNjQgMS44NWMtLjkzNCLSuNTYtMi4wMS0uODYtMy4zOS0uMzMtMS40NS41Ni0yLjQzIDEuODUtMi40MyAzLjM5IDAgMi40MSAxLjc0IDMuODkgMy4xNiA1LjY3LjM2LjQ2LjczLjkzIDEuMTQgMS40MS4yLjIyLjQ0LjQyLjY3LjY2LjE5LjE5LjQ3LjE5LjY2IDAgLjIzLS4yNC40Ny0uNDQuNjctLjY2LjQxLS40OC43OC0uOTUgMS4xNC0xLjQxIDEuNDItMS43OCAzLjE2LTQuMjYgMy4xNi01LjY3IDAtMS45OS0xLjQ5LTMuODEtMy4zNy00LjE2eiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDEyYTIgMiAwIDEgMSAwLTQgMiAyIDAgMCAxIDAgNHoiPjwvcGF0aD48L3N2Zz4=';
        }}
        className="w-full h-full object-cover rounded-lg border border-gray-200"
      />
    </div>
  );
};

export default ImagePreview;
