export default function Rules() {
  return (
    <div>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1>General Rules & Regulations</h1>
        <p>Review the comprehensive gameplay standards, scheduling structure, and code of conduct for the 6v6 League.</p>
      </header>
      
      <div style={{ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <section className="card glass-panel">
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--primary-color)' }}>
            The Game Basics & Start
          </h2>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Game Flow</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Volleyball is a sport played by two teams on a playing court divided by a net. The object of the game is to send the ball over a net in order to ground it on the opponent's court.</li>
                <li style={{ marginBottom: '0.5rem' }}>The team has three hits for returning the ball (in addition to the block contact).</li>
                <li style={{ marginBottom: '0.5rem' }}>The ball is put into play with a service. The rally continues until the ball is grounded, goes 'out', or a team fails to return it properly.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Rally Point System:</strong> In volleyball, the team winning a rally scores a point. When the receiving team wins a rally, it gains a point and the right to serve, and its players rotate one position clockwise.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Attacking & Serving</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>During a serve, the receiving team cannot block the serve.</li>
                <li style={{ marginBottom: '0.5rem' }}>Only players in the front row are allowed to spike the ball at the net. Back row players can only attack if they jump from behind the approximate 3m attack line in the sand.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>How to Start - Coin Toss & Refereeing</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Before the warm-up in the first game and before each deciding game, a captain must conduct a coin toss (or ball spin) with the other captain. The winner chooses to serve first OR which side to receive on.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Refereeing:</strong> Due to the "fun" factor, all teams should work on a honour system and self-referee.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card glass-panel">
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--primary-color)' }}>
            Time Slots, Points & Scoring
          </h2>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--text-muted)' }}>Each game has been assigned 45mins timeslots (including prep time) and should start promptly.</p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', flex: 1, minWidth: '200px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>1st Game Timeslot</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>11:45 (Prep) | 11:50 (Start) | 12:30 (Finish)</div>
              </div>
              <div style={{ background: 'var(--surface-hover)', padding: '1rem', borderRadius: 'var(--radius-md)', flex: 1, minWidth: '200px' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>2nd Game Timeslot</h4>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>12:30 (Prep) | 12:35 (Start) | 1:15 (Finish)</div>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>Match Scoring & Results</h3>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Points:</strong> If serving team wins a rally, it scores a point and serves. If receiving team wins, it gains the right to serve and scores a point.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Best out of 3 match format.</strong> Everyone should play all 3 games. With each game (set) you win, you win 1 point in the standings. Play the 3rd game even if you lost the first 2!</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Scores:</strong> First two games go to 21 points (must win by 2). Third game goes to 21 or 15 points depending on remaining time. Captains should mutually decide this prior to starting the third game.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Reporting:</strong> The winning captain must email Joey Chow within 24 hours of the game with the results, cc'ing the opposing captain.</li>
            </ul>
          </div>
        </section>

        <section className="card glass-panel">
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--accent-color)' }}>
            Rescheduling Matches
          </h2>
          <div style={{ marginTop: '1.5rem' }}>
            <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem' }}>All matches should be played. Captains can mutually decide to postpone a game due to weather or poor air quality. Play make-up games ASAP.</li>
              <li style={{ marginBottom: '0.5rem' }}>If postponing due to rain, please do so <strong>only if it is currently raining outside</strong>.</li>
              <li style={{ marginBottom: '0.5rem' }}>If a match needs rescheduling, give the opposing team ample notice.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Defaults:</strong> Teams unable to field a team must inform the opposing team by noon the day before. Otherwise, the opposing team reserves the right to declare a default (earning 3pts).</li>
            </ul>
          </div>
        </section>

        <section className="card glass-panel">
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--secondary-color)' }}>
            Divisions, Realignment & Playoffs
          </h2>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Mid-Season & Year-End Realignment</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Teams start off in Division-A or Division-B.</p>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>At the midway point, the top 2 teams in Div B move to Div A, and the bottom 2 teams in Div A move to Div B. (Based on available results).</li>
                <li style={{ marginBottom: '0.5rem' }}>Unplayed games prior to realignment still need to be played.</li>
                <li style={{ marginBottom: '0.5rem' }}>A similar year-end realignment happens for next season's placements.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Playoffs & Tiebreakers</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Top Eight (8) teams, based on overall points across divisions, will play in the playoffs. Teams are re-seeded after each round.</p>
              <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li>Compare head-to-head games played between the tied teams.</li>
                <li>Compare the overall total number of games won between the tied teams.</li>
                <li>Coin toss.</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="card glass-panel">
          <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', color: 'var(--primary-color)' }}>
            Playing Rules & Contacts
          </h2>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Team & Body Contacts</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>Max 3 contacts to return the ball. A player may not contact the ball twice consecutively (except blocks).</li>
                <li style={{ marginBottom: '0.5rem' }}>A player may touch the ball with any part of the body.</li>
                <li style={{ marginBottom: '0.5rem' }}>The ball must be contacted cleanly and not held (lifted, pushed, caught, carried, or thrown).</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>One-handed hits:</strong> Must be cleanly hit with the heel/palm (roll shot), with straight locked fingertips (cobra), knurled fingers (camel toe), or the back of the hand. <em>One-handed placement with open fingers (dink or open hand tip) is a fault.</em></li>
                <li style={{ marginBottom: '0.5rem' }}>Crossing the center line and interfering with an opponent during a play is a fault.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Simultaneous Contacts & Out of Bounds</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>If two opponents simultaneously contact the ball over the net, the ball remains in play, and the receiving team gets another 3 hits. If it lands out, it's the fault of the team on the opposite side of the net (who didn't receive it).</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Out of bounds:</strong> First contact with ground completely outside court, completely crosses net outside antenna, or goes under the net after the attacking team's third contact.</li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Service Order</h3>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.5rem' }}>The ball may touch the net while crossing, even during a serve.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Max 5 serves:</strong> A maximum of 5 serves by the same player is in effect. After 5 serves, the team must rotate.</li>
                <li style={{ marginBottom: '0.5rem' }}>No blocking on a serve.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
