import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, Lightbulb } from 'lucide-react';

// Minimal geometric lightning bolt logo
function BoltLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="black" />
    </svg>
  );
}

export function Home() {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      navigate('/builder', { state: { prompt } });
    }
  };

  const suggestions = [
    'Modern portfolio',
    'SaaS landing page',
    'Admin dashboard',
    'E-commerce store',
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-antialiased">
      {/* Grid Background */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ========== NAVIGATION ========== */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '24px 32px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'white',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BoltLogo />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>Boltly</span>
          </div>
        </header>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-24">
          <div className="w-full max-w-2xl">

            {/* ===== HERO TEXT ===== */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-3">
                What will you build today?
              </h1>
              <p className="text-zinc-400 text-base md:text-lg">
                Describe your idea and watch it come to life.
              </p>
            </div>

            {/* ===== INPUT BOX - ALL INLINE STYLES ===== */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
              <div
                style={{
                  borderRadius: '24px',
                  backgroundColor: '#18181b',
                  border: isFocused ? '1px solid #52525b' : '1px solid #27272a',
                  overflow: 'hidden',
                  boxShadow: isFocused ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.2s ease',
                }}
              >
                {/* TEXT AREA WRAPPER */}
                <div style={{ padding: '24px 24px 16px 24px' }}>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Describe your project..."
                    rows={3}
                    style={{
                      width: '100%',
                      minHeight: '80px',
                      backgroundColor: 'transparent',
                      color: 'white',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {/* ACTION BAR */}
                <div
                  style={{
                    padding: '0 20px 20px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* + BUTTON */}
                  <button
                    type="button"
                    aria-label="Add attachment"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: '#3f3f46',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus style={{ width: '20px', height: '20px', color: '#a1a1aa' }} />
                  </button>

                  {/* RIGHT BUTTONS */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* PLAN */}
                    <button
                      type="button"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#a1a1aa',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      <Lightbulb style={{ width: '16px', height: '16px' }} />
                      <span>Plan</span>
                    </button>

                    {/* BUILD NOW */}
                    <button
                      type="submit"
                      disabled={!prompt.trim()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        borderRadius: '9999px',
                        backgroundColor: prompt.trim() ? '#3b82f6' : '#3b82f6',
                        opacity: prompt.trim() ? 1 : 0.4,
                        border: 'none',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: prompt.trim() ? 'pointer' : 'not-allowed',
                      }}
                    >
                      <span>Build now</span>
                      <ArrowRight style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* ===== SUGGESTION CHIPS ===== */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-zinc-500 mr-1">Try:</span>
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  className="
                    px-3 py-1
                    rounded-lg
                    text-xs text-zinc-400
                    bg-zinc-900
                    border border-zinc-800
                    hover:text-white
                    hover:border-zinc-700
                    transition-colors
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}