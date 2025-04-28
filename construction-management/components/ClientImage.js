"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ClientImage({ src, alt, fill, style, priority, fallbackSrc, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <div className={`relative ${fill ? 'h-full w-full' : ''} ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        src={imgSrc}
        alt={alt}
        fill={fill}
        style={style}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          if (fallbackSrc) setImgSrc(fallbackSrc);
        }}
        {...props}
      />
    </div>
  );
}
