/* @refresh skip */
// Dashboard line icons — extends the shared icon set (src/icons.tsx) with the
// few glyphs the dashboard needs (clock, gear, help, logout, gift, alert,
// droplet, close). Same 24×24 / rounded-stroke language so everything matches.

import React from 'react';
import { I } from '../../icons';

export interface IcoProps {
  size?: number;
  color?: string;
  stroke?: number;
  style?: React.CSSProperties;
}

const S = ({
  children,
  size = 22,
  color = 'currentColor',
  stroke = 1.8,
  style,
}: IcoProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {children}
  </svg>
);

const clock = (p: IcoProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </S>
);

const gear = (p: IcoProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </S>
);

const help = (p: IcoProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M9.6 9.4a2.4 2.4 0 0 1 4.7.6c0 1.6-2.3 2-2.3 3.6" />
    <path d="M12 16.7h.01" />
  </S>
);

const logout = (p: IcoProps) => (
  <S {...p}>
    <path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" />
    <path d="M16 16.5 20.5 12 16 7.5" />
    <path d="M20.5 12H9.5" />
  </S>
);

const gift = (p: IcoProps) => (
  <S {...p}>
    <rect x="3.5" y="7.5" width="17" height="4.2" rx="1" />
    <path d="M5 11.7V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-7.3" />
    <path d="M12 7.5v12" />
    <path d="M12 7.5C12 7.5 11 3.5 8.6 4c-1.7.4-1.6 3 .4 3.5M12 7.5s1-4 3.4-3.5c1.7.4 1.6 3-.4 3.5" />
  </S>
);

const alert = (p: IcoProps) => (
  <S {...p}>
    <path d="M12 4.3 21 19.5H3L12 4.3z" />
    <path d="M12 10v4" />
    <path d="M12 16.8h.01" />
  </S>
);

const droplet = (p: IcoProps) => (
  <S {...p}>
    <path d="M12 3.5s6 6.2 6 10.2a6 6 0 0 1-12 0c0-4 6-10.2 6-10.2z" />
  </S>
);

const close = (p: IcoProps) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);

export const Ico = { ...I, clock, gear, help, logout, gift, alert, droplet, close } as Record<
  string,
  (p: IcoProps) => React.ReactElement
>;

export type IcoName = keyof typeof Ico;

// Renders an icon by name; color is inherited via `currentColor`, so set the
// text color on a parent (or pass `className`).
export function Glyph({
  name,
  size = 20,
  stroke,
  className,
}: {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const Cmp = Ico[name] ?? Ico.paw;
  return (
    <span className={className} style={{ display: 'inline-flex' }}>
      <Cmp size={size} stroke={stroke} />
    </span>
  );
}
