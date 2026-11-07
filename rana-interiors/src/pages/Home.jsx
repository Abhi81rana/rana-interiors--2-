import Hero from '../components/Hero.jsx';
import CategoryCards from '../components/CategoryCards.jsx';
import Services from '../components/Services.jsx';
import Projects from '../components/Projects.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import About from '../components/About.jsx';
import EnquiryForm from '../components/EnquiryForm.jsx';
import Reveal from '../components/Reveal.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards />
      <Services />
      <Projects />
      <WhyChooseUs />
      <About />
      <section className="section" id="enquiry">
        <div className="container container--narrow">
          <Reveal>
            <EnquiryForm title="Tell us about your project" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
