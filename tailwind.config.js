/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5E8',
          100: '#C8E6C8',
          500: '#2E7D32',
          600: '#1B5E20',
          700: '#1B5E20',
          800: '#1B5E20',
          900: '#1B5E20',
        },
        secondary: {
          50: '#E3F2FD',
          100: '#BBDEFB',
          500: '#1976D2',
          600: '#1565C0',
          700: '#0D47A1',
          800: '#0D47A1',
          900: '#0D47A1',
        },
        accent: {
          50: '#FFF3E0',
          100: '#FFE0B2',
          500: '#FF6F00',
          600: '#EF6C00',
          700: '#E65100',
          800: '#E65100',
          900: '#E65100',
        },
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}