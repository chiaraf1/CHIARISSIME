import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage (saved during login/register)
    const token = localStorage.getItem('token');
    
    if (!token) {
      // No token = not logged in, redirect to login
      navigate('/login');
      return;
    }

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decodedToken = JSON.parse(jsonPayload);
      setUserData({
        email: decodedToken.email,
        userId: decodedToken.userId,
      });
    } catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to home
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f3] flex items-center justify-center">
        <p className="text-[#8b7355] font-light">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Navbar */}
      <nav className="bg-white border-b border-[#e0dcd4] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-light tracking-[0.2em] uppercase">
              <span>CHIARISSIME</span>
            </h1>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm tracking-widest uppercase font-light border border-[#1a1a1a] px-6 py-2 hover:bg-[#1a1a1a] hover:text-[#faf8f3] transition-all duration-300"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Welcome Section */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#c4a57b]/20 rounded-full flex items-center justify-center">
                <User size={32} className="text-[#c4a57b]" />
              </div>
              <div>
                <p className="text-sm text-[#8b7355] font-light tracking-widest uppercase">
                  Welcome back
                </p>
                <h2 className="text-3xl font-light tracking-tight">
                  {userData?.email}
                </h2>
              </div>
            </div>

            <div className="w-12 h-1 bg-[#c4a57b]"></div>

            <p className="text-lg font-light text-[#4a4a4a] max-w-2xl">
              You're logged into CHIARISSIME. Explore our curated collections
              and discover what's new in luxury and elegance.
            </p>
          </div>

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: 'My Account',
                desc: 'View and manage your profile settings',
                icon: '👤',
              },
              {
                title: 'Collections',
                desc: 'Browse our exclusive curated collections',
                icon: '✨',
              },
              {
                title: 'Saved Items',
                desc: 'Access your saved favorites',
                icon: '❤️',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-white border border-[#e0dcd4] space-y-4 hover:border-[#c4a57b] transition-colors">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="text-xl font-light">{item.title}</h3>
                <p className="text-sm font-light text-[#4a4a4a]">{item.desc}</p>
                <a href="#" className="text-sm text-[#c4a57b] hover:text-[#1a1a1a] transition-colors font-light">
                  Explore →
                </a>
              </div>
            ))}
          </div>

          {/* User Info Box */}
          <div className="mt-16 p-8 bg-white border border-[#e0dcd4] space-y-4">
            <p className="text-xs text-[#8b7355] font-light tracking-widest uppercase">
              Account Information
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#8b7355] font-light tracking-widest uppercase mb-1">
                  Email
                </p>
                <p className="text-[#1a1a1a]">{userData?.email}</p>
              </div>
              <div>
                <p className="text-xs text-[#8b7355] font-light tracking-widest uppercase mb-1">
                  User ID
                </p>
                <p className="text-sm text-[#4a4a4a] font-mono">
                  {userData?.userId}
                </p>
              </div>
            </div>
          </div>

          {/* Logout Info */}
          <div className="p-4 bg-[#faf8f3] border border-[#e0dcd4] text-center">
            <p className="text-sm font-light text-[#8b7355]">
              Ready to go? Click the Logout button in the top right to sign out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}