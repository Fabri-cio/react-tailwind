import { useState } from "react";

export default function Image({
  src,
  alt = "imagen",
  width = "w-32",
  height = "h-32",
  className = "",
  fallback = "../../public/none.jpg",
  rounded = true,
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loading, setLoading] = useState(true);

  const roundedClass = rounded ? "rounded-full" : "";

  return (
    <div className={`relative overflow-hidden ${width} ${height} ${roundedClass} ${className}`}>
      {loading && (
        <div className={`absolute inset-0 bg-gray-400 animate-pulse ${roundedClass}`} />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(fallback)}
        onLoad={() => setLoading(false)}
        className={`w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-150
          ${loading ? "invisible" : "visible"} ${roundedClass}`}
        {...props}
      />
    </div>
  );
}
