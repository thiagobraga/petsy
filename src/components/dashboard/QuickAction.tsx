// QuickAction — one rounded action button (icon chip + label).

import React from 'react';
import { Glyph } from './icons';

export function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group flex flex-1 flex-col items-center gap-2 rounded-2xl bg-surface px-1 py-3 shadow-[0_8px_20px_-12px_rgba(45,52,54,0.25)] ring-1 ring-black/[0.04] transition active:scale-95"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-blush-soft text-coral transition-colors duration-200 group-hover:bg-coral group-hover:text-white">
        <Glyph name={icon} size={20} />
      </span>
      <span className="text-[11px] font-bold text-charcoal">{label}</span>
    </button>
  );
}
