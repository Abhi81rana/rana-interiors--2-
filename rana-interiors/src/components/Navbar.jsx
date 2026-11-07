
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../data/siteConfig.js';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/#about' },
  { label: 'Explore Designs', to: '/#designs' },
  { label: 'Our Projects', to: '/#projects' },
  { label: 'Contact Us', to: '/contact' },
];



const designCategories = [
  { label: 'Complete Home Interior', to: '/designs/complete-home' },
  { label: 'Living Room', to: '/designs/living-room' },
  { label: 'Bedroom Interior', to: '/designs/bedroom' },
  { label: 'Modular Kitchen', to: '/designs/modular-kitchen' },
  { label: 'TV Unit & Wall Design', to: '/designs/tv-unit' },
  { label: 'Wardrobe & Storage', to: '/designs/wardrobe' },
  { label: 'Custom Furniture', to: '/designs/custom-furniture' },
  { label: 'Dressing Unit', to: '/designs/dressing-unit' },
  { label: 'False Ceiling', to: '/designs/false-ceiling' },
  { label: 'Pooja Room', to: '/designs/pooja-room' },
  { label: 'Office Interior', to: '/designs/office' },
];



export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [designsOpen, setDesignsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const current = location.pathname + location.hash;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDesignsOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setDesignsOpen(false);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar__inner">

          <Link
            to="/"
            className="logo"
            aria-label={`${siteConfig.brand} home`}
          >
            <span className="logo__mark">R</span>
            <span className="logo__text">
              RANA <span>INTERIORS</span>
            </span>
          </Link>

          <nav className="navbar__links" aria-label="Primary">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={current === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
            ))}

            <Link to="/contact" className="btn btn--dark navbar__cta">
              Get Free Consultation
            </Link>
          </nav>

          <button
            className="lux-menu-trigger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span>MENU</span>
            <Menu size={23} />
          </button>

        </div>
      </header>

      {open && (
        <div className="lux-menu-overlay" onClick={closeMenu}>

          <aside
            className="lux-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="lux-menu-header">
              <div>
                <span className="lux-menu-eyebrow">
                  RANA INTERIORS
                </span>
                <p>Explore our world</p>
              </div>

              <button
                className="lux-menu-close"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <X size={25} />
              </button>
            </div>

            
            <div className="lux-menu-navigation">
              {links.map((link, index) => (
                link.label === 'Explore Designs' ? (
                  <div className="lux-menu-designs" key={link.label}>
                    <button
                      type="button"
                      className="lux-menu-link"
                      onClick={() => setDesignsOpen(!designsOpen)}
                      aria-expanded={designsOpen}
                    >
                      <span className="lux-menu-number">
                        0{index + 1}
                      </span>
                      <span>{link.label}</span>
                      <ChevronDown
                        size={19}
                        className={designsOpen ? 'is-rotated' : ''}
                      />
                    </button>

                    {designsOpen && (
                      <div className="lux-menu-submenu">
                        <Link to="/#designs" onClick={closeMenu}>
                          View All Designs
                        </Link>

                        {designCategories.map((category) => (
                          <Link
                            key={category.to}
                            to={category.to}
                            onClick={closeMenu}
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={closeMenu}
                    className="lux-menu-link"
                  >
                    <span className="lux-menu-number">
                      0{index + 1}
                    </span>
                    <span>{link.label}</span>
                    <ArrowUpRight size={19} />
                  </Link>
                )
              ))}
            </div>


            <div className="lux-menu-bottom">

              <Link
                to="/#projects"
                className="lux-menu-feature"
                onClick={closeMenu}
              >
                <span>
                  <small>DISCOVER</small>
                  My Portfolio
                </span>
                <ArrowUpRight size={21} />
              </Link>

              <Link
                to="/admin"
                className="lux-admin-link"
                onClick={closeMenu}
              >
                <span>Admin Login</span>
                <ArrowUpRight size={18} />
              </Link>

              <p className="lux-menu-footer">
                DESIGN YOUR DREAM HOME.
              </p>

            </div>

          </aside>
        </div>
      )}
    </>
  );
}
