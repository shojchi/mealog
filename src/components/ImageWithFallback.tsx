import { useState, useEffect } from 'react';
import placeholderSvg from '../assets/meal-placeholder.svg';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

export function ImageWithFallback({ src, alt, ...props }: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isOffline, setIsOffline] = useState(() => {
    return typeof navigator !== 'undefined' && !navigator.onLine;
  });

  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setHasError(false);
  }

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const finalSrc = isOffline || hasError || !src ? placeholderSvg : src;

  return (
    <img
      {...props}
      src={finalSrc}
      alt={alt || "Meal image"}
      onError={() => setHasError(true)}
    />
  );
}
