// SidebarOverlay — right drawer that slides over the dashboard (no reflow).
// Backdrop dims the content; X / backdrop / Esc all close it. While closed the
// whole layer is inert, so its links never steal Tab focus.

import React from 'react';
import { Glyph } from './icons';
import { FOCUS } from './primitives';
import { MENU, type MenuItem } from './data';
import iconImage from '../../assets/petsy-icon-transparent.png';
import wordmarkImage from '../../assets/petsy-logo-transparent.png';

// Graphite icons for account/utility entries, pink for the app sections.
const UTILITY = new Set(['configuracoes', 'ajuda', 'sair']);

export function SidebarOverlay({
  open,
  onClose,
  active = 'dashboard',
  onNavigate,
}: {
  open: boolean;
  onClose: () => void;
  active?: string;
  onNavigate?: (item: MenuItem) => void;
}) {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  // Esc to close, focus the X on open, give focus back to the trigger on close.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden'; // keep the page still behind the drawer
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      html.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, [open, onClose]);

  // React 18 has no typed `inert` prop; an empty string sets the attribute.
  const inert = open ? {} : ({ inert: '' } as Record<string, string>);

  return (
    <div
      className={`fixed inset-0 z-40 ${open ? 'visible' : 'invisible transition-[visibility] delay-300 duration-0'}`}
      aria-hidden={!open}
      {...inert}
    >
      {/* backdrop */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Fechar menu"
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-[#3a3436]/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`absolute inset-y-0 right-0 flex w-[min(66vw,340px)] min-w-[248px] flex-col overflow-y-auto rounded-l-[36px] bg-petal shadow-[-18px_0_48px_-18px_rgba(90,40,50,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className={`grid h-12 w-12 place-items-center rounded-full text-coral transition-colors duration-150 hover:bg-blush-soft ${FOCUS}`}
          >
            <Glyph name="close" size={28} stroke={2} />
          </button>
        </div>

        <div className="flex items-center gap-2.5 px-6 pb-8 pt-6">
          <img src={iconImage} alt="" className="h-auto w-[23%] max-w-[54px] object-contain" />
          <img
            src={wordmarkImage}
            alt="Petsy"
            className="h-auto w-[62%] max-w-[156px] object-contain"
          />
        </div>

        <div className="mx-6 h-px bg-blush/70" />

        <nav aria-label="Principal" className="flex flex-col gap-2 px-3 py-6">
          {MENU.map((item) => {
            const isActive = item.id === active;
            const soon = !item.to;
            const iconTone = soon
              ? 'text-slate/55'
              : isActive || !UTILITY.has(item.id)
                ? 'text-coral'
                : 'text-slate';
            return (
              <button
                key={item.id}
                type="button"
                disabled={soon}
                onClick={() => onNavigate?.(item)}
                aria-current={isActive ? 'page' : undefined}
                aria-label={soon ? `${item.label}, em breve` : undefined}
                className={`flex min-h-14 items-center gap-4 rounded-[18px] px-4 py-2.5 text-left text-[17px] transition-colors duration-150 ${FOCUS} ${
                  isActive
                    ? 'bg-blush-soft font-bold text-coral-ink'
                    : soon
                      ? 'cursor-not-allowed text-slate'
                      : 'font-medium text-charcoal hover:bg-white'
                }`}
              >
                <Glyph name={item.icon} size={26} stroke={1.8} className={`shrink-0 ${iconTone}`} />
                <span className="min-w-0">
                  <span className="block leading-tight">{item.label}</span>
                  {soon && (
                    <span className="mt-0.5 block text-[12px] font-bold leading-tight text-slate">
                      Em breve
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
