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
                // Primary accent: Burnt Orange
                primary: {
                    50: '#fef7ee',
                    100: '#fdecd3',
                    200: '#fad4a5',
                    300: '#f7b66d',
                    400: '#f48d32',
                    500: '#f17013', // Main burnt orange
                    600: '#e25809',
                    700: '#bb420a',
                    800: '#95350f',
                    900: '#792d10',
                },
                // Deep charcoal backgrounds
                charcoal: {
                    900: '#18181b',
                    800: '#27272a',
                    700: '#3f3f46',
                    600: '#52525b',
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
            },
        },
    },
    plugins: [],
};

export default config;
