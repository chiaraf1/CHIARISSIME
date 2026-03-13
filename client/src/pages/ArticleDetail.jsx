import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import Nav from '../components/Nav';

const API = 'http://localhost:5000';

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Determine back destination from URL path (e.g. /editorials/123 → /editorials)
  const section = window.location.pathname.split('/')[1] || 'editorials';
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`${API}/api/articles/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => setArticle(data))
      .catch(() => setError('Article not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/bookmarks`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookmarked(data.some(b => b._id === id));
        }
      })
      .catch(() => {});
  }, [id, token]);

  const toggleBookmark = async () => {
    if (!token) return navigate('/login');
    setBookmarkLoading(true);
    try {
      const res = await fetch(`${API}/api/bookmarks/${id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBookmarked(data.bookmarked);
    } catch {
      // silent fail
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="max-w-4xl mx-auto px-6 pt-36 pb-24">
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => navigate(`/${section}`)}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={toggleBookmark}
            disabled={bookmarkLoading}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors disabled:opacity-50"
            title={bookmarked ? 'Remove bookmark' : 'Save article'}
          >
            {bookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            <span>{bookmarked ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {loading ? (
          <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-20 text-center">Loading...</p>
        ) : error ? (
          <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-20 text-center">{error}</p>
        ) : (
          <article className="space-y-10">
            {/* Image */}
            {article.image && (
              <div className="w-full max-h-[600px] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover object-top"
                />
                {article.imageCaption && (
                  <p className="text-xs font-light text-[#6b6b6b] mt-2">{article.imageCaption}</p>
                )}
              </div>
            )}

            {/* Header */}
            <div className="space-y-4">
              <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                {[article.tag, article.category, article.date || article.season].filter(Boolean).join(' · ')}
              </p>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight leading-tight">
                {article.title}
              </h1>
              {article.byline && (
                <p className="text-xl font-light text-[#6b6b6b]">{article.byline}</p>
              )}
              <div className="w-12 h-px bg-[#0a0a0a]"></div>
            </div>

            {/* Body */}
            <div className="space-y-6 max-w-3xl">
              {article.body?.map((paragraph, i) => (
                <p key={i} className="text-lg font-light text-[#4a4a4a] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

          </article>
        )}
      </div>
    </div>
  );
}
