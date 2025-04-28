'use client';

import Image from 'next/image';

export default function ClientImage({ src, alt, fill, width, height, className, fallbackSrc, style, priority }) {
  // Next.js Image component requires either:
  // 1. fill=true, OR
  // 2. both width and height to be specified
  
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width || 100 : undefined} // Default width if not using fill
      height={!fill ? height || 100 : undefined} // Default height if not using fill
      className={className}
      style={style}
      priority={priority}
      fallback={fallbackSrc}
    />
  );
}
