import { useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import Nav from '../components/Nav';

export default function Runway() {
  const [selectedShow, setSelectedShow] = useState(null);

  const shows = [
    {
      id: 1,
      title: 'Chanel Spring/Summer 2025: The Return of the Tweed',
      subtitle: 'Virginie Viard reimagines the house codes for a new generation',
      category: 'Haute Couture',
      season: 'SS 2025',
      image: '/images/runway/chanel.jpg',
      excerpt: 'At the Grand Palais Éphémère, Chanel unveiled a collection that honors the founding spirit of Gabrielle Chanel while speaking directly to a contemporary woman who values ease as much as elegance.',
      content: `The Grand Palais Éphémère fell silent as the first model stepped onto the runway in a pale ivory tweed suit — the kind of garment that has defined Chanel for nearly a century, yet somehow felt entirely fresh.
Virginie Viard has always understood that Chanel's power lies not in reinvention, but in refinement. This season, she leaned into that philosophy fully. Boucle jackets were cut shorter and worn with fluid trousers. Quilted bags appeared in new proportions. Camellia corsages adorned lapels in unexpected, oversized scale.
What made the collection remarkable was its restraint. In a season where maximalism dominated many competing shows, Chanel chose to whisper rather than shout. Each exit was considered, balanced, and deeply wearable — qualities that feel increasingly rare on the runway.
The palette moved from ivory and cream through warm beige to a deep black finale. Gold chains threaded through every look, sometimes barely visible, sometimes displayed with quiet confidence.
This was a collection about belonging. About wearing clothes that feel like a second skin rather than a statement. In that sense, it was perhaps the most Chanel show in years.`,
    },
    {
      id: 2,
      title: 'Chloé Spring/Summer 2025: The Language of the Free',
      subtitle: "Chemena Kamali's ode to Bohemian femininity, rooted in the house's DNA",
      category: 'Ready-to-Wear',
      season: 'SS 2025',
      image: '/images/runway/chloe.jpg',
      excerpt: "In her second season at the helm of Chloé, Chemena Kamali deepened her vision of a woman who is free, romantic, and entirely herself — a collection that felt like a conversation with the house's most iconic decades.",
      content: `There is a lightness to Chloé that no other house quite replicates. It is not simply about sheer fabric or floral prints — it is about a particular kind of ease, a femininity that feels chosen rather than imposed. Chemena Kamali, in her Spring/Summer 2025 collection, proved once again that she understands this more instinctively than almost anyone.
The show opened on the banks of the Seine, models moving through soft morning light in dresses that seemed to belong to no specific era. A broderie anglaise blouse. A suede fringe skirt. A silk wrap dress in the warm ochre tones that have become a Kamali signature. Each piece felt timeless in the truest sense — not nostalgic, but outside of time entirely.
What distinguished this collection from its predecessors was a new confidence in structure. While the bohemian spirit remained, Kamali introduced tailored elements — a sharply cut blazer worn over a floating slip dress, wide-leg trousers in cream linen paired with a gathered chiffon top — that gave the collection a grounded, wearable quality.
The accessories continued to evolve. The Chloé Marcie bag appeared in new, sun-bleached leathers. Sandals were flat, strappy, effortless.
Colour moved from warm whites through terracotta and dusty rose to a deep chocolate brown in the finale. It was a palette drawn from the earth, worn by women who seemed entirely comfortable in their own skin.
Kamali is doing something quietly radical at Chloé: building a world rather than a trend. This collection was its most complete expression yet.`,
    },
    {
      id: 3,
      title: 'Valentino Couture SS 2025: Red and Silence',
      subtitle: 'Pierpaolo Piccioli steps back to let the dress speak',
      category: 'Haute Couture',
      season: 'SS 2025',
      image: '/images/runway/valentino.jpg',
      excerpt: `A single colour. Forty-seven exits. Valentino's Haute Couture show this season was an exercise in reduction — and in the process, it became one of the most emotionally affecting shows in recent memory.`,
      content: `There is something almost violent about a monochrome show done at this level of conviction. Valentino's Haute Couture for Spring/Summer 2025 was presented in what the house simply called "Valentino Red" — the same shade that has defined the Roman maison since its founding.
Pierpaolo Piccioli stripped everything else away. There were no accessories, no bags, no shoes in contrasting tones. Even the set was bare: a white box, a wooden floor, natural light.
What remained was the dress itself.
And the dresses were extraordinary. Ball gowns with volumes that filled the room. Column silhouettes in bias-cut duchess satin. Ruffled confections that recalled the great couturiers of the mid-twentieth century, yet felt entirely of this moment.
The effect of the monochrome was unexpected: rather than flattening the collection, it amplified the architecture of each piece. With colour removed as a variable, the eye was drawn entirely to cut, volume, proportion, and movement.
This was couture as argument — a defense of craft, of slowness, of the human hand. In a fashion landscape increasingly dominated by spectacle and content strategy, Valentino made a case for the dress alone.`,
    },
    {
      id: 4,
      title: 'Loewe AW 2025: Jonathan Anderson and the Art of the Uncanny',
      subtitle: 'When fashion becomes sculpture and sculpture becomes fashion',
      category: 'Ready-to-Wear',
      season: 'AW 2025',
      image: '/images/runway/loewe.jpg',
      excerpt: 'Jonathan Anderson continues to make fashion that unsettles in the best possible way — garments that ask you to look twice, and then again, until you are no longer certain what you are seeing.',
      content: `Few designers working today have Jonathan Anderson's appetite for genuine strangeness. His Loewe collections have, over the years, introduced inflatable sculptures, hyper-realistic trompe l'oeil knits, and shoes that defied the laws of physics. Autumn/Winter 2025 continued in this tradition — but with a new quietness.
The collection opened with a series of knitted garments that appeared, at first glance, to be conventional. A cream roll-neck. A brown cardigan. A pair of wide-leg trousers. Then, gradually, the eye adjusted: the textures were wrong. The proportions were slightly off. A sleeve descended three inches too far. A neckline folded in a direction that necks do not naturally fold.
This is Anderson's ongoing project: to make you conscious of looking. To remind you that clothing, however familiar, is always also a construction.
The leather goods were predictably covetable — a new iteration of the Puzzle bag in a muted brick tone, alongside a series of elongated clutches that recalled modernist sculpture.
By the finale, the collection had moved into something approaching the sublime: long coats in a deep indigo that seemed to absorb the light, worn by models whose stillness made the whole room pause.
Anderson remains one of fashion's most restless and essential minds.`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="w-12 h-px bg-[#0a0a0a]"></div>
            <p className="text-sm tracking-widest uppercase font-light text-[#6b6b6b]">
              Season Reviews
            </p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-light leading-tight tracking-tight">
            Runway
          </h1>
          <p className="text-lg font-light text-[#4a4a4a] max-w-2xl">
            In-depth reviews of the collections that define each season.
            From couture ateliers to the ready-to-wear runway.
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
              placeholder="Search runway reviews..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {selectedShow ? (
          <div className="space-y-8">
            <button
              onClick={() => setSelectedShow(null)}
              className="flex items-center gap-2 text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
            >
              ← Back to Runway
            </button>

            <div className="space-y-8">
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-[#f0f0f0]">
                <img
                  src={selectedShow.image}
                  alt={selectedShow.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase mb-2">
                    {selectedShow.category} · {selectedShow.season}
                  </p>
                  <h2 className="text-4xl font-light tracking-tight mb-2">
                    {selectedShow.title}
                  </h2>
                  <p className="text-xl font-light text-[#6b6b6b]">
                    {selectedShow.subtitle}
                  </p>
                </div>
                <div className="w-12 h-px bg-[#0a0a0a]"></div>
              </div>

              <div className="prose prose-sm max-w-none space-y-6">
                <p className="text-lg font-light text-[#4a4a4a] leading-relaxed">
                  {selectedShow.content}
                </p>
              </div>

              <div className="pt-8 border-t border-[#e0e0e0] space-y-4">
                <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
                  Share this review
                </p>
                <div className="flex gap-4">
                  {['Instagram', 'Facebook', 'Pinterest'].map((s) => (
                    <a key={s} href="#" className="text-sm text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Show */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-[#e0e0e0]">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                    Featured Review
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
                    {shows[0].title}
                  </h2>
                  <p className="text-xl font-light text-[#6b6b6b]">
                    {shows[0].subtitle}
                  </p>
                </div>
                <p className="text-lg font-light text-[#4a4a4a]">
                  {shows[0].excerpt}
                </p>
                <button
                  onClick={() => setSelectedShow(shows[0])}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-light border-b border-[#0a0a0a] hover:text-[#6b6b6b] transition-colors pb-2"
                >
                  Read Review
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="order-1 lg:order-2 h-96 bg-[#f0f0f0] rounded-lg overflow-hidden">
                <img
                  src={shows[0].image}
                  alt={shows[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* More Reviews */}
            <div className="space-y-4">
              <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                More Reviews
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {shows.slice(1).map((show) => (
                  <article
                    key={show.id}
                    className="group cursor-pointer space-y-4"
                    onClick={() => setSelectedShow(show)}
                  >
                    <div className="h-64 bg-[#f0f0f0] rounded-lg overflow-hidden">
                      <img
                        src={show.image}
                        alt={show.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                          {show.category}
                        </p>
                        <p className="text-xs text-[#6b6b6b] font-light">{show.season}</p>
                      </div>
                      <h3 className="text-xl font-light tracking-tight group-hover:text-[#6b6b6b] transition-colors">
                        {show.title}
                      </h3>
                      <p className="text-sm font-light text-[#6b6b6b]">{show.subtitle}</p>
                      <p className="text-sm font-light text-[#4a4a4a]">{show.excerpt}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-[#f5f5f5] border-t border-[#e0e0e0]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h3 className="text-3xl font-light tracking-tight">Never Miss a Show</h3>
          <p className="text-lg font-light text-[#4a4a4a]">
            Subscribe to receive our latest runway reviews and season highlights.
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
