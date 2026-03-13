import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import NewsletterSection from '../components/NewsletterSection';

const API = import.meta.env.VITE_API_URL;

export default function VogueMERNHome() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [ed, rw, cu] = await Promise.all([
          fetch(`${API}/api/articles?page=editorials`).then(r => r.json()),
          fetch(`${API}/api/articles?page=runway`).then(r => r.json()),
          fetch(`${API}/api/articles?page=culture`).then(r => r.json()),
        ]);
        // Combine and sort newest first (MongoDB _id is time-ordered)
        const all = [...(ed || []), ...(rw || []), ...(cu || [])]
          .sort((a, b) => (b._id > a._id ? 1 : -1));
        setArticles(all);
      } catch (err) {
        console.error('Failed to load articles', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const pageHref = (page) => `/${page}`;

  const labelFor = (article) => {
    const parts = [article.tag || article.category];
    if (article.date) parts.push(article.date);
    else if (article.season) parts.push(article.season);
    return parts.filter(Boolean).join(' · ') || article.page;
  };

  const featured = articles[0] || null;
  const sideTwo = articles.slice(1, 3);
  const secondRow = articles.slice(3, 6);
  const thirdRow = articles.slice(6, 9);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-serif overflow-x-hidden">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-0" style={{ animation: 'fadeInUp 1s ease-out forwards' }}>
            <div className="space-y-4">
              <div className="w-12 h-px bg-[#0a0a0a]"></div>
              <p className="text-sm tracking-widest uppercase font-light text-[#6b6b6b]">Independent Fashion Journal</p>
            </div>
            <h2 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">
              The things worth wearing. The stories worth telling.
            </h2>
            <p className="text-lg font-light text-[#4a4a4a] leading-relaxed max-w-md">
              CHIARISSIME covers fashion from the inside — runway reviews, cultural editorials,
              and the ideas that shape the way we dress.
            </p>
            <Link to="/editorials" className="group relative inline-block overflow-hidden px-8 py-4 text-sm tracking-widest uppercase font-light border border-[#0a0a0a] hover:text-white transition-colors duration-300">
              <div className="absolute inset-0 bg-[#0a0a0a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></div>
              Read the Latest
            </Link>
          </div>

          <div className="relative h-96 lg:h-[500px] group opacity-0" style={{ animation: 'fadeInUp 1s ease-out 0.2s forwards' }}>
            <div className="absolute inset-0 bg-[#f0f0f0] rounded-lg overflow-hidden">
              {featured && featured.image ? (
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#e8e8e8]" />
              )}
              <div className="absolute inset-0 bg-[#0a0a0a]/30"></div>
              {featured && (
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white/70 text-xs tracking-widest uppercase font-light mb-2">Now Reading</p>
                  <p className="text-white text-lg font-light leading-snug">{featured.title}</p>
                </div>
              )}
            </div>
            <div className="absolute -inset-4 border border-[#0a0a0a]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Latest Stories */}
      <section className="py-20 px-6 border-t border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="w-8 h-px bg-[#0a0a0a] mb-4"></div>
              <h2 className="text-3xl font-light tracking-tight">Latest</h2>
            </div>
            <div className="flex gap-6 text-xs tracking-widest uppercase font-light">
              <Link to="/editorials" className="border-b border-[#0a0a0a] pb-1 hover:text-[#6b6b6b] transition-colors">All Editorials</Link>
              <Link to="/runway" className="hover:text-[#6b6b6b] transition-colors">All Runway</Link>
              <Link to="/culture" className="hover:text-[#6b6b6b] transition-colors">All Culture</Link>
            </div>
          </div>

          {loading ? (
            <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-12 text-center">Loading...</p>
          ) : articles.length === 0 ? (
            <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-12 text-center">No articles yet.</p>
          ) : (
            <>
              {/* First row: 1 large + 2 stacked */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured && (
                  <Link to={pageHref(featured.page)} className="md:col-span-2 group cursor-pointer">
                    <div className="aspect-[16/9] bg-[#f0f0f0] overflow-hidden mb-4">
                      {featured.image ? (
                        <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-[#e8e8e8]" />
                      )}
                    </div>
                    <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-2">{labelFor(featured)}</p>
                    <h3 className="text-2xl font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">{featured.title}</h3>
                  </Link>
                )}

                <div className="space-y-8">
                  {sideTwo.map(article => (
                    <Link key={article._id} to={pageHref(article.page)} className="group block">
                      <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                        {article.image ? (
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-[#e8e8e8]" />
                        )}
                      </div>
                      <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">{labelFor(article)}</p>
                      <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">{article.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Second row */}
              {secondRow.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[#e0e0e0]">
                  {secondRow.map(article => (
                    <Link key={article._id} to={pageHref(article.page)} className="group block">
                      <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                        {article.image ? (
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-[#e8e8e8]" />
                        )}
                      </div>
                      <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">{labelFor(article)}</p>
                      <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">{article.title}</h3>
                    </Link>
                  ))}
                </div>
              )}

              {/* Third row */}
              {thirdRow.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[#e0e0e0]">
                  {thirdRow.map(article => (
                    <Link key={article._id} to={pageHref(article.page)} className="group block">
                      <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                        {article.image ? (
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-[#e8e8e8]" />
                        )}
                      </div>
                      <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">{labelFor(article)}</p>
                      <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">{article.title}</h3>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-[#f5f5f5]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Independent Voice', desc: 'Fashion criticism written without commercial compromise — honest, considered, and never for sale' },
              { title: 'Runway to Reality', desc: 'How the collections translate into the way we actually dress, think, and move through the world' },
              { title: 'The Cultural Edit', desc: 'Where fashion meets art, history, and ideas worth caring about' },
            ].map((feature, idx) => (
              <div key={idx} className="text-center space-y-4 opacity-0" style={{ animation: `fadeInUp 0.8s ease-out ${0.4 + idx * 0.1}s forwards` }}>
                <div className="flex justify-center">
                  <div className="w-12 h-12 border border-[#0a0a0a] rounded-full flex items-center justify-center font-light text-lg">{idx + 1}</div>
                </div>
                <h3 className="text-xl font-light tracking-tight">{feature.title}</h3>
                <p className="text-sm font-light text-[#4a4a4a]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection
        title="Join Our Community"
        description="Subscribe to receive curated stories, exclusive previews, and invitations to our most intimate experiences."
      />

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-light">
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-light">About</h4>
            <Link to="/about" className="hover:text-[#aaaaaa] transition-colors">Our Story</Link>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-light">Support</h4>
            <Link to="/contact" className="hover:text-[#aaaaaa] transition-colors">Contact</Link>
          </div>
        </div>
        <div className="border-t border-[#333] mt-8 pt-8 text-center text-xs text-[#666]">
          <p>&copy; 2025 CHIARISSIME. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
