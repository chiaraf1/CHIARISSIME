import { useState, useEffect } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import Nav from '../components/Nav';

export default function Editorials() {
  const [allEditorials, setAllEditorials] = useState([]);
  const [selectedEditorial, setSelectedEditorial] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/articles?page=editorials')
      .then(res => res.json())
      .then(data => setAllEditorials(Array.isArray(data) ? data : []))
      .catch(() => setAllEditorials([]))
      .finally(() => setLoading(false));
  }, []);

  const editorials = query.trim()
    ? allEditorials.filter(e =>
        `${e.title} ${e.byline} ${e.category} ${e.date}`.toLowerCase().includes(query.toLowerCase())
      )
    : allEditorials;

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-px bg-[#0a0a0a]"></div>
            <p className="text-sm tracking-widest uppercase font-light text-[#6b6b6b]">
              In-Depth Features
            </p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Editorials
          </h1>
          <p className="text-lg font-light text-[#4a4a4a] max-w-2xl">
            Curated stories exploring fashion, culture, and the art of style.
            Each editorial is a carefully crafted narrative.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 py-8 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-3 text-[#6b6b6b]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search editorials..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {selectedEditorial ? (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedEditorial(null)}
              className="flex items-center gap-2 text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
            >
              ← Back to Editorials
            </button>

            <div className="space-y-8">
              <div className="w-full h-120 lg:h-150 overflow-hidden">
                <img
                  src={selectedEditorial.image}
                  alt={selectedEditorial.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase mb-2">
                    {[selectedEditorial.category, selectedEditorial.date].filter(Boolean).join(' · ')}
                  </p>
                  <h2 className="text-4xl font-light tracking-tight mb-2">
                    {selectedEditorial.title}
                  </h2>
                  <p className="text-xl font-light text-[#6b6b6b]">
                    {selectedEditorial.byline}
                  </p>
                </div>
                <div className="w-12 h-px bg-[#0a0a0a]"></div>
              </div>

              <div className="space-y-6 max-w-3xl">
                {selectedEditorial.body?.map((paragraph, i) => (
                  <p key={i} className="text-lg font-light text-[#4a4a4a] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="pt-8 border-t border-[#e0e0e0] space-y-4">
                <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
                  Share this story
                </p>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Pinterest'].map(s => (
                    <a key={s} href="#" className="text-sm text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : loading ? (
          <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase py-20 text-center">Loading...</p>
        ) : query.trim() ? (
          <div className="space-y-8">
            <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
              {editorials.length} result{editorials.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {editorials.length === 0 ? (
              <p className="text-base font-light text-[#4a4a4a]">No editorials matched your search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {editorials.map(editorial => (
                  <article
                    key={editorial._id}
                    className="group cursor-pointer space-y-4"
                    onClick={() => setSelectedEditorial(editorial)}
                  >
                    <div className="h-64 bg-[#f0f0f0] rounded-lg overflow-hidden">
                      <img src={editorial.image} alt={editorial.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">{editorial.category}</p>
                        <p className="text-xs text-[#6b6b6b] font-light">{editorial.date}</p>
                      </div>
                      <h3 className="text-xl font-light tracking-tight group-hover:text-[#6b6b6b] transition-colors">{editorial.title}</h3>
                      <p className="text-sm font-light text-[#6b6b6b]">{editorial.byline}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : allEditorials.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-sm font-light text-[#6b6b6b] tracking-widest uppercase">No editorials yet</p>
            <p className="text-sm font-light text-[#4a4a4a]">Check back soon for new stories.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-[#e0e0e0]">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">Featured</p>
                  <h2 className="text-4xl lg:text-5xl font-light tracking-tight">{allEditorials[0].title}</h2>
                  <p className="text-xl font-light text-[#6b6b6b]">{allEditorials[0].byline}</p>
                </div>
                <p className="text-lg font-light text-[#4a4a4a]">{allEditorials[0].excerpt}</p>
                <button
                  onClick={() => setSelectedEditorial(allEditorials[0])}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-light border-b border-[#0a0a0a] hover:text-[#6b6b6b] transition-colors pb-2"
                >
                  Read Editorial
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="order-1 lg:order-2 h-96 bg-[#f0f0f0] rounded-lg overflow-hidden">
                <img src={allEditorials[0].image} alt={allEditorials[0].title} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* More Editorials */}
            {allEditorials.length > 1 && (
              <div className="space-y-4">
                <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">More Stories</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allEditorials.slice(1).map(editorial => (
                    <article
                      key={editorial._id}
                      className="group cursor-pointer space-y-4"
                      onClick={() => setSelectedEditorial(editorial)}
                    >
                      <div className="h-64 bg-[#f0f0f0] rounded-lg overflow-hidden">
                        <img src={editorial.image} alt={editorial.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">{editorial.category}</p>
                          <p className="text-xs text-[#6b6b6b] font-light">{editorial.date}</p>
                        </div>
                        <h3 className="text-xl font-light tracking-tight group-hover:text-[#6b6b6b] transition-colors">{editorial.title}</h3>
                        <p className="text-sm font-light text-[#6b6b6b]">{editorial.byline}</p>
                        <p className="text-sm font-light text-[#4a4a4a]">{editorial.excerpt}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-[#f5f5f5] border-t border-[#e0e0e0]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-light tracking-tight">Stay Updated</h3>
          <p className="text-lg font-light text-[#4a4a4a]">
            Subscribe to receive our latest editorials and exclusive stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] placeholder-[#aaaaaa] text-sm"
            />
            <button className="px-6 py-3 bg-[#0a0a0a] text-white text-sm tracking-widest uppercase font-light hover:bg-[#333333] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
