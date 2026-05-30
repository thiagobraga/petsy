// Pet Detail screen — header card + tabs to medicines / appointments / exams
const { TOKENS: T4, I: Ic4 } = window;

export function PetDetailScreen({ petId = 'luna' }) {
  const pet = petById(petId);
  const [section, setSection] = React.useState('about');

  return (
    <div className="petsy" data-screen-label="03 · Pet Detail" style={{ height: '100%', width: '100%', background: T4.bg, position: 'relative', overflow: 'hidden' }}>
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 40 }}>

        {/* hero */}
        <div style={{
          position: 'relative',
          background: `linear-gradient(180deg, ${T4.pinkSoft} 0%, ${T4.pinkPale} 100%)`,
          paddingBottom: 70,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px' }}>
            <button style={iconBtn4()}><Ic4.chevronL size={20} color={T4.ink}/></button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={iconBtn4()}><Ic4.heart size={18} color={T4.pink}/></button>
              <button style={iconBtn4()}><Ic4.edit size={18} color={T4.ink}/></button>
            </div>
          </div>

          {/* Decorative paws */}
          <div style={{ position: 'absolute', top: 70, left: 22, opacity: 0.25 }}><PetsyMark size={28} color={T4.pink}/></div>
          <div style={{ position: 'absolute', top: 130, right: 30, opacity: 0.18 }}><PetsyMark size={22} color={T4.pink}/></div>

          <div style={{ marginTop: 18, padding: '0 28px', textAlign: 'center' }}>
            <div style={{ width: 144, height: 144, margin: '0 auto', borderRadius: '50%',
              background: T4.surface, padding: 6, boxShadow: T4.shadow }}>
              <PetAvatar name={pet.name} tone={pet.tone} size={132} slot={pet.photo}/>
            </div>
            <h1 style={{ fontSize: 32, marginTop: 14, fontWeight: 700 }}>{pet.name}</h1>
            <div style={{ fontSize: 13, color: T4.ink2, fontWeight: 600, marginTop: 2 }}>{pet.breed}</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
              <Tag tone="pink" size="md">{pet.sex}</Tag>
              <Tag tone="beige" size="md">{pet.age}</Tag>
              <Tag tone={pet.castrated.value ? 'ok' : 'warn'} size="md">
                {pet.castrated.value ? 'Castrado' : 'Não castrado'}
              </Tag>
            </div>
          </div>
        </div>

        {/* stats row */}
        <div style={{ margin: '-40px 18px 0', background: T4.surface, borderRadius: 22, padding: 14,
          display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', boxShadow: T4.shadow, position: 'relative', zIndex: 2 }}>
          <Stat label="Peso" value={pet.weight} icon={<Ic4.weight size={16}/>} tone="pink"/>
          <Stat label="Idade" value={pet.age.split('·')[0].trim()} icon={<Ic4.heart size={16}/>} tone="rose" divider/>
          <Stat label="Sexo" value={pet.sex} icon={<Ic4.paw size={16}/>} tone="amber"/>
        </div>

        {/* nav links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, padding: '18px 18px 0' }}>
          {[
            { l: 'Medicines', icon: <Ic4.pill/>, t: 'pink', count: MEDS.filter(m => m.petId === petId).length },
            { l: 'Visits', icon: <Ic4.stetho/>, t: 'rose', count: APPOINTMENTS.filter(a => a.petId === petId).length },
            { l: 'Exams', icon: <Ic4.syringe/>, t: 'amber', count: EXAMS.filter(e => e.petId === petId).length },
          ].map((l, i) => (
            <button key={i} style={{
              background: T4.surface, borderRadius: 18, padding: '14px 12px',
              boxShadow: T4.shadowSm, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
            }}>
              <IconCircle icon={l.icon} tone={l.t} size={36}/>
              <div>
                <div style={{ fontFamily: T4.fontDisplay, fontWeight: 700, fontSize: 13 }}>{l.l}</div>
                <div style={{ fontSize: 11, color: T4.ink3, fontWeight: 600 }}>{l.count} ativos</div>
              </div>
            </button>
          ))}
        </div>

        {/* segmented section */}
        <div style={{ padding: '20px 18px 0' }}>
          <div style={{
            display: 'flex', background: T4.bgDeep, borderRadius: 999, padding: 4,
          }}>
            {[{ id: 'about', l: 'Sobre' }, { id: 'health', l: 'Saúde' }, { id: 'notes', l: 'Notas' }].map(t => (
              <button key={t.id} onClick={() => setSection(t.id)} style={{
                flex: 1, padding: '8px 0', borderRadius: 999,
                background: section === t.id ? T4.surface : 'transparent',
                color: section === t.id ? T4.ink : T4.ink3,
                fontSize: 13, fontWeight: 700,
                boxShadow: section === t.id ? T4.shadowSm : 'none',
              }}>{t.l}</button>
            ))}
          </div>
        </div>

        {/* About content */}
        {section === 'about' && (
          <div data-fade style={{ padding: '14px 18px 0' }}>
            <InfoCard rows={[
              { label: 'Nome', value: pet.name },
              { label: 'Raça', value: pet.breed },
              { label: 'Data de nascimento', value: pet.dob },
              { label: 'Cor', value: pet.color },
              { label: 'Castrado', value: pet.castrated.value ? `Sim · ${pet.castrated.date}` : 'Não' },
              { label: 'Microchip', value: pet.microchip, mono: true },
            ]}/>

            {/* Weight chart card */}
            <div style={{ background: T4.surface, borderRadius: 22, padding: 16, marginTop: 12, boxShadow: T4.shadowSm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: T4.ink3, fontWeight: 700 }}>PESO</div>
                  <div style={{ fontFamily: T4.fontDisplay, fontSize: 22, fontWeight: 700 }}>{pet.weight}</div>
                </div>
                <Tag tone="ok">+0,4 kg / 30d</Tag>
              </div>
              <WeightSpark/>
            </div>
          </div>
        )}

        {section === 'health' && (
          <div data-fade style={{ padding: '14px 18px 0' }}>
            <InfoCard rows={[
              { label: 'Vermifugação', value: '01 Mai 2026' },
              { label: 'Antipulgas', value: '14 Mar 2026 — 06 Jun' },
              { label: 'V10 (vacina)', value: '28 Fev 2026 ✓' },
              { label: 'Antirrábica', value: '12 Set 2025 ✓' },
              { label: 'Última consulta', value: '14 Mai 2026' },
            ]}/>
          </div>
        )}

        {section === 'notes' && (
          <div data-fade style={{ padding: '14px 18px 0' }}>
            <div style={{ background: T4.surface, borderRadius: 22, padding: 16, boxShadow: T4.shadowSm,
              fontSize: 13, color: T4.ink2, lineHeight: 1.5, fontWeight: 500 }} contentEditable suppressContentEditableWarning>
              Luna tem alergia leve a poeira e ácaros. Apoquel funciona bem. Não come ração com frango. Adora água — leva muito bem ao mar e à banheira.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, icon, tone, divider }) {
  return (
    <div style={{
      padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 10,
      borderLeft: divider ? `1px solid ${T4.border}` : 'none',
      borderRight: divider ? `1px solid ${T4.border}` : 'none',
    }}>
      <IconCircle icon={icon} tone={tone} size={32}/>
      <div>
        <div style={{ fontSize: 10, color: T4.ink3, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontFamily: T4.fontDisplay, fontWeight: 700, fontSize: 14 }}>{value}</div>
      </div>
    </div>
  );
}

function InfoCard({ rows }) {
  return (
    <div style={{ background: T4.surface, borderRadius: 22, padding: '6px 4px', boxShadow: T4.shadowSm }}>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 16px', borderBottom: i < rows.length - 1 ? `1px solid ${T4.borderSoft}` : 'none' }}>
          <span style={{ fontSize: 12, color: T4.ink3, fontWeight: 600 }}>{r.label}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: T4.ink, fontFamily: r.mono ? T4.fontMono : T4.fontBody }}
            contentEditable suppressContentEditableWarning>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function WeightSpark() {
  const data = [27.5, 27.8, 27.4, 28.0, 28.1, 27.9, 28.4];
  const max = Math.max(...data), min = Math.min(...data);
  const w = 280, h = 72;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * (h - 12) - 6,
  ]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  const area = `${path} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T4.pink} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={T4.pink} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#grad)"/>
      <path d={path} fill="none" stroke={T4.pink} strokeWidth={2.5} strokeLinecap="round"/>
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 4 : 0} fill={T4.pink} stroke="#fff" strokeWidth={2}/>)}
    </svg>
  );
}

function iconBtn4() {
  return {
    width: 40, height: 40, borderRadius: 999, background: T4.surface,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: T4.shadowSm,
  };
}

window.PetDetailScreen = PetDetailScreen;
