'use client';
import { loginAdmin } from '@/app/actions/adminActions';
import { useState, useTransition } from 'react';

export default function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleLogin(formData) {
    setError('');
    startTransition(async () => {
      const res = await loginAdmin(formData);
      if (res.success) {
        // Hard refresh to completely reload Next.js to the secure state
        window.location.href = '/admin';
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <form action={handleLogin} className="card glass-panel" style={{display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem'}}>
      <input 
        type="password" 
        name="password" 
        placeholder="Master Password" 
        required 
        style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: 'white', width: '100%', outline: 'none' }}
      />
      {error && <div style={{ color: 'var(--accent-color)', fontSize: '0.85rem' }}>{error}</div>}
      <button disabled={isPending} type="submit" className="btn btn-primary" style={{ width: '100%' }}>
        {isPending ? 'Authenticating...' : 'Unlock Database'}
      </button>
    </form>
  );
}
