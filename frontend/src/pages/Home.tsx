import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowRight, Lightbulb, Sun, Moon } from 'lucide-react';

// Minimal geometric lightning bolt logo
function BoltLogo({ fill = 'black' }: { fill?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={fill} />
    </svg>
  );
}

export function Home() {
  const [prompt, setPrompt] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
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
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: isDarkMode ? '#000000' : '#fafafa',
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px)
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo - Left */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: isDarkMode ? 'white' : '#18181b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BoltLogo fill={isDarkMode ? 'black' : 'white'} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: isDarkMode ? 'white' : '#18181b' }}>Boltly</span>
          </div>

          {/* Theme Toggle - Right */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isDarkMode ? '#27272a' : '#e4e4e7',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
            ) : (
              <Moon style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
            )}
          </button>
        </header>

        {/* ========== MAIN CONTENT ========== */}
        <main className="flex-1 flex items-center justify-center px-4 pt-20 pb-24">
          <div className="w-full max-w-2xl">

            {/* ===== HERO TEXT ===== */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1
                style={{
                  fontSize: '3rem',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  color: isDarkMode ? 'white' : '#18181b',
                  marginBottom: '12px',
                }}
              >
                What will you build today?
              </h1>
              <p style={{ color: isDarkMode ? '#a1a1aa' : '#71717a', fontSize: '1.125rem' }}>
                Describe your idea and watch it come to life.
              </p>
            </div>

            {/* ===== INPUT BOX - ALL INLINE STYLES ===== */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '32px' }}>
              <div
                style={{
                  borderRadius: '24px',
                  backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
                  border: isFocused
                    ? `1px solid ${isDarkMode ? '#52525b' : '#a1a1aa'}`
                    : `1px solid ${isDarkMode ? '#27272a' : '#e4e4e7'}`,
                  overflow: 'hidden',
                  boxShadow: isFocused
                    ? `0 25px 50px -12px ${isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.15)'}`
                    : `0 10px 15px -3px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.08)'}`,
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
                      color: isDarkMode ? 'white' : '#18181b',
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
                      backgroundColor: isDarkMode ? '#3f3f46' : '#e4e4e7',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Plus style={{ width: '20px', height: '20px', color: isDarkMode ? '#a1a1aa' : '#52525b' }} />
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
                        color: isDarkMode ? '#a1a1aa' : '#52525b',
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
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: isDarkMode ? '#71717a' : '#a1a1aa', marginRight: '4px' }}>Try:</span>
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPrompt(suggestion)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: isDarkMode ? '#a1a1aa' : '#52525b',
                    backgroundColor: isDarkMode ? '#18181b' : '#ffffff',
                    border: `1px solid ${isDarkMode ? '#27272a' : '#e4e4e7'}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
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