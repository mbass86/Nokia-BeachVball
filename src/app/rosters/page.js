'use client';
import { useState } from 'react';
import { mockTeams, mockUsers } from '@/lib/mockData';

export default function Rosters() {
  const [expandedTeams, setExpandedTeams] = useState({});

  const toggleTeam = (teamId) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const getPlayers = (teamId) => mockUsers.filter(u => u.teamId === teamId);
  const spares = mockUsers.filter(u => u.role === 'Spare');

  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1>Team Rosters & Spares</h1>
        <p>View current teams, captains, and listed spares. Connect with captains if you are looking to sub!</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <section>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>League Teams</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {mockTeams.map(team => {
              const players = getPlayers(team.id);
              const isExpanded = !!expandedTeams[team.id];
              
              return (
                <div key={team.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div 
                    onClick={() => toggleTeam(team.id)}
                    style={{ 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      cursor: 'pointer', userSelect: 'none'
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0, color: 'var(--primary-color)' }}>{team.name}</h3>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Captain: {team.captain}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="badge secondary">Div {team.division}</span>
                      <span style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        {isExpanded ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <ul style={{ listStyleMode: 'none', padding: 0, margin: '1rem 0 0 0', borderTop: '1px solid var(--border-color)' }}>
                      {players.map(player => (
                        <li key={player.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{player.name}</span>
                            {player.role === 'Captain' && (
                              <span className="badge danger" style={{ background: 'var(--accent-color)', color: 'white', padding: '0.15rem 0.5rem', fontSize: '0.65rem' }}>C</span>
                            )}
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
              The following players are registered spares and can be contacted by Captains to sub in.
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
