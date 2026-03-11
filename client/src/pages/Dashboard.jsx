import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      // JWT uses base64url (no padding) — restore padding for atob
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '=='.slice(0, (4 - base64.length % 4) % 4);
      const jsonPayload = decodeURIComponent(
        atob(padded)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);

      // Check token hasn't expired
      if (decodedToken.exp && Date.now() >= decodedToken.exp * 1000) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }

      setUserData({ email: decodedToken.email, isAdmin: decodedToken.isAdmin });
    } catch (err) {
      console.error('Error decoding token:', err);
      localStorage.removeItem('token');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-[#6b6b6b] font-light tracking-widest uppercase text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-serif">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e0e0e0]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Burger Menu (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#0a0a0a] hover:text-[#6b6b6b] transition-colors duration-300 lg:hidden"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Left nav links (desktop) */}
          <div className="hidden lg:flex gap-12 text-sm tracking-wide uppercase font-light">
            <a href="/editorials" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Editorials
            </a>
            <a href="/runway" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Runway
            </a>
            <a href="#" className="hover:text-[#6b6b6b] transition-colors duration-300">
              Culture
            </a>
          </div>

          {/* Center brand */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/" className="text-2xl lg:text-3xl font-light tracking-[0.2em] uppercase">
              CHIARISSIME
            </a>
          </div>

          {/* Right: Logout (desktop) */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
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
            <a href="#" className="block text-sm tracking-wide uppercase font-light hover:text-[#6b6b6b] transition-colors">
              Culture
            </a>
            <div className="pt-4 border-t border-[#e0e0e0]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm tracking-widest uppercase font-light border border-[#0a0a0a] px-6 py-2 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* Welcome */}
          <div className="space-y-6">
            <div className="w-8 h-px bg-[#0a0a0a]"></div>
            <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">
              Your Account
            </p>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
              Welcome back.
            </h2>
            <p className="text-lg font-light text-[#4a4a4a] max-w-xl">
              Signed in as <span className="text-[#0a0a0a]">{userData?.email}</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-end justify-between mb-10">
              <div>
                <div className="w-8 h-px bg-[#0a0a0a] mb-4"></div>
                <h3 className="text-2xl font-light tracking-tight">Explore</h3>
              </div>
            </div>

            {userData?.isAdmin && (
              <div className="mb-8">
                <a href="/admin" className="group flex items-center justify-between border border-[#0a0a0a] p-6 hover:bg-[#0a0a0a] hover:text-white transition-all duration-300">
                  <div className="space-y-1">
                    <p className="text-xs tracking-widest uppercase font-light opacity-60">Admin</p>
                    <h4 className="text-lg font-light tracking-tight">Admin Panel — Manage Content</h4>
                  </div>
                  <span className="text-sm font-light tracking-wide">Open →</span>
                </a>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="/editorials" className="group block border border-[#e0e0e0] p-8 hover:border-[#0a0a0a] transition-colors duration-300">
                <div className="space-y-4">
                  <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Section</p>
                  <h4 className="text-xl font-light group-hover:text-[#6b6b6b] transition-colors">Editorials</h4>
                  <p className="text-sm font-light text-[#4a4a4a]">
                    Fashion criticism and cultural essays written without compromise.
                  </p>
                  <span className="text-sm font-light tracking-wide">Read →</span>
                </div>
              </a>

              <a href="/runway" className="group block border border-[#e0e0e0] p-8 hover:border-[#0a0a0a] transition-colors duration-300">
                <div className="space-y-4">
                  <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Section</p>
                  <h4 className="text-xl font-light group-hover:text-[#6b6b6b] transition-colors">Runway</h4>
                  <p className="text-sm font-light text-[#4a4a4a]">
                    Season reviews from the world's most important collections.
                  </p>
                  <span className="text-sm font-light tracking-wide">Read →</span>
                </div>
              </a>

              <a href="/" className="group block border border-[#e0e0e0] p-8 hover:border-[#0a0a0a] transition-colors duration-300">
                <div className="space-y-4">
                  <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">Home</p>
                  <h4 className="text-xl font-light group-hover:text-[#6b6b6b] transition-colors">Latest</h4>
                  <p className="text-sm font-light text-[#4a4a4a]">
                    All the stories from across the journal in one place.
                  </p>
                  <span className="text-sm font-light tracking-wide">Go →</span>
                </div>
              </a>
            </div>
          </div>

          {/* Account Info */}
          <div className="border-t border-[#e0e0e0] pt-16">
            <div className="w-8 h-px bg-[#0a0a0a] mb-4"></div>
            <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b] mb-8">Account Information</p>
            <div className="max-w-md space-y-6">
              <div className="border-b border-[#e0e0e0] pb-4">
                <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b] mb-1">Email</p>
                <p className="text-base font-light">{userData?.email}</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500&display=swap');
        * { font-family: 'Lora', serif; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; }
      `}</style>
    </div>
  );
}
