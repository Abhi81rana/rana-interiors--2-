// IMPORTANT: These are SAMPLE entries so the gallery layout can be previewed.
// They use stock photos and carry `isSample: true`, which shows a "Sample" badge on the site.
// Replace them with your real completed projects (real photos, titles, locations)
// and remove `isSample` so nothing is misrepresented.
const u = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=70`;
const note = 'Replace this with a description of your completed project.';

export const projects = [
  { id: 'p1', title: 'Sample Project: Living Room', category: 'living-room', location: '', image: u('1618221195710-dd6b41faaea6'), description: note, isSample: true },
  { id: 'p2', title: 'Sample Project: Master Bedroom', category: 'bedroom', location: '', image: u('1616594039964-ae9021a400a0'), description: note, isSample: true },
  { id: 'p3', title: 'Sample Project: Modular Kitchen', category: 'modular-kitchen', location: '', image: u('1556911220-bff31c812dba'), description: note, isSample: true },
  { id: 'p4', title: 'Sample Project: TV Wall', category: 'tv-unit', location: '', image: u('1593696140826-c58b021acf8b'), description: note, isSample: true },
  { id: 'p5', title: 'Sample Project: Wardrobe', category: 'wardrobe', location: '', image: u('1558997519-83ea9252edf8'), description: note, isSample: true },
  { id: 'p6', title: 'Sample Project: Office', category: 'office', location: '', image: u('1524758631624-e2822e304c36'), description: note, isSample: true },
];
