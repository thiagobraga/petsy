// QuickAction — one rounded action tile (line icon + label). Without `onClick`
// the action has no screen yet: it renders flat, muted and disabled.

import React from 'react';
import { Glyph } from './icons';
import { FOCUS } from './primitives';

export function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  const soon = !onClick;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={soon}
      aria-label={soon ? `${label}, em breve` : label}
      className={`group relative flex min-h-[76px] min-w-0 flex-col items-center justify-center gap-1.5 rounded-[18px] border px-1 py-3 transition duration-150 ${FOCUS} ${
        soon
          ? 'cursor-not-allowed border-dashed border-mist/80 bg-white/40'
          : 'border-hairline bg-surface shadow-tile hover:-translate-y-px hover:border-blush active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none'
      }`}
    >
      <Glyph name={icon} size={28} stroke={1.9} className={soon ? 'text-slate/60' : 'text-coral'} />
      <span
        className={`max-w-full truncate text-[14px] font-semibold leading-tight ${soon ? 'text-slate' : 'text-charcoal'}`}
      >
        {label}
      </span>
      {soon && (
        <span className="absolute -top-2 right-1.5 rounded-full border border-hairline bg-canvas px-1.5 py-px text-[10.5px] font-bold leading-4 text-slate">
          Em breve
        </span>
      )}
    </button>
  );
}
