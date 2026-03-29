'use client';
import { updateMatchAdmin } from '@/app/actions/adminActions';
import { useTransition, useRef } from 'react';

export default function AdminMatchEditor({ matches }) {
  if (!matches || matches.length === 0) return <div>No matches found in database.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {matches.map(m => <MatchEditorRow key={m.id} match={m} />)}
    </div>
  );
}

function MatchEditorRow({ match }) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef(null);

  async function handleSave(formData) {
    formData.append('matchId', match.id);
    startTransition(async () => {
      const res = await updateMatchAdmin(formData);
      if(res.success) {
         if(formRef.current) {
            formRef.current.style.borderLeft = '4px solid #00E676';
            setTimeout(() => {
                if(formRef.current) formRef.current.style.borderLeft = '1px solid var(--border-color)';
            }, 3000);
         }
      } else {
         alert('Update Error: ' + res.error);
      }
    });
  }

  // Parse safety for standard browser date inputs (YYYY-MM-DD)
  const dateObj = new Date(match.date);
  const dateStr = !isNaN(dateObj.getTime()) ? dateObj.toISOString().split('T')[0] : '';
  
  const inputStyle = { 
     padding: '0.5rem', 
     background: 'var(--bg-color)', 
     color: 'white', 
     border: '1px solid var(--border-color)', 
     borderRadius: '6px', 
     width: '100%',
     outline: 'none',
     fontFamily: 'inherit'
  };

  return (
    <form ref={formRef} action={handleSave} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', transition: 'border-left 0.3s' }}>
      
      {/* Date / Time / Location Overrides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
        <div>
           <label style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Date</label>
           <input name="date" type="date" defaultValue={dateStr} style={inputStyle} required />
        </div>
        <div>
           <label style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Time (24h)</label>
           <input name="time" type="time" defaultValue={match.time} style={inputStyle} required />
        </div>
        <div>
           <label style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'}}>Court</label>
           <input name="court" type="text" defaultValue={match.court} style={inputStyle} required />
        </div>
      </div>

      {/* Score Overrides */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '8px' }}>
         <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{match.homeTeam.name}</div>
            <input name="homeSetsWon" type="number" min="0" max="3" defaultValue={match.isReported ? match.homeSetsWon : ''} placeholder="Sets" style={{...inputStyle, textAlign: 'center', fontSize: '1.2rem'}} />
         </div>
         
         <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>VS</div>
         
         <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.9rem' }}>{match.awayTeam.name}</div>
            <input name="awaySetsWon" type="number" min="0" max="3" defaultValue={match.isReported ? match.awaySetsWon : ''} placeholder="Sets" style={{...inputStyle, textAlign: 'center', fontSize: '1.2rem'}} />
         </div>
      </div>

      {/* Submission */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
         <div className={`badge ${match.isReported ? 'primary' : 'secondary'}`}>
            {match.isReported ? '✓ Official Score Computed' : 'Pending Team Report'}
         </div>
         <button disabled={isPending} type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
            {isPending ? 'Syncing...' : 'Force Save Changes'}
         </button>
      </div>
    </form>
  )
}
