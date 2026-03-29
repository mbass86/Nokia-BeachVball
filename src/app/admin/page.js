import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import AdminMatchEditor from './AdminMatchEditor';
import { logoutAdmin } from '@/app/actions/adminActions';

export const dynamic = 'force-dynamic';

export default async function AdminCenter() {
  // Hard security lock, verified per-request on the server directly
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value !== 'true') {
    redirect('/admin/login');
  }

  // Fetch the entire universal schedule
  const matches = await prisma.match.findMany({
    orderBy: [
      { date: 'asc' },
      { time: 'asc' }
    ],
    include: {
      homeTeam: true,
      awayTeam: true
    }
  });

  return (
    <div>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1>God Mode Admin</h1>
          <p>You have full write-access to the live Prisma Database overrides.</p>
        </div>
        
        {/* Simple Logout Action Form */}
        <form action={async () => {
          'use server';
          cookies().delete('admin_session');
          redirect('/admin/login');
        }}>
           <button type="submit" className="badge danger" style={{ padding: '0.5rem 1rem', cursor: 'pointer', border: 'none' }}>
             Lock Database (Logout)
           </button>
        </form>
      </header>

      <section style={{ marginBottom: '4rem' }}>
         <h2 style={{color: 'var(--primary-color)', marginBottom: '1.5rem'}}>Universal Schedule & Score Editor</h2>
         <p style={{marginBottom: '2rem'}}>Use these controls to forcefully postpone matches to new dates, switch court assignments, or manually punch in scores for captains who forgot to submit them.</p>
         
         <AdminMatchEditor matches={matches} />
      </section>
      
    </div>
  );
}
