'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function RosterClient({ teams, spares }) {
  const [expandedTeams, setExpandedTeams] = useState({});

  const toggleTeam = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  return (
    <div>
      <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
           <h1>League Roster & Network</h1>
           <p>View current teams, verify your players, and contact Official Spares.</p>
        </div>
        <Link href="/spares" className="btn" style={{ padding: '0.75rem 1.5rem', background: '#00E676', color: '#000', border: 'none', fontWeight: 700 }}>
          🏐 Join as a Spare
        </Link>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <section>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>League Teams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {teams.map(team => {
              const isExpanded = !!expandedTeams[team.id];
              return (
                <div key={team.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div 
                    onClick={() => toggleTeam(team.id)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                         <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{team.name}</h3>
                         {/* High Visibility Dynamic Payment Status Sticker */}
                         {team.hasPaid && <span className="badge primary" style={{background: '#00E676', color: '#000', fontSize: '0.6rem', padding: '0.15rem 0.5rem', border: 'none', letterSpacing: '0.5px'}}>💰 PAID</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Captain: {team.captainName}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="badge secondary">Div {team.division}</span>
                      <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>{isExpanded ? '−' : '+'}</span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <ul style={{ listStyleMode: 'none', padding: 0, margin: '1rem 0 0 0', borderTop: '1px solid var(--border-color)' }}>
                      {team.users.map(player => (
                        <li key={player.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{player.name}</span>
                            {player.role === 'Captain' && <span className="badge danger" style={{ background: 'var(--accent-color)', color: 'white', padding: '0.15rem 0.5rem', fontSize: '0.65rem' }}>C</span>}
                          </div>
                          <a href={`mailto:${player.email}`} onClick={e => e.stopPropagation()} style={{ fontSize: '0.85rem', color: 'var(--secondary-color)', textDecoration: 'underline' }}>{player.email}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Official Spares</h2>
          <div className="card glass-panel" style={{ padding: '1.5rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              The following players are officially registered substitute spares. Click their email below to contact them quickly.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {spares.map(spare => (
                <div key={spare.id} style={{ 
                  background: 'var(--bg-color)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex', flexDirection: 'column'
                }}>
                  <strong style={{ color: 'var(--text-main)' }}>{spare.name}</strong>
                  <a href={`mailto:${spare.email}`} style={{ fontSize: '0.85rem', color: 'var(--secondary-color)', marginTop: '0.25rem', textDecoration: 'underline' }}>{spare.email}</a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
