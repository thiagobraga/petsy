// Dashboard — pets list + horizontal medicine schedule
const { TOKENS: T3, I: Ic3 } = window;

function DashboardScreen() {
  const [tab, setTab] = React.useState('home');
  const [activePet, setActivePet] = React.useState('luna');

  return (
    <div className="petsy" data-screen-label="02 · Dashboard" style={{
      height: '100%', width: '100%', background: T3.bg, position: 'relative', overflow: 'hidden',
    }}>
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>

        {/* top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: T3.pinkSoft, display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: T3.pink, fontFamily: T3.fontDisplay, fontWeight: 700 }}>AM</div>
            <div>
              <div style={{ fontSize: 12, color: T3.ink2, fontWeight: 600 }}>Olá,</div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: T3.fontDisplay }}>Ana Maria</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={iconBtn(T3)}><Ic3.search size={20} color={T3.ink}/></button>
            <button style={{ ...iconBtn(T3), position: 'relative' }}>
              <Ic3.bell size={20} color={T3.ink}/>
              <span style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, borderRadius: 999, background: T3.pink, border: '2px solid #fff' }}/>
            </button>
          </div>
        </div>

        {/* greeting card */}
        <div style={{ margin: '14px 18px 18px', padding: '18px 18px 18px 78px', borderRadius: 24, background: T3.pinkSoft, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 12, top: 12, bottom: 12, width: 56, borderRadius: '50%',
            background: T3.surface, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PetsyMark size={36}/>
          </div>
          <div style={{ fontFamily: T3.fontDisplay, fontSize: 16, fontWeight: 700, lineHeight: 1.25 }}>
            3 pets · 2 lembretes hoje
          </div>
          <div style={{ fontSize: 12, color: T3.ink2, marginTop: 4, fontWeight: 600 }}>
            Próximo: Apoquel para Luna às 08:00
          </div>
          <div style={{ position: 'absolute', right: -16, bottom: -16, opacity: 0.35 }}><PetsyMark size={90}/></div>
        </div>

        {/* My Pets */}
        <div style={{ padding: '0 18px' }}>
          <SectionHeader title="Meus pets" action="Ver todos"/>
        </div>
        <div data-scroll style={{ display: 'flex', gap: 12, padding: '12px 18px 6px', overflowX: 'auto' }}>
          {PETS.map(p => <PetCard key={p.id} pet={p} active={p.id === activePet} onClick={() => setActivePet(p.id)}/>)}
          <AddPetCard/>
        </div>

        {/* Medicine management */}
        <div style={{ padding: '18px 18px 0' }}>
          <SectionHeader title="Medicações de hoje" action="Ver agenda"/>
        </div>

        <div style={{ padding: '12px 0 6px 18px' }}>
          {/* Pet selector pills */}
          <div data-scroll style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingRight: 18, marginBottom: 12 }}>
            {[{ id: 'all', name: 'Todos' }, ...PETS].map(p => (
              <button key={p.id} onClick={() => setActivePet(p.id)} style={{
                padding: '6px 12px', borderRadius: 999,
                background: (activePet === p.id || (p.id === 'all' && activePet === 'all')) ? T3.ink : T3.surface,
                color: (activePet === p.id || (p.id === 'all' && activePet === 'all')) ? '#fff' : T3.ink,
                fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', border: `1px solid ${T3.border}`,
              }}>{p.name}</button>
            ))}
          </div>

          {/* Med rows — horizontal scroll cards */}
          <div data-scroll style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 18 }}>
            {MEDS.filter(m => activePet === 'all' || m.petId === activePet).map(m => <MedRow key={m.id} med={m}/>)}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '20px 18px 0' }}>
          <SectionHeader title="Acesso rápido"/>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, padding: '12px 18px' }}>
          {[
            { i: <Ic3.pill size={20}/>, l: 'Medicar', t: 'pink' },
            { i: <Ic3.stetho size={20}/>, l: 'Agendar', t: 'rose' },
            { i: <Ic3.weight size={20}/>, l: 'Peso', t: 'beige' },
            { i: <Ic3.book size={20}/>, l: 'Diário', t: 'sage' },
          ].map((a, i) => (
            <button key={i} style={{
              aspectRatio: '1', borderRadius: 18, background: T3.surface,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
              boxShadow: T3.shadowSm,
            }}>
              <IconCircle icon={a.i} tone={a.t} size={38}/>
              <span style={{ fontSize: 11, fontWeight: 700, color: T3.ink }}>{a.l}</span>
            </button>
          ))}
        </div>
      </div>

      <TabBar active={tab} onChange={setTab}/>
    </div>
  );
}

function PetCard({ pet, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 136, padding: 14, borderRadius: 22, flexShrink: 0, textAlign: 'left',
      background: active ? T3.pink : T3.surface,
      color: active ? '#fff' : T3.ink,
      boxShadow: active ? '0 8px 22px rgba(237,143,170,0.4)' : T3.shadowSm,
      transition: 'all .2s', position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <PetAvatar name={pet.name} tone={pet.tone} size={52} slot={pet.photo}/>
        <Ic3.more size={16} color={active ? 'rgba(255,255,255,0.7)' : T3.ink3}/>
      </div>
      <div style={{ fontFamily: T3.fontDisplay, fontWeight: 700, fontSize: 17, marginTop: 12 }}>{pet.name}</div>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: active ? 0.85 : 0.7, marginTop: 2 }}>{pet.breed}</div>
      <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
        <span style={chipMini(active, T3)}>{pet.age.split('·')[0]}</span>
        <span style={chipMini(active, T3)}>{pet.weight}</span>
      </div>
    </button>
  );
}

function AddPetCard() {
  return (
    <button style={{
      width: 96, borderRadius: 22, flexShrink: 0,
      border: `2px dashed ${T3.pink}`, background: T3.pinkPale,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
      color: T3.pink,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 999, background: T3.pink, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Ic3.plus size={18} color="#fff"/>
      </div>
      <span style={{ fontSize: 11, fontWeight: 700 }}>Adicionar</span>
    </button>
  );
}

function MedRow({ med }) {
  const pet = petById(med.petId);
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return (
    <div style={{
      background: T3.surface, borderRadius: 20, padding: 14,
      boxShadow: T3.shadowSm, display: 'flex', gap: 12, alignItems: 'center',
    }}>
      <IconCircle icon={<Ic3.pill/>} tone={med.color} size={48}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ fontFamily: T3.fontDisplay, fontWeight: 700, fontSize: 15, color: T3.ink }}>{med.name}</div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T3.ink3, whiteSpace: 'nowrap' }}>{med.next}</div>
        </div>
        <div style={{ fontSize: 11, color: T3.ink2, fontWeight: 600, marginTop: 2 }}>
          {pet.name} · {med.dose} · {med.frequency}
        </div>
        {/* day strip */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {days.map((d, i) => {
            const taken = med.days[i];
            const isToday = i === 2;
            return (
              <div key={i} style={{
                flex: 1, height: 32, borderRadius: 8,
                background: taken ? T3.pinkPale : T3.bgDeep,
                border: isToday ? `1.5px solid ${T3.pink}` : '1.5px solid transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                color: taken ? T3.pink : T3.ink3,
                fontSize: 9, fontWeight: 700,
              }}>
                <span>{d}</span>
                {taken && <Ic3.check size={9} color={T3.pink} stroke={3}/>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const iconBtn = (T) => ({
  width: 40, height: 40, borderRadius: 999, background: T.surface,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: T.shadowSm,
});
const chipMini = (active, T) => ({
  padding: '3px 7px', borderRadius: 999, fontSize: 9, fontWeight: 700,
  background: active ? 'rgba(255,255,255,0.25)' : T.bgDeep,
  color: active ? '#fff' : T.ink2,
});

window.DashboardScreen = DashboardScreen;
