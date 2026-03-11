import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Burger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors duration-300 lg:hidden"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop nav links */}
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
          <a href="/">
            <h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase">
              CHIARISSIME
            </h1>
          </a>
        </div>

        {/* Right: auth actions */}
        <div className="hidden lg:flex items-center gap-4">
          {isLoggedIn ? (
            <a
              href="/dashboard"
              className="text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
            >
              My Profile
            </a>
          ) : (
            <>
              <a href="/login" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                Sign In
              </a>
              <a href="/register" className="text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
                Register
              </a>
            </>
          )}
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
            {isLoggedIn ? (
              <a href="/dashboard" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                My Profile
              </a>
            ) : (
              <>
                <a href="/login" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                  Sign In
                </a>
                <a href="/register" className="inline-block text-center text-sm tracking-wide uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
