# RANA INTERIORS Website

React 18 + Vite + React Router. Premium interior design website.

## Run (frontend + backend)
```bash
npm run install:all                 # installs frontend and server packages
cp server/.env.example server/.env  # then edit it (see below)
npm run server:dev                  # terminal 1: API on http://localhost:5000
npm run dev                         # terminal 2: website on http://localhost:5173
```

### Backend (server/)
Express API with a JSON-file database (`server/data/db.json`) and photo uploads (`server/uploads/`).
- `POST /api/enquiries` – saves website enquiries (validated, rate-limited, spam honeypot)
- `GET /api/projects` – real projects shown in the gallery
- Admin dashboard at **`/admin`** (not linked in the menu): view enquiries, mark New/Contacted/Closed,
  delete, export CSV; add/delete completed projects with photo upload.
- **Set `ADMIN_PASSWORD` and `JWT_SECRET` in `server/.env`.** Without them the admin is disabled.
  There is no default password.
- If the API is unreachable, the enquiry form falls back to WhatsApp (when a number is configured)
  and the gallery shows the sample items.

### Production
```bash
npm run build      # creates /dist
npm run server     # serves the API AND the built website from one Node process
```
Deploy on any Node host (Render, Railway, a VPS). The host needs a **persistent disk** for
`server/data` and `server/uploads`, otherwise enquiries and photos are lost on redeploy. Back them up.
If the frontend is hosted separately, set `VITE_API_URL` when building and `CLIENT_ORIGIN` in `server/.env`.
Behind a proxy/host, also set `TRUST_PROXY=1`.

## Before launch: fill in your details
1. **`src/data/siteConfig.js`** – phone, WhatsApp number (digits with country code, e.g. `919876543210`),
   email, address, Google Maps embed URL, social links.
   Empty values show a clear placeholder; WhatsApp buttons activate as soon as a number is set.
2. **Projects** – upload real completed projects in `/admin` > Projects. (`src/data/projects.js` samples are only a
   fallback when the backend is offline.)
3. **`src/data/categories.js` / `designs.js`** – replace the placeholder Unsplash photos with your own
   (put files in `public/images/` and use `/images/your-file.jpg`).
4. Hosting on Netlify/Vercel/etc.: add a rewrite of all routes to `/index.html` so `/designs/...` works on refresh
   (Netlify: `public/_redirects` with `/* /index.html 200`).

## Structure
```
src/components  Navbar, Hero, CategoryCards, Services, Projects, WhyChooseUs, About,
                EnquiryForm, ContactInfo, Footer, SmartImage, Reveal ...
src/pages       Home, CategoryPage, Contact, NotFound
src/data        siteConfig, categories, designs, projects
```
Routes: `/`, `/designs/:slug` (living-room, bedroom, modular-kitchen, tv-unit, wardrobe,
custom-furniture, dressing-unit, false-ceiling, pooja-room, office), `/contact`.
