import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=75';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <SmartImage src={HERO_IMAGE} alt="Elegant modern living room interior" className="hero__bg" loading="eager" fetchpriority="high" />
      <div className="hero__overlay" />
      <div className="container hero__content">
        <p className="hero__kicker">Complete home interior design & execution</p>
        <h1>Transform Your House Into Your Dream Home.</h1>
        <p className="hero__text">
          From the first sketch to the final finishing touch, we design and build living rooms,
          bedrooms, kitchens and storage that are beautiful, functional and made for the way you live.
        </p>
        <div className="hero__actions">
          <a href="#designs" className="btn btn--gold">Explore Designs</a>
          <Link to="/contact" className="btn btn--ghost">Book Free Consultation</Link>
        </div>
      </div>
    </section>
  );
}
