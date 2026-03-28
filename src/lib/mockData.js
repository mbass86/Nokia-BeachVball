export const mockTeams = [
  // Division A
  { id: 't1', name: 'Net Assets', division: 'A', captain: 'John Doe' },
  { id: 't2', name: 'Block Party', division: 'A', captain: 'Jane Smith' },
  { id: 't3', name: 'Spike Tysons', division: 'A', captain: 'Mike Johnson' },
  { id: 't4', name: 'Sets on the Beach', division: 'A', captain: 'Sarah Connor' },
  { id: 't5', name: 'How I Set Your Mother', division: 'A', captain: 'Ted Mosby' },
  // Division B
  { id: 't6', name: 'Notorious D.I.G.', division: 'B', captain: 'Bruce Wayne' },
  { id: 't7', name: 'Volley Llamas', division: 'B', captain: 'Clark Kent' },
  { id: 't8', name: 'Bumpin Uglies', division: 'B', captain: 'Peter Parker' },
  { id: 't9', name: 'Hits & Giggles', division: 'B', captain: 'Diana Prince' },
  { id: 't10', name: 'Safe Sets', division: 'B', captain: 'Arthur Curry' },
];

export const mockUsers = [];

// Minimum 6 players per team
mockTeams.forEach((team) => {
  const cleanName = team.captain.replace(' ', '.').toLowerCase();
  mockUsers.push({ id: `u_${team.id}_c`, name: team.captain, email: `${cleanName}@nokia.com`, role: 'Captain', teamId: team.id });
  for (let i = 1; i <= 5; i++) {
    mockUsers.push({ id: `u_${team.id}_${i}`, name: `Player ${i} (${team.name})`, email: `player${i}.${team.id}@nokia.com`, role: 'Player', teamId: team.id });
  }
});

mockUsers.push({ id: 's1', name: 'Spare Player 1', email: 'spare1@nokia.com', role: 'Spare', teamId: null });
mockUsers.push({ id: 's2', name: 'Spare Player 2', email: 'spare2@nokia.com', role: 'Spare', teamId: null });
mockUsers.push({ id: 's3', name: 'Spare Player 3', email: 'spare3@nokia.com', role: 'Spare', teamId: null });

export const mockStandings = {
  A: [
    { teamId: 't1', teamName: 'Net Assets', matchesPlayed: 4, points: 10, setsWon: 10, setsLost: 2 },
    { teamId: 't2', teamName: 'Block Party', matchesPlayed: 4, points: 8, setsWon: 8, setsLost: 4 },
    { teamId: 't3', teamName: 'Spike Tysons', matchesPlayed: 4, points: 6, setsWon: 6, setsLost: 6 },
    { teamId: 't4', teamName: 'Sets on the Beach', matchesPlayed: 4, points: 4, setsWon: 4, setsLost: 8 },
    { teamId: 't5', teamName: 'How I Set Your Mother', matchesPlayed: 4, points: 2, setsWon: 2, setsLost: 10 },
  ],
  B: [
    { teamId: 't6', teamName: 'Notorious D.I.G.', matchesPlayed: 4, points: 11, setsWon: 11, setsLost: 1 },
    { teamId: 't7', teamName: 'Volley Llamas', matchesPlayed: 4, points: 8, setsWon: 8, setsLost: 4 },
    { teamId: 't8', teamName: 'Bumpin Uglies', matchesPlayed: 4, points: 6, setsWon: 6, setsLost: 6 },
    { teamId: 't9', teamName: 'Hits & Giggles', matchesPlayed: 4, points: 3, setsWon: 3, setsLost: 9 },
    { teamId: 't10', name: 'Safe Sets', matchesPlayed: 4, points: 2, setsWon: 2, setsLost: 10 },
  ]
};

export const mockSchedule = [
  // Week 1 - Tuesday (June 2, 2026) -> Div A Matches + 1 Div B
  { id: 'g1', date: '2026-06-02', time: '11:45', court: 'Court 1', homeTeam: 't1', awayTeam: 't2', type: 'Divisional', status: 'Completed', result: '2-1' },
  { id: 'g2', date: '2026-06-02', time: '12:30', court: 'Court 1', homeTeam: 't3', awayTeam: 't4', type: 'Divisional', status: 'Completed', result: '3-0' },
  { id: 'g3', date: '2026-06-02', time: '11:45', court: 'Court 2', homeTeam: 't5', awayTeam: 't6', type: 'Crossover', status: 'Completed', result: '1-2' },
  
  // Week 1 - Thursday (June 4, 2026) -> Div B Matches
  { id: 'g4', date: '2026-06-04', time: '12:30', court: 'Court 2', homeTeam: 't7', awayTeam: 't8', type: 'Divisional', status: 'Completed', result: '3-0' },
  { id: 'g5', date: '2026-06-04', time: '11:45', court: 'Court 1', homeTeam: 't9', awayTeam: 't10', type: 'Divisional', status: 'Completed', result: '2-1' },

  // Week 2 - Tuesday (June 9, 2026)
  { id: 'g6', date: '2026-06-09', time: '11:45', court: 'Court 1', homeTeam: 't1', awayTeam: 't5', type: 'Divisional', status: 'Upcoming', result: null },
  { id: 'g7', date: '2026-06-09', time: '12:30', court: 'Court 1', homeTeam: 't2', awayTeam: 't4', type: 'Divisional', status: 'Upcoming', result: null },

  // Week 2 - Thursday (June 11, 2026)
  { id: 'g8', date: '2026-06-11', time: '11:45', court: 'Court 1', homeTeam: 't6', awayTeam: 't10', type: 'Divisional', status: 'Upcoming', result: null },
  { id: 'g9', date: '2026-06-11', time: '12:30', court: 'Court 1', homeTeam: 't7', awayTeam: 't9', type: 'Divisional', status: 'Upcoming', result: null },
];

export const getTeamName = (id) => mockTeams.find(t => t.id === id)?.name || 'Unknown Team';
