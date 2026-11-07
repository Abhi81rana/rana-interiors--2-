import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { categories } from '../data/categories.js';
import { siteConfig, whatsappLink } from '../data/siteConfig.js';
import { api } from '../api.js';

const propertyTypes = ['Apartment / Flat', 'Independent House / Villa', 'Office / Commercial', 'Other'];
const budgets = ['Under ₹5 Lakh', '₹5 – 10 Lakh', '₹10 – 20 Lakh', '₹20 – 40 Lakh', 'Above ₹40 Lakh', 'Not sure yet'];

const categoryOptions = [{ slug: 'complete-home', name: 'Complete Home Interior' }, ...categories];

export default function EnquiryForm({ initialCategory = '', initialMessage = '', title = 'Request a Free Consultation', id }) {
  const [form, setForm] = useState({
    name: '', phone: '', city: '', category: initialCategory, property: '', budget: '', message: initialMessage,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', text: '' });

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = 'Enter your name.';
    if (!/^\+?[\d\s-]{10,15}$/.test(form.phone.trim())) er.phone = 'Enter a valid phone number (at least 10 digits).';
    if (!form.city.trim()) er.city = 'Enter your city.';
    if (!form.category) er.category = 'Choose a category.';
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const categoryName = () => categoryOptions.find((c) => c.slug === form.category)?.name || '';

  const buildMessage = () =>
    [
      `New enquiry for ${siteConfig.brand}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Interior category: ${categoryName()}`,
      form.property && `Property type: ${form.property}`,
      form.budget && `Approx. budget: ${form.budget}`,
      form.message && `Details: ${form.message}`,
    ].filter(Boolean).join('\n');

  const sendWhatsApp = () => {
    const link = whatsappLink(buildMessage());
    if (link) window.open(link, '_blank', 'noopener');
    return Boolean(link);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ type: 'loading', text: 'Sending…' });
    try {
      await api('/api/enquiries', { method: 'POST', body: { ...form, categoryName: categoryName() } });
      setStatus({ type: 'success', text: 'Thank you! We have received your enquiry and will contact you soon.' });
      setForm({ name: '', phone: '', city: '', category: initialCategory, property: '', budget: '', message: '' });
    } catch (err) {
      // Validation / rate-limit messages come from the server and are safe to show.
      if (err.status === 400 || err.status === 429) {
        setStatus({ type: 'error', text: err.message });
      } else if (sendWhatsApp()) {
        // Server unreachable: fall back to WhatsApp so the lead is not lost.
        setStatus({ type: 'success', text: 'Opening WhatsApp with your enquiry. Press send there to reach us.' });
      } else {
        setStatus({ type: 'error', text: 'We could not send your enquiry right now. Please try again shortly.' });
      }
    }
  };

  const waDisabled = !siteConfig.whatsappNumber;

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate id={id}>
      <h3>{title}</h3>
      <div className="enquiry__grid">
        <label>
          Name
          <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your full name" />
          {errors.name && <small className="err">{errors.name}</small>}
        </label>
        <label>
          Phone number
          <input value={form.phone} onChange={set('phone')} type="tel" autoComplete="tel" placeholder="10-digit mobile number" />
          {errors.phone && <small className="err">{errors.phone}</small>}
        </label>
        <label>
          City
          <input value={form.city} onChange={set('city')} autoComplete="address-level2" placeholder="e.g. Indore" />
          {errors.city && <small className="err">{errors.city}</small>}
        </label>
        <label>
          Interior category
          <select value={form.category} onChange={set('category')}>
            <option value="">Select a category</option>
            {categoryOptions.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          {errors.category && <small className="err">{errors.category}</small>}
        </label>
        <label>
          Property type
          <select value={form.property} onChange={set('property')}>
            <option value="">Select property type</option>
            {propertyTypes.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label>
          Approximate budget
          <select value={form.budget} onChange={set('budget')}>
            <option value="">Select a budget range</option>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label className="full">
          Project description
          <textarea rows="4" value={form.message} onChange={set('message')} placeholder="Tell us about your space, size and what you have in mind." />
        </label>
      </div>

      <div className="enquiry__actions">
        <button type="submit" className="btn btn--dark" disabled={status.type === 'loading'}>
          <Send size={18} /> {status.type === 'loading' ? 'Sending…' : 'Submit Enquiry'}
        </button>
        <button
          type="button"
          className="btn btn--outline"
          disabled={waDisabled}
          title={waDisabled ? 'Add a WhatsApp number in src/data/siteConfig.js' : undefined}
          onClick={() => validate() && sendWhatsApp()}
        >
          <MessageCircle size={18} /> Enquire on WhatsApp
        </button>
      </div>

      {status.text && (
        <p className={`form-status form-status--${status.type}`} role="status">{status.text}</p>
      )}
    </form>
  );
}
