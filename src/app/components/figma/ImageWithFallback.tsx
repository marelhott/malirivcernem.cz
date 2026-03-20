import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const RESPONSIVE_WIDTHS = [480, 768, 1080, 1440, 1920]

function canOptimizeWithNext(src: string) {
  if (src.startsWith('/')) return true

  try {
    const url = new URL(src)
    return ['cdn.builder.io', 'images.unsplash.com', 'images.pexels.com'].includes(url.hostname)
  } catch {
    return false
  }
}

function createOptimizedUrl(src: string, width: number, quality = 76) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const {
    src,
    alt,
    style,
    className,
    loading = 'lazy',
    decoding = 'async',
    sizes,
    fetchPriority,
    ...rest
  } = props

  const normalizedSrc = typeof src === 'string' ? src : ''
  const optimized = normalizedSrc !== '' && canOptimizeWithNext(normalizedSrc)
  const finalSrc = optimized ? createOptimizedUrl(normalizedSrc, 1080) : normalizedSrc
  const srcSet = optimized
    ? RESPONSIVE_WIDTHS.map((width) => `${createOptimizedUrl(normalizedSrc, width)} ${width}w`).join(', ')
    : undefined

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" loading={loading} decoding={decoding} {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={sizes ?? '100vw'}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      {...rest}
      onError={handleError}
    />
  )
}
