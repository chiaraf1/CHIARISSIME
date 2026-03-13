import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-serif overflow-x-hidden">
      <Nav />

      <div className="max-w-2xl mx-auto px-6 pt-48 pb-24 text-center space-y-10">
        <div className="space-y-2">
          <div className="w-8 h-px bg-[#0a0a0a] mx-auto mb-8"></div>
          <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Contact</p>
        </div>

        <h1 className="text-4xl lg:text-5xl font-light tracking-tight leading-tight">
          We'll be in touch<br />soon.
        </h1>

        <p className="text-lg font-light text-[#4a4a4a] leading-relaxed max-w-md mx-auto">
          CHIARISSIME is still growing. A proper way to reach us is coming — until then, thank you for reading.
        </p>

        <div className="w-8 h-px bg-[#e0e0e0] mx-auto"></div>

        <Link
          to="/"
          className="inline-block text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          ← Back to the journal
        </Link>
      </div>

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
