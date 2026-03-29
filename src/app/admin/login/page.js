import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LoginForm from './LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLogin() {
  // If they are already authenticated, forcefully redirect them over to the dashboard entirely.
  const cookieStore = await cookies();
  if (cookieStore.get('admin_session')?.value === 'true') {
    redirect('/admin');
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
       <h1 style={{fontSize: '2rem'}}>God Mode</h1>
       <p style={{marginBottom: '2rem', color: 'var(--text-muted)'}}>Enter the Master Password to access the live database overrides.</p>
       <LoginForm />
    </div>
  );
}
