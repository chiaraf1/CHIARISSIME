import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem('token');
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setDark(isDark);
  };

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
          <Link to="/editorials" className="hover:text-[#6b6b6b] transition-colors duration-300">
            Editorials
          </Link>
          <Link to="/runway" className="hover:text-[#6b6b6b] transition-colors duration-300">
            Runway
          </Link>
          <Link to="/culture" className="hover:text-[#6b6b6b] transition-colors duration-300">
            Culture
          </Link>
        </div>

        {/* Center: Brand Name */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <h1 className="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase">
              CHIARISSIME
            </h1>
          </Link>
        </div>

        {/* Right: dark mode toggle + auth actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleDark}
            className="text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors duration-300"
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
            >
              My Profile
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e0e0e0] px-6 py-8 space-y-6">
          <Link to="/editorials" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
            Editorials
          </Link>
          <Link to="/runway" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
            Runway
          </Link>
          <Link to="/culture" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
            Culture
          </Link>
          <div className="pt-4 border-t border-[#e0e0e0] flex flex-col gap-3">
            <button
              onClick={toggleDark}
              className="flex items-center gap-2 text-sm tracking-wide uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
              <span>{dark ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            {isLoggedIn ? (
              <Link to="/dashboard" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                My Profile
              </Link>
            ) : (
              <>
                <Link to="/login" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
