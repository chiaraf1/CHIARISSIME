import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function About() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-serif overflow-x-hidden">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-0">
        <div className="w-full h-[60vh] overflow-hidden relative">
          <img
            src="/images/about/carrie.jpg"
            alt="Fashion editorial"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/30" />
          <div className="absolute bottom-12 left-0 right-0 px-6">
            <div className="max-w-4xl mx-auto">
              <p className="text-white/70 text-xs tracking-widest uppercase font-light mb-3">Our Story</p>
              <h1 className="text-4xl lg:text-6xl font-light text-white tracking-tight leading-tight">
                Written without<br />compromise.
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left: text */}
            <div className="space-y-8">
              <div>
                <div className="w-8 h-px bg-[#0a0a0a] mb-6"></div>
                <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b] mb-6">About</p>
                <h2 className="text-3xl font-light tracking-tight leading-snug mb-8">
                  Fashion. Cinema. The space between.
                </h2>
              </div>

              <div className="space-y-6 text-lg font-light text-[#4a4a4a] leading-relaxed">
                <p>
                  CHIARISSIME is an independent journal born from a love of two things: fashion and cinema. No advertisers, no affiliates — just writing about the clothes, the collections, the films, and the culture that connects them all.
                </p>
                <p>
                  Fashion and cinema have always spoken the same language. A costume is a character. A collection is a mood. Both art forms ask the same question: what does it mean to be seen?
                </p>
                <p>
                  Founded out of a genuine obsession with both worlds, CHIARISSIME exists to say the things that sponsored content can't. To take the runway seriously. To look at a film frame and ask why she's wearing that coat, and what it tells us about everything else.
                </p>
                <p>
                  Fashion is not frivolous. Cinema is not escapism. Both are ways of understanding the world — and they deserve criticism that treats them that way.
                </p>
              </div>
            </div>

            {/* Right: image */}
            <div className="space-y-6">
              <div className="w-full h-[480px] overflow-hidden">
                <img
                  src="/images/about/JaneB.jpg"
                  alt="Fashion editorial"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs font-light text-[#6b6b6b]">
                The things worth wearing. The stories worth telling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cinema x Fashion interlude */}
      <section className="py-20 px-6 bg-[#f5f5f5]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="w-8 h-px bg-[#0a0a0a]"></div>
              <h2 className="text-3xl font-light tracking-tight leading-snug">
                Cinema dresses its characters.<br />Fashion directs its audience.
              </h2>
              <div className="space-y-4 text-base font-light text-[#4a4a4a] leading-relaxed">
                <p>
                  Think of Audrey Hepburn in Givenchy. Faye Dunaway in Bonnie and Clyde. The red coat in Schindler's List. Cate Blanchett in anything.
                </p>
                <p>
                  These aren't just outfits. They're arguments. And CHIARISSIME is here to make them.
                </p>
                <p>
                  We write about what designers borrow from directors, what directors borrow from designers, and how both shape the way we see ourselves when we get dressed in the morning.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-64 overflow-hidden bg-[#e8e8e8]">
                <img
                  src="/images/about/prettywoman.jpg"
                  alt="Cinema and fashion"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-40 overflow-hidden bg-[#e8e8e8]">
                <img
                  src="/images/about/AudreyHepburn.jpg"
                  alt="Film still"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote — full bleed */}
      <section className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/about/bunchofmag.jpg"
          alt="Fashion detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/55 flex items-center justify-center px-6">
          <blockquote className="text-white text-center max-w-2xl">
            <p className="text-2xl lg:text-4xl font-light tracking-tight leading-relaxed">
              "Fashion is the armour to survive the reality of everyday life."
            </p>
            <footer className="mt-6 text-xs tracking-widest uppercase font-light text-white/60">
              — Bill Cunningham
            </footer>
          </blockquote>
        </div>
      </section>

      {/* What we cover */}
      <section className="py-24 px-6 border-t border-[#e0e0e0]">
        <div className="max-w-4xl mx-auto">
          <div className="w-8 h-px bg-[#0a0a0a] mb-6"></div>
          <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b] mb-12">What we cover</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Editorials',
                desc: 'In-depth features on fashion and cinema — essays that take clothes, films, and the culture connecting them seriously.',
                href: '/editorials',
              },
              {
                title: 'Runway',
                desc: 'Season reviews from the world\'s most important collections. What was said on the runway, and what it meant.',
                href: '/runway',
              },
              {
                title: 'Culture',
                desc: 'Where fashion meets cinema, art, and history. The films that dressed an era. The designers who directed a room.',
                href: '/culture',
              },
            ].map((section) => (
              <Link key={section.title} to={section.href} className="group space-y-4">
                <div className="w-6 h-px bg-[#0a0a0a] group-hover:w-12 transition-all duration-300"></div>
                <h3 className="text-xl font-light tracking-tight">{section.title}</h3>
                <p className="text-sm font-light text-[#4a4a4a] leading-relaxed">{section.desc}</p>
                <span className="text-sm font-light tracking-wide text-[#6b6b6b] group-hover:text-[#0a0a0a] transition-colors">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

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


    </div>
  );
}
