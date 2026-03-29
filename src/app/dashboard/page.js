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

  // 3. Fetch next upcoming match genuinely from DB
  const upcomingMatches = await prisma.match.findMany({
    where: {
      status: 'Upcoming',
      OR: [ { homeTeamId: myTeamId }, { awayTeamId: myTeamId } ]
    },
    include: { homeTeam: true, awayTeam: true },
    orderBy: { date: 'asc' },
    take: 1
  });
  const upNext = upcomingMatches[0];

  // 4. Architect the Native Email BCC Blaster (Option A)
  const spares = await prisma.user.findMany({ where: { role: 'Spare' }, select: { email: true }});
  const bccList = spares.map(s => s.email).join(',');
  
  let mailtoLink = '#';
  if (upNext) {
     const opponent = upNext.homeTeamId === myTeam.id ? upNext.awayTeam.name : upNext.homeTeam.name;
     const formattedDate = new Date(upNext.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
     const encodedSubject = encodeURIComponent(`Nokia BeachVBall: ${myTeam.name} needs a Sub!`);
     const encodedBody = encodeURIComponent(`Hi everyone!\n\nWe are looking for a spare player to sub in for our upcoming match!\n\nGame Details:\nAgainst: ${opponent}\nDate: ${formattedDate}\nTime: ${upNext.time}\nLocation: ${upNext.court}\n\nPlease reply directly to me if you are available to play! First come, first served.\n\nThanks,\n${myTeam.captainName}`);
     mailtoLink = `mailto:?bcc=${bccList}&subject=${encodedSubject}&body=${encodedBody}`;
  }

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

      <div className="dashboard-grid">
        
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
            {upNext ? (
              <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontWeight: 600 }}>vs {upNext.homeTeamId === myTeam.id ? upNext.awayTeam.name : upNext.homeTeam.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  {new Date(upNext.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {upNext.time}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{upNext.court}</div>
                
                {spares.length > 0 ? (
                  <a href={mailtoLink} className="btn badge danger" style={{ background: 'var(--accent-color)', color: 'white', display: 'block', textAlign: 'center', padding: '0.5rem', fontWeight: 600, textDecoration: 'none' }}>
                    🚨 Alert {spares.length} Spares
                  </a>
                ) : (
                   <div style={{color: 'var(--text-muted)', fontSize:'0.8rem'}}>No spares registered yet.</div>
                )}
              </div>
            ) : (
               <div style={{ color: 'var(--text-muted)' }}>No upcoming matches scheduled.</div>
            )}
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
