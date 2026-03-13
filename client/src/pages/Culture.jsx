import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import NewsletterSection from '../components/NewsletterSection';

export default function Culture() {
  const [allArticles, setAllArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filteredArticles = allArticles.filter(a =>
    a.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.byline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles?page=culture`)
      .then(res => res.json())
      .then(data => setAllArticles(Array.isArray(data) ? data : []))
      .catch(() => setAllArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-px bg-[#0a0a0a]"></div>
            <p className="text-sm tracking-widest uppercase font-light text-[#6b6b6b]">The world beyond the seam</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Culture
          </h1>
          <p className="text-lg font-light text-[#4a4a4a] max-w-2xl">
            Fashion does not exist in isolation. It is in conversation with cinema, with art, with music —
            with every form that insists on asking who we are and how we want to appear.
          </p>
          <div className="max-w-md">
            <input
              type="text"
              placeholder="Search culture..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm placeholder-[#aaaaaa] font-light"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {loading ? (
          <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-20 text-center">Loading...</p>
        ) : filteredArticles.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase">
              {searchQuery ? 'No results found' : 'No articles yet'}
            </p>
            <p className="text-sm font-light text-[#4a4a4a]">
              {searchQuery ? 'Try a different search.' : 'Check back soon for new stories.'}
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-[#e0e0e0]">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">Featured · {filteredArticles[0].tag}</p>
                  <h2 className="text-4xl lg:text-5xl font-light tracking-tight">{filteredArticles[0].title}</h2>
                  <p className="text-xl font-light text-[#6b6b6b]">{filteredArticles[0].byline}</p>
                </div>
                <p className="text-lg font-light text-[#4a4a4a]">{filteredArticles[0].excerpt}</p>
                <button
                  onClick={() => navigate(`/culture/${filteredArticles[0]._id}`)}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-light border-b border-[#0a0a0a] hover:text-[#6b6b6b] transition-colors pb-2"
                >
                  Read Article
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="order-1 lg:order-2 h-96 bg-[#f0f0f0] rounded-lg overflow-hidden">
                <img src={filteredArticles[0].image} alt={filteredArticles[0].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* More Articles */}
            {filteredArticles.length > 1 && (
              <div className="space-y-4">
                <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">More Stories</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredArticles.slice(1).map(article => (
                    <article
                      key={article._id}
                      className="group cursor-pointer space-y-4"
                      onClick={() => navigate(`/culture/${article._id}`)}
                    >
                      <div className="h-64 bg-[#f0f0f0] rounded-lg overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">{article.tag}</p>
                          <p className="text-xs text-[#6b6b6b] font-light">{article.section}</p>
                        </div>
                        <h3 className="text-xl font-light tracking-tight group-hover:text-[#6b6b6b] transition-colors">{article.title}</h3>
                        <p className="text-sm font-light text-[#6b6b6b]">{article.byline}</p>
                        <p className="text-sm font-light text-[#4a4a4a]">{article.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <NewsletterSection
        title="Stay Updated"
        description="Subscribe to receive our latest culture pieces and exclusive stories."
        className="py-16 px-6 bg-[#f5f5f5] border-t border-[#e0e0e0]"
      />
    </div>
  );
}
