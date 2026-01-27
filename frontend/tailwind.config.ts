import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['IBM Plex Serif', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                // Professional glassmorphic palette - Deep slates and charcoals
                glass: {
                    bg: 'rgba(24, 24, 27, 0.7)',
                    'bg-light': 'rgba(39, 39, 42, 0.6)',
                    border: 'rgba(255, 255, 255, 0.1)',
                    'border-strong': 'rgba(255, 255, 255, 0.15)',
                },
                // Primary accent: Electric Blue & Neon Green
                electric: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // Main Electric Blue
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                neon: {
                    400: '#4ade80',
                    500: '#22c55e', // Main Neon Green
                    600: '#16a34a',
                },
                // Deep charcoal backgrounds
                charcoal: {
                    900: '#09090b', // Darker base
                    800: '#18181b',
                    700: '#27272a',
                    600: '#3f3f46',
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.5)',
                'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.25)',
                glow: '0 0 20px rgba(241, 112, 19, 0.3)',
                'glow-strong': '0 0 30px rgba(241, 112, 19, 0.5)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'glass-shimmer': 'glassShimmer 2s ease-in-out infinite',
                'aurora': 'aurora 6s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                glassShimmer: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                aurora: {
                    '0%': { backgroundPosition: '50% 50%, 50% 50%' },
                    '100%': { backgroundPosition: '350% 50%, 350% 50%' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
