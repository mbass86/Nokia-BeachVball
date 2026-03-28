import { mockStandings } from '@/lib/mockData';

export default function Standings() {
  const divisions = ['A', 'B'];

  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1>League Standings</h1>
        <p>Current rankings for Division A and Division B. Top and bottom two teams are subject to crossover promotion/relegation.</p>
      </header>
      
      {divisions.map((div) => (
        <section key={div} style={{ marginBottom: '4rem' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            Division {div}
            <span className="badge secondary">Mid-season</span>
          </h2>
          
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Matches Played</th>
                  <th style={{ color: 'var(--primary-color)' }}>Points (Sets Won)</th>
                  <th>Sets Lost</th>
                  <th>Diff</th>
                </tr>
              </thead>
              <tbody>
                {mockStandings[div].map((team, index) => {
                  const setDiff = team.setsWon - team.setsLost;
                  // highlight promotion/relegation zones
                  const isTopTwo = index < 2;
                  const isBottomTwo = index >= mockStandings[div].length - 2;
                  
                  let rowStyle = {};
                  if (div === 'B' && isTopTwo) {
                    rowStyle.borderLeft = '4px solid var(--primary-color)';
                  } else if (div === 'A' && isBottomTwo) {
                    rowStyle.borderLeft = '4px solid var(--accent-color)';
                  } else {
                    rowStyle.borderLeft = '4px solid transparent';
                  }

                  return (
                    <tr key={team.teamId} style={rowStyle}>
                      <td><div style={{ fontWeight: 'bold' }}>{index + 1}</div></td>
                      <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{team.teamName || team.name}</td>
                      <td>{team.matchesPlayed}</td>
                      <td><div className="badge primary" style={{ fontSize: '0.9rem' }}>{team.points} pts</div></td>
                      <td>{team.setsLost}</td>
                      <td style={{ color: setDiff > 0 ? 'var(--primary-color)' : setDiff < 0 ? 'var(--accent-color)' : 'inherit' }}>
                        {setDiff > 0 ? `+${setDiff}` : setDiff}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <div className="card glass-panel" style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Points System Guide</h3>
        <p style={{ margin: 0, color: 'var(--text-muted)' }}>
          Everyone should play all 3 games in their timeslot. For each game (set) you win, you earn <strong>1 point</strong>.
          First two games go to 21 points (win by 2). Third game goes to 21 or 15 points depending on remaining time. 
          There is a maximum of 3 points available per match.
        </p>
      </div>

    </div>
  );
}
