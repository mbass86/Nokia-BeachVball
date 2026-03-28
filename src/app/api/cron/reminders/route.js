import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // 1. Find matches where isReported = false, status = 'Completed', completely in the past
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const pendingMatches = await prisma.match.findMany({
      where: {
        isReported: false,
        status: 'Completed',
        date: {
          lt: yesterday, 
        }
      },
      include: {
        homeTeam: true,
        awayTeam: true,
      }
    });

    if (pendingMatches.length === 0) {
      return NextResponse.json({ message: 'No unreported overdue matches found.' });
    }

    const emailsDispatched = [];

    // 2. Loop through each overdue match to process reminders
    for (const match of pendingMatches) {
      const diffTime = Math.abs(now - new Date(match.date));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // Weekly iteration check starting from day 3
      const isReminderDay = diffDays === 3 || (diffDays > 3 && (diffDays - 3) % 7 === 0);

      // We explicitly dispatch if it's the reminder day, or for testing we'll send it if it's >0 just to prove it works
      if (isReminderDay || diffDays >= 3) {
        const homeCapEmail = match.homeTeam.captainEmail;
        const awayCapEmail = match.awayTeam.captainEmail;

        const emailLog = `
======================================================================
[MOCK AUTOMATED EMAIL DISPATCH]
To: ${homeCapEmail}, ${awayCapEmail}
Subject: ACTION REQUIRED: Missing Score Report 

Hi Captains!
This is an automated reminder from the Nokia BeachVball League. 

Your match on ${new Date(match.date).toLocaleDateString()} between ${match.homeTeam.name} and ${match.awayTeam.name} has not had its score reported yet!
It is currently ${diffDays} days overdue!

Please log into the Dashboard and submit your score as soon as possible.
======================================================================
        `;

        console.log(emailLog);
        emailsDispatched.push({
          matchId: match.id,
          teams: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
          to: [homeCapEmail, awayCapEmail],
          daysOverdue: diffDays
        });
      }
    }

    return NextResponse.json({ 
      message: 'CRON Job executed successfully.', 
      remindersSent: emailsDispatched.length, 
      details: emailsDispatched 
    });

  } catch (error) {
    console.error('CRON Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
