import { useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import Nav from '../components/Nav';

export default function Editorials() {
  const [selectedEditorial, setSelectedEditorial] = useState(null);

  const editorials = [
    {
      id: 1,
      title: 'The Carolyn Bessette Copy-Paste Era: Why Style Is More Than an Outfit',
      subtitle: 'The difference between inspiration and imitation',
      category: 'Editorial',
      date: 'March 2025',
      image: '/images/editorials/CarolynB.jpg',
      excerpt: 'The resurgence of interest in Carolyn Bessette-Kennedy has inspired a wave of outfit recreations across social media. But true style was never about copying a look—it was about the life and philosophy behind it.',
      content: `With the release of the new series by Ryan Murphy, what many viewers see on the surface as a love story has also sparked something else: a renewed fascination with the iconic style of Carolyn Bessette-Kennedy.
For those who already follow fashion history, this rediscovery isn't surprising. Carolyn Bessette has long been considered one of the defining style icons of the 1990s. Her aesthetic—clean lines, neutral palettes, effortless tailoring—helped shape what we now recognize as modern minimalism.
But lately, something interesting has been happening online. A wave of people are trying to recreate her looks almost exactly, as if style could simply be copied and pasted.
Carolyn's wardrobe was never just about the clothes. It was about context. She worked in fashion, understood design, and lived within an environment where minimalism wasn't just a trend—it was a philosophy.
That's why simply replicating the outfit doesn't necessarily recreate the style.
Another detail often overlooked is quality and construction. The pieces she wore were carefully tailored and often came from houses like Prada or other luxury labels where fabric, cut, and proportion make a significant difference.
Trying to reproduce that aesthetic with fast-fashion pieces can sometimes miss the point entirely.
More importantly, Carolyn never appeared to be chasing trends. Her wardrobe felt consistent, personal, and restrained.
True style has never been about copying an outfit. It's about understanding who you are, and letting your clothes reflect that.`
    },
    {
      id: 2,
      title: 'Thrifting: Where History Meets Style',
      subtitle: 'Why vintage fashion is more than just a trend',
      category: 'Fashion',
      date: 'February 2025',
      image: '/images/editorials/thrift.jpg',
      excerpt: `In a world of mass-produced fashion, thrifting reminds us that every piece of clothing has a story. From unique textures to one-of-a-kind details, vintage fashion connects us to the past while defining a personal style that can't be replicated.`,
      content: `In an era dominated by fast fashion, thrifting has become a rescue mission for both style and history. Every vintage blouse, coat, or pair of shoes carries the imprint of the person who wore it before — the choices they made, the textures they touched, the moments they lived.
Buying second-hand isn't just eco-conscious; it's a lesson in quality and craftsmanship. Modern mass-produced clothes often sacrifice durability for speed and affordability. When you thrift, you can see and feel fabrics that were woven to last decades, notice the hand-finished details, and discover cuts and patterns that no longer exist in contemporary stores.
But beyond quality, thrifting is about identity and individuality. Unlike fast fashion items churned out by the thousands, every vintage piece is unique. Wearing it is like wearing a fragment of history — a tangible connection to another time. This is why thrifting is more than a hobby; it's a way to curate a personal style that is authentic, tactile, and sustainable.
Vintage fashion also teaches us to slow down and appreciate clothing. You touch, examine, and imagine the journey of every garment. It's a stark contrast to today's disposable culture, where fabrics are thin, seams are weak, and individuality is lost. Thrifting reminds us that style doesn't have to be new to be remarkable.
In every thrift shop aisle, there's a story waiting to be discovered. And for those who care about style, sustainability, and the stories woven into fabric, these pre-loved treasures are the ultimate fashion statement.`,
    },
    {
      id: 3,
      title: 'Paris Fashion Week: Where Fashion Writes Its Future',
      subtitle: 'The city, the shows, and the designers shaping the next era of fashion.',
      category: 'Fashion',
      date: 'March 2025',
      image: '/images/editorials/paris.jpg',
      excerpt: 'Every season, the fashion world turns its eyes to Paris. Designers, editors, and creatives gather to witness the collections that will shape the next chapter of style.',
      content: `Twice a year, the streets of Paris transform into the epicenter of global fashion. During Paris Fashion Week, the city becomes a stage where creativity, craftsmanship, and culture collide.
It is here that some of the most influential fashion houses present their visions for the seasons ahead. Legendary maisons like Chanel, Dior, and Louis Vuitton reveal collections that often set the tone for the entire industry.
But Paris Fashion Week is more than just runway shows. It is a cultural moment where fashion editors, photographers, and stylists gather to interpret trends before they reach the public. Outside the venues, the sidewalks become their own kind of runway, where street style captures the spontaneous and personal side of fashion.
What makes Paris unique is the balance between heritage and innovation. While many of the world's oldest fashion houses are rooted here, the city also welcomes emerging designers who challenge tradition and redefine what fashion can be.
For decades, Paris has remained the final stop of the international fashion calendar, and with good reason. When the lights dim and the last model leaves the runway, the collections shown in Paris often determine the direction of fashion for the seasons to come.`,
    },
    {
      id: 4,
      title: 'The Psychology of Fashion: What Our Clothes Say About Us',
      subtitle: 'How the garments we choose reveal identity, emotion, and the silent language of style.',
      category: 'Fashion Culture',
      date: 'December 2024',
      image: '/images/editorials/street.jpg',
      excerpt: 'Fashion is often seen as a visual art, but it is also deeply psychological. The clothes we wear communicate our identity, mood, and aspirations long before we speak.',
      content: `Fashion has always been more than fabric and design. Every garment we choose carries a message about how we see ourselves and how we want to be perceived by others.
In many ways, clothing functions as a form of silent communication. A tailored blazer can project confidence and authority, while relaxed silhouettes might express comfort and ease. Through these choices, individuals create a visual language that reflects personality, mood, and even ambition.
Psychologists often refer to this phenomenon as enclothed cognition—the idea that what we wear can influence how we think, feel, and behave. Clothing doesn't simply reflect identity; it can also shape it. A carefully chosen outfit can alter posture, boost confidence, or shift how someone navigates social situations.
In the age of social media platforms like Instagram and TikTok, fashion has become even more tied to identity. Digital culture accelerates trends and encourages experimentation, but it also raises questions about authenticity. Are we dressing for ourselves, or for the image we want to present online?
The psychology of fashion reminds us that style is not only about aesthetics—it is about self-expression. Behind every outfit lies a story: the influences we absorb, the environments we inhabit, and the identities we continue to shape.
Because in the end, fashion is not just about what we wear. It is about who we are, and who we choose to become.`,
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
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src={selectedEditorial.image}
                  alt={selectedEditorial.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase mb-2">
                    {selectedEditorial.category} · {selectedEditorial.date}
                  </p>
                  <h2 className="text-4xl font-light tracking-tight mb-2">
                    {selectedEditorial.title}
                  </h2>
                  <p className="text-xl font-light text-[#6b6b6b]">
                    {selectedEditorial.subtitle}
                  </p>
                </div>
                <div className="w-12 h-px bg-[#0a0a0a]"></div>
              </div>

              <div className="prose prose-sm max-w-none space-y-6">
                <p className="text-lg font-light text-[#4a4a4a] leading-relaxed">
                  {selectedEditorial.content}
                </p>
              </div>

              <div className="pt-8 border-t border-[#e0e0e0] space-y-4">
                <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
                  Share this story
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
            {/* Featured */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-12 border-b border-[#e0e0e0]">
              <div className="order-2 lg:order-1 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                    Featured
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
                    {editorials[0].title}
                  </h2>
                  <p className="text-xl font-light text-[#6b6b6b]">
                    {editorials[0].subtitle}
                  </p>
                </div>
                <p className="text-lg font-light text-[#4a4a4a]">
                  {editorials[0].excerpt}
                </p>
                <button
                  onClick={() => setSelectedEditorial(editorials[0])}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase font-light border-b border-[#0a0a0a] hover:text-[#6b6b6b] transition-colors pb-2"
                >
                  Read Editorial
                  <ChevronRight size={16} />
                </button>
              </div>

              <div className="order-1 lg:order-2 h-96 bg-[#f0f0f0] rounded-lg overflow-hidden">
                <img
                  src={editorials[0].image}
                  alt={editorials[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* More Editorials */}
            <div className="space-y-4">
              <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                More Stories
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {editorials.slice(1).map((editorial) => (
                  <article
                    key={editorial.id}
                    className="group cursor-pointer space-y-4"
                    onClick={() => setSelectedEditorial(editorial)}
                  >
                    <div className="h-64 bg-[#f0f0f0] rounded-lg overflow-hidden">
                      <img
                        src={editorial.image}
                        alt={editorial.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#6b6b6b] font-light tracking-widest uppercase">
                          {editorial.category}
                        </p>
                        <p className="text-xs text-[#6b6b6b] font-light">{editorial.date}</p>
                      </div>
                      <h3 className="text-xl font-light tracking-tight group-hover:text-[#6b6b6b] transition-colors">
                        {editorial.title}
                      </h3>
                      <p className="text-sm font-light text-[#6b6b6b]">{editorial.subtitle}</p>
                      <p className="text-sm font-light text-[#4a4a4a]">{editorial.excerpt}</p>
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
