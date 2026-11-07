
import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Reveal from './Reveal.jsx';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    location: 'Indore',
    rating: 5,
    text: 'Rana Interiors ne hamare living room ko bahut beautiful bana diya. Design aur finishing dono excellent the.',
    initials: 'RS',
  },
  {
    id: 2,
    name: 'Priya Verma',
    location: 'Indore',
    rating: 5,
    text: 'Bedroom aur modular kitchen ka design exactly hamari expectations ke according tha. Great experience!',
    initials: 'PV',
  },
  {
    id: 3,
    name: 'Amit Gupta',
    location: 'Indore',
    rating: 5,
    text: 'Professional work, beautiful designs aur details par achha focus. Overall experience bahut achha raha.',
    initials: 'AG',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const previous = () => {
    setActive((current) =>
      (current - 1 + reviews.length) % reviews.length
    );
  };

  const next = () => {
    setActive((current) =>
      (current + 1) % reviews.length
    );
  };

  const review = reviews[active];

  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">

        <Reveal className="section__head">
          <span className="eyebrow">CLIENT STORIES</span>
          <h2>What Our Clients Say</h2>
          <p>Every space tells a story. Here is what our clients have to say.</p>
        </Reveal>

        <Reveal>
          <div className="testimonial-card">

            <div className="testimonial-card__quote">
              <Quote size={38} />
            </div>

            <div className="testimonial-card__stars">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} size={19} fill="currentColor" />
              ))}
            </div>

            <p className="testimonial-card__text">
              "{review.text}"
            </p>

            <div className="testimonial-card__user">
              <div className="testimonial-card__avatar">
                {review.initials}
              </div>

              <div>
                <h3>{review.name}</h3>
                <span>{review.location}</span>
              </div>
            </div>

            <div className="testimonial-card__controls">
              <button onClick={previous} aria-label="Previous review">
                <ChevronLeft size={21} />
              </button>

              <span>
                {String(active + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}
              </span>

              <button onClick={next} aria-label="Next review">
                <ChevronRight size={21} />
              </button>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
