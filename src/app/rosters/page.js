import { prisma } from '@/lib/prisma';
import RosterClient from './RosterClient';

export const dynamic = 'force-dynamic';

export default async function Rosters() {
  // Pull real verified dynamic teams from your live Postgres schema instead of dummy test arrays
  const teams = await prisma.team.findMany({
    include: {
      users: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  const spares = await prisma.user.findMany({
    where: { role: 'Spare' },
    orderBy: { name: 'asc' }
  });

  return <RosterClient teams={teams} spares={spares} />;
}
