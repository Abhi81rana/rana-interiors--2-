import { supabase } from './supabase.js';
import cron from 'node-cron';
import { getDb, save, DATA_DIR, UPLOADS_DIR } from './db.js';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CATEGORY_SLUGS, CATEGORY_NAMES } from './categories.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5000;
const { ADMIN_PASSWORD, JWT_SECRET, CLIENT_ORIGIN, TRUST_PROXY } = process.env;
const adminEnabled = Boolean(ADMIN_PASSWORD && JWT_SECRET);
if (!adminEnabled) {
  console.warn('⚠  ADMIN_PASSWORD and/or JWT_SECRET missing in server/.env: admin dashboard is disabled.');
}

const app = express();
if (TRUST_PROXY) app.set('trust proxy', Number(TRUST_PROXY) || 1);
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: CLIENT_ORIGIN ? CLIENT_ORIGIN.split(',').map((s) => s.trim()) : true,
  })
);
app.use(express.json({ limit: '50kb' }));

const id = () => crypto.randomBytes(8).toString('hex');
const clean = (v, max) => String(v ?? '').trim().slice(0, max);
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest();

/* ---------- Public API ---------- */
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.get('/api/projects', (_req, res) => {
  const list = [...getDb().projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  res.json(list);
});

const enquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many enquiries from this connection. Please try again later or contact us on WhatsApp.' },
});

app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
  try {
    const b = req.body || {};

    // Honeypot protection
    if (b.website) {
      return res.status(201).json({ ok: true });
    }

    const enquiry = {
      name: clean(b.name, 100),
      phone: clean(b.phone, 20),
      city: clean(b.city, 80),
      category: clean(b.category, 40),
      property: clean(b.property, 60),
      budget: clean(b.budget, 40),
      message: clean(b.message, 2000),
    };

    if (enquiry.name.length < 2) {
      return res.status(400).json({ error: 'Please enter your name.' });
    }

    if (!/^\+?[\d\s-]{10,15}$/.test(enquiry.phone)) {
      return res.status(400).json({ error: 'Please enter a valid phone number.' });
    }

    if (!enquiry.city) {
      return res.status(400).json({ error: 'Please enter your city.' });
    }

    if (!CATEGORY_SLUGS.includes(enquiry.category)) {
      return res.status(400).json({ error: 'Please choose a valid category.' });
    }

    const categoryName = CATEGORY_NAMES[enquiry.category];

    const { error } = await supabase
      .from('enquiries')
      .insert({
        name: enquiry.name,
        phone: enquiry.phone,
        city: enquiry.city,
        category: enquiry.category,
        category_name: categoryName,
        property: enquiry.property,
        budget: enquiry.budget,
        message: enquiry.message,
        status: 'New',
      });

    if (error) {
      console.error('Supabase enquiry error:', error);
      return res.status(500).json({
        error: 'Unable to save enquiry. Please try again.',
      });
    }

    console.log(`New enquiry from ${enquiry.name} (${categoryName})`);

    return res.status(201).json({ ok: true });

  } catch (error) {
    console.error('Enquiry error:', error);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
});

/* ---------- Admin auth ---------- */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
});

app.post('/api/admin/login', loginLimiter, (req, res) => {
  if (!adminEnabled) return res.status(503).json({ error: 'Admin is not configured on the server.' });
  const ok = crypto.timingSafeEqual(sha(req.body?.password), sha(ADMIN_PASSWORD));
  if (!ok) return res.status(401).json({ error: 'Incorrect password.' });
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

function requireAdmin(req, res, next) {
  if (!adminEnabled) return res.status(503).json({ error: 'Admin is not configured on the server.' });
  const token = (req.headers.authorization || '').replace(/^Bearer /, '');
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({
        error: 'Admin access required.'
      });
    }

    next();
  } catch {
    res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
}

/* ---------- Admin: enquiries ---------- */
app.get('/api/admin/enquiries', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch enquiries error:', error);
    return res.status(500).json({ error: 'Unable to fetch enquiries.' });
  }

  const enquiries = data.map((item) => ({
    id: String(item.id),
    name: item.name,
    phone: item.phone,
    city: item.city,
    category: item.category,
    categoryName: item.category_name,
    property: item.property,
    budget: item.budget,
    message: item.message,
    status: item.status?.toLowerCase() || 'new',
    createdAt: item.created_at,
  }));

  res.json(enquiries);
});

app.patch('/api/admin/enquiries/:id', requireAdmin, async (req, res) => {
  const status = req.body?.status;

  if (!['new', 'contacted', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }

  const { data, error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', req.params.id)
    .select()
    .single();

  if (error) {
    console.error('Update enquiry error:', error);
    return res.status(500).json({ error: 'Unable to update enquiry.' });
  }

  res.json({
    id: String(data.id),
    status: data.status.toLowerCase(),
  });
});

app.delete('/api/admin/enquiries/:id', requireAdmin, async (req, res) => {
  const { data, error } = await supabase
    .from('enquiries')
    .delete()
    .eq('id', req.params.id)
    .select('id');

  if (error) {
    console.error('Delete enquiry error:', error);
    return res.status(500).json({ error: 'Unable to delete enquiry.' });
  }

  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Enquiry not found.' });
  }

  res.json({ ok: true });
});
/* ---------- Admin: projects (with photo upload) ---------- */
const EXT = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' };
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${crypto.randomBytes(4).toString('hex')}${EXT[file.mimetype]}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => (EXT[file.mimetype] ? cb(null, true) : cb(new Error('Only JPG, PNG or WebP images are allowed.'))),
});

const removeFile = (url) => {
  if (!url?.startsWith('/uploads/')) return;
  fs.promises.unlink(path.join(UPLOADS_DIR, path.basename(url))).catch(() => {});
};

app.post('/api/admin/projects', requireAdmin, upload.single('image'), async (req, res) => {
  const b = req.body || {};
  const project = {
    id: id(),
    title: clean(b.title, 120),
    category: clean(b.category, 40),
    location: clean(b.location, 120),
    description: clean(b.description, 2000),
    image: req.file ? `/uploads/${req.file.filename}` : '',
    createdAt: new Date().toISOString(),
  };
  const fail = (msg) => {
    if (req.file) removeFile(project.image);
    return res.status(400).json({ error: msg });
  };
  if (!project.title) return fail('Project title is required.');
  if (!CATEGORY_SLUGS.includes(project.category)) return fail('Please choose a valid category.');
  if (!project.image) return fail('Please upload a project photo.');

  getDb().projects.unshift(project);
  await save();
  res.status(201).json(project);
});

app.delete('/api/admin/projects/:id', requireAdmin, async (req, res) => {
  const db = getDb();
  const item = db.projects.find((p) => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Project not found.' });
  db.projects = db.projects.filter((p) => p.id !== item.id);
  await save();
  removeFile(item.image);
  res.json({ ok: true });
});

/* ---------- Static files ---------- */
app.use('/uploads', express.static(UPLOADS_DIR, { maxAge: '7d', index: false }));

// In production the same server also serves the built website (npm run build -> /dist).
const DIST = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { index: false, maxAge: '1h' }));
  app.get(/^\/(?!api\/|uploads\/).*/, (_req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller.' : err.message });
  }
  if (err.message?.startsWith('Only JPG')) return res.status(400).json({ error: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid request.' });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

// Automatic daily backup
const BACKUP_DIR = path.join(__dirname, 'backups');

async function createBackup() {
  try {
    // Save latest database changes first
    await save();

    const date = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, date);

    await fs.promises.mkdir(backupPath, { recursive: true });

    // Database backup
    await fs.promises.copyFile(
      path.join(DATA_DIR, 'db.json'),
      path.join(backupPath, 'db.json')
    );

    // Uploaded images backup
    await fs.promises.cp(
      UPLOADS_DIR,
      path.join(backupPath, 'uploads'),
      { recursive: true }
    );

    console.log('Daily backup created:', backupPath);
  } catch (error) {
    console.error('Backup failed:', error);
  }
}

// Run every day at 2:00 AM
cron.schedule('0 2 * * *', createBackup);


console.log('Automatic daily backup scheduled for 2:00 AM');

app.listen(PORT, () => console.log(`RANA INTERIORS server running on http://localhost:${PORT}`));
