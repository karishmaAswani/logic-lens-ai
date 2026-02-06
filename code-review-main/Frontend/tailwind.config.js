/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#0a0a0a',
                    800: '#171717',
                    700: '#262626',
                },
                primary: {
                    500: '#3b82f6',
                    600: '#2563eb',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'scan': 'scan 2s linear infinite',
                'orbit': 'orbit 20s linear infinite',
                'pulse-heavy': 'pulse-heavy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'typewriter': 'typewriter 2s steps(40, end) infinite',
                'fade-in': 'fade-in 0.5s ease-out',
                'fade-in-up': 'fade-in-up 0.8s ease-out',
            },
            keyframes: {
                scan: {
                    '0%': { top: '0%' },
                    '100%': { top: '100%' },
                },
                orbit: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                'pulse-heavy': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '.5' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'fade-in-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
