
const ideas = {
  'living-room': [
    ['Warm Minimal Lounge', 'Low-profile seating, wooden accents and soft lighting.', 'living room minimalist interior'],
    ['Open Plan Living & Dining', 'An open layout with coordinated furniture.', 'open plan living dining interior'],
    ['Textured Feature Wall', 'Fluted panels and a warm neutral palette.', 'living room fluted feature wall'],
    ['Compact Family Living', 'Smart seating and concealed storage.', 'small modern living room interior'],
  ],
  bedroom: [
    ['Master Suite Retreat', 'Upholstered headboard and elegant bedside lighting.', 'luxury master bedroom interior'],
    ['Kids Bedroom', 'A playful layout with a study corner.', 'modern kids bedroom interior'],
    ['Guest Bedroom', 'A simple, comfortable bedroom design.', 'minimal guest bedroom interior'],
    ['Wooden Panel Bedroom', 'Warm wood panelling with a calm palette.', 'wooden panel bedroom interior'],
  ],
  'modular-kitchen': [
    ['L-Shaped Modular Kitchen', 'Efficient layout with generous storage.', 'L shaped modular kitchen'],
    ['Parallel Kitchen', 'Two clean runs of cabinetry.', 'parallel modular kitchen interior'],
    ['Island Kitchen', 'A central island for preparation and seating.', 'modern kitchen island interior'],
    ['Compact Kitchen', 'Smart storage for smaller homes.', 'small modular kitchen interior'],
  ],
  'tv-unit': [
    ['Floating TV Unit', 'Wall-mounted unit with hidden cable routing.', 'floating tv unit interior'],
    ['Panelled Media Wall', 'Wood and fluted panels with warm lighting.', 'fluted tv panel wall design'],
    ['Storage-Led TV Wall', 'Closed cabinets and display niches.', 'tv wall storage cabinet interior'],
    ['Stone Finish Feature Wall', 'A textured backdrop for the television.', 'marble stone tv feature wall'],
  ],
  wardrobe: [
    ['Sliding Door Wardrobe', 'Space-saving doors with internal storage.', 'sliding door wardrobe interior'],
    ['Hinged Wardrobe', 'Full-height hanging and loft storage.', 'hinged wardrobe design interior'],
    ['Walk-in Wardrobe', 'Open shelving and a dedicated dressing zone.', 'walk in wardrobe interior'],
    ['Kids Wardrobe', 'Easy-reach storage for a children’s room.', 'kids wardrobe interior design'],
  ],
  'custom-furniture': [
    ['Made-to-Measure Bed', 'A custom bed with practical storage.', 'modern wooden bed furniture'],
    ['Dining Table & Seating', 'A dining setup designed around your space.', 'modern wooden dining table interior'],
    ['Study Table & Bookshelf', 'A compact workspace with display shelving.', 'study table bookshelf furniture'],
    ['Console & Entryway Unit', 'A useful and stylish entrance unit.', 'modern entryway console furniture'],
  ],
  'dressing-unit': [
    ['Wall-Mounted Dresser', 'Mirror and drawers in a slim footprint.', 'wall mounted dressing table interior'],
    ['Wardrobe-Integrated Dressing Corner', 'A dressing area built into your wardrobe.', 'wardrobe dressing unit interior'],
    ['Vanity with LED Mirror', 'A vanity with organised storage.', 'modern vanity led mirror interior'],
    ['Walk-in Dressing Room', 'A dedicated dressing space with storage.', 'walk in dressing room interior'],
  ],
  'false-ceiling': [
    ['Peripheral Cove Ceiling', 'Soft edge lighting for room depth.', 'peripheral cove false ceiling design'],
    ['Layered Ceiling Design', 'Multiple levels with recessed lighting.', 'layered false ceiling interior'],
    ['Wooden Accent Ceiling', 'Wood detailing for a warm finish.', 'wooden false ceiling living room'],
    ['Minimal Flat Ceiling', 'A clean ceiling with discreet lighting.', 'minimal false ceiling interior'],
  ],
  'pooja-room': [
    ['Wall-Mounted Pooja Unit', 'A compact unit with shelves and lighting.', 'wall mounted pooja mandir design'],
    ['Carved Panel Pooja Room', 'Decorative panels and a dedicated lamp niche.', 'carved wooden pooja room interior'],
    ['Corner Pooja Unit', 'A functional design for an unused corner.', 'corner pooja mandir interior'],
    ['Pooja Room with Storage', 'Closed storage for puja essentials.', 'pooja room cabinet storage design'],
  ],
  office: [
    ['Open Workstation Layout', 'Efficient desks with cable management.', 'modern open office workstation interior'],
    ['Reception & Waiting Area', 'A welcoming reception space.', 'modern office reception interior'],
    ['Cabin & Meeting Room', 'A quiet and well-lit workspace.', 'modern office cabin meeting room'],
    ['Small Office Fit-Out', 'Practical planning for compact offices.', 'small modern office interior'],
  ],
};

// Generate category-wise design data.
export const designs = Object.fromEntries(
  Object.entries(ideas).map(([slug, items]) => [
    slug,
    items.map(([title, description, searchTerm], index) => ({
      id: `${slug}-${index + 1}`,
      title,
      description,
      image: `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80`,
      imageSearch: searchTerm,
    })),
  ])
);
