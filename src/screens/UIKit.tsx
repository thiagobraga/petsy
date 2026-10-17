import React from 'react';
import {
  Button,
  Checkbox,
  IconCircle,
  Input,
  MiniCalendar,
  PetAvatar,
  PetsyMark,
  Tag,
} from '../components.tsx';
import { PETS } from '../data';
// UI Kit / Styleguide — broad designer-facing reference.
const { TOKENS: T9, I: Ic9 } = window;

export function UIKitScreen() {
  return (
    <div
      className="petsy"
      data-screen-label="08 · UI Kit"
      style={{
        width: 1180,
        padding: 40,
        background: T9.bg,
        color: T9.ink,
        fontFamily: T9.fontBody,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginBottom: 28 }}>
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 20,
            background: T9.surface,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: T9.shadow,
          }}
        >
          <PetsyMark size={54} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 12,
              color: T9.ink2,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            Design System · v0.1
          </div>
          <h1
            style={{
              fontFamily: T9.fontDisplay,
              fontSize: 48,
              fontWeight: 700,
              marginTop: 2,
              letterSpacing: 0.5,
            }}
          >
            Petsy UI Kit
          </h1>
          <p style={{ fontSize: 14, color: T9.ink2, fontWeight: 500, marginTop: 4, maxWidth: 600 }}>
            Color, type, components and patterns for the Petsy mobile app — warm cream, rose pink
            and cocoa brown. Built to feel cozy, friendly, and trustworthy for everyday pet care.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tag tone="pink">iOS · Android</Tag>
          <Tag tone="beige">PT-BR</Tag>
        </div>
      </div>

      {/* COLORS */}
      <SGSection no="01" title="Color" />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}
      >
        <Swatch label="Pink · Primary" hex={T9.pink} usage="Buttons, accents, brand" />
        <Swatch label="Pink · Soft" hex={T9.pinkSoft} usage="Chips, highlights" />
        <Swatch label="Pink · Pale" hex={T9.pinkPale} usage="Tile bg" />
        <Swatch label="Pink · Hover" hex={T9.pinkHover} usage="Pressed state" />
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}
      >
        <Swatch label="Cream · Bg" hex={T9.bg} usage="App background" />
        <Swatch label="Cream · Deep" hex={T9.bgDeep} usage="Segment, chip" />
        <Swatch label="Surface" hex={T9.surface} usage="Cards" border />
        <Swatch label="Surface · 2" hex={T9.surface2} usage="Subtle layer" border />
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 18 }}
      >
        <Swatch label="Cocoa · Ink" hex={T9.ink} usage="Headings · Body" dark />
        <Swatch label="Ink 2" hex={T9.ink2} usage="Secondary text" dark />
        <Swatch label="Ink 3" hex={T9.ink3} usage="Muted · placeholders" />
        <Swatch label="Ink 4" hex={T9.ink4} usage="Disabled" />
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 36 }}
      >
        <Swatch label="OK · Sage" hex={T9.ok} usage="Success states" dark />
        <Swatch label="Warn · Amber" hex={T9.warn} usage="Warnings" />
        <Swatch label="Danger" hex={T9.danger} usage="Errors" dark />
        <Swatch label="Rose · Soft accent" hex={T9.rose} usage="Secondary accents" />
      </div>

      {/* TYPOGRAPHY */}
      <SGSection no="02" title="Typography" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 36 }}>
        <div style={card9()}>
          <div
            style={{
              fontSize: 11,
              color: T9.ink3,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Display · Fredoka
          </div>
          <div
            style={{
              fontFamily: T9.fontDisplay,
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.05,
              marginTop: 6,
            }}
          >
            Cuide do seu melhor amigo.
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              rowGap: 8,
              marginTop: 18,
              fontSize: 13,
              color: T9.ink2,
            }}
          >
            <div style={{ fontWeight: 700 }}>H1 / 32</div>
            <div style={{ fontFamily: T9.fontDisplay, fontSize: 32, fontWeight: 700 }}>
              Welcome back!
            </div>
            <div style={{ fontWeight: 700 }}>H2 / 22</div>
            <div style={{ fontFamily: T9.fontDisplay, fontSize: 22, fontWeight: 700 }}>
              Medicações de hoje
            </div>
            <div style={{ fontWeight: 700 }}>H3 / 17</div>
            <div style={{ fontFamily: T9.fontDisplay, fontSize: 17, fontWeight: 700 }}>
              Meus pets
            </div>
            <div style={{ fontWeight: 700 }}>Label</div>
            <div style={{ fontFamily: T9.fontDisplay, fontSize: 13, fontWeight: 600 }}>
              Próximo: Apoquel às 08:00
            </div>
          </div>
        </div>
        <div style={card9()}>
          <div
            style={{
              fontSize: 11,
              color: T9.ink3,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            Body · Nunito
          </div>
          <div
            style={{ fontSize: 15, color: T9.ink, marginTop: 8, lineHeight: 1.5, fontWeight: 500 }}
          >
            Luna adorou — entrou correndo na água e ficou meia hora tentando pegar as ondinhas. Em
            casa, dormiu profundamente.
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              rowGap: 8,
              marginTop: 14,
              fontSize: 12,
              color: T9.ink2,
            }}
          >
            <div style={{ fontWeight: 700 }}>Body L</div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>15 / 500</div>
            <div style={{ fontWeight: 700 }}>Body M</div>
            <div style={{ fontSize: 13, fontWeight: 500 }}>13 / 500</div>
            <div style={{ fontWeight: 700 }}>Caption</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T9.ink3 }}>
              11 / 600 — labels, tags
            </div>
            <div style={{ fontWeight: 700 }}>Mono</div>
            <div style={{ fontFamily: T9.fontMono, fontSize: 12 }}>900 215 444 887 213</div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <SGSection no="03" title="Buttons" />
      <div style={card9({ padding: 24 })}>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Button>Log In</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="outline">Create account</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="dark">Save changes</Button>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <Button icon={<Ic9.paw size={16} color="#fff" />}>Adicionar pet</Button>
          <Button variant="secondary" icon={<Ic9.pill size={16} />}>
            Medicar
          </Button>
          <Button variant="outline" iconRight={<Ic9.chevronR size={16} color={T9.pink} />}>
            Ver mais
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* INPUTS / FORMS */}
      <SGSection no="04" title="Inputs" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
        <div style={card9()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input icon={<Ic9.mail />} placeholder="Email address" />
            <Input icon={<Ic9.lock />} type="password" placeholder="Password" />
            <Input icon={<Ic9.search />} placeholder="Procurar pet, medicação..." />
          </div>
        </div>
        <div style={card9()}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <Checkbox checked label="Remember me" />
              <Checkbox label="Lembrete diário" />
              <Checkbox checked label="Notificações" />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Tag>Pink</Tag>
              <Tag tone="pinkS">Soft</Tag>
              <Tag tone="beige">Beige</Tag>
              <Tag tone="brown">Brown</Tag>
              <Tag tone="ok">Castrado</Tag>
              <Tag tone="warn">A dar</Tag>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <IconCircle icon={<Ic9.pill />} tone="pink" />
              <IconCircle icon={<Ic9.stetho />} tone="rose" />
              <IconCircle icon={<Ic9.syringe />} tone="amber" />
              <IconCircle icon={<Ic9.weight />} tone="sage" />
              <IconCircle icon={<Ic9.book />} tone="beige" />
              <IconCircle icon={<Ic9.camera />} tone="cocoa" />
            </div>
          </div>
        </div>
      </div>

      {/* AVATARS + COMPONENTS */}
      <SGSection no="05" title="Pet avatars & cards" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16, marginBottom: 36 }}>
        <div style={card9()}>
          <div style={{ fontSize: 11, color: T9.ink3, fontWeight: 700, marginBottom: 14 }}>
            AVATARS
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
            <PetAvatar name="Luna" tone="pink" size={72} />
            <PetAvatar name="Biscoito" tone="cream" size={56} />
            <PetAvatar name="Mel" tone="rose" size={44} />
            <PetAvatar name="Toby" tone="cocoa" size={36} />
            <PetAvatar name="Nina" tone="sage" size={28} />
          </div>
        </div>
        <div style={card9()}>
          <div style={{ fontSize: 11, color: T9.ink3, fontWeight: 700, marginBottom: 14 }}>
            PET CARD STATES
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            {PETS.map((p) => (
              <div
                key={p.id}
                style={{
                  width: 120,
                  padding: 12,
                  borderRadius: 18,
                  background: T9.surface,
                  boxShadow: T9.shadowSm,
                }}
              >
                <PetAvatar name={p.name} tone={p.tone} size={44} />
                <div
                  style={{
                    fontFamily: T9.fontDisplay,
                    fontWeight: 700,
                    fontSize: 14,
                    marginTop: 8,
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: 10, color: T9.ink3, fontWeight: 600 }}>{p.breed}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CALENDAR + ICONS */}
      <SGSection no="06" title="Patterns" />
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 16, marginBottom: 36 }}>
        <div style={card9()}>
          <div style={{ fontSize: 11, color: T9.ink3, fontWeight: 700, marginBottom: 10 }}>
            MINI CALENDAR
          </div>
          <MiniCalendar />
        </div>
        <div style={card9()}>
          <div style={{ fontSize: 11, color: T9.ink3, fontWeight: 700, marginBottom: 14 }}>
            ICONOGRAPHY (24 px · 1.8 stroke)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 16 }}>
            {[
              ['paw', 'paw'],
              ['pill', 'pill'],
              ['calendar', 'calendar'],
              ['stetho', 'stetho'],
              ['book', 'diary'],
              ['camera', 'camera'],
              ['home', 'home'],
              ['bell', 'bell'],
              ['heart', 'heart'],
              ['search', 'search'],
              ['plus', 'plus'],
              ['check', 'check'],
              ['mail', 'mail'],
              ['lock', 'lock'],
              ['eye', 'eye'],
              ['edit', 'edit'],
              ['syringe', 'syringe'],
              ['scissors', 'tosa'],
              ['weight', 'weight'],
              ['bone', 'bone'],
              ['filter', 'filter'],
              ['more', 'more'],
              ['chevronR', 'next'],
              ['chevronL', 'back'],
            ].map(([k, l]) => (
              <div
                key={k}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: T9.surface2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: T9.ink,
                  }}
                >
                  {React.createElement(Ic9[k], { size: 22 })}
                </div>
                <span style={{ fontSize: 10, color: T9.ink3, fontWeight: 600 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SHADOWS + RADII */}
      <SGSection no="07" title="Elevation & shape" />
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 36 }}
      >
        <ShadowDemo label="shadow-sm" shadow={T9.shadowSm} />
        <ShadowDemo label="shadow" shadow={T9.shadow} />
        <ShadowDemo label="shadow-lg" shadow={T9.shadowLg} />
      </div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14, marginBottom: 36 }}
      >
        {[
          { l: 'r1 · 8', r: 8 },
          { l: 'r2 · 14', r: 14 },
          { l: 'r3 · 20', r: 20 },
          { l: 'r4 · 28', r: 28 },
          { l: 'pill · 999', r: 999 },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              background: T9.surface,
              padding: 14,
              borderRadius: 12,
              boxShadow: T9.shadowSm,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                background: T9.pinkPale,
                borderRadius: s.r,
                border: `1.5px solid ${T9.pink}`,
              }}
            />
            <span style={{ fontSize: 11, color: T9.ink3, fontWeight: 700 }}>{s.l}</span>
          </div>
        ))}
      </div>

      {/* DO / DON'T */}
      <SGSection no="08" title="Voice & tone" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ ...card9(), borderLeft: `4px solid ${T9.ok}` }}>
          <div style={{ fontSize: 11, color: '#5B8451', fontWeight: 700, marginBottom: 6 }}>DO</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: T9.ink, lineHeight: 1.7 }}>
            <li>Calmo, acolhedor, leve. Como uma amiga veterinária.</li>
            <li>“Apoquel da Luna às 08:00” &gt; “Reminder: medication”.</li>
            <li>Usar o nome do pet sempre que possível.</li>
            <li>Pequenos toques afetivos: ♥ paw, mas com moderação.</li>
          </ul>
        </div>
        <div style={{ ...card9(), borderLeft: `4px solid ${T9.danger}` }}>
          <div style={{ fontSize: 11, color: T9.danger, fontWeight: 700, marginBottom: 6 }}>
            DON&apos;T
          </div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: T9.ink, lineHeight: 1.7 }}>
            <li>Linguagem clínica / fria. Sem jargão veterinário sem contexto.</li>
            <li>Não usar emojis em excesso ou ícones decorativos demais.</li>
            <li>Sem letras maiúsculas agressivas em alertas.</li>
            <li>Sem alarmes vermelhos para lembretes — usar pink/amber.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SGSection({ no, title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, margin: '8px 0 18px' }}>
      <span
        style={{
          fontFamily: T9.fontMono,
          fontSize: 11,
          color: T9.pink,
          fontWeight: 700,
          letterSpacing: 1,
        }}
      >
        {no}
      </span>
      <h2 style={{ fontFamily: T9.fontDisplay, fontSize: 26, fontWeight: 700 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: T9.border, marginBottom: 6 }} />
    </div>
  );
}

function Swatch({ label, hex, usage, dark, border }) {
  return (
    <div
      style={{
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: T9.shadowSm,
        background: T9.surface,
      }}
    >
      <div
        style={{
          height: 80,
          background: hex,
          border: border ? `1px solid ${T9.border}` : 'none',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontFamily: T9.fontMono,
            fontSize: 10,
            background: 'rgba(0,0,0,0.06)',
            color: dark ? '#fff' : T9.ink,
            padding: '2px 6px',
            borderRadius: 4,
            fontWeight: 700,
          }}
        >
          {hex.toUpperCase()}
        </span>
      </div>
      <div style={{ padding: '8px 12px 10px' }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 10, color: T9.ink3, fontWeight: 600, marginTop: 2 }}>{usage}</div>
      </div>
    </div>
  );
}

function ShadowDemo({ label, shadow }) {
  return (
    <div
      style={{
        background: T9.bgDeep,
        padding: 28,
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 120,
          height: 80,
          borderRadius: 18,
          background: T9.surface,
          boxShadow: shadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
          fontWeight: 700,
          color: T9.ink2,
        }}
      >
        {label}
      </div>
    </div>
  );
}

const card9 = (extra = {}) => ({
  background: T9.surface,
  borderRadius: 22,
  padding: 20,
  boxShadow: T9.shadowSm,
  ...extra,
});

window.UIKitScreen = UIKitScreen;
