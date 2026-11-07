import { Link } from 'react-router-dom';
import { Home, Sofa, BedDouble, CookingPot, Armchair, DoorClosed, Tv, Layers } from 'lucide-react';
import Reveal from './Reveal.jsx';

const services = [
  { icon: Home, title: 'Complete Home Interior', text: 'One team for planning, design and execution of the whole home.', to: '/contact' },
  { icon: Sofa, title: 'Living Room Design', text: 'Layouts, seating, lighting and finishes for the heart of your home.', to: '/designs/living-room' },
  { icon: BedDouble, title: 'Bedroom Interior', text: 'Restful bedrooms with beds, storage and lighting that fit your routine.', to: '/designs/bedroom' },
  { icon: CookingPot, title: 'Modular Kitchen', text: 'Efficient kitchens with smart storage and durable surfaces.', to: '/designs/modular-kitchen' },
  { icon: Armchair, title: 'Custom Furniture', text: 'Furniture made to your measurements, material and style.', to: '/designs/custom-furniture' },
  { icon: DoorClosed, title: 'Wardrobe Design', text: 'Organised wardrobes with the right mix of hanging and drawers.', to: '/designs/wardrobe' },
  { icon: Tv, title: 'TV Unit Design', text: 'Media walls that combine display, storage and texture.', to: '/designs/tv-unit' },
  { icon: Layers, title: 'False Ceiling', text: 'Layered ceilings and lighting that add depth to every room.', to: '/designs/false-ceiling' },
];

export default function Services() {
  return (
    <section className="section section--beige" id="services">
      <div className="container">
        <Reveal className="section__head">
          <h2>Our Services</h2>
          <p>Everything you need to turn an empty or tired space into a finished home.</p>
        </Reveal>
        <div className="services">
          {services.map(({ icon: Icon, title, text, to }, i) => (
            <Reveal key={title} delay={(i % 4) * 60}>
              <Link to={to} className="service">
                <span className="service__icon"><Icon size={26} strokeWidth={1.5} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
