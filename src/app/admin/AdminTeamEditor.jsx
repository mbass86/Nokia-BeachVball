'use client';
import { toggleTeamPaymentStatus } from '@/app/actions/adminActions';
import { useTransition } from 'react';

export default function AdminTeamEditor({ teams }) {
  if (!teams || teams.length === 0) return <div>No teams exist in database.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      {teams.map(team => <TeamFinanceRow key={team.id} team={team} />)}
    </div>
  );
}

function TeamFinanceRow({ team }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleTeamPaymentStatus(team.id, team.hasPaid);
      if (!res.success) alert(res.error);
    });
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0.75rem', 
      background: 'var(--surface-color)', 
      borderRadius: '6px',
      borderLeft: team.hasPaid ? '4px solid #00E676' : '4px solid var(--accent-color)'
    }}>
      <div>
        <div style={{ fontWeight: 600 }}>{team.name}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Captain: {team.captainName}</div>
      </div>
      
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className={`btn ${team.hasPaid ? 'btn-secondary' : 'btn-primary'}`}
        style={{ width: '120px', padding: '0.5rem', opacity: isPending ? 0.5 : 1 }}
      >
        {isPending ? 'Syncing...' : (team.hasPaid ? 'Mark Unpaid' : 'Collect Dues')}
      </button>
    </div>
  )
}
