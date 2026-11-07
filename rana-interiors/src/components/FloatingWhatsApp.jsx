import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../data/siteConfig.js';

/** Floating button. Hidden until a WhatsApp number is set in siteConfig. */
export default function FloatingWhatsApp() {
  const href = whatsappLink('Hello RANA INTERIORS, I would like to know more about your interior design services.');
  if (!href) return null;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <MessageCircle size={26} />
    </a>
  );
}
