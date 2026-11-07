import { Gem, Sparkles, Ruler, Hammer, Smile, Search } from 'lucide-react';
import Reveal from './Reveal.jsx';

const items = [
  { icon: Gem, title: 'Quality Materials', text: 'We choose durable, well-finished materials that look good and last.' },
  { icon: Sparkles, title: 'Modern Designs', text: 'Clean, current layouts that still feel warm and personal.' },
  { icon: Ruler, title: 'Customised Solutions', text: 'Every plan is shaped around your space, budget and lifestyle.' },
  { icon: Hammer, title: 'Professional Execution', text: 'Design and site work managed together, from plan to handover.' },
  { icon: Smile, title: 'Customer Satisfaction', text: 'We listen, keep you informed and aim for a home you enjoy.' },
  { icon: Search, title: 'Attention to Detail', text: 'Edges, alignments and finishes get the same care as the big ideas.' },
];

export default function WhyChooseUs() {
  return (
    <section className="section section--dark" id="why-us">
      <div className="container">
        <Reveal className="section__head">
          <h2>Why Choose RANA INTERIORS</h2>
          <p>What you can expect when you work with us.</p>
        </Reveal>
        <div className="why">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 60} className="why__item">
              <Icon size={28} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
