import { prisma } from '@/lib/prisma';
import ScheduleView from '@/components/ScheduleView';

export const dynamic = 'force-dynamic';

export default async function Schedule() {
  const games = await prisma.match.findMany({
    include: {
      homeTeam: true,
      awayTeam: true,
    }
  });

  return <ScheduleView games={games} />;
}
