'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

const NavigationItems = [
  { name: 'Home', mobileName: 'Home', icon: '🏐', href: '/' },
  { name: 'Schedule', mobileName: 'Games', icon: '📅', href: '/schedule' },
  { name: 'Standings', mobileName: 'Ranks', icon: '🏆', href: '/standings' },
  { name: 'Team Rosters', mobileName: 'Roster', icon: '👥', href: '/rosters' },
];

const ActionItems = [
  { name: 'Captain Dashboard', mobileName: 'Dash', icon: '👑', href: '/dashboard' },
  { name: 'Admin Control', mobileName: 'Admin', icon: '🔒', href: '/admin' },
  { name: 'Rules', mobileName: 'Rules', icon: '📋', href: '/rules' },
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
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.desktopText}>{item.name}</span>
            <span className={styles.mobileText}>{item.mobileName}</span>
          </Link>
        ))}

        <div className={styles.divider}></div>
        
        <div className={styles.sectionHeader}>Captains / Info</div>
        {ActionItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.desktopText}>{item.name}</span>
            <span className={styles.mobileText}>{item.mobileName}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.footer}>
        Ready to Serve? 🏐
      </div>
    </aside>
  );
}
