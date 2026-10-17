/* global React */
// Petsy — atoms & molecules
// Depends on window.TOKENS, window.I.

const { TOKENS: T, I: Ic } = window;

// ─── Button ────────────────────────────────────────────────
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  full,
  onClick,
  style,
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const sz = {
    sm: { h: 36, px: 14, fs: 14 },
    md: { h: 48, px: 20, fs: 15 },
    lg: { h: 56, px: 24, fs: 17 },
  }[size];
  const variants = {
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
function Input({ icon, type = 'text', placeholder, value, onChange, trailing, style }) {
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
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
function Checkbox({ checked, onChange, size = 22, label }) {
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
        {checked && <Ic.check size={size - 8} color="#fff" stroke={3} />}
      </span>
      {label && <span style={{ fontSize: 14, color: T.ink2, fontWeight: 600 }}>{label}</span>}
    </label>
  );
}

// ─── Tag / Chip ────────────────────────────────────────────────
function Tag({ children, tone = 'pink', size = 'md' }) {
  const tones = {
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
function Card({ children, padding = 16, style, onClick }) {
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
function PetAvatar({ name, size = 56, tone = 'pink', slot, style }) {
  const tones = {
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
function PetsyMark({ size = 64, color = T.pink, accent = T.ink }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {/* main pad */}
      <ellipse cx="32" cy="40" rx="14" ry="11" fill={color} />
      {/* toes */}
      <ellipse cx="16" cy="26" rx="5.5" ry="7" fill={color} />
      <ellipse cx="48" cy="26" rx="5.5" ry="7" fill={color} />
      <ellipse cx="24" cy="16" rx="4.5" ry="6" fill={color} />
      <ellipse cx="40" cy="16" rx="4.5" ry="6" fill={color} />
      {/* heart on pad */}
      <path
        d="M32 38c-1.6-2.2-4.5-2.8-6 0-1.5 2.8 2 5.5 6 7.5 4-2 7.5-4.7 6-7.5-1.5-2.8-4.4-2.2-6 0z"
        fill={accent}
      />
    </svg>
  );
}

// ─── Stripe placeholder image ────────────────────────────────────
function PlaceholderImage({ label = 'photo', ratio = '4/3', tone = 'pink', radius = 16, style }) {
  const tones = {
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
function IconCircle({ icon, tone = 'pink', size = 44 }) {
  const tones = {
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
function SectionHeader({ title, action }) {
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
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home', icon: <Ic.home />, label: 'Home' },
    { id: 'meds', icon: <Ic.pill />, label: 'Medicines' },
    { id: 'appt', icon: <Ic.stetho />, label: 'Visits' },
    { id: 'diary', icon: <Ic.book />, label: 'Diary' },
    { id: 'media', icon: <Ic.camera />, label: 'Media' },
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
function StatusBar() {
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
function MiniCalendar({
  month = 'Maio 2026',
  activeDay = 14,
  marked = [3, 8, 14, 17, 22, 28],
  compact,
  onPick,
}) {
  // Render a fixed month grid
  const days = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  const firstDow = 5; // Friday for May 2026 (arbitrary for mock)
  const total = 31;
  const grid = [];
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
          <Ic.chevronL size={14} color={T.ink2} />
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
          <Ic.chevronR size={14} color={T.ink2} />
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

Object.assign(window, {
  Button,
  Input,
  Checkbox,
  Tag,
  Card,
  PetAvatar,
  PetsyMark,
  PlaceholderImage,
  IconCircle,
  SectionHeader,
  TabBar,
  StatusBar,
  MiniCalendar,
});
