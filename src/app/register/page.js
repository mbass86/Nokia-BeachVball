'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <div className="card glass-panel" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary-color)' }}>🎉 Team Registered!</h2>
        <p>Your team has been successfully created. You can now login to manage your roster.</p>
        <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1>Captain Registration</h1>
        <p>Register as a captain and secure a spot for your team in the upcoming season.</p>
      </header>

      <div className="card glass-panel">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Team Name</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Net Assets"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)'
              }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Captain's Name</label>
            <input 
              type="text" 
              required
              placeholder="Full Name"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)'
              }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Captain's Email</label>
            <input 
              type="email" 
              required
              placeholder="work@email.com"
              style={{
                width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)'
              }} 
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Preferred Division</label>
            <select style={{
              width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)'
            }}>
              <option value="A">Division A (Competitive)</option>
              <option value="B">Division B (Recreational)</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
}
