/* eslint-disable no-unused-vars */
// Petsy — atoms & molecules
// Depends on TOKENS, I (icons).

import React from 'react';
import { TOKENS as T } from './tokens';
import { I } from './icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  full?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  trailing?: React.ReactNode;
}

export interface CheckboxProps {
  checked: boolean;
  onChange?: (nextChecked: boolean) => void;
  size?: number;
  label?: string;
}

export interface TagProps {
  children: React.ReactNode;
  tone?: 'pink' | 'pinkS' | 'beige' | 'brown' | 'ok' | 'warn';
  size?: 'sm' | 'md';
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  padding?: number;
  onClick?: () => void;
}

export interface PetAvatarProps {
  name?: string;
  size?: number;
  tone?: 'pink' | 'cream' | 'cocoa' | 'sage' | 'rose';
  slot?: string;
  style?: React.CSSProperties;
}

export interface PetsyMarkProps {
  size?: number;
  color?: string;
  accent?: string;
}

export interface PlaceholderImageProps {
  label?: string;
  ratio?: string;
  tone?: 'pink' | 'beige' | 'cocoa';
  radius?: number;
  style?: React.CSSProperties;
}

export interface IconCircleProps {
  icon: React.ReactNode;
  tone?: 'pink' | 'rose' | 'beige' | 'sage' | 'amber' | 'cocoa';
  size?: number;
}

export interface SectionHeaderProps {
  title: string;
  action?: string;
}

export interface TabBarProps {
  active: string;
  onChange?: (tabId: string) => void;
}

export interface MiniCalendarProps {
  month?: string;
  activeDay?: number;
  marked?: number[];
  compact?: boolean;
  onPick?: (dayNumber: number) => void;
}

// ─── Button ────────────────────────────────────────────────
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  full,
  onClick,
  style,
  ...buttonProps
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sz = {
    sm: { h: 36, px: 14, fs: 14 },
    md: { h: 48, px: 20, fs: 15 },
    lg: { h: 56, px: 24, fs: 17 },
  }[size];
  const variants: Record<string, any> = {
    primary: {
      bg: T.pink,
      c: '#fff',
      bgH: T.pinkHover,
      border: 'transparent',
      sh: '0 6px 16px rgba(237,143,170,0.35)',
    },
    secondary: { bg: T.pinkSoft, c: T.ink, bgH: '#F7C6D2', border: 'transparent', sh: 'none' },
    ghost: {
      bg: 'transparent',
      c: T.ink,
      bgH: 'rgba(61,38,32,0.06)',
      border: 'transparent',
      sh: 'none',
    },
    outline: { bg: '#fff', c: T.pink, bgH: T.pinkPale, border: T.pink, sh: 'none' },
    dark: {
      bg: T.ink,
      c: '#fff',
      bgH: '#26140F',
      border: 'transparent',
      sh: '0 6px 16px rgba(58,38,32,0.25)',
    },
  }[variant];
  return (
    <button
      {...buttonProps}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        height: sz.h,
        padding: `0 ${sz.px}px`,
        fontSize: sz.fs,
        fontWeight: 700,
        borderRadius: T.rPill,
        background: hover ? variants.bgH : variants.bg,
        color: variants.c,
        border: `1.5px solid ${variants.border === 'transparent' ? 'transparent' : variants.border}`,
        boxShadow: variants.sh,
        width: full ? '100%' : undefined,
        transform: press ? 'scale(0.98)' : 'scale(1)',
        transition: 'all .15s ease',
        ...style,
      }}
    >
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      <span>{children}</span>
      {iconRight && <span style={{ display: 'flex' }}>{iconRight}</span>}
    </button>
  );
}

// ─── Input ────────────────────────────────────────────────
export function Input({
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  trailing,
  style,
  onBlur,
  ...inputProps
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 54,
        padding: '0 18px',
        background: T.surface,
        borderRadius: T.rPill,
        border: `1.5px solid ${focus ? T.pink : T.border}`,
        transition: 'border-color .15s',
        ...style,
      }}
    >
      {icon && <span style={{ color: T.pink, display: 'flex' }}>{icon}</span>}
      <input
        {...inputProps}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={(event) => {
          setFocus(false);
          onBlur?.(event);
        }}
        style={{
          flex: 1,
          border: 0,
          background: 'transparent',
          fontSize: 15,
          fontWeight: 500,
          minWidth: 0,
        }}
      />
      {trailing && <span style={{ display: 'flex' }}>{trailing}</span>}
    </label>
  );
}

// ─── Checkbox ────────────────────────────────────────────────
export function Checkbox({ checked, onChange, size = 22, label }: CheckboxProps) {
  return (
    <label
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      onClick={() => onChange?.(!checked)}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 7,
          background: checked ? T.pink : '#fff',
          border: `1.8px solid ${checked ? T.pink : T.ink3}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all .15s',
        }}
      >
        {checked && <I.check size={size - 8} color="#fff" stroke={3} />}
      </span>
      {label && <span style={{ fontSize: 14, color: T.ink2, fontWeight: 600 }}>{label}</span>}
    </label>
  );
}

// ─── Tag / Chip ────────────────────────────────────────────────
export function Tag({ children, tone = 'pink', size = 'md' }: TagProps) {
  const tones: Record<string, any> = {
    pink: { bg: T.pinkPale, c: T.pink },
    pinkS: { bg: T.pinkSoft, c: T.pinkHover },
    beige: { bg: T.bgDeep, c: T.ink2 },
    brown: { bg: T.ink, c: '#fff' },
    ok: { bg: '#E4F0DE', c: '#5B8451' },
    warn: { bg: '#FBE7CE', c: '#9A6A2C' },
  }[tone];
  const sz = size === 'sm' ? { px: 8, py: 3, fs: 11 } : { px: 10, py: 4, fs: 12 };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: `${sz.py}px ${sz.px}px`,
        borderRadius: T.rPill,
        background: tones.bg,
        color: tones.c,
        fontSize: sz.fs,
        fontWeight: 700,
        letterSpacing: 0.2,
      }}
    >
      {children}
    </span>
  );
}

// ─── Card ────────────────────────────────────────────────
export function Card({ children, padding = 16, style, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: T.surface,
        borderRadius: T.r3,
        padding,
        boxShadow: T.shadowSm,
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── PetAvatar — placeholder dog with paw shape ────────────────
export function PetAvatar({ name, size = 56, tone = 'pink', slot, style }: PetAvatarProps) {
  const tones: Record<string, any> = {
    pink: { bg: T.pinkSoft, ring: T.pink },
    cream: { bg: T.bgDeep, ring: T.warn },
    cocoa: { bg: '#E5C9B6', ring: T.ink2 },
    sage: { bg: '#DCE9D3', ring: T.ok },
    rose: { bg: '#F7CDD4', ring: T.danger },
  }[tone] || { bg: T.pinkSoft, ring: T.pink };
  const initials = (name || '')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const inner = slot ? (
    <image-slot
      id={slot}
      style={{ width: '100%', height: '100%' }}
      shape="circle"
      placeholder={`${name} photo`}
    ></image-slot>
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `radial-gradient(circle at 30% 30%, ${tones.bg} 0%, ${tones.bg} 60%, rgba(0,0,0,0.04) 100%)`,
        fontFamily: T.fontDisplay,
        fontSize: size * 0.34,
        fontWeight: 700,
        color: tones.ring,
      }}
    >
      {initials || '🐾'}
    </div>
  );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: `2px solid ${tones.ring}`,
        background: tones.bg,
        position: 'relative',
        flexShrink: 0,
        ...style,
      }}
    >
      {inner}
    </div>
  );
}

// ─── Paw logo mark — abstract built from simple ellipses ────────
export function PetsyMark({ size = 64, color = T.pink, accent = T.ink }: PetsyMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <ellipse cx="32" cy="40" rx="14" ry="11" fill={color} />
      <ellipse cx="16" cy="26" rx="5.5" ry="7" fill={color} />
      <ellipse cx="48" cy="26" rx="5.5" ry="7" fill={color} />
      <ellipse cx="24" cy="16" rx="4.5" ry="6" fill={color} />
      <ellipse cx="40" cy="16" rx="4.5" ry="6" fill={color} />
      <path
        d="M32 38c-1.6-2.2-4.5-2.8-6 0-1.5 2.8 2 5.5 6 7.5 4-2 7.5-4.7 6-7.5-1.5-2.8-4.4-2.2-6 0z"
        fill={accent}
      />
    </svg>
  );
}

// ─── Stripe placeholder image ────────────────────────────────────
export function PlaceholderImage({
  label = 'photo',
  ratio = '4/3',
  tone = 'pink',
  radius = 16,
  style,
}: PlaceholderImageProps) {
  const tones: Record<string, any> = {
    pink: { a: T.pinkSoft, b: T.pinkPale, t: T.pinkHover },
    beige: { a: T.bgDeep, b: T.bg, t: T.ink2 },
    cocoa: { a: '#E5C9B6', b: '#F2E2D4', t: T.ink2 },
  }[tone];
  return (
    <div
      style={{
        aspectRatio: ratio,
        borderRadius: radius,
        overflow: 'hidden',
        background: `repeating-linear-gradient(135deg, ${tones.a} 0, ${tones.a} 12px, ${tones.b} 12px, ${tones.b} 24px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <span
        style={{
          fontFamily: T.fontMono,
          fontSize: 11,
          color: tones.t,
          fontWeight: 700,
          letterSpacing: 0.5,
          padding: '4px 8px',
          background: 'rgba(255,255,255,0.6)',
          borderRadius: 4,
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── IconCircle — used for activity, dosage etc ─────────────────
export function IconCircle({ icon, tone = 'pink', size = 44 }: IconCircleProps) {
  const tones: Record<string, any> = {
    pink: { bg: T.pinkPale, c: T.pink },
    rose: { bg: T.pinkSoft, c: T.pinkHover },
    beige: { bg: T.bgDeep, c: T.ink2 },
    sage: { bg: '#E4F0DE', c: '#5B8451' },
    amber: { bg: '#FBE7CE', c: T.warn },
    cocoa: { bg: '#E5C9B6', c: T.ink2 },
  }[tone];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: tones.bg,
        color: tones.c,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { color: tones.c })}
    </div>
  );
}

// ─── Section header ──────────────────────────────────────────────
export function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '0 4px',
      }}
    >
      <h3 style={{ fontSize: 18, fontWeight: 700 }}>{title}</h3>
      {action && (
        <span style={{ fontSize: 13, fontWeight: 700, color: T.pink, cursor: 'pointer' }}>
          {action}
        </span>
      )}
    </div>
  );
}

// ─── Bottom Tab Bar ──────────────────────────────────────────────
export function TabBar({ active, onChange }: TabBarProps) {
  const tabs = [
    { id: 'home', icon: <I.home />, label: 'Home' },
    { id: 'meds', icon: <I.pill />, label: 'Medicines' },
    { id: 'appt', icon: <I.stetho />, label: 'Visits' },
    { id: 'diary', icon: <I.book />, label: 'Diary' },
    { id: 'media', icon: <I.camera />, label: 'Media' },
  ];
  return (
    <div
      style={{
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 24,
        height: 68,
        background: T.surface,
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 6px',
        boxShadow: T.shadow,
        zIndex: 30,
      }}
    >
      {tabs.map((t) => {
        const isActive = t.id === active;
        return (
          <button
            key={t.id}
            onClick={() => onChange?.(t.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '6px 10px',
              borderRadius: 16,
              color: isActive ? T.pink : T.ink3,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? T.pinkPale : 'transparent',
                transition: 'background .2s',
              }}
            >
              {React.cloneElement(t.icon, { size: 22, color: isActive ? T.pink : T.ink3 })}
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, opacity: isActive ? 1 : 0 }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Phone Status Bar (for in-app screens) ───────────────────────
export function StatusBar() {
  return (
    <div
      style={{
        height: 54,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '0 28px 8px',
        fontFamily: '-apple-system, system-ui',
        fontSize: 15,
        fontWeight: 700,
        color: T.ink,
      }}
    >
      <span>9:41</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <circle cx="2" cy="9" r="1.5" fill={T.ink} />
          <circle cx="6" cy="9" r="1.5" fill={T.ink} />
          <circle cx="10" cy="9" r="1.5" fill={T.ink} />
          <circle cx="14" cy="9" r="1.5" fill={T.ink} />
        </svg>
        <svg width="17" height="11" viewBox="0 0 17 11">
          <path d="M8.5 3a8 8 0 016 2.5l-1 1a6.5 6.5 0 00-10 0l-1-1A8 8 0 018.5 3z" fill={T.ink} />
          <circle cx="8.5" cy="9" r="1.4" fill={T.ink} />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11">
          <rect x="0.5" y="0.5" width="21" height="10" rx="3" fill="none" stroke={T.ink} />
          <rect x="2" y="2" width="18" height="7" rx="1.5" fill={T.ink} />
          <rect x="22" y="3.5" width="1.5" height="4" rx="0.6" fill={T.ink} />
        </svg>
      </span>
    </div>
  );
}

// ─── Mini Calendar ───────────────────────────────────────────────
export function MiniCalendar({
  month = 'Maio 2026',
  activeDay = 14,
  marked = [3, 8, 14, 17, 22, 28],
  compact,
  onPick,
}: MiniCalendarProps) {
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const firstDow = 5;
  const total = 31;
  const grid: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) grid.push(null);
  for (let d = 1; d <= total; d++) grid.push(d);
  while (grid.length % 7) grid.push(null);
  const sz = compact ? 28 : 34;
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: T.bgDeep,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <I.chevronL size={14} color={T.ink2} />
        </button>
        <span style={{ fontFamily: T.fontDisplay, fontWeight: 600, fontSize: 15 }}>{month}</span>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 999,
            background: T.bgDeep,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <I.chevronR size={14} color={T.ink2} />
        </button>
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 4 }}
      >
        {days.map((d, i) => (
          <div
            key={i}
            style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: T.ink3 }}
          >
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {grid.map((d, i) => {
          if (d === null) return <div key={i} style={{ height: sz }} />;
          const isActive = d === activeDay;
          const isMarked = marked.includes(d);
          return (
            <button
              key={i}
              onClick={() => onPick?.(d)}
              style={{
                height: sz,
                borderRadius: 999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: isActive ? T.pink : 'transparent',
                color: isActive ? '#fff' : T.ink,
                fontSize: 13,
                fontWeight: 600,
                position: 'relative',
              }}
            >
              {d}
              {isMarked && !isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 2,
                    width: 4,
                    height: 4,
                    borderRadius: 999,
                    background: T.pink,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
declare global {
  interface Window {
    Button: typeof Button;
    Input: typeof Input;
    Checkbox: typeof Checkbox;
    Tag: typeof Tag;
    Card: typeof Card;
    PetAvatar: typeof PetAvatar;
    PetsyMark: typeof PetsyMark;
    PlaceholderImage: typeof PlaceholderImage;
    IconCircle: typeof IconCircle;
    SectionHeader: typeof SectionHeader;
    TabBar: typeof TabBar;
    StatusBar: typeof StatusBar;
    MiniCalendar: typeof MiniCalendar;
  }
}

window.Button = Button;
window.Input = Input;
window.Checkbox = Checkbox;
window.Tag = Tag;
window.Card = Card;
window.PetAvatar = PetAvatar;
window.PetsyMark = PetsyMark;
window.PlaceholderImage = PlaceholderImage;
window.IconCircle = IconCircle;
window.SectionHeader = SectionHeader;
window.TabBar = TabBar;
window.StatusBar = StatusBar;
window.MiniCalendar = MiniCalendar;
