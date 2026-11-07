import SmartImage from './SmartImage.jsx';
import Reveal from './Reveal.jsx';

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70';

export default function About() {
  return (
    <section className="section section--beige" id="about">
      <div className="container about">
        <Reveal className="about__img">
          <SmartImage src={ABOUT_IMAGE} alt="Beautifully designed home interior" />
        </Reveal>
        <Reveal delay={80} className="about__text">
          <h2>About RANA INTERIORS</h2>
          <p>
            RANA INTERIORS is a complete home interior design and execution business. We believe a
            home should be beautiful, functional and personal to the people who live in it.
          </p>
          <p>
            We start by understanding how you use each room, then plan the layout, materials, storage
            and lighting to suit. The same team then carries the design through to the finished space,
            so what you approve is what you get.
          </p>
          <p>
            Whether you are furnishing a new apartment or renewing a single room, we focus on
            thoughtful design, clean finishing and clear communication at every step.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
