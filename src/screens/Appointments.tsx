import React from 'react';
// Appointments — Consultas + Exames tabs, mini calendar, next + recent lists.
const { TOKENS: T6, I: Ic6 } = window;

export function AppointmentsScreen() {
  const [tab, setTab] = React.useState('appt');
  const [seg, setSeg] = React.useState('consultas'); // consultas | exames
  const [day, setDay] = React.useState(14);

  const list = seg === 'consultas' ? APPOINTMENTS : EXAMS;
  const next = list.filter(i => i.status === 'next');
  const past = list.filter(i => i.status === 'past');

  // marked days
  const marked = [3, 14, 21, 22, 28];

  return (
    <div className="petsy" data-screen-label="05 · Appointments" style={{ height: '100%', width: '100%', background: T6.bg, position: 'relative', overflow: 'hidden' }}>
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 130 }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 4px' }}>
          <div>
            <div style={{ fontSize: 12, color: T6.ink2, fontWeight: 700 }}>Agenda</div>
            <h1 style={{ fontSize: 30, marginTop: 2, fontWeight: 700 }}>Consultas & Exames</h1>
          </div>
          <button style={{
            width: 44, height: 44, borderRadius: 999, background: T6.pink, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(237,143,170,0.4)',
          }}><Ic6.plus size={22} color="#fff"/></button>
        </div>

        {/* Segment */}
        <div style={{ padding: '14px 18px 0' }}>
          <div style={{ display: 'flex', background: T6.bgDeep, borderRadius: 999, padding: 4 }}>
            {[{ id: 'consultas', l: 'Consultas', c: APPOINTMENTS.length, ic: <Ic6.stetho size={16}/> },
              { id: 'exames', l: 'Exames', c: EXAMS.length, ic: <Ic6.syringe size={16}/> }].map(t => (
              <button key={t.id} onClick={() => setSeg(t.id)} style={{
                flex: 1, padding: '10px 0', borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: seg === t.id ? T6.surface : 'transparent',
                color: seg === t.id ? T6.ink : T6.ink3,
                fontSize: 14, fontWeight: 700,
                boxShadow: seg === t.id ? T6.shadowSm : 'none',
              }}>{React.cloneElement(t.ic, { color: seg === t.id ? T6.pink : T6.ink3 })}{t.l} <span style={{ fontSize: 11, opacity: 0.7 }}>· {t.c}</span></button>
            ))}
          </div>
        </div>

        {/* Calendar card */}
        <div style={{ margin: '14px 18px 0', background: T6.surface, borderRadius: 22, padding: 16, boxShadow: T6.shadowSm }}>
          <MiniCalendar month="Maio 2026" activeDay={day} marked={marked} onPick={setDay}/>
          {/* selected day pill */}
          <div style={{
            marginTop: 12, padding: '10px 14px', background: T6.pinkPale, borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 11, color: T6.pink, fontWeight: 700 }}>QUI · 14 MAI</div>
              <div style={{ fontFamily: T6.fontDisplay, fontWeight: 700, fontSize: 14 }}>2 compromissos</div>
            </div>
            <button style={{
              padding: '6px 14px', borderRadius: 999, background: T6.pink, color: '#fff',
              fontSize: 12, fontWeight: 700,
            }}>Ver dia</button>
          </div>
        </div>

        {/* Próximos */}
        <div style={{ padding: '22px 22px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Próximos</h3>
          <span style={{ fontSize: 12, color: T6.pink, fontWeight: 700 }}>Ver todos</span>
        </div>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {next.map(item => <ApptCard key={item.id} item={item} kind={seg}/>)}
        </div>

        {/* Recentes */}
        <div style={{ padding: '22px 22px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Recentes</h3>
          <span style={{ fontSize: 12, color: T6.pink, fontWeight: 700 }}>Histórico</span>
        </div>
        <div style={{ padding: '0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {past.map(item => <ApptCard key={item.id} item={item} kind={seg} past/>)}
        </div>
      </div>

      <TabBar active={tab} onChange={setTab}/>
    </div>
  );
}

function ApptCard({ item, kind, past }) {
  const pet = petById(item.petId);
  const isExam = kind === 'exames';
  const [d, m] = item.date.split('/');
  return (
    <div style={{
      background: T6.surface, borderRadius: 20, padding: 14, boxShadow: T6.shadowSm,
      display: 'flex', gap: 14, alignItems: 'center', opacity: past ? 0.7 : 1,
    }}>
      {/* date block */}
      <div style={{
        width: 56, height: 64, borderRadius: 14, background: past ? T6.bgDeep : T6.pinkPale,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        color: past ? T6.ink3 : T6.pink, flexShrink: 0,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][parseInt(m, 10) - 1]}</div>
        <div style={{ fontFamily: T6.fontDisplay, fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{parseInt(d, 10)}</div>
        <div style={{ fontSize: 10, fontWeight: 700 }}>{item.time}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <PetAvatar name={pet.name} tone={pet.tone} size={18}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: T6.ink2 }}>{pet.name}</span>
          {isExam && <Tag tone="warn" size="sm">Exame</Tag>}
          {!isExam && !past && <Tag tone="pink" size="sm">Consulta</Tag>}
          {past && <Tag tone="beige" size="sm">Concluído</Tag>}
        </div>
        <div style={{ fontFamily: T6.fontDisplay, fontWeight: 700, fontSize: 15, color: T6.ink }}>{item.title}</div>
        <div style={{ fontSize: 11, color: T6.ink3, fontWeight: 600, marginTop: 2 }}>{item.vet || item.lab}</div>
        {item.notes && !past && (
          <div style={{ fontSize: 11, color: T6.ink2, marginTop: 6, padding: '6px 8px', background: T6.bg, borderRadius: 8, fontWeight: 600 }}>
            ⚠︎ {item.notes}
          </div>
        )}
      </div>
      <Ic6.chevronR size={16} color={T6.ink3}/>
    </div>
  );
}

window.AppointmentsScreen = AppointmentsScreen;
