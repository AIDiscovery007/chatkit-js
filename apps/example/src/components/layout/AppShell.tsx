import Link from "next/link";
import styles from "./app-shell.module.css";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <Link href="/">ChatKit Control Center</Link>
        <nav>
          <Link href="/">Inbox</Link>
          <Link href="/finance">Financial Intelligence</Link>
          <Link href="/reports">Reports</Link>
        </nav>
      </header>
      <section className={styles.main}>{children}</section>
    </div>
  );
}
