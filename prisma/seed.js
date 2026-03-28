import { PrismaClient } from '@prisma/client';
import { mockTeams, mockUsers, mockSchedule } from '../src/lib/mockData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create teams
  for (const team of mockTeams) {
    const cleanName = team.captain.replace(' ', '.').toLowerCase();
    await prisma.team.upsert({
      where: { captainEmail: `${cleanName}@nokia.com` },
      update: {},
      create: {
        id: team.id,
        name: team.name,
        division: team.division,
        captainName: team.captain,
        captainEmail: `${cleanName}@nokia.com`
      }
    });
  }

  // Create Users
  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        teamId: user.teamId
      }
    });
  }

  // Create Matches
  for (const match of mockSchedule) {
    // Determine sets won from "result" if completed
    let homeSetsWon = 0;
    let awaySetsWon = 0;
    let isReported = false;

    if (match.status === 'Completed' && match.result) {
      const [h, a] = match.result.split('-').map(Number);
      homeSetsWon = h;
      awaySetsWon = a;
      isReported = true; // Assume completed matches are already reported for now
    }

    // Convert date "2026-06-02" to JS DateTime object
    const matchDate = new Date(match.date + 'T12:00:00Z'); // just so it parses at UTC safely

    await prisma.match.create({
      data: {
        id: match.id,
        date: matchDate,
        time: match.time,
        court: match.court,
        type: match.type,
        status: match.status,
        homeTeamId: match.homeTeam,
        awayTeamId: match.awayTeam,
        homeSetsWon,
        awaySetsWon,
        isReported
      }
    }).catch(e => {
      // Ignore if match already exists
    });
  }
  
  // Create a dummy overdue match for testing the email CRON
  const pastUnreported = new Date();
  pastUnreported.setDate(pastUnreported.getDate() - 3); // exactly 3 days ago

  await prisma.match.create({
    data: {
      date: pastUnreported,
      time: '18:00',
      court: 'Court 1',
      type: 'Divisional',
      status: 'Completed',
      homeTeamId: 't1',
      awayTeamId: 't2',
      homeSetsWon: 0,
      awaySetsWon: 0,
      isReported: false // OVERDUE missing report
    }
  });

  console.log('Seeding completed!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
