import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, X, LogOut, Upload } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

const emptyForm = {
  title: '',
  byline: '',
  excerpt: '',
  body: [''],
  image: '',
  imageCaption: '',
  tag: '',
  section: '',
  page: 'editorials',
  category: '',
  date: '',
  season: '',
};

export default function Admin() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [activeTab, setActiveTab] = useState('editorials');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const token = localStorage.getItem('token');

  // Auth guard + admin check
  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4);
      const payload = JSON.parse(decodeURIComponent(atob(padded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
      if (!payload.isAdmin) { navigate('/dashboard'); return; }
    } catch {
      navigate('/login');
    }
  }, [navigate, token]);

  // Fetch articles for active tab
  useEffect(() => {
    fetchArticles();
  }, [activeTab]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/articles?page=${activeTab}`);
      const data = await res.json();
      setArticles(data);
    } catch {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    setForm({ ...emptyForm, page: activeTab });
    setEditingId(null);
    setError('');
    setShowForm(true);
  };

  const openEdit = (article) => {
    setForm({
      title: article.title || '',
      byline: article.byline || '',
      excerpt: article.excerpt || '',
      body: article.body?.length ? article.body : [''],
      image: article.image || '',
      imageCaption: article.imageCaption || '',
      tag: article.tag || '',
      section: article.section || '',
      page: article.page || activeTab,
      category: article.category || '',
      date: article.date || '',
      season: article.season || '',
    });
    setEditingId(article._id);
    setError('');
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setError('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append('image', file);
    try {
      const res = await fetch(`${API}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const json = await res.json();
      if (res.ok) {
        setForm(f => ({ ...f, image: json.path }));
      } else {
        setError(json.message || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.excerpt.trim()) {
      setError('Title and excerpt are required.');
      return;
    }
    setSaving(true);
    setError('');
    const body = { ...form, body: form.body.filter(p => p.trim()) };
    const url = editingId ? `${API}/api/articles/${editingId}` : `${API}/api/articles`;
    const method = editingId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to save');
        return;
      }
      closeForm();
      fetchArticles();
    } catch {
      setError('Failed to save article');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try {
      await fetch(`${API}/api/articles/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchArticles();
    } catch {
      setError('Failed to delete article');
    }
  };

  const updateBody = (index, value) => {
    const updated = [...form.body];
    updated[index] = value;
    setForm({ ...form, body: updated });
  };

  const addParagraph = () => setForm({ ...form, body: [...form.body, ''] });

  const removeParagraph = (index) => {
    if (form.body.length === 1) return;
    setForm({ ...form, body: form.body.filter((_, i) => i !== index) });
  };

  const tabs = ['editorials', 'runway', 'culture'];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Header */}
      <header className="relative flex items-center justify-between px-6 py-6 border-b border-[#e0e0e0]">
        <div className="w-24" />
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <Link to="/"><h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase">CHIARISSIME</h1></Link>
          <span className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Admin Panel</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          <LogOut size={14} />
          Logout
        </button>
      </header>


      <div className="pt-12 pb-24 px-6 max-w-6xl mx-auto">

        {/* Tabs + New button */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex gap-1 border-b border-[#e0e0e0] w-full pb-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setShowForm(false); }}
                className={`px-6 py-3 text-sm tracking-widest uppercase font-light border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#0a0a0a] text-[#0a0a0a]'
                    : 'border-transparent text-[#6b6b6b] hover:text-[#0a0a0a]'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto pb-2">
              <button
                onClick={openNew}
                className="flex items-center gap-2 text-sm tracking-widest uppercase font-light bg-[#0a0a0a] text-white px-6 py-2 hover:bg-[#333] transition-colors"
              >
                <Plus size={14} />
                New Article
              </button>
            </div>
          </div>
        </div>

        {/* Article Form */}
        {showForm && (
          <div className="mb-12 border border-[#e0e0e0] p-8 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
                {editingId ? 'Edit Article' : 'New Article'}
              </p>
              <button onClick={closeForm}><X size={18} className="text-[#6b6b6b] hover:text-[#0a0a0a]" /></button>
            </div>

            {error && <p className="text-sm text-red-600 font-light">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Page */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Page</label>
                <select
                  value={form.page}
                  onChange={e => setForm({ ...form, page: e.target.value })}
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                >
                  <option value="editorials">Editorials</option>
                  <option value="runway">Runway</option>
                  <option value="culture">Culture</option>
                </select>
              </div>

              {/* Tag */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Tag</label>
                <input
                  value={form.tag}
                  onChange={e => setForm({ ...form, tag: e.target.value })}
                  placeholder="e.g. Film, Art, Music, Editorial"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Title */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Article title"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Byline */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Byline / Subtitle</label>
                <input
                  value={form.byline}
                  onChange={e => setForm({ ...form, byline: e.target.value })}
                  placeholder="Short subheading"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Excerpt */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Excerpt * (shown on card)</label>
                <textarea
                  value={form.excerpt}
                  onChange={e => setForm({ ...form, excerpt: e.target.value })}
                  rows={3}
                  placeholder="Short preview shown on the article card"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a] resize-none"
                />
              </div>

              {/* Section */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Section</label>
                <input
                  value={form.section}
                  onChange={e => setForm({ ...form, section: e.target.value })}
                  placeholder="e.g. Cinema & Fashion"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Category</label>
                <input
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  placeholder="e.g. Editorial, Haute Couture"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Date (Editorials)</label>
                <input
                  value={form.date}
                  onChange={e => setForm({ ...form, date: e.target.value })}
                  placeholder="e.g. March 2025"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Season */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Season (Runway)</label>
                <input
                  value={form.season}
                  onChange={e => setForm({ ...form, season: e.target.value })}
                  placeholder="e.g. SS 2025"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>

              {/* Image */}
              <div className="space-y-2">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Image</label>
                <div className="flex gap-3 items-center">
                  <input
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                    placeholder="e.g. /images/editorials/photo.jpg"
                    className="flex-1 border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2 border border-[#e0e0e0] text-sm font-light hover:border-[#0a0a0a] transition-colors disabled:opacity-50 shrink-0"
                  >
                    <Upload size={14} />
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {form.image && (
                  <img src={form.image} alt="preview" className="h-24 object-cover rounded border border-[#e0e0e0]" />
                )}
              </div>

              {/* Image Caption */}
              <div className="space-y-1">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Image Caption</label>
                <input
                  value={form.imageCaption}
                  onChange={e => setForm({ ...form, imageCaption: e.target.value })}
                  placeholder="Caption text"
                  className="w-full border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a]"
                />
              </div>
            </div>

            {/* Body paragraphs */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Body Paragraphs</label>
                <button
                  onClick={addParagraph}
                  className="flex items-center gap-1 text-xs tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
                >
                  <Plus size={12} /> Add paragraph
                </button>
              </div>
              {form.body.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    value={para}
                    onChange={e => updateBody(i, e.target.value)}
                    rows={4}
                    placeholder={`Paragraph ${i + 1}`}
                    className="flex-1 border border-[#e0e0e0] px-4 py-2 text-sm font-light focus:outline-none focus:border-[#0a0a0a] resize-none"
                  />
                  {form.body.length > 1 && (
                    <button onClick={() => removeParagraph(i)} className="text-[#6b6b6b] hover:text-red-500 transition-colors">
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Save / Cancel */}
            <div className="flex gap-4 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-8 py-3 bg-[#0a0a0a] text-white text-sm tracking-widest uppercase font-light hover:bg-[#333] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Update' : 'Publish'}
              </button>
              <button
                onClick={closeForm}
                className="px-8 py-3 border border-[#e0e0e0] text-sm tracking-widest uppercase font-light hover:border-[#0a0a0a] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Articles list */}
        {loading ? (
          <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase">Loading...</p>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase">No articles yet</p>
            <p className="text-sm font-light text-[#4a4a4a]">Click "New Article" to add the first one.</p>
          </div>
        ) : (
          <div className="space-y-0 border-t border-[#e0e0e0]">
            {articles.map(article => (
              <div key={article._id} className="flex items-center justify-between py-5 border-b border-[#e0e0e0] gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
                    {[article.tag, article.category, article.date || article.season].filter(Boolean).join(' · ')}
                  </p>
                  <p className="text-base font-light truncate">{article.title}</p>
                  <p className="text-sm font-light text-[#6b6b6b] truncate">{article.excerpt}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => openEdit(article)}
                    className="flex items-center gap-1 text-xs tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="flex items-center gap-1 text-xs tracking-widest uppercase font-light text-[#6b6b6b] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
