import { Phone, MessageCircle, MapPin, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteConfig, phoneLabel, phoneHref, whatsappLink } from '../data/siteConfig.js';

const socials = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'youtube', label: 'YouTube', Icon: Youtube },
];

export function SocialLinks({ className = '' }) {
  return (
    <div className={`socials ${className}`}>
      {socials.map(({ key, label, Icon }) => {
        const url = siteConfig.social[key];
        return url ? (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={20} /></a>
        ) : (
          <span key={key} className="is-placeholder" title={`Add your ${label} link in siteConfig.js`} aria-label={`${label} (not set)`}><Icon size={20} /></span>
        );
      })}
    </div>
  );
}

export default function ContactInfo() {
  const wa = whatsappLink();
  return (
    <div className="contact-info">
      <ul>
        <li>
          <Phone size={20} />
          <div><strong>Phone</strong>
            {phoneHref ? <a href={phoneHref}>{phoneLabel}</a> : <span className="placeholder">{phoneLabel}</span>}
          </div>
        </li>
        <li>
          <MessageCircle size={20} />
          <div><strong>WhatsApp</strong>
            {wa ? <a href={wa} target="_blank" rel="noopener noreferrer">Chat with us</a> : <span className="placeholder">Add your WhatsApp number</span>}
          </div>
        </li>
        <li>
          <Mail size={20} />
          <div><strong>Email</strong>
            {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> : <span className="placeholder">Add your email address</span>}
          </div>
        </li>
        <li>
          <MapPin size={20} />
          <div><strong>Address</strong>
            {siteConfig.address ? <span>{siteConfig.address}</span> : <span className="placeholder">Add your business address</span>}
          </div>
        </li>
      </ul>
      <SocialLinks />
      <div className="map">
        {siteConfig.mapEmbedUrl ? (
          <iframe title="RANA INTERIORS location" src={siteConfig.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          <div className="map__placeholder"><MapPin size={28} /><span>Google Maps will appear here once you add the embed link in <code>siteConfig.js</code>.</span></div>
        )}
      </div>
    </div>
  );
}
