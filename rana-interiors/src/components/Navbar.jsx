import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about' },
  { label: 'Explore Designs', to: '/#designs' },
  { label: 'Our Projects', to: '/#projects' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const current = location.pathname + location.hash;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="logo" aria-label={`${siteConfig.brand} home`}>
          <span className="logo__mark">R</span>
          <span className="logo__text">RANA <span>INTERIORS</span></span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className={current === l.to ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn btn--dark navbar__cta">
            Get Free Consultation
          </Link>
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
