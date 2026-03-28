import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockTeams, mockUsers, mockSchedule } from '@/lib/mockData';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Basic clearing for re-seeding safely
    await prisma.match.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.team.deleteMany({});

    // Hash a generic password for testing logins
    const testPassword = await bcrypt.hash('password123', 10);

    // Create Teams
    for (const team of mockTeams) {
      const cleanName = team.captain.replace(' ', '.').toLowerCase();
      await prisma.team.create({
        data: {
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
      await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          teamId: user.teamId,
          password: testPassword,
        }
      });
    }

    // Create Matches
    for (const match of mockSchedule) {
      let homeSetsWon = 0;
      let awaySetsWon = 0;
      let isReported = false;

      if (match.status === 'Completed' && match.result) {
        const [h, a] = match.result.split('-').map(Number);
        homeSetsWon = h;
        awaySetsWon = a;
        isReported = true;
      }

      await prisma.match.create({
        data: {
          id: match.id,
          date: new Date(match.date + 'T12:00:00Z'),
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
      });
    }

    // Generate a purposely UNREPORTED match from EXACTLY 3 days ago for test
    const pastUnreported = new Date();
    pastUnreported.setDate(pastUnreported.getDate() - 3);

    await prisma.match.create({
      data: {
        date: pastUnreported,
        time: '18:00',
        court: 'Court 1',
        type: 'Divisional',
        status: 'Completed',
        homeTeamId: 't1', // Net Assets
        awayTeamId: 't2', // Block Party
        homeSetsWon: 0,
        awaySetsWon: 0,
        isReported: false // This will trigger the CRON to send a reminder
      }
    });

    return NextResponse.json({ success: true, message: 'Database successfully seeded!' });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
