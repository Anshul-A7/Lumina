import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 4 C16.5 10.5 19 13 25.5 13.5 C19 14 16.5 16.5 16 23 C15.5 16.5 13 14 6.5 13.5 C13 13 15.5 10.5 16 4 Z"
            fill="#FFFFFF"
          />
          <circle cx="23.5" cy="8.5" r="1.75" fill="#FFFFFF" />
          <circle cx="8.5" cy="23.5" r="1.25" fill="#FFFFFF" opacity="0.8" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
