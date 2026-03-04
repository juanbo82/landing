'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/leaderboard', label: 'Rankings' },
  { href: '/wods', label: 'WODs' },
  { href: '/benchmarks', label: 'Benchmarks' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-oswald text-xl font-bold tracking-wider text-accent">
            STREETWOD
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-oswald text-sm font-medium tracking-widest text-text-secondary hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-oswald text-xs font-semibold tracking-widest text-accent border border-accent-30 rounded px-3 py-1.5 hover:bg-accent-15 transition-colors"
          >
            DESCARGAR APP
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-text-secondary p-1"
          aria-label="Menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-border bg-bg/95 backdrop-blur-xl">
          <div className="flex flex-col px-5 py-4 gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-oswald text-sm font-medium tracking-widest text-text-secondary hover:text-accent transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://play.google.com/store/apps/details?id=com.streetwod.timer"
              target="_blank"
              rel="noopener noreferrer"
              className="font-oswald text-xs font-semibold tracking-widest text-accent border border-accent-30 rounded px-3 py-2 hover:bg-accent-15 transition-colors text-center mt-2"
            >
              DESCARGAR APP
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
