import { useCallback, useEffect, useState } from 'react';
import { LogOut, Trash2, Download } from 'lucide-react';
import { api, assetUrl } from '../api.js';
import { categories } from '../data/categories.js';

const TOKEN_KEY = 'rana_admin_token';
const categoryOptions = [{ slug: 'complete-home', name: 'Complete Home Interior' }, ...categories];
const nameOf = (slug) => categoryOptions.find((c) => c.slug === slug)?.name || slug;

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await api('/api/admin/login', { method: 'POST', body: { password } });
      sessionStorage.setItem(TOKEN_KEY, token);
      onLogin(token);
    } catch (err) {
      setError(err.status === 0 ? 'Cannot reach the server. Is it running (npm run server)?' : err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container container--narrow admin-login">
      <form className="enquiry" onSubmit={submit}>
        <h3>Admin login</h3>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" autoFocus />
        </label>
        <div className="enquiry__actions">
          <button className="btn btn--dark" disabled={busy || !password}>{busy ? 'Signing in…' : 'Log in'}</button>
        </div>
        {error && <p className="form-status form-status--error" role="alert">{error}</p>}
      </form>
    </div>
  );
}

function Enquiries({ token, onAuthError }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    api('/api/admin/enquiries', { token })
      .then(setItems)
      .catch((err) => (err.status === 401 ? onAuthError() : setError(err.message)));
  }, [token, onAuthError]);
  useEffect(load, [load]);

  const setStatus = async (id, status) => {
    try {
      const updated = await api(`/api/admin/enquiries/${id}`, { method: 'PATCH', token, body: { status } });
      setItems((list) => list.map((e) => (e.id === id ? updated : e)));
    } catch (err) { setError(err.message); }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete this enquiry permanently?')) return;
    try {
      await api(`/api/admin/enquiries/${id}`, { method: 'DELETE', token });
      setItems((list) => list.filter((e) => e.id !== id));
    } catch (err) { setError(err.message); }
  };

  const exportCsv = () => {
    const cols = ['createdAt', 'status', 'name', 'phone', 'city', 'categoryName', 'property', 'budget', 'message'];
    const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [cols.join(','), ...items.map((e) => cols.map((c) => esc(e[c])).join(','))].join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = 'enquiries.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  if (error) return <p className="form-status form-status--error">{error}</p>;
  if (!items) return <p>Loading…</p>;

  return (
    <>
      <div className="admin-bar">
        <p>{items.length} enquir{items.length === 1 ? 'y' : 'ies'}</p>
        <button className="btn btn--outline btn--sm" onClick={exportCsv} disabled={!items.length}><Download size={16} /> Export CSV</button>
      </div>
      {items.length === 0 && <p className="empty">No enquiries yet.</p>}
      <div className="admin-list">
        {items.map((e) => (
          <article key={e.id} className={`enq enq--${e.status}`}>
            <div className="enq__head">
              <strong>{e.name}</strong>
              <span>{new Date(e.createdAt).toLocaleString()}</span>
            </div>
            <p className="enq__meta">
              <a href={`tel:${e.phone.replace(/[^\d+]/g, '')}`}>{e.phone}</a> · {e.city} · {e.categoryName || nameOf(e.category)}
              {e.property && ` · ${e.property}`}{e.budget && ` · ${e.budget}`}
            </p>
            {e.message && <p className="enq__msg">{e.message}</p>}
            <div className="enq__actions">
              <select value={e.status} onChange={(ev) => setStatus(e.id, ev.target.value)} aria-label="Status">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button className="icon-btn" onClick={() => remove(e.id)} aria-label="Delete enquiry"><Trash2 size={18} /></button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ProjectsAdmin({ token, onAuthError }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api('/api/projects').then(setItems).catch((err) => setError(err.message));
  }, []);
  useEffect(load, [load]);

  const add = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/projects', { method: 'POST', token, form: new FormData(formEl) });
      formEl.reset();
      load();
    } catch (err) {
      if (err.status === 401) onAuthError(); else setError(err.message);
    } finally { setBusy(false); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this project and its photo?')) return;
    try {
      await api(`/api/admin/projects/${id}`, { method: 'DELETE', token });
      setItems((list) => list.filter((p) => p.id !== id));
    } catch (err) { if (err.status === 401) onAuthError(); else setError(err.message); }
  };

  return (
    <>
      <form className="enquiry" onSubmit={add}>
        <h3>Add a completed project</h3>
        <div className="enquiry__grid">
          <label>Title<input name="title" required maxLength={120} /></label>
          <label>Category
            <select name="category" required defaultValue="">
              <option value="" disabled>Select a category</option>
              {categoryOptions.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
          <label>Location<input name="location" maxLength={120} placeholder="e.g. Vijay Nagar, Indore" /></label>
          <label>Photo (JPG, PNG or WebP, max 5 MB)<input name="image" type="file" accept="image/jpeg,image/png,image/webp" required /></label>
          <label className="full">Description<textarea name="description" rows="3" maxLength={2000} /></label>
        </div>
        <div className="enquiry__actions">
          <button className="btn btn--dark" disabled={busy}>{busy ? 'Uploading…' : 'Add project'}</button>
        </div>
        {error && <p className="form-status form-status--error" role="alert">{error}</p>}
      </form>

      <h3 className="admin-sub">Published projects</h3>
      {!items ? <p>Loading…</p> : items.length === 0 ? (
        <p className="empty">No projects yet. Until you add one, visitors see a “gallery being updated” message.</p>
      ) : (
        <div className="admin-projects">
          {items.map((p) => (
            <article key={p.id} className="admin-project">
              <img src={assetUrl(p.image)} alt={p.title} loading="lazy" />
              <div>
                <strong>{p.title}</strong>
                <span>{nameOf(p.category)}{p.location && ` · ${p.location}`}</span>
              </div>
              <button className="icon-btn" onClick={() => remove(p.id)} aria-label={`Delete ${p.title}`}><Trash2 size={18} /></button>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY));
  const [tab, setTab] = useState('enquiries');

  useEffect(() => {
    const m = document.createElement('meta');
    m.name = 'robots';
    m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => m.remove();
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }, []);

  if (!token) return <section className="section"><Login onLogin={setToken} /></section>;

  return (
    <section className="section admin">
      <div className="container container--narrow">
        <div className="admin-bar">
          <h1 className="admin-title">Admin dashboard</h1>
          <button className="btn btn--outline btn--sm" onClick={logout}><LogOut size={16} /> Log out</button>
        </div>
        <div className="filters filters--left" role="tablist">
          <button role="tab" aria-selected={tab === 'enquiries'} className={tab === 'enquiries' ? 'is-active' : ''} onClick={() => setTab('enquiries')}>Enquiries</button>
          <button role="tab" aria-selected={tab === 'projects'} className={tab === 'projects' ? 'is-active' : ''} onClick={() => setTab('projects')}>Projects</button>
        </div>
        {tab === 'enquiries' ? <Enquiries token={token} onAuthError={logout} /> : <ProjectsAdmin token={token} onAuthError={logout} />}
      </div>
    </section>
  );
}
