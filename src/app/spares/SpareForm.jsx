'use client';
import { joinAsSpare } from '@/app/actions/spareActions';
import { useTransition, useState } from 'react';
import Link from 'next/link';

export default function SpareForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleJoin(formData) {
    setError('');
    startTransition(async () => {
      const res = await joinAsSpare(formData);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error);
      }
    });
  }

  if (success) {
    return (
      <div className="card glass-panel" style={{textAlign: 'center', padding: '3rem 2rem'}}>
        <h2 style={{color: '#00E676', marginBottom: '1rem'}}>You're on the list! ✅</h2>
        <p style={{marginBottom: '2rem'}}>You are now actively visible to all League Captains. Keep an eye on your inbox for upcoming match alerts!</p>
        <Link href="/rosters" className="btn btn-primary" style={{display: 'inline-block'}}>View Spare Board</Link>
      </div>
    );
  }

  const inputStyle = { padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', width: '100%', outline: 'none', fontSize: '1rem' };

  return (
    <form action={handleJoin} className="card glass-panel" style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2.5rem'}}>
      <div>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)'}}>Full Name</label>
        <input type="text" name="name" required placeholder="John Doe" style={inputStyle} />
      </div>

      <div>
        <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)'}}>Email Address</label>
        <input type="email" name="email" required placeholder="PlayVball@example.com" style={inputStyle} />
      </div>

      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary-color)' }}>
        <p style={{fontSize: '0.85rem', margin: 0, color: 'var(--text-muted)'}}>
          Privacy Note: Your email exclusively becomes visible to Verified League Captains dynamically searching for subs. Nobody else will see it externally.
        </p>
      </div>

      {error && <div style={{ color: 'var(--accent-color)', background: 'rgba(255,70,70,0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>{error}</div>}
      
      <button disabled={isPending} type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>
        {isPending ? 'Joining Queue...' : 'Officially Join the List 🚀'}
      </button>
    </form>
  )
}
