import React from 'react';
import { IconCircle, PetAvatar, PlaceholderImage, TabBar } from '../components.tsx';
import { MEDIA, PETS, petById } from '../data';
import { I as Ic8 } from '../icons';
import { TOKENS as T8 } from '../tokens';

// Media — photo grid + album cards
export function MediaScreen() {
  const [tab, setTab] = React.useState('media');
  const [view, setView] = React.useState('grid'); // grid | albums
  const [petFilter, setPetFilter] = React.useState('all');
  const list = MEDIA.filter((m) => petFilter === 'all' || m.petId === petFilter);

  return (
    <div
      className="petsy"
      data-screen-label="07 · Media"
      style={{
        height: '100%',
        width: '100%',
        background: T8.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 130 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 22px 4px',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: T8.ink2, fontWeight: 700 }}>Galeria</div>
            <h1 style={{ fontSize: 30, marginTop: 2, fontWeight: 700 }}>Mídia</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={iconBtn8()}>
              <Ic8.filter size={20} color={T8.ink} />
            </button>
            <button
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: T8.pink,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px rgba(237,143,170,0.4)',
              }}
            >
              <Ic8.plus size={22} color="#fff" />
            </button>
          </div>
        </div>

        {/* stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 8,
            padding: '14px 18px 0',
          }}
        >
          {[
            { n: 248, l: 'Fotos', t: 'pink' },
            { n: 12, l: 'Vídeos', t: 'rose' },
            { n: 8, l: 'Álbuns', t: 'beige' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: T8.surface,
                borderRadius: 16,
                padding: '12px 14px',
                boxShadow: T8.shadowSm,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <IconCircle icon={<Ic8.camera size={16} />} tone={s.t} size={32} />
              <div>
                <div style={{ fontFamily: T8.fontDisplay, fontWeight: 700, fontSize: 17 }}>
                  {s.n}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T8.ink3 }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>

        {/* segmented view */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', background: T8.bgDeep, borderRadius: 999, padding: 4 }}>
            {[
              { id: 'grid', l: 'Todas as fotos' },
              { id: 'albums', l: 'Álbuns' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 999,
                  background: view === t.id ? T8.surface : 'transparent',
                  color: view === t.id ? T8.ink : T8.ink3,
                  fontSize: 13,
                  fontWeight: 700,
                  boxShadow: view === t.id ? T8.shadowSm : 'none',
                }}
              >
                {t.l}
              </button>
            ))}
          </div>
        </div>

        {/* pet chips */}
        <div
          data-scroll
          style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 18px' }}
        >
          {[{ id: 'all', name: 'Todos' }, ...PETS].map((p) => {
            const isActive = petFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPetFilter(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: p.id === 'all' ? '6px 12px' : '4px 12px 4px 4px',
                  borderRadius: 999,
                  flexShrink: 0,
                  background: isActive ? T8.ink : T8.surface,
                  color: isActive ? '#fff' : T8.ink,
                  border: `1px solid ${T8.border}`,
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {p.id !== 'all' && <PetAvatar name={p.name} tone={p.tone} size={24} />}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {view === 'grid' && (
          <div data-fade style={{ padding: '0 18px' }}>
            {/* date section */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '4px 4px 10px',
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700 }}>Esta semana</h3>
              <span style={{ fontSize: 11, color: T8.ink3, fontWeight: 700 }}>
                {list.length} itens
              </span>
            </div>
            <div
              data-testid="media-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}
            >
              {list.slice(0, 6).map((p, i) => {
                const pet = petById(p.petId);
                // larger first tile
                const big = i === 0;
                return (
                  <div
                    key={p.id}
                    data-testid="media-tile"
                    data-media-id={p.id}
                    style={{
                      gridColumn: big ? 'span 2' : undefined,
                      gridRow: big ? 'span 2' : undefined,
                      position: 'relative',
                    }}
                  >
                    <PlaceholderImage
                      label={pet.name + ' · ' + p.tag}
                      tone={pet.tone === 'pink' ? 'pink' : pet.tone === 'cream' ? 'beige' : 'cocoa'}
                      ratio="1"
                      radius={12}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 6,
                        left: 6,
                        background: 'rgba(58,38,32,0.65)',
                        color: '#fff',
                        padding: '2px 7px',
                        borderRadius: 999,
                        fontSize: 9,
                        fontWeight: 700,
                      }}
                    >
                      {pet.name}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px 4px 10px',
              }}
            >
              <h3 style={{ fontSize: 14, fontWeight: 700 }}>Há 2 semanas</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
              {list.slice(6).map((p) => {
                const pet = petById(p.petId);
                return (
                  <div key={p.id} data-testid="media-tile" data-media-id={p.id}>
                    <PlaceholderImage
                      label={pet.name}
                      tone={pet.tone === 'pink' ? 'pink' : 'beige'}
                      ratio="1"
                      radius={12}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === 'albums' && (
          <div
            data-fade
            style={{ padding: '0 18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}
          >
            {[
              { t: 'Praia 2026', n: 24, tone: 'pink' },
              { t: 'Filhotice Luna', n: 86, tone: 'rose' },
              { t: 'Aniversário Biscoito', n: 32, tone: 'cream' },
              { t: 'Adoção Mel', n: 18, tone: 'sage' },
            ].map((a, i) => (
              <div
                key={i}
                style={{
                  background: T8.surface,
                  borderRadius: 18,
                  padding: 10,
                  boxShadow: T8.shadowSm,
                }}
              >
                <PlaceholderImage
                  label={a.t}
                  tone={a.tone === 'pink' || a.tone === 'rose' ? 'pink' : 'beige'}
                  ratio="4/3"
                  radius={12}
                />
                <div style={{ padding: '8px 4px 2px' }}>
                  <div style={{ fontFamily: T8.fontDisplay, fontWeight: 700, fontSize: 13 }}>
                    {a.t}
                  </div>
                  <div style={{ fontSize: 11, color: T8.ink3, fontWeight: 600 }}>{a.n} itens</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

function iconBtn8() {
  return {
    width: 44,
    height: 44,
    borderRadius: 999,
    background: T8.surface,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: T8.shadowSm,
  };
}

window.MediaScreen = MediaScreen;
