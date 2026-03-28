'use client';
import { useState } from 'react';
import { submitScore } from '@/app/actions/reportScore';

export default function ScoreReporter({ matches }) {
  const [loading, setLoading] = useState(false);
  
  if (!matches || matches.length === 0) return (
    <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--text-muted)' }}>
      No scores to report! You're all caught up.
    </div>
  );

  const handleSubmit = async (e, matchId) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const homeSets = formData.get('homeSets');
    const awaySets = formData.get('awaySets');
    
    await submitScore(matchId, homeSets, awaySets);
    setLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {matches.map(m => (
        <div key={m.id} style={{ border: '1px solid var(--accent-color)', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'var(--bg-color)' }}>
          <div style={{ fontWeight: 600, color: 'var(--accent-color)', marginBottom: '0.5rem' }}>Action Required: Missing Score Report!</div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>{m.homeTeam.name}</strong> vs <strong>{m.awayTeam.name}</strong>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(m.date).toLocaleDateString()} at {m.time}</div>
          </div>
          <form onSubmit={(e) => handleSubmit(e, m.id)} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{m.homeTeam.name} Sets</label>
              <input name="homeSets" type="number" min="0" max="3" required style={{ width: '60px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'white' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', display: 'block', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{m.awayTeam.name} Sets</label>
              <input name="awaySets" type="number" min="0" max="3" required style={{ width: '60px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'white' }} />
            </div>
            <button type="submit" disabled={loading} className="btn badge danger" style={{ marginLeft: 'auto', padding: '0.65rem 1rem' }}>
              {loading ? 'Submitting...' : 'Report'}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}
