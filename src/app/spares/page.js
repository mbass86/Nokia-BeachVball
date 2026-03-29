import SpareForm from './SpareForm';

export const metadata = {
  title: 'Join as a Spare - Nokia BeachVball League',
  description: 'Sign up dynamically to sub in for missing Captain players.',
};

export default function JoinSparesPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '4rem auto' }}>
       <header style={{textAlign: 'center', marginBottom: '3rem'}}>
         <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Join the <span style={{color: 'var(--primary-color)'}}>Spare</span> Network</h1>
         <p style={{color: 'var(--text-muted)', fontSize: '1.1rem'}}>
           League Captains frequently need subs for evening games when their teammates can't make it! By registering below, you'll be actively added to the Official Sub list and securely contacted via email whenever an opening unexpectedly pops up.
         </p>
       </header>

       <SpareForm />
    </div>
  );
}
