import { Link } from 'react-router-dom';
import Nav from '../components/Nav';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <Nav />
      <div className="max-w-2xl mx-auto px-6 pt-48 pb-24 text-center space-y-10">
        <div>
          <div className="w-8 h-px bg-[#0a0a0a] mx-auto mb-8"></div>
          <p className="text-xs tracking-widest uppercase font-light text-[#6b6b6b]">404</p>
        </div>
        <h1 className="text-4xl lg:text-5xl font-light tracking-tight leading-tight">
          Page not found.
        </h1>
        <p className="text-lg font-light text-[#4a4a4a] leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="w-8 h-px bg-[#e0e0e0] mx-auto"></div>
        <Link
          to="/"
          className="inline-block text-sm tracking-widest uppercase font-light text-[#6b6b6b] hover:text-[#0a0a0a] transition-colors"
        >
          ← Back to the journal
        </Link>
      </div>
    </div>
  );
}
