import { categories } from './categories.js';

// Sample design ideas per category. Edit titles/descriptions or swap `image`
// for your own photos. Images default to the category's placeholder photos.
const ideas = {
  'living-room': [
    ['Warm Minimal Lounge', 'Low-profile seating, a wooden accent wall and soft indirect lighting.'],
    ['Open Plan Living & Dining', 'One flowing space with zoned lighting and a shared storage wall.'],
    ['Textured Feature Wall', 'Fluted panels and a warm neutral palette behind the main sofa.'],
    ['Compact Family Living', 'Smart seating and concealed storage for smaller homes.'],
  ],
  bedroom: [
    ['Master Suite Retreat', 'Upholstered headboard, bedside lighting and a full wardrobe wall.'],
    ['Kids Bedroom', 'Safe, playful layout with a study corner and built-in storage.'],
    ['Guest Bedroom', 'Simple, comfortable and easy to maintain.'],
    ['Wooden Panel Bedroom', 'Warm wood panelling with a calm neutral palette.'],
  ],
  'modular-kitchen': [
    ['L-Shaped Modular Kitchen', 'Efficient work triangle with tall units and a breakfast counter.'],
    ['Parallel Kitchen', 'Two clean runs of cabinetry with generous drawer storage.'],
    ['Island Kitchen', 'A central island for prep, seating and casual meals.'],
    ['Compact Kitchen', 'Every inch planned for storage in smaller apartments.'],
  ],
  'tv-unit': [
    ['Floating TV Unit', 'Wall-hung unit with hidden cable routing and open display shelves.'],
    ['Panelled Media Wall', 'Wood and fluted panels with warm LED backlighting.'],
    ['Storage-Led TV Wall', 'Closed cabinets and display niches in one composition.'],
    ['Stone Finish Feature Wall', 'A textured backdrop that frames the screen.'],
  ],
  wardrobe: [
    ['Sliding Door Wardrobe', 'Space-saving doors with internal drawers and shelves.'],
    ['Hinged Wardrobe', 'Classic layout with full-height hanging and loft storage.'],
    ['Walk-in Wardrobe', 'Open shelving, lighting and a dedicated dressing zone.'],
    ['Kids Wardrobe', 'Lower hanging height and easy-reach storage.'],
  ],
  'custom-furniture': [
    ['Made-to-Measure Bed', 'A bed with storage, sized to your room and mattress.'],
    ['Dining Table & Seating', 'A table designed around your family size and room.'],
    ['Study Table & Bookshelf', 'Compact work-from-home setup with display shelving.'],
    ['Console & Entryway Unit', 'Shoe storage and a statement console at the door.'],
  ],
  'dressing-unit': [
    ['Wall-Mounted Dresser', 'Mirror, lighting and drawers in a slim footprint.'],
    ['Wardrobe-Integrated Dressing Corner', 'A dressing area built into your wardrobe wall.'],
    ['Vanity with LED Mirror', 'Even lighting and organised storage for daily use.'],
    ['Walk-in Dressing Room', 'A full room for clothes, accessories and getting ready.'],
  ],
  'false-ceiling': [
    ['Peripheral Cove Ceiling', 'Soft edge lighting that gives the room depth.'],
    ['Layered Ceiling Design', 'Multiple levels with recessed spotlights.'],
    ['Wooden Accent Ceiling', 'Wood detailing over the living or dining area.'],
    ['Minimal Flat Ceiling', 'A clean finish with discreet lighting.'],
  ],
  'pooja-room': [
    ['Wall-Mounted Pooja Unit', 'Compact unit with shelf, drawer and warm lighting.'],
    ['Carved Panel Pooja Room', 'Detailed panels with a dedicated lamp niche.'],
    ['Corner Pooja Unit', 'Makes the most of an unused corner.'],
    ['Pooja Room with Storage', 'Closed storage for puja items and books.'],
  ],
  office: [
    ['Open Workstation Layout', 'Efficient desk arrangement with cable management.'],
    ['Reception & Waiting Area', 'A clear first impression for your visitors.'],
    ['Cabin & Meeting Room', 'Quiet, well-lit spaces for focused work.'],
    ['Small Office Fit-Out', 'Practical planning for compact commercial spaces.'],
  ],
};

export const designs = Object.fromEntries(
  categories.map((cat) => [
    cat.slug,
    (ideas[cat.slug] || []).map(([title, description], i) => ({
      id: `${cat.slug}-${i + 1}`,
      title,
      description,
      image: cat.images[i % cat.images.length],
    })),
  ])
);
