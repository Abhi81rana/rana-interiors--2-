import { Link } from 'react-router-dom';
import { categories } from '../data/categories.js';
import SmartImage from './SmartImage.jsx';
import Reveal from './Reveal.jsx';

export default function CategoryCards() {
  return (
    <section className="section" id="designs">
      <div className="container">
        <Reveal className="section__head">
          <h2>Explore Designs</h2>
          <p>Choose a space to see design ideas made for Indian homes and offices.</p>
        </Reveal>

        <div className="cat-grid">
          {categories.map((cat, i) => (
            <Reveal key={cat.slug} delay={(i % 4) * 60} className="cat-grid__item">
              <Link to={`/designs/${cat.slug}`} className="cat-card" aria-label={`View ${cat.name} designs`}>
                <SmartImage src={cat.images[0]} alt={cat.name} />
                <span className="cat-card__label">{cat.name}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
