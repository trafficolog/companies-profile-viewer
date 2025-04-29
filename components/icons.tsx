// src/components/icons.tsx
'use client';

import {IconSvgProps} from "@/types";

export const HeartFilledIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
      fill="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export const SunFilledIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

export const SunLinearIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12 2V4M12 20V22M4 12H2M22 12H20M19.778 4.223L17.556 6.254M4.222 4.223L6.444 6.254M6.444 17.556L4.222 19.778M19.778 19.777L17.556 17.555"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const MoonIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.25 12C21.25 14.4533 20.2754 16.806 18.5407 18.5407C16.806 20.2754 14.4533 21.25 12 21.25V22.75C17.937 22.75 22.75 17.937 22.75 12H21.25ZM12 21.25C9.54675 21.25 7.19397 20.2754 5.45926 18.5407C3.72455 16.806 2.75 14.4533 2.75 12H1.25C1.25 17.937 6.063 22.75 12 22.75V21.25ZM2.75 12C2.75 9.54675 3.72455 7.19397 5.45926 5.45926C7.19397 3.72455 9.54675 2.75 12 2.75V1.25C6.063 1.25 1.25 6.063 1.25 12H2.75ZM15.5 14.25C13.975 14.25 12.5125 13.6442 11.4341 12.5659C10.3558 11.4875 9.75 10.025 9.75 8.5H8.25C8.25 10.4228 9.01384 12.2669 10.3735 13.6265C11.7331 14.9862 13.5772 15.75 15.5 15.75V14.25ZM20.425 11.469C19.9133 12.3176 19.191 13.0197 18.3281 13.5069C17.4652 13.9942 16.491 14.2501 15.5 14.25V15.75C16.7494 15.7504 17.9777 15.4279 19.0657 14.8138C20.1537 14.1997 21.0646 13.3148 21.71 12.245L20.425 11.469ZM9.75 8.5C9.74986 7.50903 10.0058 6.53483 10.4931 5.67193C10.9803 4.80902 11.6824 4.08669 12.531 3.575L11.755 2.291C10.6854 2.93628 9.80058 3.84701 9.18649 4.93486C8.57239 6.02271 8.2498 7.25078 8.25 8.5H9.75ZM12 2.75C11.9497 2.74903 11.9002 2.73811 11.8542 2.71785C11.8082 2.6976 11.7666 2.66842 11.732 2.632C11.6898 2.58965 11.6613 2.53568 11.65 2.477C11.646 2.446 11.648 2.356 11.755 2.291L12.531 3.575C13.034 3.271 13.196 2.714 13.137 2.276C13.075 1.821 12.717 1.25 12 1.25V2.75ZM21.71 12.245C21.644 12.352 21.554 12.354 21.523 12.35C21.4643 12.3387 21.4103 12.3102 21.368 12.268C21.3316 12.2334 21.3024 12.1918 21.2821 12.1458C21.2619 12.0998 21.251 12.0503 21.25 12H22.75C22.75 11.283 22.179 10.925 21.724 10.863C21.286 10.804 20.729 10.966 20.425 11.469L21.71 12.245Z"
      fill="currentColor"
    />
  </svg>
);

export const MoonFilledIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

export const FilterIcon = ({size = 16, width, height, ...props}: IconSvgProps) => (
  <svg
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5"><path d="M9.5 14a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm5-10a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z"></path><path strokeLinecap="round" d="M15 16.959h7m-13-10H2m0 10h2m18-10h-2"></path></g>
  </svg>
);

export const SortIcon = ({size = 16, width, height, ...props}: IconSvgProps) => (
  <svg
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M22 7H2m17 5H5m11 5H8"></path>
  </svg>
);

export const ChangeIcon = ({size = 16, width, height, ...props}: IconSvgProps) => (
  <svg
    focusable="false"
    height={size || height}
    viewBox="0 0 20 20"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 8H6m0 0l4.125-4M6 8l4.125 4M6 16h12m0 0l-4.125-4M18 16l-4.125 4"></path>
  </svg>
);

export const HeartIcon = ({size = 16, width, height, ...props}: IconSvgProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    viewBox="0 0 36 36" 
    aria-hidden="true"
    role="img" 
    width={size || width}
    preserveAspectRatio="xMidYMid meet"
    {...props}>
      <path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242z"/>
    </svg>
);

export const ServerLinearIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    viewBox="0 0 24 24" 
    aria-hidden="true"
    role="img" 
    width={size || width}
    preserveAspectRatio="xMidYMid meet"
    {...props}>
      <path xmlns="http://www.w3.org/2000/svg" d="M18 7H18.01M15 7H15.01M18 17H18.01M15 17H15.01M6 10H18C18.9319 10 19.3978 10 19.7654 9.84776C20.2554 9.64477 20.6448 9.25542 20.8478 8.76537C21 8.39782 21 7.93188 21 7C21 6.06812 21 5.60218 20.8478 5.23463C20.6448 4.74458 20.2554 4.35523 19.7654 4.15224C19.3978 4 18.9319 4 18 4H6C5.06812 4 4.60218 4 4.23463 4.15224C3.74458 4.35523 3.35523 4.74458 3.15224 5.23463C3 5.60218 3 6.06812 3 7C3 7.93188 3 8.39782 3.15224 8.76537C3.35523 9.25542 3.74458 9.64477 4.23463 9.84776C4.60218 10 5.06812 10 6 10ZM6 20H18C18.9319 20 19.3978 20 19.7654 19.8478C20.2554 19.6448 20.6448 19.2554 20.8478 18.7654C21 18.3978 21 17.9319 21 17C21 16.0681 21 15.6022 20.8478 15.2346C20.6448 14.7446 20.2554 14.3552 19.7654 14.1522C19.3978 14 18.9319 14 18 14H6C5.06812 14 4.60218 14 4.23463 14.1522C3.74458 14.3552 3.35523 14.7446 3.15224 15.2346C3 15.6022 3 16.0681 3 17C3 17.9319 3 18.3978 3.15224 18.7654C3.35523 19.2554 3.74458 19.6448 4.23463 19.8478C4.60218 20 5.06812 20 6 20Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SortDescIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M14.89 5.0799C14.02 4.8199 13.06 4.6499 12 4.6499C7.20996 4.6499 3.32996 8.5299 3.32996 13.3199C3.32996 18.1199 7.20996 21.9999 12 21.9999C16.79 21.9999 20.67 18.1199 20.67 13.3299C20.67 11.5499 20.13 9.8899 19.21 8.5099"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M16.13 5.32L13.24 2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M16.13 5.32007L12.76 7.78007"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const SortAscIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M9.11008 5.0799C9.98008 4.8199 10.9401 4.6499 12.0001 4.6499C16.7901 4.6499 20.6701 8.5299 20.6701 13.3199C20.6701 18.1099 16.7901 21.9899 12.0001 21.9899C7.21008 21.9899 3.33008 18.1099 3.33008 13.3199C3.33008 11.5399 3.87008 9.8799 4.79008 8.4999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M7.87012 5.32L10.7601 2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M7.87012 5.32007L11.2401 7.78007"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const CubesLinearIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <path
      d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M17.6799 10.82V6.73999"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M2.34998 15.45L6.31998 17.7499L10.27 15.46"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M6.31995 21.82V17.74"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export const ExclamationCircleIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M8 2v3" />
      <path d="M16 2v3M7 13h8M7 17h5M16 3.5c3.33.18 5 1.45 5 6.15v6.18c0 4.12-1 6.18-6 6.18H9c-5 0-6-2.06-6-6.18V9.65c0-4.7 1.67-5.96 5-6.15z" />
    </g>
  </svg>
);

export const CheckCircleIcon = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const SearchIcon = ({
  size = 16,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
      <path d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
  </svg>
);