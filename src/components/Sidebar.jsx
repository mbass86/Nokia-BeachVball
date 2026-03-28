'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const NavigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Team Rosters / Spares', href: '/rosters' },
  { name: 'Standings', href: '/standings' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'General Rules', href: '/rules' },
];

const ActionItems = [
  { name: 'Register Team', href: '/register' },
  { name: 'Captain Dashboard', href: '/dashboard' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <h2 style={{ fontSize: '1.4rem' }}>Nokia Beach<span>VBall</span></h2>
        <div className={styles.leagueLabel}>League</div>
      </div>
      
      <nav className={styles.nav}>
        <div className={styles.sectionHeader}>Main Menu</div>
        {NavigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}

        <div className={styles.divider}></div>
        
        <div className={styles.sectionHeader}>Captains</div>
        {ActionItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        Ready to Serve? 🏐
      </div>
    </aside>
  );
}
