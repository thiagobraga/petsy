// Petsy — design tokens & primitive helpers
// Colors anchored on warm cream/beige + rose pink + cocoa brown.

import React from 'react';

export const TOKENS = {
  // surfaces
  bg: '#FBF1DE', // primary cream
  bgDeep: '#F4E3C6', // section bg / chips
  surface: '#FFFFFF',
  surface2: '#FFF9EE',
  scrim: 'rgba(61,33,28,0.4)',

  // brand
  pink: '#ED8FAA', // primary pink — buttons, accents
  pinkHover: '#D97694',
  pinkSoft: '#FBD7E0', // soft pink — bg chips
  pinkPale: '#FDEDF1',
  rose: '#F4A8B8',

  // brown / text
  ink: '#3A2620', // headline brown
  ink2: '#6B4E45', // secondary text
  ink3: '#A4877A', // tertiary / muted
  ink4: '#CCB5A6', // disabled

  // utility
  ok: '#7CA972', // sage green
  warn: '#E29A56', // amber
  danger: '#D1556E',

  border: 'rgba(61,38,32,0.10)',
  borderSoft: 'rgba(61,38,32,0.06)',

  // radii — gentle curves (8-12px for interactive, 20px for cards)
  r1: 4,
  r2: 8,
  r3: 12,
  r4: 20,
  rPill: 999, // rPill deprecated; use r4 instead

  // shadows
  shadowSm: '0 1px 2px rgba(58,38,32,0.05), 0 2px 6px rgba(58,38,32,0.04)',
  shadow: '0 4px 14px rgba(58,38,32,0.07), 0 8px 28px rgba(58,38,32,0.05)',
  shadowLg: '0 16px 40px rgba(58,38,32,0.12)',

  // type
  fontDisplay: '"Fredoka", "Quicksand", system-ui, sans-serif',
  fontBody: '"Nunito", "DM Sans", system-ui, sans-serif',
  fontMono: '"JetBrains Mono", ui-monospace, monospace',
};

export type TokenKey = keyof typeof TOKENS;

// Inject Google Fonts + base reset
export const PetsyFonts = () => {
  React.useEffect(() => {
    if (document.getElementById('petsy-fonts')) return;
    const l1 = document.createElement('link');
    l1.id = 'petsy-fonts';
    l1.rel = 'stylesheet';
    l1.href =
      'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap';
    document.head.appendChild(l1);

    const s = document.createElement('style');
    s.id = 'petsy-base';
    s.textContent = `
      .petsy { font-family: ${TOKENS.fontBody}; color: ${TOKENS.ink};
               -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
      .petsy * { box-sizing: border-box; }
      .petsy h1,.petsy h2,.petsy h3,.petsy h4 { font-family: ${TOKENS.fontDisplay}; margin: 0; font-weight: 600; color: ${TOKENS.ink}; }
      .petsy p { margin: 0; }
      .petsy button { font-family: inherit; cursor: pointer; border: 0; background: none; padding: 0; color: inherit; }
      .petsy input,.petsy textarea { font-family: inherit; color: ${TOKENS.ink}; }
      .petsy input:focus,.petsy textarea:focus { outline: none; }
      .petsy ::placeholder { color: ${TOKENS.ink3}; }
      /* Styled scrollbars */
      .petsy [data-scroll]::-webkit-scrollbar { width: 8px; }
      .petsy [data-scroll]::-webkit-scrollbar-track { background: transparent; }
      .petsy [data-scroll]::-webkit-scrollbar-thumb { background: ${TOKENS.ink3}; border-radius: 4px; }
      .petsy [data-scroll]::-webkit-scrollbar-thumb:hover { background: ${TOKENS.ink2}; }
      .petsy [data-scroll] { scrollbar-width: thin; scrollbar-color: ${TOKENS.ink3} transparent; }
      @keyframes petsy-fade-in { from { opacity:0; transform: translateY(4px) } to { opacity:1; transform:none } }
      .petsy [data-fade] { animation: petsy-fade-in .35s ease both; }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Window {
    TOKENS: typeof TOKENS;
    PetsyFonts: typeof PetsyFonts;
  }
}

window.TOKENS = TOKENS;
window.PetsyFonts = PetsyFonts;
