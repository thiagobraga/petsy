// SidebarOverlay — right drawer that slides over the dashboard (no reflow).
// Backdrop dims the content; X / backdrop / Esc all close it.

import React from 'react';
import { Glyph } from './icons';
import { MENU } from './data';
import iconImage from '../../assets/petsy-icon-transparent.png';
import wordmarkImage from '../../assets/petsy-logo-transparent.png';

export function SidebarOverlay({
  open,
  onClose,
  active = 'dashboard',
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  active?: string;
  onNavigate?: (id: string) => void;
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Esc to close + move focus into the drawer on open.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={`absolute inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* backdrop */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Fechar menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`absolute right-0 top-0 flex h-full w-[74%] max-w-[320px] flex-col rounded-l-[28px] bg-petal shadow-[-16px_0_44px_-12px_rgba(45,52,54,0.35)] transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 pb-4 pt-6">
          <div className="flex items-center gap-2">
            <img src={iconImage} alt="" className="h-9 w-9 object-contain" />
            <img src={wordmarkImage} alt="Petsy" className="h-[18px] object-contain" />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="grid h-9 w-9 place-items-center rounded-full text-coral transition hover:bg-blush-soft"
          >
            <Glyph name="close" size={20} />
          </button>
        </div>

        <div className="mx-5 h-px bg-charcoal/10" />

        {/* menu */}
        <nav className="flex flex-col gap-2 px-3 py-4">
          {MENU.map((item) => {
            const isActive = item.id === active;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate?.(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-bold transition ${
                  isActive
                    ? 'bg-blush-soft text-coral'
                    : 'text-charcoal hover:bg-white/70'
                }`}
              >
                <Glyph name={item.icon} size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
