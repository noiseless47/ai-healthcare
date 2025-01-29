import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          {/* Brain Outline */}
          <path
            d="M12 4C8 4 4 7 4 12C4 14.5 5.5 16.5 7 18V20H17V18C18.5 16.5 20 14.5 20 12C20 7 16 4 12 4Z"
            stroke="#2563EB"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Cross in the center */}
          <path
            d="M12 8V16M8 12H16"
            stroke="#EF4444"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Neural Network Dots */}
          <circle cx="8" cy="10" r="1" fill="#2563EB" />
          <circle cx="16" cy="10" r="1" fill="#2563EB" />
          <circle cx="8" cy="14" r="1" fill="#2563EB" />
          <circle cx="16" cy="14" r="1" fill="#2563EB" />
          
          {/* Connection Lines */}
          <path
            d="M8 10L12 12L16 10M8 14L12 12L16 14"
            stroke="#2563EB"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
} 