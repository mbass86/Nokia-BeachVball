import { prisma } from '@/lib/prisma';
import ScoreReporter from '@/components/ScoreReporter';

// Convert the dashboard to a Server Component interacting directly with the DB
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  // For this prototype, we simulate being logged in as Captain of Team "t1" (Net Assets)
  const myTeamId = 't1';
  
  // 1. Fetch team and players from Database
  const myTeam = await prisma.team.findUnique({
    where: { id: myTeamId },
    include: { users: true }
  });

  // 2. Fetch pending missing score reports where we were Home OR Away
  const pendingReports = await prisma.match.findMany({
    where: {
      isReported: false,
      status: 'Completed',
      OR: [
        { homeTeamId: myTeamId },
        { awayTeamId: myTeamId }
      ]
    },
    include: {
      homeTeam: true,
      awayTeam: true
    }
  });

  if (!myTeam) {
    return <div>Loading Dashboard Data (Ensure DB is seeded!)</div>;
  }

  const isRosterValid = myTeam.users.length >= 6;

  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1>Captain Dashboard</h1>
        <p>Manage your team roster ("{myTeam.name}") and submit scores.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '2rem' }}>
        
        {/* Left Column: Missing Scores & Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section className="card glass-panel" style={{ borderColor: pendingReports.length > 0 ? 'var(--accent-color)' : '' }}>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Pending Score Reports</h2>
            <ScoreReporter matches={pendingReports} />
          </section>

          <section className="card glass-panel">
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>My Roster ({myTeam.users.length})</h2>
            
            {!isRosterValid && (
              <div style={{ background: 'var(--accent-color)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <strong>Action Required:</strong> 6v6 Volleyball requires a minimum of 6 players on your roster.
              </div>
            )}

            <ul style={{ listStyleMode: 'none', padding: 0, margin: '0 0 2rem 0' }}>
              {myTeam.users.map((player) => (
                <li key={player.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0.75rem', borderBottom: '1px solid var(--border-color)'
                }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{player.name}</span>
                    {player.role === 'Captain' && (
                      <span className="badge secondary" style={{ marginLeft: '0.75rem' }}>Captain</span>
                    )}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{player.email}</div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Team State */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Up Next</h3>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontWeight: 600 }}>vs How I Set Your Mother</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>Tue, Jun 09 - 11:45</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Court 1</div>
              <div className="badge primary" style={{ marginTop: '0.5rem' }}>Divisional Match</div>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ marginBottom: '1rem' }}>Team Status</h3>
            <ul style={{ listStyleMode: 'none', padding: 0, margin: 0, color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Division: <strong style={{color: 'var(--text-main)'}}>A</strong></li>
              <li style={{ marginBottom: '0.5rem' }}>Rank: <strong style={{color: 'var(--text-main)'}}>1st</strong></li>
              <li style={{ marginBottom: '0.5rem' }}>Points: <strong style={{color: 'var(--text-main)'}}>15</strong></li>
            </ul>
             <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)'}}>
               <span className="badge secondary">Safe from relegation</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
}
