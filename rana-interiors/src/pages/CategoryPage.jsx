
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { categories, getCategory } from '../data/categories.js';
import { designs } from '../data/designs.js';
import SmartImage from '../components/SmartImage.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Reveal from '../components/Reveal.jsx';
import NotFound from './NotFound.jsx';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = getCategory(slug);
  const [selected, setSelected] = useState('');
  const formRef = useRef(null);

  if (!category) return <NotFound />;

  const list = designs[slug] || [];
  const others = categories.filter((c) => c.slug !== slug);

  const enquire = (design) => {
    setSelected(design.title);
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  return (
    <>
      <section className="cat-hero">
        <SmartImage
          src={category.images[0]}
          alt={category.name}
          className="cat-hero__bg"
          loading="eager"
        />
        <div className="hero__overlay" />

        <div className="container cat-hero__content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link> /
            <Link to="/#designs"> Designs</Link> /
            <span>{category.name}</span>
          </nav>

          <h1>{category.name}</h1>
          <p>{category.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section__head">
            <span className="eyebrow">OUR COLLECTION</span>
            <h2>{category.name} Design Ideas</h2>
            <p>
              Discover thoughtfully designed spaces.
              Every design is customised to your requirements.
            </p>
          </Reveal>

          <div className="design-grid">
            {list.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 60}>
                <article className="design-card design-card--premium">
                  <div className="design-card__img">
                    <SmartImage src={d.image} alt={d.title} />

                    <span className="design-card__number">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <button
                      className="design-card__view"
                      onClick={() => enquire(d)}
                      aria-label={`Enquire about ${d.title}`}
                    >
                      <ArrowUpRight size={20} />
                    </button>
                  </div>

                  <div className="design-card__body">
                    <span className="design-card__category">
                      {category.name}
                    </span>

                    <h3>{d.title}</h3>
                    <p>{d.description}</p>

                    <button
                      className="design-card__link"
                      onClick={() => enquire(d)}
                    >
                      Enquire About This Design
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section--beige"
        ref={formRef}
        id="enquire"
      >
        <div className="container container--narrow">
          <EnquiryForm
            key={selected || 'default'}
            initialCategory={category.slug}
            initialMessage={
              selected ? `I am interested in: ${selected}.` : ''
            }
            title={`Enquire about ${category.name}`}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="small-h">Explore More Designs</h2>

          <div className="chips">
            {others.map((c) => (
              <Link
                key={c.slug}
                to={`/designs/${c.slug}`}
                className="chip"
              >
                {c.name}
                <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
