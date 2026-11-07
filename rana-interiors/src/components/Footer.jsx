import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';
import { categories } from '../data/categories.js';
import { siteConfig, phoneLabel } from '../data/siteConfig.js';
import { SocialLinks } from './ContactInfo.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <Link to="/" className="logo logo--light">
            <span className="logo__mark">R</span>
            <span className="logo__text">RANA <span>INTERIORS</span></span>
          </Link>
          <p className="footer__about">
            Complete home interior design and execution. {siteConfig.tagline}
          </p>
          <SocialLinks className="socials--light" />
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#designs">Explore Designs</Link></li>
            <li><Link to="/#projects">Our Projects</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Designs</h4>
          <ul>
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}><Link to={`/designs/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><Phone size={16} /> {phoneLabel}</li>
            <li><Mail size={16} /> {siteConfig.email || 'Add your email address'}</li>
            <li><MapPin size={16} /> {siteConfig.address || 'Add your business address'}</li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
        <div className="container">© {new Date().getFullYear()} {siteConfig.brand}. All rights reserved.</div>
      </div>
    </footer>
  );
}
