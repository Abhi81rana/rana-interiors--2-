// Photos are placeholder stock images from Unsplash. Replace `images` with your own
// files (e.g. '/images/living-1.jpg' placed in /public/images) at any time.
// If an image fails to load, the site shows a branded fallback instead of a broken icon.
const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const categories = [
  {
    slug: 'living-room',
    name: 'Living Room',
    intro:
      'The living room is where your home greets everyone. We plan seating, lighting, storage and finishes together so the space feels calm, welcoming and easy to live in.',
    images: [u('1618221195710-dd6b41faaea6'), u('1586023492125-27b2c045efd7'), u('1600210492486-724fe5c67fb0')],
  },
  {
    slug: 'bedroom',
    name: 'Bedroom Interior',
    intro:
      'Restful bedrooms start with layout and light. We design beds, headboards, side units and storage that suit how you sleep, dress and unwind.',
    images: [u('1616594039964-ae9021a400a0'), u('1540518614846-7eded433c457'), u('1505693416388-ac5ce068fe85')],
  },
  {
    slug: 'modular-kitchen',
    name: 'Modular Kitchen',
    intro:
      'A good kitchen works the way you cook. We build modular kitchens around your routine with smart storage, durable surfaces and an efficient layout.',
    images: [u('1556911220-bff31c812dba'), u('1484154218962-a197022b5858'), u('1600585152220-90363fe7e115')],
  },
  {
    slug: 'tv-unit',
    name: 'TV Unit & Wall Design',
    intro:
      'Turn the main wall into a feature. Our TV units combine display, concealed storage and wall finishes such as panelling, textures and lighting.',
    images: [u('1593696140826-c58b021acf8b'), u('1618219908412-a29a1bb7b86e'), u('1600607687939-ce8a6c25118c')],
  },
  {
    slug: 'wardrobe',
    name: 'Wardrobe & Storage',
    intro:
      'Storage should feel organised, not crowded. We design wardrobes with the right mix of hanging space, shelves, drawers and finishes for your belongings.',
    images: [u('1558997519-83ea9252edf8'), u('1595428774223-ef52624120d2'), u('1616486338812-3dadae4b4ace')],
  },
  {
    slug: 'custom-furniture',
    name: 'Custom Furniture',
    intro:
      'When ready-made does not fit, we make it to measure: beds, tables, consoles and seating built to your size, material and style.',
    images: [u('1555041469-a586c61ea9bc'), u('1493663284031-b7e3aefcae8e'), u('1567538096630-e0c55bd6374c')],
  },
  {
    slug: 'dressing-unit',
    name: 'Dressing Unit',
    intro:
      'A dressing unit brings mirror, lighting, storage and a place to sit into one tidy corner, designed to fit your bedroom or walk-in space.',
    images: [u('1631889993959-41b4e9c6e45c'), u('1618220179428-22790b461013'), u('1600566753190-17f0baa2a6c3')],
  },
  {
    slug: 'false-ceiling',
    name: 'False Ceiling',
    intro:
      'Ceilings shape how a room feels. We design false ceilings with layered profiles and lighting that add depth and hide services neatly.',
    images: [u('1600607688969-a5bfcd646154'), u('1600566753086-00f18fb6b3ea'), u('1600573472592-401b489a3cdc')],
  },
  {
    slug: 'pooja-room',
    name: 'Pooja Room',
    intro:
      'A quiet, well-planned corner for daily prayer. We design pooja units and rooms with storage for essentials, soft lighting and fitting materials.',
    images: [u('1600585154340-be6161a56a0c'), u('1560185007-cde436f6a4d0'), u('1512918728675-ed5a9ecdebfd')],
  },
  {
    slug: 'office',
    name: 'Office Interior',
    intro:
      'Workspaces that look professional and work hard. We plan desks, storage, reception and meeting areas for focus, comfort and a clear brand impression.',
    images: [u('1524758631624-e2822e304c36'), u('1497366216548-37526070297c'), u('1497366811353-6870744d04b2')],
  },
  
{
  slug: 'complete-home',
  name: 'Complete Home Interior',
  intro:
    'Complete home interior solutions designed around your lifestyle, space and preferences. From living rooms and bedrooms to kitchens and custom furniture, we bring your entire home together.',
  images: [
    u('1600210492486-724fe5c67fb0'),
    u('1600607687939-ce8a6c25118c'),
    u('1600585152220-90363fe7e115'),
  ],
},

];

export const getCategory = (slug) => categories.find((c) => c.slug === slug);
