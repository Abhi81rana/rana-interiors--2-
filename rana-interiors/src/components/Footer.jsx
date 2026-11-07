
import { Link } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Mail,
  ArrowUpRight,
  Instagram
} from 'lucide-react';

import { categories } from '../data/categories.js';
import { siteConfig, phoneLabel } from '../data/siteConfig.js';
import { SocialLinks } from './ContactInfo.jsx';

export default function Footer() {
  return (
    <footer className="footer footer--premium">

      <div className="container footer__grid">

        {/* Brand */}
        <div className="footer__brand">
          <Link to="/" className="logo logo--light">
            <span className="logo__mark">R</span>
            <span className="logo__text">
              RANA <span>INTERIORS</span>
            </span>
          </Link>

          <p className="footer__about">
            Complete home interior design and execution.
            {siteConfig.tagline}
          </p>

          <p className="footer__tagline">
            Designing spaces. Creating experiences.
          </p>

          <SocialLinks className="socials--light" />
        </div>

        {/* Quick Links */}
        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#about">About Us</Link></li>
            <li><Link to="/#designs">Explore Designs</Link></li>
            <li><Link to="/#projects">Our Projects</Link></li>
            <li><Link to="/#testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Designs */}
        <div>
          <h4>Our Designs</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link to={`/designs/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4>Get In Touch</h4>

          <ul className="footer__contact">
            <li>
              <Phone size={16} />
              <span>{phoneLabel}</span>
            </li>

            <li>
              <Mail size={16} />
              <span>{siteConfig.email || 'Add your email address'}</span>
            </li>

            <li>
              <MapPin size={16} />
              <span>{siteConfig.address || 'Add your business address'}</span>
            </li>
          </ul>

          <Link to="/contact" className="footer__cta">
            Get Free Consultation
            <ArrowUpRight size={17} />
          </Link>
        </div>

      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand}.
            All rights reserved.
          </p>

          <p>Crafted with care for beautiful spaces.</p>
        </div>
      </div>

    </footer>
  );
}
