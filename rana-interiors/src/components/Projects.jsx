import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { projects as sampleProjects } from '../data/projects.js';
import { api, assetUrl } from '../api.js';
import { categories, getCategory } from '../data/categories.js';
import SmartImage from './SmartImage.jsx';
import Reveal from './Reveal.jsx';

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [active, setActive] = useState(null);
  const [projects, setProjects] = useState(sampleProjects);
  const [live, setLive] = useState(false);

  // Real projects come from the backend. If it is unreachable, sample items are shown instead.
  useEffect(() => {
    let off = false;
    api('/api/projects')
      .then((list) => {
        if (!off && Array.isArray(list)) {
          setProjects(list);
          setLive(true);
        }
      })
      .catch(() => {});
    return () => { off = true; };
  }, []);

  const usedSlugs = [...new Set(projects.map((p) => p.category))];
  const filters = categories.filter((c) => usedSlugs.includes(c.slug));
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const hasSamples = projects.some((p) => p.isSample);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active]);

  return (
    <section className="section" id="projects">
      <div className="container">
        <Reveal className="section__head">
          <h2>Our Projects</h2>
          <p>A look at spaces we have designed and delivered.</p>
          {hasSamples && (
            <p className="notice">Preview mode: gallery items marked “Sample” are placeholders. Add your real project photos in <code>src/data/projects.js</code>.</p>
          )}
        </Reveal>

        <div className="filters" role="group" aria-label="Filter projects by category">
          <button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>All</button>
          {filters.map((c) => (
            <button key={c.slug} className={filter === c.slug ? 'is-active' : ''} onClick={() => setFilter(c.slug)}>
              {c.name}
            </button>
          ))}
        </div>

        {live && projects.length === 0 && (
          <p className="empty">Our project gallery is being updated. Please check back soon.</p>
        )}

        <div className="project-grid">
          {visible.map((p) => (
            <article key={p.id} className="project">
              <div className="project__img">
                <SmartImage src={assetUrl(p.image)} alt={p.title} />
                {p.isSample && <span className="badge">Sample</span>}
              </div>
              <div className="project__body">
                <span className="project__cat">{getCategory(p.category)?.name}</span>
                <h3>{p.title}</h3>
                {p.location && (
                  <p className="project__loc"><MapPin size={15} /> {p.location}</p>
                )}
                <button className="link-btn" onClick={() => setActive(p)}>View Project</button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {active && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setActive(null)} aria-label="Close"><X size={22} /></button>
            <SmartImage src={assetUrl(active.image)} alt={active.title} className="modal__img" />
            <div className="modal__body">
              <span className="project__cat">{getCategory(active.category)?.name}</span>
              <h3>{active.title}</h3>
              {active.location && <p className="project__loc"><MapPin size={15} /> {active.location}</p>}
              <p>{active.description}</p>
              {active.isSample && <p className="notice">This is a sample entry, not a completed project.</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
