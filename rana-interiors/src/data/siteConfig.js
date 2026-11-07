/**
 * ONE PLACE TO EDIT BUSINESS DETAILS.
 * Nothing here is invented: every empty value shows a placeholder on the site
 * until you fill it in.
 */
export const siteConfig = {
  brand: 'RANA INTERIORS',
  tagline: 'Designing Spaces, Creating Experiences.',

  // Phone number shown on the site, e.g. '+91 98765 43210'. Leave '' to show a placeholder.
  phoneDisplay: '',
  // Digits only with country code for the tel: link, e.g. '919876543210'
  phoneDigits: '',

  // WhatsApp number: digits only with country code, e.g. '919876543210'
  whatsappNumber: '',

  email: '',
  address: '',

  // Paste the "src" URL from Google Maps > Share > Embed a map. Leave '' for a placeholder.
  mapEmbedUrl: '',

  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
};

export const phoneLabel = siteConfig.phoneDisplay || 'Add your phone number';
export const phoneHref = siteConfig.phoneDigits ? `tel:+${siteConfig.phoneDigits}` : null;

export function whatsappLink(message = '') {
  if (!siteConfig.whatsappNumber) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${siteConfig.whatsappNumber}${text}`;
}
