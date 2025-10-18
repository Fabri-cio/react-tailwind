import { useState, useEffect } from "react";

export default function Image({
  src,
  alt = "",
  width = "w-20",
  height = "h-20",
  className = "",
  rounded = true,
  noImageText = "No hay imagen",
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  const roundedClass = rounded ? "rounded-lg" : "";

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center text-gray-500 bg-gray-200 select-none
          ${width} ${height} ${roundedClass} ${className}`}
      >
        {noImageText}
      </div>
    );
  }

  return (
    <div
      className={`${width} ${height} ${roundedClass} overflow-hidden relative bg-gray-200`}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`object-cover w-full h-full transition-transform duration-300
          ${loaded ? "opacity-100" : "opacity-0"} hover:scale-105`}
        {...props}
      />
    </div>
  );
}
