// Medicines page — list for all pets, filter by pet.
const { TOKENS: T5, I: Ic5 } = window;

function MedicinesScreen({ petFilter = 'all' }) {
  const [tab, setTab] = React.useState('meds');
  const [active, setActive] = React.useState(petFilter);
  const [checked, setChecked] = React.useState({ m1: true, m3: false });

  const list = MEDS.filter(m => active === 'all' || m.petId === active);

  return (
    <div className="petsy" data-screen-label="04 · Medicines" style={{ height: '100%', width: '100%', background: T5.bg, position: 'relative', overflow: 'hidden' }}>
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 130 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 4px' }}>
          <div>
            <div style={{ fontSize: 12, color: T5.ink2, fontWeight: 700 }}>Hoje · 27 mai</div>
            <h1 style={{ fontSize: 30, marginTop: 2, fontWeight: 700 }}>Medicações</h1>
          </div>
          <button style={{
            width: 44, height: 44, borderRadius: 999, background: T5.pink, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(237,143,170,0.4)',
          }}><Ic5.plus size={22} color="#fff"/></button>
        </div>

        {/* pet filter */}
        <div data-scroll style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 18px' }}>
          {[{ id: 'all', name: 'Todos', count: MEDS.length, tone: 'beige' }, ...PETS.map(p => ({ ...p, count: MEDS.filter(m => m.petId === p.id).length }))].map(p => {
            const isActive = active === p.id;
            return (
              <button key={p.id} onClick={() => setActive(p.id)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: p.id === 'all' ? '8px 14px' : '6px 14px 6px 6px',
                borderRadius: 999, flexShrink: 0,
                background: isActive ? T5.ink : T5.surface,
                color: isActive ? '#fff' : T5.ink,
                border: `1px solid ${T5.border}`,
                fontWeight: 700, fontSize: 13,
              }}>
                {p.id !== 'all' && <PetAvatar name={p.name} tone={p.tone} size={28}/>}
                <span>{p.name}</span>
                <span style={{
                  background: isActive ? 'rgba(255,255,255,0.2)' : T5.pinkPale,
                  color: isActive ? '#fff' : T5.pink,
                  borderRadius: 999, padding: '1px 7px', fontSize: 11, fontWeight: 800,
                }}>{p.count}</span>
              </button>
            );
          })}
        </div>

        {/* Today summary */}
        <div style={{ margin: '0 18px 14px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
          <SummaryTile n="2" l="A dar" tone="pink"/>
          <SummaryTile n="3" l="Aplicadas" tone="ok"/>
          <SummaryTile n="0" l="Atrasadas" tone="beige"/>
        </div>

        {/* Section: a dar agora */}
        <div style={{ padding: '4px 22px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>A dar hoje</h3>
          <span style={{ fontSize: 12, color: T5.ink3, fontWeight: 700 }}>{list.length} med.</span>
        </div>

        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map(m => {
            const pet = petById(m.petId);
            return (
              <div key={m.id} style={{
                background: T5.surface, borderRadius: 22, padding: 14,
                boxShadow: T5.shadowSm, display: 'flex', gap: 12,
              }}>
                <IconCircle icon={<Ic5.pill/>} tone={m.color} size={48}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: T5.fontDisplay, fontWeight: 700, fontSize: 15 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: T5.ink3, fontWeight: 700 }}>{m.next}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <PetAvatar name={pet.name} tone={pet.tone} size={18}/>
                    <span style={{ fontSize: 11, fontWeight: 700, color: T5.ink2 }}>{pet.name}</span>
                    <span style={{ fontSize: 11, color: T5.ink3 }}>· {m.purpose}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    {m.when.map((t, i) => (
                      <div key={i} style={{
                        flex: 1, height: 34, borderRadius: 10,
                        background: T5.pinkPale, color: T5.ink,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '0 10px', fontSize: 12, fontWeight: 700,
                      }}>
                        <span>{t}</span>
                        <span style={{ color: T5.ink3, fontSize: 10 }}>{m.dose}</span>
                      </div>
                    ))}
                  </div>
                  {/* check actions */}
                  <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                    {m.when.map((t, i) => (
                      <button key={i}
                        onClick={() => setChecked(c => ({ ...c, [m.id + '-' + i]: !c[m.id + '-' + i] }))}
                        style={{
                          flex: 1, height: 36, borderRadius: 10, display: 'flex',
                          alignItems: 'center', justifyContent: 'center', gap: 6,
                          background: checked[m.id + '-' + i] ? T5.pink : T5.bgDeep,
                          color: checked[m.id + '-' + i] ? '#fff' : T5.ink2,
                          fontWeight: 700, fontSize: 12,
                        }}>
                        {checked[m.id + '-' + i] ? <Ic5.check size={14} color="#fff" stroke={3}/> : <Ic5.pill size={14} color={T5.ink2}/>}
                        {checked[m.id + '-' + i] ? 'Aplicada' : 'Aplicar'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tratamento ativo */}
        <div style={{ padding: '20px 22px 8px' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Tratamentos ativos</h3>
        </div>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {list.map(m => {
            const pet = petById(m.petId);
            return (
              <div key={'t' + m.id} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 12,
                background: T5.surface, borderRadius: 16, boxShadow: T5.shadowSm,
              }}>
                <PetAvatar name={pet.name} tone={pet.tone} size={36}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T5.ink }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: T5.ink3, fontWeight: 600 }}>{m.start} → {m.end}</div>
                </div>
                <Tag tone={m.color === 'pink' ? 'pink' : m.color === 'sage' ? 'ok' : 'warn'} size="sm">{m.frequency}</Tag>
                <Ic5.chevronR size={16} color={T5.ink3}/>
              </div>
            );
          })}
        </div>
      </div>

      <TabBar active={tab} onChange={setTab}/>
    </div>
  );
}

function SummaryTile({ n, l, tone }) {
  const tones = { pink: T5.pink, ok: '#5B8451', beige: T5.ink2 };
  const bgs = { pink: T5.pinkPale, ok: '#E4F0DE', beige: T5.bgDeep };
  return (
    <div style={{ background: bgs[tone], borderRadius: 16, padding: '12px 14px' }}>
      <div style={{ fontFamily: T5.fontDisplay, fontSize: 22, fontWeight: 700, color: tones[tone] }}>{n}</div>
      <div style={{ fontSize: 11, fontWeight: 700, color: tones[tone], opacity: 0.8 }}>{l}</div>
    </div>
  );
}

window.MedicinesScreen = MedicinesScreen;
