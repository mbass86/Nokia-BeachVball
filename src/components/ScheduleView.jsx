'use client';
import { useState } from 'react';

export default function ScheduleView({ games }) {
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const getSortScore = (g) => new Date(g.date).getTime();

  const upcomingGames = games.filter(g => g.status === 'Upcoming').sort((a,b) => getSortScore(a) - getSortScore(b));
  const pastGames = games.filter(g => g.status === 'Completed').sort((a,b) => getSortScore(b) - getSortScore(a));
  
  // Sorted list of ALL games for the list view
  const allGames = [...games].sort((a,b) => getSortScore(a) - getSortScore(b));

  const GameCard = ({ game }) => (
    <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        <span>{new Date(game.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' })}</span>
        <span>{game.time} @ {game.court}</span>
      </div>

      {/* Teams Area */}
      <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between', margin: '0.5rem 0 1rem 0' }}>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)' }}>{game.homeTeam.name}</div>
        
        <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>VS</span>
          
          {game.status === 'Completed' && game.isReported && (
            <span className="badge primary" style={{ fontSize: '1rem', padding: '0.4rem 0.8rem' }}>{game.homeSetsWon} - {game.awaySetsWon}</span>
          )}
          
          {game.status === 'Completed' && !game.isReported && (
            <span className="badge danger" style={{ fontSize: '0.65rem' }}>No Score</span>
          )}
        </div>
        
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)' }}>{game.awayTeam.name}</div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className={`badge ${game.type === 'Crossover' ? 'secondary' : 'primary'}`} style={{ fontSize: '0.65rem', background: 'transparent', border: '1px solid var(--border-color)' }}>
          {game.type} Match
        </span>
        <span style={{ fontSize: '0.75rem', color: game.status === 'Completed' ? 'var(--text-muted)' : 'var(--primary-color)', fontWeight: 600, textTransform: 'uppercase' }}>
          {game.status}
        </span>
      </div>

    </div>
  );

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>League Schedule</h1>
          <p>Full upcoming schedule and past match results.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--surface-color)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setView('grid')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: 'none', background: view === 'grid' ? 'var(--primary-color)' : 'transparent', color: view === 'grid' ? 'white' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>
            Grid View
          </button>
          <button 
            onClick={() => setView('list')}
            style={{ padding: '0.5rem 1.5rem', borderRadius: '4px', border: 'none', background: view === 'list' ? 'var(--primary-color)' : 'transparent', color: view === 'list' ? 'white' : 'var(--text-muted)', fontWeight: 600, cursor: 'pointer' }}>
            List View
          </button>
        </div>
      </header>

      {view === 'grid' ? (
        <>
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              Upcoming Games
              <span className="badge primary" style={{fontSize: '0.8rem'}}>{upcomingGames.length} scheduled</span>
            </h2>
            {upcomingGames.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>No upcoming games scheduled.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {upcomingGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            )}
          </section>

          <section>
            <h2 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-main)' }}>
              Past Games (Results)
            </h2>
            {pastGames.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>No games have been played yet.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
                {pastGames.map(game => <GameCard key={game.id} game={game} />)}
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="card glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>All Games</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>Date</th>
                  <th style={{ width: '10%' }}>Time</th>
                  <th style={{ width: '15%' }}>Type</th>
                  <th style={{ width: '25%', textAlign: 'right' }}>Home</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Result</th>
                  <th style={{ width: '25%' }}>Away</th>
                </tr>
              </thead>
              <tbody>
                {allGames.map(game => (
                  <tr key={game.id} style={{ opacity: game.status === 'Completed' ? 0.6 : 1 }}>
                    <td style={{ fontWeight: 600 }}>{new Date(game.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', timeZone: 'UTC' })}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{game.time}</td>
                    <td><span className={`badge ${game.type === 'Crossover' ? 'secondary' : 'primary'}`}>{game.type}</span></td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{game.homeTeam.name}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ padding: '0.2rem 0.5rem', background: game.status === 'Completed' ? 'var(--surface-hover)' : 'transparent', borderRadius: 'var(--radius-sm)', fontWeight: '600' }}>
                        {game.status === 'Completed' ? (game.isReported ? `${game.homeSetsWon} - ${game.awaySetsWon}` : 'No Score') : 'vs'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{game.awayTeam.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
