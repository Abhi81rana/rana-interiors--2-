/**
 * ONE PLACE TO EDIT BUSINESS DETAILS.
 * Nothing here is invented: every empty value shows a placeholder on the site
 * until you fill it in.
 */
export const siteConfig = {
  brand: 'RANA INTERIORS',
  tagline: 'Designing Spaces, Creating Experiences.',

  // Phone number shown on the site, e.g. '+91 98765 43210'. Leave '' to show a placeholder.
  phoneDisplay: '+91 81020 04398',
  // Digits only with country code for the tel: link, e.g. '919876543210'
  phoneDigits: '918102004398',

  // WhatsApp number: digits only with country code, e.g. '919876543210'
  whatsappNumber: '918102004398',

  email: 'abhishek.krrana810200@gmail.com',
  address: 'Union Carbide colony 43A, Bhopal, Madhya Pradesh, India',

  // Paste the "src" URL from Google Maps > Share > Embed a map. Leave '' for a placeholder.
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d24652.247003879365!2d77.42875711038651!3d23.294762597113227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1794068843816!5m2!1sen!2sin',

  social: {
    instagram: 'https://www.instagram.com/its_abhi810?cplk=MTJhM2t3Nm82ZnMxeQ==',
    facebook: 'https://www.facebook.com/profile.php?id=100073274203170',
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
