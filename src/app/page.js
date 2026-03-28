import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1>Beach Volleyball League</h1>
        <p>Welcome back to the season! Check the latest standings, schedules, and league updates.</p>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="card glass-panel">
          <h3>Next Game</h3>
          <p><strong>Net Assets</strong> vs <strong>How I Set Your Mother</strong></p>
          <p>Tue, Jun 09 - 11:45 @ Court 1</p>
          <div style={{ marginTop: '1rem' }}>
            <span className="badge primary">Divisional</span>
          </div>
        </div>
        
        <div className="card glass-panel">
          <h3>Recent Announcements</h3>
          <div style={{ borderLeft: '3px solid var(--primary-color)', paddingLeft: '1rem', marginBottom: '1rem' }}>
            <h4>Mid-season Crossovers Approaching!</h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Yesterday</span>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Remember that promotion and relegation will take place after week 5. The bottom 2 of Div A will move to Div B.</p>
          </div>
        </div>
        
        <div className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <h3>Captains Action Required</h3>
          <p>Please ensure all your spares are registered before the next set of games.</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Go to Dashboard
          </Link>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card">
          <h2>Quick Links</h2>
          <ul style={{ listStyleMode: 'none', padding: 0, marginTop: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/rules" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>📖 Read the League Rules</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/rosters" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>👥 View Team Rosters</Link></li>
            <li style={{ marginBottom: '0.5rem' }}><Link href="/register" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>✍️ Register a New Team</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
