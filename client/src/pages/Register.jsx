import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Mail, Lock, User } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-[#e0e0e0] px-6 py-5 flex items-center justify-between">
        <a href="/" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
          ← Home
        </a>
        <a href="/" className="text-xl font-light tracking-[0.2em] uppercase">
          CHIARISSIME
        </a>
        <a href="/login" className="text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors">
          Sign In
        </a>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <div className="w-8 h-px bg-[#0a0a0a] mx-auto mb-6"></div>
            <h1 className="text-3xl font-light tracking-tight mb-2">Create Account</h1>
            <p className="text-sm text-[#6b6b6b] font-light">Join CHIARISSIME</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border border-[#0a0a0a] text-[#0a0a0a] px-4 py-3 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase font-light">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-3 text-[#6b6b6b]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm placeholder-[#aaaaaa]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase font-light">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3 text-[#6b6b6b]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm placeholder-[#aaaaaa]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase font-light">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3 text-[#6b6b6b]" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm placeholder-[#aaaaaa]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs tracking-widest uppercase font-light">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3 text-[#6b6b6b]" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] text-sm placeholder-[#aaaaaa]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0a0a0a] text-white text-sm tracking-widest uppercase font-light hover:bg-[#333333] disabled:opacity-50 transition-colors duration-300"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[#6b6b6b] mt-6 font-light">
            Already have an account?{' '}
            <a href="/login" className="text-[#0a0a0a] underline hover:text-[#6b6b6b] transition-colors">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
