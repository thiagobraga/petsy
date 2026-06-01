/* @refresh skip */

// Petsy — line icons (24x24, stroke 1.8, rounded)
// All accept `size` and `color` props.

import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  stroke?: number;
  fill?: string;
  style?: React.CSSProperties;
}

const Icon = ({ children, size = 22, color = 'currentColor', stroke = 1.8, fill = 'none', style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>{children}</svg>
);

export const I = {
  paw: (p: IconProps) => (
    <Icon {...p} fill="currentColor" stroke="none">
      <ellipse cx="6.5" cy="9" rx="1.8" ry="2.4"/>
      <ellipse cx="17.5" cy="9" rx="1.8" ry="2.4"/>
      <ellipse cx="9.5" cy="5.5" rx="1.6" ry="2.2"/>
      <ellipse cx="14.5" cy="5.5" rx="1.6" ry="2.2"/>
      <path d="M12 11.5c-2.8 0-5 2.2-5 4.6 0 1.6 1.4 2.4 2.6 2.4.9 0 1.4-.4 2.4-.4s1.5.4 2.4.4c1.2 0 2.6-.8 2.6-2.4 0-2.4-2.2-4.6-5-4.6z"/>
    </Icon>
  ),
  pill: (p: IconProps) => (
    <Icon {...p}>
      <rect x="2.5" y="9" width="19" height="6" rx="3" transform="rotate(-30 12 12)"/>
      <path d="M8.5 7.7l4.3 7.4" transform="rotate(-30 12 12)"/>
    </Icon>
  ),
  calendar: (p: IconProps) => (
    <Icon {...p}>
      <rect x="3.5" y="5" width="17" height="15" rx="3"/>
      <path d="M3.5 10h17"/>
      <path d="M8 3v4M16 3v4"/>
    </Icon>
  ),
  stetho: (p: IconProps) => (
    <Icon {...p}>
      <path d="M6 3v6a4 4 0 008 0V3"/>
      <path d="M4.5 3h3M12.5 3h3"/>
      <path d="M10 13v3a4 4 0 008 0v-1.5"/>
      <circle cx="18" cy="13" r="2"/>
    </Icon>
  ),
  book: (p: IconProps) => (
    <Icon {...p}>
      <path d="M4 4.5A1.5 1.5 0 015.5 3H19v16H5.5A1.5 1.5 0 014 17.5v-13z"/>
      <path d="M4 17.5A1.5 1.5 0 015.5 16H19"/>
    </Icon>
  ),
  camera: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 8.5A2.5 2.5 0 015.5 6h2l1.5-2h6L16.5 6h2A2.5 2.5 0 0121 8.5v9A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5v-9z"/>
      <circle cx="12" cy="13" r="3.5"/>
    </Icon>
  ),
  home: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3.5 11l8.5-7 8.5 7"/>
      <path d="M5.5 10v9.5a.5.5 0 00.5.5h12a.5.5 0 00.5-.5V10"/>
    </Icon>
  ),
  bell: (p: IconProps) => (
    <Icon {...p}>
      <path d="M6 17V11a6 6 0 0112 0v6"/>
      <path d="M4 17h16"/>
      <path d="M10 20a2 2 0 004 0"/>
    </Icon>
  ),
  heart: (p: IconProps) => (
    <Icon {...p} fill="currentColor" stroke="none">
      <path d="M12 20s-7-4.6-7-10.2A4.3 4.3 0 0112 6a4.3 4.3 0 017 3.8C19 15.4 12 20 12 20z"/>
    </Icon>
  ),
  search: (p: IconProps) => (
    <Icon {...p}><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/></Icon>
  ),
  plus: (p: IconProps) => (
    <Icon {...p}><path d="M12 5v14M5 12h14"/></Icon>
  ),
  check: (p: IconProps) => (
    <Icon {...p}><path d="M5 12.5l4.5 4.5L19 7.5"/></Icon>
  ),
  chevronR: (p: IconProps) => (
    <Icon {...p}><path d="M9 5l7 7-7 7"/></Icon>
  ),
  chevronL: (p: IconProps) => (
    <Icon {...p}><path d="M15 5l-7 7 7 7"/></Icon>
  ),
  chevronD: (p: IconProps) => (
    <Icon {...p}><path d="M5 9l7 7 7-7"/></Icon>
  ),
  mail: (p: IconProps) => (
    <Icon {...p}>
      <rect x="3" y="5" width="18" height="14" rx="3"/>
      <path d="M4 7l8 6 8-6"/>
    </Icon>
  ),
  lock: (p: IconProps) => (
    <Icon {...p}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2.5"/>
      <path d="M7.5 10.5V8a4.5 4.5 0 019 0v2.5"/>
    </Icon>
  ),
  eye: (p: IconProps) => (
    <Icon {...p}>
      <path d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12s-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/>
      <circle cx="12" cy="12" r="2.8"/>
    </Icon>
  ),
  eyeOff: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 12s3.5-6 9-6c2 0 3.7.7 5 1.6M21 12s-3.5 6-9 6c-2 0-3.7-.7-5-1.6"/>
      <path d="M4 4l16 16"/>
    </Icon>
  ),
  edit: (p: IconProps) => (
    <Icon {...p}>
      <path d="M4 20h4l11-11-4-4L4 16v4z"/>
      <path d="M14 6l4 4"/>
    </Icon>
  ),
  more: (p: IconProps) => (
    <Icon {...p} fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="1.8"/>
      <circle cx="12" cy="12" r="1.8"/>
      <circle cx="19" cy="12" r="1.8"/>
    </Icon>
  ),
  filter: (p: IconProps) => (
    <Icon {...p}><path d="M4 6h16M7 12h10M10 18h4"/></Icon>
  ),
  syringe: (p: IconProps) => (
    <Icon {...p}>
      <path d="M14 4l6 6"/>
      <path d="M11 7l6 6"/>
      <path d="M15.5 8.5l-9 9-3 1 1-3 9-9"/>
      <path d="M7.5 13.5l3 3"/>
    </Icon>
  ),
  scissors: (p: IconProps) => (
    <Icon {...p}>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="6" cy="18" r="3"/>
      <path d="M20 4L8.5 15.5M20 20L8.5 8.5"/>
    </Icon>
  ),
  bone: (p: IconProps) => (
    <Icon {...p} stroke={p?.color || 'currentColor'}>
      <path d="M6.5 4a2.5 2.5 0 00-2 4c-.9.5-1.5 1.5-1.5 2.5A2.5 2.5 0 005.5 13l2-1 9 9 1-2a2.5 2.5 0 002.5-2.5c0-1-.6-2-1.5-2.5a2.5 2.5 0 00-2-4 2.5 2.5 0 00-2.5 2L13 13 7 7l1-.5A2.5 2.5 0 006.5 4z"/>
    </Icon>
  ),
  weight: (p: IconProps) => (
    <Icon {...p}>
      <path d="M5 8h14l-1.5 11.5a1 1 0 01-1 .9h-9a1 1 0 01-1-.9L5 8z"/>
      <circle cx="12" cy="12" r="2.5"/>
    </Icon>
  ),
  menu: (p: IconProps) => (
    <Icon {...p}>
      <path d="M3 6h18"/>
      <path d="M3 12h18"/>
      <path d="M3 18h18"/>
    </Icon>
  ),
};

export type IconKey = keyof typeof I;

declare global {
  // @ts-ignore
  interface Window {
    I: typeof I;
    Icon: typeof Icon;
  }
}

window.I = I;
window.Icon = Icon;
