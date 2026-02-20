import { useState, useEffect } from 'react';
import placeholderSvg from '../assets/meal-placeholder.svg';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

export function ImageWithFallback({ src, alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  useEffect(() => {
    const handleOnline = () => setImgSrc(src);
    const handleOffline = () => setImgSrc(placeholderSvg);

    // Initial check
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setImgSrc(placeholderSvg);
    } else {
      // If src is empty/null, use placeholder
      setImgSrc(src || placeholderSvg);
    }

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [src]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt || "Meal image"}
      onError={() => setImgSrc(placeholderSvg)}
    />
  );
}
