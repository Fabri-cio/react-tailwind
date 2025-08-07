import { useState, useEffect } from "react";

export default function Image({
  src,
  alt = "",
  width = "w-20",
  height = "h-20",
  className = "rounded-lg",
  rounded = true,
  noImageText = "No hay imagen",
  ...props
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Si cambia la src, reseteamos el error
    setImgError(false);
  }, [src]);

  const roundedClass = rounded ? "rounded-lg" : "";

  // Si no hay src o hubo error en la carga, mostramos texto simple
  if (!src || imgError) {
    return (
      <div
        className={`flex items-center justify-center text-gray-500 bg-gray-200 select-none
          ${width} ${height} ${roundedClass} ${className}`}
      >
        {noImageText}
      </div>
    );
  }

  // Si hay src y no error, mostramos la imagen sin animaciones ni loader
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setImgError(true)}
      className={`object-cover ${width} ${height} ${roundedClass} ${className} hover:scale-150 transition duration-300`}
      {...props}
    />
  );
}
