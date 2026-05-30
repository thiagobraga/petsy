import React from 'react';
import { PetAvatar, PlaceholderImage, TabBar } from '../components.tsx';
import { DIARY, PETS, petById } from '../data';
import { I as Ic7 } from '../icons';
import { TOKENS as T7 } from '../tokens';

// Diary — timeline of pet entries with photos, mood, notes.
export function DiaryScreen() {
  const [tab, setTab] = React.useState('diary');
  const [activePet, setActivePet] = React.useState('all');
  const [entryBodies, setEntryBodies] = React.useState(() =>
    Object.fromEntries(DIARY.map((entry) => [entry.id, entry.body]))
  );
  const list = DIARY.filter((d) => activePet === 'all' || d.petId === activePet);

  const moodColor = {
    feliz: T7.pink,
    calmo: '#5B8451',
    agitado: T7.warn,
  };
  const moodLabel = { feliz: '☺ Feliz', calmo: '😌 Calmo', agitado: '⚡ Agitado' };

  return (
    <div
      className="petsy"
      data-screen-label="06 · Diary"
      style={{
        height: '100%',
        width: '100%',
        background: T7.bg,
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
            <div style={{ fontSize: 12, color: T7.ink2, fontWeight: 700 }}>Memórias</div>
            <h1 style={{ fontSize: 30, marginTop: 2, fontWeight: 700 }}>Diário</h1>
          </div>
          <button
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: T7.pink,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(237,143,170,0.4)',
            }}
          >
            <Ic7.plus size={22} color="#fff" />
          </button>
        </div>

        {/* pet filter */}
        <div
          data-scroll
          style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 18px 4px' }}
        >
          {[{ id: 'all', name: 'Todos' }, ...PETS].map((p) => {
            const isActive = activePet === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePet(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: p.id === 'all' ? '8px 14px' : '6px 14px 6px 6px',
                  borderRadius: 999,
                  flexShrink: 0,
                  background: isActive ? T7.ink : T7.surface,
                  color: isActive ? '#fff' : T7.ink,
                  border: `1px solid ${T7.border}`,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {p.id !== 'all' && <PetAvatar name={p.name} tone={p.tone} size={28} />}
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* compose */}
        <div
          style={{
            margin: '12px 18px',
            padding: 14,
            borderRadius: 20,
            background: T7.surface,
            boxShadow: T7.shadowSm,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <PetAvatar name="Luna" tone="pink" size={36} />
          <div style={{ flex: 1, fontSize: 13, color: T7.ink3, fontWeight: 500 }}>
            Como Luna está hoje?
          </div>
          <button
            style={{
              padding: 8,
              borderRadius: 999,
              background: T7.pinkPale,
              color: T7.pink,
              display: 'flex',
            }}
          >
            <Ic7.camera size={18} color={T7.pink} />
          </button>
        </div>

        {/* timeline */}
        <div style={{ position: 'relative', padding: '6px 0 0' }}>
          {/* vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 36,
              top: 24,
              bottom: 24,
              width: 2,
              background: T7.border,
            }}
          />
          {list.map((e) => {
            const pet = petById(e.petId);
            return (
              <div
                key={e.id}
                style={{
                  display: 'flex',
                  padding: '0 18px',
                  marginBottom: 14,
                  position: 'relative',
                }}
              >
                {/* date marker */}
                <div
                  style={{
                    width: 36,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: T7.pink,
                      border: `3px solid ${T7.bg}`,
                      marginTop: 14,
                      position: 'relative',
                      zIndex: 2,
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: T7.ink3,
                      marginBottom: 6,
                      marginLeft: 4,
                    }}
                  >
                    {e.date.toUpperCase()} · {pet.name}
                  </div>
                  <div
                    style={{
                      background: T7.surface,
                      borderRadius: 18,
                      padding: 14,
                      boxShadow: T7.shadowSm,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <PetAvatar name={pet.name} tone={pet.tone} size={28} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: T7.fontDisplay, fontWeight: 700, fontSize: 14 }}>
                          {e.title}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: 999,
                          background: moodColor[e.mood] + '22',
                          color: moodColor[e.mood],
                        }}
                      >
                        {moodLabel[e.mood]}
                      </span>
                    </div>
                    <textarea
                      aria-label={`${e.title} diary text`}
                      value={entryBodies[e.id] || ''}
                      onChange={(event) =>
                        setEntryBodies((current) => ({
                          ...current,
                          [e.id]: event.target.value,
                        }))
                      }
                      style={{
                        width: '100%',
                        minHeight: 72,
                        fontSize: 13,
                        color: T7.ink2,
                        lineHeight: 1.5,
                        fontWeight: 500,
                        border: 'none',
                        background: 'transparent',
                        resize: 'vertical',
                        padding: 0,
                        outline: 'none',
                        fontFamily: T7.fontBody,
                      }}
                    />
                    {e.photos.length > 0 && (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${Math.min(e.photos.length, 3)},1fr)`,
                          gap: 6,
                          marginTop: 10,
                        }}
                      >
                        {e.photos.map((p, j) => (
                          <PlaceholderImage
                            key={j}
                            label={p}
                            ratio="1"
                            tone={j % 2 ? 'beige' : 'pink'}
                            radius={12}
                          />
                        ))}
                      </div>
                    )}
                    <div
                      style={{
                        display: 'flex',
                        gap: 14,
                        marginTop: 12,
                        color: T7.ink3,
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Ic7.heart size={14} color={T7.pink} /> 12
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Ic7.book size={14} /> Notas
                      </span>
                      <span style={{ marginLeft: 'auto' }}>
                        <Ic7.more size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TabBar active={tab} onChange={setTab} />
    </div>
  );
}

window.DiaryScreen = DiaryScreen;
