import Image from 'next/image'
import React from 'react'

const ClientImage = ({ src, alt, width = 100, height = 100, className }) => {
  return (
    <div className={className}>
      <Image
        src={src || '/placeholder-image.jpg'}
        alt={alt || 'Client Image'}
        width={width}
        height={height}
        className="rounded-md object-cover"
      />
    </div>
  )
}

export default ClientImage
