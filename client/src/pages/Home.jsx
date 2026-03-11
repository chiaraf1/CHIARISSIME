import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function VogueMERNHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-serif overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Burger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors duration-300 lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Hidden on mobile, visible on desktop */}
          <div className="hidden lg:flex gap-12 text-sm tracking-wide uppercase font-light">
            <a href="/editorials" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Editorials
            </a>
            <a href="/runway" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Runway
            </a>
            <a href="/culture" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Culture
            </a>
          </div>

          {/* Center: Brand Name */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase">
              <span className="inline-block">CHIARISSIME</span>
            </h1>
          </div>

          {/* Sign in — hidden on mobile to avoid overlap with centered logo */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="/login" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
              Sign In
            </a>
            <a href="/register" className="text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
              Register
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-[#e0e0e0] px-6 py-8 space-y-6">
            <a href="/editorials" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
              Editorials
            </a>
            <a href="/runway" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
              Runway
            </a>
            <a href="/culture" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
              Culture
            </a>
            <div className="pt-4 border-t border-[#e0e0e0] flex flex-col gap-3">
              <a href="/login" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                Sign In
              </a>
              <a href="/register" className="inline-block text-center text-sm tracking-wide uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
                Register
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div
            className="space-y-8 opacity-0"
            style={{ animation: 'fadeInUp 1s ease-out forwards' }}
          >
            <div className="space-y-4">
              <div className="w-12 h-px bg-[#0a0a0a]"></div>
              <p className="text-sm tracking-widest uppercase font-light text-[#6b6b6b]">
                Independent Fashion Journal
              </p>
            </div>

            <h2 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">
              The things worth wearing. The stories worth telling.
            </h2>

            <p className="text-lg font-light text-[#4a4a4a] leading-relaxed max-w-md">
              CHIARISSIME covers fashion from the inside — runway reviews, cultural editorials,
              and the ideas that shape the way we dress.
            </p>

            <a href="/editorials" className="group relative inline-block overflow-hidden px-8 py-4 text-sm tracking-widest uppercase font-light border border-[#0a0a0a] hover:text-white transition-colors duration-300">
              <div className="absolute inset-0 bg-[#0a0a0a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 -z-10"></div>
              Read the Latest
            </a>
          </div>

          {/* Right: Image Placeholder */}
          <div
            className="relative h-96 lg:h-[500px] group opacity-0"
            style={{ animation: 'fadeInUp 1s ease-out 0.2s forwards' }}
          >
            <div className="absolute inset-0 bg-[#f0f0f0] rounded-lg overflow-hidden">
              <img
                src="/images/editorials/carolyn.jpg"
                alt="CHIARISSIME"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0a0a0a]/30"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white/70 text-xs tracking-widest uppercase font-light mb-2">
                  Now Reading
                </p>
                <p className="text-white text-lg font-light leading-snug">
                  The Carolyn Bessette Copy-Paste Era
                </p>
              </div>
            </div>
            <div className="absolute -inset-4 border border-[#0a0a0a]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </section>

      {/* Latest Stories — mixed Editorials + Runway */}
      <section className="py-20 px-6 border-t border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="w-8 h-px bg-[#0a0a0a] mb-4"></div>
              <h2 className="text-3xl font-light tracking-tight">Latest</h2>
            </div>
            <div className="flex gap-6 text-xs tracking-widest uppercase font-light">
              <a href="/editorials" className="border-b border-[#0a0a0a] pb-1 hover:text-[#6b6b6b] transition-colors">
                All Editorials
              </a>
              <a href="/runway" className="hover:text-[#6b6b6b] transition-colors">
                All Runway
              </a>
              <a href="/culture" className="hover:text-[#6b6b6b] transition-colors">
                All Culture
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured large item */}
            <a href="/editorials" className="md:col-span-2 group cursor-pointer">
              <div className="aspect-[16/9] bg-[#f0f0f0] overflow-hidden mb-4">
                <img
                  src="/images/editorials/carolyn.jpg"
                  alt="The Carolyn Bessette Copy-Paste Era"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-2">
                Editorial · March 2025
              </p>
              <h3 className="text-2xl font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">
                The Carolyn Bessette Copy-Paste Era: Why Style Is More Than an Outfit
              </h3>
            </a>

            {/* Stack of smaller items */}
            <div className="space-y-8">
              <a href="/runway" className="group block">
                <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                  <img
                    src="/images/runway/chanel.jpg"
                    alt="Chanel SS25"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">
                  Runway · SS 2025
                </p>
                <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">
                  Chanel Spring/Summer 2025: The Return of the Tweed
                </h3>
              </a>

              <a href="/runway" className="group block">
                <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                  <img
                    src="/images/runway/chloe.jpg"
                    alt="Chloé SS25"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">
                  Runway · SS 2025
                </p>
                <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">
                  Chloé Spring/Summer 2025: The Language of the Free
                </h3>
              </a>
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[#e0e0e0]">
            {[
              {
                href: '/editorials',
                img: '/images/editorials/thrift.jpg',
                label: 'Editorial · February 2025',
                title: 'Thrifting: Where History Meets Style',
              },
              {
                href: '/runway',
                img: '/images/runway/valentino.jpg',
                label: 'Runway · SS 2025',
                title: 'Valentino Couture SS 2025: Red and Silence',
              },
              {
                href: '/culture',
                img: '/images/culture/grandbudapest.jpg',
                label: 'Culture · Film',
                title: 'The Wes Anderson Wardrobe: When Cinema Becomes a Mood Board',
              },
            ].map((item, idx) => (
              <a key={idx} href={item.href} className="group block">
                <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">
                  {item.label}
                </p>
                <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>

          {/* Third row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-[#e0e0e0]">
            {[
              {
                href: '/editorials',
                img: '/images/editorials/paris.jpg',
                label: 'Editorial · March 2025',
                title: 'Paris Fashion Week: Where Fashion Writes Its Future',
              },
              {
                href: '/culture',
                img: '/images/culture/art.jpg',
                label: 'Culture · Art',
                title: 'The Canvas and the Collection: Fashion as Fine Art',
              },
              {
                href: '/culture',
                img: '/images/culture/RS.jpg',
                label: 'Culture · Music',
                title: 'Dressed for the Sound: How Music Shapes What We Wear',
              },
            ].map((item, idx) => (
              <a key={idx} href={item.href} className="group block">
                <div className="aspect-[4/3] bg-[#f0f0f0] overflow-hidden mb-3">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-[#6b6b6b] font-light mb-1">
                  {item.label}
                </p>
                <h3 className="text-base font-light leading-snug group-hover:text-[#6b6b6b] transition-colors">
                  {item.title}
                </h3>
              </a>
            ))}
          </div>
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
              <div
                key={idx}
                className="text-center space-y-4 opacity-0"
                style={{ animation: `fadeInUp 0.8s ease-out ${0.4 + idx * 0.1}s forwards` }}
              >
                <div className="flex justify-center">
                  <div className="w-12 h-12 border border-[#0a0a0a] rounded-full flex items-center justify-center font-light text-lg">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-light tracking-tight">{feature.title}</h3>
                <p className="text-sm font-light text-[#4a4a4a]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
            Join Our Community
          </h2>
          <p className="text-lg font-light text-[#4a4a4a]">
            Subscribe to receive curated stories, exclusive previews, and invitations
            to our most intimate experiences.
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

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm font-light">
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-light">About</h4>
            <a href="#" className="hover:text-[#aaaaaa] transition-colors">Our Story</a>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-light">Support</h4>
            <a href="#" className="hover:text-[#aaaaaa] transition-colors">Contact</a>
          </div>
          <div>
            <h4 className="uppercase tracking-widest mb-4 font-light">Follow</h4>
            <a href="#" className="hover:text-[#aaaaaa] transition-colors">Instagram</a>
          </div>
        </div>

        <div className="border-t border-[#333] mt-8 pt-8 text-center text-xs text-[#666]">
          <p>&copy; 2025 CHIARISSIME. All rights reserved.</p>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
