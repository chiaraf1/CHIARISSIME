import { useState } from 'react';

export default function NewsletterSection({ title = 'Join Our Community', description, className = 'py-20 px-6' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <section className={className}>
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-4xl lg:text-5xl font-light tracking-tight">{title}</h2>
        {description && (
          <p className="text-lg font-light text-[#4a4a4a]">{description}</p>
        )}
        {status === 'success' ? (
          <p className="text-sm font-light tracking-widest uppercase text-[#4a4a4a]">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-white border border-[#e0e0e0] focus:outline-none focus:border-[#0a0a0a] placeholder-[#aaaaaa] text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-[#0a0a0a] text-white text-sm tracking-widest uppercase font-light hover:bg-[#333333] disabled:opacity-50 transition-colors duration-300"
            >
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-sm font-light text-[#6b6b6b]">{message}</p>
        )}
      </div>
    </section>
  );
}
