/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        npvl: {
          red: "#E50914",
          "red-dark": "#B20710",
          "red-glow": "#FF1E27",
          white: "#FFFFFF",
          "light-bg": "#F8F9FA",
          "light-card": "#FFFFFF",
          "light-subtle": "#F1F3F5",
          dark: "#111827",
          charcoal: "#1F2937",
          grey: "#6B7280",
        }
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'court-draw': 'courtDraw 2s ease-out forwards',
        'light-sweep': 'lightSweep 3s infinite linear',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5', filter: 'drop-shadow(0 0 15px rgba(229, 9, 20, 0.3))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(229, 9, 20, 0.6))' },
        },
        courtDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        lightSweep: {
          '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
