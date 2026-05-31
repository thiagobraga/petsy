import React from 'react';
import { IconCircle, PetAvatar, PetsyMark, SectionHeader } from '../components.tsx';
import { MEDS, PETS, petById, type Medicine, type Pet } from '../data';
import { I as Ic3 } from '../icons';
import { useAuthStore } from '../stores/auth';
import { usePetStore } from '../stores/pet';
import { TOKENS as T3 } from '../tokens';

// Dashboard — pets list + horizontal medicine schedule
export function DashboardScreen() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const currentUser = useAuthStore((state) => state.currentUser);
  const selectedPetId = usePetStore((state) => state.selectedPetId);
  const selectPet = usePetStore((state) => state.selectPet);
  const [activePet, setActivePet] = React.useState(selectedPetId ?? 'luna');
  const selectedPet = PETS.find((pet) => pet.id === activePet);
  const visibleMeds = MEDS.filter((med) => activePet === 'all' || med.petId === activePet);
  const nextMed = visibleMeds[0];
  const nextMedPet = nextMed ? petById(nextMed.petId) : null;
  const displayName = currentUser?.name || 'Thiago Braga';
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  React.useEffect(() => {
    if (selectedPetId) setActivePet(selectedPetId);
  }, [selectedPetId]);

  const handlePetSelect = (petId: string) => {
    setActivePet(petId);
    selectPet(petId);
    setMenuOpen(false);
  };

  return (
    <div
      className="petsy"
      data-screen-label="02 · Dashboard"
      style={{
        height: '100%',
        width: '100%',
        background: T3.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div data-scroll style={{ height: '100%', overflowY: 'auto', paddingBottom: 24 }}>
        {/* top bar */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: T3.bg,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px 16px',
            borderBottom: `1px solid ${T3.borderSoft}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: T3.pinkSoft,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: T3.pink,
                fontFamily: T3.fontDisplay,
                fontWeight: 700,
              }}
            >
              {initials || 'AM'}
            </div>
            <div>
              <div style={{ fontSize: 12, color: T3.ink2, fontWeight: 600 }}>Olá,</div>
              <div style={{ fontSize: 17, fontWeight: 700, fontFamily: T3.fontDisplay }}>
                {displayName}
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                ...iconBtn(T3),
                background: menuOpen ? T3.bgDeep : 'transparent',
              }}
            >
              <Ic3.menu size={20} color={T3.ink} />
            </button>
            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 50,
                  right: 0,
                  background: T3.surface,
                  borderRadius: T3.r2,
                  boxShadow: T3.shadow,
                  minWidth: 180,
                  zIndex: 100,
                }}
              >
                {PETS.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => handlePetSelect(pet.id)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      textAlign: 'left',
                      borderBottom: `1px solid ${T3.borderSoft}`,
                      fontSize: 14,
                      fontWeight: activePet === pet.id ? 700 : 500,
                      color: activePet === pet.id ? T3.pink : T3.ink,
                      background: activePet === pet.id ? T3.pinkPale : 'transparent',
                      cursor: 'pointer',
                    }}
                  >
                    {pet.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* greeting card */}
        <div
          style={{
            margin: '14px 18px 18px',
            padding: '18px 18px 18px 78px',
            borderRadius: 24,
            background: T3.pinkSoft,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
              bottom: 12,
              width: 56,
              borderRadius: '50%',
              background: T3.surface,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PetsyMark size={36} />
          </div>
          <div
            style={{ fontFamily: T3.fontDisplay, fontSize: 16, fontWeight: 700, lineHeight: 1.25 }}
          >
            {selectedPet
              ? `${selectedPet.name} · ${visibleMeds.length} lembretes`
              : `${PETS.length} pets · ${visibleMeds.length} lembretes`}
          </div>
          <div style={{ fontSize: 12, color: T3.ink2, marginTop: 4, fontWeight: 600 }}>
            {nextMed && nextMedPet
              ? `Próximo: ${nextMed.name} para ${nextMedPet.name} · ${nextMed.next}`
              : 'Nenhum lembrete pendente'}
          </div>
          <div style={{ position: 'absolute', right: -16, bottom: -16, opacity: 0.35 }}>
            <PetsyMark size={90} />
          </div>
        </div>

        {/* My Pets */}
        <div style={{ padding: '28px 20px 12px' }}>
          <SectionHeader title="Meus pets" action="Ver todos" />
        </div>
        <div
          data-scroll
          style={{ display: 'flex', gap: 12, padding: '8px 20px 16px', overflowX: 'auto' }}
        >
          {PETS.map((p) => (
            <PetCard
              key={p.id}
              pet={p}
              active={p.id === activePet}
              onClick={() => handlePetSelect(p.id)}
            />
          ))}
          <AddPetCard />
        </div>

        {/* Medicine management */}
        <div style={{ padding: '28px 20px 12px' }}>
          <SectionHeader title="Medicações de hoje" action="Ver agenda" />
        </div>

        <div style={{ padding: '12px 0 6px 18px' }}>
          {/* Pet selector pills */}
          <div
            data-scroll
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingRight: 18,
              marginBottom: 12,
            }}
          >
            {[{ id: 'all', name: 'Todos' }, ...PETS].map((p) => (
              <button
                key={p.id}
                onClick={() => (p.id === 'all' ? setActivePet(p.id) : handlePetSelect(p.id))}
                style={{
                  padding: '6px 12px',
                  borderRadius: 999,
                  background:
                    activePet === p.id || (p.id === 'all' && activePet === 'all')
                      ? T3.ink
                      : T3.surface,
                  color:
                    activePet === p.id || (p.id === 'all' && activePet === 'all') ? '#fff' : T3.ink,
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  border: `1px solid ${T3.border}`,
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Med rows — horizontal scroll cards */}
          <div
            data-scroll
            style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 18 }}
          >
            {visibleMeds.map((m) => (
              <MedRow key={m.id} med={m} />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ padding: '28px 20px 12px' }}>
          <SectionHeader title="Acesso rápido" />
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 12,
            padding: '8px 20px 28px',
          }}
        >
          {[
            { i: <Ic3.pill size={20} />, l: 'Medicar', t: 'pink' },
            { i: <Ic3.stetho size={20} />, l: 'Agendar', t: 'rose' },
            { i: <Ic3.weight size={20} />, l: 'Peso', t: 'beige' },
            { i: <Ic3.book size={20} />, l: 'Diário', t: 'sage' },
          ].map((a, i) => (
            <button
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 18,
                background: T3.surface,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: T3.shadowSm,
              }}
            >
              <IconCircle icon={a.i} tone={a.t} size={38} />
              <span style={{ fontSize: 11, fontWeight: 700, color: T3.ink }}>{a.l}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PetCard({ pet, active, onClick }: { pet: Pet; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 136,
        padding: 14,
        borderRadius: 22,
        flexShrink: 0,
        textAlign: 'left',
        background: active ? T3.pink : T3.surface,
        color: active ? '#fff' : T3.ink,
        boxShadow: active ? '0 8px 22px rgba(237,143,170,0.4)' : T3.shadowSm,
        transition: 'all .2s',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <PetAvatar
          name={pet.name}
          tone={pet.tone as 'pink' | 'cream' | 'cocoa' | 'sage' | 'rose'}
          size={52}
          slot={pet.photo}
        />
        <Ic3.more size={16} color={active ? 'rgba(255,255,255,0.7)' : T3.ink3} />
      </div>
      <div style={{ fontFamily: T3.fontDisplay, fontWeight: 700, fontSize: 17, marginTop: 12 }}>
        {pet.name}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, opacity: active ? 0.85 : 0.7, marginTop: 2 }}>
        {pet.breed}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 10 }}>
        <span style={chipMini(active, T3)}>{pet.age.split('·')[0]}</span>
        <span style={chipMini(active, T3)}>{pet.weight}</span>
      </div>
    </button>
  );
}

function AddPetCard() {
  return (
    <button
      style={{
        width: 96,
        borderRadius: 22,
        flexShrink: 0,
        border: `2px dashed ${T3.pink}`,
        background: T3.pinkPale,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        color: T3.pink,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          background: T3.pink,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ic3.plus size={18} color="#fff" />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700 }}>Adicionar</span>
    </button>
  );
}

function MedRow({ med }: { med: Medicine }) {
  const pet = petById(med.petId);
  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  return (
    <div
      style={{
        background: T3.surface,
        borderRadius: 20,
        padding: 14,
        boxShadow: T3.shadowSm,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
      }}
    >
      <IconCircle
        icon={<Ic3.pill />}
        tone={med.color as 'pink' | 'rose' | 'beige' | 'sage' | 'amber' | 'cocoa'}
        size={48}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <div style={{ fontFamily: T3.fontDisplay, fontWeight: 700, fontSize: 15, color: T3.ink }}>
            {med.name}
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: T3.ink3, whiteSpace: 'nowrap' }}>
            {med.next}
          </div>
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
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 32,
                  borderRadius: 8,
                  background: taken ? T3.pinkPale : T3.bgDeep,
                  border: isToday ? `1.5px solid ${T3.pink}` : '1.5px solid transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: taken ? T3.pink : T3.ink3,
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                <span>{d}</span>
                {taken && <Ic3.check size={9} color={T3.pink} stroke={3} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const iconBtn = (T: typeof T3) => ({
  width: 40,
  height: 40,
  borderRadius: 999,
  background: T.surface,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: T.shadowSm,
});
const chipMini = (active: boolean, T: typeof T3) => ({
  padding: '3px 7px',
  borderRadius: 999,
  fontSize: 9,
  fontWeight: 700,
  background: active ? 'rgba(255,255,255,0.25)' : T.bgDeep,
  color: active ? '#fff' : T.ink2,
});

window.DashboardScreen = DashboardScreen;
