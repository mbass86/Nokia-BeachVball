import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Nokia BeachVball League',
  description: 'Nokia Beach Volleyball League Management System',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <header className="mobile-topbar">
             <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800 }}>Nokia Beach<span style={{color: 'var(--primary-color)'}}>VBall</span></h2>
          </header>
          <Sidebar />
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
