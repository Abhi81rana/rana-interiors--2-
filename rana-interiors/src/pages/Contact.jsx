import EnquiryForm from '../components/EnquiryForm.jsx';
import ContactInfo from '../components/ContactInfo.jsx';

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Tell us about your home or office and we will get back to you.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact">
          <EnquiryForm title="Send us an enquiry" />
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
